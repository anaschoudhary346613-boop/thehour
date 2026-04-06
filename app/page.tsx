'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import PromoBanner from '@/components/PromoBanner';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import BottomNav from '@/components/BottomNav';
import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <main className="relative min-h-screen bg-black pb-20 md:pb-0 selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar onAuthClick={() => setShowAuth(true)} />

      {/* Hero Showcase */}
      <Hero />

      {/* New Arrivals Section */}
      <ProductGrid />

      {/* Best Sellers Promo Banner */}
      <PromoBanner />

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav />

      {/* Cart Drawer & Modals */}
      <CartDrawer onCheckout={() => setShowCheckout(true)} />
      
      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </AnimatePresence>

      {/* Noise overlay for premium grain feel */}
      <div className="noise-overlay pointer-events-none" />
    </main>
  );
}
