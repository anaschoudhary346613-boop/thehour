'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useUIStore } from '@/store/useUIStore';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, toggleCart } = useStore();
  const { openCategories } = useUIStore();
  
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled 
          ? 'bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4' 
          : 'bg-transparent py-8 md:py-12'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="group relative z-[1000] flex items-center gap-4">
          <Logo size={isScrolled ? 40 : 50} className="transition-transform duration-500 group-hover:scale-110" />
          <span className={`text-white text-[10px] uppercase tracking-[0.4em] font-black transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
            The Hour
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-8 md:gap-12 relative z-[1000]">
          {/* Minimalist Cart Icon */}
          <button 
            onClick={() => toggleCart(true)}
            className="group relative flex items-center gap-3 text-white transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
              Bag
            </span>
            <div className="relative">
              <ShoppingBag size={20} className="text-white/80 group-hover:text-white transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C8A97E] text-black text-[8px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </div>
          </button>

          {/* Minimalist Menu Icon */}
          <button 
             onClick={openCategories}
             className="group flex items-center gap-3 text-white transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
              Index
            </span>
            <Menu size={22} className="text-white/80 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
