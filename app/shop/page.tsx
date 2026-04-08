'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SlidersHorizontal, ShoppingBag, ArrowRight } from 'lucide-react';
import BrandStrip from '@/components/BrandStrip';

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-48 text-white flex flex-col font-sans">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-20 mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#C8A97E] mb-4 block font-bold">The Store</span>
          <h1 className="text-4xl md:text-8xl font-serif text-white tracking-widest uppercase mb-6">Discovery</h1>
          <p className="text-white/30 text-[10px] md:text-sm uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
            Browse our carefully selected pieces <br className="hidden md:block" /> and find your next masterpiece.
          </p>
        </motion.div>
      </div>

      {/* 1. Shop By Brand Section (Reusing Component) */}
      <div className="mb-20">
         <BrandStrip />
      </div>

      {/* 2. Gender Segregation Section */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px] md:h-[600px]">
           {/* Men's Banner */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5"
           >
              <img src="/gender-men.png" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Men's Collection" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">
                 <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase tracking-tight">Men's<br/>Collection</h3>
                 <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-all">
                   Explore <ArrowRight size={14} />
                 </button>
              </div>
           </motion.div>

           {/* Women's Banner */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5"
           >
              <img src="/gender-women.png" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Women's Collection" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">
                 <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase tracking-tight">Women's<br/>Collection</h3>
                 <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-all">
                   Explore <ArrowRight size={14} />
                 </button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Filter & Sort Toolbar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-10">
        <div className="flex justify-between items-center border-y border-white/10 py-8">
           <h2 className="text-white text-xl font-serif uppercase tracking-widest">All Watches</h2>
           <div className="flex items-center gap-8">
              <button className="text-[10px] uppercase tracking-widest text-[#C8A97E] font-bold flex items-center gap-2 hover:text-white transition-colors">
                <SlidersHorizontal size={14} /> Filter
              </button>
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden md:block">
                {PRODUCTS.length} Available Items
              </span>
           </div>
        </div>
      </div>

      {/* 2-Column Product Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-12 md:gap-y-24">
          {PRODUCTS.map((product, idx) => {
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="flex flex-col group cursor-pointer"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Image Wrapper */}
                  <div className="relative aspect-[3/4] bg-white/[0.02] rounded-3xl overflow-hidden mb-6 border border-white/5 transition-all duration-700 group-hover:border-[#C8A97E]/40 group-hover:bg-white/[0.05]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 md:p-12 drop-shadow-2xl transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                    />

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 bg-[#C8A97E] text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                        -{discount}%
                      </div>
                    )}
                    
                    {/* Hover Quick Add Overlay */}
                    <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-2xl">
                          <ShoppingBag size={20} />
                       </div>
                    </div>
                  </div>

                  {/* Card Text Data */}
                  <div className="px-2">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C8A97E] mb-2">
                      {product.brand}
                    </h3>
                    <h2 className="text-sm md:text-lg font-serif text-white mb-3 leading-tight uppercase tracking-tight group-hover:text-[#C8A97E] transition-colors line-clamp-1">
                      {product.name}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-base md:text-xl font-serif text-white/90">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-white/20 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
