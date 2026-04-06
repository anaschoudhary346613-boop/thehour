'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Camera, MessageSquare as MessageIcon, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer id="contact" className="border-t border-white/5 pt-20 pb-10 relative">
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
                <Clock size={14} className="text-gold" strokeWidth={1.5} />
              </div>
              <span className="font-syne font-800 text-[1.05rem] tracking-[0.12em] uppercase">
                The <span className="text-gold">Hour</span>
              </span>
            </div>
            <p className="text-[#D4AF37] font-syne font-800 text-sm tracking-[0.2em] uppercase mb-6">
              Exceptional Timepieces
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
            <h4 className="font-label text-ivory mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Chronographs', 'Dress Watches', 'Sport Watches', 'Tourbillons', 'Limited Editions'].map((item) => (
                <li key={item}>
                  <a href="#collections" className="text-silver font-light text-sm hover:text-gold transition-colors link-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-label text-ivory mb-6">Company</h4>
            <ul className="space-y-3">
              {['Our Story', 'Master Watchmakers', 'Editorials', 'Press', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-silver font-light text-sm hover:text-gold transition-colors link-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-label text-ivory mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span className="text-silver font-light text-sm">1 Avenue de la Paix, Geneva, CH-1211</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <span className="text-silver font-light text-sm">+41 22 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <span className="text-silver font-light text-sm">concierge@thehour.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-label text-silver/60 mb-3 text-xs">Private Access Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl px-4 py-2.5 text-ivory text-sm placeholder:text-silver/30"
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
