'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function GlassBarsSection() {
  const ref = useRef<HTMLElement | null>(null);

  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Scroll binding only for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // start when section enters, finish when it leaves
  });

  // Transforms (desktop 5 bars): left bars come from left, right bars from right
  const leftOuterX = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReduced ? ['0%', '0%'] : ['-200%', '0%']
  );
  const leftInnerX = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReduced ? ['0%', '0%'] : ['-150%', '0%']
  );
  const rightInnerX = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReduced ? ['0%', '0%'] : ['150%', '0%']
  );
  const rightOuterX = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReduced ? ['0%', '0%'] : ['200%', '0%']
  );

  // Center bar: slight opacity ramp (feel of depth), no big X movement
  const centerOpacity = useTransform(
    scrollYProgress, 
    [0.15, 0.5], 
    prefersReduced ? [1, 1] : [0, 1]
  );

  // Text fade-in late in the scroll
  const textOpacity = useTransform(
    scrollYProgress, 
    [0.75, 0.9], 
    prefersReduced ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={ref as any}
      role="region"
      aria-label="סגירת סורגים שקופים – הדגמה אינטראקטיבית"
      className="relative w-screen h-[100svh] overflow-hidden"
    >
      {/* Background landscape - fallback to gradient if image missing */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
        <Image
          src="/open.png"
          alt="נוף חיצוני פתוח – לפני סגירה"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </div>

      {/* --- Glass bars (horizontal rows) --- */}
      {/* שורות בעובי אחיד שנכנסות אופקית מהצדדים ונפגשות במרכז */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 sm:gap-3 px-4" aria-hidden>
        {/* Row 1: Top outer (desktop only) */}
        <div className="hidden lg:flex relative w-full h-[16%] overflow-hidden">
          <motion.div
            style={{ x: leftOuterX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
          <motion.div
            style={{ x: rightOuterX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
        </div>

        {/* Row 2: Top inner (mobile + desktop) */}
        <div className="flex relative w-full h-[22%] lg:h-[16%] overflow-hidden">
          <motion.div
            style={{ x: leftInnerX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
          <motion.div
            style={{ x: rightInnerX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
        </div>

        {/* Row 3: Center (fades for depth) */}
        <div className="flex relative w-full h-[22%] lg:h-[16%] overflow-hidden">
          <motion.div
            style={{ x: leftInnerX, opacity: centerOpacity }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
          <motion.div
            style={{ x: rightInnerX, opacity: centerOpacity }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
        </div>

        {/* Row 4: Bottom inner (mobile + desktop) */}
        <div className="flex relative w-full h-[22%] lg:h-[16%] overflow-hidden">
          <motion.div
            style={{ x: leftInnerX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
          <motion.div
            style={{ x: rightInnerX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
        </div>

        {/* Row 5: Bottom outer (desktop only) */}
        <div className="hidden lg:flex relative w-full h-[16%] overflow-hidden">
          <motion.div
            style={{ x: leftOuterX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
          <motion.div
            style={{ x: rightOuterX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/20 to-white/5"
          />
        </div>
      </div>

      {/* Center text (appears near-closed) */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white drop-shadow-lg px-4"
      >
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight text-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          השקיפות מתחילה כאן
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
          דיוק. איכות. יוקרה.
        </p>
      </motion.div>
    </section>
  );
}
