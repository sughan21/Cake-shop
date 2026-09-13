-- ==============================================================================
-- 🍰 SUGAR CUBES BAKERY & CAFÉ - SEED & UPDATE ORDERS (UPSERT)
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ==============================================================================

-- 1. Ensure unique constraint on ticket_number for safe upserting (Insert or Update)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'orders_ticket_number_key'
    ) THEN
        ALTER TABLE public.orders ADD CONSTRAINT orders_ticket_number_key UNIQUE (ticket_number);
    END IF;
END $$;

-- 2. Insert or Update (UPSERT) Realistic Orders into public.orders
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

-- 3. Confirm Seeded Orders in Supabase
SELECT 
    ticket_number,
    customer_name,
    order_type,
    payment_method,
    grand_total,
    status,
    created_at
FROM public.orders
ORDER BY created_at DESC;
