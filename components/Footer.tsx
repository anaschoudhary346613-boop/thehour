'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { motion, useInView } from 'framer-motion';
import { Clock, Camera, MessageSquare as MessageIcon, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer id="contact" className="border-t border-white/5 pt-20 pb-10 relative">
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="mb-6 block">
              <Logo size={40} showText={false} />
            </Link>
            <p className="text-[#D4AF37] font-syne font-800 text-sm tracking-[0.2em] uppercase mb-6">
              Exceptional Timepieces
            </p>
            <p className="text-silver/50 font-inter font-light text-xs leading-relaxed max-w-[200px] mb-8">
              Curating the world's most sought-after watches for collectors who demand perfection.
            </p>
            <div className="flex items-center gap-4">
              {[Camera, MessageIcon, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-full glass border border-white/10 hover:border-gold/40 text-silver hover:text-gold transition-all duration-300"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-label text-ivory mb-6 uppercase tracking-widest text-[0.65rem]">Collections</h4>
            <ul className="space-y-3">
              {['Chronographs', 'Dress Watches', 'Sport Watches', 'Tourbillons', 'Limited Editions'].map((item) => (
                <li key={item}>
                  <a href="#collections" className="text-silver font-light text-xs hover:text-gold transition-colors link-underline uppercase tracking-tight">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-label text-ivory mb-6 uppercase tracking-widest text-[0.65rem]">Concierge</h4>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-4">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span className="text-silver font-light text-xs leading-relaxed">1 Avenue de la Paix, Geneva, CH-1211</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={14} className="text-gold shrink-0" />
                <span className="text-silver font-light text-xs">concierge@thehour.com</span>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="font-label text-silver/40 mb-4 text-[0.55rem] uppercase tracking-[0.2em]">Private Access Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-ivory text-xs placeholder:text-silver/20 focus:border-gold/30 outline-none transition-all"
                />
                <button className="p-2.5 rounded-xl bg-gold text-obsidian hover:bg-gold-light transition-colors">
                  <Mail size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-label text-silver/40 text-xs">
            © 2024 The Hour. All rights reserved. Luxury timepieces.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'Warranty'].map((item) => (
              <a key={item} href="#" className="font-label text-silver/40 hover:text-silver/70 transition-colors text-xs">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
