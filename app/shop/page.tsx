'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SlidersHorizontal, ArrowRight, X, ShoppingBag } from 'lucide-react';
import BrandStrip from '@/components/BrandStrip';
import { useSearchParams, useRouter } from 'next/navigation';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category');
  const activeGender = searchParams.get('gender');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory) {
      list = list.filter(p => p.category === activeCategory);
    }
    if (activeGender) {
        list = list.filter(p => (genderMap[activeGender as keyof typeof genderMap] || []).includes(p.id));
    }
    return list;
  }, [activeCategory, activeGender]);

  const genderMap = {
     'Men': ['1', '3', '4', '6', '7', '9'],
     'Women': ['2', '5', '8', '10']
  };

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

      {/* Gender Collections */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-h-[400px]">
           {['Men', 'Women'].map((gender, i) => (
             <motion.div
               key={gender}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: i * 0.2, ease: LUXURY_EASE }}
               onClick={() => router.push(`/shop?gender=${gender}`)}
               className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 aspect-[16/9] md:aspect-auto"
             >
                <Image 
                  src={gender === 'Men' ? '/gender-men.png' : '/gender-women.png'} 
                  alt={`${gender}'s Collection`}
                  fill
                  className="object-cover transition-transform duration-[3s] ease-[0.25,1,0.5,1] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start z-10">
                   <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 uppercase tracking-tight leading-none">
                     {gender}'s<br/>Vault
                   </h3>
                   <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 transition-all duration-500">
                     Access <ArrowRight size={14} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 mb-10 sticky top-20 z-40">
        <div className="flex justify-between items-center border-y border-white/10 py-8 md:py-10 bg-[#050505]/80 backdrop-blur-xl px-4 rounded-2xl">
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
      </div>

      {/* Product Grid - Optimized for Mobile */}
      <div className="max-w-[1800px] mx-auto w-full px-4 md:px-12">
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

const genderMap = {
  'Men': ['1', '3', '4', '6', '7', '9'],
  'Women': ['2', '5', '8', '10']
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ShopContent />
    </Suspense>
  );
}
