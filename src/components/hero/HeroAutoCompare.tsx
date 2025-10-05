'use client';

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
      className="relative w-full h-[100svh] overflow-hidden"
      style={{ '--divider': `${dividerValue}%` } as React.CSSProperties}
    >
      {/* SR/SEO H1 */}
      <h1 className="sr-only">סגירות מרפסות – השוואה לפני ואחרי</h1>

      {/* Container with same dimensions as Hero */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16">
        {/* Frame container */}
        <div className="relative w-full h-full p-3">
          <div className="w-full h-full p-2">
            <div className="w-full h-full p-1">
              <div className="relative w-full h-full overflow-hidden">
                
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
                
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Center title - always visible - inside container */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16">
        <div className="relative w-full h-full p-3">
          <div className="w-full h-full p-2">
            <div className="w-full h-full p-1">
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
            </div>
          </div>
        </div>
      </div>

      {/* Manual slider control - simple glass container */}
      <div className="absolute left-8 right-8 sm:left-12 sm:right-12 lg:left-16 lg:right-16 bottom-4 z-50">
        <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30">
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
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-5 
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-white 
              [&::-webkit-slider-thumb]:border-2 
              [&::-webkit-slider-thumb]:border-white/50
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-5 
              [&::-moz-range-thumb]:h-5 
              [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-white 
              [&::-moz-range-thumb]:border-2 
              [&::-moz-range-thumb]:border-white/50
              [&::-moz-range-thumb]:cursor-pointer"
            aria-label="שלט בסליידר השוואה - גרור להצגת לפני ואחרי"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={dividerValue}
          />
          <div className="flex justify-between text-white text-sm mt-2">
            <span>לפני</span>
            <span>אחרי</span>
          </div>
        </div>
      </div>

    </section>
  );
}
