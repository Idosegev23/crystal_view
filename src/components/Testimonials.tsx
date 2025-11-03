'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const testimonials = [
  {
    id: 1,
    name: "אדר' דני כהן",
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

export default function Testimonials() {
  return (
    <section className="clean-section bg-clean-gray-50" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="testimonials-heading" className="heading-lg mb-6">
            לקוחות מספרים
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="clean-card p-8"
            >
              {/* Stars Rating */}
              <div className="flex justify-center mb-6" role="img" aria-label={`דירוג ${testimonial.rating} כוכבים מתוך 5`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 text-2xl"
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-clean-gray-700 text-center mb-6 leading-relaxed">
                <svg 
                  className="w-8 h-8 text-clean-blue opacity-20 mx-auto mb-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg">{testimonial.content}</p>
              </blockquote>

              {/* Author Info */}
              <div className="text-center pt-6 border-t border-clean-gray-200">
                <div className="font-bold text-clean-gray-900 mb-1">
                  {testimonial.name}
                </div>
                <div className="text-sm text-clean-gray-600 mb-2">
                  {testimonial.title}
                </div>
                <div className="text-xs text-clean-blue font-medium">
                  {testimonial.project}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-body mb-8">
            רוצים להצטרף למעגל הלקוחות המרוצים שלנו?
          </p>
          <a href="/contact">
            <button className="clean-btn text-lg px-12 py-4" aria-label="צור קשר עם Crystal View">
              בואו נדבר
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
