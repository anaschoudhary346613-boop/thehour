'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SlidersHorizontal, ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-32 px-4 md:px-8 text-white flex flex-col font-sans">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto w-full mb-12 mt-8 md:mt-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C8A97E] mb-2 block font-bold">The Vault</span>
          <h1 className="text-4xl md:text-7xl font-serif text-white tracking-widest uppercase">The Collection</h1>
        </motion.div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <div className="flex justify-between items-center border-y border-white/10 py-5">
          <button className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#C8A97E] font-bold hover:bg-white hover:text-black transition-all duration-500">
            <SlidersHorizontal size={14} />
            Filter and sort
          </button>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            {PRODUCTS.length} Masterpieces
          </span>
        </div>
      </div>

      {/* 2-Column Product Grid */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {PRODUCTS.map((product, idx) => {
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col group cursor-pointer"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Image Wrapper */}
                  <div className="relative aspect-[4/5] bg-white/[0.03] rounded-2xl overflow-hidden mb-5 border border-white/5 transition-colors group-hover:border-[#C8A97E]/30">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 md:p-10 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110 ease-out"
                    />

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#C8A97E]/30 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                        Save {discount}%
                      </div>
                    )}
                    
                    {/* Hover Quick Add Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                       <div className="w-10 h-10 rounded-full bg-[#C8A97E] flex items-center justify-center text-black">
                          <ShoppingBag size={18} />
                       </div>
                    </div>
                  </div>

                  {/* Card Text Data */}
                  <div className="px-1">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A97E]/60 mb-1.5 font-sans">
                      {product.brand || 'The Hour'}
                    </h3>
                    <h2 className="text-sm md:text-base font-serif text-white mb-2 leading-tight uppercase tracking-tight group-hover:text-[#C8A97E] transition-colors">
                      {product.name}
                    </h2>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#C8A97E]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through decoration-white/20">
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
