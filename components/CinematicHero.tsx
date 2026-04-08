'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden bg-[#0A0A0A]">
      {/* 5. THE BACKGROUND TEXT (BEHIND EVERYTHING) */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-white/[0.03] whitespace-nowrap z-0 pointer-events-none select-none uppercase tracking-tighter">
        THE HOUR
      </h2>

      {/* Volumetric Spotlight (Aesthetic Support) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] bg-[#C8A97E]/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. RESTORE THE TRANSPARENT WATCH & ROTATION (FRAMER MOTION) */}
      <motion.img 
        src="/watch.png" 
        alt="The Hour Timepiece" 
        className="w-[85%] md:w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(200,169,126,0.2)] z-20" 
        animate={{ 
          y: [0, -15, 0], 
          rotate: [0, 2, -2, 0] 
        }} 
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }} 
      />

      {/* 3. THE BUTTON PLACEMENT */}
      <div className="z-30 mt-12 relative">
        <Link 
          href="/shop" 
          className="border border-[#C8A97E]/50 bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          Discover Collection
        </Link>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-white">Scroll</span>
      </div>
    </section>
  );
}
