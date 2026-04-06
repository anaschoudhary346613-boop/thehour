'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PromoBanner() {
  return (
    <section className="py-24 bg-black px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-[1px] bg-gold/50" />
            <h2 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-widest">Best Sellers</h2>
            <div className="w-8 h-[1px] bg-gold/50" />
          </div>
          <p className="font-label text-[0.6rem] text-gold/60 uppercase tracking-[0.3em]">Most Popular Picks</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="group relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/5 bg-onyx transition-all duration-700 hover:border-gold/30"
        >
          <Image 
            src="/watch-02.png" 
            alt="Promo Banner" 
            fill 
            className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-5xl text-white uppercase tracking-widest mb-6 px-4"
            >
              Swiss Made Precision
            </motion.h3>
            <p className="font-label text-xs md:text-sm text-silver/60 uppercase tracking-[0.4em] mb-12">
              Crafted to Perfection
            </p>
            
            <button className="px-10 py-4 rounded-full bg-white text-black font-syne font-800 text-[0.65rem] tracking-[0.2em] uppercase hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
