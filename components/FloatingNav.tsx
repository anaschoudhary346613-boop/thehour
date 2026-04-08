'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Grid, Search, User, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useStore } from '@/store/useStore';
import { usePathname, useRouter } from 'next/navigation';

export default function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch, openCategories } = useUIStore();
  const { cart, toggleCart, toggleAuth, user } = useStore();

  // FIX: Hide navigation entirely on product pages to avoid colliding with the Sticky Buy Bar.
  if (pathname?.includes('/product')) return null;

  const handleUserClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      toggleAuth(true);
    }
  };

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1000]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-8 py-4 flex gap-8 md:gap-10 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Home */}
        <button onClick={() => router.push('/')} className="text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
          <Home size={20} />
        </button>

        {/* Categories */}
        <button onClick={openCategories} className="text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
          <Grid size={20} />
        </button>

        {/* Search */}
        <button onClick={openSearch} className="text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
          <Search size={20} />
        </button>

        {/* Cart with Dynamic Badge */}
        <button onClick={() => toggleCart(true)} className="relative text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C8A97E] rounded-full border border-black" 
            />
          )}
        </button>

        {/* Account / Private Access */}
        <button onClick={handleUserClick} className="text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
          <User size={20} />
        </button>
      </motion.div>
    </nav>
  );
}
