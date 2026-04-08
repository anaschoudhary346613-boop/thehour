'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutCard() {
  return (
    <section className="px-6 md:px-12 mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
      >
        {/* Top Half (Image) */}
        <div className="h-[300px] md:h-[450px] w-full relative overflow-hidden">
          <img 
            src="/about-story.png" 
            className="object-cover w-full h-full opacity-60 transition-transform duration-[3s] hover:scale-110" 
            alt="The Hour Boutique"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* Bottom Half (Content) */}
        <div className="p-10 md:p-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#C8A97E] text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold mb-6"
          >
            We Are
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-7xl font-serif text-white mb-8 uppercase tracking-tighter"
          >
            The Hour
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-sm md:text-lg leading-relaxed mb-12 font-light max-w-2xl px-4"
          >
            Our commitment is to provide unparalleled quality because you deserve nothing but the finest. Join us on this journey where your style meets our passion, allowing you to keep flexing with the classiest timepieces around.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/shop">
              <button className="bg-white text-black font-bold uppercase text-[10px] md:text-xs px-12 py-5 rounded-full tracking-[0.3em] hover:bg-[#C8A97E] hover:scale-105 transition-all duration-300 active:scale-95 shadow-xl">
                Shop All Watches
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
