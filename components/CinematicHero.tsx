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
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
      {/* 2. THE BACKGROUND TEXT */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[18vw] font-serif text-white/5 whitespace-nowrap z-0 pointer-events-none select-none">
        THE HOUR
      </h2>

      {/* 3. THE 3D ROTATING WATCH (WATCH.GLB) */}
      <div className="relative z-20 w-full aspect-square max-w-[450px] md:max-w-[700px] mb-8 cursor-grab active:cursor-grabbing">
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
             <img src="/watch.png" className="w-[80%] object-contain drop-shadow-[0_20px_50px_rgba(200,169,126,0.3)] animate-float" alt="Watch Fallback" />
          </div>
        </model-viewer>
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

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-white">Editorial Flagship</span>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
