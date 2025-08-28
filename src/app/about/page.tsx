'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { companyValues } from '@/lib/services';
import { PrecisionIcon, LuxuryIcon, TransparencyIcon } from '@/lib/icons';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-crystal-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <motion.div
              initial="initial"
              animate="animate"
              className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-crystal-white mb-4 sm:mb-6 leading-tight"
              >
                החזון שלנו ברור – שקיפות מושלמת
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                ב־Crystal View אנחנו מאמינים שכל פרויקט צריך לספר סיפור.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                הסיפור שלנו התחיל עם חזון פשוט: ליצור פתרונות זכוכית ואלומיניום שמשנים חללים.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 lg:py-20">
        <div className="section-padding">
          <div className="container-max">
            
            {/* Main Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-0">
              {/* Image Side */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInLeft}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&q=80"
                    alt="Crystal View - הסיפור שלנו"
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
                  className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-crystal-dark/90 backdrop-blur-md p-4 sm:p-6 rounded-xl glass-effect"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-crystal-blue mb-1">2008</div>
                  <div className="text-crystal-silver text-xs sm:text-sm">שנת הקמה</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 bg-crystal-dark/90 backdrop-blur-md p-4 sm:p-6 rounded-xl glass-effect"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-crystal-blue mb-1">500+</div>
                  <div className="text-crystal-silver text-xs sm:text-sm">פרויקטים</div>
                </motion.div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInRight}
                className="space-y-8"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-crystal-white leading-tight mb-4 sm:mb-6">
                  פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר
                </h3>

                <p className="text-base sm:text-lg text-crystal-silver leading-relaxed mb-4 sm:mb-6">
                  עם שילוב ייחודי של טכנולוגיה מתקדמת, חומרים איכותיים וצוות מקצועי מנוסה – 
                  אנחנו יוצרים חללים שמשלבים יוקרה, פונקציונליות ועמידות לשנים.
                </p>

                <p className="text-base sm:text-lg text-crystal-silver leading-relaxed mb-4 sm:mb-6">
                  מאז הקמתנו ב-2008, אנחנו מובילים בתחום פתרונות זכוכית ואלומיניום יוקרתיים. 
                  כל פרויקט מתוכנן ומיוצר בדיוק מקסימלי, תוך הקפדה על הפרטים הקטנים ביותר ושמירה על לוחות זמנים מדויקים.
                </p>

                <p className="text-base sm:text-lg text-crystal-silver leading-relaxed">
                  הצוות שלנו כולל מהנדסים, מעצבים ובעלי מלאכה מיומנים שעובדים יחד כדי להביא לכל לקוח את התוצאה המושלמת שהוא מחפש.
                </p>
              </motion.div>
            </div>

            {/* Company Values */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-0"
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
                    className="text-center p-6 sm:p-8 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-2xl glass-effect hover-lift"
                  >
                    <div className="text-crystal-blue mb-6 flex justify-center">
                      <IconComponent />
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-crystal-white mb-3 sm:mb-4">
                      {value.title}
                    </h4>
                    <p className="text-sm sm:text-base text-crystal-silver leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-0"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-crystal-white mb-8 sm:mb-12">
                הצוות שלנו
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    name: "דני כהן",
                    role: "מנכ״ל ומהנדס ראשי",
                    experience: "15+ שנות ניסיון",
                    description: "מוביל צוותי פיתוח ועיצוב של פרויקטים מורכבים"
                  },
                  {
                    name: "מיכל לוי",
                    role: "מנהלת פרויקטים",
                    experience: "12+ שנות ניסיון",
                    description: "אחראית על ניהול ותיאום כל הפרויקטים מההתחלה עד הסיום"
                  },
                  {
                    name: "יוסי ברק",
                    role: "ראש צוות הייצור",
                    experience: "20+ שנות ניסיון",
                    description: "מוביל צוות הייצור וההתקנה עם דגש על איכות מקסימלית"
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 sm:p-6 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-xl glass-effect"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-crystal-dark font-bold text-lg sm:text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-crystal-white mb-2">
                      {member.name}
                    </h4>
                    <p className="text-crystal-blue font-medium mb-2 text-sm sm:text-base">
                      {member.role}
                    </p>
                    <p className="text-crystal-silver text-xs sm:text-sm mb-2 sm:mb-3">
                      {member.experience}
                    </p>
                    <p className="text-crystal-silver text-xs sm:text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="bg-gradient-to-r from-crystal-dark to-gray-900 rounded-2xl p-8 lg:p-12 glass-effect"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-crystal-white mb-4">
                  הטכנולוגיות שלנו
                </h3>
                <p className="text-xl text-crystal-silver">
                  ציוד מתקדם וטכנולוגיות חדישות למען תוצאות מושלמות
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "ייצור ממוחשב",
                    description: "מכונות CNC מתקדמות לדיוק מקסימלי"
                  },
                  {
                    title: "עיצוב תלת מימדי",
                    description: "תכנון ותכנות בתוכנות CAD מתקדמות"
                  },
                  {
                    title: "בקרת איכות",
                    description: "מערכות בדיקה מחשבות בכל שלב"
                  },
                  {
                    title: "חומרים מתקדמים",
                    description: "אלומיניום וזכוכית איכותיים מהיצרנים המובילים"
                  }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-crystal-dark/50 rounded-xl glass-effect"
                  >
                    <h4 className="text-xl font-bold text-crystal-white mb-3">
                      {tech.title}
                    </h4>
                    <p className="text-crystal-silver text-sm leading-relaxed">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}