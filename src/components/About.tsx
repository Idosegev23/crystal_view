'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInLeft, fadeInRight } from '@/lib/animations';
import { companyValues } from '@/lib/services';
import { PrecisionIcon, LuxuryIcon, TransparencyIcon } from '@/lib/icons';

export default function About() {
  return (
    <section id="about" className="clean-section bg-white" role="region" aria-labelledby="about-heading">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            id="about-heading"
            variants={fadeInLeft}
            className="heading-lg mb-6"
          >
            החזון שלנו — שקיפות, דיוק וסיפור נכון לכל פרויקט
          </motion.h2>
          <motion.p
            variants={fadeInRight}
            transition={{ delay: 0.2 }}
            className="text-body max-w-3xl mx-auto"
          >
            ב-Crystal View אנחנו מאמינים שכל פרויקט מספר סיפור, ואנחנו דואגים שהוא יסופר נכון — מהתכנון ועד ההתקנה
          </motion.p>
        </motion.div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-clean-lg">
              <Image
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80"
                alt="עבודה מקצועית של Crystal View - פרויקט אלומיניום וזכוכית"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-clean-lg border border-clean-gray-200"
            >
              <div className="text-4xl font-bold text-clean-blue mb-1">20+</div>
              <div className="text-clean-gray-700 text-sm font-medium">שנות מומחיות</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-clean-lg border border-clean-gray-200"
            >
              <div className="text-4xl font-bold text-clean-blue mb-1">500+</div>
              <div className="text-clean-gray-700 text-sm font-medium">פרויקטים</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="heading-md leading-tight">
              כבר מעל 20 שנה אנו מתמחים בייצור, התקנה ותיקון של כל סוגי מוצרי האלומיניום
            </h3>

            <p className="text-body">
              פרגולות, ויטרינות, סגירות מרפסת, ועוד. כל חומר עובר תחת הידיים שלנו בבית המלאכה – משלב הגלם ועד התוצאה המושלמת.
            </p>

            <p className="text-body">
              הניסיון הרב שלנו מאפשר לנו להעניק ללקוחות פתרון כולל – משלב התכנון והייצור ועד להתקנה מדויקת וגימור ברמה הגבוהה ביותר. בנוסף, אנו מספקים גם שירותי קבלנות בתחום האלומיניום, כך שתוכלו לרכז אצלנו את כל הצרכים שלכם ולקבל מענה מותאם אישית, אמין ואיכותי.
            </p>

            <p className="text-body">
              בין אם מדובר בפרויקט קטן לבית פרטי או בפרויקט רחב היקף – קריסטל ויו אלומיניום היא הכתובת שלכם לכל עבודת אלומיניום, עם יחס אישי, שירות מקצועי ותוצאה שלא מתפשרת על איכות.
            </p>

            {/* Expertise Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "פתרונות אלומיניום מקצה לקצה לפרויקטי וילות — משלב התכנון ועד ההתקנה",
                "סגירות מרפסת בהתאמה אישית", 
                "תכנון והתקנה של פרגולות איכותיות",
                "ייצור תחת קורת גג אחת"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-clean-gray-50 rounded-lg"
                >
                  <svg 
                    className="w-5 h-5 text-clean-blue flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-clean-gray-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
