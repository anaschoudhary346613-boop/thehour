'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { User, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const ACTIONS = [
  {
    icon: <User size={24} />,
    title: 'Client Portal',
    description: 'Manage your collection, track orders, and access exclusive owner benefits.',
    cta: 'Manage Account',
    href: '#',
    accent: 'gold'
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'Concierge Online',
    description: 'Direct access to our Geneva-based specialists for bespoke consultation.',
    cta: 'Start Conversation',
    href: 'https://wa.me/919860948892',
    accent: 'white'
  }
];

export default function FeaturesShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-20 bg-obsidian relative overflow-hidden" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACTIONS.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="h-full glass rounded-[2rem] p-10 flex flex-col border border-white/5 hover:border-gold/20 transition-colors duration-500 overflow-hidden">
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${action.accent}/5 rounded-full blur-[60px] group-hover:bg-${action.accent}/10 transition-colors duration-500`} />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 ${
                  action.accent === 'gold' 
                    ? 'bg-gold/10 border-gold/20 text-gold group-hover:scale-110 glow-gold' 
                    : 'bg-white/5 border-white/10 text-ivory group-hover:scale-110'
                }`}>
                  {action.icon}
                </div>

                <h3 className="font-display text-3xl text-ivory mb-4 uppercase tracking-tight">{action.title}</h3>
                <p className="text-silver/60 font-inter font-light text-lg leading-relaxed mb-10 max-w-sm">
                  {action.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center gap-4 text-sm font-label tracking-widest uppercase">
                    <span className={action.accent === 'gold' ? 'text-gold' : 'text-ivory'}>{action.cta}</span>
                    <div className={`w-8 h-[1px] ${action.accent === 'gold' ? 'bg-gold' : 'bg-ivory'} transition-all duration-500 group-hover:w-16`} />
                  </div>
                </div>
                
                <Link href={action.href} className="absolute inset-0 z-10" aria-label={action.title} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { icon: <ShieldCheck size={16} />, label: 'Guaranteed Authenticity' },
            { icon: <Zap size={16} />, label: 'Insured Priority Shipping' },
            { icon: <User size={16} />, label: 'Bespoke Private Viewings' },
            { icon: <MessageSquare size={16} />, label: '24/7 Expert Support' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-dark border border-white/5"
            >
              <div className="text-gold/60">{item.icon}</div>
              <span className="font-label text-silver/40 text-[0.6rem] tracking-wider">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

