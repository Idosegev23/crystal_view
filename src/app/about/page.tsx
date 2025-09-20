'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm"></div>
        
        <div className="section-padding relative z-10">
          <div className="container-max">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              >
                אודות קריסטל ויו אלומיניום
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              >
                מעל 20 שנה של מומחיות, איכות ושירות ללא פשרות
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="section-padding">
          <div className="container-max">
            <div className="max-w-5xl mx-auto">
            
              {/* Company Story */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="glass-card p-8 lg:p-12 mb-12"
              >
                <motion.div
                  variants={staggerItem}
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
                >
                  <p className="text-xl">
                    בקריסטל ויו אנו מאמינים שעבודות אלומיניום הן הרבה יותר ממוצר – הן חלק בלתי נפרד מהעיצוב, הנוחות והאיכות של כל פרויקט.
                  </p>
                  
                  <p>
                    כבר מעל 20 שנה אנו מתמחים בייצור, התקנה ותיקון של כל סוגי מוצרי האלומיניום: פרגולות, ויטרינות, סגירות מרפסת, ועוד.
                  </p>
                  
                  <p>
                    כל חומר עובר תחת הידיים שלנו בבית המלאכה – משלב הגלם ועד התוצאה המושלמת. הניסיון הרב שלנו מאפשר לנו להעניק ללקוחות פתרון כולל – משלב התכנון והייצור ועד להתקנה מדויקת וגימור ברמה הגבוהה ביותר.
                  </p>
                  
                  <p>
                    בנוסף, אנו מספקים גם שירותי קבלנות בתחום האלומיניום, כך שתוכלו לרכז אצלנו את כל הצרכים שלכם ולקבל מענה מותאם אישית, אמין ואיכותי.
                  </p>
                  
                  <p className="text-xl font-medium text-gray-800">
                    בין אם מדובר בפרויקט קטן לבית פרטי או בפרויקט רחב היקף לבניין משרדים – קריסטל ויו אלומיניום היא הכתובת שלכם לכל עבודת אלומיניום, עם יחס אישי, שירות מקצועי ותוצאה שלא מתפשרת על איכות.
                  </p>
                </motion.div>
              </motion.div>

              {/* Our Values */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: (
                      <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                    title: "מעל 20 שנות ניסיון",
                    description: "ניסיון עשיר בכל סוגי עבודות האלומיניום"
                  },
                  {
                    icon: (
                      <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: "בית מלאכה מקצועי",
                    description: "כל העבודה מתבצעת בפיקוחנו הישיר"
                  },
                  {
                    icon: (
                      <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "איכות ללא פשרות",
                    description: "משלב הגלם ועד התוצאה המושלמת"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
            </motion.div>

              {/* CTA Section */}
            <motion.div
              initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
                className="text-center mt-16"
              >
                <div className="glass-card p-8 lg:p-12">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    מעוניינים לשמוע עוד?
                </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    צרו איתנו קשר ונשמח לספר לכם עוד על השירותים שלנו ולתת הצעת מחיר מותאמת אישית
                  </p>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block glass-button text-gray-800 px-8 py-4 font-bold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    צרו קשר עכשיו
                  </motion.a>
              </div>
            </motion.div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}