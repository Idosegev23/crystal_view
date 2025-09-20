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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-labelledby="hero-heading">
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
            alt="Crystal View - פתרונות זכוכית ואלומיניום מתקדמים, חלונות אלומיניום, דלתות זכוכית ופרגולות מודרניות"
            fill
            className="object-cover"
            style={{ zIndex: 0 }}
            priority
          />
          {/* Dark Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-radial-gradient from-black/40 via-transparent to-transparent" />
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
          {/* Glass morphism backdrop for text */}
          <motion.div
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white mb-4 sm:mb-6 text-shadow-luxury leading-tight px-4 sm:px-0"
            >
              Crystal View
              <span className="sr-only">
                - זכוכית ואלומיניום יוקרתי, עיצוב ביצוע ושלמות
              </span>
            </motion.h1>

            {/* Hebrew Tagline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 px-4 sm:px-0 text-shadow-luxury"
            >
              עיצוב. ביצוע. שלמות.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-0 font-medium text-shadow-luxury"
            >
              עבודות אלומיניום בסטנדרטים הגבוהים ביותר. לווי אישי בכל עבודות האלומיניום בוילות ובבתים פרטיים, עם שירות אישי המותאם לכל צורך ודיוק ללא פשרות! מספקים פתרונות איכותיים לפרגולות, סגירת מרפסות, רשתות נגד יתושים וסורגים שקופים.
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
                className="w-full sm:w-auto glass-button text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg min-w-[200px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="עבור לגלריית הפרויקטים לצפייה בעבודות זכוכית ואלומיניום שלנו"
                aria-describedby="projects-button-desc"
              >
                צפה בפרויקטים
                <span id="projects-button-desc" className="sr-only">
                  לחץ כדי לעבור לדף הגלריה ולראות את כל הפרויקטים שביצענו בתחום הזכוכית והאלומיניום
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto glass-button text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg min-w-[200px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="פתח שיחה ב-WhatsApp עם Crystal View לקבלת יעוץ מקצועי"
                aria-describedby="whatsapp-button-desc"
              >
                <svg className="w-5 h-5 inline-block ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" role="img">
                  <title>סמל WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                דברו איתנו ב-WhatsApp
                <span id="whatsapp-button-desc" className="sr-only">
                  לחץ כדי לפתוח שיחת WhatsApp עם הצוות המקצועי שלנו לקבלת יעוץ חינם
                </span>
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-label="גלול למטה לראות תכנים נוספים - מעבר לקטע אודות"
        onClick={() => scrollToSection('about')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-white rounded-full mt-2"
            aria-hidden="true"
          />
        </motion.div>
        <span className="sr-only">
          לחץ כדי לגלול למטה ולראות מידע נוסף על החברה
        </span>
      </motion.button>
    </section>
  );
}