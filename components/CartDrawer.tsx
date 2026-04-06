'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/store/useCart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, incrementQuantity, decrementQuantity, getTotal } = useCart();

  const total = getTotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer Container (Strict Nuclear Prompt Rules) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 text-[#C8A97E] text-xl tracking-widest font-bold flex items-center justify-between">
              <span className="font-serif uppercase">Your Collection</span>
              <button onClick={() => toggleCart(false)} className="text-[#C8A97E] hover:text-white transition-colors cursor-pointer p-2">
                <X size={24} />
              </button>
            </div>

            {/* Body/Items */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} className="text-[#C8A97E]/40" />
                  <p className="font-sans font-bold uppercase tracking-widest text-[#C8A97E]/60">Your collection is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="relative w-24 h-24 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="object-cover w-full h-full p-1" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#C8A97E] text-[10px] font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                            <h3 className="font-sans font-bold text-white text-sm">{item.name}</h3>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[#C8A97E] font-black mt-2">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-white/20 rounded-full bg-black/60 overflow-hidden">
                          <button onClick={() => decrementQuantity(item.id)} className="px-3 py-1 text-gray-400 hover:text-[#C8A97E] transition-colors"><Minus size={14} /></button>
                          <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                          <button onClick={() => incrementQuantity(item.id)} className="px-3 py-1 text-gray-400 hover:text-[#C8A97E] transition-colors"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer/Checkout */}
            {items.length > 0 && (
              <div className="p-8 bg-black/80 backdrop-blur-xl border-t border-white/10">
                <div className="flex justify-between items-center text-white text-lg mb-6">
                  <span className="font-sans font-bold uppercase tracking-wider text-sm">Total Investment:</span>
                  <span className="text-[#C8A97E] font-black text-2xl">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                  </span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={() => toggleCart(false)}
                  className="w-full bg-[#C8A97E] text-black py-5 rounded-full font-black uppercase tracking-widest text-center hover:bg-white hover:scale-[1.02] transition-all cursor-pointer shadow-xl mb-4 flex justify-center items-center gap-3"
                >
                  Acquire Collection <ArrowRight size={20} />
                </Link>
                <button
                  onClick={() => toggleCart(false)}
                  className="w-full text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
