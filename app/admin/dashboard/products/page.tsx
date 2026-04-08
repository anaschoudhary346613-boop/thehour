'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Loader2,
  X,
  Upload,
  Image as ImageIcon,
  Check
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
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    subtitle: '',
    description: '',
    price: '',
    category: 'Luxury',
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
    const { data, error } = await supabase
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
        brand: watch.brand,
        subtitle: watch.subtitle || '',
        description: watch.description || '',
        price: watch.price.toString(),
        category: watch.category || 'Luxury',
        stock: watch.stock || 1,
        hero_image_url: watch.hero_image_url,
        lifestyle_image_url: watch.lifestyle_image_url || '',
        specs: watch.specs || []
      });
    } else {
      setEditingWatch(null);
      setFormData({
        name: '',
        brand: '',
        subtitle: '',
        description: '',
        price: '',
        category: 'Luxury',
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
    const fileName = `${Math.random()}.${fileExt}`;
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
    if (!confirm('Are you sure you want to permanently remove this asset from the vault?')) return;
    
    const { error } = await supabase
      .from('watches')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Deletion failed: ' + error.message);
    } else {
      toast.success('Asset removed.');
      fetchWatches();
    }
  };

  const filteredWatches = watches.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.brand.toLowerCase().includes(searchQuery.toLowerCase())
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
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] font-black mb-2 block">Archive Control</span>
          <h1 className="text-5xl font-serif text-white uppercase tracking-tighter">Inventory</h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 w-full md:w-80 group hover:border-[#C8A97E]/30 transition-all duration-500">
              <Search size={16} className="text-white/20 group-hover:text-[#C8A97E] transition-colors" />
              <input 
                type="text" 
                placeholder="FILTER COLLECTION..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-[10px] tracking-widest text-white focus:ring-0 w-full font-black placeholder:text-white/10"
              />
           </div>
           <button 
             onClick={() => handleOpenModal()}
             className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:bg-[#C8A97E] transition-all duration-500 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
           >
              <Plus size={16} strokeWidth={3} /> Add Asset
           </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase border-b border-white/5 bg-white/[0.01]">
                <th className="px-10 py-8">Timepiece</th>
                <th className="px-10 py-8">Vitals</th>
                <th className="px-10 py-8 text-right">Valuation</th>
                <th className="px-10 py-8 text-right">Status</th>
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
              ) : filteredWatches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-white/20 text-[10px] font-black uppercase tracking-widest">
                    No assets found in the matching range.
                  </td>
                </tr>
              ) : filteredWatches.map((watch) => (
                <tr key={watch.id} className="group hover:bg-white/[0.01] transition-all duration-500">
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-white/5 flex items-center justify-center p-2 group-hover:border-[#C8A97E]/30 transition-all duration-700 relative overflow-hidden">
                           <Image 
                             src={watch.hero_image_url || '/placeholder.png'} 
                             alt={watch.name} 
                             fill 
                             className="object-contain p-2"
                           />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-white uppercase tracking-widest">{watch.name}</span>
                           <span className="text-[9px] font-bold text-[#C8A97E] uppercase tracking-widest mt-1">{watch.brand}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{watch.category} Collection</span>
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-green-500" />
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{watch.stock} Units Stocked</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <span className="text-sm font-serif text-white tracking-wider">{formatPrice(watch.price)}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${watch.stock > 0 ? 'bg-green-500/5 text-green-500 border-green-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                        {watch.stock > 0 ? 'LIVE' : 'DEPLETED'}
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

      {/* Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 30 }}
               transition={{ duration: 0.8, ease: LUXURY_EASE }}
               className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
             >
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-8 bg-[#C8A97E] rounded-full" />
                      <h2 className="text-3xl font-serif text-white uppercase tracking-tighter">
                        {editingWatch ? 'Secure Asset Update' : 'New Asset Entry'}
                      </h2>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-4 text-white/20 hover:text-white transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Left Side: General Info */}
                      <div className="space-y-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">Core Identification</label>
                            <input 
                              required
                              placeholder="WATCH NAME..."
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-bold tracking-widest"
                            />
                            <input 
                              required
                              placeholder="BRAND (e.g. ROLEX)..."
                              value={formData.brand}
                              onChange={(e) => setFormData({...formData, brand: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-bold tracking-widest"
                            />
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">Valuation & Stock</label>
                            <div className="grid grid-cols-2 gap-4">
                               <input 
                                 required
                                 type="number"
                                 placeholder="PRICE (USD)..."
                                 value={formData.price}
                                 onChange={(e) => setFormData({...formData, price: e.target.value})}
                                 className="bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-bold tracking-widest"
                               />
                               <input 
                                 required
                                 type="number"
                                 placeholder="STOCK..."
                                 value={formData.stock}
                                 onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                                 className="bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-bold tracking-widest"
                               />
                            </div>
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">Categorization</label>
                            <select 
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-white focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-bold uppercase tracking-widest appearance-none"
                            >
                               <option value="Luxury">Luxury Collection</option>
                               <option value="Automatic">Mechanical Arts</option>
                               <option value="Chronograph">Chronograph Series</option>
                               <option value="Heritage">Heritage Edition</option>
                            </select>
                         </div>
                      </div>

                      {/* Right Side: Media & Details */}
                      <div className="space-y-8">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">Visual Assets</label>
                            
                            {/* Hero Image Upload */}
                            <div className="group relative w-full aspect-video bg-[#050505] rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-[#C8A97E]/30 transition-all overflow-hidden p-6">
                               {formData.hero_image_url ? (
                                 <>
                                   <Image src={formData.hero_image_url} alt="Hero" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Upload className="text-white mb-2" />
                                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Update Hero Asset</span>
                                   </div>
                                 </>
                               ) : (
                                 <>
                                   <ImageIcon size={32} className="text-white/10 mb-4" />
                                   <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Upload Master Transparent PNG</span>
                                 </>
                               )}
                               <input 
                                 type="file" 
                                 accept="image/*" 
                                 onChange={(e) => handleUpload(e, 'hero')}
                                 className="absolute inset-0 opacity-0 cursor-pointer" 
                               />
                               {uploading && <div className="absolute inset-0 bg-black/80 flex items-center justify-center"><Loader2 className="animate-spin text-[#C8A97E]" /></div>}
                            </div>
                         </div>
                         
                         <div className="space-y-4">
                            <textarea 
                              placeholder="ARTISANAL STORYTELLING (DESCRIPTION)..."
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              rows={4}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-xs text-white placeholder:text-white/10 focus:border-[#C8A97E]/30 focus:ring-0 transition-all font-medium leading-relaxed"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="pt-12 border-t border-white/5 flex gap-4">
                      <button 
                        type="submit" 
                        disabled={loading || uploading}
                        className="flex-1 bg-white text-black py-6 rounded-3xl text-sm font-black uppercase tracking-[0.3em] hover:bg-[#C8A97E] transition-all duration-700 flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> Secure Entry</>}
                      </button>
                      <button 
                         type="button" 
                         onClick={() => setIsModalOpen(false)}
                         className="px-12 py-6 rounded-3xl border border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white hover:border-white/20 transition-all"
                      >
                        Abort
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-12 right-12 z-50">
         <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#C8A97E]/20 px-6 py-4 rounded-full backdrop-blur-xl shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Master Node: Active</span>
         </div>
      </div>
    </div>
  );
}
