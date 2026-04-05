'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product, useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCartStore();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [7, -7]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-7, 7]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass border-white/5 group-hover:border-gold/20 transition-all duration-700">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
          {/* Main Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Hover overlay shadow */}
          <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold/10 blur-[80px]" />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.category === 'LTD' && (
              <span className="tag-pill bg-gold/10 border-gold/20 text-gold">Limited Edition</span>
            )}
            {product.stock <= 3 && (
              <span className="tag-pill bg-rose/10 border-rose/20 text-rose font-medium">Only {product.stock} Left</span>
            )}
          </div>
        </Link>

        {/* Quick Add Overlay - Higher Z than the Link */}
        <motion.div 
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          className="absolute inset-x-4 bottom-4 z-20"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
              openCart();
            }}
            className="w-full py-3 bg-ivory text-obsidian font-syne font-800 text-[0.65rem] uppercase tracking-[0.2em] rounded-xl hover:bg-gold transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </motion.div>
      </div>

      <Link href={`/product/${product.id}`} className="block mt-5 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-syne font-700 text-ivory text-base group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
            <p className="font-inter text-silver/50 text-[0.65rem] tracking-widest mt-1 uppercase">
              {product.material}
            </p>
          </div>
          <div className="text-right">
            <p className="font-syne font-800 text-gold text-base tracking-tight">
              {formatPrice(product.price)}
            </p>
            <p className="font-label text-silver/30 text-[0.55rem] mt-0.5 tracking-[0.2em]">{product.category}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
