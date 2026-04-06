'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import ProductCard from './ProductCard';
import { Product } from '@/store/cartStore';

const CATEGORIES = ['All', 'Chronograph', 'Dress Watch', 'Sport', 'Complication', 'Diver', 'Tourbillon'];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        // Map any missing image URLs from mock if they are not in the database yet
        const mappedData = data.map((p: any) => ({
          ...p,
          image: p.image_urls?.[0] || `/watch-0${Math.floor(Math.random() * 6) + 1}.png`,
        }));
        setProducts(mappedData);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase() || p.category === activeCategory);

  return (
    <section id="collections" className="py-24 md:py-32 bg-obsidian relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gold/50" />
              <span className="font-label text-gold/60 tracking-[0.4em]">The Selection</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-ivory uppercase tracking-tighter leading-[0.9]">
              Curated <span className="italic text-white/5">Excellence</span>
            </h2>
            <p className="text-silver/50 font-inter font-light text-sm mt-6 max-w-md tracking-wide">
              Explore our masterfully crafted collection, where every complication tells a story of heritage and innovation.
            </p>
          </motion.div>

        </div>

        {/* Cinematic Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 md:gap-y-32 min-h-[600px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ 
                  duration: 0.7, 
                  delay: i * 0.03,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="relative"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Decorative localized glow */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
