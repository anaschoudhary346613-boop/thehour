'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CinematicHero() {
  return (
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden flex items-center justify-center">
      {/* Volumetric Spotlighting */}
      <div className="absolute inset-0 z-0 bg-oled-spotlight" />
      
      {/* Kinetic Typography (Behind Watch) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center z-10 select-none pointer-events-none"
      >
        <span className="text-[25vw] font-serif font-black text-white/[0.03] tracking-tighter uppercase whitespace-nowrap">
          THE HOUR
        </span>
      </motion.div>

      {/* Floating Hero Watch */}
      <div className="relative z-20 w-full max-w-lg md:max-w-2xl px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Internal Glow for Watch Depth */}
          <div className="absolute w-[60%] h-[60%] bg-[#C8A97E]/30 blur-[120px] rounded-full pointer-events-none" />
          
          <img 
            src="/hero-watch.png" 
            alt="The Heritage Masterpiece"
            className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(200,169,126,0.2)]"
          />
        </motion.div>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute bottom-16 left-0 w-full flex flex-col items-center z-30 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-[#C8A97E] font-geometric text-[10px] uppercase tracking-[0.5em] mb-4">
            Horology Reimagined
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-serif tracking-tight lowercase italic">
            the master series
          </h2>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-700 hover:scale-105 active:scale-95"
        >
          Discover Discovery
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-12 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C8A97E] to-transparent opacity-40" />
      </motion.div>
    </section>
  );
}
