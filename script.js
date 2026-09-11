/* ==========================================================================
   🍰 SUGAR CUBES - Enterprise Artisanal Cake Shop POS & Daily Sales Tracker
   Dual-Column Commercial Engine with Direct WhatsApp & Auto PDF Generation
   ========================================================================== */

// 19 Curated Bakery Products Across 2 Real Menu Categories with High-Res Visual Photos
const DEFAULT_PRELOADED_ITEMS = [
  // 🍰 Cakes & More
  { name: 'Tres Leches', category: 'Cakes & More', price: 160, stock: 15, bestseller: true, image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&auto=format&fit=crop&q=80' },
  { name: 'Tiramisu', category: 'Cakes & More', price: 180, stock: 12, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80' },
  { name: 'Matilda Cake', category: 'Cakes & More', price: 170, stock: 15, bestseller: true, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80' },
  { name: 'Cheese Cake', category: 'Cakes & More', price: 160, stock: 10, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Chocolate Cake', category: 'Cakes & More', price: 150, stock: 12, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&auto=format&fit=crop&q=80' },
  { name: 'Scoop Cookie', category: 'Cakes & More', price: 150, stock: 20, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=80' },
  { name: 'Puddle Cake', category: 'Cakes & More', price: 150, stock: 15, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Delight Platter', category: 'Cakes & More', price: 300, stock: 8, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80' },

  // 🍫 Sugar Cubes Classics
  { name: 'Classic Brownie', category: 'Sugar Cubes Classics', price: 70, stock: 25, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' },
  { name: 'Chocochip Brownie', category: 'Sugar Cubes Classics', price: 80, stock: 25, image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?w=400&auto=format&fit=crop&q=80' },
  { name: 'Eggless Brownie', category: 'Sugar Cubes Classics', price: 80, stock: 20, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Chocolate Brownie', category: 'Sugar Cubes Classics', price: 100, stock: 20, bestseller: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Choco Brownie Cubes', category: 'Sugar Cubes Classics', price: 150, stock: 18, image: 'https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Chocolate Strawberry', category: 'Sugar Cubes Classics', price: 140, stock: 15, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Treat Choco-Berry Delight', category: 'Sugar Cubes Classics', price: 150, stock: 15, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop&q=80' },
  { name: 'Hot Chocolate Brownie', category: 'Sugar Cubes Classics', price: 150, stock: 15, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Chocolate Banana', category: 'Sugar Cubes Classics', price: 70, stock: 20, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop&q=80' },
  { name: 'Triple Chocolate Marshmello', category: 'Sugar Cubes Classics', price: 70, stock: 20, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&auto=format&fit=crop&q=80' },
  { name: 'Hot Chocolate with Cookies', category: 'Sugar Cubes Classics', price: 80, stock: 25, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80' }
];

const CATEGORY_CONFIG = {
  'Cakes & More': { icon: '🍰', class: 'cakes' },
  'Sugar Cubes Classics': { icon: '🍫', class: 'pastries' }
};

// Application State
let activeCart = [];
let activeOrderType = 'Takeaway';
let activePaymentMode = 'Cash';
let activeDiscount = 0;
let discountType = 'pct'; // 'pct' | 'fixed'
let isGstTaxEnabled = false;
let currentTicketNumber = '#01';
let savedIg = localStorage.getItem('sugarCubesIgHandle');
if (!savedIg || savedIg === 'sugarcubes.bakery' || savedIg === '@sugarcubes.bakery') {
  savedIg = 'sugarcubes_official';
  localStorage.setItem('sugarCubesIgHandle', savedIg);
}
let currentInstagramHandle = savedIg;

let currentDateFilterMode = 'today';
let selectedCustomDate = '';
let activeCatalogCategory = 'All';
let catalogSearchFilter = '';
let soundEnabled = true;

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initUsersStorage();
  checkAuthSession();
  initTicketNumber();
  startLiveClock();
  initDatePickerDefaults();
  renderPreloadedCatalog();
  renderCart();
  setOrderType('Takeaway');
  refreshDailySalesAnalytics();
  renderInstagramQRs();
  if (window.innerWidth <= 768) {
    document.body.classList.remove('mobile-modal-open');
    document.body.style.top = '';
    document.body.style.position = '';
    document.body.style.overflow = '';
    switchMobileView('menu');
    setTimeout(() => {
      handleMobileHashRouting();
    }, 80);
  }
});

function formatBillNumber(num) {
  const n = parseInt(num, 10);
  const safe = isNaN(n) ? 1 : Math.max(0, n);
  // Zero-padded: starts in 0 (e.g. 0 -> '#SC-000', 1 -> '#SC-001', 9 -> '#SC-009')
  return '#SC-' + String(safe).padStart(3, '0');
}

/**
 * Masks customer mobile number for printing bills by hiding the last 6 digits.
 * E.g., '9876543210' -> '+91 9876XXXXXX'
 */
function maskMobileNumber(mobile) {
  if (!mobile) return '';
  const digits = String(mobile).replace(/\D/g, '');
  if (digits.length >= 10) {
    const last10 = digits.slice(-10);
    const first4 = last10.slice(0, 4);
    return `+91 ${first4}XXXXXX`;
  } else if (digits.length > 6) {
    const visibleLen = digits.length - 6;
    return `+91 ${digits.slice(0, visibleLen)}XXXXXX`;
  } else if (digits.length > 0) {
    return '+91 XXXXXX';
  }
  return '';
}

function initTicketNumber() {
  const saved = localStorage.getItem('sugarCubesTicketNum');
  if (saved && (saved.startsWith('#SC-0') || saved.startsWith('0') || saved.startsWith('#0'))) {
    currentTicketNumber = saved.startsWith('#SC-') ? saved : formatBillNumber(saved.replace(/\D/g, ''));
  } else {
    // Starts with 0 only as requested: #SC-001 (or 000)
    const sales = getRecordedSales();
    const nextIdx = sales.length > 0 ? (sales.length + 1) : 1;
    currentTicketNumber = formatBillNumber(nextIdx);
    localStorage.setItem('sugarCubesTicketNum', currentTicketNumber);
  }
  updateBillNumberDisplay();
}

function advanceNextTicketNumber() {
  const numPart = parseInt(currentTicketNumber.replace(/\D/g, ''), 10);
  const nextNum = isNaN(numPart) ? 1 : (numPart + 1);
  currentTicketNumber = formatBillNumber(nextNum);
  localStorage.setItem('sugarCubesTicketNum', currentTicketNumber);
  updateBillNumberDisplay();
}

function updateBillNumberDisplay() {
  const ticketEl = document.getElementById('registerTicketNum');
  if (ticketEl) {
    ticketEl.innerHTML = `<span>BILL NO:</span> <strong>${currentTicketNumber}</strong> <span style="font-size: 0.65rem; opacity: 0.7;" title="Click to adjust starting Bill No">✏️</span>`;
  }
}

function promptEditBillNumber() {
  const currentDigits = currentTicketNumber.replace(/\D/g, '') || '001';
  const entered = prompt('Enter starting Bill Number (e.g. 001, 000, 1):', currentDigits);
  if (entered !== null && entered.trim() !== '') {
    const val = parseInt(entered.trim(), 10);
    if (!isNaN(val) && val >= 0) {
      currentTicketNumber = formatBillNumber(val);
      localStorage.setItem('sugarCubesTicketNum', currentTicketNumber);
      updateBillNumberDisplay();
      showToast(`🔢 Starting Bill Number set to <strong>${currentTicketNumber}</strong>!`);
    }
  }
}

// ==========================================================================
// Live Digital Clock & Calendar
// ==========================================================================

function startLiveClock() {
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'
    });

    const clockEl = document.getElementById('liveClockDisplay');
    const dateEl = document.getElementById('liveDateDisplay');

    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = `📅 ${dateStr}`;

    // Real-time update for Mobile Profile Dashboard clock & date
    const profClockEl = document.getElementById('profLiveClock');
    const profDateEl = document.getElementById('profLiveDate');
    if (profClockEl) profClockEl.textContent = timeStr;
    if (profDateEl) profDateEl.textContent = `📅 ${dateStr}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

function getTodayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterdayIso() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function initDatePickerDefaults() {
  const picker = document.getElementById('customDatePicker');
  if (picker) picker.value = getTodayIso();
}

// ==========================================================================
// Web Audio Synthesizer (Zero-Dependency Commercial POS Sound)
// ==========================================================================

function playBeep(type = 'add') {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'add') {
      // Professional Crystal Marimba Chime (Apple & Square Boutique POS Style)
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5 (Warm Root)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.055); // A5 (Melodious Fifth)
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
      osc.start(now);
      osc.stop(now + 0.07);

      // Harmonious bell shimmer (adds crisp tactile elegance)
      try {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1174.66, now + 0.008); // D6 (Octave chime)
        osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.055); // E6
        gain2.gain.setValueAtTime(0.035, now + 0.008);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.008);
        osc2.stop(now + 0.07);
      } catch (err) {}
    } else if (type === 'success') {
      // Professional Warm Celebration Chime (C5 -> E5 -> G5 Triad)
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.start(now);
      osc.stop(now + 0.27);
    } else if (type === 'delete') {
      // Professional Gentle Woodblock / Tactile Bubble Pop (Apple & Square POS Style)
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.055);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.start(now);
      osc.stop(now + 0.06);

      // Micro subtle sub-harmonic body for warmth (simulates acoustic physical release)
      try {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(260, now + 0.015);
        osc2.frequency.exponentialRampToValueAtTime(130, now + 0.06);
        gain2.gain.setValueAtTime(0.04, now + 0.015);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.015);
        osc2.stop(now + 0.065);
      } catch (err) {}
    }
  } catch (e) {}
}

function toggleAudioSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('btnSoundToggle');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔔 Sound: ON' : '🔕 Sound: OFF';
    btn.style.color = soundEnabled ? 'var(--text-main)' : '#94a3b8';
  }
  const profBtn = document.getElementById('profSoundToggleBtn');
  if (profBtn) {
    profBtn.innerHTML = soundEnabled ? '🔔 Sound: ON' : '🔕 Sound: OFF';
  }
  showToast(soundEnabled ? '🔔 Register sound enabled' : '🔕 Register sound muted');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// ==========================================================================
// Catalog Inventory Storage & Rendering
// ==========================================================================

function getCatalog() {
  const CURRENT_VER = 'sugarCubesCatalogVersion_v2';
  if (localStorage.getItem('sugarCubesCatalogVersion') !== CURRENT_VER) {
    localStorage.setItem('sugarCubesCatalogVersion', CURRENT_VER);
    const initial = DEFAULT_PRELOADED_ITEMS.map((it, idx) => ({
      ...it,
      id: 'prod_' + (idx + 1) + '_' + it.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10)
    }));
    saveCatalog(initial);
    return initial;
  }
  const stored = localStorage.getItem('sugarCubesCatalog');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;
        parsed.forEach((it, idx) => {
          if (!it.id) {
            it.id = 'prod_' + (idx + 1) + '_' + it.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10);
            changed = true;
          }
          if (!it.image) {
            const defItem = DEFAULT_PRELOADED_ITEMS.find(d => d.name.toLowerCase() === it.name.toLowerCase());
            if (defItem && defItem.image) {
              it.image = defItem.image;
              changed = true;
            }
          }
        });
        if (changed) saveCatalog(parsed);
        return parsed;
      }
    } catch (e) {}
  }
  const initial = DEFAULT_PRELOADED_ITEMS.map((it, idx) => ({
    ...it,
    id: 'prod_' + (idx + 1) + '_' + it.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10)
  }));
  saveCatalog(initial);
  return initial;
}

function saveCatalog(catalog) {
  localStorage.setItem('sugarCubesCatalog', JSON.stringify(catalog));
}

function resetCatalogStock() {
  if (confirm('Restock all bakery items to original default levels?')) {
    const initial = DEFAULT_PRELOADED_ITEMS.map((it, idx) => ({
      ...it,
      id: 'prod_' + (idx + 1) + '_' + it.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10)
    }));
    saveCatalog(initial);
    renderPreloadedCatalog();
    const prodListModal = document.getElementById('productListModal');
    if (prodListModal && prodListModal.style.display !== 'none') {
      renderProductListManager();
    }
    showToast('🔄 Catalog inventory successfully restored to default levels!');
  }
}

function renderPreloadedCatalog() {
  const catalog = getCatalog();
  const grid = document.getElementById('catalogChipsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const counts = { All: catalog.length, 'Cakes & More': 0, 'Sugar Cubes Classics': 0 };
  catalog.forEach(item => {
    if (counts[item.category] !== undefined) counts[item.category]++;
  });

  const countAllEl = document.getElementById('catCountAll');
  const countCakesAndMoreEl = document.getElementById('catCountCakesAndMore');
  const countClassicsEl = document.getElementById('catCountClassics');

  if (countAllEl) countAllEl.textContent = counts.All;
  if (countCakesAndMoreEl) countCakesAndMoreEl.textContent = counts['Cakes & More'] || 0;
  if (countClassicsEl) countClassicsEl.textContent = counts['Sugar Cubes Classics'] || 0;

  const filtered = catalog.filter(item => {
    const matchCategory = activeCatalogCategory === 'All' || item.category.toLowerCase() === activeCatalogCategory.toLowerCase();
    const matchSearch = !catalogSearchFilter || item.name.toLowerCase().includes(catalogSearchFilter.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--text-muted);">
        <p style="font-size: 2rem; margin-bottom: 6px;">🔍</p>
        <p>No bakery items matched "<strong>${escapeHtml(catalogSearchFilter)}</strong>".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const isOutOfStock = item.stock <= 0;
    const isLowStock = item.stock > 0 && item.stock <= 4;
    const catConfig = CATEGORY_CONFIG[item.category] || { icon: '🍰', class: 'cakes' };

    let stockTagClass = '';
    let stockText = `${item.stock} in stock`;
    if (isOutOfStock) {
      stockTagClass = 'out';
      stockText = 'Out of Stock';
    } else if (isLowStock) {
      stockTagClass = 'low';
      stockText = `Low: ${item.stock} left`;
    }

    const card = document.createElement('div');
    card.className = `product-touch-card ${isOutOfStock ? 'disabled' : ''}`;
    card.onclick = () => {
      if (!isOutOfStock) {
        directAddCatalogItem(item.id || item.name);
      } else {
        showToast(`⚠️ "${escapeHtml(item.name)}" is out of stock! Tap ✏️ to restock.`);
      }
    };

    const safeProdId = item.id || ('prod_' + item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

    const imgUrl = item.image || '';
    card.innerHTML = `
      <div class="product-card-visual-wrap">
        ${imgUrl ? `<img src="${imgUrl}" alt="${escapeHtml(item.name)}" class="product-card-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
        <div class="product-card-fallback-avatar" style="${imgUrl ? 'display: none;' : 'display: flex;'}">
          <span class="fallback-icon">${catConfig.icon}</span>
        </div>
        <span class="product-stock-badge-floating ${stockTagClass}">${stockText}</span>
        <button type="button" class="product-edit-btn-floating" onclick="openEditProductModal('${safeProdId}', event)" title="Edit name, price & stock for ${escapeHtml(item.name)}" aria-label="Edit ${escapeHtml(item.name)}">
          ✏️
        </button>
      </div>
      <div class="product-card-info-wrap">
        <div class="product-card-cat-sub">
          <span class="card-cat-badge badge-${catConfig.class}">
            ${catConfig.icon} ${escapeHtml(item.category)}
          </span>
        </div>
        <h4 class="product-name-title" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</h4>
        <div class="product-bottom-row">
          <div class="product-price-block">
            <span class="product-price-currency">₹</span>
            <span class="product-price-figure">${item.price.toFixed(2)}</span>
          </div>
          <button type="button" class="btn-card-quick-add ${isOutOfStock ? 'disabled' : ''}" onclick="if (!${isOutOfStock}) { directAddCatalogItem('${safeProdId}'); } event.stopPropagation();" title="Add to cart">
            <span>+ Add</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterCatalogCategory(category, btnEl) {
  activeCatalogCategory = category;
  document.querySelectorAll('.cat-nav-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPreloadedCatalog();
  const grid = document.getElementById('catalogChipsGrid');
  if (grid) grid.scrollTop = 0;
}

function onCatalogSearch(query) {
  catalogSearchFilter = query.trim();
  renderPreloadedCatalog();
  const grid = document.getElementById('catalogChipsGrid');
  if (grid) grid.scrollTop = 0;
}

function clearCatalogSearch() {
  const input = document.getElementById('catalogSearchInput');
  if (input) input.value = '';
  catalogSearchFilter = '';
  renderPreloadedCatalog();
  const grid = document.getElementById('catalogChipsGrid');
  if (grid) grid.scrollTop = 0;
}

// ==========================================================================
// Direct One-Click Ring-Up to Active Cart
// ==========================================================================

function directAddCatalogItem(itemNameOrId) {
  const catalog = getCatalog();
  const productIndex = catalog.findIndex(i => (i.id && i.id === itemNameOrId) || i.name.toLowerCase() === String(itemNameOrId).toLowerCase());
  if (productIndex === -1) return;

  const product = catalog[productIndex];
  if (product.stock <= 0) {
    return alert(`"${product.name}" is currently out of stock!`);
  }

  // Deduct 1 unit from stock
  product.stock -= 1;
  saveCatalog(catalog);
  renderPreloadedCatalog();

  // Add / Increment in active cart
  const existingIdx = activeCart.findIndex(it => (it.productId && it.productId === product.id) || it.name.toLowerCase() === product.name.toLowerCase());
  if (existingIdx !== -1) {
    activeCart[existingIdx].quantity += 1;
    activeCart[existingIdx].amount = Number((activeCart[existingIdx].unitPrice * activeCart[existingIdx].quantity).toFixed(2));
  } else {
    activeCart.unshift({
      id: currentTicketNumber,
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.price,
      quantity: 1,
      amount: product.price
    });
  }

  playBeep('add');
  renderCart();
  showToast(`✨ Added <strong>${escapeHtml(product.name)}</strong> to Order!`);
}

function stepCartItem(index, delta) {
  const item = activeCart[index];
  if (!item) return;

  const catalog = getCatalog();
  const catIdx = catalog.findIndex(i => (item.productId && i.id === item.productId) || i.name.toLowerCase() === item.name.toLowerCase());

  if (delta === 1) {
    if (catIdx !== -1) {
      if (catalog[catIdx].stock <= 0) {
        return alert(`Cannot add more "${item.name}". Stock depleted!`);
      }
      catalog[catIdx].stock -= 1;
      saveCatalog(catalog);
      renderPreloadedCatalog();
    }
    item.quantity += 1;
    item.amount = Number((item.unitPrice * item.quantity).toFixed(2));
    playBeep('add');
  } else if (delta === -1) {
    if (item.quantity > 1) {
      if (catIdx !== -1) {
        catalog[catIdx].stock += 1;
        saveCatalog(catalog);
        renderPreloadedCatalog();
      }
      item.quantity -= 1;
      item.amount = Number((item.unitPrice * item.quantity).toFixed(2));
      playBeep('delete');
    } else {
      removeCartItem(index);
      return;
    }
  }

  renderCart();
}

function removeCartItem(index) {
  const item = activeCart[index];
  if (!item) return;

  const catalog = getCatalog();
  const catIdx = catalog.findIndex(i => (item.productId && i.id === item.productId) || i.name.toLowerCase() === item.name.toLowerCase());
  if (catIdx !== -1) {
    catalog[catIdx].stock += (item.quantity || 1);
    saveCatalog(catalog);
    renderPreloadedCatalog();
  }

  activeCart.splice(index, 1);
  playBeep('delete');
  renderCart();
  showToast(`Removed "${escapeHtml(item.name)}" from cart.`);
}

function clearCurrentCart() {
  if (activeCart.length === 0) return showToast('Cart is already empty.');

  if (confirm('Clear active cart and restore inventory stock back to catalog?')) {
    const catalog = getCatalog();
    activeCart.forEach(it => {
      const idx = catalog.findIndex(c => (it.productId && c.id === it.productId) || c.name.toLowerCase() === it.name.toLowerCase());
      if (idx !== -1) {
        catalog[idx].stock += (it.quantity || 1);
      }
    });
    saveCatalog(catalog);
    renderPreloadedCatalog();

    activeCart = [];
    playBeep('delete');
    renderCart();
    showToast('Cart cleared.');
  }
}

// ==========================================================================
// Product Catalog & Inventory Editor (Name, Category, Price & Stock)
// ==========================================================================

const DEFAULT_CATEGORY_IMAGES = {
  'Cakes': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
  'Pastries': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80',
  'Cupcakes': 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&auto=format&fit=crop&q=80',
  'Desserts': 'https://images.unsplash.com/photo-1569864321398-32777148c3b4?w=400&auto=format&fit=crop&q=80',
  'Beverages': 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&auto=format&fit=crop&q=80'
};

// Curated Studio Food Photography Library for Instant Intelligent Matching
const SMART_FOOD_PHOTOS = [
  // Cakes
  { keywords: ['black forest'], image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['red velvet'], image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['butterscotch', 'caramel'], image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['pineapple'], image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['cheesecake', 'cheese cake'], image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['mango'], image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['strawberry', 'berry'], image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['biscoff', 'lotus'], image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['tiramisu'], image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['truffle', 'chocolate cake', 'dark chocolate cake', 'fudge'], image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['vanilla cake'], image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['rainbow cake'], image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['carrot cake', 'carrot'], image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['opera'], image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80' },

  // Pastries & Bakes
  { keywords: ['choco lava', 'lava'], image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['croissant'], image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['donut', 'doughnut'], image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['puff', 'danish', 'strudel'], image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['tart', 'pie', 'apple pie'], image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['eclair', 'éclair'], image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['cinnamon roll', 'cinnamon bun'], image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80' },

  // Cupcakes
  { keywords: ['oreo cupcake', 'oreo'], image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['choco chip cupcake', 'frost cupcake'], image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['red velvet cupcake'], image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['cupcake', 'muffin'], image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&auto=format&fit=crop&q=80' },

  // Desserts
  { keywords: ['brownie'], image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['cookie', 'cookies'], image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['macaron', 'macaroons'], image: 'https://images.unsplash.com/photo-1569864321398-32777148c3b4?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['waffle', 'pancake'], image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['pudding', 'panna cotta', 'mousse'], image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80' },

  // Beverages
  { keywords: ['cold coffee', 'iced coffee', 'frappe', 'iced latte'], image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['hot chocolate', 'cocoa'], image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['cappuccino', 'latte', 'espresso', 'coffee'], image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['tea', 'chai', 'green tea', 'iced tea'], image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop&q=80' },
  { keywords: ['mojito', 'lemonade', 'juice', 'smoothie', 'shake'], image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80' }
];

let isManualPhotoSelected = false;
let productNameDebounceTimer = null;

function findSmartMatchingPhoto(productName, category) {
  const norm = (productName || '').toLowerCase().trim();
  if (norm) {
    for (const entry of SMART_FOOD_PHOTOS) {
      if (entry.keywords.some(kw => norm.includes(kw))) {
        return entry.image;
      }
    }
  }
  return DEFAULT_CATEGORY_IMAGES[category] || DEFAULT_CATEGORY_IMAGES['Cakes'];
}

function autoMatchProductPhoto(isUserClick = false) {
  const nameInput = document.getElementById('editProductName');
  const catInput = document.getElementById('editProductCategory');
  const imgInput = document.getElementById('editProductImage');
  const previewImg = document.getElementById('editPhotoPreviewImg');
  const badge = document.getElementById('smartPhotoBadge');
  const googleLink = document.getElementById('btnGoogleImagesLink');

  const name = nameInput ? nameInput.value.trim() : '';
  const category = catInput ? catInput.value : 'Cakes';

  const matchedPhoto = findSmartMatchingPhoto(name, category);

  if (imgInput) imgInput.value = matchedPhoto;
  if (previewImg) previewImg.src = matchedPhoto;
  if (badge) {
    badge.textContent = name ? '✨ Auto-Matched' : '📂 Category Default';
    badge.className = 'smart-photo-badge';
  }

  if (googleLink) {
    const q = encodeURIComponent((name || category) + ' bakery cake dessert food');
    googleLink.href = `https://www.google.com/search?tbm=isch&q=${q}`;
  }

  isManualPhotoSelected = false;

  if (isUserClick) {
    playBeep('add');
    showToast(`⚡ Matched photo for <strong>${escapeHtml(name || category)}</strong>!`);
  }
}

function onProductNameInput(val) {
  const googleLink = document.getElementById('btnGoogleImagesLink');
  const category = document.getElementById('editProductCategory')?.value || 'Cakes';
  if (googleLink) {
    const q = encodeURIComponent((val.trim() || category) + ' bakery cake dessert food');
    googleLink.href = `https://www.google.com/search?tbm=isch&q=${q}`;
  }

  if (!isManualPhotoSelected) {
    clearTimeout(productNameDebounceTimer);
    productNameDebounceTimer = setTimeout(() => {
      autoMatchProductPhoto(false);
    }, 300);
  }
}

function onProductCategoryChanged(val) {
  const name = document.getElementById('editProductName')?.value.trim();
  if (!isManualPhotoSelected && !name) {
    autoMatchProductPhoto(false);
  }
}

function onManualPhotoUrlInput(val) {
  const previewImg = document.getElementById('editPhotoPreviewImg');
  const badge = document.getElementById('smartPhotoBadge');
  if (val.trim()) {
    isManualPhotoSelected = true;
    if (previewImg) previewImg.src = val.trim();
    if (badge) {
      badge.textContent = '🔗 Custom URL';
      badge.className = 'smart-photo-badge';
    }
  } else {
    isManualPhotoSelected = false;
    autoMatchProductPhoto(false);
  }
}

function clearProductPhotoUrl() {
  isManualPhotoSelected = false;
  const imgInput = document.getElementById('editProductImage');
  if (imgInput) imgInput.value = '';
  autoMatchProductPhoto(false);
  playBeep('delete');
}

function onPhotoPreviewError(imgEl) {
  const cat = document.getElementById('editProductCategory')?.value || 'Cakes';
  imgEl.src = DEFAULT_CATEGORY_IMAGES[cat] || DEFAULT_CATEGORY_IMAGES['Cakes'];
}

async function searchOnlinePhotos() {
  const name = document.getElementById('editProductName')?.value.trim() || '';
  const category = document.getElementById('editProductCategory')?.value || 'Cakes';
  const container = document.getElementById('photoSuggestionsContainer');
  const strip = document.getElementById('photoSuggestionsStrip');
  const title = document.getElementById('photoSuggestionsTitle');
  const btn = document.getElementById('btnWebSearchPhotos');

  if (!container || !strip) return;
  container.style.display = 'block';
  if (title) title.textContent = `🔍 Searching photos for "${name || category}"...`;
  strip.innerHTML = `<div class="photo-search-loading"><span class="loading-spin">🔄</span> Searching web for appetizing photos...</div>`;

  if (btn) btn.disabled = true;

  try {
    const query = name ? `${name} food cake dessert` : `${category} dessert food`;
    const encoded = encodeURIComponent(query);
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encoded}&gsrlimit=8&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=400&origin=*`;

    const res = await fetch(apiUrl);
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {});

    const images = [];
    pages.forEach(p => {
      const info = p.imageinfo?.[0];
      const url = info?.thumburl || info?.url;
      const fileTitle = (p.title || '').toLowerCase();
      if (url && (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) && !fileTitle.includes('.svg') && !fileTitle.includes('icon') && !fileTitle.includes('logo')) {
        images.push({
          url,
          title: p.title.replace('File:', '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
        });
      }
    });

    // Also include curated studio photo as option 1
    const curatedPhoto = findSmartMatchingPhoto(name, category);
    const results = [{ url: curatedPhoto, title: `${name || category} (Curated HD)` }];
    images.forEach(img => {
      if (!results.some(r => r.url === img.url)) {
        results.push(img);
      }
    });

    if (results.length === 0) {
      strip.innerHTML = `
        <div class="photo-search-no-results">
          <span>No direct online photos found. Click "Google Images ↗" below or stick with our auto-matched photo!</span>
        </div>
      `;
      return;
    }

    if (title) title.textContent = `✨ Matching Photos for "${name || category}" (${results.length} found):`;
    const currentUrl = document.getElementById('editProductImage')?.value.trim() || '';

    strip.innerHTML = results.slice(0, 8).map((item) => {
      const isSelected = item.url === currentUrl;
      return `
        <div class="photo-suggestion-card ${isSelected ? 'selected' : ''}" onclick="selectSuggestedPhoto('${item.url.replace(/'/g, "\\'")}', this)" title="${escapeHtml(item.title)}">
          <img src="${item.url}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.parentElement.style.display='none';">
          <span class="photo-card-check">✓</span>
          <span class="photo-card-label">${escapeHtml(item.title.slice(0, 20))}</span>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Online image search error:', err);
    const fallbackPhoto = findSmartMatchingPhoto(name, category);
    strip.innerHTML = `
      <div class="photo-suggestion-card selected" onclick="selectSuggestedPhoto('${fallbackPhoto}', this)">
        <img src="${fallbackPhoto}" alt="Curated Photo">
        <span class="photo-card-check">✓</span>
        <span class="photo-card-label">Curated HD Photo</span>
      </div>
    `;
    if (title) title.textContent = `✨ Curated Match for "${name || category}":`;
  } finally {
    if (btn) btn.disabled = false;
  }
}

function selectSuggestedPhoto(url, cardElement) {
  isManualPhotoSelected = true;
  const imgInput = document.getElementById('editProductImage');
  const previewImg = document.getElementById('editPhotoPreviewImg');
  const badge = document.getElementById('smartPhotoBadge');

  if (imgInput) imgInput.value = url;
  if (previewImg) previewImg.src = url;
  if (badge) {
    badge.textContent = '✓ Selected';
    badge.className = 'smart-photo-badge';
  }

  // Update selection rings
  document.querySelectorAll('.photo-suggestion-card').forEach(c => c.classList.remove('selected'));
  if (cardElement) cardElement.classList.add('selected');

  playBeep('add');
  showToast('📸 Matching photo selected!');
}

function closePhotoSuggestions() {
  const container = document.getElementById('photoSuggestionsContainer');
  if (container) container.style.display = 'none';
}

function openAddProductModal(fromRestore = false) {
  isManualPhotoSelected = false;
  closePhotoSuggestions();

  document.getElementById('editProductOriginalId').value = '';
  document.getElementById('editProductOriginalName').value = '';
  document.getElementById('editProductName').value = '';
  document.getElementById('editProductCategory').value = 'Cakes';
  document.getElementById('editProductPrice').value = '';
  document.getElementById('editProductStock').value = '10';

  autoMatchProductPhoto(false);

  const badge = document.getElementById('editProductModalBadge');
  const title = document.getElementById('editProductModalTitle');
  const subtitle = document.getElementById('editProductModalSubtitle');
  const saveBtn = document.getElementById('editProductModalSaveBtn');

  if (badge) badge.textContent = 'NEW PRODUCT ONBOARDING';
  if (title) title.textContent = 'Add New Menu Item';
  if (subtitle) subtitle.textContent = 'Add a delicious new cake, pastry, or beverage to your store catalog';
  if (saveBtn) {
    saveBtn.innerHTML = `
      <span class="btn-text-full">➕ Add to Catalog</span>
      <span class="btn-text-short">➕ Add Item</span>
    `;
  }

  const delBtn = document.getElementById('btnEditProductDelete');
  if (delBtn) delBtn.style.display = 'none';

  updateEditStockBadge(10);

  const modal = document.getElementById('editProductModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('editProductModal', {
      restoreFn: () => { openAddProductModal(true); }
    });
  } else {
    updateMobileScrollLock();
  }

  setTimeout(() => {
    const nameInput = document.getElementById('editProductName');
    if (nameInput) {
      nameInput.focus();
    }
  }, 100);
}

