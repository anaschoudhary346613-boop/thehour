'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/products';

interface BentoCollectionProps {
  watches: any[];
}

export default function BentoCollection({ watches }: BentoCollectionProps) {
  // If no watches are found, render a placeholder or empty state
  if (!watches || watches.length === 0) return null;

  // Explicitly map watches to their specific shapes to maintain the Bento asymmetry
  const heroWatch = watches[0];          // md:col-span-2 (Large)
  const specWatch = watches[1] || null;  // md:row-span-2 (Tall Specs)
  const editorialWatch = watches[2] || null; // md:col-span-3 (Wide Editorial - below others if needed)

  return (
    <section id="collection" className="relative w-full py-32 bg-black px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#C8A97E] uppercase tracking-[0.3em] text-xs mb-4 font-bold"
            >
              The Featured Selection
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-white tracking-tight uppercase"
            >
              Masterpieces of <br /> Engineering
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/shop" className="group flex items-center gap-2 text-white/50 hover:text-[#C8A97E] transition-colors uppercase tracking-widest text-[10px] font-bold">
              View Entire Catalog
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[450px]">
          
          {/* ITEM 0: THE HERO CARD (md:col-span-2) */}
          {heroWatch && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 bg-[#0A0A0A]"
            >
              <Link href={`/product/${heroWatch.id}`}>
                <div className="absolute inset-0 z-0 flex items-center justify-center p-12">
                   <img 
                      src={heroWatch.hero_image_url} 
                      alt={heroWatch.name}
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                   <span className="text-[#C8A97E] text-[10px] font-bold uppercase tracking-widest mb-2 block">Signature Artifact</span>
                   <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 uppercase tracking-tighter">{heroWatch.name}</h3>
                   <div className="flex items-center gap-6">
                      <span className="text-xl font-serif text-white/50">{formatPrice(heroWatch.price)}</span>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                   </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ITEM 1: THE SPEC CARD (Tall Vertical) */}
          {specWatch && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2 relative rounded-[2rem] overflow-hidden group border border-white/5 bg-[#0A0A0A] p-10 flex flex-col justify-between"
            >
               <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A97E]/10 flex items-center justify-center">
                    <img src="/logo.png" className="w-6 h-6 mix-blend-exclusion" alt="TH" />
                  </div>
                  <h3 className="text-2xl font-serif text-white uppercase tracking-tight">{specWatch.name}</h3>
                  
                  {/* Dynamic Specs List */}
                  <div className="space-y-4 pt-6 text-white text-xs ">
                    {specWatch.specs && Array.isArray(specWatch.specs) ? specWatch.specs.map((spec: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
                         <div className="w-1 h-1 bg-[#C8A97E] rounded-full" />
                         <span className="uppercase tracking-[0.2em] font-medium">{spec}</span>
                      </div>
                    )) : (
                      <span className="opacity-40 uppercase tracking-widest">Specifications Enclosed</span>
                    )}
                  </div>
               </div>

               <Link href={`/product/${specWatch.id}`} className="mt-auto">
                 <div className="relative aspect-square w-full mb-8">
                    <img 
                      src={specWatch.hero_image_url} 
                      alt={specWatch.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:rotate-12"
                    />
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[#C8A97E] text-2xl font-serif">{formatPrice(specWatch.price)}</span>
                    <button className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-[9px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">Explore</button>
                 </div>
               </Link>
            </motion.div>
          )}

          {/* ITEM 2: THE WIDE EDITORIAL CARD (md:col-span-2 Bottom or Side) */}
          {editorialWatch && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 bg-[#0A0A0A]"
            >
              <Link href={`/product/${editorialWatch.id}`}>
                {/* Lifestyle Background */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={editorialWatch.lifestyle_image_url || editorialWatch.hero_image_url} 
                    alt="Atmosphere"
                    className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-center max-w-md">
                   <span className="text-[#C8A97E] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Editorial Dossier</span>
                   <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase tracking-tighter leading-none">{editorialWatch.name}</h3>
                   <button className="w-fit bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C8A97E] transition-colors rounded-full">
                     Acquire Artifact — {formatPrice(editorialWatch.price)}
                   </button>
                </div>
              </Link>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
}
