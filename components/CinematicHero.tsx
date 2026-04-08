'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
          <div className="flex flex-col items-center gap-4 mb-4">
             <h2 className="text-[10px] md:text-sm uppercase tracking-[0.5em] text-[#C8A97E] font-sans font-medium">
               Best Luxury Watches
             </h2>
          </div>
          
          <h3 className="text-3xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
            Premium Watches <br /> for Every Person
          </h3>
          
          <div className="flex justify-center pointer-events-auto">
            <MagneticButton>
              <Link href="/shop" className="block">
                <button className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-10 py-5 rounded-full uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-300 active:scale-95">
                  See Our Watches
                </button>
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Cleanup: Removed the stray vertical scroll line */}
    </section>
  );
}
