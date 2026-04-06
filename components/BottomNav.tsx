'use client';

import { Home, Grid, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Grid, label: 'Categories' },
    { icon: Search, label: 'Search' },
    { icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-t border-white/5 py-3 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item, i) => (
          <button 
            key={i} 
            className={`flex flex-col items-center gap-1 group ${item.active ? 'text-gold' : 'text-silver/50 hover:text-white transition-colors'}`}
          >
            <item.icon size={20} strokeWidth={item.active ? 2 : 1.5} />
            <span className="text-[10px] font-label uppercase tracking-widest leading-none">
              {item.label}
            </span>
            {item.active && (
              <motion.div 
                layoutId="activeTab"
                className="w-1 h-1 rounded-full bg-gold mt-1"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
