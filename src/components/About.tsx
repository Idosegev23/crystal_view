'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { companyValues } from '@/lib/services';
import { PrecisionIcon, LuxuryIcon, TransparencyIcon } from '@/lib/icons';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-800/60 to-black/80 backdrop-blur-sm"></div>
      
      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0"
          >
            <div className="glass-card-dark p-8 lg:p-12">
              <motion.h2
                variants={fadeInLeft}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                החזון שלנו ברור – שקיפות מושלמת
              </motion.h2>
              <motion.p
                variants={fadeInRight}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                ב־Crystal View אנחנו מאמינים שכל פרויקט צריך לספר סיפור
              </motion.p>
            </div>
          </motion.div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-0">
            {/* Image Side */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="relative"
            >
              <div className="glass-card p-4 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&q=80"
                  alt="Crystal View - עבודה מקצועית"
                  width={600}
                  height={400}
                  className="object-cover rounded-xl hover-lift w-full h-80"
                />
                {/* Glass overlay effect */}
                <div className="absolute inset-4 bg-gradient-to-tr from-blue-500/20 via-transparent to-transparent rounded-xl pointer-events-none"></div>
              </div>

              {/* Floating stats - Enhanced Glass - Mobile Responsive */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 -left-3 sm:-left-4 lg:-left-6 glass-card-dark p-3 sm:p-4 lg:p-6 shadow-xl"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1">15+</div>
                <div className="text-blue-200 text-xs sm:text-sm">שנות מומחיות</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="absolute -top-3 sm:-top-4 lg:-top-6 -right-3 sm:-right-4 lg:-right-6 glass-card-dark p-3 sm:p-4 lg:p-6 shadow-xl"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1">500+</div>
                <div className="text-blue-200 text-xs sm:text-sm">פרויקטים</div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <div className="glass-card-dark p-8 space-y-8">
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר
                </h3>

                <p className="text-lg text-blue-200 leading-relaxed">
                  עם שילוב ייחודי של טכנולוגיה מתקדמת, חומרים איכותיים וצוות מקצועי מנוסה – 
                  אנחנו יוצרים חללים שמשלבים יוקרה, פונקציונליות ועמידות לשנים.
                </p>

                <p className="text-lg text-blue-200 leading-relaxed">
                  כל פרויקט מתוכנן ומיוצר בדיוק מקסימלי, תוך הקפדה על הפרטים הקטנים ביותר ושמירה על לוחות זמנים מדויקים.
                </p>

                {/* Expertise Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {[
                    "חזיתות זכוכית חכמות",
                    "מערכות אלומיניום יוקרתיות", 
                    "פתרונות בידוד מתקדמים",
                    "עיצוב ארכיטקטוני מותאם"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="glass-card p-4 flex items-center space-x-3"
                    >
                      <div className="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></div>
                      <span className="text-gray-800 font-medium flex-1">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Values */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {companyValues.map((value, index) => {
              const IconComponent = value.icon === 'precision' ? PrecisionIcon : 
                                   value.icon === 'luxury' ? LuxuryIcon : 
                                   TransparencyIcon;
              
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center hover-lift"
                >
                  <div className="glass-card-dark p-8 h-full">
                    <div className="text-blue-400 mb-6 flex justify-center">
                      <IconComponent />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {value.title}
                    </h4>
                    <p className="text-blue-200 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}