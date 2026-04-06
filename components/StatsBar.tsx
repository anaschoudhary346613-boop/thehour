'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Award, Globe, Users } from 'lucide-react';

const STATS = [
  { value: '1,200+', label: 'Hours Per Watch', icon: <Clock size={18} className="text-gold" /> },
  { value: '47', label: 'Watchmaking Awards', icon: <Award size={18} className="text-gold" /> },
  { value: '62', label: 'Countries Served', icon: <Globe size={18} className="text-gold" /> },
  { value: '8,400+', label: 'Collectors Worldwide', icon: <Users size={18} className="text-gold" /> },
];

const MARQUEE_ITEMS = [
  'Haute Horlogerie', 'Tourbillon', 'Perpetual Calendar', 'Skeleton Dial',
  'Grand Complication', 'Hand-Engraved', 'Swiss Made', 'In-House Movement',
  'Limited Edition', 'Collectors Choice', 'Haute Horlogerie', 'Tourbillon',
  'Perpetual Calendar', 'Skeleton Dial', 'Grand Complication', 'Hand-Engraved',
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Marquee ticker */}
      <div className="border-y border-white/5 py-4 mb-20 overflow-hidden">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-8 px-8 shrink-0">
              <span className="font-label text-silver/40 whitespace-nowrap">{item}</span>
              <span className="text-gold/30">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Heritage Statement */}
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-3xl mx-auto"
        >
          <span className="font-label text-gold/40 tracking-[0.6em] uppercase text-[0.6rem] mb-6 block">The Standard</span>
          <h2 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] text-ivory/90 leading-tight uppercase tracking-tight">
            Crafted for those who understand that <br />
            <span className="text-gold-gradient">perfection is a journey, not a destination.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
