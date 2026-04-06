'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar({
  onAuthClick,
}: {
  onAuthClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { count, isCartBouncing, openCart } = useCartStore();
  const cartCount = count();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/5 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-black py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Mobile Menu */}
        <button className="text-white hover:text-gold transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo size={22} />
        </Link>

        {/* Right: Cart */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="relative p-2"
          >
            <ShoppingBag
              size={24}
              strokeWidth={1.5}
              className={`text-white transition-colors duration-300 ${
                isCartBouncing ? 'animate-cart-bounce' : ''
              }`}
            />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center border-2 border-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
