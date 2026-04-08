'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function CinematicHero() {
  const LUXURY_EASE = [0.25, 1, 0.5, 1];

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 bg-oled-spotlight pointer-events-none" />
      
      {/* Background Brand Mark */}
      <motion.h2 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: LUXURY_EASE }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[20vw] font-serif text-white whitespace-nowrap z-0 pointer-events-none select-none"
      >
        THE HOUR
      </motion.h2>

      {/* Hero Asset: 3D or Priority Fallback */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.2 }}
        className="relative z-20 w-[90%] md:w-full aspect-square max-w-[320px] md:max-w-[700px] mb-4 md:mb-8 cursor-grab active:cursor-grabbing"
      >
        <model-viewer
          src="/watch.glb"
          poster="/watch.png"
          alt="Masterpiece Timepiece"
          auto-rotate
          rotation-speed="0.5"
          camera-controls
          disable-zoom
          shadow-intensity="2"
          exposure="1.2"
          environment-image="neutral"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          className="w-full h-full"
          ar
          ar-modes="webxr scene-viewer quick-look"
        >
          {/* LCP Fallback: Using next/image with Priority */}
          <div slot="poster" className="w-full h-full flex items-center justify-center">
             <Image 
                src="/watch.png" 
                width={600}
                height={600}
                priority={true}
                className="w-[85%] object-contain drop-shadow-[0_20px_80px_rgba(200,169,126,0.2)] animate-float" 
                alt="Luxury Watch Showcase" 
             />
          </div>
        </model-viewer>
      </motion.div>

      {/* Cinematic Typography */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: LUXURY_EASE }}
        className="z-30 text-center flex flex-col items-center gap-3 md:gap-4 mb-8 md:mb-10 px-6"
      >
        <span className="text-[#C8A97E] text-[9px] md:text-xs tracking-[0.5em] uppercase font-bold">
          Ultimate Luxury Horology
        </span>
        <h1 className="text-3xl md:text-7xl font-serif text-white leading-tight uppercase tracking-tight">
          Masterpieces<br/>for the Elite
        </h1>
      </motion.div>

      {/* Primary CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="z-30"
      >
        <Link 
          href="/shop" 
          className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-full text-[10px] md:text-xs font-black tracking-[0.4em] uppercase hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-700 shadow-2xl overflow-hidden group relative"
        >
          <span className="relative z-10">Discover Collection</span>
        </Link>
      </motion.div>

      {/* Decorative Accents */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[7px] uppercase tracking-[0.5em] font-bold text-white">Digital Flagship 2026</span>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
