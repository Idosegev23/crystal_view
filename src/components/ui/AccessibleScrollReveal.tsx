'use client';

import React, { useEffect, useRef, useMemo, ReactNode } from 'react';
import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  threshold?: number;
  staggerDelay?: number;
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  threshold = 0.1,
  staggerDelay = 0.05,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: threshold,
    margin: '50px'
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [baseRotation, 0]);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            opacity: shouldReduceMotion ? 1 : baseOpacity,
            filter: shouldReduceMotion ? 'blur(0px)' : `blur(${blurStrength}px)`
          }}
          animate={isInView ? { 
            opacity: 1,
            filter: 'blur(0px)'
          } : {}}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: shouldReduceMotion ? 0 : delay + (index * staggerDelay),
            ease: [0.25, 0.25, 0, 1]
          }}
        >
          {word}
        </motion.span>
      );
    });
  }, [children, baseOpacity, blurStrength, staggerDelay, isInView, shouldReduceMotion]);

  // אם המשתמש ביקש reduced motion - הצג טקסט מיד
  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={containerClassName}>
        <div className={`text-[clamp(1.6rem,4vw,3rem)] leading-relaxed font-semibold ${textClassName}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef} 
      className={containerClassName}
      style={{ 
        rotate: enableBlur ? rotate : 0,
        transformOrigin: '0% 50%'
      }}
    >
      <div className={`text-[clamp(1.6rem,4vw,3rem)] leading-relaxed font-semibold ${textClassName}`}>
        {splitText}
      </div>
    </motion.div>
  );
};

export default ScrollReveal;
