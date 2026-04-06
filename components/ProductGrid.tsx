'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function ProductGrid() {
  const arrivals = PRODUCTS.slice(0, 3); // Mocking the first 3 as new arrivals

  return (
    <section id="collections" className="py-24 bg-black px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-[1px] bg-gold/50" />
              <h2 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-widest">New Arrivals</h2>
              <div className="w-8 h-[1px] bg-gold/50" />
            </div>
            <p className="font-label text-[0.6rem] text-gold/60 uppercase tracking-[0.3em] ml-12">Latest Collection</p>
          </div>
          
          <button className="flex items-center gap-2 font-label text-[0.65rem] text-silver/60 uppercase tracking-widest hover:text-gold transition-colors group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {arrivals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-onyx border border-white/5 mb-6 group-hover:border-gold/30 transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="text-center">
                <h3 className="font-serif text-lg text-white uppercase tracking-tight mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
                <p className="font-syne font-800 text-gold text-sm tracking-tight">${product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
