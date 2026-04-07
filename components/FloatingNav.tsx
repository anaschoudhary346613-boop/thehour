'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Grid, Search, User } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export default function FloatingNav() {
  const { openSearch, openCategories, openAccount } = useUIStore();

  const navItems = [
    { icon: <Home size={20} />, action: () => (window.location.href = '/') },
    { icon: <Grid size={20} />, action: openCategories },
    { icon: <Search size={20} />, action: openSearch },
    { icon: <User size={20} />, action: openAccount },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-full px-8 py-4 flex gap-10 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="text-[#C8A97E]/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {item.icon}
          </button>
        ))}
      </motion.div>
    </nav>
  );
}
