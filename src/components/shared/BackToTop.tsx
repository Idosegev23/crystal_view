'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ y: -2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-40 w-12 h-12 glass-btn bento-2 p-0 flex items-center justify-center group touch-target"
          aria-label="חזור לראש העמוד"
        >
          <span className="text-lg">&uarr;</span>

          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 glass-card bento-soft text-glass-charcoal text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            למעלה
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
