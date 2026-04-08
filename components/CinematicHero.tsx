'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
      {/* 2. THE BACKGROUND TEXT */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">
        THE HOUR
      </h2>

      {/* 3. THE ROTATING 3D WATCH (TOP ELEMENT) */}
      <div className="relative z-20 w-full max-w-[350px] md:max-w-[500px] mb-8">
        <motion.img 
          src="/watch.png" 
          alt="3D Luxury Watch" 
          className="w-full object-contain drop-shadow-[0_20px_50px_rgba(200,169,126,0.15)]" 
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
        />
      </div>

      {/* 4. THE TYPOGRAPHY (MIDDLE ELEMENT) */}
      <div className="z-30 text-center flex flex-col items-center gap-4 mb-10">
        <span className="text-[#C8A97E] text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
          Best Luxury Watches
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
          Premium Watches<br/>for Every Person
        </h1>
      </div>

      {/* 5. THE BUTTON (BOTTOM ELEMENT) */}
      <div className="z-30">
        <Link 
          href="/shop" 
          className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-300"
        >
          Discover Collection
        </Link>
      </div>

      {/* Aesthetic Accents (Subtle additions to anchor the layout) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-white">Editorial Flagship</span>
      </div>
    </section>
  );
}
