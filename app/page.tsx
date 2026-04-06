import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CartDrawer from '@/components/CartDrawer';
import BottomNav from '@/components/BottomNav';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Ensures fresh data for the store

export default async function Home() {
  // 1. Fetch live database products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
  }

  // 2. Separate logic for Hero vs Grid
  const validProducts = products || [];
  const featuredProduct = validProducts.find(p => p.is_featured) || validProducts[0] || null;
  const gridProducts = validProducts.filter(p => p.id !== featuredProduct?.id);

  return (
    <main className="relative min-h-screen bg-black pb-20 md:pb-0 selection:bg-[#C8A97E] selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Showcase */}
      <Hero featuredWatch={featuredProduct} />

      {/* Featured Products Showcase */}
      <FeaturedProducts products={gridProducts} />

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav />

      {/* Cart Drawer */}
      <CartDrawer />
    </main>
  );
}
