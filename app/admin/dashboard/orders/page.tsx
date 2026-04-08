'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  Loader2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  FileText
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
       toast.error('Phase update failed: ' + error.message);
    } else {
       toast.success(`Transaction shifted to ${newStatus}.`);
       setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Abort transaction record? This cannot be undone.')) return;
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (!error) {
       toast.success('Record purged.');
       fetchOrders();
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.customer_name && o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] font-black mb-2 block">Acquisition Logs</span>
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter">Transactions</h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 w-full md:w-80 group hover:border-[#C8A97E]/30 transition-all duration-500">
              <Search size={16} className="text-white/20 group-hover:text-[#C8A97E] transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH TRANSACTIONS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white focus:ring-0 w-full font-black placeholder:text-white/10"
              />
           </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase border-b border-white/5 bg-white/[0.01]">
                <th className="px-10 py-8">Reference</th>
                <th className="px-10 py-8">Acquiring Client</th>
                <th className="px-10 py-8">Phase</th>
                <th className="px-10 py-8 text-right">Valuation</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 size={32} className="text-[#C8A97E] animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-white/20 text-[10px] font-black uppercase tracking-widest">
                    No transaction logs detected in the specified range.
                  </td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-white/[0.01] transition-all duration-500">
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center text-[#C8A97E] group-hover:border-[#C8A97E]/30 transition-all duration-700">
                           <ShoppingBag size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-white uppercase tracking-widest">{order.id.split('-')[0]}</span>
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">Secured: {new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col">
                        <span className="text-xs font-black text-white uppercase tracking-widest">{order.customer_name || 'Private Client'}</span>
                        <span className="text-[9px] font-bold text-[#C8A97E] uppercase tracking-widest mt-1">{order.customer_email || 'Verified Account'}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <select 
                       value={order.status}
                       onChange={(e) => updateStatus(order.id, e.target.value)}
                       className="bg-[#050505] border border-white/5 rounded-xl px-4 py-2 text-[8px] font-black uppercase tracking-widest text-white/60 hover:border-[#C8A97E]/30 focus:ring-0 appearance-none w-48 transition-all"
                     >
                        <option value="Awaiting Payment">Awaiting Payment</option>
                        <option value="Payment Verified">Payment Verified</option>
                        <option value="Authenticating">Authenticating</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                     </select>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <span className="text-sm font-serif text-[#C8A97E] tracking-wider">{formatPrice(order.total_amount)}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                        <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => deleteOrder(order.id)}
                          className="p-3 rounded-xl bg-white/5 border border-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
