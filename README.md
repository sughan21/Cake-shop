# 🍰 Sugar Cubes - Artisanal Cake Shop POS & Daily Sales Tracker

A modern, responsive, high-performance Point-of-Sale (POS) and daily sales tracking web application built for **Sugar Cubes Bakery**.

## 📁 Project Architecture

The project is cleanly separated into `frontend` and `backend` folders:

```
shop-tracker/
├── frontend/                     # Client-Side Application
│   ├── index.html                # Main POS UI & Cashier Register
│   ├── style.css                 # Responsive styles & design system
│   ├── script.js                 # Cart management, offline logic & Supabase client
│   └── standalone.html           # Self-contained offline single-file edition
│
├── backend/                      # Server Scripts & Database Schemas
│   ├── start_wifi_server.ps1     # Native PowerShell HTTP server (Wi-Fi sharing)
│   ├── Start_Mobile_Sharing.bat  # Launcher script in backend folder
│   ├── server.js                 # Zero-dependency Node.js HTTP server
│   ├── package.json              # Node.js configuration
│   ├── supabase_setup.sql        # Supabase SQL database schema & RLS rules
│   ├── .env                      # Local environment configuration & API keys
│   └── .env.example              # Safe environment variable template
│
├── Start_Mobile_Sharing.bat      # Root 1-click launcher for mobile Wi-Fi server
├── .gitignore                    # Git ignore file (excludes secrets)
└── README.md                     # Project documentation
```

---

## ✨ Features
- 🛍️ **Dual-Column Commercial POS**: High-speed touch product catalog & live billing register.
- 📱 **100% Mobile Optimized**: Single-column responsive layout, floating cart bar, and 36px touch steppers.
- 📲 **1-Click WhatsApp PDF Dispatch**: Direct billing to customer WhatsApp with official PDF generation.
- 🧾 **Thermal Receipt & A4 Tax Invoice**: Print 80mm thermal receipts or download official A4 PDF invoices.
- 🔒 **Customer Privacy**: Last 6 digits masked on printed bills (+91 9876XXXXXX).
- 📊 **Real-time KPI Analytics**: Live sales dashboard, order history log, and CSV exports.
- 💾 **100% Offline-First & Cloud Sync**: Local storage persistence with optional Supabase cloud syncing.

---

## 🚀 How to Run

### 1. Direct In-Browser (Fastest)
Simply double-click:
- `frontend/index.html` (Full Web POS)
- `frontend/standalone.html` (All-in-one Single File)

### 2. Mobile Wi-Fi Sharing (PowerShell Native - No Node Required)
- Double-click **`Start_Mobile_Sharing.bat`** in the project root.
- The console will display your local IP address (e.g. `http://192.168.1.X:8080/index.html`).
- Open this address on any phone or tablet connected to the same Wi-Fi.

### 3. Node.js Server (Optional)
If you have Node.js installed:
```bash
cd backend
node server.js
```

---

## 🗄️ Database Setup (Supabase)
To enable cloud sync:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and run the script in `backend/supabase_setup.sql`.
3. Copy your project URL and publishable key into `backend/.env` or configure them directly via the UI Settings modal.
