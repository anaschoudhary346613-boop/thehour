'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const line = {
  hidden: { opacity: 0, y: 80 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const ModelViewer = 'model-viewer' as any;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleP = useTransform(scrollYProgress, [0, 1], [1, 1.15]); // Renamed to avoid confusion

  return (
    <section ref={ref} className="relative h-screen min-h-[750px] overflow-hidden flex items-center">
      {/* Background Layer (Handles Parallax) */}
      <motion.div style={{ y, scale: scaleP }} className="absolute inset-0 z-0 will-change-transform">
        {/* Animation Layer (Handles CSS Ken Burns ZOOM only) */}
        <div className="relative w-full h-full ken-burns overflow-hidden">
          <Image
            src="/watch-06.png"
            alt="The Hour - Éternel Tourbillon hero watch"
            fill
            priority
            className="object-cover object-center scale-[1.05]"
            quality={100}
          />
        </div>
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />
        <div className="absolute inset-0 bg-obsidian/20" />
        
        {/* Cinematic Lens Flare */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen z-0"
        />
      </motion.div>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Content - Systematic Vertical Flow */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 md:py-32"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          
          {/* Watch 3D Viewer Container */}
          <div className="watch-container relative w-full h-[400px] md:h-[600px] flex items-center justify-center mb-12">
            {/* Live 3D Indicator */}
            <div className="absolute top-0 right-0 md:top-10 md:right-10 z-20 flex items-center gap-2 px-3 py-1.5 glass border border-gold/30 rounded-full animate-fade-up">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-label text-[0.55rem] text-gold tracking-widest uppercase">Live 3D View</span>
            </div>

            {/* Custom element bypass for TypeScript build */}
            <ModelViewer 
              src="/models/watch_model.glb" 
              ar 
              ar-modes="webxr scene-viewer quick-look" 
              camera-controls 
              poster="/watch-06.png" 
              shadow-intensity="1" 
              auto-rotate 
              rotation-per-second="10deg"
              interaction-prompt="auto"
              style={{ width: '100%', height: '100%', '--poster-color': 'transparent' } as any}
              alt="A 3D model of the Éternel Tourbillon watch"
            >
              <button slot="ar-button" style={{ backgroundColor: '#D4AF37', borderRadius: '4px', border: 'none', position: 'absolute', top: '16px', right: '16px', padding: '10px' }}>
                  View in AR
              </button>
            </ModelViewer>
          </div>

          <motion.div variants={fadeUp} className="text-center">
            {/* Headline - Simplified */}
            <motion.h1
              variants={line}
              className="font-display text-4xl md:text-7xl lg:text-8xl text-ivory leading-tight uppercase tracking-tight mb-8"
            >
              The Art of Precision
            </motion.h1>

            {/* Product info line in solid gold */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-y border-[#D4AF37]/20 py-6 mb-12">
               <span className="font-syne font-800 text-lg md:text-2xl text-[#D4AF37] uppercase tracking-tighter">Éternel Tourbillon</span>
               <span className="hidden md:block w-8 h-[1px] bg-[#D4AF37]/40" />
               <span className="font-syne font-800 text-lg md:text-2xl text-[#D4AF37] tracking-tighter">$225,000</span>
            </div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 flex-wrap">
              <MagneticButton href="#collections">
                Explore Collection
              </MagneticButton>
              <a
                href="#craftsmanship"
                className="group flex items-center gap-3 font-label text-silver hover:text-white transition-all duration-300"
              >
                <span className="link-underline">Our Heritage</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:translate-x-1 transition-all">
                  <ArrowDown size={14} className="-rotate-[135deg]" />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 150 });
  const springY = useSpring(y, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    // Damped movement
    x.set(mouseX * 0.4);
    y.set(mouseY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="magnetic-btn px-8 py-4 rounded-full bg-gold text-obsidian font-syne font-700 text-sm tracking-wider uppercase hover:bg-gold-light transition-colors duration-300 glow-gold animate-pulse-glow"
    >
      {children}
    </motion.a>
  );
}
