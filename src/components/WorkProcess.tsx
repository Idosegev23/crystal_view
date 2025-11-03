'use client';

import { motion } from 'framer-motion';

const workSteps = [
  {
    number: 1,
    title: 'פגישת ייעוץ ומדידות',
    description: 'הגעה לאתר, מדידות מדויקות והבנת הצרכים שלכם',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'תכנון ועיצוב',
    description: 'הצעה מפורטת, תוכניות מדויקות וויזואליזציה של הפרויקט',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'ייצור בבית המלאכה',
    description: 'ייצור מלא מא&apos; לת&apos; עם בקרת איכות מקפידה',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'התקנה מקצועית',
    description: 'התקנה מקצועית על ידי מומחים עם בדיקות איכות סופיות',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    number: 5,
    title: 'שירות לאחר מכירה',
    description: 'אחריות מלאה, תחזוקה וזמינות מתמשכת',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function WorkProcess() {
  return (
    <section
      id="work-process"
      className="clean-section bg-white"
      role="region"
      aria-labelledby="process-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="process-heading" className="heading-lg mb-6">
            תהליך העבודה שלנו
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            מהרעיון ועד המוצר המוגמר - ליווי צמוד בכל שלב
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline line - desktop only */}
          <div
            className="hidden lg:block absolute top-1/2 right-0 w-full h-1 bg-gradient-to-l from-clean-blue via-clean-gray-200 to-clean-blue -translate-y-1/2"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="clean-card p-6 text-center hover:shadow-clean-xl transition-all duration-300 relative z-10 bg-white">
                  {/* Number Badge */}
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 w-12 h-12 bg-gradient-to-br from-clean-blue to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-clean-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-4 inline-flex items-center justify-center w-16 h-16 bg-clean-blue-50 rounded-xl text-clean-blue">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-clean-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-clean-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-body mb-8">
            מעוניינים להתחיל את הפרויקט שלכם?
          </p>
          <a href="/contact">
            <button
              className="clean-btn text-lg px-12 py-4"
              aria-label="צור קשר עם Crystal View לתחילת פרויקט"
            >
              בואו נתחיל
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

