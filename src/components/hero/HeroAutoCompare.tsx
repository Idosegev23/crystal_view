'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export default function HeroAutoCompare() {
  const [dividerValue, setDividerValue] = useState(50);

  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const x = useMotionValue(0.5);
  const dividerPercent = useTransform(x, (v) => `${Math.round(v * 100)}%`);

  // Update CSS custom property in real-time
  useMotionValueEvent(x, 'change', (latest) => {
    setDividerValue(Math.round(latest * 100));
  });

  useEffect(() => {
    if (prefersReduced) {
      x.set(0.5);
      return;
    }

    // חלק, מהיר, והולך וחוזר
    const controls = animate(x, [0, 1], {
      duration: 6, // קצר יותר = מהיר יותר
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror', // הלוך ושוב חלק
    });

    return () => controls.stop();
  }, [x, prefersReduced]);

  return (
    <section
      role="region"
      aria-label="Hero – הדגמה ויזואלית"
      className="relative w-screen h-[100svh] overflow-hidden"
      style={{ '--divider': `${dividerValue}%` } as React.CSSProperties}
    >
      {/* SR/SEO H1 */}
      <h1 className="sr-only">חופש ושקיפות – עבודות אלומיניום בסטנדרטים הגבוהים ביותר</h1>

      {/* Background layer (closed) */}
      <div className="absolute inset-0">
        <Image
          src="/close.png"
          alt="מרפסת סגורה עם זכוכית – חלל מוגן ואיכותי"
          fill
          priority
          className="object-cover object-center opacity-80"
          sizes="100vw"
          style={{ 
            objectPosition: 'center 40%',
            transform: 'scale(1.001)'
          }}
        />
      </div>

      {/* Foreground layer (open) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - dividerValue}% 0 0)`,
          transition: 'none',
        }}
        aria-hidden="true"
      >
        <Image
          src="/open.png"
          alt="מרפסת פתוחה – נוף חיצוני טבעי"
          fill
          priority
          className="object-cover object-center opacity-80"
          sizes="100vw"
          style={{ 
            objectPosition: 'center center',
            transform: 'scale(1.001)'
          }}
        />
      </div>

      {/* Divider bar */}
      <motion.div
        className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-white/90 via-white/70 to-white/20 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        style={{ left: dividerPercent }}
        aria-hidden="true"
      />

      {/* Center title - always visible */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative text-center px-6">
          <h2 
            className="font-extrabold tracking-tight text-[clamp(2.5rem,6vw,6rem)] leading-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 25%, #b3e5fc 50%, #81d4fa 75%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(129,212,250,0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.7)) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
            }}
          >
            Crystal View
          </h2>
          <p 
            className="text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8bbd9 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(255,255,255,0.4))'
            }}
          >
            החלום שלכם במציאות
          </p>
        </div>
      </div>


      {/* CTA */}
      <Link
        href="/contact"
        aria-label="צור קשר עם קריסטל ויו"
        className="absolute left-1/2 top-[68%] -translate-x-1/2 mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 text-white bg-[#2C7BE5] hover:bg-[#1F66C9] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C7BE5]"
      >
        צור קשר
      </Link>
    </section>
  );
}
