'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SlidersHorizontal, ArrowRight, X, ShoppingBag, Loader2 } from 'lucide-react';
import BrandStrip from '@/components/BrandStrip';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category');
  const activeGender = searchParams.get('gender');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live inventory from Supabase
  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      const { data, error } = await supabase
        .from('watches')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        // Map DB fields to UI expected fields if they differ
        const mapped = data.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          category: item.category,
          gender: item.gender,
          image: item.hero_image_url || '/watch.png',
          stock: item.stock
        }));
        setDbProducts(mapped);
      }
      setLoading(false);
    }
    fetchInventory();
  }, []);

  // 2. Combine DB products with static products (static acts as fallback or baseline)
  const allProducts = useMemo(() => {
    if (dbProducts.length > 0) return dbProducts;
    return PRODUCTS;
  }, [dbProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];
    if (activeCategory) {
      list = list.filter(p => p.category === activeCategory);
    }
    if (activeGender) {
      list = list.filter(p => p.gender === activeGender || p.gender === 'Unisex');
    }
    return list;
  }, [allProducts, activeCategory, activeGender]);

  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  const clearFilters = () => {
    router.push('/shop');
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-48 text-white flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-20 mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: LUXURY_EASE }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#C8A97E] mb-4 block font-black">Curated Essence</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-widest uppercase mb-6 leading-none">Discovery</h1>
          <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-lg mx-auto leading-loose">
            Exploration across the world's most <br className="hidden md:block" /> remarkable mechanical masterpieces.
          </p>
        </motion.div>
      </div>

      {/* Brand Strip */}
      <div className="mb-20">
         <BrandStrip />
      </div>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 mb-10 sticky top-20 z-40">
        <div className="flex justify-between items-center border-y border-white/10 py-8 md:py-10 bg-[#050505]/80 backdrop-blur-xl px-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
           <div className="flex items-center gap-4">
              <h2 className="text-white text-lg md:text-xl font-serif uppercase tracking-widest leading-none">Archive</h2>
              {(activeCategory || activeGender) && (
                <span className="bg-[#C8A97E] text-black text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest flex items-center gap-2">
                  {activeCategory || activeGender} <X size={10} className="cursor-pointer" onClick={clearFilters} />
                </span>
              )}
           </div>
           
           <div className="flex items-center gap-6 md:gap-8">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-[10px] uppercase tracking-[0.4em] text-[#C8A97E] font-black flex items-center gap-2"
              >
                <SlidersHorizontal size={14} /> Filter
              </button>
              <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden md:block">
                {filteredProducts.length} Timepieces
              </span>
           </div>
        </div>

        {/* Filter Drawer Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="overflow-hidden bg-[#0A0A0A] border-x border-b border-white/10 mt-2 rounded-3xl"
            >
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Gender Vaults */}
                 <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Target Vault</span>
                    <div className="flex flex-wrap gap-3">
                       {['Men', 'Women', 'Unisex'].map((gender) => (
                         <button
                           key={gender}
                           onClick={() => {
                             const params = new URLSearchParams(searchParams.toString());
                             params.set('gender', gender);
                             router.push(`?${params.toString()}`);
                             setIsFilterOpen(false);
                           }}
                           className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                             activeGender === gender 
                             ? 'bg-[#C8A97E] text-black border-[#C8A97E]' 
                             : 'border-white/5 bg-white/5 text-white/40 hover:text-white'
                           }`}
                         >
                           {gender}'s Vault
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Categories */}
                 <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Movement Classification</span>
                    <div className="flex flex-wrap gap-3">
                       {['Automatic', 'Chronograph', 'Heritage'].map((cat) => (
                         <button
                           key={cat}
                           onClick={() => {
                             const params = new URLSearchParams(searchParams.toString());
                             params.set('category', cat);
                             router.push(`?${params.toString()}`);
                             setIsFilterOpen(false);
                           }}
                           className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                             activeCategory === cat 
                             ? 'bg-[#C8A97E] text-black border-[#C8A97E]' 
                             : 'border-white/5 bg-white/5 text-white/40 hover:text-white'
                           }`}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1800px] mx-auto w-full px-4 md:px-12">
        {loading && dbProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <Loader2 size={40} className="text-[#C8A97E] animate-spin" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Syncing Vault...</span>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: idx * 0.02, ease: LUXURY_EASE }}
                  className="relative group w-full bg-[#0F0F0F] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer p-4 transition-all duration-700 hover:border-[#C8A97E]/30"
                >
                  <Link href={`/product/${product.id}`} className="absolute inset-0 z-40" />
                  
                  {/* Product Image */}
                  <div className="relative w-full aspect-square flex items-center justify-center p-2 mb-4">
                     <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2 md:p-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  {/* Info Bar */}
                  <div className="space-y-3 relative z-10 px-2 pb-2 text-center md:text-left">
                     <div>
                       <h3 className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate">{product.name}</h3>
                       <span className="text-[#C8A97E] text-[8px] font-bold uppercase tracking-[0.2em]">{product.category}</span>
                     </div>
                     
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
                        <span className="text-white font-serif text-sm md:text-lg">{formatPrice(product.price)}</span>
                        
                        {/* Mobile Visible Button */}
                        <button className="bg-white text-black text-[8px] uppercase tracking-[0.3em] font-black px-4 py-2.5 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 hover:bg-[#C8A97E]">
                          Acquire
                        </button>
                     </div>
                  </div>
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="mt-32 flex flex-col items-center gap-8 px-6">
           <div className="w-px h-24 bg-gradient-to-b from-[#C8A97E] to-transparent opacity-30" />
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold italic">EndOfInventory({filteredProducts.length})</span>
        </div>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ShopContent />
    </Suspense>
  );
}
