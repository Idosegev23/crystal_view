'use client';

import About from '@/components/About';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main id="main-content" role="main">
      {/* Hero Section */}
      <section className="pt-36 pb-16 glass-gradient-bg">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">אודות</p>
            <h1 className="glass-heading-lg mb-6">
              Crystal View אלומיניום
            </h1>
            <div className="glass-divider mx-auto mb-6" />
            <p className="glass-body max-w-2xl mx-auto">
              אנו מאמינים שעבודות אלומיניום הן הרבה יותר ממוצר — הן חלק בלתי נפרד מהעיצוב והאיכות של כל פרויקט
            </p>
          </motion.div>
        </div>
      </section>
      
      <About />
    </main>
  );
}
