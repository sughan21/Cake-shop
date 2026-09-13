-- ==============================================================================
-- 🍰 SUGAR CUBES BAKERY & CAFÉ - COMPLETE ALL-IN-ONE SEED SCRIPT
-- Copy and paste this entire script into Supabase Dashboard -> SQL Editor and click RUN
-- ==============================================================================

-- 1. Ensure unique constraint on ticket_number for safe upserting
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'orders_ticket_number_key'
    ) THEN
        ALTER TABLE public.orders ADD CONSTRAINT orders_ticket_number_key UNIQUE (ticket_number);
    END IF;

    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.catalog_items;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.registered_users;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_sales_audits;
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- 2. Seed / Upsert Registered Staff & Cashier User Accounts (public.registered_users)
INSERT INTO public.registered_users (id, email, name, role)
VALUES 
    ('admin', 'admin@sugarcubes.com', 'Store Manager', 'Store Manager'),
    ('cashier', 'cashier@sugarcubes.com', 'Front Cashier', 'Cashier')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, email = EXCLUDED.email, role = EXCLUDED.role;

-- 3. Seed / Upsert Official Product Catalog Items (public.catalog_items - 19 Items)
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
    ('prod_11_egglessbro', 'Eggless Brownie', 'Sugar Cubes Classics', 80.00, 20, 'piece'),
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

-- 4. Seed / Upsert Realistic Orders (public.orders)
INSERT INTO public.orders (
    ticket_number,
    created_at,
    customer_name,
    customer_phone,
    order_type,
    payment_method,
    items,
    subtotal,
    gst_amount,
    discount_amount,
    grand_total,
    cashier_name,
    status
) VALUES 
(
    '#SC-001',
    NOW() - INTERVAL '3 hours 15 minutes',
    'Ananya Sharma',
    '9876543210',
    'Takeaway',
    'UPI',
    '[
        {"id": "prod_1_tresleches", "name": "Tres Leches", "category": "Cakes & More", "quantity": 2, "unitPrice": 160, "amount": 320},
        {"id": "prod_2_tiramisu", "name": "Tiramisu", "category": "Cakes & More", "quantity": 1, "unitPrice": 180, "amount": 180}
    ]'::jsonb,
    500.00,
    0.00,
    0.00,
    500.00,
    'Store Manager',
    'Completed'
),
(
    '#SC-002',
    NOW() - INTERVAL '2 hours 10 minutes',
    'Rahul Verma',
    '9845012345',
    'Dine-In',
    'Cash',
    '[
        {"id": "prod_9_classicbro", "name": "Classic Brownie", "category": "Sugar Cubes Classics", "quantity": 2, "unitPrice": 70, "amount": 140},
        {"id": "prod_19_hotchocolawc", "name": "Hot Chocolate with Cookies", "category": "Sugar Cubes Classics", "quantity": 2, "unitPrice": 80, "amount": 160}
    ]'::jsonb,
    300.00,
    0.00,
    0.00,
    300.00,
    'Front Cashier',
    'Completed'
),
(
    '#SC-003',
    NOW() - INTERVAL '1 hour 45 minutes',
    'Priya Sundaram',
    '9789012345',
    'Takeaway',
    'Card',
    '[
        {"id": "prod_3_matildacak", "name": "Matilda Cake", "category": "Cakes & More", "quantity": 1, "unitPrice": 170, "amount": 170},
        {"id": "prod_10_chocochipb", "name": "Chocochip Brownie", "category": "Sugar Cubes Classics", "quantity": 2, "unitPrice": 80, "amount": 160}
    ]'::jsonb,
    330.00,
    0.00,
    0.00,
    330.00,
    'Store Manager',
    'Completed'
),
(
    '#SC-004',
    NOW() - INTERVAL '55 minutes',
    'Karthik Raja',
    '9944123456',
    'Dine-In',
    'UPI',
    '[
        {"id": "prod_8_tripledeli", "name": "Triple Delight Platter", "category": "Cakes & More", "quantity": 1, "unitPrice": 300, "amount": 300},
        {"id": "prod_16_hotchocola", "name": "Hot Chocolate Brownie", "category": "Sugar Cubes Classics", "quantity": 1, "unitPrice": 150, "amount": 150}
    ]'::jsonb,
    450.00,
    0.00,
    0.00,
    450.00,
    'Front Cashier',
    'Completed'
),
(
    '#SC-005',
    NOW() - INTERVAL '20 minutes',
    'Deepa Krishnan',
    '9894056789',
    'Takeaway',
    'Cash',
    '[
        {"id": "prod_13_triplechocbc", "name": "Triple Choco Brownie Cubes", "category": "Sugar Cubes Classics", "quantity": 1, "unitPrice": 150, "amount": 150},
        {"id": "prod_15_tripletrea", "name": "Triple Treat Choco-Berry Delight", "category": "Sugar Cubes Classics", "quantity": 2, "unitPrice": 150, "amount": 300}
    ]'::jsonb,
    450.00,
    0.00,
    0.00,
    450.00,
    'Store Manager',
    'Completed'
)
ON CONFLICT (ticket_number) DO UPDATE 
SET 
    created_at = EXCLUDED.created_at,
    customer_name = EXCLUDED.customer_name,
    customer_phone = EXCLUDED.customer_phone,
    order_type = EXCLUDED.order_type,
    payment_method = EXCLUDED.payment_method,
    items = EXCLUDED.items,
    subtotal = EXCLUDED.subtotal,
    gst_amount = EXCLUDED.gst_amount,
    discount_amount = EXCLUDED.discount_amount,
    grand_total = EXCLUDED.grand_total,
    cashier_name = EXCLUDED.cashier_name,
    status = EXCLUDED.status;

-- 5. Seed / Upsert Daily Sales Audit Log (public.daily_sales_audits)
INSERT INTO public.daily_sales_audits (audit_date, total_revenue, total_orders, cash_collected, upi_collected, card_collected)
VALUES (CURRENT_DATE, 2030.00, 5, 750.00, 950.00, 330.00)
ON CONFLICT (audit_date) DO UPDATE
SET total_revenue = EXCLUDED.total_revenue,
    total_orders = EXCLUDED.total_orders,
    cash_collected = EXCLUDED.cash_collected,
    upi_collected = EXCLUDED.upi_collected,
    card_collected = EXCLUDED.card_collected;

-- 6. Confirmation Summary Output
SELECT 'Registered Users Count' AS entity, COUNT(*)::text AS count FROM public.registered_users
UNION ALL
SELECT 'Catalog Items Count' AS entity, COUNT(*)::text AS count FROM public.catalog_items
UNION ALL
SELECT 'Orders Count' AS entity, COUNT(*)::text AS count FROM public.orders
UNION ALL
SELECT 'Daily Audits Count' AS entity, COUNT(*)::text AS count FROM public.daily_sales_audits;
