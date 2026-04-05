import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '../lib/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('--- Starting Luxury Seeding ---');

  for (const product of PRODUCTS) {
    console.log(`Seeding: ${product.name}`);
    const { error } = await supabase.from('products').upsert({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image_urls: [product.image, product.image2 || product.image],
      tags: product.tags,
      featured: product.featured,
    });

    if (error) {
      console.error(`Error seeding ${product.name}:`, error.message);
    }
  }

  console.log('--- Seeding Complete ---');
}

seed();
