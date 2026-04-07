'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Shield, Clock, Award } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { PRODUCTS, formatPrice, Product } from '@/lib/products';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem, toggleCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('SPECIFICATIONS');

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl text-white mb-6 uppercase tracking-widest font-serif">TIMEPIECE NOT FOUND</h1>
      <Link href="/shop" className="text-[#C8A97E] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs underline underline-offset-8 font-bold">Return to Collection</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#C8A97E] font-inter">
      <main className="pt-24 md:pt-32 px-6 lg:px-12 max-w-7xl mx-auto pb-[120px]">
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/shop" className="group inline-flex items-center gap-2 text-[#C8A97E]/40 hover:text-[#C8A97E] transition-colors text-xs uppercase tracking-widest font-bold">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Visual Showcase (Left) */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-[#141414] border border-[#C8A97E]/10 group overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </motion.div>
            
            {/* Asset Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#141414] p-8 border border-[#C8A97E]/5 flex flex-col justify-center">
                <span className="text-[10px] text-[#C8A97E]/40 uppercase tracking-[0.3em] font-bold mb-2">Heritage</span>
                <p className="text-[#C8A97E]/70 text-sm leading-relaxed italic font-serif">
                  "Each watch requires over 800 hours of hand-finishing in our private atelier in Geneva."
                </p>
              </div>
              <div className="relative aspect-square overflow-hidden bg-[#141414] border border-[#C8A97E]/5">
                <Image src={product.image} alt="Detail" fill className="object-contain p-8 rotate-12 opacity-50" />
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
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs text-[#C8A97E] font-bold uppercase tracking-[0.4em]">{product.category}</span>
                <span className="w-8 h-[1px] bg-[#C8A97E]/20" />
                <span className="text-[10px] text-[#C8A97E]/40 uppercase tracking-widest font-bold">MASTER SERIES</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>

              <p className="text-[#C8A97E]/60 text-base leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-4xl font-serif text-white">{formatPrice(product.price)}</span>
                <span className="text-[10px] text-[#C8A97E]/40 font-bold uppercase tracking-widest">PRIVATE ACQUISITION</span>
              </div>

              {/* Specifications Tabs */}
              <div className="mb-12 border-t border-[#C8A97E]/10 pt-8">
                <div className="flex gap-8 mb-8">
                  {['SPECIFICATIONS', 'HERITAGE'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-bold tracking-[0.3em] transition-all uppercase ${
                        activeTab === tab ? 'text-white' : 'text-[#C8A97E]/30 hover:text-[#C8A97E]'
                      } relative pb-2`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C8A97E]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <SpecLine label="Material" value={product.material || "904L Satin Steel"} />
                  <SpecLine label="Movement" value="Swiss Calibre TH-01" />
                  <SpecLine label="Resistance" value="Professional 10BAR" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { addItem({
                    id: product.id,
                    name: product.name,
                    brand: 'The Hour',
                    price: product.price,
                    image_url: product.image,
                    quantity: 1
                  }); toggleCart(true); }}
                  className="w-full bg-[#C8A97E] text-black py-5 text-xs uppercase tracking-[0.4em] font-bold shadow-2xl shadow-[#C8A97E]/5 flex items-center justify-center gap-3 hover:bg-white transition-colors"
                >
                  <ShoppingBag size={18} />
                  Secure Acquisition
                </button>
                
                <div className="flex items-center justify-between px-2 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#C8A97E]/40" />
                    <span className="text-[9px] text-[#C8A97E]/40 font-bold uppercase tracking-widest">Verified Asset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-[#C8A97E]/40" />
                    <span className="text-[9px] text-[#C8A97E]/40 font-bold uppercase tracking-widest">Master Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#C8A97E]/40" />
                    <span className="text-[9px] text-[#C8A97E]/40 font-bold uppercase tracking-widest">Lifetime Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-[#C8A97E]/5 group hover:bg-[#C8A97E]/5 transition-colors px-2">
      <span className="text-[10px] text-[#C8A97E]/40 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-xs text-white font-serif">{value}</span>
    </div>
  );
}
