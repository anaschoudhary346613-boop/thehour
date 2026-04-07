'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] shrink-0 overflow-hidden">
      {/* 50/50 Split Background - Trapped inside Hero */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-1/2 h-full bg-[#0A0A0A]"></div>
        <div className="w-1/2 h-full bg-[#C8A97E]"></div>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Monogram Backsplash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white/5 pointer-events-none select-none">
          TH
        </div>

        {/* Central Vertical Line (Optional Aesthetic) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 z-0"></div>

        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Serif Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6 text-center md:text-left"
          >
            <h2 className="text-[#C8A97E] uppercase tracking-[0.4em] text-sm font-medium">
              Bespoke Timekeepers
            </h2>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight">
              The <br />
              <span className="italic">Heritage</span> <br />
              Collection
            </h1>
            <button className="mt-8 px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#C8A97E] hover:text-white transition-colors duration-300 w-fit self-center md:self-start">
              Explore Now
            </button>
          </motion.div>

          {/* Right Side: Central Watch Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center items-center h-[50vh] md:h-auto"
          >
            {/* The primary watch image would go here */}
            <div className="relative w-full aspect-square max-w-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80" 
                alt="Luxury Watch"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            {/* Floating Spec Tags */}
            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
               <p className="text-[10px] uppercase tracking-widest text-[#E3CBA8]">Swiss Auto</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </div>
    </section>
  );
}
