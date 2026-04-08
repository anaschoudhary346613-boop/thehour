'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import BrandStrip from '@/components/BrandStrip';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ShopPage() {
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
    // Note: Local data doesn't have a 'gender' field yet, 
    // but we can simulate logic or just show everything for now.
    return list;
  }, [activeCategory]);

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

      {/* Brand Strip (Static/Scroll) */}
      <div className="mb-20">
         <BrandStrip />
      </div>

      {/* Gender Collections */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
           {['Men', 'Women'].map((gender, i) => (
             <motion.div
               key={gender}
               initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: i * 0.2, ease: LUXURY_EASE }}
               onClick={() => router.push(`/shop?gender=${gender}`)}
               className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 aspect-[4/5] md:aspect-auto"
             >
                <Image 
                  src={gender === 'Men' ? '/gender-men.png' : '/gender-women.png'} 
                  alt={`${gender}'s Collection`}
                  fill
                  className="object-cover transition-transform duration-[3s] ease-[0.25,1,0.5,1] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end items-start z-10">
                   <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase tracking-tight leading-none">
                     {gender}'s<br/>Vault
                   </h3>
                   <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out">
                     Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
                {/* Magnetic-like gradient accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#C8A97E]/10 to-transparent transition-opacity duration-1000 pointer-events-none" />
             </motion.div>
           ))}
        </div>
      </section>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-10 sticky top-20 z-40">
        <div className="flex justify-between items-center border-y border-white/10 py-10 bg-[#050505]/80 backdrop-blur-xl px-4 rounded-2xl">
           <div className="flex items-center gap-4">
              <h2 className="text-white text-xl font-serif uppercase tracking-widest leading-none">Archive</h2>
              {activeCategory && (
                <span className="bg-[#C8A97E] text-black text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest flex items-center gap-2">
                  {activeCategory} <X size={10} className="cursor-pointer" onClick={clearFilters} />
                </span>
              )}
           </div>
           
           <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-[10px] uppercase tracking-[0.4em] text-[#C8A97E] font-black flex items-center gap-2 hover:text-white transition-all duration-500 ease-in-out"
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

      {/* Product Grid */}
      <div className="max-w-[1800px] mx-auto w-full px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.03, 
                  ease: LUXURY_EASE 
                }}
                className="relative group w-full aspect-[4/5] bg-[#0F0F0F] rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer flex items-center justify-center p-4 transition-all duration-700 hover:border-[#C8A97E]/20"
              >
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-40" />

                {/* Watch Image with Magnetic Hover */}
                <div className="relative w-full h-full flex items-center justify-center p-4 z-10 transition-transform duration-1000 group-hover:scale-110 ease-[0.25,1,0.5,1]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 md:p-10 drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Badge Reveal */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                   <h3 className="text-white text-[9px] font-black uppercase tracking-[0.3em] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group-hover:border-[#C8A97E]/40 transition-all duration-700">
                    {product.name}
                  </h3>
                   <span className="text-[#C8A97E] text-[8px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {product.category}
                   </span>
                </div>

                {/* The Secret Drawer UI */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/95 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-all duration-700 ease-[0.22,1,0.36,1] z-30 flex flex-col items-center">
                  <div className="w-12 h-[1px] bg-[#C8A97E] mb-6 opacity-40" />
                  <span className="text-[#C8A97E] text-xl font-serif mb-8 tracking-wider">
                    {formatPrice(product.price)}
                  </span>
                  <button className="w-full bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black py-5 rounded-full hover:bg-[#C8A97E] hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl shadow-black h-12 flex items-center justify-center">
                    Acquire
                  </button>
                </div>

                {/* Subtle Grainy Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Load More Mimic */}
      {filteredProducts.length > 0 && (
        <div className="mt-32 flex flex-col items-center gap-8 px-6">
           <div className="w-px h-24 bg-gradient-to-b from-[#C8A97E] to-transparent opacity-30" />
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold italic">EndOfInventory(50)</span>
        </div>
      )}
    </main>
  );
}
