'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '972501234567';
    const message = 'שלום, אני מעוניין לשמוע עוד על שירותי Crystal View';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero.jpg"
            alt="Crystal View - פתרונות זכוכית ואלומיניום מתקדמים"
            fill
            className="object-cover"
            style={{ zIndex: 0 }}
            priority
          />
          {/* Glass Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-crystal-bg/20 via-crystal-bg/40 to-crystal-bg/60" style={{ zIndex: 1 }}></div>
        </motion.div>
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [-100, -200, -300],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute w-20 h-20 lg:w-32 lg:h-32 glass-card ${
              i === 0 ? 'top-1/4 right-1/4' : 
              i === 1 ? 'top-1/2 left-1/4' : 
              'bottom-1/4 right-1/3'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 section-padding w-full">
        <div className="container-max text-center">
          <motion.div
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-crystal-text mb-4 sm:mb-6 text-shadow-luxury leading-tight px-4 sm:px-0"
            >
              Crystal View
            </motion.h1>

            {/* Hebrew Tagline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-crystal-blue mb-3 sm:mb-4 text-shadow-luxury px-4 sm:px-0"
            >
              עיצוב. ביצוע. שלמות.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-crystal-silver mb-8 sm:mb-12 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-0"
            >
              חזיתות זכוכית ואלומיניום ברמה הגבוהה ביותר, עם שילוב מדויק של אדריכלות חדשנית וסטנדרטים בלתי מתפשרים.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(109, 191, 242, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/gallery'}
                className="w-full sm:w-auto glass-button text-crystal-text px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg min-w-[200px]"
              >
                צפה בפרויקטים
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto glass-button text-crystal-text px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg min-w-[200px]"
              >
                דברו איתנו ב-WhatsApp
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-crystal-glass-border"
            >
              {[
                { number: "500+", label: "פרויקטים שהושלמו" },
                { number: "15+", label: "שנות ניסיון" },
                { number: "100%", label: "שביעות רצון לקוחות" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-crystal-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-crystal-silver text-sm lg:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-crystal-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-crystal-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}