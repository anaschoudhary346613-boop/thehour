'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/lib/products';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full md:w-[480px] bg-black/40 backdrop-blur-3xl border-l border-white/10 z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-[#C8A97E] text-xs font-bold uppercase tracking-[0.4em] mb-1">Your Collection</h2>
                <p className="text-[9px] text-white/30 uppercase tracking-widest">{cart.length} Artifacts Selected</p>
              </div>
              <button 
                onClick={() => toggleCart(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">The vault is currently empty</p>
                  <button 
                    onClick={() => toggleCart(false)}
                    className="text-[#C8A97E] text-[10px] uppercase tracking-widest border-b border-[#C8A97E]/30 pb-2 hover:border-[#C8A97E] transition-all"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-6 group"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-24 bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-[10px] text-[#C8A97E] uppercase tracking-[0.2em] font-bold mb-1">{item.brand}</h4>
                          <h3 className="text-white font-serif text-lg tracking-tight uppercase leading-none">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/40 hover:text-white transition-colors">
                            <Minus size={12} />
                           </button>
                           <span className="text-xs text-white w-4 text-center tabular-nums">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/40 hover:text-white transition-colors">
                            <Plus size={12} />
                           </button>
                        </div>
                        <span className="text-white font-serif">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black/20 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold">Total Acquisition</span>
                  <span className="text-3xl font-serif text-[#C8A97E]">{formatPrice(getCartTotal())}</span>
                </div>
                
                <Link href="/checkout" className="block" onClick={() => toggleCart(false)}>
                  <button className="w-full bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#C8A97E] transition-all active:scale-95 shadow-[0_20px_40px_rgba(200,169,126,0.15)] rounded-xl">
                    Secure Acquisition
                  </button>
                </Link>
                
                <p className="text-center text-[8px] text-white/20 uppercase tracking-widest">
                  Invoicing & Logistics managed by THE HOUR Concierge Desk
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
