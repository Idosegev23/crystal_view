'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import Link from 'next/link';

// Helper to get bento class based on index
const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4', 'bento-mixed', 'bento-soft'];
  return classes[index % classes.length];
};

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const featuredProjects = projects.filter(p => [1, 2, 9, 10, 4, 6].includes(p.id));

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  }, [featuredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  }, [featuredProjects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') nextSlide();
      else if (e.key === 'ArrowRight') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentProject = featuredProjects[currentIndex];
  
  const getProjectImage = (project: typeof projects[0]) => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images[0];
    }
    return '/images/hero.jpg';
  };

  return (
    <section 
      id="services" 
      className="glass-section glass-gradient-bg" 
      role="region" 
      aria-labelledby="services-heading"
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
          <p className="glass-subheading mb-4">עבודות נבחרות</p>
          <h2 id="services-heading" className="glass-heading-lg mb-6">
            הפרויקטים שלנו
          </h2>
          <div className="glass-divider mx-auto" />
        </motion.div>

        {/* Project Carousel */}
        <div className="relative mb-12">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-card bento-1 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all duration-300 touch-target"
            aria-label="הפרויקט הקודם"
          >
            <span className="text-xl">&rarr;</span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-card bento-2 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all duration-300 touch-target"
            aria-label="הפרויקט הבא"
          >
            <span className="text-xl">&larr;</span>
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-14 lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentProject.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card bento-3 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
                    <Image
                      src={getProjectImage(currentProject)}
                      alt={`${currentProject.title} - פרויקט אלומיניום`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 glass-panel bento-1">
                      <span className="text-sm font-semibold text-glass-charcoal">{currentProject.category}</span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-10 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-glass-ice to-glass-frost">
                    <h3 className="glass-heading-md mb-4">
                      {currentProject.title}
                    </h3>
                    
                    <p className="text-glass-steel text-sm mb-4">
                      {currentProject.location} — {currentProject.year}
                    </p>

                    <p className="glass-body mb-10">
                      {currentProject.description}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/gallery">
                        <button className="glass-btn w-full sm:w-auto" style={{ borderRadius: '0 16px 16px 16px' }}>
                          צפה בכל הפרויקטים
                        </button>
                      </Link>
                      <Link href="/contact">
                        <button className="glass-btn-outline w-full sm:w-auto" style={{ borderRadius: '16px 0 16px 16px' }}>
                          צור קשר
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10" role="tablist" aria-label="ניווט בין הפרויקטים">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={currentIndex === index}
                aria-label={`פרויקט ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 touch-target ${
                  currentIndex === index 
                    ? 'bg-glass-blue w-8' 
                    : 'bg-glass-mist hover:bg-glass-sky w-2.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-card bento-4 p-10 lg:p-14"
        >
          <div className="text-center mb-12">
            <h3 className="glass-heading-md mb-4">
              ייצור מלא בבית מלאכה
            </h3>
            <p className="glass-body max-w-2xl mx-auto">
              מהחומר הגלם ועד למוצר המושלם — הכל תחת קורת גג אחת
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "דיוק מקסימלי", description: "מדידות מדויקות וסטנדרטים גבוהים" },
              { title: "ביצוע מהיר", description: "לוחות זמנים קצרים ללא פשרות" },
              { title: "איכות מובטחת", description: "אחריות מלאה על כל העבודות" },
              { title: "שירות אישי", description: "ליווי צמוד לאורך כל הפרויקט" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-6 glass-panel ${getBentoClass(index)}`}
              >
                <h4 className="text-xl font-bold text-glass-charcoal mb-3">
                  {feature.title}
                </h4>
                <p className="glass-body text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center mt-12">
            <Link href="/contact">
              <button className="glass-btn" style={{ borderRadius: '16px 0 16px 16px' }}>
                בואו נתחיל לעבוד יחד
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
