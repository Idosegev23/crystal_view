'use client';

import About from '@/components/About';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main id="main-content" role="main">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-clean-gray-50">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-lg mb-6">
              אודות Crystal View אלומיניום
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              אנו מאמינים שעבודות אלומיניום הן הרבה יותר ממוצר – הן חלק בלתי נפרד מהעיצוב, הנוחות והאיכות של כל פרויקט
            </p>
          </motion.div>
        </div>
      </section>
      
      <About />
    </main>
  );
}
