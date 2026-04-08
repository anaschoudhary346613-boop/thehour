'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Award, Landmark } from 'lucide-react';

export default function HeritagePage() {
  const sections = [
    {
      title: "Artisanal Excellence",
      description: "Every timepiece in THE HOUR vault is curated based on a rigorous 48-point standard of excellence. We don't just sell watches; we preserve legacies.",
      icon: <Award size={32} strokeWidth={1} />,
      image: "/cat-heritage.png"
    },
    {
      title: "The Geneva Vault",
      description: "Our private laboratory in Geneva is where provenance meets perfection. Each serial number is cross-referenced with manufacturer archives to ensure 100% authenticity.",
      icon: <Shield size={32} strokeWidth={1} />,
      image: "/about-story.png"
    },
    {
      title: "Generational Craft",
      description: "We work exclusively with master horologists who have dedicated their lives to the preservation of mechanical art. This is horology beyond the surface.",
      icon: <Landmark size={32} strokeWidth={1} />,
      image: "/cat-automatics.png"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24 overflow-hidden">
      {/* Editorial Header */}
      <section className="px-6 md:px-12 mb-32 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.6em] font-bold">Heritage & Craft</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white max-w-4xl leading-tight">
            The Preservation<br/>of Time.
          </h1>
          <p className="text-white/40 text-sm md:text-lg max-w-2xl font-light leading-relaxed">
            THE HOUR was founded on a singular principle: that a timepiece is more than a tool—it is a vessel for history, engineering, and personal legacy.
          </p>
        </motion.div>
      </section>

      {/* Feature Sections */}
      <div className="flex flex-col gap-40 px-6 md:px-12 max-w-7xl mx-auto">
        {sections.map((section, idx) => (
          <section key={idx} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                <img src={section.image} className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]" alt={section.title} />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="text-[#C8A97E]">
                {section.icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {section.title}
              </h2>
              <p className="text-white/30 text-sm md:text-base leading-loose max-w-md">
                {section.description}
              </p>
              <div className="h-px w-24 bg-[#C8A97E]/30" />
            </motion.div>
          </section>
        ))}
      </div>

      {/* Bottom Call to Action */}
      <section className="mt-60 px-6 md:px-12 text-center flex flex-col items-center gap-12">
        <h3 className="text-white/20 text-[10vw] font-serif uppercase leading-none select-none">
          Legacy.
        </h3>
        <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-bold">
          Enter the vault to begin your collection
        </p>
        <a href="/shop" className="border border-white/20 px-12 py-6 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Explore The Collection
        </a>
      </section>
    </main>
  );
}
