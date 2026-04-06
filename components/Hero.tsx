'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-black flex flex-col items-center text-center">
      {/* Sub-header */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-label text-[0.65rem] text-gold/60 tracking-[0.4em] uppercase mb-12"
      >
        Exclusive Timepieces for the Elite
      </motion.p>

      {/* Main Headline */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-8xl text-white uppercase tracking-tight leading-[0.9] mb-4"
        >
          Elevate Your Style
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-label text-xs md:text-sm text-silver/40 tracking-[0.3em] uppercase"
        >
          Discover Luxury Watches
        </motion.p>
      </div>

      {/* Shop Now Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-12 py-5 rounded-full bg-onyx border border-white/10 text-white font-syne font-800 text-xs tracking-[0.2em] uppercase hover:bg-black hover:border-gold transition-all duration-300 mb-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        Shop Now
      </motion.button>

      {/* Hero Image Container */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[800px] aspect-square md:aspect-video -mt-10 px-4 group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <Image
          src="/watch-01.png"
          alt="Luxury Watch Showcase"
          fill
          className="object-contain transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </section>
  );
}
