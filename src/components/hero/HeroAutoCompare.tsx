'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import { useMemo, useState, useCallback } from 'react';

export default function HeroAutoCompare() {
  const [dividerValue, setDividerValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0.5);
  const dividerPercent = useTransform(x, (v) => `${Math.round(v * 100)}%`);

  // Update CSS custom property in real-time
  useMotionValueEvent(x, 'change', (latest) => {
    setDividerValue(Math.round(latest * 100));
  });

  // Handle manual slider control
  const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) / 100;
    x.set(value);
  }, [x]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      role="region"
      aria-label="Hero – הדגמה ויזואלית"
      className="relative w-screen h-[100svh] overflow-hidden"
      style={{ '--divider': `${dividerValue}%` } as React.CSSProperties}
    >
      {/* SR/SEO H1 */}
      <h1 className="sr-only">סגירות מרפסות – השוואה לפני ואחרי</h1>

      {/* Background layer (open) */}
      <div className="absolute inset-0">
        <Image
          src="/open1.png"
          alt="מרפסת פתוחה – נוף חיצוני טבעי"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          style={{ 
            objectPosition: 'center center',
            transform: 'scale(1.0)'
          }}
        />
      </div>

      {/* Foreground layer (closed) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${dividerValue}% 0 0)`,
          transition: 'none',
        }}
        aria-hidden="true"
      >
        <Image
          src="/close.png"
          alt="מרפסת סגורה עם זכוכית – חלל מוגן ואיכותי"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          style={{ 
            objectPosition: 'center center',
            transform: 'scale(1.0)'
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
            סגירות מרפסות
          </h2>
          <p 
            className="text-[clamp(1.2rem,3vw,2rem)] font-bold leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8bbd9 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(255,255,255,0.4))'
            }}
          >
            לפני ואחרי
          </p>
        </div>
      </div>

      {/* Manual slider control */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
        <div className="bg-black/20 backdrop-blur-md rounded-full p-4 border border-white/30">
          <input
            type="range"
            min="0"
            max="100"
            value={dividerValue}
            onChange={handleSliderChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            aria-label="שלט בסליידר השוואה - גרור להצגת לפני ואחרי"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={dividerValue}
          />
          <div className="flex justify-between text-white/80 text-sm mt-2">
            <span>לפני</span>
            <span>אחרי</span>
          </div>
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
