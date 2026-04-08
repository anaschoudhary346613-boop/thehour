'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Instagram, Search, ChevronRight, Camera, Youtube } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, toggleAuth } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Discovery', href: '/shop', subtitle: 'Global Vault' },
    { name: 'Heritage', href: '/heritage', subtitle: 'Artisanal Craft' },
    { name: 'Provenance', href: '/verify', subtitle: 'Authenticity' },
    { name: 'Concierge', href: '/concierge', subtitle: 'Private Sourcing' },
  ];

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-4 flex justify-between items-center pointer-events-none ${
          scrolled || isMenuOpen ? 'bg-[#0A0A0A]/90 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="relative z-[51] pointer-events-auto transition-transform duration-700 hover:scale-110 active:scale-95">
          <Logo className="w-10 h-10 md:w-12 md:h-12" />
        </Link>

        {/* Right: Interaction Bar */}
        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <button 
            onClick={() => toggleCart(true)}
            className="group relative p-3 text-white transition-all duration-500 hover:text-[#C8A97E] active:scale-90"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.25,1,0.5,1]" />
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative z-[10001] p-3 text-white transition-all duration-500 hover:text-[#C8A97E] active:rotate-90"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="fixed inset-y-0 left-0 w-[85%] md:w-[450px] bg-[#0A0A0A] border-r border-white/5 z-[9999] flex flex-col shadow-[20px_0_60px_rgba(0,0,0,0.5)]"
            >
              <div className="p-8 pt-24 flex-1 flex flex-col">
                <div className="space-y-12">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: LUXURY_EASE }}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex flex-col"
                      >
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8A97E] mb-2 font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                          {item.subtitle}
                        </span>
                        <div className="flex items-center gap-4">
                          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight group-hover:pl-4 transition-all duration-700 ease-[0.25,1,0.5,1]">
                            {item.name}
                          </h2>
                          <ChevronRight size={24} className="text-[#C8A97E] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto space-y-12">
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.8 }}
                     className="grid grid-cols-2 gap-8"
                   >
                     <button 
                       onClick={() => { setIsMenuOpen(false); toggleAuth(true); }}
                       className="flex flex-col gap-2 group text-left"
                     >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Account</span>
                        <span className="text-xs uppercase tracking-widest text-white group-hover:text-[#C8A97E] transition-colors">Private Portal</span>
                     </button>
                     <div className="flex items-center gap-4 pt-6">
                        <Instagram size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                        <Youtube size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                        <Camera size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                     </div>
                   </motion.div>

                   <div className="text-[9px] uppercase tracking-[0.5em] text-white/10 font-black pb-4">
                      EST. 2026 — THE HOUR
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
