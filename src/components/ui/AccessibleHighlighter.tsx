'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface HighlighterProps {
  children: ReactNode;
  className?: string;
  color?: string;
  action?: 'highlight' | 'circle' | 'box' | 'bracket' | 'crossed-off' | 'strike-through' | 'underline';
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  delay?: number;
}

export default function Highlighter({ 
  children, 
  className = '', 
  color = '#ffd1dc',
  action = 'highlight',
  strokeWidth = 1.5,
  animationDuration = 1500, // הארכתי מ-500 ל-1500ms
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = true,
  delay = 0
}: HighlighterProps) {
  const ref = useRef(null);
  const isInViewport = useInView(ref, { 
    once: true, 
    amount: 0.3,
    margin: '50px'
  });
  const shouldReduceMotion = useReducedMotion();
  
  const shouldAnimate = isView ? isInViewport : true;
  
  if (shouldReduceMotion) {
    // אין אנימציה - הדגשה מופיעה מיד
    return (
      <span ref={ref} className={`relative inline-block ${className}`}>
        {action === 'highlight' && (
          <span 
            className="absolute inset-0 -z-10 rounded-sm"
            style={{ 
              backgroundColor: color,
              margin: `-${padding}px`,
              opacity: 0.3
            }}
          />
        )}
        {action === 'underline' && (
          <span 
            className="absolute bottom-0 left-0 right-0 -z-10"
            style={{ 
              height: `${strokeWidth}px`,
              backgroundColor: color,
              marginBottom: `-${padding}px`
            }}
          />
        )}
        {children}
      </span>
    );
  }
  
  const getAnimationVariants = () => {
    switch (action) {
      case 'highlight':
        return {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 0.3 }
        };
      case 'underline':
        return {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 }
        };
      case 'circle':
        return {
          initial: { scale: 0, rotate: -10 },
          animate: { scale: 1, rotate: 0 }
        };
      case 'box':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 }
        };
      default:
        return {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 }
        };
    }
  };

  const variants = getAnimationVariants();
  
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Highlight Background */}
      {action === 'highlight' && (
        <motion.span
          initial={variants.initial}
          animate={shouldAnimate ? variants.animate : variants.initial}
          transition={{
            duration: animationDuration / 1000,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
            repeat: iterations > 1 ? iterations - 1 : 0,
            repeatType: "reverse",
            repeatDelay: 0.1
          }}
          className="absolute inset-0 -z-10 rounded-sm origin-left"
          style={{ 
            backgroundColor: color,
            margin: `-${padding}px`
          }}
        />
      )}
      
      {/* Underline */}
      {action === 'underline' && (
        <motion.span
          initial={variants.initial}
          animate={shouldAnimate ? variants.animate : variants.initial}
          transition={{
            duration: animationDuration / 1000,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: iterations > 1 ? iterations - 1 : 0,
            repeatType: "reverse",
            repeatDelay: 0.1
          }}
          className="absolute bottom-0 left-0 right-0 -z-10 origin-left"
          style={{ 
            height: `${strokeWidth}px`,
            backgroundColor: color,
            marginBottom: `-${padding}px`
          }}
        />
      )}
      
      {/* Circle */}
      {action === 'circle' && (
        <motion.span
          initial={variants.initial}
          animate={shouldAnimate ? variants.animate : variants.initial}
          transition={{
            duration: animationDuration / 1000,
            delay,
            ease: [0.68, -0.55, 0.265, 1.55], // easeInOutBack
            repeat: iterations > 1 ? iterations - 1 : 0,
            repeatType: "reverse",
            repeatDelay: 0.1
          }}
          className="absolute inset-0 -z-10 rounded-full border-2"
          style={{ 
            borderColor: color,
            borderWidth: `${strokeWidth}px`,
            margin: `-${padding * 2}px`
          }}
        />
      )}
      
      {/* Box */}
      {action === 'box' && (
        <motion.span
          initial={variants.initial}
          animate={shouldAnimate ? variants.animate : variants.initial}
          transition={{
            duration: animationDuration / 1000,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: iterations > 1 ? iterations - 1 : 0,
            repeatType: "reverse",
            repeatDelay: 0.1
          }}
          className="absolute inset-0 -z-10 border-2"
          style={{ 
            borderColor: color,
            borderWidth: `${strokeWidth}px`,
            margin: `-${padding}px`
          }}
        />
      )}
      
      {children}
    </span>
  );
}
