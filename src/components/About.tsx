'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { companyValues } from '@/lib/services';
import { PrecisionIcon, LuxuryIcon, TransparencyIcon } from '@/lib/icons';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-crystal-dark via-crystal-dark to-gray-900">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0"
          >
            <motion.h2
              variants={fadeInLeft}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-crystal-white mb-4 sm:mb-6 leading-tight"
            >
              החזון שלנו ברור – שקיפות מושלמת
            </motion.h2>
            <motion.p
              variants={fadeInRight}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              ב־Crystal View אנחנו מאמינים שכל פרויקט צריך לספר סיפור
            </motion.p>
          </motion.div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-0">
            {/* Image Side */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&q=80"
                  alt="Crystal View - עבודה מקצועית"
                  width={600}
                  height={400}
                  className="object-cover hover-lift"
                />
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-crystal-blue/20 to-transparent"></div>
              </div>

              {/* Floating stats */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -left-8 bg-crystal-dark/90 backdrop-blur-md p-6 rounded-xl glass-effect"
              >
                <div className="text-3xl font-bold text-crystal-blue mb-1">15+</div>
                <div className="text-crystal-silver text-sm">שנות מומחיות</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -top-8 -right-8 bg-crystal-dark/90 backdrop-blur-md p-6 rounded-xl glass-effect"
              >
                <div className="text-3xl font-bold text-crystal-blue mb-1">500+</div>
                <div className="text-crystal-silver text-sm">פרויקטים</div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="space-y-8"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-crystal-white leading-tight">
                פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר
              </h3>

              <p className="text-lg text-crystal-silver leading-relaxed">
                עם שילוב ייחודי של טכנולוגיה מתקדמת, חומרים איכותיים וצוות מקצועי מנוסה – 
                אנחנו יוצרים חללים שמשלבים יוקרה, פונקציונליות ועמידות לשנים.
              </p>

              <p className="text-lg text-crystal-silver leading-relaxed">
                כל פרויקט מתוכנן ומיוצר בדיוק מקסימלי, תוך הקפדה על הפרטים הקטנים ביותר ושמירה על לוחות זמנים מדויקים.
              </p>

              {/* Expertise Areas */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  "חזיתות זכוכית חכמות",
                  "מערכות אלומיניום יוקרתיות", 
                  "פתרונות בידוד מתקדמים",
                  "עיצוב ארכיטקטוני מותאם"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-crystal-dark/50 p-4 rounded-lg glass-effect"
                  >
                    <div className="w-2 h-2 bg-crystal-blue rounded-full"></div>
                    <span className="text-crystal-white font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Values */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {companyValues.map((value, index) => {
              const IconComponent = value.icon === 'precision' ? PrecisionIcon : 
                                   value.icon === 'luxury' ? LuxuryIcon : 
                                   TransparencyIcon;
              
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-2xl glass-effect hover-lift"
                >
                  <div className="text-crystal-blue mb-6 flex justify-center">
                    <IconComponent />
                  </div>
                  <h4 className="text-2xl font-bold text-crystal-white mb-4">
                    {value.title}
                  </h4>
                  <p className="text-crystal-silver leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}