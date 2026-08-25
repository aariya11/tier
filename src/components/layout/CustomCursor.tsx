import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEsports } from '../../context/EsportsContext';

export const CustomCursor: React.FC = () => {
  const { cursorLabel } = useEsports();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery smooth luxury spring physics
  const springX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.5 });

  useEffect(() => {
    // Check if device has a fine pointer (desktop mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };
    mediaQuery.addEventListener('change', handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isPointerDevice) return null;

  const hasLabel = Boolean(cursorLabel);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: hasLabel ? 1 : 0.85,
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {hasLabel ? (
        <div className="px-3.5 py-1.5 rounded-full bg-white text-black text-[10px] font-sans font-semibold tracking-widest uppercase flex items-center justify-center shadow-lg whitespace-nowrap">
          {cursorLabel}
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border border-white/80 bg-white/30 backdrop-blur-[1px] transition-transform duration-150" />
      )}
    </motion.div>
  );
};
