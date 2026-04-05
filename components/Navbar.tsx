'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Clock, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Editorials', href: '#editorials' },
  { label: 'Craftsmanship', href: '#craftsmanship' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  onAuthClick,
}: {
  onAuthClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, isCartBouncing, openCart } = useCartStore();
  const cartCount = count();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          paddingTop: scrolled || mobileOpen ? '1rem' : '2rem',
          paddingBottom: scrolled || mobileOpen ? '1rem' : '2rem',
          backgroundColor: scrolled || mobileOpen ? 'rgba(8,8,8,0.8)' : 'rgba(8,8,8,0)',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          backgroundColor: { duration: 0.6 },
          paddingTop: { duration: 0.6 },
          paddingBottom: { duration: 0.6 }
        }}
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-700 ${
          scrolled || mobileOpen ? 'border-white/5 shadow-2xl' : 'border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-[110]">
            <motion.div
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-obsidian/20 backdrop-blur-sm"
            >
              <Clock size={16} className="text-gold" strokeWidth={1.5} />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-syne font-800 text-[1.1rem] tracking-[0.15em] uppercase text-ivory leading-none">
                The <span className="text-gold-gradient">Hour</span>
              </span>
              <span className="font-label text-[0.45rem] text-silver/40 tracking-[0.25em] mt-1">Founders Selection</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.label}
                href={link.href}
              >
                {link.label}
              </MagneticLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-[110]">
            {/* Auth */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="hidden md:flex items-center gap-2.5 font-label text-silver hover:text-ivory transition-colors duration-300"
            >
              <User size={16} strokeWidth={1.5} />
              <span className="tracking-[0.2em]">Account</span>
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2.5 rounded-full border border-white/10 hover:border-gold/40 transition-all duration-500 group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gold/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"
              />
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className={`text-silver group-hover:text-gold transition-colors duration-300 relative z-10 ${
                  isCartBouncing ? 'animate-cart-bounce' : ''
                }`}
              />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-gold text-obsidian text-[10px] font-bold flex items-center justify-center px-1 border-2 border-obsidian"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-silver hover:text-ivory group"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-current rounded-full transition-transform"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-4 h-[1.5px] bg-current rounded-full self-end transition-all"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7, width: '24px' } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-current rounded-full self-end transition-all"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] lg:hidden"
            >
              <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl" />
              
              <div className="relative h-full flex flex-col justify-center px-12 pt-20">
                <nav className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, y: 30, rotate: 2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ 
                        delay: 0.1 + i * 0.1,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      onClick={() => setMobileOpen(false)}
                      className="group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-label text-[0.6rem] text-gold/40 group-hover:text-gold transition-colors">0{i + 1}</span>
                        <span className="font-display text-4xl sm:text-5xl text-ivory group-hover:text-gold-gradient transition-all duration-500 group-hover:pl-4 uppercase tracking-tighter">
                          {link.label}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-16 pt-8 border-t border-white/5"
                >
                  <button
                    onClick={() => { onAuthClick(); setMobileOpen(false); }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                      <User size={20} className="text-silver group-hover:text-gold transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="font-label text-[0.6rem] text-silver/60">Manage Account</p>
                      <p className="font-syne font-700 text-ivory tracking-wide">Client Portal</p>
                    </div>
                  </button>
                </motion.div>
                
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-silver/30 font-label text-[0.55rem] tracking-[0.3em]">
                  <span>GENAVA • LONDON • NEW YORK</span>
                  <span>THE HOUR © 2024</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

function MagneticLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      className="relative font-label text-silver hover:text-ivory transition-colors duration-500 overflow-hidden group py-1"
    >
      <span className="relative z-10 block translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
        {children}
      </span>
      <span className="absolute inset-0 z-10 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-gold">
        {children}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      />
    </motion.a>
  );
}

