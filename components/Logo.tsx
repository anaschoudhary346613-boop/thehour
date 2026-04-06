'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 24 }: LogoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <span 
        className="font-serif text-white uppercase tracking-[0.3em] font-bold"
        style={{ fontSize: size }}
      >
        THE HOUR
      </span>
    </motion.div>
  );
}
