'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData, faqCategories } from '@/lib/faq-data';
import Link from 'next/link';

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4', 'bento-mixed'];
  return classes[index % classes.length];
};

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
    <main id="main-content" role="main" className="min-h-screen bg-glass-white" dir="rtl">
      {/* Hero Section */}
      <section className="pt-36 pb-16 glass-gradient-bg">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">שאלות ותשובות</p>
            <h1 className="glass-heading-lg mb-6">שאלות נפוצות</h1>
            <div className="glass-divider mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-18 lg:top-20 z-40 py-4 glass-panel border-b border-glass-mist/50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenId(null);
                }}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 touch-target ${getBentoClass(index)} ${
                  selectedCategory === category
                    ? 'glass-btn'
                    : 'glass-panel text-glass-steel hover:text-glass-charcoal hover:shadow-glass'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="glass-section">
        <div className="container-max max-w-4xl">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`glass-card ${getBentoClass(index)} overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-right transition-colors duration-200 flex items-start justify-between gap-4 hover:bg-glass-ice/50"
                    aria-expanded={openId === faq.id}
                  >
                    <h3 className="text-lg font-semibold text-glass-charcoal text-right flex-1">
                      {faq.question}
                    </h3>
                    
                    <span className={`text-2xl font-light text-glass-blue transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-45' : ''
                    }`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="glass-body leading-relaxed">
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

          {filteredFAQs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="glass-body text-xl">לא נמצאו שאלות בקטגוריה זו</p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 glass-card bento-soft p-10"
          >
            <h3 className="glass-heading-sm mb-4">לא מצאתם תשובה?</h3>
            <p className="glass-body mb-6">נשמח לענות על כל שאלה</p>
            <Link href="/contact">
              <button className="glass-btn bento-mixed">צור קשר</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
