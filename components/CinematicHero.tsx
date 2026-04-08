'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-40 overflow-hidden bg-black font-sans">
      {/* 5. THE BACKGROUND TEXT (BEHIND EVERYTHING) */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-white/[0.03] whitespace-nowrap z-0 pointer-events-none select-none uppercase tracking-tighter">
        THE HOUR
      </h2>

      {/* Volumetric Spotlight (Aesthetic Support) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] bg-[#C8A97E]/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. THE HEADING (TOP) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-30 text-center mb-8 md:mb-12 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-[0.2em] leading-tight md:leading-[1.2]">
          Premium Watches<br />For Every Person
        </h1>
      </motion.div>

      {/* 3. THE WATCH (MIDDLE) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[400px] md:max-w-[500px] flex justify-center items-center"
      >
        <img 
          src="/hero-watch.png" 
          className="w-[80%] md:w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)] filter brightness-110" 
          alt="Luxury Watch" 
        />
        
        {/* Subtle Glow behind watch */}
        <div className="absolute inset-0 bg-[#C8A97E]/10 rounded-full blur-[80px] -z-10 animate-pulse" />
      </motion.div>

      {/* 4. THE BUTTON (BOTTOM) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-30 mt-12 md:mt-16"
      >
        <Link 
          href="/shop" 
          className="border border-[#C8A97E]/40 bg-black/40 backdrop-blur-md text-white px-10 py-5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-500 shadow-2xl inline-block"
        >
          Discover Collection
        </Link>
      </motion.div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-white">Scroll</span>
      </div>
    </section>
  );
}
