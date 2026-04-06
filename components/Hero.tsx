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

      {/* Content - Increased pt-32 for better header clearance */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20 md:pt-32"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          {/* Label */}
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold/50" />
            <span className="font-label text-gold flex items-center gap-2 tracking-[0.3em] text-[0.6rem] sm:text-[0.65rem]">
              <Sparkles size={11} className="animate-pulse" />
              Haute Horlogerie · Est. 2024
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.h1
              variants={line}
              className="font-display text-[clamp(2.5rem,11vw,7.5rem)] text-ivory leading-tight uppercase tracking-tight"
            >
              TIME IS
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.div variants={line}>
              <span className="font-display text-[clamp(2.5rem,11vw,7.5rem)] text-gold-gradient block uppercase tracking-tight">
                AN ART
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-10 md:mb-12">
            <motion.h1
              variants={line}
              className="font-display text-[clamp(2.2rem,10vw,7rem)] text-white/5 block uppercase tracking-tight italic"
            >
              FORM.
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.div variants={fadeUp} className="max-w-md mb-12">
            <p className="text-silver/80 font-inter font-light text-xl md:text-2xl tracking-tight leading-relaxed">
              Exceptional timepieces for those who understand that true luxury
              is the relentless pursuit of perfection.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex items-center gap-8 flex-wrap">
            <MagneticButton href="#collections">
              Discover Perfection
            </MagneticButton>
            <a
              href="#craftsmanship"
              className="group flex items-center gap-3 font-label text-silver hover:text-ivory transition-all duration-300"
            >
              <span className="link-underline">Our Story</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:translate-x-1 transition-all">
                <ArrowDown size={14} className="-rotate-[135deg]" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-6 lg:left-12 z-10 hidden sm:flex items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-t from-gold/50 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/4 bg-gold"
          />
        </div>
        <span className="font-label text-silver/40 text-[0.55rem] tracking-[0.4em] uppercase">Scroll to Explore</span>
      </motion.div>

      {/* Floating watch badge - Adjusted for responsiveness */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 hidden 2xl:block"
      >
        <div className="glass rounded-2xl p-6 w-56 glow-gold relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <p className="font-label text-gold/60 mb-4 text-[0.55rem] tracking-[0.3em]">Exemplary Piece</p>
          <div className="space-y-1 mb-6">
            <h3 className="font-syne font-800 text-ivory text-base">Éternel Tourbillon</h3>
            <p className="text-silver/60 text-[0.65rem] font-medium tracking-wide">Hand-Finished Platinum • 1 of 1</p>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-gold font-syne font-800 text-xl tracking-tight leading-none">$225k</p>
            <p className="text-silver/30 text-[0.6rem] font-light uppercase tracking-widest leading-none">Investment Grade</p>
          </div>
          <div className="h-[1px] bg-white/5 w-full" />
          <p className="font-label text-ivory/40 mt-4 text-[0.5rem] tracking-[0.2em]">Geneva Seal Certified</p>
        </div>
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
