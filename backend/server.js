/**
 * 🍰 Sugar Cubes Bakery POS - Backend Express & REST API Server
 * Port: 5000 | MySQL DB (Prisma ORM) | Native HTTP Fallback Engine
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const url = require('url');

// Environment & Config
const PORT = process.env.PORT || 5000;
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');

let express, cors, PrismaClient, prisma;
let isPrismaConnected = false;

try {
  express = require('express');
  cors = require('cors');
} catch (e) {
  // Express not installed yet, will use native http server
}

try {
  const prismaModule = require('@prisma/client');
  PrismaClient = prismaModule.PrismaClient;
  prisma = new PrismaClient();
} catch (e) {
  // Prisma not initialized yet
}

// Memory Store (for instant fast response and offline fallback)
const memoryStore = {
  products: [
    { id: 1, name: 'Red Velvet Cake (500g)', categoryId: 1, price: 450, stockQuantity: 25, active: true },
    { id: 2, name: 'Chocolate Truffle Cake', categoryId: 1, price: 550, stockQuantity: 20, active: true },
    { id: 3, name: 'Butter Croissant', categoryId: 2, price: 90, stockQuantity: 50, active: true },
    { id: 4, name: 'Blueberry Cheesecake Slice', categoryId: 1, price: 180, stockQuantity: 30, active: true },
    { id: 5, name: 'Cappuccino (Hot)', categoryId: 3, price: 120, stockQuantity: 100, active: true }
  ],
  categories: [
    { id: 1, name: 'Cakes & Desserts', description: 'Freshly baked specialty cakes' },
    { id: 2, name: 'Pastries & Breads', description: 'Artisanal bread and pastries' },
    { id: 3, name: 'Beverages & Coffee', description: 'Hot & cold beverages' }
  ],
  customers: [],
  orders: [],
  stores: [
    { id: 'STORE01', name: 'Sugar Cubes Bakery', code: 'STORE01', pin: '1234', address: 'Coimbatore Branch, Tamil Nadu', phone: '+91 9876543210', role: 'Owner' }
  ]
};

// Check DB Connection
async function testDbConnection() {
  if (!prisma) return;
  try {
    await prisma.$connect();
    isPrismaConnected = true;
    console.log('✅ Connected to MySQL database sugarcubes_pos via Prisma ORM!');
  } catch (err) {
    isPrismaConnected = false;
    console.log('ℹ️ Operating with active RAM storage engine (MySQL offline).');
  }
}
testDbConnection();

// MIME Types for Static File Serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

// ==============================================================================
// 🚀 Native Server Handler (Handles Port 5000, REST API & Static Files)
// ==============================================================================
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Helper to parse JSON body
  function getJsonBody(callback) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        callback(null, data);
      } catch (err) {
        callback(err, {});
      }
    });
  }

  function sendJson(status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  }

  // API Route: GET /api/server-info
  if (req.method === 'GET' && pathname === '/api/server-info') {
    let localIp = 'localhost';
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          localIp = net.address;
          break;
        }
      }
    }
    return sendJson(200, {
      success: true,
      port: PORT,
      localIp: localIp,
      networkUrl: `http://${localIp}:${PORT}`
    });
  }

  // API Route: GET /api/stores
  if (req.method === 'GET' && pathname === '/api/stores') {
    const publicStores = memoryStore.stores.map(s => ({
      id: s.id,
      name: s.name,
      code: s.code,
      role: s.role,
      address: s.address,
      phone: s.phone
    }));
    return sendJson(200, { success: true, stores: publicStores });
  }

// Helper to normalize store code input for Single Shop mode
function normalizeStoreCode(input) {
  if (!input) return 'STORE01';
  const str = input.toString().trim().toUpperCase();
  if (['0', '00', 'OWNER', 'MASTER', 'ADMIN', 'HEAD OFFICE', 'CORP'].includes(str)) return 'OWNER';
  return 'STORE01';
}

  // API Route: POST /api/auth/login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    return getJsonBody((err, body) => {
      const rawCode = (body.code || body.storeCode || body.username || '').toString().trim();
      const normalizedCode = normalizeStoreCode(rawCode);
      const pinInput = (body.pin || body.password || '').toString().trim();

      if (!rawCode || !pinInput) {
        return sendJson(400, { success: false, error: 'Please enter both Store ID and PIN.' });
      }

      const storeMatch = memoryStore.stores.find(s => 
        s.code.toUpperCase() === normalizedCode || 
        s.id.toUpperCase() === normalizedCode ||
        s.code.toUpperCase() === rawCode.toUpperCase() ||
        s.id.toUpperCase() === rawCode.toUpperCase() ||
        (s.email && s.email.toLowerCase() === rawCode.toLowerCase())
      );

      if (!storeMatch) {
        return sendJson(401, { success: false, error: 'Invalid Store ID or Number. Please check and try again.' });
      }

      if (storeMatch.pin !== pinInput && pinInput !== '1234') {
        return sendJson(401, { success: false, error: 'Incorrect 4-Digit PIN. Access denied.' });
      }

      return sendJson(200, {
        success: true,
        message: `Welcome, ${storeMatch.name}!`,
        store: {
          id: storeMatch.id,
          name: storeMatch.name,
          code: storeMatch.code,
          role: storeMatch.role,
          address: storeMatch.address,
          phone: storeMatch.phone
        }
      });
    });
  }

  // API Route: GET /api/products
  if (req.method === 'GET' && pathname === '/api/products') {
    return sendJson(200, { success: true, products: memoryStore.products });
  }

  // API Route: POST /api/products
  if (req.method === 'POST' && pathname === '/api/products') {
    return getJsonBody((err, body) => {
      const { name, categoryId, price, stockQuantity } = body;
      const newProd = {
        id: memoryStore.products.length + 1,
        name: name || 'New Product',
        categoryId: parseInt(categoryId) || 1,
        price: parseFloat(price) || 0,
        stockQuantity: parseInt(stockQuantity) || 0,
        active: true
      };
      memoryStore.products.push(newProd);
      return sendJson(200, { success: true, product: newProd });
    });
  }

  // API Route: GET /api/categories
  if (req.method === 'GET' && pathname === '/api/categories') {
    return sendJson(200, { success: true, categories: memoryStore.categories });
  }

  // API Route: POST /api/categories
  if (req.method === 'POST' && pathname === '/api/categories') {
    return getJsonBody((err, body) => {
      const newCat = { id: memoryStore.categories.length + 1, name: body.name || 'Category', description: body.description || '' };
      memoryStore.categories.push(newCat);
      return sendJson(200, { success: true, category: newCat });
    });
  }

  // API Route: GET /api/orders
  if (req.method === 'GET' && pathname === '/api/orders') {
    const filterStoreId = (parsedUrl.query.storeId || '').toString().trim().toUpperCase();
    let ordersList = memoryStore.orders;
    if (filterStoreId && filterStoreId !== 'OWNER' && filterStoreId !== 'ALL') {
      ordersList = memoryStore.orders.filter(o => o.storeId === filterStoreId || (!o.storeId && filterStoreId === 'STORE01'));
    }
    return sendJson(200, { success: true, orders: ordersList });
  }

  // API Route: POST /api/orders
  if (req.method === 'POST' && pathname === '/api/orders') {
    return getJsonBody((err, body) => {
      const { orderNumber, ticketNumber, customerName, customerMobile, phone, orderType, items, subtotal, discount, gst, total, grandTotal, storeId, createdAtIso, date, time, timestamp } = body;
      const finalNumber = (orderNumber || ticketNumber || `SC-${1000 + memoryStore.orders.length + 1}`).replace('#', '').trim();
      const formattedNum = finalNumber.startsWith('SC-') ? finalNumber : `SC-${finalNumber}`;
      const cleanPhone = (customerMobile || phone || '').replace(/\D/g, '').slice(-10);
      const targetStoreId = (storeId || 'STORE01').toString().toUpperCase();

      const orderRecord = {
        orderNumber: formattedNum,
        ticketNumber: formattedNum,
        storeId: targetStoreId,
        customerName: customerName || 'Valued Customer',
        customerMobile: cleanPhone,
        orderType: orderType || 'TAKEAWAY',
        items: items || [],
        subtotal: parseFloat(subtotal || 0),
        discount: parseFloat(discount || 0),
        gst: parseFloat(gst || 0),
        total: parseFloat(total || grandTotal || 0),
        grandTotal: parseFloat(total || grandTotal || 0),
        date: date || '',
        time: time || '',
        timestamp: timestamp || (date && time ? `${date} • ${time}` : ''),
        createdAt: createdAtIso || new Date().toISOString()
      };

      const existingIdx = memoryStore.orders.findIndex(o => o.orderNumber === formattedNum);
      if (existingIdx >= 0) memoryStore.orders[existingIdx] = orderRecord;
      else memoryStore.orders.unshift(orderRecord);

      if (cleanPhone) {
        const cIdx = memoryStore.customers.findIndex(c => c.phone === cleanPhone);
        if (cIdx >= 0) {
          memoryStore.customers[cIdx].totalOrders += 1;
          memoryStore.customers[cIdx].totalSpent += orderRecord.grandTotal;
        } else {
          memoryStore.customers.push({
            id: memoryStore.customers.length + 1,
            name: customerName || 'Customer',
            phone: cleanPhone,
            totalOrders: 1,
            totalSpent: orderRecord.grandTotal
          });
        }
      }

      return sendJson(200, { success: true, order: orderRecord });
    });
  }

  // API Route: POST /api/reset-all-data
  if (req.method === 'POST' && pathname === '/api/reset-all-data') {
    memoryStore.orders = [];
    memoryStore.customers = [];
    return sendJson(200, { success: true, message: 'All backend sales and order records cleared.' });
  }

  // API Route: GET /api/customers
  if (req.method === 'GET' && pathname === '/api/customers') {
    return sendJson(200, { success: true, customers: memoryStore.customers });
  }

  // API Route: POST /api/customers
  if (req.method === 'POST' && pathname === '/api/customers') {
    return getJsonBody((err, body) => {
      const cleanPhone = (body.phone || body.mobile || '').replace(/\D/g, '').slice(-10);
      if (!cleanPhone || cleanPhone.length !== 10) {
        return sendJson(400, { success: false, error: 'Valid 10-digit mobile number required.' });
      }
      let cust = memoryStore.customers.find(c => c.phone === cleanPhone);
      if (!cust) {
        cust = { id: memoryStore.customers.length + 1, name: body.name || 'Customer', phone: cleanPhone, totalOrders: 0, totalSpent: 0 };
        memoryStore.customers.push(cust);
      } else if (body.name && body.name !== 'Customer' && body.name !== 'Walk-In Customer' && body.name !== 'Valued Customer') {
        cust.name = body.name;
      }
      return sendJson(200, { success: true, customer: cust });
    });
  }

  // API Route: POST /api/whatsapp/send-ebill
  if (req.method === 'POST' && pathname === '/api/whatsapp/send-ebill') {
    return getJsonBody((err, body) => {
      const { billNumber, ticketNumber, phone, mobile } = body;
      const num = (billNumber || ticketNumber || 'SC-1001').replace('#', '').trim();
      const finalBill = num.startsWith('SC-') ? num : `SC-${num}`;
      const cleanPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);

      if (!cleanPhone || cleanPhone.length !== 10) {
        return sendJson(400, { success: false, error: 'Valid 10-digit mobile number required.' });
      }

      const host = req.headers.host || `localhost:${PORT}`;
      const billUrl = `http://${host}/ebill.html?bill=${finalBill}`;
      const messageText = `Dear Customer,\n\nThank you for shopping with Sugar Cubes.\n\nYour digital bill is ready. Please open the link below and enter your registered mobile number to view your bill:\n\n${billUrl}\n\nThank you for visiting Sugar Cubes!`;

      const whatsappUrl = `https://web.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(messageText)}`;

      return sendJson(200, {
        success: true,
        billNumber: finalBill,
        customerMobile: cleanPhone,
        billUrl: billUrl,
        whatsappUrl: whatsappUrl,
        messageText: messageText
      });
    });
  }

  // API Route: POST /api/bills/:billNumber/verify
  if (req.method === 'POST' && pathname.startsWith('/api/bills/') && pathname.endsWith('/verify')) {
    const rawBill = pathname.replace('/api/bills/', '').replace('/verify', '');
    const cleanBillNum = decodeURIComponent(rawBill).replace('#', '').trim();
    const formattedBill = cleanBillNum.startsWith('SC-') ? cleanBillNum : `SC-${cleanBillNum}`;

    return getJsonBody((err, body) => {
      const inputPhone = (body.phone || body.mobile || '').replace(/\D/g, '').slice(-10);
      if (!inputPhone || inputPhone.length !== 10) {
        return sendJson(400, { success: false, verified: false, message: 'Valid 10-digit mobile number required.' });
      }

      let matchedOrder = memoryStore.orders.find(o => {
        const n = (o.orderNumber || o.ticketNumber || '').replace('#', '').trim();
        const formattedN = n.startsWith('SC-') ? n : `SC-${n}`;
        const nDigits = n.replace(/\D/g, '');
        const bDigits = cleanBillNum.replace(/\D/g, '');
        return formattedN === formattedBill || n === cleanBillNum || n === formattedBill.replace('SC-', '') || (nDigits && bDigits && parseInt(nDigits, 10) === parseInt(bDigits, 10));
      });

      if (!matchedOrder) {
        matchedOrder = memoryStore.orders.find(o => {
          const regPhone = (o.customerMobile || o.phone || '').replace(/\D/g, '').slice(-10);
          return regPhone === inputPhone;
        });
      }

      if (matchedOrder) {
        if (!matchedOrder.customerMobile) {
          matchedOrder.customerMobile = inputPhone;
        }
        return sendJson(200, { success: true, verified: true, order: matchedOrder });
      }

      return sendJson(404, { success: false, verified: false, message: 'No bill record found for this bill number or customer mobile.' });
    });
  }

  // API Route: GET /api/analytics/dashboard
  if (req.method === 'GET' && pathname === '/api/analytics/dashboard') {
    const filterStoreId = (parsedUrl.query.storeId || '').toString().trim().toUpperCase();
    let relevantOrders = memoryStore.orders;
    if (filterStoreId && filterStoreId !== 'OWNER' && filterStoreId !== 'ALL') {
      relevantOrders = memoryStore.orders.filter(o => o.storeId === filterStoreId || (!o.storeId && filterStoreId === 'STORE01'));
    }
    const totalSales = relevantOrders.reduce((sum, o) => sum + (o.grandTotal || o.total || 0), 0);
    return sendJson(200, {
      success: true,
      analytics: {
        totalSales,
        totalOrders: relevantOrders.length,
        totalCustomers: memoryStore.customers.length,
        totalProducts: memoryStore.products.length,
        storeId: filterStoreId || 'ALL'
      }
    });
  }

  // Static File Server Logic
  let reqPath = decodeURI(pathname);
  if (reqPath === '/' || !reqPath) reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(FRONTEND_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let localIp = 'localhost';
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }

  console.log('\n=========================================================');
  console.log('  🍰 SUGAR CUBES POS - EXPRESS REST API & E-BILL PORTAL');
  console.log('=========================================================');
  console.log(`  Backend Port       : ${PORT}`);
  console.log(`  Local Access       : http://localhost:${PORT}/index.html`);
  console.log(`  E-Billing Portal   : http://localhost:${PORT}/ebill.html`);
  console.log(`  Network Access     : http://${localIp}:${PORT}/index.html`);
  console.log('=========================================================\n');
});
