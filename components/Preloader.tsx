'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { useLoadingStore } from '@/store/useLoadingStore';

export default function Preloader() {
  const { progress: r3fProgress } = useProgress();
  const { progress: storeProgress, setProgress, isLoading, finishLoading } = useLoadingStore();
  const [displayProgress, setDisplayProgress] = useState(0);

  // Sync state and handle minimum durations for smooth aesthetics
  useEffect(() => {
    const target = r3fProgress > 0 ? r3fProgress : storeProgress;
    setProgress(target);
    
    // Smooth counter animation
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev < target) return Math.min(prev + 1, target);
        return prev;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [r3fProgress, storeProgress, setProgress]);

  useEffect(() => {
    if (displayProgress >= 100) {
      // Small buffer for premium feel
      const timeout = setTimeout(() => {
        finishLoading();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Main Monogram */}
          <div className="relative mb-12 overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif text-white tracking-[0.2em] relative z-10"
            >
              TH
            </motion.div>
            <motion.div 
               className="absolute inset-0 bg-[#C8A97E] mix-blend-difference"
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {/* Progress Section */}
          <div className="flex flex-col items-center gap-4 w-64">
            <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.5em] text-white/40 mb-2 font-sans font-bold">
              <span>Initializing</span>
              <span>{Math.round(displayProgress)}%</span>
            </div>
            
            {/* Minimal Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#C8A97E]"
                style={{ width: `${displayProgress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>

          {/* Luxury Branding Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 text-[9px] uppercase tracking-[0.6em] text-white/20 font-sans"
          >
            The New Era of Luxury Timekeeping
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
