'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const workSteps = [
  {
    number: '01',
    title: 'ייעוץ ומדידות',
    description: 'הגעה לאתר, מדידות מדויקות והבנת הצרכים',
  },
  {
    number: '02',
    title: 'תכנון ועיצוב',
    description: 'הצעה מפורטת ותוכניות מדויקות',
  },
  {
    number: '03',
    title: 'ייצור',
    description: 'ייצור מלא בבית המלאכה עם בקרת איכות',
  },
  {
    number: '04',
    title: 'התקנה',
    description: 'התקנה מקצועית ובדיקות איכות סופיות',
  },
  {
    number: '05',
    title: 'שירות',
    description: 'אחריות מלאה וזמינות מתמשכת',
  },
];

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4', 'bento-mixed'];
  return classes[index % classes.length];
};

export default function WorkProcess() {
  return (
    <section
      id="work-process"
      className="glass-section bg-glass-white"
      role="region"
      aria-labelledby="process-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="glass-subheading mb-4">איך אנחנו עובדים</p>
          <h2 id="process-heading" className="glass-heading-lg mb-6">
            תהליך העבודה
          </h2>
          <div className="glass-divider mx-auto" />
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {workSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card ${getBentoClass(index)} p-8 text-center relative overflow-hidden group`}
            >
              {/* Number Background */}
              <span className="absolute top-4 right-4 text-6xl font-bold text-glass-mist/50 group-hover:text-glass-blue/20 transition-colors">
                {step.number}
              </span>

              {/* Content */}
              <div className="relative z-10 pt-8">
                <h3 className="text-xl font-bold text-glass-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="glass-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="glass-body mb-6">
            מעוניינים להתחיל?
          </p>
          <Link href="/contact">
            <button className="glass-btn" style={{ borderRadius: '0 16px 16px 16px' }}>
              דברו איתנו
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
