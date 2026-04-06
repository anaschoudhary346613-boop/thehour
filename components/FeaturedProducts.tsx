'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/store/useCart';
import { Heart, Plus } from 'lucide-react';

export default function FeaturedProducts({ products: dbProducts }: { products?: any[] }) {
  const { addItem } = useCart();

  const products = dbProducts && dbProducts.length > 0 ? dbProducts : [
    {
      id: 'th-grant-watch',
      name: 'Grant Watch',
      brand: 'The Hour',
      price: 1000,
      image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'th-outdoor-sports',
      name: 'Outdoor Sports',
      brand: 'The Hour',
      price: 1550,
      image_url: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&auto=format&fit=crop',
    }
  ];

  const featuredKeyItem = dbProducts && dbProducts.length > 0 ? dbProducts[0] : {
    id: 'th-hero-chronograph-featured',
    name: 'The Hour Chronograph',
    brand: 'Garner & Spruces',
    price: 4999,
    image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <section className="bg-black py-12">
      <div className="relative z-20 max-w-7xl mx-auto py-24 px-4 md:px-12">
        
        {/* "Key Features" Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#DBC197] rounded-3xl p-6 w-[90%] md:w-full mx-auto text-black flex flex-col items-center relative md:flex-row md:justify-between md:p-12 mb-16"
        >
          <div className="w-full text-center md:text-left mb-8 md:mb-0">
            <h3 className="font-sans font-bold text-2xl md:text-4xl mb-4">Key Features</h3>
            <ul className="space-y-2 md:space-y-4 text-black/80 font-medium">
              <li>• Automatic Movement</li>
              <li>• Gold-Tone Stainless Steel</li>
              <li>• Water Resistance up to 100m</li>
            </ul>
            <button 
               onClick={() => addItem({ ...featuredKeyItem, image: featuredKeyItem.image_url })}
               className="mt-6 md:mt-10 bg-black text-[#DBC197] px-8 py-3 md:px-12 md:py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
               ADD TO CART
            </button>
          </div>
          <div className="relative w-48 h-48 md:w-[400px] md:h-[400px] flex-shrink-0 drop-shadow-2xl rounded-2xl overflow-hidden">
            <img 
              src={featuredKeyItem.image_url} 
              alt="The Hour Chronograph" 
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Product Grid (Scrolling on Mobile, Grid on Desktop) */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x md:grid md:grid-cols-3 md:gap-12 md:overflow-visible md:snap-none md:pb-0 px-4 md:px-0 scrollbar-hide">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#DBC197] rounded-3xl p-6 relative flex flex-col shrink-0 w-64 md:w-full transition-transform hover:scale-105 cursor-pointer snap-center group"
            >
              <div className="relative w-full aspect-square mb-6 drop-shadow-xl rounded-xl overflow-hidden">
                 <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
              </div>
              
              <div className="w-full text-center">
                <h4 className="font-sans font-bold text-lg text-black mb-1 truncate">
                  {product.name}
                </h4>
                <p className="text-black font-black text-xl mb-6">
                  {formatPrice(product.price)}
                </p>
              </div>

                <button 
                  onClick={() => addItem({ ...product, image: product.image_url })}
                  className="w-full py-4 rounded-xl border-2 border-black text-black font-bold uppercase tracking-widest flex justify-center items-center gap-2 hover:bg-black hover:text-[#DBC197] transition-all"
                >
                ACQUIRE PIECE
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
