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
  ChevronRight,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex selection:bg-[#C8A97E] selection:text-black">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(true)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className={`fixed inset-y-0 left-0 bg-[#0A0A0A] border-r border-white/5 z-[70] flex flex-col overflow-hidden lg:relative lg:translate-x-0 ${
          !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="p-8 pb-12 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-4 group">
            <Logo size={32} className="group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A97E]">Command Center</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">Time Elite v2.0</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
           <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/20 hover:text-white transition-all w-full group">
              <Bell size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Notifications</span>
           </button>
           <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/20 hover:text-red-400 transition-all group">
              <LogOut size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Exit Portal</span>
           </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 lg:px-12 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
           <button 
             onClick={() => setSidebarOpen(!sidebarOpen)}
             className="p-3 text-white/40 hover:text-white transition-colors"
           >
             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>

           <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                 <Search size={14} className="text-white/20" />
                 <input 
                   type="text" 
                   placeholder="SEARCH VAULT..." 
                   className="bg-transparent border-none text-[9px] tracking-widest text-white focus:ring-0 w-48 font-black placeholder:text-white/10"
                 />
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Master Curator</span>
                    <span className="text-[8px] font-bold text-[#C8A97E] uppercase tracking-widest">Operational</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A97E] to-[#E5C99F] flex items-center justify-center border-2 border-white/10 p-0.5">
                    <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
                       <User size={20} className="text-[#C8A97E]" />
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 lg:p-12 relative overflow-hidden">
          {children}
          {/* Subtle Aesthetic Elements */}
          <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A97E]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="fixed bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent pointer-events-none -z-10 opacity-50" />
        </main>
      </div>
    </div>
  );
}
