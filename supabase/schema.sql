-- ─────────────────────────────────────────────
-- THE ELITE — Supabase Database Schema
-- Final Optimized Snapshot: 2026-04-08
-- ─────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles ────────────────────────────────
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ─── Watches (Primary Inventory) ─────────────
CREATE TABLE public.watches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  name text NOT NULL,
  brand text NOT NULL,
  subtitle text,
  description text,
  price numeric NOT NULL,
  original_price numeric,
  hero_image_url text NOT NULL,
  lifestyle_image_url text,
  specs jsonb DEFAULT '[]'::jsonb,
  category text DEFAULT 'Luxury'::text,
  stock integer DEFAULT 1,
  is_featured boolean DEFAULT false,
  serial_number text UNIQUE,
  gender text DEFAULT 'Unisex'::text
);

ALTER TABLE public.watches ENABLE ROW LEVEL SECURITY;

-- ─── Orders ──────────────────────────────────
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending'::text,
  shipping_address text,
  shipping_city text,
  shipping_phone text,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ─── Order items ──────────────────────────────
CREATE TABLE public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.watches(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price_at_purchase numeric NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ─── Addresses ───────────────────────────────
CREATE TABLE public.addresses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  label text DEFAULT 'Home'::text,
  full_name text,
  address_line1 text,
  city text,
  country text,
  zip text,
  phone text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- ─── Inquiries ───────────────────────────────
CREATE TABLE public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  type text NOT NULL,
  details text NOT NULL,
  status text DEFAULT 'Pending'::text
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ─── Performance Indices ──────────────────────
CREATE INDEX idx_addresses_customer_id ON public.addresses(customer_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- ─── Profiles RLS ─────────────────────────────
CREATE POLICY "Users Read Own Profile" ON public.profiles FOR SELECT TO public USING (id = (SELECT auth.uid()));
CREATE POLICY "Users Update Own Profile" ON public.profiles FOR UPDATE TO public USING (id = (SELECT auth.uid()));
CREATE POLICY "Admin Master Access" ON public.profiles FOR ALL TO public USING ((SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin');

-- ─── Watches RLS ──────────────────────────────
CREATE POLICY "Public Read Optimized" ON public.watches FOR SELECT TO public USING (true);
CREATE POLICY "Admin All Access Optimized" ON public.watches FOR ALL TO public USING ((SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin');

-- ─── Orders RLS ───────────────────────────────
CREATE POLICY "Users View Own Orders" ON public.orders FOR SELECT TO public USING (user_id = (SELECT auth.uid()));
CREATE POLICY "Users Create Own Orders" ON public.orders FOR INSERT TO public WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "Admin View All Orders" ON public.orders FOR SELECT TO public USING ((SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin');

-- ─── Order Items RLS ──────────────────────────
CREATE POLICY "Users View Own Items" ON public.order_items FOR SELECT TO public USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = (SELECT auth.uid())));
CREATE POLICY "Users Create Own Items" ON public.order_items FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = (SELECT auth.uid())));
CREATE POLICY "Admin Manage All Items" ON public.order_items FOR ALL TO public USING ((SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin');

-- ─── Inquiries RLS ────────────────────────────
CREATE POLICY "Public Create Inquiries" ON public.inquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin Manage Inquiries" ON public.inquiries FOR ALL TO public USING ((SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin');

-- ─── Auth Trigger ─────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
