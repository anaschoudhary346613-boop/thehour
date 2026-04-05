'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/products';
import { useState } from 'react';

export default function ProductQuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-dark rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] border border-white/8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 h-full">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-graphite">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col gap-5 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label text-gold">{product.category}</span>
                <h2 className="font-display text-3xl text-ivory mt-1">{product.name}</h2>
                <p className="text-silver text-sm mt-1">{product.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass border border-white/10 hover:border-gold/30 text-silver hover:text-ivory transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-gold fill-gold" />
              ))}
              <span className="font-label text-silver ml-2">Exceptional</span>
            </div>

            {/* Price */}
            <div>
              <p className="font-display text-4xl text-gold-gradient">{formatPrice(product.price)}</p>
              <p className="font-label text-silver/60 mt-1">VAT exempt · Free insured shipping</p>
            </div>

            {/* Description */}
            <p className="text-silver font-light text-sm leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock <= 3 ? 'bg-rose animate-pulse' : 'bg-green-400'}`} />
              <span className="font-label text-silver/70">
                {product.stock <= 3 ? `Only ${product.stock} remaining` : 'In Stock'}
              </span>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className={`w-full py-4 rounded-full font-syne font-700 tracking-wider text-sm uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : 'bg-gold text-obsidian hover:bg-gold-light glow-gold'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Cart
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