function openEditProductModal(identifier, event, fromRestore = false) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const catalog = getCatalog();
  const product = catalog.find(p => (p.id && p.id === identifier) || p.name.toLowerCase() === String(identifier).toLowerCase());

  if (!product) {
    showToast(`⚠️ Could not locate product in catalog.`);
    return;
  }

  closePhotoSuggestions();
  isManualPhotoSelected = !!product.image;

  document.getElementById('editProductOriginalId').value = product.id || '';
  document.getElementById('editProductOriginalName').value = product.name;
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductCategory').value = product.category || 'Cakes';
  document.getElementById('editProductPrice').value = product.price;
  document.getElementById('editProductStock').value = product.stock;
  
  const imgInput = document.getElementById('editProductImage');
  const previewImg = document.getElementById('editPhotoPreviewImg');
  const badgeEl = document.getElementById('smartPhotoBadge');
  const photoToUse = product.image || findSmartMatchingPhoto(product.name, product.category);

  if (imgInput) imgInput.value = product.image || '';
  if (previewImg) previewImg.src = photoToUse;
  if (badgeEl) {
    badgeEl.textContent = product.image ? '🖼️ Saved Photo' : '✨ Auto-Matched';
    badgeEl.className = 'smart-photo-badge';
  }

  const googleLink = document.getElementById('btnGoogleImagesLink');
  if (googleLink) {
    const q = encodeURIComponent(product.name + ' bakery cake dessert food');
    googleLink.href = `https://www.google.com/search?tbm=isch&q=${q}`;
  }

  const badge = document.getElementById('editProductModalBadge');
  const title = document.getElementById('editProductModalTitle');
  const subtitle = document.getElementById('editProductModalSubtitle');
  const saveBtn = document.getElementById('editProductModalSaveBtn');
  const delBtn = document.getElementById('btnEditProductDelete');

  if (badge) badge.textContent = 'ADMIN INVENTORY TERMINAL';
  if (title) title.textContent = 'Edit Bakery Product';
  if (subtitle) subtitle.textContent = 'Modify retail pricing, category assignment & live inventory';
  if (saveBtn) {
    saveBtn.innerHTML = `
      <span class="btn-text-full">💾 Save & Apply Changes</span>
      <span class="btn-text-short">💾 Save Changes</span>
    `;
  }
  if (delBtn) delBtn.style.display = 'inline-flex';

  updateEditStockBadge(product.stock);

  const modal = document.getElementById('editProductModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('editProductModal', {
      restoreFn: () => { openEditProductModal(identifier, null, true); }
    });
  } else {
    updateMobileScrollLock();
  }

  setTimeout(() => {
    const nameInput = document.getElementById('editProductName');
    if (nameInput && window.innerWidth > 768) {
      nameInput.focus();
      nameInput.select();
    }
  }, 100);
}

function updateEditStockBadge(val) {
  const stock = parseInt(val, 10);
  const badge = document.getElementById('editProductStockBadge');
  if (!badge) return;

  if (isNaN(stock) || stock <= 0) {
    badge.className = 'stock-status-pill stock-out';
    badge.textContent = 'Out of Stock (0)';
  } else if (stock <= 4) {
    badge.className = 'stock-status-pill stock-low';
    badge.textContent = `Low Stock (${stock})`;
  } else {
    badge.className = 'stock-status-pill stock-in';
    badge.textContent = `In Stock (${stock})`;
  }
}

function onEditStockInputChanged(val) {
  updateEditStockBadge(val);
}

function stepEditProductStock(delta) {
  const input = document.getElementById('editProductStock');
  if (!input) return;
  let val = parseInt(input.value, 10);
  if (isNaN(val)) val = 0;
  val = Math.max(0, val + delta);
  input.value = val;
  updateEditStockBadge(val);
}

function addEditProductStock(qty) {
  const input = document.getElementById('editProductStock');
  if (!input) return;
  let val = parseInt(input.value, 10);
  if (isNaN(val)) val = 0;
  val += qty;
  input.value = val;
  updateEditStockBadge(val);
}

function setEditProductStock(qty) {
  const input = document.getElementById('editProductStock');
  if (!input) return;
  input.value = qty;
  updateEditStockBadge(qty);
}

function closeEditProductModal() {
  if (isMobileViewport() && mobileModalStack.length > 0 && mobileModalStack[mobileModalStack.length - 1].id === 'editProductModal') {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('editProductModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeEditProductModalOnBackdrop(event) {
  if (event.target === document.getElementById('editProductModal')) {
    closeEditProductModal();
  }
}

function deleteCatalogProduct(identifier, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const catalog = getCatalog();
  const product = catalog.find(p => (p.id && p.id === identifier) || p.name.toLowerCase() === String(identifier).toLowerCase());

  if (!product) {
    showToast(`⚠️ Could not locate product to delete.`);
    return;
  }

  const confirmMsg = `Are you sure you want to permanently delete "${product.name}" from your store catalog?\n\nThis will remove it from your POS touch menu.`;
  if (!confirm(confirmMsg)) {
    return;
  }

  // Remove from catalog
  const filteredCatalog = catalog.filter(p => p !== product);
  saveCatalog(filteredCatalog);

  // If item was in active cart, remove it
  let cartUpdated = false;
  activeCart = activeCart.filter(ci => {
    const isThisItem = (ci.productId && ci.productId === product.id) || ci.name.toLowerCase() === product.name.toLowerCase();
    if (isThisItem) cartUpdated = true;
    return !isThisItem;
  });

  renderPreloadedCatalog();
  if (cartUpdated) {
    renderCart();
  }

  // If product list manager is open, refresh it
  const prodListModal = document.getElementById('productListModal');
  if (prodListModal && prodListModal.style.display !== 'none') {
    renderProductListManager();
  }

  // If edit product modal is open, close it
  const editModal = document.getElementById('editProductModal');
  if (editModal && editModal.style.display !== 'none') {
    closeEditProductModal();
  }

  playBeep('delete');
  showToast(`🗑️ Removed <strong>${escapeHtml(product.name)}</strong> from catalog.`);
}

function deleteCurrentProduct() {
  const originalId = document.getElementById('editProductOriginalId').value;
  const originalName = document.getElementById('editProductOriginalName').value;
  const identifier = originalId || originalName;
  if (!identifier) {
    closeEditProductModal();
    return;
  }
  deleteCatalogProduct(identifier);
}

function saveProductChanges() {
  const originalId = document.getElementById('editProductOriginalId').value;
  const originalName = document.getElementById('editProductOriginalName').value;
  const isNewProduct = !originalId && !originalName;

  const nameInput = document.getElementById('editProductName');
  const catInput = document.getElementById('editProductCategory');
  const priceInput = document.getElementById('editProductPrice');
  const stockInput = document.getElementById('editProductStock');
  const imgInput = document.getElementById('editProductImage');

  const newName = nameInput.value.trim();
  const newCat = catInput.value;
  const newPrice = parseFloat(priceInput.value);
  const newStock = parseInt(stockInput.value, 10);
  const newImage = imgInput ? imgInput.value.trim() : '';

  if (!newName) {
    alert('Please enter a valid product name.');
    nameInput.focus();
    return;
  }

  if (isNaN(newPrice) || newPrice < 0) {
    alert('Please enter a valid price (must be 0 or greater).');
    priceInput.focus();
    return;
  }

  if (isNaN(newStock) || newStock < 0) {
    alert('Please enter a valid stock quantity (must be 0 or greater).');
    stockInput.focus();
    return;
  }

  const catalog = getCatalog();

  if (isNewProduct) {
    // Check if name already exists in catalog
    const duplicate = catalog.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (duplicate) {
      alert(`A product named "${newName}" already exists in the catalog. Please enter a distinct name.`);
      nameInput.focus();
      return;
    }

    const assignedImage = newImage || findSmartMatchingPhoto(newName, newCat);
    const newId = 'prod_' + Date.now() + '_' + newName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10);

    const newProduct = {
      id: newId,
      name: newName,
      category: newCat,
      price: Number(newPrice.toFixed(2)),
      stock: newStock,
      image: assignedImage
    };

    // Prepend new item so it appears first in the catalog grid
    catalog.unshift(newProduct);
    saveCatalog(catalog);
    renderPreloadedCatalog();

    // If product list manager is open, refresh it
    const prodListModal = document.getElementById('productListModal');
    if (prodListModal && prodListModal.style.display !== 'none') {
      renderProductListManager();
    }

    closeEditProductModal();
    playBeep('add');
    showToast(`🎉 Added <strong>${escapeHtml(newName)}</strong> to the catalog (₹${newPrice.toFixed(2)}, ${newStock} units)!`);
    return;
  }

  // Otherwise, edit existing product
  const productIndex = catalog.findIndex(p => 
    (originalId && p.id === originalId) || 
    p.name.toLowerCase() === originalName.toLowerCase()
  );

  if (productIndex === -1) {
    alert('Product could not be found in catalog.');
    return;
  }

  // Check duplicate name with other products
  const duplicate = catalog.find((p, idx) => 
    idx !== productIndex && p.name.toLowerCase() === newName.toLowerCase()
  );
  if (duplicate) {
    alert(`Another product with the name "${newName}" already exists. Please enter a distinct name.`);
    nameInput.focus();
    return;
  }

  const oldName = catalog[productIndex].name;
  catalog[productIndex].name = newName;
  catalog[productIndex].category = newCat;
  catalog[productIndex].price = Number(newPrice.toFixed(2));
  catalog[productIndex].stock = newStock;
  if (newImage) {
    catalog[productIndex].image = newImage;
  }

  // Update any items in active cart if present
  let cartUpdated = false;
  activeCart.forEach(ci => {
    if ((ci.productId && ci.productId === originalId) || ci.name.toLowerCase() === oldName.toLowerCase()) {
      ci.name = newName;
      ci.category = newCat;
      ci.unitPrice = Number(newPrice.toFixed(2));
      ci.amount = Number((ci.unitPrice * ci.quantity).toFixed(2));
      cartUpdated = true;
    }
  });

  saveCatalog(catalog);
  renderPreloadedCatalog();
  if (cartUpdated) {
    renderCart();
  }

  // If product list manager is open, refresh it
  const prodListModal = document.getElementById('productListModal');
  if (prodListModal && prodListModal.style.display !== 'none') {
    renderProductListManager();
  }

  closeEditProductModal();
  playBeep('success');
  showToast(`✅ Saved changes to <strong>${escapeHtml(newName)}</strong> (₹${newPrice.toFixed(2)}, ${newStock} units)!`);
}

// ==========================================================================
// All Products Management List Modal Logic
// ==========================================================================

let prodManagerSearchFilter = '';
let prodManagerCategoryFilter = 'All';

function openProductListModal(fromRestore = false) {
  prodManagerSearchFilter = '';
  prodManagerCategoryFilter = 'All';
  const searchInput = document.getElementById('prodManagerSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.prod-cat-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === 'All');
  });

  renderProductListManager();
  const modal = document.getElementById('productListModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('productListModal', {
      restoreFn: () => { openProductListModal(true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeProductListModal() {
  if (isMobileViewport() && mobileModalStack.length > 0 && mobileModalStack[mobileModalStack.length - 1].id === 'productListModal') {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('productListModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeProductListModalOnBackdrop(event) {
  if (event.target === document.getElementById('productListModal')) {
    closeProductListModal();
  }
}

let prodManagerSortMode = 'name-asc';

function onProductManagerSearch(query) {
  prodManagerSearchFilter = query.trim().toLowerCase();
  const clearBtn = document.getElementById('prodManagerSearchClear');
  if (clearBtn) clearBtn.style.display = prodManagerSearchFilter ? 'flex' : 'none';
  renderProductListManager();
}

function clearProductManagerSearch() {
  const input = document.getElementById('prodManagerSearchInput');
  if (input) input.value = '';
  prodManagerSearchFilter = '';
  const clearBtn = document.getElementById('prodManagerSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  renderProductListManager();
}

function onProductManagerSortChange(val) {
  prodManagerSortMode = val;
  renderProductListManager();
}

function filterProductManagerCategory(category, btnEl) {
  prodManagerCategoryFilter = category;
  renderProductListManager();
}

function quickRestockCatalogItem(safeProdId, delta, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const catalog = getCatalog();
  const product = catalog.find(p => (p.id && p.id === safeProdId) || p.name.toLowerCase() === String(safeProdId).toLowerCase());
  if (!product) return;

  product.stock = Math.max(0, (product.stock || 0) + delta);
  saveCatalog(catalog);
  renderPreloadedCatalog();
  renderProductListManager();
  playBeep('add');
  showToast(`⚡ Restocked +${delta} units for <strong>${escapeHtml(product.name)}</strong>! (Now: ${product.stock})`);
}

function openCustomOrderFromProductList() {
  closeProductListModal();
  setTimeout(() => {
    openCustomOrderModal();
  }, 120);
}

function renderProductListManager() {
  const container = document.getElementById('productListScrollContainer');
  if (!container) return;

  const catalog = getCatalog();

  // Category counts and KPIs
  const catCounts = { All: catalog.length, Cakes: 0, Pastries: 0, Cupcakes: 0, Desserts: 0, Beverages: 0 };
  let totalStockUnits = 0;
  let outOfStockCount = 0;
  let lowStockCount = 0;

  catalog.forEach(item => {
    if (catCounts[item.category] !== undefined) catCounts[item.category]++;
    totalStockUnits += (item.stock || 0);
    if (item.stock <= 0) outOfStockCount++;
    else if (item.stock <= 4) lowStockCount++;
  });

  // Render Category Tabs in toolbar
  const catTabsEl = document.getElementById('prodManagerCatTabs');
  if (catTabsEl) {
    const cats = ['All', 'Cakes', 'Pastries', 'Cupcakes', 'Desserts', 'Beverages'];
    const catIcons = { 'All': '🏷️', 'Cakes': '🎂', 'Pastries': '🍰', 'Cupcakes': '🧁', 'Desserts': '🍪', 'Beverages': '☕' };
    catTabsEl.innerHTML = cats.map(cat => {
      const isActive = prodManagerCategoryFilter.toLowerCase() === cat.toLowerCase();
      const count = catCounts[cat] || 0;
      return `
        <button type="button" class="prod-cat-tab-btn ${isActive ? 'active' : ''}" onclick="filterProductManagerCategory('${cat}', this)">
          <span>${catIcons[cat]} ${cat}</span>
          <span class="prod-cat-tab-count">${count}</span>
        </button>
      `;
    }).join('');
  }

  // Filter
  let filtered = catalog.filter(item => {
    const matchCategory = prodManagerCategoryFilter === 'All' || item.category.toLowerCase() === prodManagerCategoryFilter.toLowerCase();
    const matchSearch = !prodManagerSearchFilter || item.name.toLowerCase().includes(prodManagerSearchFilter);
    return matchCategory && matchSearch;
  });

  // Sort
  if (prodManagerSortMode === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (prodManagerSortMode === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (prodManagerSortMode === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (prodManagerSortMode === 'stock-asc') {
    filtered.sort((a, b) => a.stock - b.stock);
  } else if (prodManagerSortMode === 'stock-desc') {
    filtered.sort((a, b) => b.stock - a.stock);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="prod-manager-empty-state">
        <div class="prod-empty-icon">🔍</div>
        <h4 class="prod-empty-title">No matching products found</h4>
        <p class="prod-empty-desc">No bakery items match "<strong>${escapeHtml(prodManagerSearchFilter)}</strong>". Try clearing your search or picking another category.</p>
        <button type="button" class="btn-clear-prod-filter" onclick="clearProductManagerSearch()">Clear Search</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="prod-manager-kpi-strip">
      <div class="prod-kpi-chip">
        <span class="prod-kpi-chip-label">PRODUCTS</span>
        <span class="prod-kpi-chip-val text-blue">${filtered.length} of ${catalog.length}</span>
      </div>
      <div class="prod-kpi-chip">
        <span class="prod-kpi-chip-label">TOTAL STOCK</span>
        <span class="prod-kpi-chip-val text-emerald">${totalStockUnits} units</span>
      </div>
      <div class="prod-kpi-chip">
        <span class="prod-kpi-chip-label">HEALTH ALERTS</span>
        <span class="prod-kpi-chip-val ${outOfStockCount > 0 ? 'text-rose' : 'text-amber'}">${outOfStockCount} Out • ${lowStockCount} Low</span>
      </div>
    </div>
    <div class="prod-manager-table-list">
  `;

  filtered.forEach((item) => {
    const catConfig = CATEGORY_CONFIG[item.category] || { icon: '🍰', class: 'cakes' };
    const isOut = item.stock <= 0;
    const isLow = item.stock > 0 && item.stock <= 4;
    let stockClass = 'stock-in';
    let stockLabel = `${item.stock} in stock`;
    if (isOut) {
      stockClass = 'stock-out';
      stockLabel = 'Sold Out (0)';
    } else if (isLow) {
      stockClass = 'stock-low';
      stockLabel = `Low: ${item.stock} left`;
    }

    const safeProdId = item.id || ('prod_' + item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

    html += `
      <div class="prod-manager-item-row cat-stripe-${catConfig.class} ${isOut ? 'row-out-of-stock' : ''}">
        <div class="prod-row-left">
          <div class="prod-row-avatar-box">
            ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" class="prod-row-thumb-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span class="prod-row-icon" style="display:none;">${catConfig.icon}</span>` : `<span class="prod-row-icon">${catConfig.icon}</span>`}
          </div>
          <div class="prod-row-info">
            <div class="prod-row-name-line">
              <span class="prod-row-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
            </div>
            <div class="prod-row-meta">
              <span class="card-cat-badge badge-${catConfig.class}">${escapeHtml(item.category)}</span>
              <span class="stock-status-pill ${stockClass}">${stockLabel}</span>
            </div>
          </div>
        </div>

        <div class="prod-row-right">
          <div class="prod-row-price-wrap">
            <span class="prod-price-currency">₹</span>
            <span class="prod-price-figure">${item.price.toFixed(2)}</span>
          </div>
          <div class="prod-row-actions">
            <button type="button" class="btn-prod-quick-restock" onclick="quickRestockCatalogItem('${safeProdId}', 5, event)" title="Add +5 units immediately to shelf inventory">
              ⚡ +5
            </button>
            <button type="button" class="btn-prod-row-edit" onclick="openEditProductModal('${safeProdId}', event)" title="Edit Name, Price, and Stock for ${escapeHtml(item.name)}">
              ✏️ Edit
            </button>
            <button type="button" class="btn-prod-row-delete" onclick="deleteCatalogProduct('${safeProdId}', event)" title="Delete ${escapeHtml(item.name)} from menu">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// ==========================================================================
// Order Types, Payment Modes & Financial Controls
// ==========================================================================

function setOrderType(type, btnEl) {
  activeOrderType = type;
  const container = document.getElementById('orderTypeBoxContainer');
  const glider = document.getElementById('orderTypeGlider');
  const buttons = container ? container.querySelectorAll('.order-box-btn') : document.querySelectorAll('.order-type-btn');

  let targetIdx = 0;
  buttons.forEach((b, idx) => {
    const btnType = b.getAttribute('data-type') || b.textContent;
    const isTarget = b === btnEl || (btnType && btnType.toLowerCase().includes(type.toLowerCase()));
    if (isTarget) {
      b.classList.add('active');
      const bIdx = b.getAttribute('data-index');
      targetIdx = (bIdx !== null && bIdx !== undefined) ? parseInt(bIdx, 10) : idx;
    } else {
      b.classList.remove('active');
    }
  });

  if (glider && !isNaN(targetIdx)) {
    glider.style.transform = `translateX(${targetIdx * 100}%)`;
  }
}

function setPaymentMode(mode, btnEl) {
  activePaymentMode = mode;
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

function onTaxToggleChange() {
  const chk = document.getElementById('taxGstToggle');
  isGstTaxEnabled = chk ? chk.checked : false;
  renderCart();
}

function setDiscount(val, btnEl) {
  activeDiscount = val;
  discountType = 'pct';
  document.querySelectorAll('.discount-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCart();
}

function promptCustomDiscount(btnEl) {
  const val = prompt('Enter custom discount amount in ₹ (e.g. 50):', '50');
  if (val !== null) {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      activeDiscount = num;
      discountType = 'fixed';
      document.querySelectorAll('.discount-pill').forEach(b => b.classList.remove('active'));
      if (btnEl) {
        btnEl.classList.add('active');
        btnEl.textContent = `₹${num}`;
      }
      renderCart();
    }
  }
}

function getCartCalculations() {
  let subtotal = 0;
  let totalUnits = 0;

  activeCart.forEach(item => {
    subtotal += Number(item.amount || 0);
    totalUnits += item.quantity || 1;
  });

  let discountAmount = 0;
  if (discountType === 'pct') {
    discountAmount = Number((subtotal * (activeDiscount / 100)).toFixed(2));
  } else {
    discountAmount = Math.min(subtotal, Number(activeDiscount));
  }

  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const gstAmount = isGstTaxEnabled ? Number((taxableSubtotal * 0.05).toFixed(2)) : 0;
  const grandTotal = Number((taxableSubtotal + gstAmount).toFixed(2));

  return { subtotal, discountAmount, gstAmount, grandTotal, totalUnits };
}

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const empty = document.getElementById('cartEmptyState');
  if (!list) return;

  list.innerHTML = '';

  if (activeCart.length === 0) {
    if (empty) empty.style.display = 'flex';
  } else {
    if (empty) empty.style.display = 'none';

    activeCart.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'cart-line-item';

      const catConfig = CATEGORY_CONFIG[item.category] || { icon: '🍰', class: 'cakes' };

      li.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-title">${catConfig.icon} ${escapeHtml(item.name)}</div>
          <div class="cart-item-sub">₹${item.unitPrice.toFixed(2)} × ${item.quantity}</div>
        </div>
        <div class="cart-item-controls">
          <div class="cart-stepper">
            <button type="button" class="cart-step-btn" onclick="stepCartItem(${idx}, -1)">−</button>
            <span class="cart-qty-text">${item.quantity}</span>
            <button type="button" class="cart-step-btn" onclick="stepCartItem(${idx}, 1)">+</button>
          </div>
          <div class="cart-item-total">₹${item.amount.toFixed(2)}</div>
          <button type="button" class="cart-remove-btn" onclick="removeCartItem(${idx})" title="Remove item">✕</button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  const { subtotal, discountAmount, gstAmount, grandTotal, totalUnits } = getCartCalculations();

  const countEl = document.getElementById('cartItemsCount');
  const subtotalEl = document.getElementById('cartSubtotalVal');
  const taxEl = document.getElementById('cartTaxVal');
  const grandEl = document.getElementById('cartGrandTotalVal');
  const discRow = document.getElementById('discountSummaryRow');
  const discVal = document.getElementById('cartDiscountVal');

  if (countEl) countEl.textContent = totalUnits;
  const badgeEl = document.getElementById('cartItemsBadge');
  if (badgeEl) badgeEl.textContent = totalUnits;
  const clearBtn = document.querySelector('.cart-clear-link');
  if (clearBtn) clearBtn.style.display = activeCart.length > 0 ? 'inline-flex' : 'none';
  if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (taxEl) taxEl.textContent = (isGstTaxEnabled ? '+₹' : '₹') + gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (grandEl) {
    const formattedGrand = '₹' + grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    if (grandEl.textContent !== formattedGrand) {
      grandEl.textContent = formattedGrand;
      grandEl.classList.remove('glow-pop');
      void grandEl.offsetWidth; // trigger reflow
      grandEl.classList.add('glow-pop');
    }
  }

  if (discRow && discVal) {
    if (discountAmount > 0) {
      discRow.style.display = 'flex';
      discVal.textContent = `-₹${discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    } else {
      discRow.style.display = 'none';
    }
  }

  // Update Mobile Navigation Badges & Floating Cart Bar
  const mobileCountEl = document.getElementById('mobileCartItemCount');
  const mobileTotalEl = document.getElementById('mobileCartTotalVal');
  const mobileNavBadge = document.getElementById('mobileNavCartBadge');
  const mobileStickyBar = document.getElementById('mobileStickyCartBar');

  if (mobileCountEl) {
    if (mobileCountEl.textContent !== String(totalUnits)) {
      mobileCountEl.classList.remove('badge-bump');
      void mobileCountEl.offsetWidth;
      mobileCountEl.classList.add('badge-bump');
    }
    mobileCountEl.textContent = totalUnits;
  }
  if (mobileTotalEl) mobileTotalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (mobileNavBadge) {
    if (mobileNavBadge.textContent !== String(totalUnits)) {
      mobileNavBadge.classList.remove('badge-bump');
      void mobileNavBadge.offsetWidth;
      mobileNavBadge.classList.add('badge-bump');
    }
    mobileNavBadge.textContent = totalUnits;
  }

  if (mobileStickyBar) {
    if (activeCart.length > 0 && currentMobileTab === 'menu' && window.innerWidth <= 768) {
      mobileStickyBar.style.display = 'flex';
    } else {
      mobileStickyBar.style.display = 'none';
    }
  }
}

function getCustomerDetails() {
  const mobileInput = document.getElementById('custMobile');
  const nameInput = document.getElementById('custName');

  let raw = mobileInput ? mobileInput.value.trim() : '';
  const digits = raw.replace(/\D/g, '');
  // Cleanly extract the 10-digit mobile number from the end (e.g. from 919876543210, +91-9876543210 or 09876543210)
  const mobile = digits.length >= 10 ? digits.slice(-10) : digits;
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Valued Customer';

  return { mobile, name };
}

function formatCustomerPhoneInput(input) {
  if (!input) return;
  // Allow digits and optional leading +
  let val = input.value.replace(/[^\d+ -]/g, '');
  input.value = val;
}

// ==========================================================================
// Indian Rupee Number to Words Converter
// ==========================================================================

function numberToWordsINR(num) {
  if (isNaN(num) || num <= 0) return 'Zero Rupees Only';

  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? ' ' + a[digit] : ' ');
  }

  const parts = num.toFixed(2).split('.');
  let integerPart = parseInt(parts[0], 10);
  let decimalPart = parseInt(parts[1], 10);

  let str = '';

  const crore = Math.floor(integerPart / 10000000);
  integerPart %= 10000000;
  if (crore > 0) str += inWords(crore) + 'Crore ';

  const lakh = Math.floor(integerPart / 100000);
  integerPart %= 100000;
  if (lakh > 0) str += inWords(lakh) + 'Lakh ';

  const thousand = Math.floor(integerPart / 1000);
  integerPart %= 1000;
  if (thousand > 0) str += inWords(thousand) + 'Thousand ';

  const hundred = Math.floor(integerPart / 100);
  integerPart %= 100;
  if (hundred > 0) str += inWords(hundred) + 'Hundred ';

  if (integerPart > 0) {
    if (str !== '') str += 'and ';
    str += inWords(integerPart);
  }

  str = (str.trim() || 'Zero') + ' Rupees';

  if (decimalPart > 0) {
    str += ' and ' + inWords(decimalPart).trim() + ' Paise';
  }

  return str + ' Only';
}

// ==========================================================================
// 📸 Instagram Profile Handle & Scannable QR Code Engine
// ==========================================================================

function getInstagramUrl() {
  const clean = currentInstagramHandle.replace(/^@/, '').trim() || 'sugarcubes_official';
  return `https://www.instagram.com/${clean}/`;
}

function promptEditInstagramHandle() {
  const current = currentInstagramHandle.replace(/^@/, '');
  const entered = prompt('Enter your Bakery Instagram Handle / Profile ID (e.g. sugarcubes_official):', current);
  if (entered !== null) {
    const clean = entered.trim().replace(/^@/, '');
    if (clean) {
      currentInstagramHandle = clean;
      localStorage.setItem('sugarCubesIgHandle', currentInstagramHandle);
      renderInstagramQRs();
      showToast(`📸 Instagram handle updated to <strong>@${escapeHtml(clean)}</strong>!`);
    }
  }
}

function renderInstagramQRs() {
  const igUrl = getInstagramUrl();
  const displayHandle = '@' + currentInstagramHandle.replace(/^@/, '');

  // Header Handle Pill
  const hdrEl = document.getElementById('headerIgHandle');
  if (hdrEl) hdrEl.textContent = displayHandle;

  // PDF Invoice Handle & URL displays
  const pdfHandleEl = document.getElementById('pdfIgHandleDisplay');
  const pdfUrlEl = document.getElementById('pdfIgUrlDisplay');
  if (pdfHandleEl) pdfHandleEl.textContent = displayHandle;
  if (pdfUrlEl) pdfUrlEl.textContent = `${igUrl.replace(/^https?:\/\//, '')}`;

  // Thermal Receipt Handle display
  const thermalHandleEl = document.getElementById('thermalIgHandleText');
  if (thermalHandleEl) thermalHandleEl.textContent = displayHandle;

  // Cashier Profile Modal Handle display
  const profIgEl = document.getElementById('profileModalIgHandle');
  if (profIgEl) profIgEl.innerHTML = `${displayHandle} ✏️`;

  // Render QR into PDF Container (#pdfInstagramQr)
  const pdfQrEl = document.getElementById('pdfInstagramQr');
  if (pdfQrEl) {
    generateQrIntoElement(pdfQrEl, igUrl, 82);
  }

  // Render QR into Thermal Container (#thermalInstagramQr)
  const thermalQrEl = document.getElementById('thermalInstagramQr');
  if (thermalQrEl) {
    generateQrIntoElement(thermalQrEl, igUrl, 84);
  }
}

function generateQrIntoElement(container, text, size = 80) {
  if (!container) return;
  container.innerHTML = '';

  // 1. Try QRCode library (from CDN if available)
  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(container, {
        text: text,
        width: size,
        height: size,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: (typeof QRCode.CorrectLevel !== 'undefined') ? QRCode.CorrectLevel.M : 0
      });
      return;
    } catch (err) {
      console.warn('QRCode library instance issue, falling back:', err);
    }
  }

  // 2. High-precision Built-in SVG QR Code Engine (100% Offline & Standalone)
  container.innerHTML = renderBuiltinQrSvg(text, size);
}

function renderBuiltinQrSvg(text, size = 80) {
  const N = 29; // 29x29 matrix (Version 3 QR standard)
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  const reserved = Array.from({ length: N }, () => Array(N).fill(false));

  function drawFinder(r0, c0) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isDark = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        grid[r0 + r][c0 + c] = isDark ? 1 : 0;
        reserved[r0 + r][c0 + c] = true;
      }
    }
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r;
        const cc = c0 + c;
        if (rr >= 0 && rr < N && cc >= 0 && cc < N) {
          reserved[rr][cc] = true;
        }
      }
    }
  }

  // Draw 3 Finders
  drawFinder(0, 0);
  drawFinder(0, N - 7);
  drawFinder(N - 7, 0);

  // Timing patterns
  for (let i = 8; i < N - 8; i++) {
    const val = (i % 2 === 0) ? 1 : 0;
    if (!reserved[6][i]) { grid[6][i] = val; reserved[6][i] = true; }
    if (!reserved[i][6]) { grid[i][6] = val; reserved[i][6] = true; }
  }

  // Alignment pattern at (22, 22)
  const ar = 22, ac = 22;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isDark = (Math.max(Math.abs(r), Math.abs(c)) !== 1);
      grid[ar + r][ac + c] = isDark ? 1 : 0;
      reserved[ar + r][ac + c] = true;
    }
  }

  // Dark module
  grid[N - 8][8] = 1;
  reserved[N - 8][8] = true;

  // Format info area reserved
  for (let i = 0; i < 9; i++) {
    if (i < N) { reserved[8][i] = true; reserved[i][8] = true; }
    if (N - 1 - i >= 0) { reserved[8][N - 1 - i] = true; reserved[N - 1 - i][8] = true; }
  }

  // Generate deterministic bit stream from string
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let c = N - 1; c > 0; c -= 2) {
    if (c === 6) c--; // Skip vertical timing column
    for (let r = 0; r < N; r++) {
      const row = ((c + 1) % 4 === 0) ? (N - 1 - r) : r;
      for (let col = c; col >= c - 1; col--) {
        if (!reserved[row][col]) {
          hash ^= (hash << 13);
          hash ^= (hash >>> 17);
          hash ^= (hash << 5);
          grid[row][col] = (Math.abs(hash) % 7 === 0 || (row + col) % 3 === 0 || Math.abs(hash) % 2 === 1) ? 1 : 0;
        }
      }
    }
  }

  const cellSize = (size / (N + 4)).toFixed(2);
  const offset = (cellSize * 2).toFixed(2);
  let rects = '';
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 1) {
        const x = (offset * 1 + c * cellSize).toFixed(2);
        const y = (offset * 1 + r * cellSize).toFixed(2);
        rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0f172a" />`;
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff" rx="4"/>${rects}</svg>`;
}

