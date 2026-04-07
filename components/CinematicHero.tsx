'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import WatchScene from './WatchScene';

export default function CinematicHero() {
  return (
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden flex items-center justify-center">
      {/* Volumetric Spotlight Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#C8A97E]/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
      </div>

      {/* Cinematic Perspective Text (Behind 3D) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[20vw] font-serif font-black text-white whitespace-nowrap tracking-tighter"
        >
          THE HOUR
        </motion.h1>
      </div>

      {/* WebGL 3D Canvas Layer */}
      <div className="absolute inset-0 z-10 py-20 md:py-32">
        <WatchScene />
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 md:pb-24 px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="text-[10px] md:text-sm uppercase tracking-[0.5em] text-[#C8A97E] mb-4 font-sans font-medium">
            Exclusively Curated
          </h2>
          <h3 className="text-3xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
            The New Era of <br /> Luxury Timekeeping
          </h3>
          
          <div className="flex justify-center pointer-events-auto">
            <MagneticButton>
              <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-black font-sans font-bold uppercase tracking-widest text-[10px] md:text-xs overflow-hidden transition-transform active:scale-95"
              >
                <span className="relative z-10">Discover Collection</span>
                <motion.div 
                  className="absolute inset-0 bg-[#C8A97E] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
                />
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/0 via-[#C8A97E]/50 to-white/0" />
      </motion.div>
    </section>
  );
}
