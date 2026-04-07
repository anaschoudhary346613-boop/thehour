'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const CATEGORIES = [
  {
    name: 'Dress Timepieces',
    description: 'Elegant simplicity for formal occasions.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80',
    slug: 'dress'
  },
  {
    name: 'Dive Masters',
    description: 'Rugged performance beneath the waves.',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80',
    slug: 'dive'
  },
  {
    name: 'Chronographs',
    description: 'Precision timing for the racing elite.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    slug: 'chrono'
  },
  {
    name: 'Grand Complications',
    description: 'The pinnacle of horological engineering.',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80',
    slug: 'complications'
  }
];

export default function CategoriesModal() {
  const { isCategoriesOpen, closeCategories } = useUIStore();

  if (!isCategoriesOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 z-[200] w-full md:w-[600px] bg-[#0A0A0A] border-l border-[#C8A97E]/20 overflow-y-auto"
    >
      <div className="p-8 md:p-12 min-h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="space-y-2">
            <p className="text-[#C8A97E] uppercase tracking-[0.4em] text-[10px] font-medium">Browse by style</p>
            <h2 className="text-3xl font-serif text-white uppercase tracking-wider">Collections</h2>
          </div>
          <button 
            onClick={closeCategories}
            className="p-2 text-white/40 hover:text-[#C8A97E] transition-colors"
          >
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8 flex-grow">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-48 overflow-hidden cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
              
              <div className="relative z-20 h-full p-8 flex flex-col justify-center max-w-xs">
                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#C8A97E] transition-colors">{cat.name}</h3>
                <p className="text-[#E3CBA8]/50 text-[10px] uppercase tracking-widest leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-[#C8A97E] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Branding */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.5em] text-white/20">
          <span>The Hour</span>
          <span className="font-serif italic text-white/10 text-4xl">TH</span>
        </div>
      </div>
    </motion.div>
  );
}
