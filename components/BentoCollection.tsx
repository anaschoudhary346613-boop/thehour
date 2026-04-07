'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/lib/products';

export default function BentoCollection() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="text-[#C8A97E] font-geometric tracking-[0.4em] text-[10px] uppercase block mb-4">
          The Curation
        </span>
        <h2 className="text-white text-4xl md:text-6xl font-serif tracking-tight uppercase">
          Curated Artifacts
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        {/* Large Feature Card (Spans 2 columns on desktop) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 group"
        >
          <div className="absolute inset-0 bg-oled-spotlight opacity-50 transition-opacity duration-700 group-hover:opacity-80" />
          <div className="absolute top-10 left-10 z-20">
            <span className="text-[#C8A97E] text-[10px] uppercase tracking-widest font-bold">Featured Masterpiece</span>
            <h3 className="text-white text-3xl font-serif mt-2">{featured[0]?.name}</h3>
          </div>
          
          <img 
            src={featured[0]?.image} 
            alt={featured[0]?.name}
            className="absolute inset-0 w-full h-full object-contain p-20 transform transition-transform duration-1000 group-hover:scale-110"
          />

          <div className="absolute bottom-10 right-10 z-20 flex items-center space-x-4">
             <span className="text-white/60 font-geometric text-sm">{formatPrice(featured[0]?.price || 0)}</span>
             <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ArrowUpRight size={20} />
             </button>
          </div>
        </motion.div>
        
        {/* Tall Detail Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 flex flex-col justify-end p-10 group"
        >
          <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
            <img src="/logo.png" className="w-12 h-12 filter grayscale" alt="TH" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white text-xl font-serif">Horological Heritage</h3>
            <p className="text-white/40 text-xs leading-relaxed font-geometric uppercase tracking-widest">
              Engineered with proprietary V-Series movements. Certified chronometer precision within +/- 2 seconds.
            </p>
            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-[#C8A97E] text-[10px] tracking-widest uppercase font-bold">Precision Lab</span>
              <span className="text-white/20 font-serif italic text-2xl">V.01</span>
            </div>
          </div>
        </motion.div>

        {/* Wide Secondary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 relative rounded-[2.5rem] h-[300px] bg-white/5 border border-white/5 flex items-center justify-between p-12 overflow-hidden group"
        >
          <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 text-[15vw] font-serif text-white/[0.02] pointer-events-none select-none">
            GENEVE
          </div>
          
          <div className="relative z-10 max-w-md">
            <h3 className="text-white text-2xl font-serif mb-2">The Heritage Collection</h3>
            <p className="text-white/40 text-xs font-geometric uppercase tracking-[0.2em]">
              Defining the future of Swiss excellence since 1924.
            </p>
          </div>

          <div className="relative z-10 flex -space-x-8">
            {featured.slice(1).map((watch, i) => (
              <img 
                key={i}
                src={watch.image} 
                className="w-48 h-48 object-contain transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4"
                style={{ transitionDelay: `${i * 100}ms` }}
                alt="Watch" 
              />
            ))}
          </div>

          <button className="absolute bottom-10 right-10 text-[10px] text-white/40 font-bold uppercase tracking-[0.4em] hover:text-[#C8A97E] transition-colors">
            Explore All Artifacts
          </button>
        </motion.div>
      </div>
    </section>
  );
}
