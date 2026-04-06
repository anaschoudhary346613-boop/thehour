'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';
import { useState } from 'react';

export default function Hero({ featuredWatch }: { featuredWatch?: any }) {
  const { addItem } = useCart();
  const [hasImageError, setHasImageError] = useState(false);

  // Fallback if DB fetch fails
  const product = featuredWatch || {
    id: 'th-hero-chronograph',
    name: 'The Hour Chronograph',
    brand: 'Garner & Spruces',
    price: 4999,
    description: 'PRECISION, ELEGANCE, AND A LEGACY OF TIME.',
    image_url: '/hero-watch.png',
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pb-16 md:pb-0">
      {/* Layer 1: The Backgrounds (z-0) */}
      <div className="absolute inset-0 z-0 flex w-full h-full">
        <div className="w-1/2 h-full bg-black"></div>
        <div className="w-1/2 h-full bg-[#C8A97E]"></div>
      </div>

      {/* Layer 2: The Content Wrapper (z-10, MUST NOT BE HIDDEN) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 pt-12 md:static">

        {/* TOP: Logo */}
        <div className="absolute top-6 left-6 z-20 md:hidden">
          <img
            src="/image_3.png"
            alt="The Hour Logo - Metallic Gold Emblem"
            className="object-contain h-10 w-auto"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'block';
              }
            }}
          />
          <span className="font-serif text-[#C5A059] uppercase tracking-[0.3em] font-bold text-xl hidden">
            THE HOUR
          </span>
        </div>

        {/* MIDDLE: Floating Watch */}
        <div className="relative z-20 w-[280px] h-[280px] md:w-[600px] md:h-auto my-8 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex justify-center items-center">
          {!hasImageError ? (
            <img
              src="/hero-watch.png"
              alt="Luxury Watch"
              className="object-contain w-full h-full drop-shadow-2xl"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="w-full h-full aspect-square bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full animate-pulse shadow-2xl" />
          )}

          {/* Floating "+" Button */}
          <button
            onClick={() => addItem(product)}
            className="absolute z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 hover:scale-110 cursor-pointer transition-all bottom-2 right-4 md:bottom-20 md:right-12 pointer-events-auto shadow-2xl"
            aria-label="Add to cart"
          >
            <span className="text-[#C8A97E] text-2xl font-light mb-1">+</span>
          </button>
        </div>

        {/* BOTTOM: Text and Button */}
        <div className="relative z-20 flex flex-col items-center text-center mt-6 md:absolute md:left-24 md:top-1/2 md:-translate-y-1/2 md:items-start md:text-left md:mt-0">
          <h1 className="text-white md:text-[#C8A97E] text-4xl md:text-7xl font-serif font-black mb-2 md:mb-4 uppercase tracking-tighter">Garner & Spruces</h1>
          <p className="hidden md:block text-[10px] md:text-sm tracking-widest text-[#C8A97E]/60 uppercase mb-4 md:mb-8">
            PRECISION, ELEGANCE, AND A LEGACY OF TIME.
          </p>
          <p className="text-[#C5A059] md:text-white text-5xl md:text-7xl font-bold font-sans mb-8 tracking-tight">$4,999</p>
          <button
            onClick={() => addItem(product)}
            className="bg-[#DBC197] text-black px-10 py-3 md:px-12 md:py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
