'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';

const PRODUCTS = [
  {
    id: '1',
    name: 'Royal Heritage Chrono',
    price: '$12,400',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    category: 'Grand Complication'
  },
  {
    id: '2',
    name: 'Midnight Obsidian',
    price: '$8,900',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80',
    category: 'Minimalist'
  },
  {
    id: '3',
    name: 'Azure Navigator',
    price: '$15,200',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80',
    category: 'Professional'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="relative w-full z-20 flex flex-col pt-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <h3 className="text-[#C8A97E] uppercase tracking-[0.4em] text-xs font-medium">Selected masterpieces</h3>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Current Exhibits</h2>
          </div>
          <button className="flex items-center space-x-3 text-[#E3CBA8] uppercase tracking-[0.3em] text-[10px] font-bold group">
            <span>View Full Gallery</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Feature Highlight Card - Modern Glassmorphism */}
        <div className="mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C8A97E]/10 to-transparent z-0"></div>
          <div className="relative z-10 border border-[#C8A97E]/20 bg-[#141414]/50 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
                  alt="Feature Detail" 
                />
             </div>
             <div className="w-full md:w-2/3 space-y-8">
                <h3 className="text-3xl font-serif text-white">The Caliber 321 Movement</h3>
                <p className="text-[#E3CBA8]/60 font-light leading-relaxed max-w-xl">
                  Each timepiece is powered by a hand-assembled movement, featuring a 72-hour power reserve and a patented anti-magnetic escapement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-2">
                      <ShieldCheck size={20} className="text-[#C8A97E]" />
                      <p className="text-[10px] uppercase text-white tracking-widest">Lifetime Warranty</p>
                   </div>
                   <div className="space-y-2">
                      <Clock size={20} className="text-[#C8A97E]" />
                      <p className="text-[10px] uppercase text-white tracking-widest">Swiss Precision</p>
                   </div>
                   <div className="space-y-2">
                      <Star size={20} className="text-[#C8A97E]" />
                      <p className="text-[10px] uppercase text-white tracking-widest">Limited Edition</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Product Grid - Horizontal Snap for Mobile, Grid for Desktop */}
         <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide">
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-[#E3CBA8] p-1 group cursor-pointer"
            >
              <div className="bg-[#0A0A0A] p-6 h-full flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 border border-[#C8A97E]/30">
                    <p className="text-[10px] text-[#C8A97E] uppercase tracking-tighter">New Arrival</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] mb-2">{product.category}</p>
                    <h4 className="text-xl font-serif text-white">{product.name}</h4>
                  </div>
                  <p className="text-sm font-medium text-[#C8A97E]">{product.price}</p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                   <button className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#C8A97E] transition-colors leading-none">View Specs</button>
                   <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C8A97E] group-hover:bg-[#C8A97E] transition-all">
                      <ArrowRight size={14} className="text-white group-hover:text-black transition-colors" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
