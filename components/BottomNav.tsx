'use client';

import React from 'react';
import { Home, LayoutGrid, Search, User } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { openCategories, openSearch, openAccount } = useUIStore();

  const handleHomeClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#C8A97E]/20 flex justify-around items-center z-[100] pb-safe">
      <button 
        onClick={handleHomeClick}
        className="p-2 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Home"
      >
        <Home size={28} className="text-[#C8A97E]" />
      </button>
      
      <button 
        onClick={openCategories}
        className="p-2 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Categories"
      >
        <LayoutGrid size={28} className="text-[#C8A97E]" />
      </button>
      
      <button 
        onClick={openSearch}
        className="p-2 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Search"
      >
        <Search size={28} className="text-[#C8A97E]" />
      </button>
      
      <button 
        onClick={openAccount}
        className="p-2 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Account"
      >
        <User size={28} className="text-[#C8A97E]" />
      </button>
    </nav>
  );
}
