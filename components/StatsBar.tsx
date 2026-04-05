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

      {/* Stats */}
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-gold/20 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                {stat.icon}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="font-display text-4xl text-gold-gradient mb-1"
              >
                {stat.value}
              </motion.p>
              <p className="font-label text-silver">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
