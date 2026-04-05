-- ─────────────────────────────────────────────
-- THE HOUR — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ─────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  phone text,
  created_at timestamptz default now()
);

-- Automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Products ────────────────────────────────
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  subtitle text,
  category text not null,
  price numeric(12, 2) not null,
  stock integer not null default 0,
  description text,
  image_urls text[] default '{}',
  tags text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Orders ──────────────────────────────────
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.profiles(id),
  customer_email text not null,
  customer_name text not null,
  shipping_address jsonb not null,
  total_amount numeric(12, 2) not null,
  status text not null default 'Pending'
    check (status in ('Pending', 'Authenticating', 'Dispatched', 'Delivered')),
  stripe_payment_intent_id text,
  stripe_session_id text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Order items ──────────────────────────────
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  product_price numeric(12, 2) not null,
  quantity integer not null default 1,
  subtotal numeric(12, 2) generated always as (product_price * quantity) stored
);

-- ─── Shipping Addresses ───────────────────────
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.profiles(id) on delete cascade,
  label text default 'Home',
  full_name text,
  address_line1 text,
  city text,
  country text,
  zip text,
  phone text,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ─── Row Level Security ───────────────────────

-- Profiles
alter table public.profiles enable row level security;
create policy "Public read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Admin full access profiles" on public.profiles
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Products (public read, admin write)
alter table public.products enable row level security;
create policy "Anyone can read products" on public.products
  for select using (true);
create policy "Admin can manage products" on public.products
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Orders
alter table public.orders enable row level security;
create policy "Customers read own orders" on public.orders
  for select using (customer_id = auth.uid());
create policy "Customers insert own orders" on public.orders
  for insert with check (customer_id = auth.uid());
create policy "Admin full access orders" on public.orders
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Order items
alter table public.order_items enable row level security;
create policy "Customer read own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders where id = order_id and customer_id = auth.uid())
  );
create policy "Admin full access order items" on public.order_items
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Addresses
alter table public.addresses enable row level security;
create policy "Customer manage own addresses" on public.addresses
  for all using (customer_id = auth.uid());

-- ─── Storage Bucket ───────────────────────────
-- Run these in Supabase Dashboard > Storage
-- Create a bucket named 'product-images' with public access

-- ─── Seed initial products ────────────────────
insert into public.products (name, subtitle, category, price, stock, description, tags, featured) values
  ('Noctua Royal', 'Chronograph — Rose Gold', 'Chronograph', 28500, 7, 'The Noctua Royal is a testament to the art of haute horlogerie.', ARRAY['Limited Edition', 'In-House Movement'], true),
  ('Lumière Squelette', 'Flying Skeleton — Silver', 'Dress Watch', 42000, 3, 'Every gear, every bridge, a work of sculptural art.', ARRAY['Skeleton Dial', 'Hand-Engraved'], true),
  ('Apex Noir', 'Sport Chronograph — DLC Titanium', 'Sport', 19800, 12, 'Born on the track, refined for the streets.', ARRAY['COSC Certified', 'Titanium'], true),
  ('Grand Complication I', 'Perpetual Calendar — Yellow Gold', 'Complication', 118000, 2, 'The pinnacle of timekeeping mastery.', ARRAY['Only 10 Pieces', 'Perpetual Calendar'], false),
  ('Abyssal Vert', 'Professional Diver — Stainless Steel', 'Diver', 15200, 18, 'Engineered for the deep and sculpted for the surface.', ARRAY['300M Water Resistant', 'Luminous Markers'], false),
  ('Éternel Tourbillon', 'Flying Tourbillon — Platinum', 'Tourbillon', 225000, 1, 'The ultimate expression of The Hour mastery.', ARRAY['Flying Tourbillon', 'Platinum'], true);
