'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Trash2, 
  Pencil, 
  Loader2, 
  Database,
  ArrowRight,
  ShieldAlert,
  Search,
  Plus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';

export default function InventoryHub() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('watches')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setAssets(data);
    setIsLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Authorize permanent deletion of this asset from the vault?")) return;

    try {
      const { error } = await supabase
        .from('watches')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Optimistic Update
      setAssets(assets.filter(a => a.id !== id));
    } catch (err: any) {
      alert("Termination failed: " + err.message);
    }
  };

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <div className="space-y-12 pb-20">
      {/* Header Viewport */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] font-black mb-2 block">Archive Control</span>
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter">Inventory Hub</h1>
        </motion.div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 flex-1 md:w-80 group focus-within:border-[#C8A97E]/30 transition-all duration-500">
              <Search size={16} className="text-white/20 group-hover:text-[#C8A97E] transition-colors" />
              <input 
                type="text" 
                placeholder="PROBE CATALOGUE..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white focus:ring-0 w-full font-black placeholder:text-white/10"
              />
           </div>
           <Link 
             href="/admin/dashboard/products"
             className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:bg-[#C8A97E] transition-all duration-500 active:scale-95 shadow-xl"
           >
              <Plus size={16} strokeWidth={3} /> NEW ASSET
           </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <div className="w-16 h-16 rounded-full border-2 border-[#C8A97E] border-t-transparent animate-spin shadow-[0_0_30px_rgba(200,169,126,0.2)]" />
             <p className="text-[10px] font-black text-[#C8A97E] uppercase tracking-[0.5em] animate-pulse">Syncing with Encryption Node...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center gap-8">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                <ShieldAlert size={40} className="text-white/10" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Zero Assets Detected in Current Sector</p>
             <button onClick={fetchInventory} className="text-[9px] uppercase tracking-widest text-[#C8A97E] underline underline-offset-8 decoration-[#C8A97E]/30 hover:text-white transition-colors">Re-scan Vault</button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {filteredAssets.map((asset, idx) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: idx * 0.05, ease: LUXURY_EASE }}
                  className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-[#C8A97E]/30 transition-all duration-700 shadow-2xl"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8A97E] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top rounded-l-full" />
                  
                  {/* Left: Identity */}
                  <div className="flex items-center gap-8 w-full lg:w-1/3">
                    <div className="relative w-24 h-24 rounded-2xl bg-[#050505] border border-white/5 flex items-center justify-center p-3 overflow-hidden group-hover:border-[#C8A97E]/20 transition-all duration-700">
                      {asset.hero_image_url ? (
                        <Image 
                          src={asset.hero_image_url} 
                          alt={asset.name} 
                          fill 
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : <Package className="text-white/5" size={32} />}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1 group-hover:text-[#C8A97E] transition-colors">{asset.name}</h3>
                      <span className="text-[10px] font-bold text-[#C8A97E] uppercase tracking-[0.3em]">{asset.brand}</span>
                    </div>
                  </div>

                  {/* Middle: Metrics */}
                  <div className="flex items-center justify-between lg:justify-center gap-16 w-full lg:w-1/3 px-8 lg:px-0">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Market Valuation</span>
                       <span className="text-lg font-serif text-white tracking-wider">{formatPrice(asset.price)}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Vault Volume</span>
                       <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black ${asset.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {asset.stock} UNITS
                          </span>
                          <div className={`w-1.5 h-1.5 rounded-full ${asset.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                       </div>
                    </div>
                  </div>

                  {/* Right: Operational Actions */}
                  <div className="flex items-center gap-4 w-full lg:w-auto lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0">
                    <Link 
                      href={`/admin/dashboard/products?edit=${asset.id}`} 
                      className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded-2xl hover:bg-white hover:text-black hover:border-white transition-all duration-500 group/btn active:scale-95"
                    >
                      EDIT <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(asset.id)}
                      className="flex-1 lg:flex-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-500 active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                    >
                      REVOKE
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-12 right-12 z-50 hidden lg:block">
         <div className="flex items-center gap-6 bg-[#0A0A0A]/90 border border-[#C8A97E]/30 px-8 py-5 rounded-3xl backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
               <Database size={16} className="text-[#C8A97E]" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">VAULT_SYMMETRY.LIVE</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <span className="text-[9px] font-bold text-white/30 tracking-widest">{assets.length} PERSISTENT ENTRIES</span>
         </div>
      </div>
    </div>
  );
}
