'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import Logo from '@/components/Logo';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/admin/dashboard/products', icon: Package },
  { label: 'Transactions', href: '/admin/dashboard/orders', icon: ShoppingBag },
  { label: 'Concierge', href: '/admin/dashboard/inquiries', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile closed by default
  const pathname = usePathname();

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex selection:bg-[#C8A97E] selection:text-black font-sans">
      
      {/* 1. CRITICAL: MOBILE BACKDROP (Z-9000) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9000] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 2. CRITICAL: SIDEBAR CONTAINER (Z-9001) */}
      <motion.aside
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : -320,
        }}
        transition={{ duration: 0.6, ease: LUXURY_EASE }}
        className="fixed inset-y-0 left-0 w-[300px] bg-[#0A0A0A] border-r border-white/5 z-[9001] flex flex-col lg:relative lg:translate-x-0 lg:w-[280px]"
      >
        <div className="p-8 pb-12 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-4 group">
            <Logo size={32} className="group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A97E]">Command Center</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">Time Elite v2.0</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/20 hover:text-white transition-colors">
             <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // AUTO-CLOSE ON CLICK
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 relative group ${
                  isActive ? 'bg-[#C8A97E]/10 text-[#C8A97E]' : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#C8A97E]' : 'text-white/20 group-hover:text-white transition-colors'} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-[#C8A97E] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
           <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/20 hover:text-red-400 transition-all group">
              <LogOut size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Exit Portal</span>
           </Link>
        </div>
      </motion.aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-x-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-12 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
           <button 
             onClick={() => setSidebarOpen(true)}
             className="p-3 text-[#C8A97E] hover:text-white transition-colors lg:hidden"
           >
             <Menu size={24} />
           </button>

           <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 focus-within:border-[#C8A97E]/30 transition-all">
                 <Search size={14} className="text-white/20" />
                 <input 
                   type="text" 
                   placeholder="SEARCH VAULT..." 
                   className="bg-transparent border-none text-[9px] tracking-widest text-white focus:ring-0 w-full font-black placeholder:text-white/10"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                 <span className="text-[10px] font-black text-white uppercase tracking-wider">Master Curator</span>
                 <span className="text-[8px] font-bold text-[#C8A97E] uppercase tracking-widest">System Active</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A97E] to-[#E5C99F] p-0.5 border border-white/10 shadow-[0_0_20px_rgba(200,169,126,0.2)]">
                 <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
                    <User size={20} className="text-[#C8A97E]" />
                 </div>
              </div>
           </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 lg:p-12 relative">
          <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5, ease: LUXURY_EASE }}
             >
                {children}
             </motion.div>
          </AnimatePresence>
          
          {/* Subtle Ambient Glow */}
          <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A97E]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </main>
      </div>
    </div>
  );
}
