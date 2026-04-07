'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const SUGGESTIONS = [
  'Royal Heritage',
  'Tourbillon Complications',
  'Midnight Obsidian',
  'Rose Gold Classics',
  'Azure Navigator'
];

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center pt-24 px-6"
    >
      {/* Close Button */}
      <button 
        onClick={closeSearch}
        className="absolute top-8 right-8 p-2 text-white/40 hover:text-[#C8A97E] transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="max-w-4xl w-full space-y-12">
        {/* Search Header */}
        <div className="space-y-4 text-center">
          <p className="text-[#C8A97E] uppercase tracking-[0.4em] text-xs font-medium">Bespoke search</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white">Find Your Timepiece</h2>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our collection..."
            className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-4xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-[#C8A97E] transition-colors"
          />
          <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C8A97E] transition-colors" size={28} />
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div className="space-y-6">
            <h3 className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold">Trending Searches</h3>
            <div className="flex flex-wrap gap-3">
              {SUGGESTIONS.map((s) => (
                <button 
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 border border-white/5 bg-white/5 text-white/60 text-xs hover:border-[#C8A97E] hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold">Featured Collections</h3>
             <div className="space-y-4">
                {['The Heritage Series', 'Complications Boutique', 'Modern Minimalist'].map((collection) => (
                  <button key={collection} className="flex items-center justify-between w-full group py-2">
                    <span className="text-lg font-serif text-white/80 group-hover:text-[#C8A97E] transition-colors">{collection}</span>
                    <ArrowRight size={16} className="text-white/20 group-hover:text-[#C8A97E] group-hover:translate-x-2 transition-all" />
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Background Monogram */}
      <div className="absolute bottom-[-10vw] left-[-5vw] text-[30vw] font-serif text-white/[0.02] pointer-events-none select-none -rotate-12">
        TH
      </div>
    </motion.div>
  );
}
