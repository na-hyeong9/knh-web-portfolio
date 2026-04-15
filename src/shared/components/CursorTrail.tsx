'use client';

import * as React from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function CursorTrail() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [cursorX, cursorY, isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.15) 0%, rgba(0,113,227,0) 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#0071E3',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.4 : 0,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
