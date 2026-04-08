'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      );
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      style={{
        left: mouseX,
        top: mouseY,
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      {/* Main Gold Ring */}
      <motion.div
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? '#C8A97E' : 'rgba(200, 169, 126, 0.3)',
          borderWidth: isPointer ? '1px' : '2px',
        }}
        className="w-full h-full rounded-full border border-[#C8A97E] transition-colors duration-300"
      />
      
      {/* Center Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#C8A97E] rounded-full" />
    </motion.div>
  );
}
