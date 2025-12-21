'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  {
    id: 1,
    name: "אדר' דני כהן",
    title: "אדריכל ראשי, כהן אדריכלות",
    content: "עבודה עם Crystal View היא לא רק תוצאה מושלמת — זו חוויית עבודה חלקה ובטוחה.",
    project: "מגדל אלמוגים תל אביב"
  },
  {
    id: 2,
    name: "מיכל לוי",
    title: "מנהלת פרויקטים",
    content: "הדיוק והמקצועיות של Crystal View מעל ומעבר לכל הציפיות. פרטנר אמין לכל פרויקט.",
    project: "מרכז עסקים גיבורי ישראל"
  },
  {
    id: 3,
    name: "יוסי ברק",
    title: "יזם נדל״ן",
    content: "Crystal View הפכו את החזון שלנו למציאות עם רמת ביצוע שהיא פשוט מושלמת.",
    project: "וילת נוף הרצליה פיתוח"
  }
];

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3'];
  return classes[index % classes.length];
};

export default function Testimonials() {
  return (
    <section className="glass-section bg-glass-white" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="glass-subheading mb-4">לקוחות</p>
          <h2 id="testimonials-heading" className="glass-heading-lg mb-6">
            מה אומרים עלינו
          </h2>
          <div className="glass-divider mx-auto" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card ${getBentoClass(index)} p-8`}
            >
              {/* Quote */}
              <blockquote className="mb-8">
                <p className="text-lg text-glass-charcoal leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div className="glass-divider mb-6" />

              {/* Author Info */}
              <div>
                <div className="font-semibold text-glass-charcoal mb-1">
                  {testimonial.name}
                </div>
                <div className="text-sm text-glass-steel mb-2">
                  {testimonial.title}
                </div>
                <div className="text-xs text-glass-blue font-medium">
                  {testimonial.project}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="glass-body mb-6">
            רוצים להצטרף למעגל הלקוחות המרוצים?
          </p>
          <Link href="/contact">
            <button className="glass-btn bento-soft">
              בואו נדבר
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
