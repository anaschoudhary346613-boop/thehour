'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Loader2,
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Tag,
  Database,
  ShieldHalf
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import Image from 'next/image';
import { toast } from 'sonner';

export default function InventoryPage() {
  const [watches, setWatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWatch, setEditingWatch] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Strict Standardized Options
  const BRANDS = ['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Omega', 'Cartier', 'Richard Mille', 'Other'];
  const CATEGORIES = ['Automatic', 'Chronograph', 'Heritage'];
  const GENDERS = ['Men', 'Women', 'Unisex'];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Rolex',
    subtitle: '',
    description: '',
    price: '',
    category: 'Automatic',
    gender: 'Men',
    stock: 1,
    hero_image_url: '',
    lifestyle_image_url: '',
    specs: []
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchWatches();
  }, []);

  async function fetchWatches() {
    setLoading(true);
    const { data } = await supabase
      .from('watches')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setWatches(data);
    setLoading(false);
  }

  const handleOpenModal = (watch: any = null) => {
    if (watch) {
      setEditingWatch(watch);
      setFormData({
        name: watch.name,
        brand: watch.brand || 'Rolex',
        subtitle: watch.subtitle || '',
        description: watch.description || '',
        price: watch.price.toString(),
        category: watch.category || 'Automatic',
        gender: watch.gender || 'Men',
        stock: watch.stock || 1,
        hero_image_url: watch.hero_image_url,
        lifestyle_image_url: watch.lifestyle_image_url || '',
        specs: watch.specs || []
      });
    } else {
      setEditingWatch(null);
      setFormData({
        name: '',
        brand: 'Rolex',
        subtitle: '',
        description: '',
        price: '',
        category: 'Automatic',
        gender: 'Men',
        stock: 1,
        hero_image_url: '',
        lifestyle_image_url: '',
        specs: []
      });
    }
    setIsModalOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'lifestyle') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `watches/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('watch-assets')
      .upload(filePath, file);

    if (uploadError) {
      toast.error('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('watch-assets')
      .getPublicUrl(filePath);

    if (data) {
      setFormData(prev => ({
        ...prev,
        [type === 'hero' ? 'hero_image_url' : 'lifestyle_image_url']: data.publicUrl
      }));
      toast.success('Asset secured in the vault.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    let error;
    if (editingWatch) {
      const { error: updateError } = await supabase
        .from('watches')
        .update(payload)
        .eq('id', editingWatch.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('watches')
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      toast.error('Error: ' + error.message);
    } else {
      toast.success(editingWatch ? 'Asset updated.' : 'New timepiece added to the vault.');
      setIsModalOpen(false);
      fetchWatches();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Abort transaction? This asset will be purged permanently.')) return;
    
    const { error } = await supabase
      .from('watches')
      .delete()
      .eq('id', id);

    if (error) {
       toast.error('Purge failed: ' + error.message);
    } else {
       toast.success('Asset removed from archive.');
       fetchWatches();
    }
  };

  const filteredWatches = useMemo(() => {
    return watches.filter(w => 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      w.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [watches, searchQuery]);

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
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter">Inventory</h1>
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
           <button 
             onClick={() => handleOpenModal()}
             className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:bg-[#C8A97E] transition-all duration-500 active:scale-95 shadow-xl"
           >
              <Plus size={16} strokeWidth={3} /> NEW ASSET
           </button>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase border-b border-white/5 bg-white/[0.01]">
                <th className="px-10 py-8">Asset</th>
                <th className="px-10 py-8">Classification</th>
                <th className="px-10 py-8 text-right">Valuation</th>
                <th className="px-10 py-8 text-right">Status</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <Loader2 size={32} className="text-[#C8A97E] animate-spin mx-auto" />
                    <p className="mt-4 text-[9px] font-black text-white/10 uppercase tracking-widest">Hydrating Archives...</p>
                  </td>
                </tr>
              ) : filteredWatches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-white/10 text-[10px] font-black uppercase tracking-[0.4em]">
                    No matching assets in vault.
                  </td>
                </tr>
              ) : filteredWatches.map((watch) => (
                <tr key={watch.id} className="group hover:bg-white/[0.01] transition-all duration-500">
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-white/5 flex items-center justify-center p-2 group-hover:border-[#C8A97E]/30 transition-all duration-700 relative overflow-hidden">
                           {watch.hero_image_url ? (
                             <Image 
                                src={watch.hero_image_url} 
                                alt={watch.name} 
                                fill 
                                className="object-contain p-2"
                             />
                           ) : <ImageIcon className="text-white/5" />}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-white uppercase tracking-widest">{watch.name}</span>
                           <span className="text-[9px] font-bold text-[#C8A97E] uppercase tracking-widest mt-1">{watch.brand}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{watch.category} — {watch.gender} Vault</span>
                        <div className="flex items-center gap-2">
                           <div className={`w-1 h-1 rounded-full ${watch.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{watch.stock} Units</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <span className="text-sm font-serif text-white tracking-wider">{formatPrice(watch.price)}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${watch.stock > 0 ? 'bg-green-500/5 text-green-500 border-green-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                        {watch.stock > 0 ? 'IN VAULT' : 'OUTFLOW'}
                     </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                        <button 
                          onClick={() => handleOpenModal(watch)}
                          className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black transition-all"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(watch.id)}
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

      {/* Asset Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 min-h-screen">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 40 }}
               transition={{ duration: 0.8, ease: LUXURY_EASE }}
               className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[92vh]"
             >
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#C8A97E]/10 via-transparent to-transparent">
                   <div className="flex items-center gap-6">
                      <div className="w-1 h-10 bg-[#C8A97E] rounded-full shadow-[0_0_15px_#C8A97E]" />
                      <div className="flex flex-col">
                        <h2 className="text-3xl font-serif text-white uppercase tracking-tighter">
                          {editingWatch ? 'Secure Asset Update' : 'New Asset Induction'}
                        </h2>
                        <span className="text-[10px] font-black text-[#C8A97E] uppercase tracking-widest mt-1">Operational Node: Vault-01</span>
                      </div>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-4 rounded-2xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      {/* Left: Metadata */}
                      <div className="space-y-12">
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Primary ID & Heritage</label>
                            
                            {/* Watch Name */}
                            <input 
                              required
                              placeholder="WATCH MODEL NAME..."
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest"
                            />
                            
                            {/* Strict Brand Selector */}
                            <div className="relative group">
                              <select 
                                required
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-xs text-white focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest uppercase appearance-none cursor-pointer"
                              >
                                {BRANDS.map(b => <option key={b} value={b} className="bg-[#0A0A0A]">{b.toUpperCase()}</option>)}
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                 <Plus size={14} className="rotate-45" />
                              </div>
                            </div>
                         </div>

                         {/* Valuation & Volume */}
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Market Valuation</label>
                               <input 
                                 required
                                 type="number"
                                 placeholder="PRICE (USD)..."
                                 value={formData.price}
                                 onChange={(e) => setFormData({...formData, price: e.target.value})}
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest"
                               />
                            </div>
                            <div className="space-y-4">
                               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Vault Volume</label>
                               <input 
                                 required
                                 type="number"
                                 placeholder="STOCK..."
                                 value={formData.stock}
                                 onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-black tracking-widest"
                               />
                            </div>
                         </div>

                         {/* Strict Movement Classification */}
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Movement & Heritage</label>
                            <div className="flex flex-wrap gap-4">
                               {CATEGORIES.map(cat => (
                                 <button
                                   key={cat}
                                   type="button"
                                   onClick={() => setFormData({...formData, category: cat})}
                                   className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                     formData.category === cat 
                                     ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-[#C8A97E] shadow-[0_0_25px_rgba(200,169,126,0.2)]' 
                                     : 'border-white/5 bg-white/5 text-white/20 hover:text-white hover:border-white/20'
                                   }`}
                                 >
                                   {cat}
                                 </button>
                               ))}
                            </div>
                         </div>

                         {/* Target Vault Selector */}
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Target Vault (Gender)</label>
                            <div className="flex flex-wrap gap-4">
                               {GENDERS.map(gender => (
                                 <button
                                   key={gender}
                                   type="button"
                                   onClick={() => setFormData({...formData, gender: gender})}
                                   className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                     formData.gender === gender 
                                     ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-[#C8A97E] shadow-[0_0_25px_rgba(200,169,126,0.2)]' 
                                     : 'border-white/5 bg-white/5 text-white/20 hover:text-white hover:border-white/20'
                                   }`}
                                 >
                                   {gender}
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Right: Visual Assets */}
                      <div className="space-y-12">
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Vanguard Presentation (HERO)</label>
                            <div className="group relative w-full aspect-[4/3] bg-[#050505] rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-[#C8A97E]/30 transition-all overflow-hidden p-8">
                               {formData.hero_image_url ? (
                                 <>
                                   <Image src={formData.hero_image_url} alt="Hero" fill className="object-contain p-12 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,1,0.5,1]" />
                                   <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Upload className="text-[#C8A97E] mb-4" />
                                      <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">REPLACE MASTER PNG</span>
                                   </div>
                                 </>
                               ) : (
                                 <>
                                   <ImageIcon size={48} className="text-white/5 mb-6" />
                                   <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] text-center max-w-[200px] leading-relaxed">UPLOAD ALPHA-TRANSPARENT<br/>PRODUCT SHOWCASE</span>
                                 </>
                               )}
                               <input 
                                 type="file" 
                                 accept="image/*" 
                                 onChange={(e) => handleUpload(e, 'hero')}
                                 className="absolute inset-0 opacity-0 cursor-pointer" 
                                />
                               {uploading && <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50"><Loader2 className="animate-spin text-[#C8A97E] mb-4" /><span className="text-[9px] font-black text-[#C8A97E] uppercase tracking-widest">TRANSMITTING TO VAULT...</span></div>}
                            </div>
                         </div>
                         
                         <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">Artisanal Storytelling</label>
                            <textarea 
                              placeholder="NARRATE THE HERITAGE OF THIS TIMEPIECE..."
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              rows={6}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-[3rem] px-8 py-8 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-medium leading-[2.2] custom-scrollbar"
                            />
                         </div>
                      </div>
                   </div>

                   {/* Footer Actions */}
                   <div className="pt-12 border-t border-white/5 flex gap-6">
                      <button 
                        type="submit" 
                        disabled={loading || uploading}
                        className="flex-1 bg-white text-black py-8 rounded-3xl text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all duration-700 flex items-center justify-center gap-4 disabled:opacity-50 shadow-[0_25px_50px_rgba(255,255,255,0.1)] group overflow-hidden relative"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                         {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} className="group-hover:scale-125 transition-transform" /> SECURE ASSET ENTRY</>}
                      </button>
                      <button 
                         type="button" 
                         onClick={() => setIsModalOpen(false)}
                         className="px-14 py-8 rounded-3xl border border-white/10 text-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white hover:border-white/40 transition-all font-syne"
                      >
                        ABORT
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Database Node Status */}
      <div className="fixed bottom-12 right-12 z-50 hidden lg:block">
         <div className="flex items-center gap-6 bg-[#0A0A0A]/90 border border-[#C8A97E]/30 px-8 py-5 rounded-3xl backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
               <Database size={16} className="text-[#C8A97E]" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">VAULT_SYMMETRY.LIVE</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <span className="text-[9px] font-bold text-white/30 tracking-widest">{watches.length} PERSISTENT ENTRIES</span>
         </div>
      </div>
    </div>
  );
}
