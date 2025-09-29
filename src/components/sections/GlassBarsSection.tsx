'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function GlassBarsSection() {
  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <section
      role="region"
      aria-label="סגירת סורגים שקופים – הדגמה אינטראקטיבית"
      className="relative w-full h-[100svh] overflow-hidden"
    >
      {/* Black 3D aluminum window frame container */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16">
        {/* Outer frame - black with 3D effect */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-black to-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-3 border border-gray-700">
          {/* Middle frame - subtle highlight */}
          <div className="w-full h-full bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-700 shadow-inner p-2 border border-gray-600">
            {/* Inner frame - deeper shadow */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] p-1">
              {/* Glass area with image */}
              <div className="relative w-full h-full overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                <Image
                  src="/window.png"
                  alt="נוף חיצוני פתוח – לפני סגירה"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Glass bars (horizontal rows) --- */}
      {/* סורגים שקופים שנסגרים אוטומטית */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16" aria-hidden>
        <div className="relative w-full h-full p-3">
          <div className="relative w-full h-full p-2">
            <div className="relative w-full h-full p-1">
              <div className="relative w-full h-full flex flex-col justify-center gap-3 sm:gap-4">
                
                {/* Row 1: Top outer (mobile + desktop) */}
                <div className="flex relative w-full h-[12%] lg:h-[16%] overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2, 
                      delay: 1,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-l border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2, 
                      delay: 1,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-r border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                </div>

                {/* Row 2: Top inner (mobile + desktop) */}
                <div className="flex relative w-full h-[12%] lg:h-[16%] overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2.2, 
                      delay: 1.5,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-l border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2.2, 
                      delay: 1.5,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-r border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                </div>

                {/* Row 3: Center (appears with fade) */}
                <div className="flex relative w-full h-[12%] lg:h-[16%] overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    transition={{ 
                      duration: 2.4, 
                      delay: 2,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-l border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                  <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    transition={{ 
                      duration: 2.4, 
                      delay: 2,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-r border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                </div>

                {/* Row 4: Bottom inner (mobile + desktop) */}
                <div className="flex relative w-full h-[12%] lg:h-[16%] overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2.2, 
                      delay: 2.5,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-l border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2.2, 
                      delay: 2.5,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-r border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                </div>

                {/* Row 5: Bottom outer (mobile + desktop) */}
                <div className="flex relative w-full h-[12%] lg:h-[16%] overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2, 
                      delay: 3,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-l border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: 2, 
                      delay: 3,
                      ease: 'easeOut',
                      ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                    }}
                    className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border-y border-r border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center text with logo (appears after bars close) - inside frame */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16">
        <div className="relative w-full h-full p-3">
          <div className="relative w-full h-full p-2">
            <div className="relative w-full h-full p-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 4,
                  ease: 'easeOut',
                  ...(prefersReduced ? { duration: 0, delay: 0 } : {})
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white drop-shadow-lg px-4"
              >
        {/* Logo */}
        <div className="mb-4 sm:mb-6">
          <Image
            src="/logowtext.png"
            alt="Crystal View לוגו"
            width={80}
            height={40}
            className="object-contain filter brightness-0 invert sm:w-[120px] sm:h-[60px]"
          />
        </div>
        
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight text-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          השקיפות מתחילה כאן
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
          דיוק. איכות. יוקרה.
        </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
