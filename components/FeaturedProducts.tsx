'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';
import { Plus, Check } from 'lucide-react';

export default function FeaturedProducts({ products: dbProducts }: { products?: any[] }) {
  const { addItem } = useCart();

  const products = dbProducts && dbProducts.length > 0 ? dbProducts : [
    {
      id: 'th-grant-watch',
      name: 'Grant Watch',
      brand: 'The Hour',
      price: 1200,
      image_url: '/watch_1.png',
    },
    {
      id: 'th-outdoor-sports',
      name: 'Outdoor Sports',
      brand: 'The Hour',
      price: 1550,
      image_url: '/watch_2.png',
    },
    {
      id: 'th-chronograph-black',
      name: 'Black Chrono',
      brand: 'The Hour',
      price: 2100,
      image_url: '/watch_3.png',
    }
  ];

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <section className="bg-[#0A0A0A] py-20 pb-32">
      {/* 1. Key Features Highlight Card */}
      <div className="relative z-20 mx-6 mb-16 bg-[#E3CBA8] rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-black overflow-hidden group">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="font-playfair text-4xl md:text-6xl font-black uppercase mb-6 leading-none">
              The Hour <br /> Standard
            </h2>
            <ul className="space-y-4 mb-10">
              {['Bespoke Caliber 9', 'Hand-Polished Steel', 'Museum-Grade Crystal'].map((feature) => (
                <li key={feature} className="flex items-center gap-3 font-sans font-bold text-sm md:text-lg">
                  <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <Check size={14} className="text-[#E3CBA8]" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => addItem(products[0])}
              className="bg-black text-[#E3CBA8] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Acquire Piece
            </button>
          </div>
          <div className="hidden md:block md:w-1/3">
            <img 
              src="/hero-watch.png" 
              alt="Featured Piece" 
              className="w-full object-contain filter drop-shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-700" 
            />
          </div>
        </div>
      </div>

      {/* 2. Horizontal Scroll Grid */}
      <h3 className="mx-8 mb-8 font-playfair text-[#C8A97E] text-2xl uppercase tracking-widest">
        The Collection
      </h3>
      
      <div className="relative z-20 flex gap-6 overflow-x-auto pb-12 px-6 snap-x scrollbar-hide no-scrollbar">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -10 }}
            className="bg-[#E3CBA8] rounded-[2rem] p-6 min-w-[280px] md:min-w-[320px] shrink-0 snap-center shadow-xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1 block">
                {product.brand}
              </span>
              <h4 className="font-playfair text-2xl font-black text-black mb-1">
                {product.name}
              </h4>
              <p className="font-sans font-black text-xl text-black mb-6">
                {formatPrice(product.price)}
              </p>
              
              <button 
                onClick={() => addItem(product)}
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#E3CBA8] shadow-lg hover:scale-110 transition-transform"
              >
                <Plus size={24} />
              </button>
            </div>

            {/* Absolute Positioned Floating Watch Asset */}
            <div className="absolute -bottom-4 -right-10 w-48 h-48 opacity-90 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero-watch.png';
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
