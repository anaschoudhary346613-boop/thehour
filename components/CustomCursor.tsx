'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.dataset.cursor === 'hover'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [x, y]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none mix-blend-difference">
      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovered ? 60 : 32,
          height: isHovered ? 60 : 32,
          opacity: 0.8,
        }}
        className="fixed rounded-full border border-white/50 will-change-transform"
      />
      {/* Follow dot */}
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          opacity: isHovered ? 0.3 : 1,
        }}
        className="fixed w-1.5 h-1.5 bg-white rounded-full will-change-transform"
      />
    </div>
  );
}
