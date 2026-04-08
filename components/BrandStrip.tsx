'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BRANDS = [
  { name: 'Rolex', logo: 'RLX' },
  { name: 'Patek Philippe', logo: 'PP' },
  { name: 'Audemars Piguet', logo: 'AP' },
  { name: 'Omega', logo: 'Ω' },
  { name: 'Cartier', logo: 'C' },
  { name: 'Richard Mille', logo: 'RM' },
];

export default function BrandStrip() {
  return (
    <section className="py-16 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-white text-xl font-bold tracking-tight uppercase">Shop By Brand</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x pb-8 px-6 no-scrollbar scroll-smooth">
        {BRANDS.map((brand, idx) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center gap-4 snap-center group cursor-pointer"
          >
            <Link href={`/shop?brand=${brand.name.toLowerCase()}`} className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white/[0.03] rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#C8A97E] group-hover:bg-white/[0.07] transition-all duration-500 shadow-2xl relative overflow-hidden">
                <span className="text-white/40 group-hover:text-white transition-colors text-2xl font-serif tracking-tighter">
                  {brand.logo}
                </span>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <span className="text-white/60 group-hover:text-[#C8A97E] text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                {brand.name}
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">&rarr;</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
