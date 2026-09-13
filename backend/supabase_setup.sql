-- ==============================================================================
-- 🍰 SUGAR CUBES BAKERY & CAFÉ - SUPABASE DATABASE SETUP SCHEMA
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ==============================================================================

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 2. Create Product Catalog Items Table
CREATE TABLE IF NOT EXISTS public.catalog_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 100,
    unit TEXT DEFAULT 'slice',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Registered Users / Staff Accounts Table
CREATE TABLE IF NOT EXISTS public.registered_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Cashier',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Daily Sales Audit Table
CREATE TABLE IF NOT EXISTS public.daily_sales_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
    total_revenue NUMERIC(10,2) DEFAULT 0.00,
    total_orders INT DEFAULT 0,
    cash_collected NUMERIC(10,2) DEFAULT 0.00,
    upi_collected NUMERIC(10,2) DEFAULT 0.00,
    card_collected NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 🔓 ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registered_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_sales_audits ENABLE ROW LEVEL SECURITY;

-- Allow Public (Anon Key) & Authenticated users FULL READ/WRITE ACCESS
CREATE POLICY "Allow public read and write access on orders" 
    ON public.orders FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read and write access on catalog_items" 
    ON public.catalog_items FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read and write access on registered_users" 
    ON public.registered_users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read and write access on daily_sales_audits" 
    ON public.daily_sales_audits FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Staff Users into registered_users if not exists
INSERT INTO public.registered_users (id, email, name, role)
VALUES 
    ('admin', 'admin@sugarcubes.com', 'Store Manager', 'Store Manager'),
    ('cashier', 'cashier@sugarcubes.com', 'Front Cashier', 'Cashier')
ON CONFLICT (id) DO NOTHING;

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

-- Populate Initial Seed Orders into public.orders
INSERT INTO public.orders (
    ticket_number, created_at, customer_name, customer_phone, order_type, payment_method, items, subtotal, gst_amount, discount_amount, grand_total, cashier_name, status
) VALUES 
(
    '#SC-001', NOW() - INTERVAL '3 hours', 'Ananya Sharma', '9876543210', 'Takeaway', 'UPI',
    '[{"id": "c1", "name": "Belgian Chocolate Truffle Cake (1 Kg)", "category": "Cakes", "quantity": 1, "unitPrice": 750, "amount": 750}, {"id": "p1", "name": "Red Velvet Cream Cheese Pastry", "category": "Pastries", "quantity": 2, "unitPrice": 120, "amount": 240}]'::jsonb,
    990.00, 0.00, 0.00, 990.00, 'Store Manager', 'Completed'
),
(
    '#SC-002', NOW() - INTERVAL '2 hours', 'Rahul Verma', '9845012345', 'Dine-In', 'Cash',
    '[{"id": "p2", "name": "Blueberry Glazed Cheesecake", "category": "Pastries", "quantity": 2, "unitPrice": 140, "amount": 280}, {"id": "b1", "name": "Iced Caramel Macchiato", "category": "Beverages", "quantity": 2, "unitPrice": 90, "amount": 180}]'::jsonb,
    460.00, 0.00, 0.00, 460.00, 'Front Cashier', 'Completed'
),
(
    '#SC-003', NOW() - INTERVAL '1 hour', 'Priya Sundaram', '9789012345', 'Takeaway', 'Card',
    '[{"id": "c2", "name": "Classic Black Forest Gateau (500g)", "category": "Cakes", "quantity": 1, "unitPrice": 450, "amount": 450}, {"id": "p3", "name": "Butter Croissant", "category": "Pastries", "quantity": 2, "unitPrice": 85, "amount": 170}]'::jsonb,
    620.00, 0.00, 0.00, 620.00, 'Store Manager', 'Completed'
);

-- Confirmation Output
SELECT 'Sugar Cubes Supabase Schema & Sample Data Setup Completed Successfully!' AS status;