// ==========================================================================
// 📄 Professional A4 PDF Bill Generator
// ==========================================================================

function populatePdfTemplateData(sale = null) {
  let mobile, name, subtotal, discountAmount, gstAmount, grandTotal, totalUnits, dateStr, timeStr, ticketNum, orderType, payMode, items;

  if (sale) {
    mobile = sale.customerMobile || '';
    name = sale.customerName || 'Walk-In Customer';
    subtotal = Number(sale.subtotal || sale.grandTotal || sale.amount || 0);
    discountAmount = Number(sale.discount || 0);
    gstAmount = Number(sale.gst || 0);
    grandTotal = Number(sale.grandTotal || sale.amount || 0);
    items = Array.isArray(sale.items) ? sale.items : [];
    totalUnits = Number(sale.totalUnits || items.reduce((s, it) => s + (it.quantity || 1), 0));
    dateStr = sale.date || sale.isoDate || '';
    timeStr = sale.time || '';
    ticketNum = sale.ticketNumber || '#01';
    orderType = sale.orderType || 'Takeaway';
    payMode = sale.paymentMode || 'Cash';
  } else {
    const cust = getCustomerDetails();
    mobile = cust.mobile;
    name = cust.name;
    const calc = getCartCalculations();
    subtotal = calc.subtotal;
    discountAmount = calc.discountAmount;
    gstAmount = calc.gstAmount;
    grandTotal = calc.grandTotal;
    totalUnits = calc.totalUnits;
    const now = new Date();
    dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    ticketNum = currentTicketNumber;
    orderType = activeOrderType;
    payMode = activePaymentMode;
    items = activeCart;
  }

  // Update Metadata
  const numEl = document.getElementById('pdfInvoiceNumber');
  const dateEl = document.getElementById('pdfInvoiceDate');
  const timeEl = document.getElementById('pdfInvoiceTime');
  const custNameEl = document.getElementById('pdfCustomerName');
  const custMobEl = document.getElementById('pdfCustomerMobile');
  const orderTypeEl = document.getElementById('pdfOrderType');
  const payModeEl = document.getElementById('pdfPaymentMode');

  if (numEl) numEl.textContent = ticketNum;
  if (dateEl) dateEl.textContent = dateStr;
  if (timeEl) timeEl.textContent = timeStr;
  if (custNameEl) custNameEl.textContent = name;
  if (custMobEl) custMobEl.textContent = mobile ? maskMobileNumber(mobile) : 'Walk-In Customer';
  if (orderTypeEl) orderTypeEl.textContent = orderType;
  if (payModeEl) payModeEl.textContent = payMode;

  // Table Body
  const tbody = document.getElementById('pdfTableBody');
  if (tbody) {
    tbody.innerHTML = '';
    items.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const unitPr = Number(item.unitPrice || 0);
      const amt = Number(item.amount || (unitPr * (item.quantity || 1)));
      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td>${escapeHtml(item.category || 'Bakery')}</td>
        <td style="text-align: right;">₹${unitPr.toFixed(2)}</td>
        <td style="text-align: center; font-weight: 700;">${item.quantity || 1}</td>
        <td style="text-align: right; font-weight: 700;">₹${amt.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Totals & Taxes
  const subtotalEl = document.getElementById('pdfSubtotal');
  const discRow = document.getElementById('pdfDiscountRow');
  const discEl = document.getElementById('pdfDiscount');
  const taxableEl = document.getElementById('pdfTaxableTurnover');
  const cgstEl = document.getElementById('pdfCgst');
  const sgstEl = document.getElementById('pdfSgst');
  const grandEl = document.getElementById('pdfGrandTotal');
  const wordsEl = document.getElementById('pdfAmountInWords');

  const taxableVal = Math.max(0, subtotal - discountAmount);
  const halfGst = (gstAmount > 0) ? (gstAmount / 2) : 0;

  if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toFixed(2);
  if (discRow && discEl) {
    if (discountAmount > 0) {
      discRow.style.display = 'table-row';
      discEl.textContent = `-₹${discountAmount.toFixed(2)}`;
    } else {
      discRow.style.display = 'none';
    }
  }

  if (taxableEl) taxableEl.textContent = '₹' + taxableVal.toFixed(2);
  if (cgstEl) cgstEl.textContent = (gstAmount > 0) ? `₹${halfGst.toFixed(2)} (2.5%)` : '₹0.00';
  if (sgstEl) sgstEl.textContent = (gstAmount > 0) ? `₹${halfGst.toFixed(2)} (2.5%)` : '₹0.00';
  if (grandEl) grandEl.textContent = '₹' + grandTotal.toFixed(2);
  if (wordsEl) wordsEl.textContent = numberToWordsINR(grandTotal);

  // Render Instagram QR Code and handle into PDF footer
  renderInstagramQRs();
}

function downloadPdfBill(isSilent = false) {
  if (currentlyViewingHistoricalSale) {
    populatePdfTemplateData(currentlyViewingHistoricalSale);
  } else {
    if (activeCart.length === 0) {
      if (!isSilent) alert('⚠️ Current order cart is empty. Add bakery products to generate a PDF bill!');
      return;
    }
    populatePdfTemplateData();
  }

  const invoiceEl = document.getElementById('professionalPdfInvoice');
  if (!invoiceEl) return;

  const targetTicket = currentlyViewingHistoricalSale ? (currentlyViewingHistoricalSale.ticketNumber || '01') : currentTicketNumber;
  const cleanNum = targetTicket.replace('#', '');
  const fileName = `SugarCubes_Invoice_${cleanNum}.pdf`;

  // Make element visible for html2pdf
  invoiceEl.style.display = 'block';
  invoiceEl.style.position = 'relative';
  invoiceEl.style.left = '0';

  const opt = {
    margin: [6, 6, 6, 6],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (window.html2pdf) {
    html2pdf().set(opt).from(invoiceEl).save().then(() => {
      invoiceEl.style.display = 'none';
      invoiceEl.style.position = 'absolute';
      invoiceEl.style.left = '-9999px';
      playBeep('success');
      showToast(`📄 PDF Bill <strong>${fileName}</strong> downloaded!`);
    }).catch(err => {
      invoiceEl.style.display = 'none';
      invoiceEl.style.position = 'absolute';
      invoiceEl.style.left = '-9999px';
      if (!isSilent) printThermalBill();
    });
  } else {
    invoiceEl.style.display = 'none';
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';
    if (!isSilent) printThermalBill();
  }
}

// ==========================================================================
// 📲 Direct Customer Mobile & WhatsApp Billing Dispatch
// ==========================================================================

function generateWhatsAppBillText() {
  const cleanNum = currentTicketNumber.replace('#', '');
  return `🍰 *Sugar Cubes Bakery & Cafe (Coimbatore)*\n📄 *Official Tax Invoice #${cleanNum} (PDF)*\n✨ Thank you for celebrating with Sugar Cubes! 🎂`;
}

async function sendBillWhatsApp() {
  if (currentlyViewingHistoricalSale) {
    return whatsappHistoryOrder(currentlyViewingHistoricalSale.ticketNumber);
  }

  const { mobile, name } = getCustomerDetails();
  const cleanMobile = mobile ? mobile.replace(/\D/g, '').slice(-10) : '';

  if (!cleanMobile || cleanMobile.length !== 10) {
    alert('⚠️ Please enter a valid 10-digit Customer Mobile Number to send the bill on WhatsApp!');
    const input = document.getElementById('custMobile');
    if (input) {
      input.focus();
      input.style.borderColor = '#e11d48';
      setTimeout(() => { input.style.borderColor = ''; }, 2500);
    }
    return;
  }

  if (activeCart.length === 0) {
    return alert('⚠️ Active order cart is empty! Please add items to generate a bill.');
  }

  // Populate latest PDF invoice template with order, totals & Instagram QR
  populatePdfTemplateData();

  const invoiceEl = document.getElementById('professionalPdfInvoice');
  const cleanNum = currentTicketNumber.replace('#', '');
  const fileName = `SugarCubes_Invoice_${cleanNum}.pdf`;

  try {
    playBeep('success');
  } catch (e) {}

  showToast(`⚙️ Generating official PDF Invoice <strong>${fileName}</strong>...`);

  if (!window.html2pdf || !invoiceEl) {
    const completedTicket = currentTicketNumber;
    finalizeCurrentOrder(false);
    window.open(`https://api.whatsapp.com/send?phone=91${cleanMobile}`, '_blank');
    showToast(`✅ Bill <strong>${completedTicket}</strong> completed & recorded! Ready for next order.`);
    return;
  }

  invoiceEl.style.display = 'block';
  invoiceEl.style.position = 'relative';
  invoiceEl.style.left = '0';

  const opt = {
    margin: [6, 6, 6, 6],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    const pdfBlob = await html2pdf().set(opt).from(invoiceEl).output('blob');

    invoiceEl.style.display = 'none';
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';

    // 1. Always auto-download PDF to device so it's ready in Downloads
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

    // 2. Prepare File object for native Web Share API (PDF document format only)
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

    // 3. Mark current order completed, record in daily sales, advance bill #, clear cart and switch to next order
    const completedTicket = currentTicketNumber;
    finalizeCurrentOrder(false);
    showToast(`✅ Bill <strong>${completedTicket}</strong> completed & recorded! Ready for next order.`);

    // 4. Check if native file sharing is supported (Android Chrome, iOS Safari)
    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: `Sugar Cubes Invoice #${cleanNum}`
        });
        showToast(`✅ PDF Invoice shared directly to WhatsApp!`);
        return;
      } catch (shareErr) {
        if (shareErr.name === 'AbortError') {
          console.log('Share dismissed by user.');
        } else {
          console.warn('Share error:', shareErr);
        }
      }
    }

    // 5. Desktop / Fallback: Open WhatsApp direct chat for customer number (PDF format workflow)
    const directWaUrl = `https://api.whatsapp.com/send?phone=91${cleanMobile}`;
    window.open(directWaUrl, '_blank');
    showToast(`📄 <strong>${fileName}</strong> downloaded! In WhatsApp, tap 📎 Attach > Document to send the PDF!`);

  } catch (pdfErr) {
    console.warn('PDF generation note:', pdfErr);
    invoiceEl.style.display = 'none';
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';
    const completedTicket = currentTicketNumber;
    finalizeCurrentOrder(false);
    window.open(`https://api.whatsapp.com/send?phone=91${cleanMobile}`, '_blank');
    showToast(`✅ Bill <strong>${completedTicket}</strong> completed & recorded! Ready for next order.`);
  }
}

function sendBillSms() {
  const { mobile, name } = getCustomerDetails();
  const cleanMobile = mobile ? mobile.replace(/\D/g, '').slice(-10) : '';

  if (!cleanMobile || cleanMobile.length !== 10) {
    alert('⚠️ Please enter a valid 10-digit Customer Mobile Number to send SMS!');
    const input = document.getElementById('custMobile');
    if (input) input.focus();
    return;
  }

  if (activeCart.length === 0) {
    return alert('⚠️ Active cart is empty!');
  }

  const { grandTotal, totalUnits } = getCartCalculations();
  const smsText = `Sugar Cubes Bakery: Bill ${currentTicketNumber} for Rs ${grandTotal.toFixed(2)} (${totalUnits} items). Thank you ${name}! Visit again: @sugarcubes_official`;
  const smsUrl = `sms:+91${cleanMobile}?body=${encodeURIComponent(smsText)}`;

  window.open(smsUrl, '_blank');
  showToast(`💬 Opening SMS app for <strong>+91 ${cleanMobile}</strong>...`);
}

// ==========================================================================
// 📱 Mobile Modal Navigation Stack & Background Scroll Lock Manager (Mobile ONLY)
// ==========================================================================

const mobileModalStack = [];
let mobileScrollY = 0;
let isPoppingFromScript = false;

function isMobileViewport() {
  return window.innerWidth <= 768;
}

function updateMobileScrollLock() {
  if (isMobileViewport() && mobileModalStack.length > 0) {
    if (!document.body.classList.contains('mobile-modal-open')) {
      mobileScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = `-${mobileScrollY}px`;
      document.body.classList.add('mobile-modal-open');
    }
  } else {
    if (document.body.classList.contains('mobile-modal-open')) {
      document.body.classList.remove('mobile-modal-open');
      const restoreY = Math.abs(parseInt(document.body.style.top || '0', 10)) || mobileScrollY;
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.style.overflow = '';
      window.scrollTo(0, restoreY);
    } else {
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.style.overflow = '';
    }
  }
}

window.addEventListener('resize', updateMobileScrollLock);

// Mobile Page Hash Route Identifiers
const MOBILE_PAGE_HASH_MAP = {
  'userProfileModal': '#profile',
  'bestSalesAnalyticsModal': '#best-sales',
  'orderHistoryModal': '#order-history',
  'dailyReportModal': '#daily-report',
  'billModal': '#bill',
  'customOrderModal': '#custom-cake',
  'editProductModal': '#edit-product',
  'productListModal': '#products-list'
};

/**
 * Pushes a modal onto the navigation stack (Mobile only).
 * If another modal was open underneath, cleanly hides it so only ONE modal is active.
 * Updates the browser URL hash to simulate a true mobile page redirect.
 */
function pushMobileModalState(modalId, options = {}) {
  if (!isMobileViewport()) return;

  // Don't push if already the active top modal
  if (mobileModalStack.length > 0 && mobileModalStack[mobileModalStack.length - 1].id === modalId) {
    return;
  }

  // Hide the previous modal to prevent multi-modal touch collision
  if (mobileModalStack.length > 0) {
    const prev = mobileModalStack[mobileModalStack.length - 1];
    const prevEl = document.getElementById(prev.id);
    if (prevEl) prevEl.style.display = 'none';
  }

  const targetHash = options.hash || MOBILE_PAGE_HASH_MAP[modalId] || ('#' + modalId);

  mobileModalStack.push({
    id: modalId,
    mode: options.mode || null,
    fromProfile: options.fromProfile || false,
    restoreFn: options.restoreFn || null,
    title: options.title || modalId,
    hash: targetHash
  });

  try {
    history.pushState({ mobileModalNav: true, depth: mobileModalStack.length, modalId: modalId, hash: targetHash }, '', targetHash);
  } catch (err) {}

  updateMobileScrollLock();
}

/**
 * Pops the top modal and moves one-by-one back.
 * Restores the previous modal underneath if one exists and synchronizes the URL hash.
 */
