'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Automatics', image: '/cat-automatics.png', link: '/shop?category=automatic' },
  { name: 'Chronographs', image: '/cat-chronographs.png', link: '/shop?category=chronograph' },
  { name: 'Heritage', image: '/cat-heritage.png', link: '/shop?category=heritage' },
];

export default function CategoryBanners() {
  return (
    <section className="flex flex-col gap-6 px-6 md:px-12 mb-20">
      {CATEGORIES.map((category, idx) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          className="relative w-full h-[280px] md:h-[450px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5"
        >
          <Link href={category.link} className="block w-full h-full">
            {/* Background Image */}
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
            
            {/* Center Pill Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-xl bg-black/40 border border-white/20 text-white px-10 py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] shadow-2xl transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white"
              >
                Shop {category.name}
              </motion.div>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
