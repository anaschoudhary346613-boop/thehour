-- THE HOUR: FINAL SUPABASE DATABASE SETUP
-- RUN THIS IN YOUR SUPABASE SQL EDITOR TO SYNC YOUR DATABASE

-- 1. WATCHES TABLE (THE VAULT)
CREATE TABLE IF NOT EXISTS public.watches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    price DECIMAL NOT NULL,
    category TEXT,
    stock INTEGER DEFAULT 1,
    hero_image_url TEXT,
    lifestyle_image_url TEXT,
    specs JSONB DEFAULT '[]'::jsonb
);

-- 2. TRANSACTIONS TABLE (ACQUISITIONS)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT,
    customer_email TEXT,
    total_amount DECIMAL NOT NULL,
    status TEXT DEFAULT 'Awaiting Payment' NOT NULL,
    payment_method TEXT,
    shipping_address TEXT,
    items JSONB DEFAULT '[]'::jsonb
);

-- 3. CONCIERGE TABLE (INQUIRIES)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT, -- Added for concierge flow
    type TEXT, -- e.g. 'Private Sourcing', 'Authentication'
    details TEXT,
    status TEXT DEFAULT 'Pending'
);

-- 4. ENABLE RLS (Row Level Security)
ALTER TABLE public.watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. CREATE PUBLIC POLICIES (For Demo/Initial Setup)
-- IMPORTANT: In a production environment, you should restrict write access to authenticated users.
CREATE POLICY "Public Read Access" ON public.watches FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.inquiries FOR SELECT USING (true);

-- Allow full access for now to allow the Admin Dashboard to work without complex Auth setup
-- In Production, replace 'true' with 'auth.role() = 'authenticated''
CREATE POLICY "Admin Full Access" ON public.watches FOR ALL USING (true);
CREATE POLICY "Admin Full Access" ON public.orders FOR ALL USING (true);
CREATE POLICY "Admin Full Access" ON public.inquiries FOR ALL USING (true);

-- 6. STORAGE BUCKET INSTRUCTIONS
-- PLEASE MANUALLY CREATE A BUCKET NAMED 'watch-assets' IN THE SUPABASE STORAGE DASHBOARD
-- AND SET IT TO 'PUBLIC'.
