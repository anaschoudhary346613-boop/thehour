'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 32 }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      {!hasError ? (
        <img 
          src="/logo.png" 
          alt="The Hour Logo" 
          className="object-contain"
          style={{ height: size, width: 'auto' }}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-2xl font-serif text-[#C5A059] tracking-widest font-bold">
          THE HOUR
        </div>
      )}
    </motion.div>
  );
}
