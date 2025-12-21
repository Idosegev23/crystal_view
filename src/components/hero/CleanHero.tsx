'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CleanHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Glass-like overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-glass-dark/60 via-glass-charcoal/50 to-glass-dark/70" 
          aria-hidden="true" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max w-full py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="glass-subheading text-glass-accent mb-6"
          >
            פתרונות אלומיניום וזכוכית
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-heading-xl text-white mb-6"
          >
            Crystal View
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-body-lg text-white/90 mb-12 max-w-2xl mx-auto"
          >
            ליווי, תכנון וביצוע של פרגולות, סגירות מרפסת ופתרונות אלומיניום לוילות
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/contact"
              aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר"
            >
              <button className="glass-btn min-w-[200px]" style={{ borderRadius: '0 16px 16px 16px' }}>
                קבל הצעת מחיר
              </button>
            </Link>

            <Link 
              href="/gallery"
              aria-label="עבור לגלריית הפרויקטים"
            >
              <button className="glass-btn-outline min-w-[200px] bg-white/20 border-white/40 text-white hover:bg-white hover:text-glass-charcoal" style={{ borderRadius: '16px 0 16px 16px' }}>
                הפרויקטים שלנו
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
