'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const testimonials = [
  {
    id: 1,
    name: "אדר׳ דני כהן",
    title: "אדריכל ראשי, כהן אדריכלות",
    content: "עבודה עם Crystal View היא לא רק תוצאה מושלמת – זו חוויית עבודה חלקה ובטוחה.",
    rating: 5,
    project: "מגדל אלמוגים תל אביב"
  },
  {
    id: 2,
    name: "מיכל לוי",
    title: "מנהלת פרויקטים, חברת בנייה מובילה",
    content: "הדיוק והמקצועיות של Crystal View מעל ומעבר לכל הציפיות. פרטנר אמין לכל פרויקט.",
    rating: 5,
    project: "מרכז עסקים גיבורי ישראל"
  },
  {
    id: 3,
    name: "יוסי ברק",
    title: "יזם נדל״ן",
    content: "Crystal View הפכו את החזון שלנו למציאות עם רמת ביצוע שהיא פשוט מושלמת.",
    rating: 5,
    project: "וילת נוף הרצליה פיתוח"
  }
];

const partners = [
  { name: "כהן אדריכלות", logo: "🏛️" },
  { name: "אדריכל ברק", logo: "🏗️" },
  { name: "נדל״ן יוקרה", logo: "🏢" },
  { name: "בינוי מודרני", logo: "🏭" },
  { name: "עיצוב פלוס", logo: "🎨" },
  { name: "אלומיניום פרמיום", logo: "⚡" }
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-crystal-dark to-gray-900">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-6xl font-bold text-crystal-white mb-6"
            >
              נבחרי האדריכלים והחברות שעובדים איתנו
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-crystal-silver max-w-3xl mx-auto leading-relaxed"
            >
              אנחנו גאים להיות הבחירה של האדריכלים, המעצבים והיזמים המובילים בישראל.
            </motion.p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-crystal-dark to-gray-900 p-8 rounded-2xl glass-effect hover-lift"
              >
                {/* Stars Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-yellow-400 text-xl"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-crystal-silver text-center mb-6 leading-relaxed relative">
                  <span className="text-6xl text-crystal-blue/30 absolute -top-4 -right-2">&ldquo;</span>
                  {testimonial.content}
                  <span className="text-6xl text-crystal-blue/30 absolute -bottom-8 -left-2">&rdquo;</span>
                </blockquote>

                {/* Author Info */}
                <div className="text-center">
                  <h4 className="text-crystal-silver font-bold text-lg mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-crystal-blue text-sm mb-2">
                    {testimonial.title}
                  </p>
                  <p className="text-crystal-silver text-xs">
                    פרויקט: {testimonial.project}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Partners Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-crystal-silver mb-12">
              הפרטנרים שלנו
            </h3>
            
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center p-6 bg-crystal-dark/50 rounded-xl glass-effect hover-lift"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <span className="text-crystal-silver text-sm font-medium text-center">
                    {partner.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-20 grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "500+", label: "פרויקטים הושלמו", icon: "✅" },
              { number: "100%", label: "שביעות רצון לקוחות", icon: "😊" },
              { number: "15+", label: "שנות ניסיון", icon: "📅" },
              { number: "24/7", label: "זמינות ושירות", icon: "🔧" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-xl glass-effect"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-crystal-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-crystal-silver text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}