'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Shield, Clock, Award, Check } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { PRODUCTS, formatPrice, Product } from '@/lib/products';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';
import CartDrawer from '@/components/CartDrawer';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem, toggleCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('SPECIFICATIONS');
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-gs-black flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl text-gs-gold-light mb-6 uppercase tracking-widest font-black">TIMEPIECE NOT FOUND</h1>
      <Link href="/" className="text-gs-gold hover:text-gs-gold-light transition-colors uppercase tracking-[0.2em] text-xs underline underline-offset-8">Return to Collection</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gs-black text-gs-gold pb-32 md:pb-0">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      
      <main className="pt-24 md:pt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/shop" className="group inline-flex items-center gap-2 text-gs-gold/40 hover:text-gs-gold transition-colors text-xs uppercase tracking-widest">
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
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-gs-charcoal border border-gs-gold/10 group"
            >
              <div className="absolute inset-0 bg-split-hero-mobile md:bg-split-hero opacity-10 pointer-events-none" />
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
              <div className="bg-gs-charcoal rounded-[30px] p-8 border border-gs-gold/5 flex flex-col justify-center">
                <span className="text-[10px] text-gs-gold/40 uppercase tracking-[0.3em] font-black mb-2">Heritage</span>
                <p className="text-gs-gold/70 text-sm leading-relaxed italic">
                  "Each watch requires over 800 hours of hand-finishing in our private atelier in Geneva."
                </p>
              </div>
              <div className="relative aspect-square rounded-[30px] overflow-hidden bg-gs-charcoal border border-gs-gold/5">
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
                <span className="text-xs text-gs-gold font-black uppercase tracking-[0.4em]">{product.category}</span>
                <span className="w-8 h-[1px] bg-gs-gold/20" />
                <span className="text-[10px] text-gs-gold/40 uppercase tracking-widest font-bold">MASTER SERIES</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gs-gold-light uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>

              <p className="text-gs-gold/60 text-base leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-4xl font-black text-gs-gold-light">{formatPrice(product.price)}</span>
                <span className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">PRIVATE ACQUISITION</span>
              </div>

              {/* Specifications Tabs */}
              <div className="mb-12 border-t border-gs-gold/10 pt-8">
                <div className="flex gap-8 mb-8">
                  {['SPECIFICATIONS', 'HERITAGE'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-black tracking-[0.3em] transition-all uppercase ${
                        activeTab === tab ? 'text-gs-gold-light' : 'text-gs-gold/30 hover:text-gs-gold'
                      } relative pb-2`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[1px] bg-gs-gold" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <SpecLine label="Material" value={product.material || "Gold-Tone Steel"} />
                  <SpecLine label="Movement" value="Elite Precision Series V" />
                  <SpecLine label="Resistance" value="Certified 100M" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { addItem(product); toggleCart(true); }}
                  className="w-full btn-beige py-5 text-sm shadow-2xl shadow-gs-gold/5 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} />
                  Secure Acquisition
                </button>
                
                <div className="flex items-center justify-between px-2 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-gs-gold/40" />
                    <span className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">Verified Asset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-gs-gold/40" />
                    <span className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">Master Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gs-gold/40" />
                    <span className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">Lifetime Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <BottomNav onAuthClick={() => setShowAuth(true)} />
      <CartDrawer onCheckout={() => setShowCheckout(true)} />

      {/* Auth & Checkout Modals */}
      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </AnimatePresence>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay pointer-events-none" />
    </div>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gs-gold/5 group hover:bg-gs-gold/5 transition-colors px-2">
      <span className="text-[10px] text-gs-gold/40 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-xs text-gs-gold font-bold">{value}</span>
    </div>
  );
}
