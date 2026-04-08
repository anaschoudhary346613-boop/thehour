'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  ChevronRight,
  Loader2,
  Trash2,
  Check,
  User,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  Tag
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setInquiries(data);
    setLoading(false);
  }

  const updateStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'In Contact' : currentStatus === 'In Contact' ? 'Fulfilled' : 'Pending';
    
    const { error } = await supabase
      .from('inquiries')
      .update({ status: nextStatus })
      .eq('id', id);

    if (error) {
       toast.error('System update failed: ' + error.message);
    } else {
       toast.success(`Inquiry marked as ${nextStatus}.`);
       setInquiries(inquiries.map(i => i.id === id ? { ...i, status: nextStatus } : i));
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Permanent purge of inquiry record?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
       toast.success('Record resolved.');
       fetchInquiries();
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.details.toLowerCase().includes(searchQuery.toLowerCase())
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
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] font-black mb-2 block">Concierge Flow</span>
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter">Inquiries</h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 w-full md:w-80 group hover:border-[#C8A97E]/30 transition-all duration-500">
              <Search size={16} className="text-white/20 group-hover:text-[#C8A97E] transition-colors" />
              <input 
                type="text" 
                placeholder="PROBE COMMUNICATIONS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white focus:ring-0 w-full font-black placeholder:text-white/10"
              />
           </div>
        </div>
      </div>

      {/* Inquiry Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-40 flex items-center justify-center">
             <Loader2 size={40} className="text-[#C8A97E] animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="col-span-full py-40 text-center flex flex-col items-center gap-6">
             <MessageSquare size={48} className="text-white/10" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">No concierge inquiries detected in the stream.</p>
          </div>
        ) : filteredInquiries.map((inq, idx) => (
          <motion.div
            key={inq.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.05, ease: LUXURY_EASE }}
            className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 group hover:border-[#C8A97E]/20 transition-all duration-700 flex flex-col"
          >
             <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#C8A97E]/10 flex items-center justify-center text-[#C8A97E] border border-[#C8A97E]/20">
                      <User size={20} />
                   </div>
                   <div className="flex flex-col">
                      <h3 className="text-xs font-black text-white uppercase tracking-widest">{inq.name}</h3>
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">{inq.type}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                     inq.status === 'Fulfilled' ? 'bg-green-500/5 text-green-500 border-green-500/10' :
                     inq.status === 'In Contact' ? 'bg-[#C8A97E]/5 text-[#C8A97E] border-[#C8A97E]/10' :
                     'bg-white/5 text-white/40 border-white/10'
                   }`}>
                      {inq.status}
                   </div>
                   <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">{new Date(inq.created_at).toLocaleDateString()} — VAULT LOGS</span>
                </div>
             </div>

             <div className="flex-1 space-y-8">
                <div className="bg-[#050505] rounded-2xl p-6 border border-white/5 group-hover:border-[#C8A97E]/10 transition-all">
                   <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                     "{inq.details}"
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 text-white/30 truncate">
                      <Mail size={14} className="text-[#C8A97E]/40" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">{inq.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-white/30 truncate">
                      <Phone size={14} className="text-[#C8A97E]/40" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">{inq.phone || 'NO SECURE LINE'}</span>
                   </div>
                </div>
             </div>

             <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <button 
                     onClick={() => updateStatus(inq.id, inq.status)}
                     className="px-6 py-3 rounded-xl bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#C8A97E] transition-all active:scale-95"
                   >
                      Promote Phase
                   </button>
                </div>
                <div className="flex items-center gap-3">
                   <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                      <ExternalLink size={18} />
                   </button>
                   <button 
                     onClick={() => deleteInquiry(inq.id)}
                     className="p-3 rounded-xl bg-white/5 border border-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
