'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { useLoadingStore } from '@/store/useLoadingStore';

export default function Preloader() {
  const { progress: r3fProgress } = useProgress();
  const { isLoading, finishLoading } = useLoadingStore();
  const [displayProgress, setDisplayProgress] = useState(0);
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setDisplayProgress(prev => {
        if (r3fProgress > prev) return r3fProgress;
        if (prev < 90) return prev + (90 - prev) * 0.05 + 0.1;
        if (r3fProgress === 100) return 100;
        return prev >= 99 ? 99 : prev + 0.01;
      });
    }, 50);

    const safetyBypass = setTimeout(() => {
      setDisplayProgress(100);
    }, 8000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(safetyBypass);
    };
  }, [r3fProgress]);

  useEffect(() => {
    if (displayProgress >= 100 || r3fProgress === 100) {
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
      
      finishTimeoutRef.current = setTimeout(() => {
        finishLoading();
      }, 1000);
    }
  }, [displayProgress, r3fProgress, finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Main Monogram */}
          <div className="relative mb-16 overflow-hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-serif text-white tracking-[0.3em] font-black relative z-10 select-none"
            >
              TH
            </motion.div>
            
            {/* Volumetric Pulse behind Logo */}
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C8A97E]/20 rounded-full blur-3xl"
               animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Progress Section */}
          <div className="flex flex-col items-center gap-6 w-72">
            <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.6em] text-[#C8A97E] font-sans font-black">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Opening Store
              </motion.span>
              <span className="tabular-nums">{Math.round(displayProgress)}%</span>
            </div>
            
            {/* Premium Gold Micro-Tracker */}
            <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent w-full"
                animate={{ x: [`-100%`, `100%`] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#C8A97E]"
                style={{ width: `${displayProgress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 25 }}
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="absolute bottom-16 overflow-hidden">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[9px] uppercase tracking-[0.8em] text-white/30 font-sans font-bold"
            >
              Exclusively Made For You
            </motion.p>
          </div>

          {/* Corner Decals */}
          <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/10" />
          <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/10" />
          <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/10" />
          <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
