'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Database, Plus, RefreshCw, Eye, Edit3, Trash2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/products';

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [watches, setWatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      const ADMIN_UUID = process.env.NEXT_PUBLIC_ADMIN_UUID || '00000000-0000-0000-0000-000000000000';
      
      if (!session || session.user.id !== ADMIN_UUID) {
        if (!process.env.NEXT_PUBLIC_ADMIN_UUID) {
            console.warn('No ADMIN_UUID set in environment variables.');
        } else {
            router.push('/');
            return;
        }
      }
      fetchData();
    }
    checkAdmin();
  }, [router]);

  async function fetchData() {
    setLoading(true);
    const [ordersRes, watchesRes] = await Promise.all([
      supabase.from('orders').select('*, order_items(*, watches(*))').order('created_at', { ascending: false }),
      supabase.from('watches').select('*').order('created_at', { ascending: false })
    ]);

    setOrders(ordersRes.data || []);
    setWatches(watchesRes.data || []);
    setLoading(false);
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    
    if (error) alert(error.message);
    else fetchData();
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
       <span className="text-[#C8A97E] text-[10px] uppercase tracking-widest animate-pulse font-bold">Loading Admin Center...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Command Center */}
      <aside className="w-full md:w-80 bg-[#0A0A0A] border-r border-white/5 p-12 flex flex-col gap-12">
         <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-500 mb-2">
               <ShieldAlert size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Admin Only</span>
            </div>
            <h1 className="text-3xl font-serif uppercase tracking-tight leading-none text-white">Store Control</h1>
         </div>

         <nav className="flex flex-col gap-6">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'orders' ? 'text-[#C8A97E]' : 'text-white/20 hover:text-white'}`}
            >
              <CheckCircle size={18} />
              Manage Orders
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'inventory' ? 'text-[#C8A97E]' : 'text-white/20 hover:text-white'}`}
            >
              <Database size={18} />
              Manage Watches
            </button>
         </nav>

         <div className="mt-auto space-y-6 pt-12 border-t border-white/5">
            <div className="flex items-center gap-3 text-white/20 text-[9px] uppercase tracking-widest font-bold">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               System Online
            </div>
            <button onClick={() => fetchData()} className="text-[10px] text-[#C8A97E] uppercase tracking-widest font-black flex items-center gap-3 hover:text-white transition-colors">
               <RefreshCw size={14} />
               Refresh Data
            </button>
         </div>
      </aside>

      {/* Main Orchestration Pane */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto max-h-screen custom-scrollbar">
         
         {activeTab === 'orders' ? (
           <div className="space-y-12">
              <div className="flex justify-between items-end">
                 <h2 className="text-4xl font-serif uppercase tracking-tight">Customer Orders</h2>
                 <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{orders.length} Total Orders</span>
              </div>

              <div className="overflow-hidden border border-white/5 rounded-3xl bg-white/[0.01]">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white/[0.03]">
                          <th className="p-6 text-[9px] uppercase tracking-widest text-[#C8A97E] font-black">Order ID</th>
                          <th className="p-6 text-[9px] uppercase tracking-widest text-[#C8A97E] font-black">Customer</th>
                          <th className="p-6 text-[9px] uppercase tracking-widest text-[#C8A97E] font-black">Amount</th>
                          <th className="p-6 text-[9px] uppercase tracking-widest text-[#C8A97E] font-black">Status</th>
                          <th className="p-6 text-[9px] uppercase tracking-widest text-[#C8A97E] font-black text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {orders.map((order) => (
                         <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6">
                               <span className="font-mono text-[11px] text-white/50">#{order.id.slice(0,6).toUpperCase()}</span>
                            </td>
                            <td className="p-6">
                               <div className="flex flex-col">
                                  <span className="text-xs font-bold text-white uppercase">{order.user_id ? 'App User' : 'Guest'}</span>
                                  <span className="text-[9px] text-white/20 uppercase tracking-widest mt-1 truncate max-w-[150px]">{order.shipping_address}</span>
                                </div>
                            </td>
                            <td className="p-6 flex items-center gap-3">
                               <span className="text-white font-serif">{formatPrice(order.total_amount)}</span>
                               <span className="text-[8px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold uppercase tracking-widest border border-blue-500/20">{order.payment_method}</span>
                            </td>
                            <td className="p-6">
                               <select 
                                 value={order.status}
                                 onChange={(e) => updateStatus(order.id, e.target.value)}
                                 className="bg-black/40 border border-white/10 rounded-md py-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-[#C8A97E]"
                               >
                                  <option value="Awaiting Payment">Waiting for Payment</option>
                                  <option value="Payment Verified">Payment Received</option>
                                  <option value="Authenticating">Checking Watch</option>
                                  <option value="Dispatched">Sent to Customer</option>
                                </select>
                            </td>
                            <td className="p-6 text-right">
                               <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 hover:bg-white/10 rounded-lg text-white"><Eye size={16} /></button>
                                  <button className="p-2 hover:bg-white/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
         ) : (
           <div className="space-y-12">
              <div className="flex justify-between items-end">
                 <h2 className="text-4xl font-serif uppercase tracking-tight">All Watches</h2>
                 <button className="bg-[#C8A97E] text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all">
                    <Plus size={16} />
                    Add New Watch
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {watches.map((watch) => (
                   <div key={watch.id} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex gap-8 items-center group relative overflow-hidden">
                      <div className="w-24 h-24 bg-black/40 rounded-2xl p-4 border border-white/5 flex-shrink-0 relative z-10">
                         <img src={watch.hero_image_url} alt="Watch" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 space-y-2 relative z-10">
                         <div className="flex justify-between items-start">
                            <h3 className="text-xl font-serif text-white uppercase tracking-tight">{watch.name}</h3>
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${watch.is_featured ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/5' : 'border-white/10 text-white/30'}`}>
                               {watch.is_featured ? 'Featured' : 'Normal'}
                            </span>
                         </div>
                         <div className="flex items-center gap-6">
                            <span className="text-[#C8A97E] font-serif text-lg">{formatPrice(watch.price)}</span>
                            <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">STOCK: {watch.stock || 0}</span>
                         </div>
                         <div className="flex gap-4 pt-4">
                            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-bold"><Edit3 size={14} /> Edit</button>
                            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors font-bold"><Trash2 size={14} /> Delete</button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
         )}

      </main>

    </div>
  );
}
