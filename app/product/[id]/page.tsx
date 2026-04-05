'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Shield, Clock, Award, ChevronRight, Share2, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCartStore, Product } from '@/store/cartStore';
import { formatPrice } from '@/lib/products';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('SPECIFICATIONS');
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (data && !error) {
        setProduct({
          ...data,
          image: data.image_urls?.[0] || `/watch-0${Math.floor(Math.random() * 6) + 1}.png`,
        });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-display text-4xl text-ivory mb-6">TIMEPIECE NOT FOUND</h1>
      <Link href="/#collections" className="font-label text-gold hover:text-white transition-colors">Return to Collections</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      
      <main className="pt-32 pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/#collections" className="group flex items-center gap-2 font-label text-silver/60 hover:text-gold transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collections
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Visual Showcase */}
          <div className="lg:w-3/5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border border-white/5"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover scale-[1.05]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
              <div className="absolute bottom-8 left-8 flex gap-4">
                <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-silver hover:text-gold transition-all">
                  <Share2 size={18} />
                </button>
                <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-silver hover:text-rose transition-all">
                  <Heart size={18} />
                </button>
              </div>
            </motion.div>

            {/* Gallery placeholder or secondary image */}
            <div className="grid grid-cols-2 gap-8">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="relative aspect-square rounded-3xl overflow-hidden glass border border-white/5"
               >
                 <Image src={product.image2 || product.image} alt="Detail view" fill className="object-cover" />
               </motion.div>
               <div className="glass rounded-3xl border border-white/5 p-8 flex flex-col justify-center">
                  <p className="font-label text-gold/40 mb-2">Heritage</p>
                  <p className="text-silver/80 text-sm leading-relaxed italic">
                    "A masterpiece that captures the very essence of time, forged in the heart of Geneva."
                  </p>
               </div>
            </div>
          </div>

          {/* Configuration & Details */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-label text-gold tracking-[0.3em]">{product.category}</span>
                  <span className="w-4 h-[1px] bg-white/20" />
                  <span className="font-label text-silver/40">Ref. {product.id.split('-')[1]?.toUpperCase() || 'TW-001'}</span>
                </div>

                <h1 className="font-display text-5xl md:text-6xl text-ivory uppercase tracking-tighter leading-[0.9] mb-6">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-syne font-800 text-3xl text-gold-gradient">{formatPrice(product.price)}</span>
                  <span className="font-label text-silver/30 text-xs tracking-[0.2em] uppercase">Investment Grade Asset</span>
                </div>

                <p className="text-silver/70 font-inter font-light text-base leading-relaxed mb-12">
                  {product.description || "An exceptional timepiece reflecting the relentless pursuit of horological perfection. Hand-finished by master watchmakers with a dedication to the finest Swiss traditions."}
                </p>

                {/* Technical Tabs */}
                <div className="border-t border-white/10 pt-10 mb-12">
                  <div className="flex gap-8 mb-8">
                    {['SPECIFICATIONS', 'COMPLICATIONS'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-label text-[0.65rem] tracking-[0.3em] transition-colors ${
                          activeTab === tab ? 'text-ivory' : 'text-silver/30 hover:text-silver'
                        } relative pb-2`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <SpecLine label="Material" value={product.material || "950 Platinum"} />
                    <SpecLine label="Diameter" value="41mm" />
                    <SpecLine label="Movement" value="Hand-Wound Caliber 16.2" />
                    <SpecLine label="Power Reserve" value="72 Hours" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { addItem(product); openCart(); }}
                    className="w-full py-5 rounded-2xl bg-gold text-obsidian font-syne font-800 tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 hover:bg-gold-light transition-all glow-gold"
                  >
                    <ShoppingBag size={18} />
                    Acquire Timepiece
                  </motion.button>
                  
                  <div className="flex items-center justify-center gap-6 mt-4">
                     <div className="flex items-center gap-2 text-silver/40">
                        <Shield size={14} />
                        <span className="font-label text-[0.55rem]">Secure Acquisition</span>
                     </div>
                     <div className="flex items-center gap-2 text-silver/40">
                        <Award size={14} />
                        <span className="font-label text-[0.55rem]">Geneva Seal Certified</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Brand Values / Craftsmanship Section */}
        <section className="mt-40 pt-40 border-t border-white/5">
           <div className="grid md:grid-cols-3 gap-16">
              <div className="space-y-6">
                 <div className="w-12 h-12 rounded-2xl glass border border-gold/20 flex items-center justify-center text-gold">
                    <Clock size={20} />
                 </div>
                 <h3 className="font-display text-2xl text-ivory uppercase">Eternity Forged</h3>
                 <p className="text-silver/50 text-sm leading-relaxed">
                    Designed to transcend generations, every component is rigorously tested for century-long reliability.
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="w-12 h-12 rounded-2xl glass border-gold/20 flex items-center justify-center text-gold">
                    <Shield size={20} />
                 </div>
                 <h3 className="font-display text-2xl text-ivory uppercase">Insured Delivery</h3>
                 <p className="text-silver/50 text-sm leading-relaxed">
                    Complimentary white-glove, fully insured delivery service provided globally by our specialized partners.
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="w-12 h-12 rounded-2xl glass border-gold/20 flex items-center justify-center text-gold">
                    <Award size={20} />
                 </div>
                 <h3 className="font-display text-2xl text-ivory uppercase">Lifetime Care</h3>
                 <p className="text-silver/50 text-sm leading-relaxed">
                    Access to our exclusive concierge service and preferred status for all future limited edition releases.
                 </p>
              </div>
           </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </AnimatePresence>
      <CartDrawer onCheckout={() => { setShowCheckout(true); }} />
    </div>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5 opacity-80 hover:opacity-100 transition-opacity">
      <span className="font-label text-[0.6rem] text-silver/60 tracking-[0.2em] uppercase">{label}</span>
      <span className="font-syne font-600 text-sm text-ivory">{value}</span>
    </div>
  );
}
