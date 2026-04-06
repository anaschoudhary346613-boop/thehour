'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const followerSpringConfig = { damping: 30, stiffness: 150 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const fx = useSpring(followerX, followerSpringConfig);
  const fy = useSpring(followerY, followerSpringConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      followerX.set(e.clientX - 20);
      followerY.set(e.clientY - 20);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        style={{
          x: x,
          y: y,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'var(--ivory)' : 'var(--gold)',
        }}
      />
      <motion.div
        className="cursor-follower hidden md:block"
        style={{
          x: fx,
          y: fy,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0 : 0.5,
        }}
      />
    </>
  );
}
