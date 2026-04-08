'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Package, MessageSquare, ChevronRight, LogOut, Award } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, setUser } = useStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
      fetchOrders(session.user.id);
    }
    fetchSession();
  }, [router, setUser]);

  async function fetchOrders(userId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            watches (*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-[#C8A97E]/20 rounded-full" />
        <span className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-bold">Loading Your Account...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32">
      {/* Top Banner Branding */}
      <div className="h-[40vh] relative overflow-hidden flex items-end p-8 md:p-16 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(200,169,126,0.1),_transparent_60%)]" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.5em]">Your Account</h2>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter uppercase leading-none">My Collection</h1>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Order History for {user?.email}</p>
        </div>

        <button 
          onClick={handleLogout}
          className="absolute top-12 right-8 md:right-16 flex items-center gap-3 text-white/20 hover:text-red-500 transition-colors uppercase tracking-widest text-[9px] font-bold"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-12">
           <div className="space-y-6">
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black block border-b border-white/5 pb-4">Menu</span>
              <nav className="flex flex-col gap-4">
                 <button className="flex items-center gap-4 text-[#C8A97E] font-bold text-[11px] uppercase tracking-widest group">
                    <Shield size={18} className="opacity-60" />
                    My Watches
                    <ChevronRight size={14} className="ml-auto opacity-40 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="flex items-center gap-4 text-white/30 hover:text-white transition-colors font-bold text-[11px] uppercase tracking-widest group">
                    <Clock size={18} className="opacity-60" />
                    Order History
                    <ChevronRight size={14} className="ml-auto opacity-20 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="flex items-center gap-4 text-white/30 hover:text-white transition-colors font-bold text-[11px] uppercase tracking-widest group">
                    <MessageSquare size={18} className="opacity-60" />
                    Help & Support
                    <ChevronRight size={14} className="ml-auto opacity-20 group-hover:translate-x-1 transition-transform" />
                 </button>
              </nav>
           </div>

           <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
              <Award className="text-[#C8A97E]" size={24} />
              <h4 className="text-white uppercase tracking-widest text-[10px] font-bold">Member Status</h4>
              <p className="text-white/20 text-[9px] uppercase tracking-widest leading-relaxed">As a valued customer, you will get early access to our new watch collections.</p>
           </div>
        </div>

        {/* Right: Main Content (Orders) */}
        <div className="lg:col-span-9 space-y-10">
           <div className="flex justify-between items-end border-b border-white/5 pb-6">
              <h3 className="text-white font-serif text-3xl uppercase tracking-tight">Active Orders</h3>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{orders.length} Orders Found</span>
           </div>

           {orders.length === 0 ? (
             <div className="py-24 text-center space-y-6 border border-dashed border-white/10 rounded-3xl">
                <Package className="text-white/10 mx-auto" size={48} />
                <p className="text-white/30 uppercase tracking-widest text-[10px] font-bold">You have not ordered any watches yet.</p>
                <Link href="/shop" className="inline-block text-[#C8A97E] border-b border-[#C8A97E]/20 pb-1 text-[10px] uppercase tracking-widest font-bold">Browse the Store</Link>
             </div>
           ) : (
             <div className="space-y-8">
               {orders.map((order) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   key={order.id}
                   className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden"
                 >
                   {/* Order Header */}
                   <div className="p-8 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.01]">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Order ID</span>
                        <span className="text-[#C8A97E] font-mono text-sm tracking-tighter">ORDER-{order.id.slice(0,8).toUpperCase()}</span>
                      </div>
                      <div className="flex flex-col gap-1 md:items-end">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Order Status</span>
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${order.status === 'Awaiting Payment' ? 'text-[#C8A97E]' : 'text-green-500'}`}>
                          {order.status === 'Awaiting Payment' ? 'Waiting for Payment' : order.status}
                        </span>
                      </div>
                   </div>

                   {/* Order Items */}
                   <div className="p-8 space-y-8">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex gap-8 items-center">
                           <div className="w-20 h-20 bg-black/40 rounded-2xl p-4 border border-white/5 flex-shrink-0">
                              <img src={item.watches?.hero_image_url} alt="Watch" className="w-full h-full object-contain" />
                           </div>
                           <div className="flex-1 flex flex-col justify-center">
                              <h4 className="text-[#C8A97E] text-[10px] font-bold uppercase tracking-widest mb-1">{item.watches?.brand}</h4>
                              <h3 className="text-white font-serif text-xl tracking-tight uppercase">{item.watches?.name}</h3>
                              <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Serial Number Check: Success</p>
                           </div>
                           <div className="text-white font-serif text-lg">{formatPrice(item.price_at_purchase)}</div>
                        </div>
                      ))}
                   </div>

                   {/* Order Footer */}
                   <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                      <div className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Ordered on {new Date(order.created_at).toLocaleDateString()}</div>
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Total Paid</span>
                        <span className="text-2xl font-serif text-[#C8A97E]">{formatPrice(order.total_amount)}</span>
                      </div>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
        </div>
      </main>
    </div>
  );
}
