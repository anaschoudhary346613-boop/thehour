'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Gem, Wrench, Eye, Trophy } from 'lucide-react';

const FEATURES = [
  {
    icon: <Gem size={20} className="text-gold" />,
    label: 'Rare Materials',
    title: 'Sourced From\nThe Finest Origins',
    body: 'Every component — from the platinum cases to the hand-selected alligator straps — is sourced directly from master artisans with decades of tradition. No compromises. Ever.',
    image: '/watch-04.png',
  },
  {
    icon: <Wrench size={20} className="text-gold" />,
    label: 'Master Craftsmanship',
    title: 'Over 1,200 Hours\nPer Timepiece',
    body: 'Our watchmakers, trained in the ateliers of Geneva and Le Sentier, spend over a thousand hours on each individual watch. Every surface is hand-chamfered, polished, and inspected under magnification.',
    image: '/watch-02.png',
  },
  {
    icon: <Eye size={20} className="text-gold" />,
    label: 'Obsessive Detail',
    title: 'Perfection Visible\nTo The Naked Eye',
    body: 'We apply a perlage finish to every surface invisible to the wearer. Not because anyone will see it — but because we will know it\'s there. This is the standard of The Hour.',
    image: '/watch-01.png',
  },
  {
    icon: <Trophy size={20} className="text-gold" />,
    label: 'Collector Heritage',
    title: 'Watches That Outlive\nGenerations',
    body: 'Each timepiece is accompanied by a certificate of provenance, a 25-year service guarantee, and an invitation to our private collector events held annually in Geneva.',
    image: '/watch-06.png',
  },
];

export default function FeaturesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="craftsmanship" className="py-24 md:py-32 relative overflow-hidden bg-obsidian">
      {/* Decorative localized glow */}
      <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Section header */}
      <SectionHeader />

      {/* Sticky showcase — desktop */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-12 mt-20">
        <div className="flex gap-20">
          {/* Sticky image container */}
          <div className="w-1/2 sticky top-32 h-[650px] self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
              >
                <Image
                  src={FEATURES[activeIdx].image}
                  alt={FEATURES[activeIdx].title}
                  fill
                  className="object-cover scale-[1.02]"
                  quality={100}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
                
                <div className="absolute bottom-10 left-10 flex flex-col gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-[1.5px] bg-gold" />
                    <span className="font-label text-gold tracking-[0.3em]">{FEATURES[activeIdx].label}</span>
                  </motion.div>
                </div>
                
                {/* Decorative grain */}
                <div className="noise-overlay opacity-[0.03]" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features list */}
          <div className="w-1/2 py-20">
            <div className="relative pl-12 border-l border-white/5 space-y-32">
              {/* Progress Line */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-[1.5px] bg-white/5 overflow-hidden">
                <motion.div 
                  className="w-full bg-gold shadow-[0_0_15px_rgba(184,151,58,0.4)]"
                  animate={{ 
                    height: `${((activeIdx + 1) / FEATURES.length) * 100}%` 
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {FEATURES.map((f, i) => (
                <FeatureItem
                  key={f.label}
                  feature={f}
                  index={i}
                  isActive={activeIdx === i}
                  onActive={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — stacked with staggered reveal */}
      <div className="lg:hidden max-w-screen-md mx-auto px-6 mt-16 space-y-12">
        {FEATURES.map((f, i) => (
          <MobileFeatureItem key={f.label} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="max-w-[1440px] mx-auto px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-4"
      >
        <span className="font-label text-gold/60 tracking-[0.4em]">Our Philosophy</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[clamp(2.5rem,6vw,5rem)] text-ivory leading-[0.9] uppercase tracking-tighter"
      >
        Where Every Detail<br />
        <span className="italic text-white/5">Tells a Story</span>
      </motion.h2>
    </div>
  );
}

function FeatureItem({
  feature, index, isActive, onActive,
}: {
  feature: (typeof FEATURES)[0]; index: number; isActive: boolean; onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActive(); },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative transition-all duration-700 cursor-pointer ${
        isActive ? 'opacity-100' : 'opacity-20 translate-x-4 grayscale'
      }`}
      onClick={onActive}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl border transition-all duration-500 ${
          isActive ? 'bg-gold/10 border-gold/30 text-gold shadow-lg glow-gold' : 'bg-white/5 border-white/5 text-silver/40'
        }`}>
          {feature.icon}
        </div>
        <span className={`font-label tracking-[0.3em] transition-colors duration-500 ${isActive ? 'text-gold' : 'text-silver/40'}`}>
          Phase 0{index + 1}
        </span>
      </div>

      <h3 className="font-display text-3xl md:text-5xl text-ivory mb-6 max-w-lg leading-tight uppercase">
        {feature.title.split('\n').map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h3>

      <div className="overflow-hidden">
        <motion.p
          animate={{ 
            opacity: isActive ? 0.6 : 0, 
            height: isActive ? 'auto' : 0,
            y: isActive ? 0 : 20
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-silver/80 font-inter font-light leading-relaxed text-base max-w-sm"
        >
          {feature.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

function MobileFeatureItem({
  feature, index,
}: {
  feature: (typeof FEATURES)[0]; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-[2rem] overflow-hidden border border-white/5 group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={feature.image} 
          alt={feature.title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="absolute top-6 left-6 p-3 glass rounded-xl border-white/10 text-gold">
          {feature.icon}
        </div>
      </div>
      <div className="p-8">
        <span className="font-label text-gold tracking-[0.25em] text-[0.6rem]">0{index + 1} • {feature.label}</span>
        <h3 className="font-display text-2xl text-ivory mt-4 mb-4 uppercase tracking-tight">{feature.title}</h3>
        <p className="text-silver/60 font-inter font-light text-sm leading-relaxed">{feature.body}</p>
      </div>
    </motion.div>
  );
}