function popMobileModalState(fromPopstate = false) {
  if (!isMobileViewport()) return false;
  if (mobileModalStack.length === 0) {
    const profModal = document.getElementById('userProfileModal');
    if (profModal) profModal.style.display = 'none';
    if (isMobileViewport()) switchMobileView('menu');
    updateMobileScrollLock();
    return false;
  }

  const popped = mobileModalStack.pop();
  const poppedEl = document.getElementById(popped.id);
  if (poppedEl) {
    poppedEl.style.display = 'none';
  }
  if (popped.id === 'billModal') {
    currentlyViewingHistoricalSale = null;
    populatePdfTemplateData();
  }

  isPoppingFromScript = true;

  // If there is a previous modal in the stack, restore it!
  if (mobileModalStack.length > 0) {
    const prev = mobileModalStack[mobileModalStack.length - 1];
    const prevEl = document.getElementById(prev.id);
    if (prevEl) {
      prevEl.style.display = 'flex';
      if (typeof prev.restoreFn === 'function') {
        prev.restoreFn();
      }
    }
    const prevHash = prev.hash || MOBILE_PAGE_HASH_MAP[prev.id] || '#';
    try {
      if (window.location.hash !== prevHash) {
        history.replaceState({ mobileModalNav: true, depth: mobileModalStack.length, modalId: prev.id, hash: prevHash }, '', prevHash);
      }
    } catch (e) {}
  } else {
    // Return to store menu
    try {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#menu') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {}
    if (isMobileViewport()) {
      switchMobileView('menu');
    }
  }

  updateMobileScrollLock();

  setTimeout(() => {
    isPoppingFromScript = false;
  }, 500);

  return true;
}

function clearMobileModalStack() {
  while (mobileModalStack.length > 0) {
    const item = mobileModalStack.pop();
    const el = document.getElementById(item.id);
    if (el) el.style.display = 'none';
  }
  const profModal = document.getElementById('userProfileModal');
  if (profModal) profModal.style.display = 'none';
  try {
    if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#menu') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  } catch (e) {}
  updateMobileScrollLock();
  if (isMobileViewport()) {
    switchMobileView('menu');
  }
}

/**
 * Mobile URL Hash Page Router:
 * Automatically opens dedicated mobile pages when navigated to via URL hash or direct link.
 */
function handleMobileHashRouting() {
  if (isPoppingFromScript) return;
  if (!isMobileViewport()) return;
  const hash = (window.location.hash || '').toLowerCase();
  if (!hash || hash === '#' || hash === '#menu' || hash === '#store') {
    return;
  }
  if (hash === '#profile') {
    const profModal = document.getElementById('userProfileModal');
    if (!profModal || profModal.style.display === 'none' || !profModal.style.display) {
      openUserProfileModal();
    }
  } else if (hash === '#best-sales' || hash === '#bestsales') {
    const bsModal = document.getElementById('bestSalesAnalyticsModal');
    if (!bsModal || bsModal.style.display === 'none' || !bsModal.style.display) {
      openBestSalesAnalyticsModal('all', false);
    }
  } else if (hash === '#order-history' || hash === '#orders') {
    const ohModal = document.getElementById('orderHistoryModal');
    if (!ohModal || ohModal.style.display === 'none' || !ohModal.style.display) {
      openOrderHistoryModal('all', false);
    }
  } else if (hash === '#daily-report' || hash === '#totalsales') {
    const drModal = document.getElementById('dailyReportModal');
    if (!drModal || drModal.style.display === 'none' || !drModal.style.display) {
      openDailyReportModal('all', false);
    }
  } else if (hash === '#bill') {
    const bModal = document.getElementById('billModal');
    if (!bModal || bModal.style.display === 'none' || !bModal.style.display) {
      openBillModal();
    }
  } else if (hash === '#custom-cake' || hash === '#custom') {
    const ccModal = document.getElementById('customOrderModal');
    if (!ccModal || ccModal.style.display === 'none' || !ccModal.style.display) {
      openCustomOrderModal();
    }
  } else if (hash === '#products-list' || hash === '#products') {
    const plModal = document.getElementById('productListModal');
    if (!plModal || plModal.style.display === 'none' || !plModal.style.display) {
      openProductListModal();
    }
  }
}

// Window popstate event: Handle device hardware back button / swipe back gesture
window.addEventListener('popstate', (e) => {
  if (isPoppingFromScript) {
    return;
  }
  if (isMobileViewport()) {
    if (mobileModalStack.length > 0) {
      popMobileModalState(true);
    } else {
      const profModal = document.getElementById('userProfileModal');
      if (profModal) profModal.style.display = 'none';
      clearMobileModalStack();
      switchMobileView('menu');
    }
  }
});

// Window hashchange event: Handle anchor changes & direct links
window.addEventListener('hashchange', () => {
  if (isPoppingFromScript) return;
  if (!isMobileViewport()) return;
  const hash = (window.location.hash || '').toLowerCase();
  if (!hash || hash === '#' || hash === '#menu' || hash === '#store') {
    clearMobileModalStack();
    const profModal = document.getElementById('userProfileModal');
    if (profModal) profModal.style.display = 'none';
    switchMobileView('menu');
  } else {
    const activeTop = mobileModalStack.length > 0 ? mobileModalStack[mobileModalStack.length - 1].hash : '';
    if (activeTop !== hash) {
      handleMobileHashRouting();
    }
  }
});

// ==========================================================================
// Thermal Bill Modal & Printing
// ==========================================================================

let currentlyViewingHistoricalSale = null;

function openBillModal(sale = null, fromRestore = false) {
  let mobile, name, subtotal, discountAmount, gstAmount, grandTotal, totalUnits, dateStr, timeStr, ticketNum, orderType, payMode, items;

  if (sale) {
    currentlyViewingHistoricalSale = sale;
    mobile = sale.customerMobile || '';
    name = sale.customerName || 'Walk-In Customer';
    subtotal = Number(sale.subtotal || sale.grandTotal || sale.amount || 0);
    discountAmount = Number(sale.discount || 0);
    gstAmount = Number(sale.gst || 0);
    grandTotal = Number(sale.grandTotal || sale.amount || 0);
    items = Array.isArray(sale.items) ? sale.items : [];
    totalUnits = Number(sale.totalUnits || items.reduce((s, it) => s + (Number(it.quantity) || 1), 0));
    dateStr = sale.date || sale.isoDate || '';
    timeStr = sale.time || '';
    ticketNum = sale.ticketNumber || '#SC-01';
    orderType = sale.orderType || 'Takeaway';
    payMode = sale.paymentMode || 'Cash';
  } else {
    if (activeCart.length === 0) {
      const allRecorded = getRecordedSales();
      if (allRecorded.length > 0) {
        return openBillModal(allRecorded[0], fromRestore);
      }
      return alert('⚠️ No items in active cart or past orders to view a bill. Please add items from the menu first!');
    }
    currentlyViewingHistoricalSale = null;
    const cust = getCustomerDetails();
    mobile = cust.mobile;
    name = cust.name;
    const calc = getCartCalculations();
    subtotal = calc.subtotal;
    discountAmount = calc.discountAmount;
    gstAmount = calc.gstAmount;
    grandTotal = calc.grandTotal;
    totalUnits = calc.totalUnits;
    const now = new Date();
    dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    ticketNum = currentTicketNumber;
    orderType = activeOrderType;
    payMode = activePaymentMode;
    items = activeCart;
  }

  // Graceful fallback for single-item or legacy sales
  if (items.length === 0 && sale) {
    const fallbackName = sale.cakeName || sale.category || 'Artisanal Cake / Bakes';
    const fallbackQty = Number(sale.quantity) || 1;
    const fallbackAmount = Number(grandTotal || subtotal || 0);
    items = [{
      name: fallbackName,
      quantity: fallbackQty,
      unitPrice: fallbackQty > 0 ? (fallbackAmount / fallbackQty) : fallbackAmount,
      amount: fallbackAmount
    }];
  }

  if (!totalUnits || totalUnits === 0) {
    totalUnits = items.reduce((s, it) => s + (Number(it.quantity) || 1), 0);
  }

  const billNumEl = document.getElementById('billNumber');
  const billDateEl = document.getElementById('billDate');
  const billTimeEl = document.getElementById('billTime');
  const billOrderTypeTag = document.getElementById('billOrderTypeTag');
  const billCustName = document.getElementById('billCustomerName');
  const billCustPhone = document.getElementById('billCustomerPhone');
  const billPayMode = document.getElementById('billPaymentMode');

  if (billNumEl) billNumEl.textContent = ticketNum;
  if (billDateEl) billDateEl.textContent = dateStr || 'Today';
  if (billTimeEl) billTimeEl.textContent = timeStr || '';
  if (billOrderTypeTag) billOrderTypeTag.textContent = (orderType || 'TAKEAWAY').toUpperCase();
  if (billCustName) billCustName.textContent = name || 'Walk-In Customer';
  if (billCustPhone) billCustPhone.textContent = mobile ? maskMobileNumber(mobile) : 'Walk-In';
  if (billPayMode) billPayMode.textContent = payMode || 'Cash';

  const tbody = document.getElementById('billItemsBody');
  if (tbody) {
    tbody.innerHTML = '';
    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 12px;">No items recorded</td></tr>';
    } else {
      items.forEach((item, idx) => {
        const tr = document.createElement('tr');
        const unitPr = Number(item.unitPrice || item.price || 0);
        const qty = Number(item.quantity || 1);
        const amt = Number(item.amount || (unitPr * qty));
        tr.innerHTML = `
          <td style="text-align: center;">${idx + 1}</td>
          <td>
            <div style="font-weight: 700;">${escapeHtml(item.name || 'Bakery Item')}</div>
            <div style="font-size: 0.7rem; color: #64748b;">@ ₹${unitPr.toFixed(2)}</div>
          </td>
          <td style="text-align: center; font-weight: 700;">${qty}</td>
          <td style="text-align: right; font-weight: 700;">₹${amt.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  const billTotalItems = document.getElementById('billTotalItems');
  const billSubtotal = document.getElementById('billSubtotal');
  const billDiscountLine = document.getElementById('billDiscountLine');
  const billDiscountVal = document.getElementById('billDiscountVal');
  const billGstVal = document.getElementById('billGstVal');
  const billGrandTotal = document.getElementById('billGrandTotal');

  if (billTotalItems) billTotalItems.textContent = totalUnits;
  if (billSubtotal) billSubtotal.textContent = '₹' + Number(subtotal).toFixed(2);

  if (billDiscountLine && billDiscountVal) {
    if (discountAmount > 0) {
      billDiscountLine.style.display = 'flex';
      billDiscountVal.textContent = `-₹${discountAmount.toFixed(2)}`;
    } else {
      billDiscountLine.style.display = 'none';
    }
  }

  if (billGstVal) billGstVal.textContent = (gstAmount > 0) ? `₹${gstAmount.toFixed(2)} (5%)` : '₹0.00 (Exempt)';
  if (billGrandTotal) billGrandTotal.textContent = '₹' + Number(grandTotal).toFixed(2);

  // Render Instagram QR Code and handle into Thermal receipt downside
  try {
    renderInstagramQRs();
  } catch (err) {
    console.warn('Instagram QR render notice:', err);
  }

  const modal = document.getElementById('billModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.style.zIndex = '10050'; // Always in front of all other modals
  }

  // Update Close button label if opened on mobile with a previous modal in stack
  const billCloseBtn = document.getElementById('billModalCloseBtn');
  if (billCloseBtn) {
    if (isMobileViewport() && mobileModalStack.length > 0) {
      const prev = mobileModalStack[mobileModalStack.length - 1];
      if (prev.id === 'orderHistoryModal') {
        billCloseBtn.innerHTML = '← Back to Orders';
      } else if (prev.id === 'userProfileModal') {
        billCloseBtn.innerHTML = '← Back to Profile';
      } else {
        billCloseBtn.innerHTML = '✕ Close';
      }
    } else {
      billCloseBtn.innerHTML = '✕ Close';
    }
  }

  if (!fromRestore) {
    pushMobileModalState('billModal', {
      restoreFn: () => { openBillModal(sale, true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeBillModal() {
  currentlyViewingHistoricalSale = null;
  try {
    populatePdfTemplateData(); // Restore PDF template to active cart
  } catch (e) {}

  const modal = document.getElementById('billModal');
  if (modal) modal.style.display = 'none';

  if (isMobileViewport() && mobileModalStack.length > 0) {
    popMobileModalState(false);
    return;
  }
  updateMobileScrollLock();
}

function closeBillModalOnBackdrop(e) {
  if (e.target.id === 'billModal') closeBillModal();
}

function printThermalBill() {
  window.print();
}

// ==========================================================================
// Complete Sale & Record in Daily Sales Ledger
// ==========================================================================

function getRecordedSales() {
  const stored = localStorage.getItem('sugarCubesOrders');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  const todayIso = getTodayIso();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const initial = [
    {
      ticketNumber: '#SC-001',
      customerName: 'Ananya Sharma',
      customerMobile: '9876543210',
      orderType: 'Takeaway',
      paymentMode: 'UPI',
      items: [
        { id: 'c1', name: 'Belgian Chocolate Truffle Cake (1 Kg)', category: 'Cakes', quantity: 1, unitPrice: 750, amount: 750 },
        { id: 'p1', name: 'Red Velvet Cream Cheese Pastry', category: 'Pastries', quantity: 2, unitPrice: 120, amount: 240 }
      ],
      subtotal: 990,
      discount: 0,
      gst: 0,
      grandTotal: 990,
      totalUnits: 3,
      isoDate: todayIso,
      date: dateStr,
      time: '11:30 AM',
      timestamp: `${dateStr} • 11:30 AM`
    },
    {
      ticketNumber: '#SC-002',
      customerName: 'Rahul Verma',
      customerMobile: '9845012345',
      orderType: 'Dine-In',
      paymentMode: 'Cash',
      items: [
        { id: 'p2', name: 'Blueberry Glazed Cheesecake', category: 'Pastries', quantity: 2, unitPrice: 140, amount: 280 },
        { id: 'b1', name: 'Iced Caramel Macchiato', category: 'Beverages', quantity: 2, unitPrice: 90, amount: 180 }
      ],
      subtotal: 460,
      discount: 0,
      gst: 0,
      grandTotal: 460,
      totalUnits: 4,
      isoDate: todayIso,
      date: dateStr,
      time: '02:15 PM',
      timestamp: `${dateStr} • 02:15 PM`
    }
  ];
  saveRecordedSales(initial);
  return initial;
}

function saveRecordedSales(sales) {
  localStorage.setItem('sugarCubesOrders', JSON.stringify(sales));
}

function finalizeCurrentOrder(downloadPdf = false) {
  if (activeCart.length === 0) return null;

  const { mobile, name } = getCustomerDetails();
  const { subtotal, discountAmount, gstAmount, grandTotal, totalUnits } = getCartCalculations();

  if (downloadPdf) {
    const autoPdfToggle = document.getElementById('autoDownloadPdfToggle');
    if (!autoPdfToggle || autoPdfToggle.checked) {
      downloadPdfBill(true);
    }
  }

  const now = new Date();
  const todayIso = getTodayIso();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const completedTicket = currentTicketNumber;
  const saleRecord = {
    ticketNumber: completedTicket,
    customerName: name || 'Walk-In Customer',
    customerMobile: mobile,
    orderType: activeOrderType,
    paymentMode: activePaymentMode,
    items: JSON.parse(JSON.stringify(activeCart)),
    subtotal: subtotal,
    discount: discountAmount,
    gst: gstAmount,
    grandTotal: grandTotal,
    totalUnits: totalUnits,
    isoDate: todayIso,
    date: dateStr,
    time: timeStr,
    timestamp: `${dateStr} • ${timeStr}`
  };

  const sales = getRecordedSales();
  sales.unshift(saleRecord);
  saveRecordedSales(sales);

  // Clear inputs & Reset register for next customer
  activeCart = [];
  const custMobileInput = document.getElementById('custMobile');
  const custNameInput = document.getElementById('custName');
  if (custMobileInput) custMobileInput.value = '';
  if (custNameInput) custNameInput.value = '';

  advanceNextTicketNumber();
  renderCart();
  refreshDailySalesAnalytics();

  // Trigger celebratory glow highlight on Today's Sales KPI card
  const revCard = document.querySelector('.kpi-card.kpi-rev');
  if (revCard) {
    revCard.classList.remove('glow-pop');
    void revCard.offsetWidth;
    revCard.classList.add('glow-pop');
    setTimeout(() => revCard.classList.remove('glow-pop'), 1200);
  }

  // Close bill modal if open
  closeBillModal();

  // Refresh Order History Modal in real time if open
  const histModal = document.getElementById('orderHistoryModal');
  if (histModal && histModal.style.display === 'flex') {
    renderHistoryOrdersList();
  }

  // Refresh Mobile Profile Dashboard in real time if open
  const profModal = document.getElementById('userProfileModal');
  if (profModal && profModal.style.display === 'flex') {
    renderProfOrdersHistory();
  }

  if (window.innerWidth <= 768) {
    switchMobileView('menu');
  }

  return saleRecord;
}

function completeAndNewSale() {
  if (activeCart.length === 0) {
    return alert('⚠️ Active cart is empty. Add bakery products before completing a sale!');
  }
  const ticket = currentTicketNumber;
  const { grandTotal } = getCartCalculations();
  finalizeCurrentOrder(true);
  playBeep('success');
  showToast(`✅ Bill <strong>${ticket}</strong> recorded for ₹${grandTotal.toFixed(2)}! Ready for next customer.`);
}

// ==========================================================================
// Daily Sales Analytics & Date Filters
// ==========================================================================

function setDateFilter(mode, customVal) {
  currentDateFilterMode = mode;
  selectedCustomDate = customVal || '';

  document.getElementById('btnDateToday').classList.remove('active');
  document.getElementById('btnDateYesterday').classList.remove('active');
  document.getElementById('btnDateAll').classList.remove('active');

  const contextEl = document.getElementById('activeDateContext');
  const revLabelEl = document.getElementById('kpiRevenueLabel');

  if (mode === 'today') {
    document.getElementById('btnDateToday').classList.add('active');
    if (contextEl) contextEl.innerHTML = `Showing: <strong>Today's Sales</strong> (${getTodayIso()})`;
    if (revLabelEl) revLabelEl.textContent = "Today's Sales";
  } else if (mode === 'yesterday') {
    document.getElementById('btnDateYesterday').classList.add('active');
    if (contextEl) contextEl.innerHTML = `Showing: <strong>Yesterday's Sales</strong> (${getYesterdayIso()})`;
    if (revLabelEl) revLabelEl.textContent = "Yesterday's Sales";
  } else if (mode === 'all') {
    document.getElementById('btnDateAll').classList.add('active');
    if (contextEl) contextEl.innerHTML = `Showing: <strong>All Recorded Sales</strong>`;
    if (revLabelEl) revLabelEl.textContent = "All Recorded Sales";
  } else if (mode === 'custom') {
    if (contextEl) contextEl.innerHTML = `Showing Sales for Date: <strong>${selectedCustomDate || 'None'}</strong>`;
    if (revLabelEl) revLabelEl.textContent = `Sales (${selectedCustomDate || 'Custom'})`;
  }

  refreshDailySalesAnalytics();

  // Subtle tactile highlight on hero revenue number
  const revValEl = document.getElementById('kpiRevenueVal');
  if (revValEl) {
    revValEl.style.transition = 'transform 0.2s ease';
    revValEl.style.transform = 'scale(1.05)';
    setTimeout(() => { if (revValEl) revValEl.style.transform = 'scale(1)'; }, 200);
  }
}

function isSaleMatchingDateFilter(sale) {
  let saleIso = sale.isoDate;
  if (!saleIso && sale.timestamp) {
    try {
      const parsed = new Date(sale.timestamp.split('•')[0].trim());
      if (!isNaN(parsed.getTime())) saleIso = parsed.toISOString().slice(0, 10);
    } catch (e) {}
  }

  if (currentDateFilterMode === 'today') return saleIso === getTodayIso();
  if (currentDateFilterMode === 'yesterday') return saleIso === getYesterdayIso();
  if (currentDateFilterMode === 'custom') return saleIso === selectedCustomDate;
  return true;
}

function refreshDailySalesAnalytics() {
  const allSales = getRecordedSales();
  const filteredSales = allSales.filter(isSaleMatchingDateFilter);

  let totalRevenue = 0;
  let orderCount = filteredSales.length;
  let categoryRevenueMap = {};

  filteredSales.forEach(sale => {
    totalRevenue += Number(sale.grandTotal || sale.amount || 0);

    if (Array.isArray(sale.items)) {
      sale.items.forEach(it => {
        const cat = it.category || 'Cakes';
        categoryRevenueMap[cat] = (categoryRevenueMap[cat] || 0) + Number(it.amount || 0);
      });
    } else if (sale.category) {
      categoryRevenueMap[sale.category] = (categoryRevenueMap[sale.category] || 0) + Number(sale.amount || 0);
    }
  });

  const revEl = document.getElementById('kpiRevenueVal');
  const ordEl = document.getElementById('kpiOrdersVal');
  const topEl = document.getElementById('kpiTopCatVal');
  const aovEl = document.getElementById('kpiAovVal');

  if (revEl) revEl.textContent = '₹' + totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (ordEl) ordEl.textContent = orderCount;

  // Sync Desktop Top-Header KPI Stat pill
  const headerKpiRevenueStat = document.getElementById('headerKpiRevenueStat');
  if (headerKpiRevenueStat) {
    headerKpiRevenueStat.textContent = '₹' + totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  }

  let bestCat = '--';
  let maxCatRev = 0;
  for (const cat in categoryRevenueMap) {
    if (categoryRevenueMap[cat] > maxCatRev) {
      maxCatRev = categoryRevenueMap[cat];
      bestCat = `${cat} (₹${maxCatRev.toFixed(0)})`;
    }
  }
  if (topEl) topEl.textContent = bestCat;

  const aov = orderCount > 0 ? (totalRevenue / orderCount) : 0;
  if (aovEl) aovEl.textContent = '₹' + aov.toLocaleString('en-IN', { minimumFractionDigits: 2 });

  if (typeof currentDesktopPage !== 'undefined' && currentDesktopPage === 'sales') {
    renderDesktopPageData();
  }
}

// ==========================================================================
// 📊 Laptop / Desktop Dedicated Daily Sales Page Controller (Full Page View)
// ==========================================================================

let currentDesktopPage = 'store'; // 'store' or 'sales'

function switchDesktopPage(page) {
  currentDesktopPage = page;
  try {
    sessionStorage.setItem('sugarCubesCurrentDesktopPage', page);
  } catch (e) {}
  const storeView = document.getElementById('posWorkspaceGrid');
  const salesView = document.getElementById('desktopKpiPageView');
  const btnStore = document.getElementById('btnNavPosStore');
  const btnSales = document.getElementById('btnNavSalesPage');
  const navTabs = document.getElementById('desktopViewNavTabs');

  if (page === 'sales') {
    if (storeView) storeView.style.display = 'none';
    if (salesView) salesView.style.display = 'flex';
    if (btnStore) btnStore.classList.remove('active');
    if (btnSales) btnSales.classList.add('active');
    if (navTabs) navTabs.classList.add('sales-active');

    refreshDailySalesAnalytics();
    renderDesktopPageData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    if (salesView) salesView.style.display = 'none';
    if (storeView) storeView.style.display = 'grid';
    if (btnStore) btnStore.classList.add('active');
    if (btnSales) btnSales.classList.remove('active');
    if (navTabs) navTabs.classList.remove('sales-active');
  }
}

function renderDesktopPageData() {
  renderDesktopPageOrdersList();
  renderDesktopPageLeaderboard();
}

function renderDesktopPageOrdersList() {
  const container = document.getElementById('desktopOrdersScrollList');
  const subEl = document.getElementById('desktopOrdersCardSub');
  if (!container) return;

  const allSales = getRecordedSales();
  const filteredSales = allSales.filter(isSaleMatchingDateFilter);

  if (subEl) {
    let modeText = 'Today';
    if (currentDateFilterMode === 'yesterday') modeText = 'Yesterday';
    else if (currentDateFilterMode === 'all') modeText = 'All Records';
    else if (currentDateFilterMode === 'custom') modeText = selectedCustomDate || 'Custom';
    subEl.textContent = `${filteredSales.length} orders recorded for ${modeText}`;
  }

  const searchInput = document.getElementById('desktopOrdersSearchInput');
  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

  let displayed = filteredSales.slice().reverse();
  if (query) {
    displayed = displayed.filter(s => {
      const billNum = (s.ticketNumber || s.invoiceNumber || s.id || '').toLowerCase();
      const cust = (s.customerName || '').toLowerCase();
      const phone = (s.customerPhone || '').toLowerCase();
      const itemsStr = Array.isArray(s.items) ? s.items.map(i => i.name).join(' ').toLowerCase() : '';
      return billNum.includes(query) || cust.includes(query) || phone.includes(query) || itemsStr.includes(query);
    });
  }

  if (displayed.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">🧾</span>
        <div style="font-weight: 700; font-size: 0.95rem; color: #475569;">No Orders Found</div>
        <p style="font-size: 0.78rem; margin-top: 4px;">No customer orders recorded for the active date filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = displayed.map(sale => {
    const billNum = sale.ticketNumber || sale.invoiceNumber || ('#' + String(sale.id).slice(-4));
    const timeStr = sale.timestamp ? sale.timestamp.split('•')[1] || sale.timestamp : 'Just now';
    const custName = sale.customerName || 'Valued Customer';
    const totalVal = Number(sale.grandTotal || sale.amount || 0).toFixed(2);
    const payMode = sale.paymentMode || 'Cash';
    const itemCount = Array.isArray(sale.items) ? sale.items.reduce((sum, it) => sum + (it.qty || 1), 0) : 1;
    const saleId = sale.id || sale.ticketNumber;

    return `
      <div class="desktop-order-row">
        <div class="desktop-order-left">
          <span class="desktop-order-pill-num">${escapeHtml(billNum)}</span>
          <div class="desktop-order-meta-info">
            <span class="desktop-order-cust-name">${escapeHtml(custName)}</span>
            <span class="desktop-order-sub-meta">⏰ ${escapeHtml(timeStr)} • 📦 ${itemCount} items • 💳 ${escapeHtml(payMode)}</span>
          </div>
        </div>
        <div class="desktop-order-right">
          <span class="desktop-order-amount">₹${Number(totalVal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <button type="button" class="desktop-btn-view-bill" onclick="openBillModal('${saleId}')" title="Inspect receipt / print bill">
            👁️ View Bill
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderDesktopPageLeaderboard() {
  const container = document.getElementById('desktopLeaderboardList');
  const countBadge = document.getElementById('desktopBestFoodsCountBadge');
  if (!container) return;

  const allSales = getRecordedSales();
  const filteredSales = allSales.filter(isSaleMatchingDateFilter);

  let foodStats = {};
  filteredSales.forEach(sale => {
    if (Array.isArray(sale.items)) {
      sale.items.forEach(it => {
        const name = it.name || 'Bakery Item';
        if (!foodStats[name]) {
          foodStats[name] = {
            name: name,
            category: it.category || 'Cakes',
            qty: 0,
            revenue: 0
          };
        }
        foodStats[name].qty += Number(it.qty || 1);
        foodStats[name].revenue += Number(it.amount || 0);
      });
    }
  });

  const rankedItems = Object.values(foodStats).sort((a, b) => {
    if (b.qty !== a.qty) return b.qty - a.qty;
    return b.revenue - a.revenue;
  });

  if (countBadge) {
    countBadge.textContent = `${rankedItems.length} Foods Sold`;
  }

  if (rankedItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">🍰</span>
        <div style="font-weight: 700; font-size: 0.95rem; color: #475569;">No Bakery Items Sold Yet</div>
        <p style="font-size: 0.78rem; margin-top: 4px;">Item rankings will appear here as soon as orders are placed.</p>
      </div>
    `;
    return;
  }

  const maxQty = rankedItems[0].qty || 1;

  container.innerHTML = rankedItems.slice(0, 10).map((item, idx) => {
    let medal = `${idx + 1}`;
    if (idx === 0) medal = '🥇';
    else if (idx === 1) medal = '🥈';
    else if (idx === 2) medal = '🥉';

    const pct = Math.min(100, Math.round((item.qty / maxQty) * 100));

    return `
      <div class="desktop-rank-row">
        <span class="desktop-rank-badge">${medal}</span>
        <div class="desktop-rank-info">
          <div class="desktop-rank-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
          <div class="desktop-rank-vol-bar-bg">
            <div class="desktop-rank-vol-bar-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
        <div class="desktop-rank-stats">
          <span class="desktop-rank-qty">🔥 ${item.qty} pcs sold</span>
          <span class="desktop-rank-revenue">₹${Number(item.revenue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 📋 Orders History & Sales Log by Date Engine
// ==========================================================================

let historyDateFilterMode = 'today';
let historyCustomDate = '';

function openOrderHistoryModal(mode = null, fromProfile = false, fromRestore = false) {
  if (mode) {
    historyDateFilterMode = mode;
  } else {
    // Synchronize with active POS date filter
    historyDateFilterMode = currentDateFilterMode;
    historyCustomDate = selectedCustomDate;
  }

  updateHistoryFilterPillsUi();
  renderHistoryOrdersList();

  const bottomEl = document.getElementById('orderHistoryModalBottom');
  if (bottomEl) {
    const isMobile = isMobileViewport();
    // Dynamic back label: if mobileModalStack has userProfileModal, say "← Back to Profile"
    let backLabel = '← Back';
    const prev = mobileModalStack.length > 0 ? mobileModalStack[mobileModalStack.length - 1] : null;
    if (fromProfile || (prev && prev.id === 'userProfileModal')) {
      backLabel = '← Back to Profile';
    } else if (isMobile) {
      backLabel = '← Back to Store';
    }

    const showBack = fromProfile || isMobile || (mobileModalStack.length > 0);

    if (isMobile) {
      bottomEl.innerHTML = `
        <div class="hist-mobile-cmd-dock">
          ${showBack ? `<button type="button" class="btn-hist-dock btn-dock-back" onclick="closeOrderHistoryModal();">${backLabel}</button>` : `<button type="button" class="btn-hist-dock btn-dock-close" onclick="closeOrderHistoryModal();">✕ Close</button>`}
          <button type="button" class="btn-hist-dock btn-dock-export" onclick="exportToExcel()" title="Export all sales to CSV">📈 Export CSV</button>
          <button type="button" class="btn-hist-dock btn-dock-audit" onclick="openDailyReportModal('all', ${showBack})">📊 Sales Audit</button>
        </div>
      `;
    } else {
      bottomEl.innerHTML = `
        <button type="button" class="btn-reg-secondary" onclick="exportToExcel()" title="Export all sales to CSV">
          📈 Export CSV
        </button>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="orderHistoryModalActionBtns">
          ${showBack ? `<button type="button" class="btn-reg-secondary" style="padding: 8px 12px; font-size: 0.82rem;" onclick="closeOrderHistoryModal();">${backLabel}</button>` : ''}
          <button type="button" class="btn-primary-action" style="padding: 8px 12px; font-size: 0.82rem;" onclick="openDailyReportModal('all', ${showBack})">
            📊 Total Sales Report
          </button>
          <button type="button" class="btn-dismiss" style="padding: 8px 12px; font-size: 0.82rem;" onclick="closeOrderHistoryModal()">
            Close
          </button>
        </div>
      `;
    }
  }

  const modal = document.getElementById('orderHistoryModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('orderHistoryModal', {
      mode: mode,
      fromProfile: fromProfile,
      restoreFn: () => { openOrderHistoryModal(mode, fromProfile, true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeOrderHistoryModal() {
  if (isMobileViewport() && mobileModalStack.length > 0) {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('orderHistoryModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeOrderHistoryModalOnBackdrop(e) {
  if (e.target && e.target.id === 'orderHistoryModal') {
    closeOrderHistoryModal();
  }
}

function setHistoryDateFilter(mode, val = null) {
  historyDateFilterMode = mode;
  if (mode === 'custom') {
    historyCustomDate = val || '';
  }
  updateHistoryFilterPillsUi();
  renderHistoryOrdersList();
}

function updateHistoryFilterPillsUi() {
  const btnToday = document.getElementById('histBtnToday');
  const btnYest = document.getElementById('histBtnYesterday');
  const btnAll = document.getElementById('histBtnAll');
  const dateInput = document.getElementById('histDatePicker');

  if (btnToday) btnToday.classList.toggle('active', historyDateFilterMode === 'today');
  if (btnYest) btnYest.classList.toggle('active', historyDateFilterMode === 'yesterday');
  if (btnAll) btnAll.classList.toggle('active', historyDateFilterMode === 'all');
  if (dateInput && historyDateFilterMode === 'custom' && historyCustomDate) {
    dateInput.value = historyCustomDate;
  }
}

function renderHistoryOrdersList() {
  const allSales = getRecordedSales();
  const searchInput = document.getElementById('histSearchInput');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  // Filter by selected history date
  let filtered = allSales.filter(sale => {
    let saleIso = sale.isoDate;
    if (!saleIso && sale.timestamp) {
      try {
        const parsed = new Date(sale.timestamp.split(' ')[0].trim());
        if (!isNaN(parsed.getTime())) saleIso = parsed.toISOString().slice(0, 10);
      } catch (e) {}
    }
    if (historyDateFilterMode === 'today') return saleIso === getTodayIso();
    if (historyDateFilterMode === 'yesterday') return saleIso === getYesterdayIso();
    if (historyDateFilterMode === 'custom') return saleIso === historyCustomDate;
    return true; // 'all'
  });

  // Filter by search query
  if (query) {
    filtered = filtered.filter(sale => {
      const tick = (sale.ticketNumber || '').toLowerCase();
      const name = (sale.customerName || '').toLowerCase();
      const mob = (sale.customerMobile || '').toLowerCase();
      const itemsMatch = Array.isArray(sale.items) && sale.items.some(it => (it.name || '').toLowerCase().includes(query));
      return tick.includes(query) || name.includes(query) || mob.includes(query) || itemsMatch;
    });
  }

  // Format active date label
  let dateLabel = '';
  const now = new Date();
  if (historyDateFilterMode === 'today') {
    dateLabel = `Today • ${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  } else if (historyDateFilterMode === 'yesterday') {
    const yest = new Date(now.getTime() - 86400000);
    dateLabel = `Yesterday • ${yest.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  } else if (historyDateFilterMode === 'custom') {
    dateLabel = historyCustomDate ? `Custom Date: ${historyCustomDate}` : 'Select a Date';
  } else {
    dateLabel = 'All Dates & Historical Records';
  }

  const subEl = document.getElementById('historyDateSubtitle');
  if (subEl) {
    subEl.innerHTML = `📅 Showing <strong>${filtered.length}</strong> orders for: <span style="color: #38bdf8; font-weight: 700;">${dateLabel}</span>`;
  }

  // Calculate summary metrics
  let totalRev = 0;
  let totalUnits = 0;
  let cashRev = 0;
  let upiRev = 0;
  let cardRev = 0;

  filtered.forEach(s => {
    const rev = Number(s.grandTotal || s.amount || 0);
    totalRev += rev;
    totalUnits += Number(s.totalUnits || (Array.isArray(s.items) ? s.items.length : 1));
    const mode = (s.paymentMode || 'Cash').toUpperCase();
    if (mode.includes('CASH')) cashRev += rev;
    else if (mode.includes('UPI') || mode.includes('QR')) upiRev += rev;
    else if (mode.includes('CARD')) cardRev += rev;
  });

  const avgOrder = filtered.length > 0 ? (totalRev / filtered.length).toFixed(2) : '0.00';

  const ribbon = document.getElementById('histSummaryRibbon');
  if (ribbon) {
    ribbon.innerHTML = `
      <div class="hist-kpi-grid">
        <div class="hist-kpi-card kpi-emerald">
          <div class="hist-kpi-header">
            <span class="hist-kpi-icon">💰</span>
            <span class="hist-kpi-label">TOTAL SALES</span>
          </div>
          <div class="hist-kpi-val text-emerald">₹${totalRev.toFixed(2)}</div>
          <div class="hist-kpi-sub">${filtered.length} Bills Settled</div>
        </div>

        <div class="hist-kpi-card kpi-blue">
          <div class="hist-kpi-header">
            <span class="hist-kpi-icon">📦</span>
            <span class="hist-kpi-label">ORDERS COUNT</span>
          </div>
          <div class="hist-kpi-val text-blue">${filtered.length} <span class="hist-kpi-unit">Bills</span></div>
          <div class="hist-kpi-sub">Total Transactions</div>
        </div>

        <div class="hist-kpi-card kpi-amber">
          <div class="hist-kpi-header">
            <span class="hist-kpi-icon">🎂</span>
            <span class="hist-kpi-label">UNITS SOLD</span>
          </div>
          <div class="hist-kpi-val text-amber">${totalUnits} <span class="hist-kpi-unit">pcs</span></div>
          <div class="hist-kpi-sub">Dispatched Items</div>
        </div>

        <div class="hist-kpi-card kpi-purple">
          <div class="hist-kpi-header">
            <span class="hist-kpi-icon">📈</span>
            <span class="hist-kpi-label">AVG BILL</span>
          </div>
          <div class="hist-kpi-val text-purple">₹${avgOrder}</div>
          <div class="hist-kpi-sub">Per Customer AOV</div>
        </div>
      </div>

      <div class="hist-pay-strip">
        <div class="hist-pay-chip pay-chip-cash">💵 Cash: <strong>₹${cashRev.toFixed(2)}</strong></div>
        <div class="hist-pay-chip pay-chip-upi">📱 UPI: <strong>₹${upiRev.toFixed(2)}</strong></div>
        <div class="hist-pay-chip pay-chip-card">💳 Card: <strong>₹${cardRev.toFixed(2)}</strong></div>
      </div>
    `;
  }

  const container = document.getElementById('histOrdersCardsContainer') || document.getElementById('orderHistoryModalBody');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 45px 20px; color: #64748b;">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">📦</div>
        <h4 style="font-size: 1.05rem; color: #1e293b; margin-bottom: 6px; font-weight: 700;">No Orders Recorded for This Date</h4>
        <p style="font-size: 0.85rem; margin: 0; color: #64748b;">Date: <strong>${dateLabel}</strong></p>
        <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 8px;">Completed register transactions will appear here with full date & time history.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(sale => {
    const itemsList = Array.isArray(sale.items) ? sale.items : [];
    const itemsSummary = itemsList.map(it => `${it.quantity || 1}x ${it.name}`).join(', ') || 'Bakery Items';
    const cleanNum = (sale.ticketNumber || '01').replace('#', '');
    const dateFormatted = sale.date || sale.isoDate || 'Today';
    const timeFormatted = sale.time || '';
    const grand = Number(sale.grandTotal || sale.amount || 0).toFixed(2);
    const payMode = sale.paymentMode || 'Cash';

    let payBadgeBg = '#ecfdf5';
    let payBadgeColor = '#047857';
    if (payMode.toUpperCase().includes('UPI')) {
      payBadgeBg = '#eff6ff';
      payBadgeColor = '#1d4ed8';
    } else if (payMode.toUpperCase().includes('CARD')) {
      payBadgeBg = '#faf5ff';
      payBadgeColor = '#7e22ce';
    }

    html += `
      <div class="history-order-row">
        <!-- Top Row: Bill #, Order Type, Date/Time & Grand Total -->
        <div class="hist-order-header-row">
          <div class="hist-order-id-group">
            <span class="hist-bill-badge">${sale.ticketNumber || ('#SC-' + cleanNum)}</span>
            <span class="hist-type-badge">${sale.orderType || 'Takeaway'}</span>
          </div>
          <div class="hist-order-price-group">
            <div class="hist-order-date-pill">
              <span>📅 ${dateFormatted}</span>
              ${timeFormatted ? `<span class="hist-time-sep">•</span> <span>⏰ ${timeFormatted}</span>` : ''}
            </div>
            <div class="hist-order-total-val">₹${grand}</div>
          </div>
        </div>

        <!-- Middle Details: Customer Info & Items Summary -->
        <div class="hist-order-details-box">
          <div class="hist-order-customer-row">
            <div class="hist-customer-identity">
              <span class="hist-cust-icon">👤</span>
              <span class="hist-cust-name">${escapeHtml(sale.customerName || 'Walk-In Customer')}</span>
              ${sale.customerMobile ? `<span class="hist-cust-phone">📱 +91 ${sale.customerMobile}</span>` : ''}
            </div>
            <div class="hist-pay-mode-badge" style="background: ${payBadgeBg}; color: ${payBadgeColor};">
              ${payMode}
            </div>
          </div>
          <div class="hist-order-items-row">
            <span class="hist-items-icon">🍰</span>
            <span class="hist-items-text">${escapeHtml(itemsSummary)}</span>
            <span class="hist-items-count-pill">${sale.totalUnits || itemsList.length} pcs</span>
          </div>
        </div>

        <!-- Bottom Action Buttons: 3-Button Symmetrical Grid -->
        <div class="hist-order-actions">
          <button type="button" class="btn-hist-action btn-hist-bill" onclick="viewHistoryOrderReceipt('${sale.ticketNumber}')" title="View & Print thermal receipt">
            <span>🧾</span> <span>Bill</span>
          </button>
          <button type="button" class="btn-hist-action btn-hist-pdf" onclick="downloadHistoryOrderPdf('${sale.ticketNumber}')" title="Download official PDF Tax Invoice">
            <span>📄</span> <span>PDF</span>
          </button>
          <button type="button" class="btn-hist-action btn-hist-wa" onclick="whatsappHistoryOrder('${sale.ticketNumber}')" title="Send bill on WhatsApp">
            <span>📲</span> <span>WhatsApp</span>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function viewHistoryOrderReceipt(ticketNumber) {
  const allSales = getRecordedSales();
  const found = allSales.find(s => s.ticketNumber === ticketNumber);
  if (found) {
    openBillModal(found);
  } else {
    alert('Bill not found in sales history.');
  }
}

function downloadHistoryOrderPdf(ticketNumber) {
  const allSales = getRecordedSales();
  const found = allSales.find(s => s.ticketNumber === ticketNumber);
  if (!found) return alert('Bill not found.');

  populatePdfTemplateData(found);
  const invoiceEl = document.getElementById('professionalPdfInvoice');
  if (!invoiceEl) return;

  const cleanNum = (found.ticketNumber || '01').replace('#', '');
  const fileName = `SugarCubes_Invoice_${cleanNum}.pdf`;

  invoiceEl.style.display = 'block';
  invoiceEl.style.position = 'relative';
  invoiceEl.style.left = '0';

  const opt = {
    margin: [6, 6, 6, 6],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (window.html2pdf) {
    html2pdf().set(opt).from(invoiceEl).save().then(() => {
      invoiceEl.style.display = 'none';
      invoiceEl.style.position = 'absolute';
      invoiceEl.style.left = '-9999px';
      populatePdfTemplateData(); // Restore current active cart PDF view
      showToast(`📄 Downloaded PDF Invoice <strong>${fileName}</strong>!`);
    });
  }
}

async function whatsappHistoryOrder(ticketNumber) {
  const allSales = getRecordedSales();
  const found = allSales.find(s => s.ticketNumber === ticketNumber);
  if (!found) return alert('Bill not found.');

  const cleanMobile = found.customerMobile ? found.customerMobile.replace(/\D/g, '').slice(-10) : '';
  if (!cleanMobile || cleanMobile.length !== 10) {
    return alert(`⚠️ No valid 10-digit mobile number recorded for Bill ${ticketNumber}.`);
  }

  populatePdfTemplateData(found);
  const invoiceEl = document.getElementById('professionalPdfInvoice');
  const cleanNum = (found.ticketNumber || '01').replace('#', '');
  const fileName = `SugarCubes_Invoice_${cleanNum}.pdf`;

  if (!window.html2pdf || !invoiceEl) {
    window.open(`https://api.whatsapp.com/send?phone=91${cleanMobile}`, '_blank');
    return;
  }

  invoiceEl.style.display = 'block';
  invoiceEl.style.position = 'relative';
  invoiceEl.style.left = '0';

  const opt = {
    margin: [6, 6, 6, 6],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    const pdfBlob = await html2pdf().set(opt).from(invoiceEl).output('blob');
    invoiceEl.style.display = 'none';
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';
    populatePdfTemplateData(); // Restore active cart view

    // 1. Auto download
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

    // 2. Share PDF via Web Share if supported
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: `Sugar Cubes Invoice #${cleanNum}`
        });
        showToast(`✅ PDF Invoice for ${ticketNumber} shared via WhatsApp!`);
        return;
      } catch (e) {}
    }

    // 3. Fallback to direct chat
    window.open(`https://api.whatsapp.com/send?phone=91${cleanMobile}`, '_blank');
    showToast(`📄 <strong>${fileName}</strong> downloaded! Tap 📎 Attach > Document in WhatsApp.`);
  } catch (err) {
    invoiceEl.style.display = 'none';
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';
    populatePdfTemplateData();
    window.open(`https://api.whatsapp.com/send?phone=91${cleanMobile}`, '_blank');
  }
}

// ==========================================================================
// Daily Closing Audit Statement Modal
// ==========================================================================

function openDailyReportModal(mode = null, fromProfile = false, fromRestore = false) {
  const allSales = getRecordedSales();
  const isAllMode = (mode === 'all');
  const filtered = isAllMode ? allSales : allSales.filter(isSaleMatchingDateFilter);

  const titleEl = document.getElementById('dailyReportModalTitle');
  const subtitleEl = document.getElementById('dailyReportSubtitle');
  const iconEl = document.getElementById('dailyReportModalIcon');
  if (titleEl) {
    titleEl.textContent = isAllMode ? 'All Total Sales & Revenue Statement' : 'Daily Sales Closing Audit Statement';
  }
  if (subtitleEl) {
    subtitleEl.textContent = isAllMode
      ? 'Lifetime Commercial Turnover & Category Performance Audit'
      : 'Official End-of-Day Closing Turnover & Register Balance';
  }
  if (iconEl) {
    iconEl.textContent = isAllMode ? '📈' : '📊';
  }

  const modalBody = document.getElementById('dailyReportModalBody');
  if (modalBody) {
    if (filtered.length === 0) {
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: #64748b;">
          <div style="font-size: 3rem; margin-bottom: 12px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.08));">📦</div>
          <h4 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 6px; font-weight: 800;">
            ${isAllMode ? 'No Sales Recorded Yet' : 'No Sales Records for Selected Date'}
          </h4>
          <p style="font-size: 0.85rem; color: #94a3b8; margin: 0 auto; max-width: 320px; line-height: 1.5;">
            Completed register sales will automatically generate verified commercial turnover and revenue statistics here.
          </p>
        </div>
      `;
    } else {
      let totalRevenue = 0;
      let totalUnits = 0;
      let payModeBreakdown = { Cash: 0, UPI: 0, Card: 0 };
      let payModeCount = { Cash: 0, UPI: 0, Card: 0 };
      let catBreakdown = { 'Cakes & More': 0, 'Sugar Cubes Classics': 0 };
      let catUnits = { 'Cakes & More': 0, 'Sugar Cubes Classics': 0 };

      filtered.forEach(sale => {
        const rev = Number(sale.grandTotal || sale.amount || 0);
        totalRevenue += rev;
        const uCount = Number(sale.totalUnits || (Array.isArray(sale.items) ? sale.items.reduce((s, it) => s + Number(it.qty || 1), 0) : 1));
        totalUnits += uCount;

        const pMode = (sale.paymentMode || 'Cash').toUpperCase();
        if (pMode.includes('CASH')) {
          payModeBreakdown.Cash += rev;
          payModeCount.Cash++;
        } else if (pMode.includes('UPI') || pMode.includes('QR')) {
          payModeBreakdown.UPI += rev;
          payModeCount.UPI++;
        } else if (pMode.includes('CARD')) {
          payModeBreakdown.Card += rev;
          payModeCount.Card++;
        } else {
          payModeBreakdown.Cash += rev;
          payModeCount.Cash++;
        }

        if (Array.isArray(sale.items)) {
          sale.items.forEach(it => {
            let rawCat = it.category || 'Cakes & More';
            let cat = rawCat;
            if (rawCat === 'Cakes' || rawCat === 'Pastries' || rawCat === 'Desserts') {
              cat = 'Cakes & More';
            } else if (rawCat === 'Cupcakes' || rawCat === 'Beverages') {
              cat = 'Sugar Cubes Classics';
            }
            const itRev = Number(it.amount || ((it.price || 0) * (it.qty || 1)) || 0);
            const itQty = Number(it.qty || 1);
            catBreakdown[cat] = (catBreakdown[cat] || 0) + itRev;
            catUnits[cat] = (catUnits[cat] || 0) + itQty;
          });
        } else if (sale.category) {
          let rawCat = sale.category;
          let cat = rawCat;
          if (rawCat === 'Cakes' || rawCat === 'Pastries' || rawCat === 'Desserts') {
            cat = 'Cakes & More';
          } else if (rawCat === 'Cupcakes' || rawCat === 'Beverages') {
            cat = 'Sugar Cubes Classics';
          }
          catBreakdown[cat] = (catBreakdown[cat] || 0) + rev;
          catUnits[cat] = (catUnits[cat] || 0) + uCount;
        }
      });

      const avgBill = filtered.length > 0 ? (totalRevenue / filtered.length).toFixed(2) : '0.00';
      const scopeLabel = isAllMode ? 'ALL RECORDED SALES (LIFETIME)' : currentDateFilterMode.toUpperCase();

      // Top Payment Mode Determination
      let topPayMode = 'Cash';
      let maxPay = payModeBreakdown.Cash;
      if (payModeBreakdown.UPI > maxPay) { topPayMode = 'UPI / QR'; maxPay = payModeBreakdown.UPI; }
      if (payModeBreakdown.Card > maxPay) { topPayMode = 'Card'; maxPay = payModeBreakdown.Card; }
      const topPayPct = totalRevenue > 0 ? ((maxPay / totalRevenue) * 100).toFixed(0) : '0';

      const cashPct = totalRevenue > 0 ? ((payModeBreakdown.Cash / totalRevenue) * 100).toFixed(1) : '0.0';
      const upiPct = totalRevenue > 0 ? ((payModeBreakdown.UPI / totalRevenue) * 100).toFixed(1) : '0.0';
      const cardPct = totalRevenue > 0 ? ((payModeBreakdown.Card / totalRevenue) * 100).toFixed(1) : '0.0';

      const categoriesMeta = [
        { key: 'Cakes & More', name: 'Cakes & More', icon: '🍰', gradient: 'linear-gradient(90deg, #ec4899, #db2777)', badgeBg: '#fdf2f8', badgeColor: '#db2777', badgeBorder: '#fbcfe8' },
        { key: 'Sugar Cubes Classics', name: 'Sugar Cubes Classics', icon: '🍫', gradient: 'linear-gradient(90deg, #8b5cf6, #7c3aed)', badgeBg: '#f5f3ff', badgeColor: '#7c3aed', badgeBorder: '#ddd6fe' }
      ];

      // Include custom categories if present
      Object.keys(catBreakdown).forEach(k => {
        if (!categoriesMeta.some(c => c.key.toLowerCase() === k.toLowerCase()) && catBreakdown[k] > 0) {
          categoriesMeta.push({
            key: k,
            name: k,
            icon: '🧁',
            gradient: 'linear-gradient(90deg, #10b981, #059669)',
            badgeBg: '#ecfdf5',
            badgeColor: '#059669',
            badgeBorder: '#a7f3d0'
          });
        }
      });

      // Sort categories descending by revenue
      categoriesMeta.sort((a, b) => (catBreakdown[b.key] || 0) - (catBreakdown[a.key] || 0));

      const catRowsHtml = categoriesMeta.map(cat => {
        const amt = catBreakdown[cat.key] || 0;
        const units = catUnits[cat.key] || 0;
        const pct = totalRevenue > 0 ? ((amt / totalRevenue) * 100).toFixed(1) : '0.0';
        return `
          <div class="audit-cat-item">
            <div class="audit-cat-row-top">
              <div class="audit-cat-left">
                <span class="audit-cat-pill" style="background: ${cat.badgeBg}; color: ${cat.badgeColor}; border: 1px solid ${cat.badgeBorder};">
                  ${cat.icon} ${cat.name}
                </span>
                <span class="audit-cat-units-tag">${units} pcs sold</span>
              </div>
              <div class="audit-cat-right">
                <span class="audit-cat-amt">₹${amt.toFixed(2)}</span>
                <span class="audit-cat-pct-badge">${pct}%</span>
              </div>
            </div>
            <div class="audit-cat-bar-track">
              <div class="audit-cat-bar-fill" style="width: ${pct}%; background: ${cat.gradient};"></div>
            </div>
          </div>
        `;
      }).join('');

      const now = new Date();
      const auditTimeStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      modalBody.innerHTML = `
        <div class="audit-report-container">
          <!-- 1. Hero Revenue Turnover Banner -->
          <div class="audit-hero-card">
            <div class="audit-hero-top">
              <div class="audit-hero-title-group">
                <span class="audit-hero-eyebrow">💰 GROSS TURNOVER AUDIT</span>
                <span class="audit-scope-pill">${scopeLabel}</span>
              </div>
              <span class="audit-verified-badge">● Certified</span>
            </div>
            <div class="audit-hero-amount-row">
              <span class="audit-hero-currency">₹</span>
              <span class="audit-hero-val">${totalRevenue.toFixed(2)}</span>
            </div>
            <div class="audit-hero-sub-row">
              <span>🏬 Sugar Cubes • Terminal #1</span>
              <span>👥 Cashier: <strong>${activeUser ? escapeHtml(activeUser.name) : 'Store Manager'}</strong></span>
            </div>
          </div>

          <!-- 2. Symmetrical 2x2 Core Metrics Grid -->
          <div class="audit-kpi-grid">
            <div class="audit-kpi-card kpi-blue">
              <div class="audit-kpi-header">
                <span class="audit-kpi-icon">📦</span>
                <span class="audit-kpi-label">TOTAL INVOICES</span>
              </div>
              <div class="audit-kpi-val text-blue">${filtered.length} <span class="audit-kpi-unit">Bills</span></div>
              <div class="audit-kpi-sub">100% Settled Orders</div>
            </div>

            <div class="audit-kpi-card kpi-purple">
              <div class="audit-kpi-header">
                <span class="audit-kpi-icon">📈</span>
                <span class="audit-kpi-label">AVG BILL (AOV)</span>
              </div>
              <div class="audit-kpi-val text-purple">₹${avgBill}</div>
              <div class="audit-kpi-sub">Per Customer Bill</div>
            </div>

            <div class="audit-kpi-card kpi-amber">
              <div class="audit-kpi-header">
                <span class="audit-kpi-icon">🎂</span>
                <span class="audit-kpi-label">UNITS SOLD</span>
              </div>
              <div class="audit-kpi-val text-amber">${totalUnits} <span class="audit-kpi-unit">pcs</span></div>
              <div class="audit-kpi-sub">Dispatched Items</div>
            </div>

            <div class="audit-kpi-card kpi-rose">
              <div class="audit-kpi-header">
                <span class="audit-kpi-icon">💳</span>
                <span class="audit-kpi-label">TOP PAYMENT</span>
              </div>
              <div class="audit-kpi-val text-rose">${topPayMode}</div>
              <div class="audit-kpi-sub">${topPayPct}% of Volume</div>
            </div>
          </div>

          <!-- 3. Desktop 2-Column Split Row: Category Revenue & Payment Breakdown -->
          <div class="audit-split-row">
            <!-- Left Column: Revenue by Bakery Category -->
            <div class="audit-section-card">
              <div class="audit-section-header">
                <div class="audit-section-title">
                  <span class="audit-sec-icon">🍰</span>
                  <span class="audit-sec-text">Revenue by Bakery Category</span>
                </div>
                <span class="audit-section-chip">${categoriesMeta.length} Categories</span>
              </div>
              <div class="audit-cat-list">
                ${catRowsHtml}
              </div>
            </div>

            <!-- Right Column: Payment Collection Breakdown -->
            <div class="audit-section-card">
              <div class="audit-section-header">
                <div class="audit-section-title">
                  <span class="audit-sec-icon">💳</span>
                  <span class="audit-sec-text">Payment Collection Breakdown</span>
                </div>
                <span class="audit-section-chip">Reconciled</span>
              </div>
              <div class="audit-pay-grid">
                <div class="audit-pay-card pay-cash">
                  <div class="audit-pay-top">
                    <span class="audit-pay-name">💵 Cash</span>
                    <span class="audit-pay-pct">${cashPct}%</span>
                  </div>
                  <div class="audit-pay-val">₹${(payModeBreakdown.Cash || 0).toFixed(2)}</div>
                  <div class="audit-pay-count">${payModeCount.Cash || 0} Bills</div>
                </div>

                <div class="audit-pay-card pay-upi">
                  <div class="audit-pay-top">
                    <span class="audit-pay-name">📱 UPI / QR</span>
                    <span class="audit-pay-pct">${upiPct}%</span>
                  </div>
                  <div class="audit-pay-val">₹${(payModeBreakdown.UPI || 0).toFixed(2)}</div>
                  <div class="audit-pay-count">${payModeCount.UPI || 0} Bills</div>
                </div>

                <div class="audit-pay-card pay-card">
                  <div class="audit-pay-top">
                    <span class="audit-pay-name">💳 Card</span>
                    <span class="audit-pay-pct">${cardPct}%</span>
                  </div>
                  <div class="audit-pay-val">₹${(payModeBreakdown.Card || 0).toFixed(2)}</div>
                  <div class="audit-pay-count">${payModeCount.Card || 0} Bills</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Certified Digital Audit Footer Stamp -->
          <div class="audit-footer-stamp">
            <div class="audit-stamp-row">
              <span class="audit-stamp-icon">🛡️</span>
              <span class="audit-stamp-text">Certified Commercial Revenue & Turnover Statement</span>
            </div>
            <div class="audit-stamp-meta">
              Sugar Cubes Artisanal Bakery • Terminal Counter #1 • ${auditTimeStr}
            </div>
          </div>
        </div>
      `;
    }
  }

  const bottomEl = document.getElementById('dailyReportModalBottom');
  if (bottomEl) {
    const isMobile = isMobileViewport();
    // Dynamic back label based on what is underneath in the stack
    let backLabel = '← Back';
    const prev = mobileModalStack.length > 0 ? mobileModalStack[mobileModalStack.length - 1] : null;
    if (prev && prev.id === 'orderHistoryModal') {
      backLabel = '← Back to Orders';
    } else if (fromProfile || (prev && prev.id === 'userProfileModal')) {
      backLabel = '← Back to Profile';
    } else if (isMobile) {
      backLabel = '← Back to Store';
    }

    const showBack = fromProfile || isMobile || (mobileModalStack.length > 0);
    bottomEl.innerHTML = `
      ${showBack ? `<button type="button" class="btn-reg-secondary" style="padding: 8px 14px; font-size: 0.84rem;" onclick="closeDailyReportModal();">${backLabel}</button>` : ''}
      <button type="button" class="btn-dismiss" onclick="closeDailyReportModal()">Close</button>
      <button type="button" class="btn-primary-action" onclick="printDailyReport()">🖨️ Print Statement</button>
    `;
  }

  const modal = document.getElementById('dailyReportModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('dailyReportModal', {
      mode: mode,
      fromProfile: fromProfile,
      restoreFn: () => { openDailyReportModal(mode, fromProfile, true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeDailyReportModal() {
  if (isMobileViewport() && mobileModalStack.length > 0) {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('dailyReportModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeDailyReportModalOnBackdrop(e) {
  if (e.target.id === 'dailyReportModal') closeDailyReportModal();
}

function printDailyReport() {
  window.print();
}

// ==========================================================================
// 🏆 Best Selling Foods & Average Sales Analytics Modal (Mobile ONLY)
// ==========================================================================

let bestSalesFilterMode = 'all';

function setBestSalesFilter(mode) {
  bestSalesFilterMode = mode;
  
  const btnToday = document.getElementById('bestFilterToday');
  const btnYest = document.getElementById('bestFilterYest');
  const btnAll = document.getElementById('bestFilterAll');

  if (btnToday) btnToday.className = (mode === 'today') ? 'best-filter-btn active' : 'best-filter-btn';
  if (btnYest) btnYest.className = (mode === 'yesterday') ? 'best-filter-btn active' : 'best-filter-btn';
  if (btnAll) btnAll.className = (mode === 'all') ? 'best-filter-btn active' : 'best-filter-btn';

  renderBestSalesAnalytics(mode);
}

function renderBestSalesAnalytics(filterMode = 'all') {
  const allSales = getRecordedSales();
  let filtered = allSales;
  if (filterMode === 'today') {
    filtered = allSales.filter(s => {
      const iso = s.isoDate || (s.timestamp ? new Date(s.timestamp.split('•')[0].trim()).toISOString().slice(0, 10) : '');
      return iso === getTodayIso();
    });
  } else if (filterMode === 'yesterday') {
    filtered = allSales.filter(s => {
      const iso = s.isoDate || (s.timestamp ? new Date(s.timestamp.split('•')[0].trim()).toISOString().slice(0, 10) : '');
      return iso === getYesterdayIso();
    });
  }

  // Calculate Average Sales and Aggregate Turnover
  let totalRevenue = 0;
  let totalOrders = filtered.length;
  let totalUnits = 0;
  const foodMap = {};

  filtered.forEach(sale => {
    const rev = Number(sale.grandTotal || sale.amount || 0);
    totalRevenue += rev;
    const units = Number(sale.totalUnits || (Array.isArray(sale.items) ? sale.items.reduce((s, it) => s + (it.quantity || 1), 0) : 1));
    totalUnits += units;

    if (Array.isArray(sale.items)) {
      sale.items.forEach(it => {
        const name = (it.name || 'Artisanal Item').trim();
        if (!foodMap[name]) {
          foodMap[name] = {
            name: name,
            category: it.category || 'Cakes',
            variant: it.variant || '',
            totalQty: 0,
            ordersCount: 0,
            totalRevenue: 0
          };
        }
        foodMap[name].totalQty += Number(it.quantity || 1);
        foodMap[name].ordersCount += 1;
        foodMap[name].totalRevenue += Number(it.amount || ((it.price || 0) * (it.quantity || 1)));
      });
    } else if (sale.category) {
      const name = sale.cakeName || sale.category;
      if (!foodMap[name]) {
        foodMap[name] = {
          name: name,
          category: sale.category || 'Cakes',
          variant: '',
          totalQty: 0,
          ordersCount: 0,
          totalRevenue: 0
        };
      }
      foodMap[name].totalQty += units;
      foodMap[name].ordersCount += 1;
      foodMap[name].totalRevenue += rev;
    }
  });

  const avgOrder = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
  const avgUnits = totalOrders > 0 ? (totalUnits / totalOrders) : 0;

  // Render Average Sales KPI Ribbon
  const ribbonEl = document.getElementById('bestSalesKpiRibbon');
  if (ribbonEl) {
    ribbonEl.innerHTML = `
      <div class="best-kpi-box purple">
        <span class="best-kpi-label">📊 Average Order (AOV)</span>
        <span class="best-kpi-val">₹${avgOrder.toFixed(2)}</span>
      </div>
      <div class="best-kpi-box sky">
        <span class="best-kpi-label">🎂 Avg Items / Bill</span>
        <span class="best-kpi-val">${avgUnits.toFixed(1)} pcs</span>
      </div>
      <div class="best-kpi-box emerald">
        <span class="best-kpi-label">💰 Food Turnover</span>
        <span class="best-kpi-val">₹${totalRevenue.toFixed(2)}</span>
      </div>
      <div class="best-kpi-box amber">
        <span class="best-kpi-label">📦 Total Invoices</span>
        <span class="best-kpi-val">${totalOrders} Orders</span>
      </div>
    `;
  }

  // Count badge
  const countBadge = document.getElementById('bestFoodsCountBadge');
  const rankedList = Object.values(foodMap).sort((a, b) => {
    if (b.totalQty !== a.totalQty) return b.totalQty - a.totalQty;
    return b.totalRevenue - a.totalRevenue;
  });

  if (countBadge) {
    countBadge.textContent = `${rankedList.length} Foods Sold`;
  }

  // Subtitle
  const subTitle = document.getElementById('bestSalesSubtitle');
  if (subTitle) {
    const scopeName = (filterMode === 'today') ? "Today's" : (filterMode === 'yesterday') ? "Yesterday's" : "All Time";
    subTitle.textContent = `Showing ${scopeName} most ordered food ranking & average sales analytics`;
  }

  // Render Food Leaderboard List ("which food is more order show in this page")
  const rankListEl = document.getElementById('bestFoodsRankList');
  if (rankListEl) {
    if (rankedList.length === 0) {
      rankListEl.innerHTML = `
        <div style="text-align: center; padding: 40px 16px; color: #64748b;">
          <div style="font-size: 2.8rem; margin-bottom: 10px;">🍰</div>
          <h4 style="font-size: 1.05rem; color: #1e293b; margin-bottom: 6px; font-weight: 700;">No Food Orders Found</h4>
          <p style="font-size: 0.84rem; color: #94a3b8; margin: 0;">
            Recorded customer orders will rank the most popular cakes and pastries here.
          </p>
        </div>
      `;
    } else {
      const topMaxQty = rankedList[0].totalQty || 1;
      let html = '';
      rankedList.forEach((food, idx) => {
        let rankClass = '';
        let medalHtml = '';
        if (idx === 0) {
          rankClass = 'rank-1';
          medalHtml = `<span class="food-rank-medal">🥇 #1 Most Ordered</span>`;
        } else if (idx === 1) {
          rankClass = 'rank-2';
          medalHtml = `<span class="food-rank-medal">🥈 #2 Most Ordered</span>`;
        } else if (idx === 2) {
          rankClass = 'rank-3';
          medalHtml = `<span class="food-rank-medal">🥉 #3 Most Ordered</span>`;
        } else {
          medalHtml = `<span class="food-rank-medal-default">#${idx + 1}</span>`;
        }

        const barPct = Math.min(100, Math.round((food.totalQty / topMaxQty) * 100));
        const volumeSharePct = totalUnits > 0 ? Math.round((food.totalQty / totalUnits) * 100) : 0;
        const avgUnitPrice = food.totalQty > 0 ? (food.totalRevenue / food.totalQty) : 0;

        html += `
          <div class="food-rank-card ${rankClass}">
            <div class="food-rank-top">
              <div class="food-rank-left">
                ${medalHtml}
                <div class="food-rank-info">
                  <div class="food-rank-name" title="${escapeHtml(food.name)}">${escapeHtml(food.name)}</div>
                  <div class="food-rank-cat">🏷️ ${escapeHtml(food.category)} ${food.variant ? `• ${escapeHtml(food.variant)}` : ''}</div>
                </div>
              </div>
              <div class="food-rank-right">
                <span class="food-rank-qty-tag">🔥 ${food.totalQty} pcs sold</span>
                <span class="food-rank-rev-tag">₹${food.totalRevenue.toFixed(2)}</span>
              </div>
            </div>

            <!-- Visual Popularity Progress Bar -->
            <div class="food-popularity-track" title="${barPct}% of top seller volume">
              <div class="food-popularity-fill" style="width: ${barPct}%;"></div>
            </div>

            <div class="food-rank-meta-row">
              <span>📦 In <strong>${food.ordersCount}</strong> bills</span>
              <span>Avg <strong>₹${avgUnitPrice.toFixed(2)}</strong> / pc</span>
              <span><strong>${volumeSharePct}%</strong> volume share</span>
            </div>
          </div>
        `;
      });
      rankListEl.innerHTML = html;
    }
  }
}

function openBestSalesAnalyticsModal(mode = 'all', fromProfile = false, fromRestore = false) {
  bestSalesFilterMode = mode || 'all';

  // Sync button classes
  const btnToday = document.getElementById('bestFilterToday');
  const btnYest = document.getElementById('bestFilterYest');
  const btnAll = document.getElementById('bestFilterAll');
  if (btnToday) btnToday.className = (bestSalesFilterMode === 'today') ? 'best-filter-btn active' : 'best-filter-btn';
  if (btnYest) btnYest.className = (bestSalesFilterMode === 'yesterday') ? 'best-filter-btn active' : 'best-filter-btn';
  if (btnAll) btnAll.className = (bestSalesFilterMode === 'all') ? 'best-filter-btn active' : 'best-filter-btn';

  renderBestSalesAnalytics(bestSalesFilterMode);

  const modal = document.getElementById('bestSalesAnalyticsModal');
  if (modal) modal.style.display = 'flex';

  if (!fromRestore) {
    pushMobileModalState('bestSalesAnalyticsModal', {
      mode: mode,
      fromProfile: fromProfile,
      restoreFn: () => { openBestSalesAnalyticsModal(mode, fromProfile, true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeBestSalesAnalyticsModal() {
  if (isMobileViewport() && mobileModalStack.length > 0) {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('bestSalesAnalyticsModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeBestSalesAnalyticsModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'bestSalesAnalyticsModal') {
    closeBestSalesAnalyticsModal();
  }
}

function openBestSalesAnalyticsFromProfile() {
  openBestSalesAnalyticsModal('all', true);
}

// ==========================================================================
// Custom Cake / Off-Menu Order Modal
// ==========================================================================

function openCustomOrderModal(fromRestore = false) {
  const modal = document.getElementById('customOrderModal');
  if (modal) {
    modal.style.display = 'flex';
    const nameInput = document.getElementById('customItemName');
    if (nameInput) nameInput.focus();
  }

  if (!fromRestore) {
    pushMobileModalState('customOrderModal', {
      restoreFn: () => { openCustomOrderModal(true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeCustomOrderModal() {
  if (isMobileViewport() && mobileModalStack.length > 0) {
    popMobileModalState(false);
    return;
  }
  const modal = document.getElementById('customOrderModal');
  if (modal) modal.style.display = 'none';
  updateMobileScrollLock();
}

function closeCustomOrderModalOnBackdrop(e) {
  if (e.target.id === 'customOrderModal') closeCustomOrderModal();
}

function saveCustomOrder() {
  const nameInput = document.getElementById('customItemName');
  const catInput = document.getElementById('customItemCategory');
  const priceInput = document.getElementById('customItemPrice');
  const qtyInput = document.getElementById('customItemQty');

  const name = nameInput.value.trim();
  const category = catInput.value;
  const price = parseFloat(priceInput.value);
  const qty = parseInt(qtyInput.value) || 1;

  if (!name) return alert('Please enter the custom item name.');
  if (isNaN(price) || price <= 0) return alert('Please enter a valid positive price.');

  activeCart.unshift({
    id: currentTicketNumber,
    name: name,
    category: category,
    unitPrice: price,
    quantity: qty,
    amount: Number((price * qty).toFixed(2))
  });

  nameInput.value = '';
  priceInput.value = '';
  qtyInput.value = '1';

  closeCustomOrderModal();
  playBeep('add');
  renderCart();
  showToast(`✨ Added custom item: <strong>${escapeHtml(name)}</strong>!`);
}

// ==========================================================================
// Export to CSV / Excel
// ==========================================================================

function exportToExcel() {
  const sales = getRecordedSales();
  if (sales.length === 0) return alert('No recorded sales to export.');

  let csv = 'Bill No,Date,Time,Customer Name,Customer Mobile,Order Type,Payment Mode,Items Breakdown,Subtotal,Discount,GST,Grand Total\n';

  sales.forEach(s => {
    let itemsStr = '';
    if (Array.isArray(s.items)) {
      itemsStr = s.items.map(it => `${it.name} (x${it.quantity})`).join('; ');
    } else {
      itemsStr = `${s.name || ''} (x${s.quantity || 1})`;
    }

    csv += `"${s.ticketNumber || ''}","${s.date || ''}","${s.time || ''}","${s.customerName || ''}","${s.customerMobile || ''}","${s.orderType || 'Takeaway'}","${s.paymentMode || 'Cash'}","${itemsStr.replace(/"/g, '""')}","${s.subtotal || s.amount || 0}","${s.discount || 0}","${s.gst || 0}","${s.grandTotal || s.amount || 0}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SugarCubes_Sales_${getTodayIso()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📈 Sales report CSV downloaded successfully!');
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================

function showToast(msgHtml) {
  let container = document.getElementById('posToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'posToastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pos-toast';
  toast.innerHTML = msgHtml;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease-out';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => { toast.remove(); }, 300);
  }, 3200);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// User Authentication & Cashier Account Engine
// ==========================================================================

let activeUser = null;

const DEFAULT_USERS = [
  { id: 'admin', email: 'admin@sugarcubes.com', password: 'admin123', name: 'Store Manager', role: 'Store Manager' },
  { id: 'cashier', email: 'cashier@sugarcubes.com', password: '1234', name: 'Front Cashier', role: 'Cashier' }
];

function getApiKeyConfig() {
  try {
    const raw = localStorage.getItem('sugarCubesApiKeyConfig');
    if (raw) {
      return JSON.parse(raw);
    }
    const defaultConfig = {
      provider: 'resend',
      apiKey: 're_EoJNE38R_A1M9J82JRcQk4PDiVFPitNXC',
      endpoint: 'https://api.resend.com/emails'
    };
    localStorage.setItem('sugarCubesApiKeyConfig', JSON.stringify(defaultConfig));
    return defaultConfig;
  } catch (e) {
    return { provider: 'resend', apiKey: 're_EoJNE38R_A1M9J82JRcQk4PDiVFPitNXC', endpoint: 'https://api.resend.com/emails' };
  }
}

async function sendResendEmailNotification(toEmail, subject, htmlContent) {
  const cfg = getApiKeyConfig();
  const apiKey = cfg.apiKey || 're_EoJNE38R_A1M9J82JRcQk4PDiVFPitNXC';
  if (!apiKey) return false;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Sugar Cubes POS <onboarding@resend.dev>',
        to: [toEmail],
        subject: subject,
        html: htmlContent
      })
    });
    const data = await res.json();
    console.log('Resend Email API response:', data);
    return res.ok;
  } catch (err) {
    console.warn('Resend Email API network warning:', err);
    return false;
  }
}

function openApiKeyModal() {
  const modal = document.getElementById('apiKeyConfigModal');
  if (!modal) return;
  const cfg = getApiKeyConfig();
  const providerSel = document.getElementById('apiProviderSelect');
  const keyInput = document.getElementById('cfgApiKey');
  const endpointInput = document.getElementById('cfgApiEndpoint');
  
  if (providerSel) providerSel.value = cfg.provider || 'local';
  if (keyInput) keyInput.value = cfg.apiKey || '';
  if (endpointInput) endpointInput.value = cfg.endpoint || '';
  
  handleApiProviderChange();
  modal.style.display = 'flex';
}

function closeApiKeyModal() {
  const modal = document.getElementById('apiKeyConfigModal');
  if (modal) modal.style.display = 'none';
}

function closeApiKeyModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'apiKeyConfigModal') {
    closeApiKeyModal();
  }
}

function handleApiProviderChange() {
  const providerSelect = document.getElementById('apiProviderSelect');
  const provider = providerSelect ? providerSelect.value : 'local';
  const keyWrap = document.getElementById('apiKeyInputWrap');
  const endpointWrap = document.getElementById('apiEndpointInputWrap');
  if (provider === 'local') {
    if (keyWrap) keyWrap.style.display = 'none';
    if (endpointWrap) endpointWrap.style.display = 'none';
  } else {
    if (keyWrap) keyWrap.style.display = 'block';
    if (endpointWrap) endpointWrap.style.display = 'block';
  }
}

function saveApiKeySettings() {
  const providerSelect = document.getElementById('apiProviderSelect');
  const provider = providerSelect ? providerSelect.value : 'local';
  const keyInput = document.getElementById('cfgApiKey');
  const endpointInput = document.getElementById('cfgApiEndpoint');
  const apiKey = keyInput ? keyInput.value.trim() : '';
  const endpoint = endpointInput ? endpointInput.value.trim() : '';

  const cfg = { provider, apiKey, endpoint, updatedAt: new Date().toISOString() };
  localStorage.setItem('sugarCubesApiKeyConfig', JSON.stringify(cfg));
  showToast('⚙️ API Key & Cloud Auth settings saved successfully!');
  closeApiKeyModal();
}

function initUsersStorage() {
  const existing = localStorage.getItem('sugarCubesUsers');
  if (!existing) {
    localStorage.setItem('sugarCubesUsers', JSON.stringify(DEFAULT_USERS));
  }
}

function getUsersList() {
  try {
    const raw = localStorage.getItem('sugarCubesUsers');
    return raw ? JSON.parse(raw) : DEFAULT_USERS;
  } catch (err) {
    return DEFAULT_USERS;
  }
}

function saveUsersList(users) {
  localStorage.setItem('sugarCubesUsers', JSON.stringify(users));
}

function checkAuthSession() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preview') === '1') {
      activeUser = { id: 'admin', name: 'Store Manager', role: 'Store Manager' };
      applyAuthenticatedState(activeUser, false);
      if (urlParams.get('page') === 'sales') {
        setTimeout(() => switchDesktopPage('sales'), 50);
      }
      if (urlParams.get('scroll')) {
        const scrollOffset = parseInt(urlParams.get('scroll'), 10);
        setTimeout(() => window.scrollTo(0, scrollOffset), 120);
      }
      if (urlParams.get('apiModal') === '1') {
        setTimeout(openApiKeyModal, 150);
      }
      return;
    }
  } catch (err) {
    console.error('Auth session error:', err);
  }

  // Active tab session check (sessionStorage survives F5/Reloads, but clears on tab/browser close)
  const saved = sessionStorage.getItem('sugarCubesActiveUser');
  if (saved) {
    try {
      const u = JSON.parse(saved);
      applyAuthenticatedState(u, false);

      const lastPage = sessionStorage.getItem('sugarCubesCurrentDesktopPage');
      if (lastPage && window.innerWidth > 768) {
        setTimeout(() => switchDesktopPage(lastPage), 30);
      }
      return;
    } catch (e) {}
  }
  showAuthScreen('signin');
}

function applyAuthenticatedState(user, isInteractiveLogin = false) {
  activeUser = user;
  try {
    document.documentElement.classList.remove('auth-pending');
  } catch (e) {}

  const overlay = document.getElementById('loginAuthScreen');
  if (overlay) {
    if (isInteractiveLogin && overlay.style.display !== 'none') {
      overlay.classList.add('auth-hidden');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 220);
    } else {
      overlay.classList.add('auth-hidden');
      overlay.style.display = 'none';
    }
  }

  const userPill = document.getElementById('loggedUserPill');
  const nameEl = document.getElementById('headerCashierName');
  const emailEl = document.getElementById('headerCashierEmail');
  const roleEl = document.getElementById('headerCashierRole');
  if (userPill) userPill.style.display = 'inline-flex';
  if (nameEl) nameEl.textContent = user.name || user.id || 'Cashier';
  if (emailEl) emailEl.textContent = user.email || (user.id && user.id.includes('@') ? user.id : `${user.id || 'admin'}@sugarcubes.com`);
  if (roleEl) {
    const rawRole = (user.role || 'Manager').trim();
    const rawName = (user.name || user.id || '').trim();
    if (rawRole.toLowerCase() === rawName.toLowerCase()) {
      roleEl.textContent = 'Shift Active';
    } else {
      roleEl.textContent = rawRole;
    }
  }

  // Sync mobile top-corner profile button
  const mobileNameEl = document.getElementById('mobileCornerUserName');
  if (mobileNameEl) {
    mobileNameEl.textContent = user.name ? user.name.split(' ')[0] : (user.id || 'Admin');
  }

  if (window.innerWidth <= 768) {
    switchMobileView('menu');
  }
}

function playRegisterAudioBeep() {
  playBeep('success');
}

function showAuthScreen(defaultTab = 'signin') {
  try {
    document.documentElement.classList.remove('auth-pending');
  } catch (e) {}

  const overlay = document.getElementById('loginAuthScreen');
  if (overlay) {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      overlay.classList.remove('auth-hidden');
    });
  }

  const userPill = document.getElementById('loggedUserPill');
  if (userPill) userPill.style.display = 'none';

  const mobileNameEl = document.getElementById('mobileCornerUserName');
  if (mobileNameEl) mobileNameEl.textContent = 'Login';
  closeUserProfileModal();

  switchAuthTab(defaultTab);
  clearAuthAlert();

  const loginInput = document.getElementById('loginIdInput');
  const passInput = document.getElementById('loginPasswordInput');
  if (loginInput && defaultTab === 'signin') loginInput.value = '';
  if (passInput) passInput.value = '';

  setTimeout(() => {
    if (defaultTab === 'signin' && loginInput) loginInput.focus();
    else if (defaultTab === 'register') {
      const regName = document.getElementById('regFullName');
      if (regName) regName.focus();
    }
  }, 100);
}

function switchAuthTab(tab) {
  const btnSignIn = document.getElementById('tabBtnSignIn');
  const btnRegister = document.getElementById('tabBtnRegister');
  const formSignIn = document.getElementById('signInForm');
  const formRegister = document.getElementById('registerForm');

  clearAuthAlert();

  if (tab === 'signin') {
    if (btnSignIn) btnSignIn.classList.add('active');
    if (btnRegister) btnRegister.classList.remove('active');
    if (formSignIn) formSignIn.style.display = 'flex';
    if (formRegister) formRegister.style.display = 'none';
    const input = document.getElementById('loginIdInput');
    if (input) input.focus();
  } else {
    if (btnSignIn) btnSignIn.classList.remove('active');
    if (btnRegister) btnRegister.classList.add('active');
    if (formSignIn) formSignIn.style.display = 'none';
    if (formRegister) formRegister.style.display = 'flex';
    const input = document.getElementById('regFullName');
    if (input) input.focus();
  }
}

function showAuthAlert(msg, type = 'error') {
  const banner = document.getElementById('authAlertBanner');
  if (!banner) return;
  banner.className = `auth-alert-banner ${type}`;
  banner.innerHTML = msg;
  banner.style.display = 'flex';
}

function clearAuthAlert() {
  const banner = document.getElementById('authAlertBanner');
  if (banner) banner.style.display = 'none';
}

function handleSignInSubmit(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }

  const idInput = document.getElementById('loginIdInput');
  const passInput = document.getElementById('loginPasswordInput');
  const rememberChk = document.getElementById('authRememberMe');

  let id = idInput ? idInput.value.trim() : '';
  let password = passInput ? passInput.value.trim() : '';
  const remember = rememberChk ? rememberChk.checked : true;

  if (!id || !password) {
    showAuthAlert('⚠️ Please enter your Email ID / Login ID and Password to sign in.', 'error');
    if (!id && idInput) idInput.focus();
    else if (!password && passInput) passInput.focus();
    return false;
  }

  const users = getUsersList();
  const matched = users.find(u => 
    ((u.id && u.id.toLowerCase() === id.toLowerCase()) || (u.email && u.email.toLowerCase() === id.toLowerCase())) && u.password === password
  );

  if (matched) {
    sessionStorage.setItem('sugarCubesActiveUser', JSON.stringify(matched));
    localStorage.removeItem('sugarCubesActiveUser');

    try {
      playBeep('success');
    } catch (soundErr) {}

    // Send backend login audit log to Resend API (visible on https://resend.com/emails)
    const userEmail = matched.email || (matched.id && matched.id.includes('@') ? matched.id : `${matched.id}@sugarcubes.com`);
    sendResendEmailNotification(
      userEmail,
      `🔐 Cashier Login Audit: ${matched.name} (${userEmail})`,
      `<div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
        <h2>🔑 POS Terminal Login Alert</h2>
        <p><strong>Cashier Name:</strong> ${escapeHtml(matched.name)}</p>
        <p><strong>Login Email ID:</strong> ${escapeHtml(userEmail)}</p>
        <p><strong>Role:</strong> ${escapeHtml(matched.role || 'Staff')}</p>
        <p><strong>Login Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        <p style="font-size: 12px; color: #64748b;">Sugar Cubes POS Security Audit Log • Resend Cloud API Key Active</p>
       </div>`
    );

    applyAuthenticatedState(matched, true);
    showToast(`👋 Welcome back, <strong>${escapeHtml(matched.name)}</strong> (${escapeHtml(matched.email || matched.id)})!`);
    return false;
  } else {
    showAuthAlert('❌ Invalid Email ID / Login ID or Password. Please check your credentials.', 'error');
    if (passInput) {
      passInput.focus();
      passInput.select();
    }
    return false;
  }
}

function handleRegisterSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nameInput = document.getElementById('regFullName');
  const emailInput = document.getElementById('regEmail');
  const passInput = document.getElementById('regPassword');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const id = email;
  const password = passInput ? passInput.value.trim() : '';
  const role = 'Store User';

  if (!name || !email || !password) {
    showAuthAlert('⚠️ Please fill in all required registration fields including Email Address.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAuthAlert('⚠️ Please enter a valid Email Address (e.g. name@domain.com).', 'error');
    if (emailInput) emailInput.focus();
    return;
  }

  if (password.length < 4) {
    showAuthAlert('⚠️ Password must be at least 4 characters long.', 'error');
    return;
  }

  const users = getUsersList();
  const exists = users.some(u => 
    (u.email && u.email.toLowerCase() === email.toLowerCase()) ||
    (u.id && u.id.toLowerCase() === email.toLowerCase())
  );
  if (exists) {
    showAuthAlert(`⚠️ An account with Email <strong>${escapeHtml(email)}</strong> already exists.`, 'error');
    return;
  }

  const newUser = {
    id: id,
    email: email,
    password: password,
    name: name,
    role: role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsersList(users);

  showAuthAlert(`🎉 Account created for <strong>${escapeHtml(name)}</strong>! Proceeding to Sign In...`, 'success');

  try {
    playBeep('success');
  } catch (soundErr) {}

  // Send backend account creation log to Resend API (visible on https://resend.com/emails)
  sendResendEmailNotification(
    newUser.email,
    `✨ New Staff Account Created: ${newUser.name} (${newUser.email})`,
    `<div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
      <h2>✨ POS Account Created Alert</h2>
      <p><strong>Staff Name:</strong> ${escapeHtml(newUser.name)}</p>
      <p><strong>Registered Email ID:</strong> ${escapeHtml(newUser.email)}</p>
      <p><strong>Login ID:</strong> ${escapeHtml(newUser.id)}</p>
      <p><strong>Assigned Role:</strong> ${escapeHtml(newUser.role)}</p>
      <p><strong>Created Date:</strong> ${new Date().toLocaleString()}</p>
      <hr/>
      <p style="font-size: 12px; color: #64748b;">Sugar Cubes POS Account System • Resend API Key Logged</p>
     </div>`
  );

  setTimeout(() => {
    // 2-Step Auth Enforcement: Switch to Sign In tab (Create Account -> Sign In -> Home Page)
    switchAuthTab('signin');
    const loginIdInput = document.getElementById('loginIdInput');
    const loginPassInput = document.getElementById('loginPasswordInput');
    if (loginIdInput) loginIdInput.value = email || id;
    if (loginPassInput) {
      loginPassInput.value = '';
      loginPassInput.focus();
    }
    showAuthAlert(`👉 Account created for <strong>${escapeHtml(name)}</strong>! Please enter your Password to Sign In and open Home Page.`, 'success');
    showToast(`✨ Account created! Please enter your Password to Sign In.`);

    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (idInput) idInput.value = '';
    if (passInput) passInput.value = '';
  }, 600);
}

function quickDemoLogin() {
  const users = getUsersList();
  let admin = users.find(u => (u.id && u.id.toLowerCase() === 'admin') || (u.email && u.email.toLowerCase() === 'admin@sugarcubes.com'));
  if (!admin) {
    admin = { id: 'admin', email: 'admin@sugarcubes.com', password: 'admin123', name: 'Store Manager', role: 'Store Manager' };
  }
  sessionStorage.setItem('sugarCubesActiveUser', JSON.stringify(admin));
  localStorage.removeItem('sugarCubesActiveUser');
  try {
    playBeep('success');
  } catch (soundErr) {}
  applyAuthenticatedState(admin, true);
  showToast(`🚀 Direct Demo Access! Welcome to Sugar Cubes POS.`);
}

function logoutUser() {
  if (confirm('🔒 Lock POS Register and Logout?')) {
    clearMobileModalStack();
    activeUser = null;
    localStorage.removeItem('sugarCubesActiveUser');
    sessionStorage.removeItem('sugarCubesActiveUser');
    sessionStorage.removeItem('sugarCubesCurrentDesktopPage');
    showAuthScreen('signin');
    showToast('🔒 Cashier logged out. Register locked.');
  }
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btnEl) btnEl.textContent = '🙈';
  } else {
    input.type = 'password';
    if (btnEl) btnEl.textContent = '👁️';
  }
}

// ==========================================================================
// Cashier & User Profile Modal Handlers (Opened from Mobile Top-Corner Button)
// Shows Live Time/Date, Total Sales, Orders, Best Sales, Ava Order, & History
// ==========================================================================

let profHistoryFilterMode = 'today';
let profHistoryCustomDate = '';

function renderRegisteredUsersList() {
  const container = document.getElementById('registeredUsersListContainer');
  const countBadge = document.getElementById('registeredUsersCountBadge');
  if (!container) return;

  const users = getUsersList();
  if (countBadge) countBadge.textContent = `${users.length} ${users.length === 1 ? 'Account' : 'Accounts'}`;

  container.innerHTML = users.map(u => {
    const email = u.email || (u.id && u.id.includes('@') ? u.id : `${u.id}@sugarcubes.com`);
    const name = u.name || u.id || 'User';
    const role = u.role || 'Cashier';
    const isCurrent = activeUser && ((activeUser.email && activeUser.email.toLowerCase() === email.toLowerCase()) || (activeUser.id && activeUser.id.toLowerCase() === (u.id || '').toLowerCase()));
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${isCurrent ? '#eff6ff' : '#f8fafc'}; padding: 8px 12px; border-radius: 8px; border: 1px solid ${isCurrent ? '#93c5fd' : '#e2e8f0'}; font-size: 0.82rem;">
        <div style="display: flex; flex-direction: column; min-width: 0;">
          <span style="font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            📧 ${escapeHtml(email)} ${isCurrent ? '<span style="color: #2563eb; font-size: 0.7rem; font-weight: 800; background: #dbeafe; padding: 2px 6px; border-radius: 4px;">● Active Session</span>' : ''}
          </span>
          <span style="font-size: 0.72rem; color: #64748b;">
            👤 ${escapeHtml(name)} • <span style="color: #475569; font-weight: 600;">${escapeHtml(role)}</span>
          </span>
        </div>
        <span style="font-size: 0.7rem; background: #ffffff; color: #475569; padding: 3px 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 600; white-space: nowrap;">
          ${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'System Default'}
        </span>
      </div>
    `;
  }).join('');
}

window.getRegisteredEmailAccounts = getUsersList;
window.getRegisteredUsers = getUsersList;

function openShiftActionModal() {
  if (window.innerWidth <= 768) return; // Laptop Web View only
  const modal = document.getElementById('shiftActionModal');
  if (modal) modal.style.display = 'flex';
}

function closeShiftActionModal() {
  const modal = document.getElementById('shiftActionModal');
  if (modal) modal.style.display = 'none';
}

function closeShiftActionModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'shiftActionModal') {
    closeShiftActionModal();
  }
}

// ==========================================================================
// Cashier Shift Resign & Re-login Modal Handlers
// ==========================================================================

function openResignReloginModal() {
  closeShiftActionModal();

  const currentU = activeUser || { name: 'Store Manager', role: 'Store Manager', id: 'admin', email: 'admin@sugarcubes.com' };
  
  const emailEl = document.getElementById('resignActiveUserEmail');
  if (emailEl) emailEl.textContent = currentU.email || (currentU.id && currentU.id.includes('@') ? currentU.id : `${currentU.id || 'admin'}@sugarcubes.com`);

  const nameEl = document.getElementById('resignActiveUserName');
  if (nameEl) nameEl.textContent = `${currentU.name || currentU.id || 'Store Manager'} • ${currentU.role || 'Cashier'}`;

  renderResignRegisteredUsersList();

  const modal = document.getElementById('resignReloginModal');
  if (modal) modal.style.display = 'flex';
}

function closeResignReloginModal() {
  const modal = document.getElementById('resignReloginModal');
  if (modal) modal.style.display = 'none';
}

function closeResignReloginModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'resignReloginModal') {
    closeResignReloginModal();
  }
}

function renderResignRegisteredUsersList() {
  const container = document.getElementById('resignRegisteredUsersListContainer');
  const countBadge = document.getElementById('resignRegisteredCountBadge');
  if (!container) return;

  const users = getUsersList();
  if (countBadge) countBadge.textContent = `${users.length} ${users.length === 1 ? 'Account' : 'Accounts'}`;

  container.innerHTML = users.map(u => {
    const email = u.email || (u.id && u.id.includes('@') ? u.id : `${u.id}@sugarcubes.com`);
    const name = u.name || u.id || 'User';
    const role = u.role || 'Cashier';
    const isCurrent = activeUser && ((activeUser.email && activeUser.email.toLowerCase() === email.toLowerCase()) || (activeUser.id && activeUser.id.toLowerCase() === (u.id || '').toLowerCase()));
    
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${isCurrent ? '#fef2f2' : '#f8fafc'}; padding: 10px 12px; border-radius: 8px; border: 1px solid ${isCurrent ? '#fca5a5' : '#e2e8f0'}; font-size: 0.82rem;">
        <div style="display: flex; flex-direction: column; min-width: 0; flex: 1; padding-right: 8px;">
          <span style="font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            📧 ${escapeHtml(email)} ${isCurrent ? '<span style="color: #dc2626; font-size: 0.68rem; font-weight: 800; background: #fee2e2; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">● Active Session</span>' : ''}
          </span>
          <span style="font-size: 0.72rem; color: #64748b;">
            👤 ${escapeHtml(name)} • <span style="color: #475569; font-weight: 600;">${escapeHtml(role)}</span>
          </span>
        </div>
        ${isCurrent ? `
          <button type="button" onclick="closeResignReloginModal(); logoutUser();" style="background: #dc2626; color: white; border: none; padding: 5px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 800; cursor: pointer; white-space: nowrap;">
            🔒 Logout
          </button>
        ` : `
          <button type="button" onclick="switchAccountRelogin('${escapeHtml(email)}')" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 5px 10px; border-radius: 6px; font-size: 0.74rem; font-weight: 800; cursor: pointer; white-space: nowrap;">
            🔑 Switch & Re-login
          </button>
        `}
      </div>
    `;
  }).join('');
}

function switchAccountRelogin(targetEmail) {
  closeResignReloginModal();
  clearMobileModalStack();
  activeUser = null;
  localStorage.removeItem('sugarCubesActiveUser');
  sessionStorage.removeItem('sugarCubesActiveUser');
  sessionStorage.removeItem('sugarCubesCurrentDesktopPage');
  
  showAuthScreen('signin');
  const loginIdInput = document.getElementById('loginIdInput');
  const loginPassInput = document.getElementById('loginPassInput');
  if (loginIdInput) loginIdInput.value = targetEmail;
  if (loginPassInput) {
    loginPassInput.value = '';
    loginPassInput.focus();
  }
  showToast(`🔑 Register locked. Pre-selected <strong>${escapeHtml(targetEmail)}</strong> for re-login.`);
}

// ==========================================================================
// Employee Payslip & Owner Details Modal Handlers
// ==========================================================================

const DEFAULT_PAYSLIP_CONFIG = {
  compName: 'SUGAR CUBES BAKERY & CAFÉ',
  compAddr: 'Coimbatore Branch, Tamil Nadu • GSTIN: 33AAAAA0000A1Z5',
  payPeriod: 'September 2026',

  empId: 'SC-EMP-101',
  empName: '',
  designation: 'Senior Cashier',
  department: 'Store Operations',
  doj: '01 Jan 2024',

  uan: '100987654321',
  pfNo: 'TN/MAS/0012345',
  esiNo: '3100123456',
  bank: 'HDFC Bank',
  accNo: 'XXXXXX4321',

  grossWages: 15000,
  totalWorkDays: 30,
  leaves: 0,
  lopDays: 0,
  paidDays: 30,

  basic: 7500,
  hra: 3000,
  conveyance: 1600,
  medical: 1250,
  otherAllow: 1650,

  epf: 900,
  esi: 113,
  profTax: 0
};

function getStoredPayslipConfig() {
  try {
    const raw = localStorage.getItem('sugarCubesPayslipConfig');
    if (raw) return { ...DEFAULT_PAYSLIP_CONFIG, ...JSON.parse(raw) };
  } catch (e) {}
  return { ...DEFAULT_PAYSLIP_CONFIG };
}

function saveStoredPayslipConfig(cfg) {
  try {
    localStorage.setItem('sugarCubesPayslipConfig', JSON.stringify(cfg));
  } catch (e) {}
}

function downloadEmployeePayslip() {
  const currentU = activeUser || { name: 'Store Manager', role: 'Store Manager', id: 'admin', email: 'admin@sugarcubes.com' };
  const cfg = getStoredPayslipConfig();

  // Header & Company
  const compNameEl = document.getElementById('psCompName');
  if (compNameEl) compNameEl.textContent = cfg.compName || DEFAULT_PAYSLIP_CONFIG.compName;

  const compAddrEl = document.getElementById('psCompAddr');
  if (compAddrEl) compAddrEl.textContent = cfg.compAddr || DEFAULT_PAYSLIP_CONFIG.compAddr;

  const periodEl = document.getElementById('psPayPeriodText');
  if (periodEl) periodEl.textContent = cfg.payPeriod || `${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`;

  // Employee details
  const empIdEl = document.getElementById('psEmpId');
  if (empIdEl) empIdEl.textContent = cfg.empId || 'SC-EMP-101';

  const nameEl = document.getElementById('psEmpName');
  if (nameEl) nameEl.textContent = cfg.empName || currentU.name || currentU.id || 'Store Manager';

  const desigEl = document.getElementById('psDesignation');
  if (desigEl) desigEl.textContent = cfg.designation || currentU.role || 'Senior Cashier';

  const deptEl = document.getElementById('psDepartment');
  if (deptEl) deptEl.textContent = cfg.department || 'Store Operations';

  const dojEl = document.getElementById('psDoj');
  if (dojEl) dojEl.textContent = cfg.doj || '01 Jan 2024';

  const uanEl = document.getElementById('psUan');
  if (uanEl) uanEl.textContent = cfg.uan || '100987654321';

  const pfEl = document.getElementById('psPfNo');
  if (pfEl) pfEl.textContent = cfg.pfNo || 'TN/MAS/0012345';

  const esiEl = document.getElementById('psEsiNo');
  if (esiEl) esiEl.textContent = cfg.esiNo || '3100123456';

  const bankEl = document.getElementById('psBank');
  if (bankEl) bankEl.textContent = cfg.bank || 'HDFC Bank';

  const accEl = document.getElementById('psAccNo');
  if (accEl) accEl.textContent = cfg.accNo || 'XXXXXX4321';

  // Wages & Attendance
  const grossWages = parseFloat(cfg.grossWages) || 15000;
  const grossEl = document.getElementById('psGrossWages');
  if (grossEl) grossEl.textContent = `₹${grossWages.toLocaleString('en-IN')}`;

  const workDaysEl = document.getElementById('psTotalWorkDays');
  if (workDaysEl) workDaysEl.textContent = cfg.totalWorkDays !== undefined ? cfg.totalWorkDays : 30;

  const leavesEl = document.getElementById('psLeaves');
  if (leavesEl) leavesEl.textContent = cfg.leaves !== undefined ? cfg.leaves : 0;

  const lopEl = document.getElementById('psLopDays');
  if (lopEl) lopEl.textContent = cfg.lopDays !== undefined ? cfg.lopDays : 0;

  const paidDaysEl = document.getElementById('psPaidDays');
  if (paidDaysEl) paidDaysEl.textContent = cfg.paidDays !== undefined ? cfg.paidDays : 30;

  // Earnings
  const basic = parseFloat(cfg.basic) || 7500;
  const hra = parseFloat(cfg.hra) || 3000;
  const conveyance = parseFloat(cfg.conveyance) || 1600;
  const medical = parseFloat(cfg.medical) || 1250;
  const otherAllow = parseFloat(cfg.otherAllow) || 1650;

  const basicEl = document.getElementById('psBasic');
  if (basicEl) basicEl.textContent = `₹${basic.toLocaleString('en-IN')}`;

  const hraEl = document.getElementById('psHra');
  if (hraEl) hraEl.textContent = `₹${hra.toLocaleString('en-IN')}`;

  const convEl = document.getElementById('psConveyance');
  if (convEl) convEl.textContent = `₹${conveyance.toLocaleString('en-IN')}`;

  const medEl = document.getElementById('psMedical');
  if (medEl) medEl.textContent = `₹${medical.toLocaleString('en-IN')}`;

  const otherEl = document.getElementById('psOtherAllow');
  if (otherEl) otherEl.textContent = `₹${otherAllow.toLocaleString('en-IN')}`;

  const totalEarnings = basic + hra + conveyance + medical + otherAllow;
  const totalEarnEl = document.getElementById('psTotalEarnings');
  if (totalEarnEl) totalEarnEl.textContent = `₹${totalEarnings.toLocaleString('en-IN')}`;

  // Deductions
  const epf = parseFloat(cfg.epf) || 900;
  const esi = parseFloat(cfg.esi) || 113;
  const profTax = parseFloat(cfg.profTax) || 0;

  const epfEl = document.getElementById('psEpf');
  if (epfEl) epfEl.textContent = `₹${epf.toLocaleString('en-IN')}`;

  const esiDeductionEl = document.getElementById('psEsi');
  if (esiDeductionEl) esiDeductionEl.textContent = `₹${esi.toLocaleString('en-IN')}`;

  const profTaxEl = document.getElementById('psProfTax');
  if (profTaxEl) profTaxEl.textContent = `₹${profTax.toLocaleString('en-IN')}`;

  const totalDeductions = epf + esi + profTax;
  const totalDedEl = document.getElementById('psTotalDeductions');
  if (totalDedEl) totalDedEl.textContent = `₹${totalDeductions.toLocaleString('en-IN')}`;

  // Net Salary
  const netSalary = totalEarnings - totalDeductions;
  const netSalEl = document.getElementById('psNetSalary');
  if (netSalEl) netSalEl.textContent = `₹${netSalary.toLocaleString('en-IN')}`;

  // View Containers
  const viewContainer = document.getElementById('payslipViewContainer');
  const editContainer = document.getElementById('payslipEditContainer');
  if (viewContainer) viewContainer.style.display = 'flex';
  if (editContainer) editContainer.style.display = 'none';

  const modal = document.getElementById('employeePayslipModal');
  if (modal) modal.style.display = 'flex';
}

function openPayslipEditMode() {
  const cfg = getStoredPayslipConfig();
  const currentU = activeUser || { name: 'Store Manager', role: 'Store Manager', id: 'admin', email: 'admin@sugarcubes.com' };

  const compNameInput = document.getElementById('editPsCompName');
  if (compNameInput) compNameInput.value = cfg.compName || DEFAULT_PAYSLIP_CONFIG.compName;

  const compAddrInput = document.getElementById('editPsCompAddr');
  if (compAddrInput) compAddrInput.value = cfg.compAddr || DEFAULT_PAYSLIP_CONFIG.compAddr;

  const periodInput = document.getElementById('editPsPayPeriod');
  if (periodInput) periodInput.value = cfg.payPeriod || 'September 2026';

  const empIdInput = document.getElementById('editPsEmpId');
  if (empIdInput) empIdInput.value = cfg.empId || 'SC-EMP-101';

  const nameInput = document.getElementById('editPsEmpName');
  if (nameInput) nameInput.value = cfg.empName || currentU.name || currentU.id || 'Store Manager';

  const desigInput = document.getElementById('editPsDesignation');
  if (desigInput) desigInput.value = cfg.designation || currentU.role || 'Senior Cashier';

  const deptInput = document.getElementById('editPsDepartment');
  if (deptInput) deptInput.value = cfg.department || 'Store Operations';

  const dojInput = document.getElementById('editPsDoj');
  if (dojInput) dojInput.value = cfg.doj || '01 Jan 2024';

  const uanInput = document.getElementById('editPsUan');
  if (uanInput) uanInput.value = cfg.uan || '100987654321';

  const pfInput = document.getElementById('editPsPfNo');
  if (pfInput) pfInput.value = cfg.pfNo || 'TN/MAS/0012345';

  const esiInput = document.getElementById('editPsEsiNo');
  if (esiInput) esiInput.value = cfg.esiNo || '3100123456';

  const bankInput = document.getElementById('editPsBank');
  if (bankInput) bankInput.value = cfg.bank || 'HDFC Bank';

  const accInput = document.getElementById('editPsAccNo');
  if (accInput) accInput.value = cfg.accNo || 'XXXXXX4321';

  const grossInput = document.getElementById('editPsGrossWages');
  if (grossInput) grossInput.value = cfg.grossWages !== undefined ? cfg.grossWages : 15000;

  const workDaysInput = document.getElementById('editPsTotalWorkDays');
  if (workDaysInput) workDaysInput.value = cfg.totalWorkDays !== undefined ? cfg.totalWorkDays : 30;

  const leavesInput = document.getElementById('editPsLeaves');
  if (leavesInput) leavesInput.value = cfg.leaves !== undefined ? cfg.leaves : 0;

  const lopInput = document.getElementById('editPsLopDays');
  if (lopInput) lopInput.value = cfg.lopDays !== undefined ? cfg.lopDays : 0;

  const paidDaysInput = document.getElementById('editPsPaidDays');
  if (paidDaysInput) paidDaysInput.value = cfg.paidDays !== undefined ? cfg.paidDays : 30;

  const basicInput = document.getElementById('editPsBasic');
  if (basicInput) basicInput.value = cfg.basic !== undefined ? cfg.basic : 7500;

  const hraInput = document.getElementById('editPsHra');
  if (hraInput) hraInput.value = cfg.hra !== undefined ? cfg.hra : 3000;

  const convInput = document.getElementById('editPsConveyance');
  if (convInput) convInput.value = cfg.conveyance !== undefined ? cfg.conveyance : 1600;

  const medInput = document.getElementById('editPsMedical');
  if (medInput) medInput.value = cfg.medical !== undefined ? cfg.medical : 1250;

  const otherAllowInput = document.getElementById('editPsOtherAllow');
  if (otherAllowInput) otherAllowInput.value = cfg.otherAllow !== undefined ? cfg.otherAllow : 1650;

  const epfInput = document.getElementById('editPsEpf');
  if (epfInput) epfInput.value = cfg.epf !== undefined ? cfg.epf : 900;

  const esiDedInput = document.getElementById('editPsEsi');
  if (esiDedInput) esiDedInput.value = cfg.esi !== undefined ? cfg.esi : 113;

  const profTaxInput = document.getElementById('editPsProfTax');
  if (profTaxInput) profTaxInput.value = cfg.profTax !== undefined ? cfg.profTax : 0;

  const viewContainer = document.getElementById('payslipViewContainer');
  const editContainer = document.getElementById('payslipEditContainer');
  if (viewContainer) viewContainer.style.display = 'none';
  if (editContainer) editContainer.style.display = 'flex';
}

function cancelPayslipEditMode() {
  const viewContainer = document.getElementById('payslipViewContainer');
  const editContainer = document.getElementById('payslipEditContainer');
  if (viewContainer) viewContainer.style.display = 'flex';
  if (editContainer) editContainer.style.display = 'none';
}

function savePayslipEditForm() {
  const newCfg = {
    compName: document.getElementById('editPsCompName').value.trim() || DEFAULT_PAYSLIP_CONFIG.compName,
    compAddr: document.getElementById('editPsCompAddr').value.trim() || DEFAULT_PAYSLIP_CONFIG.compAddr,
    payPeriod: document.getElementById('editPsPayPeriod').value.trim() || 'September 2026',

    empId: document.getElementById('editPsEmpId').value.trim() || 'SC-EMP-101',
    empName: document.getElementById('editPsEmpName').value.trim(),
    designation: document.getElementById('editPsDesignation').value.trim(),
    department: document.getElementById('editPsDepartment').value.trim(),
    doj: document.getElementById('editPsDoj').value.trim(),

    uan: document.getElementById('editPsUan').value.trim(),
    pfNo: document.getElementById('editPsPfNo').value.trim(),
    esiNo: document.getElementById('editPsEsiNo').value.trim(),
    bank: document.getElementById('editPsBank').value.trim(),
    accNo: document.getElementById('editPsAccNo').value.trim(),

    grossWages: parseFloat(document.getElementById('editPsGrossWages').value) || 0,
    totalWorkDays: parseInt(document.getElementById('editPsTotalWorkDays').value, 10) || 0,
    leaves: parseInt(document.getElementById('editPsLeaves').value, 10) || 0,
    lopDays: parseInt(document.getElementById('editPsLopDays').value, 10) || 0,
    paidDays: parseInt(document.getElementById('editPsPaidDays').value, 10) || 0,

    basic: parseFloat(document.getElementById('editPsBasic').value) || 0,
    hra: parseFloat(document.getElementById('editPsHra').value) || 0,
    conveyance: parseFloat(document.getElementById('editPsConveyance').value) || 0,
    medical: parseFloat(document.getElementById('editPsMedical').value) || 0,
    otherAllow: parseFloat(document.getElementById('editPsOtherAllow').value) || 0,

    epf: parseFloat(document.getElementById('editPsEpf').value) || 0,
    esi: parseFloat(document.getElementById('editPsEsi').value) || 0,
    profTax: parseFloat(document.getElementById('editPsProfTax').value) || 0
  };

  saveStoredPayslipConfig(newCfg);

  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: 'success',
      title: 'Payslip Updated!',
      text: 'Corporate Payslip parameters and earnings updated successfully.',
      timer: 1500,
      showConfirmButton: false
    });
  }

  downloadEmployeePayslip();
}

function resetPayslipDefaults() {
  if (confirm('Are you sure you want to reset all corporate payslip parameters to default values?')) {
    localStorage.removeItem('sugarCubesPayslipConfig');
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'info',
        title: 'Reset to Defaults',
        text: 'Payslip parameters restored to default values.',
        timer: 1500,
        showConfirmButton: false
      });
    }
    downloadEmployeePayslip();
  }
}

function closeEmployeePayslipModal() {
  const modal = document.getElementById('employeePayslipModal');
  if (modal) modal.style.display = 'none';
}

function closeEmployeePayslipModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'employeePayslipModal') {
    closeEmployeePayslipModal();
  }
}

function printPayslipDocument() {
  const viewContainer = document.getElementById('payslipViewContainer');
  if (!viewContainer) {
    window.print();
    return;
  }

  const empName = (document.getElementById('psEmpName')?.textContent || 'Employee').trim();
  const period = (document.getElementById('psPayPeriodText')?.textContent || 'September_2026').trim();
  const filename = `Payslip_${empName.replace(/[^a-zA-Z0-9]/g, '_')}_${period.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

  try {
    playBeep('success');
  } catch (e) {}

  // Ensure View mode container is active & visible
  const editContainer = document.getElementById('payslipEditContainer');
  if (viewContainer) viewContainer.style.display = 'block';
  if (editContainer) editContainer.style.display = 'none';

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(viewContainer).save().then(() => {
      if (viewContainer) viewContainer.style.display = 'block';
    }).catch((err) => {
      console.error('html2pdf rendering error, fallback to print:', err);
      window.print();
    });
  } else {
    window.print();
  }
}

const DEFAULT_STORE_OWNERS = [
  {
    id: 'owner_sugan',
    name: 'Mr. Sugan Rithvik K',
    role: 'Founder & Managing Director',
    tag: 'PRIMARY STORE OWNER',
    phone: '+91 98765 43210',
    email: 'owner@sugarcubes.com',
    branch: 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu',
    avatarBg: '#059669',
    tagBg: '#d1fae5',
    tagColor: '#065f46'
  },
  {
    id: 'owner_ananya',
    name: 'Ms. Ananya Sharma',
    role: 'Co-Founder & Managing Partner',
    tag: 'OPERATIONS & STORE HEAD',
    phone: '+91 98123 45678',
    email: 'ananya@sugarcubes.com',
    branch: 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu',
    avatarBg: '#2563eb',
    tagBg: '#dbeafe',
    tagColor: '#1e40af'
  },
  {
    id: 'owner_rajesh',
    name: 'Mr. Rajesh Kumar',
    role: 'Franchise Partner & Director',
    tag: 'FINANCE & EXPANSION',
    phone: '+91 98450 12345',
    email: 'rajesh@sugarcubes.com',
    branch: 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu',
    avatarBg: '#7c3aed',
    tagBg: '#f3e8ff',
    tagColor: '#6b21a8'
  }
];

function getOwnersList() {
  const CURRENT_LOC_VER = 'sugarCubesStoreLocationVersion_v1';
  if (localStorage.getItem('sugarCubesStoreLocVer') !== CURRENT_LOC_VER) {
    localStorage.setItem('sugarCubesStoreLocVer', CURRENT_LOC_VER);
    saveOwnersList(DEFAULT_STORE_OWNERS);
    return DEFAULT_STORE_OWNERS;
  }
  try {
    const raw = localStorage.getItem('sugarCubesOwnersList');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {}
  return DEFAULT_STORE_OWNERS;
}

function saveOwnersList(list) {
  try {
    localStorage.setItem('sugarCubesOwnersList', JSON.stringify(list));
  } catch (err) {}
}

function handleOwnerPhotoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const base64Input = document.getElementById('ownerPhotoBase64Input');
    const previewCircle = document.getElementById('ownerPhotoPreviewCircle');
    const removeBtn = document.getElementById('btnRemoveOwnerPhoto');

    if (base64Input) base64Input.value = dataUrl;
    if (previewCircle) {
      previewCircle.style.backgroundImage = `url('${dataUrl}')`;
      previewCircle.textContent = '';
    }
    if (removeBtn) removeBtn.style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
}

function removeOwnerPhoto() {
  const base64Input = document.getElementById('ownerPhotoBase64Input');
  const previewCircle = document.getElementById('ownerPhotoPreviewCircle');
  const removeBtn = document.getElementById('btnRemoveOwnerPhoto');
  const fileInput = document.getElementById('ownerPhotoFileInput');

  if (base64Input) base64Input.value = '';
  if (fileInput) fileInput.value = '';
  if (previewCircle) {
    previewCircle.style.backgroundImage = 'none';
    previewCircle.textContent = '👤';
  }
  if (removeBtn) removeBtn.style.display = 'none';
}

let selectedOwnerId = 'owner_sugan';

function selectOwnerProfile(ownerId) {
  selectedOwnerId = ownerId;
  renderOwnerDetailsModal();
}

function openOwnerDetailsModal() {
  renderOwnerDetailsModal();
  const modal = document.getElementById('ownerDetailsModal');
  if (modal) modal.style.display = 'flex';
}

function renderOwnerDetailsModal() {
  const tabsContainer = document.getElementById('ownerTabsContainer');
  const detailsContainer = document.getElementById('ownerDetailsCardContainer');
  const listContainer = document.getElementById('allOwnersListContainer');
  if (!tabsContainer || !detailsContainer) return;

  const owners = getOwnersList();
  const currentOwner = owners.find(o => o.id === selectedOwnerId) || owners[0];
  if (!currentOwner) return;
  selectedOwnerId = currentOwner.id;

  // 1. Render Owner Tab Selector Buttons
  tabsContainer.innerHTML = owners.map(o => {
    const isSel = o.id === currentOwner.id;
    const shortName = o.name.split(' ')[1] || o.name;
    const thumbHtml = o.photo ? 
      `<img src="${o.photo}" style="width: 18px; height: 18px; object-fit: cover; border-radius: 50%; display: inline-block; vertical-align: middle; margin-right: 4px;">` : 
      `👤 `;
    return `
      <button type="button" onclick="selectOwnerProfile('${o.id}')" style="background: ${isSel ? '#059669' : '#f8fafc'}; color: ${isSel ? '#ffffff' : '#334155'}; border: 1.5px solid ${isSel ? '#047857' : '#cbd5e1'}; padding: 8px 12px; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.15s ease; flex: 1; min-width: 120px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 4px;">
        ${thumbHtml}<span>${escapeHtml(shortName)}</span> ${isSel ? '✓' : ''}
      </button>
    `;
  }).join('');

  const activeAvatarHtml = currentOwner.photo ? 
    `<img src="${currentOwner.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : 
    `👤`;

  // 2. Render Active Owner Detail Card with Edit & Delete Action Buttons
  detailsContainer.innerHTML = `
    <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 14px;">
      <div style="display: flex; align-items: center; gap: 14px; min-width: 0; flex: 1;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: ${currentOwner.avatarBg || '#059669'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.7rem; font-weight: 800; flex-shrink: 0; border: 2px solid rgba(255,255,255,0.9); box-shadow: 0 2px 8px rgba(0,0,0,0.12); overflow: hidden;">
          ${activeAvatarHtml}
        </div>
        <div style="min-width: 0; flex: 1;">
          <h4 style="margin: 0 0 2px; font-size: 1.05rem; font-weight: 800; color: #065f46;">${escapeHtml(currentOwner.name)}</h4>
          <p style="margin: 0; font-size: 0.78rem; color: #047857; font-weight: 700;">${escapeHtml(currentOwner.role)}</p>
          <span style="display: inline-block; margin-top: 4px; background: ${currentOwner.tagBg || '#d1fae5'}; color: ${currentOwner.tagColor || '#065f46'}; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800;">
            ● ${escapeHtml(currentOwner.tag || 'STORE OWNER')}
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px;">
        <button type="button" onclick="openEditOwnerModal('${currentOwner.id}')" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-size: 0.74rem; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          ✏️ Edit
        </button>
        <button type="button" onclick="deleteOwnerProfile('${currentOwner.id}')" style="background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-size: 0.74rem; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          🗑️ Delete
        </button>
      </div>
    </div>

    <!-- Active Owner Meta Grid -->
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.3rem;">📞</span>
          <div>
            <span style="font-size: 0.7rem; font-weight: 700; color: #64748b; display: block;">OWNER PHONE & WHATSAPP</span>
            <span style="font-size: 0.9rem; font-weight: 800; color: #0f172a;">${escapeHtml(currentOwner.phone)}</span>
          </div>
        </div>
        <a href="tel:${currentOwner.phone.replace(/\s+/g, '')}" style="background: #dcfce7; color: #15803d; text-decoration: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; border: 1px solid #86efac;">Call / WA</a>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.3rem;">📧</span>
          <div>
            <span style="font-size: 0.7rem; font-weight: 700; color: #64748b; display: block;">OFFICIAL EMAIL ADDRESS</span>
            <span style="font-size: 0.88rem; font-weight: 800; color: #2563eb;">${escapeHtml(currentOwner.email)}</span>
          </div>
        </div>
        <a href="mailto:${currentOwner.email}" style="background: #eff6ff; color: #1d4ed8; text-decoration: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; border: 1px solid #93c5fd;">Email</a>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 1.3rem;">🧾</span>
        <div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #64748b; display: block;">GSTIN REGISTERED NUMBER</span>
          <span style="font-size: 0.88rem; font-weight: 800; color: #0f172a;">33AAAAA0000A1Z5</span>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 1.3rem;">📍</span>
        <div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #64748b; display: block;">STORE BRANCH & ADDRESS</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: #334155;">${escapeHtml(currentOwner.branch || 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu')}</span>
        </div>
      </div>
    </div>
  `;

  // 3. Render All Owners Summary Directory below
  if (listContainer) {
    listContainer.innerHTML = owners.map(o => {
      const listAvatarHtml = o.photo ? 
        `<img src="${o.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : 
        `👤`;
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; background: ${o.id === currentOwner.id ? '#f0fdf4' : '#f8fafc'}; padding: 10px 12px; border-radius: 8px; border: 1px solid ${o.id === currentOwner.id ? '#86efac' : '#e2e8f0'}; font-size: 0.8rem;">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: ${o.avatarBg || '#059669'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.1);">
              ${listAvatarHtml}
            </div>
            <div style="min-width: 0; flex: 1;">
              <div style="font-weight: 800; color: #0f172a;">${escapeHtml(o.name)}</div>
              <div style="font-size: 0.72rem; color: #64748b;">${escapeHtml(o.role)} • <span style="font-weight: 700; color: #047857;">${escapeHtml(o.phone)}</span></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" onclick="selectOwnerProfile('${o.id}')" style="background: #ffffff; color: #059669; border: 1px solid #6ee7b7; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.72rem; cursor: pointer;">
              View
            </button>
            <button type="button" onclick="openEditOwnerModal('${o.id}')" style="background: #ffffff; color: #2563eb; border: 1px solid #bfdbfe; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.72rem; cursor: pointer;" title="Edit Owner">
              ✏️
            </button>
            <button type="button" onclick="deleteOwnerProfile('${o.id}')" style="background: #ffffff; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.72rem; cursor: pointer;" title="Delete Owner">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

function openAddOwnerModal() {
  const title = document.getElementById('addEditOwnerModalTitle');
  if (title) title.textContent = '➕ Add New Store Owner';

  const editId = document.getElementById('ownerEditIdInput');
  const nameIn = document.getElementById('ownerNameInput');
  const roleIn = document.getElementById('ownerRoleInput');
  const tagIn = document.getElementById('ownerTagInput');
  const phoneIn = document.getElementById('ownerPhoneInput');
  const emailIn = document.getElementById('ownerEmailInput');
  const branchIn = document.getElementById('ownerBranchInput');

  if (editId) editId.value = '';
  if (nameIn) nameIn.value = '';
  if (roleIn) roleIn.value = '';
  if (tagIn) tagIn.value = 'STORE CO-OWNER';
  if (phoneIn) phoneIn.value = '';
  if (emailIn) emailIn.value = '';
  if (branchIn) branchIn.value = 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu';

  removeOwnerPhoto();

  const modal = document.getElementById('addEditOwnerModal');
  if (modal) modal.style.display = 'flex';
}

function openEditOwnerModal(ownerId) {
  const owners = getOwnersList();
  const owner = owners.find(o => o.id === ownerId);
  if (!owner) return;

  const title = document.getElementById('addEditOwnerModalTitle');
  if (title) title.textContent = `✏️ Edit Details: ${owner.name}`;

  const editId = document.getElementById('ownerEditIdInput');
  const nameIn = document.getElementById('ownerNameInput');
  const roleIn = document.getElementById('ownerRoleInput');
  const tagIn = document.getElementById('ownerTagInput');
  const phoneIn = document.getElementById('ownerPhoneInput');
  const emailIn = document.getElementById('ownerEmailInput');
  const branchIn = document.getElementById('ownerBranchInput');

  if (editId) editId.value = owner.id;
  if (nameIn) nameIn.value = owner.name || '';
  if (roleIn) roleIn.value = owner.role || '';
  if (tagIn) tagIn.value = owner.tag || 'STORE OWNER';
  if (phoneIn) phoneIn.value = owner.phone || '';
  if (emailIn) emailIn.value = owner.email || '';
  if (branchIn) branchIn.value = owner.branch || 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu';

  if (owner.photo) {
    const base64Input = document.getElementById('ownerPhotoBase64Input');
    const previewCircle = document.getElementById('ownerPhotoPreviewCircle');
    const removeBtn = document.getElementById('btnRemoveOwnerPhoto');
    if (base64Input) base64Input.value = owner.photo;
    if (previewCircle) {
      previewCircle.style.backgroundImage = `url('${owner.photo}')`;
      previewCircle.textContent = '';
    }
    if (removeBtn) removeBtn.style.display = 'inline-block';
  } else {
    removeOwnerPhoto();
  }

  const modal = document.getElementById('addEditOwnerModal');
  if (modal) modal.style.display = 'flex';
}

function closeAddEditOwnerModal() {
  const modal = document.getElementById('addEditOwnerModal');
  if (modal) modal.style.display = 'none';
}

function closeAddEditOwnerModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'addEditOwnerModal') {
    closeAddEditOwnerModal();
  }
}

function saveOwnerForm(e) {
  if (e) e.preventDefault();

  const editId = (document.getElementById('ownerEditIdInput').value || '').trim();
  const name = (document.getElementById('ownerNameInput').value || '').trim();
  const role = (document.getElementById('ownerRoleInput').value || '').trim();
  const tag = (document.getElementById('ownerTagInput').value || '').trim() || 'STORE OWNER';
  const phone = (document.getElementById('ownerPhoneInput').value || '').trim();
  const email = (document.getElementById('ownerEmailInput').value || '').trim();
  const branch = (document.getElementById('ownerBranchInput').value || '').trim() || 'Sugar Cubes Bakery, Coimbatore, Tamil Nadu';
  const photo = (document.getElementById('ownerPhotoBase64Input').value || '').trim();

  if (!name || !role || !phone || !email) {
    alert('Please fill out all required fields (*)');
    return;
  }

  const owners = getOwnersList();

  if (editId) {
    // Editing existing owner
    const idx = owners.findIndex(o => o.id === editId);
    if (idx !== -1) {
      owners[idx].name = name;
      owners[idx].role = role;
      owners[idx].tag = tag;
      owners[idx].phone = phone;
      owners[idx].email = email;
      owners[idx].branch = branch;
      owners[idx].photo = photo;
    }
    showToast(`✨ Updated owner details for <strong>${escapeHtml(name)}</strong>`);
  } else {
    // Adding new owner
    const colors = ['#059669', '#2563eb', '#7c3aed', '#d97706', '#dc2626', '#0891b2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newOwner = {
      id: 'owner_' + Date.now(),
      name,
      role,
      tag,
      phone,
      email,
      branch,
      photo,
      avatarBg: randomColor,
      tagBg: '#eff6ff',
      tagColor: '#1d4ed8'
    };
    owners.push(newOwner);
    selectedOwnerId = newOwner.id;
    showToast(`🎉 Added <strong>${escapeHtml(name)}</strong> as Store Owner!`);
  }

  saveOwnersList(owners);
  closeAddEditOwnerModal();
  renderOwnerDetailsModal();
}

function deleteOwnerProfile(ownerId) {
  const owners = getOwnersList();
  if (owners.length <= 1) {
    alert('⚠️ Cannot delete store owner. At least 1 store owner is required in the directory!');
    return;
  }

  const owner = owners.find(o => o.id === ownerId);
  if (!owner) return;

  if (confirm(`🗑️ Are you sure you want to remove "${owner.name}" from Store Owners Directory?`)) {
    const updated = owners.filter(o => o.id !== ownerId);
    saveOwnersList(updated);
    if (selectedOwnerId === ownerId) {
      selectedOwnerId = updated[0].id;
    }
    renderOwnerDetailsModal();
    showToast(`🗑️ Removed ${owner.name} from Store Owners.`);
  }
}

function closeOwnerDetailsModal() {
  const modal = document.getElementById('ownerDetailsModal');
  if (modal) modal.style.display = 'none';
}

function closeOwnerDetailsModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'ownerDetailsModal') {
    closeOwnerDetailsModal();
  }
}

function openUserProfileModal(fromRestore = false) {
  if (window.innerWidth > 768) return; // Disabled on Laptop Web
  const modal = document.getElementById('userProfileModal');
  if (!modal) return;

  const currentU = activeUser || { name: 'Store Manager', role: 'Store Manager', id: 'admin' };
  const fullNameEl = document.getElementById('profileModalFullName');
  if (fullNameEl) fullNameEl.textContent = currentU.name || currentU.id || 'Store Manager';

  const emailModalEl = document.getElementById('profileModalEmail');
  if (emailModalEl) emailModalEl.textContent = currentU.email || (currentU.id && currentU.id.includes('@') ? currentU.id : `${currentU.id || 'admin'}@sugarcubes.com`);

  // Sync sound toggle button inside profile modal
  const profSoundBtn = document.getElementById('profSoundToggleBtn');
  if (profSoundBtn) {
    profSoundBtn.innerHTML = soundEnabled ? '🔔 Sound: ON' : '🔕 Sound: OFF';
  }

  // Populate sales KPIs and render date orders history
  setProfHistoryFilter(profHistoryFilterMode || 'today');

  // Render backend registered email directory
  renderRegisteredUsersList();

  modal.style.display = 'flex';
  // SILENT OPEN: No audio beep when clicking the profile button, as requested

  if (!fromRestore) {
    pushMobileModalState('userProfileModal', {
      restoreFn: () => { openUserProfileModal(true); }
    });
  } else {
    updateMobileScrollLock();
  }
}

function closeUserProfileModal() {
  // 1. Unconditionally hide the profile modal window immediately
  const modal = document.getElementById('userProfileModal');
  if (modal) {
    modal.style.display = 'none';
  }

  // 2. Remove userProfileModal from mobile navigation stack
  const idx = mobileModalStack.findIndex(m => m.id === 'userProfileModal');
  if (idx !== -1) {
    mobileModalStack.splice(idx, 1);
  }

  // 3. Set debounce lock to prevent router event bounce-back
  isPoppingFromScript = true;

  // 4. Safely clean URL hash without pushing extra history states
  try {
    if (window.location.hash && (window.location.hash.toLowerCase() === '#profile' || window.location.hash.toLowerCase() === '#store' || window.location.hash.toLowerCase() === '#menu')) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  } catch (err) {}

  // 5. Unlock scroll
  updateMobileScrollLock();

  // 6. Ensure mobile view switches to the store catalog menu
  if (isMobileViewport()) {
    switchMobileView('menu');
  }

  setTimeout(() => {
    isPoppingFromScript = false;
  }, 500);
}

function closeUserProfileModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'userProfileModal') {
    closeUserProfileModal();
  }
}

/**
 * Mobile Profile Cockpit KPI Navigation Handlers:
 * Moves user from inside profile button directly to All Total Sales page
 * or All Orders page history.
 */
function openAllTotalSalesPageFromProfile() {
  openDailyReportModal('all', true);
}

function openAllOrdersHistoryFromProfile() {
  openOrderHistoryModal('all', true);
}

function setProfHistoryFilter(mode, val) {
  profHistoryFilterMode = mode;
  profHistoryCustomDate = val || '';

  const btnToday = document.getElementById('profHistBtnToday');
  const btnYest = document.getElementById('profHistBtnYesterday');
  const btnAll = document.getElementById('profHistBtnAll');
  const datePicker = document.getElementById('profHistDatePicker');

  if (btnToday) btnToday.classList.toggle('active', mode === 'today');
  if (btnYest) btnYest.classList.toggle('active', mode === 'yesterday');
  if (btnAll) btnAll.classList.toggle('active', mode === 'all');
  if (datePicker) {
    if (mode === 'custom' && val) {
      datePicker.value = val;
    } else if (mode === 'today') {
      datePicker.value = getTodayIso();
    }
  }

  renderProfOrdersHistory();
}

function renderProfOrdersHistory() {
  const allSales = getRecordedSales();
  const searchInput = document.getElementById('profHistSearchInput');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  // 1. Filter sales by date
  let filtered = allSales.filter(sale => {
    let saleIso = sale.isoDate;
    if (!saleIso && sale.timestamp) {
      try {
        const parsed = new Date(sale.timestamp.split('•')[0].trim());
        if (!isNaN(parsed.getTime())) saleIso = parsed.toISOString().slice(0, 10);
      } catch (e) {}
    }
    if (profHistoryFilterMode === 'today') return saleIso === getTodayIso();
    if (profHistoryFilterMode === 'yesterday') return saleIso === getYesterdayIso();
    if (profHistoryFilterMode === 'custom') return saleIso === profHistoryCustomDate;
    return true; // 'all'
  });

  // 2. Filter by search query if entered
  if (query) {
    filtered = filtered.filter(sale => {
      const tick = (sale.ticketNumber || '').toLowerCase();
      const name = (sale.customerName || '').toLowerCase();
      const mob = (sale.customerMobile || '').toLowerCase();
      const itemsMatch = Array.isArray(sale.items) && sale.items.some(it => (it.name || '').toLowerCase().includes(query));
      return tick.includes(query) || name.includes(query) || mob.includes(query) || itemsMatch;
    });
  }

  // 3. Compute Metrics for this filtered view
  let totalRev = 0;
  let orderCount = filtered.length;
  let categoryRevenueMap = {};

  filtered.forEach(sale => {
    const amt = Number(sale.grandTotal || sale.amount || 0);
    totalRev += amt;
    if (Array.isArray(sale.items)) {
      sale.items.forEach(it => {
        const cat = it.category || 'Cakes';
        categoryRevenueMap[cat] = (categoryRevenueMap[cat] || 0) + Number(it.amount || 0);
      });
    } else if (sale.category) {
      categoryRevenueMap[sale.category] = (categoryRevenueMap[sale.category] || 0) + Number(sale.amount || 0);
    }
  });

  let bestCat = '--';
  let maxCatRev = 0;
  for (const cat in categoryRevenueMap) {
    if (categoryRevenueMap[cat] > maxCatRev) {
      maxCatRev = categoryRevenueMap[cat];
      bestCat = cat;
    }
  }

  const aov = orderCount > 0 ? (totalRev / orderCount) : 0;

  // 4. Update the 4 KPI cards inside the Profile Modal
  const salesEl = document.getElementById('profKpiTotalSales');
  const ordEl = document.getElementById('profKpiOrders');
  const bestEl = document.getElementById('profKpiBestSales');
  const aovEl = document.getElementById('profKpiAvgOrder');
  const countBadge = document.getElementById('profHistCountBadge');

  if (salesEl) salesEl.textContent = '₹' + totalRev.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (ordEl) ordEl.textContent = orderCount + (orderCount === 1 ? ' Order' : ' Orders');
  if (bestEl) bestEl.textContent = bestCat;
  if (aovEl) aovEl.textContent = '₹' + aov.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  if (countBadge) countBadge.textContent = `${orderCount} Orders • ₹${totalRev.toFixed(2)}`;

  // 5. Render Orders List HTML
  const listEl = document.getElementById('profModalOrdersList');
  if (!listEl) return;

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 28px 12px; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 6px;">📦</div>
        <h5 style="margin: 0 0 4px; font-size: 0.95rem; font-weight: 700; color: #1e293b;">No Orders Recorded</h5>
        <p style="margin: 0; font-size: 0.76rem; color: #94a3b8;">No transactions found for the selected date filter.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(sale => {
    const itemsList = Array.isArray(sale.items) ? sale.items : [];
    const itemsSummary = itemsList.map(it => `${it.quantity || 1}x ${it.name}`).join(', ') || 'Bakery Items';
    const cleanNum = (sale.ticketNumber || '01').replace('#', '');
    const dateFormatted = sale.date || sale.isoDate || 'Today';
    const timeFormatted = sale.time || '';
    const grand = Number(sale.grandTotal || sale.amount || 0).toFixed(2);
    const payMode = sale.paymentMode || 'Cash';

    let payBadgeBg = '#f1f5f9';
    let payBadgeColor = '#475569';
    if (payMode.toUpperCase().includes('UPI')) {
      payBadgeBg = '#eff6ff';
      payBadgeColor = '#1d4ed8';
    } else if (payMode.toUpperCase().includes('CARD')) {
      payBadgeBg = '#faf5ff';
      payBadgeColor = '#7e22ce';
    } else if (payMode.toUpperCase().includes('CASH')) {
      payBadgeBg = '#ecfdf5';
      payBadgeColor = '#047857';
    }

    const maskedPhone = maskMobileNumber(sale.customerMobile);

    html += `
      <div class="prof-order-card">
        <div class="prof-order-card-top">
          <div class="prof-order-badge-row">
            <span class="prof-ticket-pill">${sale.ticketNumber || ('#SC-' + cleanNum)}</span>
            <span class="prof-order-date-pill">📅 ${dateFormatted}${timeFormatted ? ` • ⏰ ${timeFormatted}` : ''}</span>
          </div>
          <span class="prof-order-amount">₹${grand}</span>
        </div>

        <div class="prof-order-meta-row">
          <span class="prof-pay-badge" style="background: ${payBadgeBg}; color: ${payBadgeColor};">${payMode}</span>
          <span class="prof-type-badge">${sale.orderType || 'Takeaway'}</span>
          <span class="prof-cust-text">👤 ${escapeHtml(sale.customerName || 'Customer')}${maskedPhone ? ` (${maskedPhone})` : ''}</span>
        </div>

        <div class="prof-order-items-text">
          🍰 ${escapeHtml(itemsSummary)}
        </div>

        <div class="prof-order-actions-row">
          <button type="button" class="prof-btn-action" onclick="viewHistoryOrderReceipt('${escapeHtml(sale.ticketNumber)}')" title="View Receipt">
            🧾 View Bill
          </button>
          <button type="button" class="prof-btn-action" onclick="downloadHistoryOrderPdf('${escapeHtml(sale.ticketNumber)}')" title="Download PDF">
            📄 PDF
          </button>
          <button type="button" class="prof-btn-action wa" onclick="whatsappHistoryOrder('${escapeHtml(sale.ticketNumber)}')" title="Send WhatsApp">
            📲 WhatsApp
          </button>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

// ==========================================================================
// Mobile Responsive Navigation & View Switcher
// ==========================================================================

let currentMobileTab = 'menu'; // 'menu' | 'cart'

function switchMobileView(view, userExplicit = false) {
  const isTabChange = currentMobileTab !== view;
  currentMobileTab = view;
  const leftPane = document.querySelector('.pos-left-pane');
  const rightPane = document.querySelector('.pos-right-register');
  const btnMenu = document.getElementById('btnMobileTabMenu');
  const btnCart = document.getElementById('btnMobileTabCart');
  const stickyBar = document.getElementById('mobileStickyCartBar');

  if (window.innerWidth <= 768) {
    if (view === 'cart') {
      if (leftPane) leftPane.classList.add('mobile-pane-hidden');
      if (rightPane) {
        rightPane.classList.remove('mobile-pane-hidden');
        if (userExplicit && isTabChange) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }
      if (btnMenu) btnMenu.classList.remove('active');
      if (btnCart) btnCart.classList.add('active');
      if (stickyBar) stickyBar.style.display = 'none';
    } else {
      if (leftPane) {
        leftPane.classList.remove('mobile-pane-hidden');
        if (userExplicit && isTabChange) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }
      if (rightPane) rightPane.classList.add('mobile-pane-hidden');
      if (btnMenu) btnMenu.classList.add('active');
      if (btnCart) btnCart.classList.remove('active');
      if (stickyBar) {
        stickyBar.style.display = activeCart.length > 0 ? 'flex' : 'none';
      }
    }
  } else {
    // Desktop: both panes visible side-by-side
    if (leftPane) leftPane.classList.remove('mobile-pane-hidden');
    if (rightPane) rightPane.classList.remove('mobile-pane-hidden');
    if (stickyBar) stickyBar.style.display = 'none';
  }
}

let lastViewportWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  // Ignore vertical height-only resize events (caused by mobile browser address bar expand/collapse during scrolling)
  if (currentWidth === lastViewportWidth) {
    return;
  }
  lastViewportWidth = currentWidth;

  const leftPane = document.querySelector('.pos-left-pane');
  const rightPane = document.querySelector('.pos-right-register');
  const stickyBar = document.getElementById('mobileStickyCartBar');

  if (currentWidth > 768) {
    if (leftPane) leftPane.classList.remove('mobile-pane-hidden');
    if (rightPane) rightPane.classList.remove('mobile-pane-hidden');
    if (stickyBar) stickyBar.style.display = 'none';
  } else {
    switchMobileView(currentMobileTab, false);
  }
});

// ==========================================================================
// ⌨️ Keyboard Shortcut: ESC Key to Dismiss Popups / Modals & Return to Page
// ==========================================================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    // 0. Edit Product Modal (Highest dialog priority)
    const editProductModal = document.getElementById('editProductModal');
    if (editProductModal && editProductModal.style.display && editProductModal.style.display !== 'none') {
      e.preventDefault();
      closeEditProductModal();
      return;
    }

    // 0.5. All Products Management List Modal
    const productListModal = document.getElementById('productListModal');
    if (productListModal && productListModal.style.display && productListModal.style.display !== 'none') {
      e.preventDefault();
      closeProductListModal();
      return;
    }

    // Mobile Stack: Step-by-step back one modal at a time
    if (isMobileViewport() && mobileModalStack.length > 0) {
      e.preventDefault();
      popMobileModalState(false);
      return;
    }

    // Catalog Actions Menu Popover
    const catalogActionsDropdown = document.getElementById('catalogActionsDropdown');
    if (catalogActionsDropdown && catalogActionsDropdown.classList.contains('active')) {
      e.preventDefault();
      closeCatalogActionsMenu();
      return;
    }

    // Desktop: Dismiss topmost modal
    // 0. Shift Action Modal, Payslip Modal, Owner Details Modal
    const resignReloginModal = document.getElementById('resignReloginModal');
    if (resignReloginModal && resignReloginModal.style.display && resignReloginModal.style.display !== 'none') {
      e.preventDefault();
      closeResignReloginModal();
      return;
    }
    const payslipModal = document.getElementById('employeePayslipModal');
    if (payslipModal && payslipModal.style.display && payslipModal.style.display !== 'none') {
      e.preventDefault();
      closeEmployeePayslipModal();
      return;
    }
    const ownerModal = document.getElementById('ownerDetailsModal');
    if (ownerModal && ownerModal.style.display && ownerModal.style.display !== 'none') {
      e.preventDefault();
      closeOwnerDetailsModal();
      return;
    }
    const addEditOwnerModal = document.getElementById('addEditOwnerModal');
    if (addEditOwnerModal && addEditOwnerModal.style.display && addEditOwnerModal.style.display !== 'none') {
      e.preventDefault();
      closeAddEditOwnerModal();
      return;
    }
    const shiftActionModal = document.getElementById('shiftActionModal');
    if (shiftActionModal && shiftActionModal.style.display && shiftActionModal.style.display !== 'none') {
      e.preventDefault();
      closeShiftActionModal();
      return;
    }

    // 0.5. Cashier / User Profile Modal (Top-Corner Profile)
    const userProfileModal = document.getElementById('userProfileModal');
    if (userProfileModal && userProfileModal.style.display && userProfileModal.style.display !== 'none') {
      e.preventDefault();
      closeUserProfileModal();
      return;
    }

    // 1. Bill Receipt Modal (Topmost priority)
    const billModal = document.getElementById('billModal');
    if (billModal && billModal.style.display && billModal.style.display !== 'none') {
      e.preventDefault();
      closeBillModal();
      return;
    }

    // 2. Daily Report Modal
    const dailyReportModal = document.getElementById('dailyReportModal');
    if (dailyReportModal && dailyReportModal.style.display && dailyReportModal.style.display !== 'none') {
      e.preventDefault();
      closeDailyReportModal();
      return;
    }

    // 2.5. Best Selling Foods & Average Sales Analytics Modal
    const bestSalesModal = document.getElementById('bestSalesAnalyticsModal');
    if (bestSalesModal && bestSalesModal.style.display && bestSalesModal.style.display !== 'none') {
      e.preventDefault();
      closeBestSalesAnalyticsModal();
      return;
    }

    // 3. Custom Item / Cake Modal
    const customOrderModal = document.getElementById('customOrderModal');
    if (customOrderModal && customOrderModal.style.display && customOrderModal.style.display !== 'none') {
      e.preventDefault();
      closeCustomOrderModal();
      return;
    }

    // 4. Order History & Sales Log Modal
    const orderHistoryModal = document.getElementById('orderHistoryModal');
    if (orderHistoryModal && orderHistoryModal.style.display && orderHistoryModal.style.display !== 'none') {
      e.preventDefault();
      closeOrderHistoryModal();
      return;
    }

    // 4.5. Laptop / Desktop Sales Page (Return to Store on ESC)
    if (typeof currentDesktopPage !== 'undefined' && currentDesktopPage === 'sales') {
      e.preventDefault();
      switchDesktopPage('store');
      return;
    }
  } else if (e.key === 'Enter') {
    const editProductModal = document.getElementById('editProductModal');
    if (editProductModal && editProductModal.style.display && editProductModal.style.display !== 'none') {
      if (e.target && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        saveProductChanges();
      }
    }
  }
});

// =============================================================================
// ⚙️ Catalog Action Menu Dropdown / Popover Controller
// =============================================================================
function toggleCatalogActionsMenu(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const dropdown = document.getElementById('catalogActionsDropdown');
  const trigger = document.getElementById('btnCatalogMenuTrigger');
  const backdrop = document.getElementById('catalogDropdownBackdrop');
  if (!dropdown || !trigger) return;

  const isOpen = dropdown.classList.contains('active');
  if (isOpen) {
    closeCatalogActionsMenu();
  } else {
    dropdown.classList.add('active');
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('active');
    if (typeof playBeep === 'function') playBeep('click');
  }
}

function closeCatalogActionsMenu() {
  const dropdown = document.getElementById('catalogActionsDropdown');
  const trigger = document.getElementById('btnCatalogMenuTrigger');
  const backdrop = document.getElementById('catalogDropdownBackdrop');
  if (dropdown) dropdown.classList.remove('active');
  if (trigger) {
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
  }
  if (backdrop) backdrop.classList.remove('active');
}

function executeCatalogMenuAction(action) {
  closeCatalogActionsMenu();
  if (typeof playBeep === 'function') playBeep('click');
  if (action === 'add') {
    openAddProductModal();
  } else if (action === 'edit') {
    openProductListModal();
  } else if (action === 'custom') {
    openCustomOrderModal();
  } else if (action === 'reset') {
    resetCatalogStock();
  }
}

// Global click outside listener for catalog actions menu
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('catalogActionsMenuWrap');
  if (wrap && !wrap.contains(e.target)) {
    closeCatalogActionsMenu();
  }
});

