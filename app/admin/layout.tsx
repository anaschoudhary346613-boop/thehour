'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Auth Guard
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [pathname, router]);

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Inventory', href: '/admin/dashboard/products', icon: Package },
    { name: 'Transactions', href: '/admin/dashboard/orders', icon: ShoppingBag },
    { name: 'Inquiries', href: '/admin/dashboard/inquiries', icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  // Skip layout for login page
  if (pathname === '/admin/login') return <>{children}</>;
  
  // Wait for auth check
  if (isAuth === null) return <div className="min-h-screen bg-black" />;

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9000] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-80 bg-[#0A0A0A] border-r border-white/5 z-[9001] transform transition-transform duration-700 ease-[0.25,1,0.5,1]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-8">
          {/* Brand Header */}
          <div className="flex items-center gap-4 mb-20 px-2">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#C8A97E] shadow-[0_0_20px_rgba(200,169,126,0.1)] group-hover:border-[#C8A97E]/30 transition-all">
               <Clock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif tracking-tighter text-white uppercase italic">Command Center</h2>
              <p className="text-[10px] text-[#C8A97E] font-black tracking-[0.3em] uppercase opacity-60">Vault Management</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-3">
             {menuItems.map((item) => {
               const isActive = pathname === item.href;
               return (
                 <Link 
                   key={item.name} 
                   href={item.href}
                   onClick={() => setIsSidebarOpen(false)}
                   className={`flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                     isActive 
                     ? 'bg-white text-black shadow-2xl' 
                     : 'text-white/30 hover:text-white hover:bg-white/5'
                   }`}
                 >
                   <item.icon size={20} className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                   <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                   {isActive && (
                     <motion.div 
                       layoutId="activeTab"
                       className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8A97E]" 
                     />
                   )}
                 </Link>
               );
             })}
          </nav>

          {/* Bottom Utility */}
          <div className="mt-auto space-y-6 pt-10 border-t border-white/5">
            <Link 
               href="/" 
               className="flex items-center gap-5 px-6 py-5 rounded-2xl text-white/30 hover:text-white transition-all group"
            >
               <ExternalLink size={20} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Digital Flagship</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-5 px-6 py-5 rounded-2xl text-red-400 hover:bg-red-500/5 transition-all group"
            >
              <LogOut size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto custom-scrollbar relative">
        {/* Top Sticky Interaction Bar */}
        <header className="sticky top-0 z-40 w-full px-6 md:px-12 py-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 lg:py-8">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white lg:hidden"
              >
                <Menu size={20} />
              </button>
              <div className="hidden lg:flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5">
                 <ShieldCheck size={14} className="text-[#C8A97E]" />
                 <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Encrypted Connection</span>
              </div>
           </div>

           <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Administrator Control</span>
                 <span className="text-[8px] font-medium text-white/20 tracking-widest uppercase">Node: Global-Vault-01</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A97E] to-[#E5C99F] p-[1.5px]">
                 <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-[10px] font-bold text-[#C8A97E]">
                    AD
                 </div>
              </div>
           </div>
        </header>

        {/* Page Yield */}
        <div className="px-6 md:px-12 py-12 md:py-16 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
