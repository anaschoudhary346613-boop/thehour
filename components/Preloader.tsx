'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-obsidian flex flex-col items-center justify-center p-6"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t border-gold"
              />
              <Clock size={24} className="text-gold" strokeWidth={1} />
            </div>

            <div className="text-center">
              <h2 className="font-syne font-800 text-2xl tracking-[0.2em] text-ivory uppercase">
                The <span className="text-gold">Hour</span>
              </h2>
              <p className="font-label text-silver/60 mt-2 text-[0.6rem]">Established 2024 · Geneva</p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gold shadow-[0_0_10px_rgba(184,151,58,0.5)]"
            />
            <div className="flex justify-between mt-3">
              <span className="font-label text-[0.5rem] text-silver/40">Loading Excellence</span>
              <span className="font-label text-[0.5rem] text-gold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
