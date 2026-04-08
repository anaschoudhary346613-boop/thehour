'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function CinematicHero() {
  useEffect(() => {
    // Dynamically load model-viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#0A0A0A]">
      {/* 2. THE BACKGROUND TEXT */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[20vw] font-serif text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">
        THE HOUR
      </h2>

      {/* 3. THE 3D ROTATING WATCH (WATCH.GLB) */}
      <div className="relative z-20 w-[90%] md:w-full aspect-square max-w-[320px] md:max-w-[700px] mb-4 md:mb-8 cursor-grab active:cursor-grabbing">
        <model-viewer
          src="/watch.glb"
          poster="/watch.png"
          alt="3D Gold G-Shock"
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
          {/* Fallback image if 3D fails */}
          <div slot="poster" className="w-full h-full flex items-center justify-center">
             <img src="/watch.png" className="w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(200,169,126,0.3)] animate-float" alt="Watch Fallback" />
          </div>
        </model-viewer>
      </div>

      {/* 4. THE TYPOGRAPHY */}
      <div className="z-30 text-center flex flex-col items-center gap-3 md:gap-4 mb-8 md:mb-10 px-6">
        <span className="text-[#C8A97E] text-[9px] md:text-xs tracking-[0.4em] uppercase font-bold">
          Ultimate Luxury Horology
        </span>
        <h1 className="text-3xl md:text-6xl font-serif text-white leading-tight uppercase tracking-tight">
          Masterpieces<br/>for the Elite
        </h1>
      </div>

      {/* 5. THE BUTTON */}
      <div className="z-30">
        <Link 
          href="/shop" 
          className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-[9px] md:text-xs font-black tracking-[0.3em] uppercase hover:bg-[#C8A97E] hover:text-black hover:border-[#C8A97E] transition-all duration-500 shadow-2xl"
        >
          Discover Collection
        </Link>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[7px] uppercase tracking-[0.5em] font-bold text-white">Digital Boutique v2</span>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
