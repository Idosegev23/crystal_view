'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData, faqCategories } from '@/lib/faq-data';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('כל הנושאים');
  const [openId, setOpenId] = useState<number | null>(null);

  const filteredFAQs = useMemo(() => {
    if (selectedCategory === 'כל הנושאים') return faqData;
    return faqData.filter((faq) => faq.category === selectedCategory);
  }, [selectedCategory]);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main id="main-content" role="main" className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-clean-gray-50">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-lg mb-6">שאלות נפוצות</h1>
            <p className="text-body max-w-3xl mx-auto">
              כל מה שרציתם לדעת על פרגולות, סגירות מרפסת ושירותי האלומיניום שלנו
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-20 z-40 py-6 bg-white border-b border-clean-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenId(null);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 touch-target ${
                  selectedCategory === category
                    ? 'bg-clean-blue text-white shadow-clean-md'
                    : 'bg-clean-gray-100 text-clean-gray-800 hover:bg-clean-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="clean-section">
        <div className="container-max max-w-4xl">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="clean-card overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-right hover:bg-clean-gray-50 transition-colors duration-200"
                    aria-expanded={openId === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-clean-blue-50 rounded-lg flex items-center justify-center">
                        <svg
                          className={`w-5 h-5 text-clean-blue transition-transform duration-300 ${
                            openId === faq.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-clean-gray-900 text-right">
                          {faq.question}
                        </h3>
                        {openId !== faq.id && (
                          <p className="text-sm text-clean-gray-500 mt-1">
                            לחץ לקריאת התשובה המלאה
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 pr-20">
                          <p className="text-clean-gray-700 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-clean-gray-600 text-xl">
                לא נמצאו שאלות בקטגוריה זו
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 clean-card p-8"
          >
            <h3 className="text-2xl font-bold text-clean-gray-900 mb-4">
              לא מצאתם את התשובה שחיפשתם?
            </h3>
            <p className="text-body mb-6">
              נשמח לענות על כל שאלה! צרו איתנו קשר ונחזור אליכם בהקדם.
            </p>
            <a href="/contact">
              <button className="clean-btn text-lg px-12 py-4">צור קשר</button>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

