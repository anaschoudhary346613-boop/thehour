'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Clock,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import Link from 'next/link';

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    orders: [],
    watches: [],
    inquiries: []
  });

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const [orders, watches, inquiries] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('watches').select('*'),
        supabase.from('inquiries').select('*')
      ]);

      setData({
        orders: orders.data || [],
        watches: watches.data || [],
        inquiries: inquiries.data || []
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const stats = useMemo(() => [
    { 
      label: 'Total Valuation', 
      value: formatPrice(data.orders.reduce((acc, o) => acc + Number(o.total_amount || 0), 0)), 
      trend: '+12.4%', 
      isUp: true, 
      icon: DollarSign, 
      color: '#C8A97E' 
    },
    { 
      label: 'Acquisition Influx', 
      value: data.orders.length.toString(), 
      trend: '+40.2%', 
      isUp: true, 
      icon: ShoppingBag, 
      color: '#E5C99F' 
    },
    { 
      label: 'Vault Catalog', 
      value: data.watches.length.toString(), 
      trend: 'Optimized', 
      isUp: true, 
      icon: Package, 
      color: '#A18F71' 
    },
    { 
      label: 'Concierge Leads', 
      value: data.inquiries.length.toString(), 
      trend: '+15.5%', 
      isUp: true, 
      icon: ShieldCheck, 
      color: '#C8A97E' 
    },
  ], [data]);

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 size={40} className="text-[#C8A97E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] font-black mb-2 block">Systems Status: Operational</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tighter">Command Centre</h1>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: LUXURY_EASE }}
            className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:border-[#C8A97E]/30 transition-all duration-700 group relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div 
                  className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#050505] border border-white/5 group-hover:border-[#C8A97E]/20 transition-all duration-700"
                  style={{ color: stat.color }}
                >
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-wider">{stat.value}</p>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Activity Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* Recent Acquisitions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12"
        >
           <div className="flex items-center justify-between mb-10 md:mb-12">
              <div className="flex items-center gap-4">
                 <div className="w-1.5 h-6 bg-[#C8A97E] rounded-full" />
                 <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-white">Latest Transactions</h3>
              </div>
              <Link href="/admin/dashboard/orders" className="hidden sm:block text-[9px] font-bold text-white/20 hover:text-[#C8A97E] transition-all uppercase tracking-widest">Full Record</Link>
           </div>

           <div className="space-y-4 md:space-y-6">
              {data.orders.slice(0, 5).map((order: any, i) => (
                <div key={order.id} className="flex items-center justify-between p-4 md:p-6 rounded-2xl border border-white/[0.03] hover:bg-white/[0.02] transition-all duration-500 group">
                   <div className="flex items-center gap-4 md:gap-6">
                      <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#050505] border border-white/5 items-center justify-center text-[#C8A97E] font-serif text-lg">
                         {i + 1}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{order.id.split('-')[0]}</span>
                         <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">LOGGED VIA {order.payment_method?.toUpperCase()}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 md:gap-12">
                      <div className="flex flex-col items-end">
                         <span className="text-[10px] font-black text-white">{formatPrice(order.total_amount)}</span>
                         <div className="px-3 py-1 rounded-full border border-[#C8A97E]/10 bg-[#C8A97E]/5 text-[#C8A97E] text-[7px] font-black uppercase tracking-widest mt-2">
                           {order.status}
                         </div>
                      </div>
                   </div>
                </div>
              ))}
              {data.orders.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                   <Activity size={32} className="text-white/10" />
                   <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Awaiting acquisition telemetry.</p>
                </div>
              )}
           </div>
        </motion.div>

        {/* Concierge Influx */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12"
        >
           <div className="flex items-center gap-4 mb-10 md:mb-12">
              <div className="w-1.5 h-6 bg-[#C8A97E]/30 rounded-full" />
              <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-white">Concierge Influx</h3>
           </div>
           
           <div className="space-y-8">
              {data.inquiries.slice(0, 4).map((inq: any) => (
                <div key={inq.id} className="relative pl-8 group">
                   <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 opacity-50" />
                   <div className="absolute left-[-2px] top-1 w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                   
                   <p className="text-[9px] font-black text-white uppercase tracking-widest mb-1 flex items-center justify-between">
                     {inq.name}
                     <span className="text-[7px] text-white/10 font-bold">{new Date(inq.created_at).toLocaleDateString()}</span>
                   </p>
                   <p className="text-[8px] text-[#C8A97E] uppercase font-bold tracking-widest mb-2">{inq.type}</p>
                   <p className="text-[9px] text-white/30 leading-relaxed font-medium line-clamp-2">
                     {inq.details}
                   </p>
                </div>
              ))}
              {data.inquiries.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                   <TrendingUp size={32} className="text-white/10" />
                   <p className="text-[9px] font-black uppercase tracking-widest text-white/20">The stream is currently silent.</p>
                </div>
              )}
           </div>

           <Link 
             href="/admin/dashboard/inquiries"
             className="mt-12 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C8A97E] hover:text-black transition-all duration-700"
           >
              Process Requests <ArrowRight size={14} />
           </Link>
        </motion.div>
      </div>
    </div>
  );
}
