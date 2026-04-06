'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CartDrawer from '@/components/CartDrawer';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { useCart } from '@/store/useCart';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';
import { AnimatePresence } from 'framer-motion';

export default function ShopPage() {
  const { addItem } = useCart();
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="min-h-screen bg-gs-black text-gs-gold pb-32 md:pb-0 font-inter">
      <Navbar />

      <main className="pt-24 md:pt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gs-gold/40 mb-2">
              The Vault
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gs-gold-light tracking-tighter uppercase">
              Collection
            </h1>
            <p className="mt-4 text-gs-gold/60 max-w-md text-sm leading-relaxed">
              Discover our complete inventory of horological masterpieces. Each piece represents the pinnacle of craftsmanship and heritage.
            </p>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gs-charcoal rounded-[40px] p-6 border border-gs-gold/10 hover:border-gs-gold/30 transition-all group flex flex-col"
            >
              <Link href={`/product/${product.id}`} className="block relative w-full aspect-square mb-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gs-gold/40 block mb-1">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-black text-gs-gold-light uppercase tracking-tight">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-gs-gold-light mb-6">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      brand: 'The Hour',
                      price: product.price,
                      image_url: product.image,
                      quantity: 1
                    })}
                    className="flex-1 bg-gs-black text-gs-gold-light border border-gs-gold/20 rounded-full py-3 hover:bg-gs-gold/10 transition-colors uppercase font-bold text-[10px] tracking-widest flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    Add
                  </button>
                  <Link 
                    href={`/product/${product.id}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gs-gold/10 text-gs-gold hover:bg-gs-gold hover:text-gs-black transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
      <CartDrawer />

      {/* Noise Texture */}
      <div className="noise-overlay pointer-events-none" />
    </div>
  );
}
