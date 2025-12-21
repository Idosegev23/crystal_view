'use client';

import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  return (
    <main id="main-content" role="main" className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-36 pb-16 glass-gradient-bg">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">המלצות</p>
            <h1 className="glass-heading-lg mb-6">
              לקוחות מספרים
            </h1>
            <div className="glass-divider mx-auto" />
          </motion.div>
        </div>
      </section>
      
      <Testimonials />
    </main>
  );
}
