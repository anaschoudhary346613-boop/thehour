'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';

export default function Hero({ featuredWatch }: { featuredWatch?: any }) {
  const { addItem } = useCart();

  const product = featuredWatch || {
    id: 'th-hero-chronograph',
    name: 'The Hour Chronograph',
    price: 4999,
    image_url: '/hero-watch.png',
  };

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* 1. Split Background (50/50) */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-1/2 h-full bg-[#0A0A0A]"></div>
        <div className="w-1/2 h-full bg-[#B5915F]"></div>
      </div>

      {/* 2. Floating Hero Watch (Top 45%) */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[80%] max-w-[350px]"
      >
        <img 
          src="/hero-watch.png" 
          alt="The Hour Signature Timepiece" 
          className="w-full h-auto object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop';
          }}
        />
        
        {/* Subtle Glow Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent blur-2xl -z-10" />
      </motion.div>

      {/* 3. Hero Text Content (Bottom Center) */}
      <div className="absolute bottom-[10%] left-0 w-full z-30 flex flex-col items-center text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-playfair text-white text-5xl md:text-7xl font-black uppercase tracking-[0.2em] mb-2"
        >
          The Hour
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white font-sans font-black text-6xl md:text-8xl mb-8 tracking-tighter"
        >
          $4,999
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={() => addItem(product)}
          className="bg-[#E3CBA8] text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest shadow-2xl hover:bg-white transition-all transform"
        >
          Buy Now
        </motion.button>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-10" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 z-10" />
    </section>
  );
}
