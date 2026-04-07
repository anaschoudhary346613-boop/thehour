'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const COLLECTION_ITEMS = [
  {
    id: 'grand-prix-1',
    title: "Le Mans Chronograph",
    description: "Designed for the endurance of the 24-hour race. Volcanic titanium case with platinum detailing.",
    price: "$78,500",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop",
    size: "large"
  },
  {
    id: 'deep-sea-2',
    title: "Abyssal Master",
    description: "Water resistant to 3000m. Grade 5 titanium.",
    price: "$42,000",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    size: "tall"
  },
  {
    id: 'royal-3',
    title: "Monarch Gold",
    description: "18k Rose gold with emerald cut diamonds.",
    price: "$124,000",
    image: "https://images.unsplash.com/photo-1291392000000-000000000000?q=80&w=1000&auto=format&fit=crop", // Placeholder
    size: "standard"
  },
  {
    id: 'lunar-4',
    title: "Luna Phase II",
    description: "Meteorite dial centerpiece.",
    price: "$92,000",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
    size: "standard"
  }
];

export default function BentoCollection() {
  return (
    <section id="collection" className="relative w-full py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#C8A97E] uppercase tracking-[0.3em] text-xs mb-4"
            >
              The Curated Selection
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-white tracking-tight"
            >
              Masterpieces of <br /> Engineering
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/shop" className="group flex items-center gap-2 text-white/50 hover:text-[#C8A97E] transition-colors uppercase tracking-widest text-xs font-bold">
              View Entire Catalog
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {COLLECTION_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`
                relative rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5
                ${item.size === 'large' ? 'md:col-span-2' : ''}
                ${item.size === 'tall' ? 'md:row-span-2' : ''}
              `}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-colors duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#C8A97E] text-xs font-bold tracking-widest uppercase mb-2 block">
                    Available Now
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm max-w-[280px] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.description}
                  </p>
                </div>
                
                <div className="absolute top-8 right-8 flex flex-col items-end">
                   <div className="text-white font-sans font-medium text-lg mb-2">
                    {item.price}
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#C8A97E] group-hover:border-[#C8A97E] transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
              
              {/* Spotlight Effect Hook (for CSS) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgba(200,169,126,0.15),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
