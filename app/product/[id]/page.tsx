'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Banknote, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart, toggleCart } = useStore();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('watches')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl text-white mb-6 uppercase tracking-widest font-serif">Watch Not Found</h1>
      <Link href="/" className="text-[#C8A97E] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs underline underline-offset-8 font-bold">Back to Home</Link>
    </div>
  );

  const whatsappUrl = `https://wa.me/919860948892?text=${encodeURIComponent(`Hello, I am interested in buying the ${product.name}. The price is ${formatPrice(product.price)}. Please help me with the order.`)}`;

  return (
    <div className="min-h-screen bg-[#050505] text-[#C8A97E] font-sans pb-[140px]">
      <main className="pt-24 md:pt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/" className="group inline-flex items-center gap-2 text-[#C8A97E]/40 hover:text-[#C8A97E] transition-colors text-[10px] uppercase tracking-widest font-bold">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Watches
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Visual Showcase (Left) */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-white/[0.03] border border-white/5 group overflow-hidden rounded-3xl"
            >
              <img
                src={product.hero_image_url}
                alt={product.name}
                className="w-full h-full object-contain p-12 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            
            {/* Asset Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/[0.03] p-8 border border-white/5 flex flex-col justify-center rounded-2xl">
                <span className="text-[9px] text-[#C8A97E]/40 uppercase tracking-[0.3em] font-bold mb-3">Check Authenticity</span>
                <p className="text-[#C8A97E]/70 text-xs leading-relaxed italic font-serif">
                  "Every watch is checked carefully by our experts. We guarantee it is 100% original."
                </p>
              </div>
              <div className="relative aspect-square overflow-hidden bg-white/[0.03] border border-white/5 rounded-2xl">
                <img src={product.hero_image_url} alt="Detail" className="w-full h-full object-contain p-8 rotate-12 opacity-30" />
              </div>
            </div>
          </div>

          {/* Configuration (Right) */}
          <div className="flex flex-col lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] text-[#C8A97E] font-bold uppercase tracking-[0.4em]">{product.brand}</span>
                <span className="w-8 h-[1px] bg-white/10" />
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Limited Edition</span>
              </div>

              {/* Header: Clickable Logo */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 group">
                <Link href="/" className="cursor-pointer z-50">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/[0.03] border border-white/10 p-3 rounded-2xl transition-all group-hover:bg-white/10">
                    <img 
                      src="/logo.png" 
                      alt="Logo"
                      className="w-full h-full object-contain mix-blend-exclusion" 
                    />
                  </div>
                </Link>
                <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-tight">
                  {product.name}
                </h1>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-white/10">
                <span className="text-4xl font-serif text-[#C8A97E]">{formatPrice(product.price)}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Free Delivery</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { addToCart(product); toggleCart(true); }}
                  className="w-full bg-white text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl flex items-center justify-center gap-3 hover:bg-[#C8A97E] transition-colors rounded-xl"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>

                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 backdrop-blur-md text-white hover:bg-[#25D366]/20 transition-all duration-300 group"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#25D366]">Message on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-12 py-8 border-t border-white/10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <ShieldCheck className="text-[#C8A97E]" size={20} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 leading-tight font-bold">
                    100%<br/>Original
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <Truck className="text-[#C8A97E]" size={20} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 leading-tight font-bold">
                    Pan-India<br/>Delivery
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <Banknote className="text-[#C8A97E]" size={20} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 leading-tight font-bold">
                    Safe<br/>Payment
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Buy Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 p-4 px-6 pb-safe flex justify-between items-center z-[9999] md:hidden">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Final Price</span>
          <span className="text-[#C8A97E] font-bold text-lg leading-none">
            {formatPrice(product.price)}
          </span>
        </div>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-black px-6 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[0_8px_30px_rgba(37,211,102,0.4)] active:scale-95 transition-transform"
        >
          <MessageCircle size={16} />
          Buy Now
        </a>
      </div>
    </div>
  );
}
