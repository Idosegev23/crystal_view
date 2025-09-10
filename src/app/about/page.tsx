'use client';

import { motion } from 'framer-motion';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';


export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
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
                    icon: "🏭",
                    title: "מעל 20 שנות ניסיון",
                    description: "ניסיון עשיר בכל סוגי עבודות האלומיניום"
                  },
                  {
                    icon: "🔧",
                    title: "בית מלאכה מקצועי",
                    description: "כל העבודה מתבצעת בפיקוחנו הישיר"
                  },
                  {
                    icon: "⭐",
                    title: "איכות ללא פשרות",
                    description: "משלב הגלם ועד התוצאה המושלמת"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
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

      <Footer />
      <WhatsApp />
    </main>
  );
}