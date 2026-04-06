'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = '', size = 48, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div 
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Circular Frame with Etched Detail */}
          <circle cx="50" cy="50" r="48" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
          <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1.5" />
          
          {/* Diamond Secondary Frame */}
          <rect 
            x="25" y="25" width="50" height="50" 
            transform="rotate(45 50 50)" 
            stroke="#D4AF37" strokeWidth="1" 
            opacity="0.8"
          />

          {/* TH Monogram */}
          <path
            d="M38 35V65M38 50H48M48 35V65 M58 35V65M58 50H68M68 35V65"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="square"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
          
          {/* Stylized 'T' and 'H' overlap detail */}
          <path
            d="M32 35H44 M54 35H72"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="square"
          />
          
          {/* Center Vertical Divider (Subtle) */}
          <line x1="50" y1="30" x2="50" y2="70" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        </svg>
        
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-gold/5 blur-xl animate-pulse" />
      </motion.div>

      {showText && (
        <span className="font-syne font-800 text-[1.1rem] tracking-[0.2em] uppercase text-[#D4AF37]">
          The Hour
        </span>
      )}
    </div>
  );
}
