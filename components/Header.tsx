'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Instagram, Search, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, cart } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home page', href: '/' },
    { name: 'The Collection', href: '/shop' },
    { name: 'Heritage & Craft', href: '/heritage' },
    { name: 'Verify Authenticity', href: '/verify' },
    { name: 'Bespoke Sourcing', href: '/concierge' },
    { name: 'Shop All', href: '/shop' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[5000] transition-all duration-500 px-6 py-4 flex justify-between items-center ${
          scrolled || isMenuOpen ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="relative z-[5001]">
          <Logo className="w-10 h-10 md:w-12 md:h-12" />
        </Link>

        {/* Right: Cart & Menu Toggle */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => toggleCart(true)}
            className="relative p-2 text-white hover:text-[#C8A97E] transition-colors"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#C8A97E] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-[#C8A97E] transition-colors p-2"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* SIDEBAR NAVIGATION OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* The Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] cursor-pointer"
            />

            {/* The Sidebar Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] md:w-[400px] bg-[#0A0A0A] border-r border-white/10 z-[9999] flex flex-col shadow-2xl"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-white p-2 hover:bg-white/5 rounded-full transition-all"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
                <img src="/logo.png" className="w-8 h-8 object-contain" alt="TH" />
                <div className="w-8"></div> {/* Spacer for symmetry */}
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-8 flex flex-col">
                {navLinks.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-8 py-5 text-white/80 text-lg font-serif tracking-tight border-b border-white/[0.02] flex justify-between items-center hover:bg-white/5 hover:text-[#C8A97E] transition-all group"
                  >
                    {link.name}
                    <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C8A97E]" />
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-6 mx-8"></div>
                
                <Link 
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-4 text-white/50 text-sm uppercase tracking-[0.2em] hover:text-[#C8A97E] transition-colors"
                >
                  Track Order
                </Link>
              </nav>

              {/* Bottom Footer */}
              <div className="p-8 border-t border-white/5 flex flex-col gap-8 bg-[#050505]">
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-white/70 text-sm font-bold uppercase tracking-widest hover:text-[#C8A97E] transition-colors"
                >
                  <User size={18} strokeWidth={2} /> 
                  Log in
                </Link>
                
                <div className="flex items-center gap-6">
                   <Link href="#" className="text-white/40 hover:text-white transition-colors">
                    <Camera size={20} />
                   </Link>
                   <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Follow the Vault</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
