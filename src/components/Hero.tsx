'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactCompareImage = dynamic(() => import('react-compare-image'), { ssr: false });

export default function Hero() {
  const [position, setPosition] = useState<number>(0.5);
  const [rangeFocused, setRangeFocused] = useState<boolean>(false);

  const normalized = useMemo(() => {
    if (position > 1) return Math.min(1, Math.max(0, position / 100));
    return Math.min(1, Math.max(0, position));
  }, [position]);

  const leftOpacity = 1 - normalized;
  const rightOpacity = normalized;
  const centerOpacity = Math.max(0, 1 - Math.abs(normalized - 0.5) * 4);

  return (
    <section
      id="hero"
      role="banner"
      aria-labelledby="hero-heading"
      className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding"
    >
      <a href="#main-content" className="skip-link">דלג לתוכן</a>

      <div className="container-max w-full">
        <h1 id="hero-heading" className="sr-only">השוואה בין מרפסת פתוחה לסגורה – Crystal View</h1>

        <div
          className={`relative w-full mx-auto max-w-6xl rounded-2xl overflow-hidden select-none ${
            rangeFocused ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent' : ''
          }`}
          aria-label="סליידר השוואה לפני ואחרי"
        >
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/40" aria-hidden="true" />

          <ReactCompareImage
            leftImage="/open.png"
            rightImage="/close.png"
            leftImageAlt="מרפסת פתוחה – נוף חיצוני טבעי"
            rightImageAlt="מרפסת סגורה עם זכוכית – חלל מוגן ואיכותי"
            sliderPositionPercentage={normalized}
            onSliderPositionChange={(p: number) => setPosition(p)}
            handleSize={36}
            hover={false}
          />

          {/* Keyboard-accessible controller overlay */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(normalized * 100)}
            onChange={(e) => setPosition(Number(e.target.value) / 100)}
            onFocus={() => setRangeFocused(true)}
            onBlur={() => setRangeFocused(false)}
            aria-label="השוואה בין לפני לאחרי של סגירת מרפסת בזכוכית"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(normalized * 100)}
            className="absolute inset-0 z-[2] w-full h-full opacity-0 cursor-col-resize"
          />

          {/* Dynamic texts */}
          <div className="pointer-events-none absolute inset-0 z-[3]">
            <motion.div
              initial={false}
              animate={{ opacity: leftOpacity }}
              className="absolute top-6 left-6 md:top-10 md:left-10 text-white drop-shadow-lg"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">חופש</span>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: rightOpacity }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white drop-shadow-lg"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">שקיפות</span>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: centerOpacity }}
              className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl text-shadow-luxury">
                עבודות אלומיניום בסטנדרטים הגבוהים ביותר
              </h2>
            </motion.div>
          </div>

          {/* SR-only live region for state */}
          <div className="sr-only" role="status" aria-live="polite">
            {normalized < 0.45 ? 'לפני – מרפסת פתוחה' : normalized > 0.55 ? 'אחרי – מרפסת סגורה' : 'מרכז ההשוואה'}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <Link href="/contact" aria-label="צור קשר עם קריסטל ויו">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl font-bold text-base sm:text-lg bg-blue-600 text-white shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:bg-blue-700"
            >
              צור קשר
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}