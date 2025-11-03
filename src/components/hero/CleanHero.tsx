'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CleanHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Skip to main content link - נגישות */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          aria-hidden="true"
        />
        {/* Overlay עדין לקריאות */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max w-full py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="heading-xl text-white mb-6 text-shadow-strong"
          >
            Crystal View פתרונות אלומיניום
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-white/95 mb-8 md:mb-12 leading-relaxed text-shadow-light max-w-3xl mx-auto"
          >
            ליווי, תכנון וביצוע של פרגולות, סגירות מרפסת ופתרונות אלומיניום לוילות
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/contact"
              aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר חינם"
            >
              <button
                className="clean-btn w-full sm:w-auto text-lg px-10 py-4 shadow-clean-lg hover:shadow-clean-xl"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                קבל הצעת מחיר חינם
              </button>
            </Link>

            <Link 
              href="/gallery"
              aria-label="עבור לגלריית הפרויקטים שלנו"
            >
              <button
                className="clean-btn-secondary clean-btn w-full sm:w-auto text-lg px-10 py-4 bg-white/95 hover:bg-white shadow-clean-lg hover:shadow-clean-xl"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                צפו בפרויקטים שלנו
              </button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/80 text-sm font-medium">גלול למטה</span>
          <svg 
            className="w-6 h-6 text-white/80" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

