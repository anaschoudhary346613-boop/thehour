'use client';

import { useState } from 'react';
import { Menu, ShoppingBag, User, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/store/useCart';
import Logo from './Logo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { useUIStore } from '@/store/useUIStore';
import { useUser } from '@/hooks/useUser';

export default function Navbar() {
  const { toggleCart, items } = useCart();
  const { openAuthModal } = useUIStore();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'PROVENANCE HUB', path: '/provenance' },
    { name: 'ATELIER', path: '/atelier' },
    { name: 'CLIENT DASHBOARD', path: '/dashboard' },
    { name: 'ADMIN HUB', path: '/admin/dashboard' },
  ];

  return (
    <>
      <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-50 text-white hidden md:flex">
        {/* Left Side: Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Logo size={24} className="justify-start text-white" />
        </Link>
        
        {/* Right Side: Links & Icons */}
        <div className="flex items-center gap-8 font-sans font-bold">
          {navLinks.map(link => (
            <Link key={link.name} href={link.path} className="hover:text-[#C5A059] transition-colors uppercase tracking-wider text-sm">
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 ml-4">
            <button 
              onClick={user ? undefined : openAuthModal}
              className="hover:text-[#C5A059] transition-colors"
              aria-label="Account"
            >
              {user ? (
                <Link href="/dashboard">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/20 flex items-center justify-center border border-[#C5A059]/40 hover:bg-[#C5A059]/40 transition-all">
                    <User size={12} className="text-[#C5A059]" />
                  </div>
                </Link>
              ) : (
                <User size={20} />
              )}
            </button>

            <button 
              onClick={() => toggleCart()}
              className="relative hover:text-[#C5A059] transition-colors"
              aria-label="Toggle Cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setMenuOpen(true)}
              className="hover:text-[#C5A059] transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#0A0A0A] flex flex-col md:flex-row"
          >
            {/* Close Button Top Right (Overlaying everything) */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 z-[100] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Left Side (Main Links) */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-5xl md:text-7xl font-sans font-bold text-white hover:text-[#C5A059] transition-colors cursor-pointer uppercase block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side (Sub-links) */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-l border-white/10">
              <h3 className="text-[#C5A059] tracking-[0.2em] mb-8 text-sm uppercase">Private Services</h3>
              <ul className="flex flex-col">
                <li>
                  {user ? (
                    <Link 
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl text-gs-gold hover:text-white mb-4 transition-colors block"
                    >
                      Member Dashboard
                    </Link>
                  ) : (
                    <button 
                      onClick={() => { setMenuOpen(false); openAuthModal(); }} 
                      className="text-2xl text-gray-400 hover:text-white mb-4 transition-colors text-left"
                    >
                      Client Portal
                    </button>
                  )}
                </li>
                <li>
                  <a href="#" className="text-2xl text-gray-400 hover:text-white mb-4 transition-colors block">
                    Bespoke Appointments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-2xl text-gray-400 hover:text-white mb-4 transition-colors block">
                    Asset Valuation
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
