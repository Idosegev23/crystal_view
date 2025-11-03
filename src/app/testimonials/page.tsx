'use client';

import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  return (
    <main id="main-content" role="main" className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-clean-gray-50">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-lg mb-6">
              המלצות לקוחות
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              קראו מה הלקוחות שלנו אומרים על העבודה איתנו
            </p>
          </motion.div>
        </div>
      </section>
      
      <Testimonials />
    </main>
  );
}
