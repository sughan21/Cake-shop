-- ==============================================================================
-- 🍰 SUGAR CUBES BAKERY & CAFÉ - SUPABASE DATABASE SETUP SCHEMA
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ==============================================================================

-- 0. Create Stores Table (Multi-Store Support)
CREATE TABLE IF NOT EXISTS public.stores (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    pin TEXT NOT NULL DEFAULT '1234',
    address TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1. Create Orders Table (Clean starting state - 0 orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT DEFAULT 'STORE01',
    ticket_number TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    customer_name TEXT,
    customer_phone TEXT,
    order_type TEXT DEFAULT 'Takeaway',
    payment_method TEXT DEFAULT 'Cash',
    items JSONB NOT NULL,
    subtotal NUMERIC(10,2) DEFAULT 0.00,
    gst_amount NUMERIC(10,2) DEFAULT 0.00,
    discount_amount NUMERIC(10,2) DEFAULT 0.00,
    grand_total NUMERIC(10,2) NOT NULL,
    cashier_name TEXT,
    status TEXT DEFAULT 'Completed'
);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'STORE01';

-- 2. Create Product Catalog Items Table
CREATE TABLE IF NOT EXISTS public.catalog_items (
    id TEXT PRIMARY KEY,
    store_id TEXT DEFAULT 'ALL',
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 100,
    unit TEXT DEFAULT 'slice',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.catalog_items ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'ALL';

-- 3. Create Registered Users / Staff Accounts Table
CREATE TABLE IF NOT EXISTS public.registered_users (
    id TEXT PRIMARY KEY,
    store_id TEXT DEFAULT 'STORE01',
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Cashier',
    password TEXT DEFAULT '1234',
    created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.registered_users ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'STORE01';
ALTER TABLE public.registered_users ADD COLUMN IF NOT EXISTS password TEXT DEFAULT '1234';

-- 4. Create Daily Sales Audit Table
CREATE TABLE IF NOT EXISTS public.daily_sales_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT DEFAULT 'STORE01',
    audit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_revenue NUMERIC(10,2) DEFAULT 0.00,
    total_orders INT DEFAULT 0,
    cash_collected NUMERIC(10,2) DEFAULT 0.00,
    upi_collected NUMERIC(10,2) DEFAULT 0.00,
    card_collected NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.daily_sales_audits ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'STORE01';

-- ==============================================================================
-- 🔓 ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registered_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_sales_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Enable Supabase Realtime Live Streaming for all tables
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.catalog_items;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.registered_users;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_sales_audits;
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Drop existing policies if present and create fresh RLS policies
DROP POLICY IF EXISTS "Allow public read and write access on orders" ON public.orders;
CREATE POLICY "Allow public read and write access on orders" 
    ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write access on catalog_items" ON public.catalog_items;
CREATE POLICY "Allow public read and write access on catalog_items" 
    ON public.catalog_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write access on registered_users" ON public.registered_users;
CREATE POLICY "Allow public read and write access on registered_users" 
    ON public.registered_users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write access on daily_sales_audits" ON public.daily_sales_audits;
CREATE POLICY "Allow public read and write access on daily_sales_audits" 
    ON public.daily_sales_audits FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write access on stores" ON public.stores;
CREATE POLICY "Allow public read and write access on stores" 
    ON public.stores FOR ALL USING (true) WITH CHECK (true);

-- Insert Seed Stores & Master Accounts
INSERT INTO public.stores (id, name, code, pin, address, phone)
VALUES 
    ('STORE01', 'Sugar Cubes - Main Branch', 'STORE01', '1234', '12 Baker Street, City Center', '+91 9876543210'),
    ('STORE02', 'Sugar Cubes - Express Mall', 'STORE02', '5678', 'Food Court, Grand Mall', '+91 9876543211'),
    ('STORE03', 'Sugar Cubes - Airport Kiosk', 'STORE03', '9012', 'Terminal 2, International Airport', '+91 9876543212'),
    ('OWNER', 'Master Business Owner', 'OWNER', '0000', 'Corporate Head Office', '+91 9000000000')
ON CONFLICT (id) DO UPDATE SET pin = EXCLUDED.pin, name = EXCLUDED.name;

-- Populate Real Sugar Cubes Bakery Product Catalog (19 Items)
INSERT INTO public.catalog_items (id, name, category, price, stock, unit)
VALUES
    ('prod_1_tresleches', 'Tres Leches', 'Cakes & More', 160.00, 15, 'slice'),
    ('prod_2_tiramisu', 'Tiramisu', 'Cakes & More', 180.00, 12, 'slice'),
    ('prod_3_matildacak', 'Matilda Cake', 'Cakes & More', 170.00, 15, 'slice'),
    ('prod_4_cheesecake', 'Cheese Cake', 'Cakes & More', 160.00, 10, 'slice'),
    ('prod_5_triplechoc', 'Triple Chocolate Cake', 'Cakes & More', 150.00, 12, 'slice'),
    ('prod_6_scoopcooki', 'Scoop Cookie', 'Cakes & More', 150.00, 20, 'piece'),
    ('prod_7_puddlecake', 'Puddle Cake', 'Cakes & More', 150.00, 15, 'slice'),
    ('prod_8_tripledeli', 'Triple Delight Platter', 'Cakes & More', 300.00, 8, 'platter'),
    ('prod_9_classicbro', 'Classic Brownie', 'Sugar Cubes Classics', 70.00, 25, 'piece'),
    ('prod_10_chocochipb', 'Chocochip Brownie', 'Sugar Cubes Classics', 80.00, 25, 'piece'),
    ('prod_11_egglessbro', 'Eggless Brownie', 'Sugar Cubes Classics', 20.00, 20, 'piece'),
    ('prod_12_triplechocb', 'Triple Chocolate Brownie', 'Sugar Cubes Classics', 100.00, 20, 'piece'),
    ('prod_13_triplechocbc', 'Triple Choco Brownie Cubes', 'Sugar Cubes Classics', 150.00, 18, 'box'),
    ('prod_14_triplechocs', 'Triple Chocolate Strawberry', 'Sugar Cubes Classics', 140.00, 15, 'piece'),
    ('prod_15_tripletrea', 'Triple Treat Choco-Berry Delight', 'Sugar Cubes Classics', 150.00, 15, 'piece'),
    ('prod_16_hotchocola', 'Hot Chocolate Brownie', 'Sugar Cubes Classics', 150.00, 15, 'piece'),
    ('prod_17_triplechocban', 'Triple Chocolate Banana', 'Sugar Cubes Classics', 70.00, 20, 'piece'),
    ('prod_18_triplechocm', 'Triple Chocolate Marshmello', 'Sugar Cubes Classics', 70.00, 20, 'piece'),
    ('prod_19_hotchocolawc', 'Hot Chocolate with Cookies', 'Sugar Cubes Classics', 80.00, 25, 'cup')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, category = EXCLUDED.category, price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Confirmation Output
SELECT 'Sugar Cubes Supabase Schema Setup Completed Successfully! (0 Orders - Clean Slate)' AS status;
