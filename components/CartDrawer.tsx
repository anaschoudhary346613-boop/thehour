'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/products';
import { useState } from 'react';

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [isClearing, setIsClearing] = useState(false);
  const cartTotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-obsidian/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md glass-dark border-l border-white/8 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" strokeWidth={1.5} />
                <h2 className="font-syne font-700 text-ivory text-lg">Your Selection</h2>
                {items.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold text-obsidian text-[10px] font-bold flex items-center justify-center">
                    {items.reduce((a, i) => a + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full glass border border-white/10 hover:border-gold/30 text-silver hover:text-ivory transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20"
                  >
                    <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center">
                      <ShoppingBag size={24} className="text-silver" strokeWidth={1} />
                    </div>
                    <p className="font-syne text-silver text-sm">Your curation is empty</p>
                    <p className="font-label text-silver/40 text-center">
                      Discover our collection of exceptional timepieces
                    </p>
                    <button
                      onClick={closeCart}
                      className="font-label text-gold border border-gold/30 px-6 py-2 rounded-full hover:bg-gold/10 transition-colors"
                    >
                      Explore Collection
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 glass rounded-xl p-4 border border-white/5 group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-graphite">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-syne font-600 text-ivory text-sm truncate">{item.name}</p>
                        <p className="text-silver text-xs truncate">{item.subtitle}</p>
                        <p className="text-gold font-syne font-700 text-sm mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-white/10 hover:border-gold/40 flex items-center justify-center text-silver hover:text-ivory transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-syne text-ivory text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-white/10 hover:border-gold/40 flex items-center justify-center text-silver hover:text-ivory transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-silver/30 hover:text-rose transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/5 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-silver text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-silver text-sm">
                    <span>Shipping</span>
                    <span className="text-gold">Complimentary</span>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div className="flex justify-between">
                    <span className="font-syne font-700 text-ivory">Total</span>
                    <span className="font-display text-gold text-xl">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { closeCart(); onCheckout(); }}
                  className="w-full py-4 rounded-full bg-gold text-obsidian font-syne font-700 tracking-wider text-sm uppercase flex items-center justify-center gap-2 hover:bg-gold-light transition-colors glow-gold"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full text-center font-label text-silver/40 hover:text-silver transition-colors text-xs"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
