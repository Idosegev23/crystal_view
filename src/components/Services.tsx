'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/animations';
import { projects } from '@/lib/projects';
import Link from 'next/link';

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Select featured projects (mix of all categories)
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

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        nextSlide();
      } else if (e.key === 'ArrowRight') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentProject = featuredProjects[currentIndex];
  
  // Helper to get first image from project
  const getProjectImage = (project: any) => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images[0];
    }
    return project.image || '/images/hero.jpg';
  };

  return (
    <section 
      id="services" 
      className="clean-section bg-clean-gray-50" 
      role="region" 
      aria-labelledby="services-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            id="services-heading"
            variants={fadeInUp}
            className="heading-lg mb-6"
          >
            הפרויקטים שלנו
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-body max-w-3xl mx-auto"
          >
            דוגמאות לפרויקטים שביצענו: פרגולות, סגירות מרפסת ופרויקטי וילות מקיפים
          </motion.p>
        </motion.div>

        {/* Large Single Service Carousel */}
        <div className="relative mb-12 max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-clean-lg flex items-center justify-center text-clean-gray-800 hover:bg-clean-blue hover:text-white transition-all duration-200 touch-target"
            aria-label="הצג שירות קודם"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-clean-lg flex items-center justify-center text-clean-gray-800 hover:bg-clean-blue hover:text-white transition-all duration-200 touch-target"
            aria-label="הצג שירות הבא"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentProject.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="clean-card overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-80 lg:h-auto min-h-[400px] lg:min-h-[500px]">
                    <Image
                      src={getProjectImage(currentProject)}
                      alt={`${currentProject.title} - פרויקט אלומיניום מקצועי`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-clean-lg">
                      <span className="text-sm font-semibold text-clean-gray-900">{currentProject.category}</span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-clean-gray-900 mb-4 md:mb-6">
                      {currentProject.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-clean-gray-600 mb-6 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{currentProject.location}</span>
                      <span>•</span>
                      <span>{currentProject.year}</span>
                    </div>

                    <p className="text-clean-gray-700 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed">
                      {currentProject.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/gallery" className="flex-1">
                        <button
                          className="clean-btn text-lg px-8 py-4 w-full"
                          aria-label="צפה בכל הפרויקטים בגלריה"
                        >
                          צפה בכל הפרויקטים
                        </button>
                      </Link>
                      <Link href="/contact" className="flex-1">
                        <button
                          className="clean-btn-secondary clean-btn text-lg px-8 py-4 w-full bg-clean-gray-100 hover:bg-clean-gray-200"
                          aria-label="צור קשר לפרויקט דומה"
                        >
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
          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="ניווט בין הפרויקטים">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={currentIndex === index}
                aria-label={`עבור לפרויקט ${index + 1} - ${featuredProjects[index].title}`}
                className={`h-3 rounded-full transition-all duration-300 touch-target ${
                  currentIndex === index 
                    ? 'bg-clean-blue w-10' 
                    : 'bg-clean-gray-300 hover:bg-clean-gray-400 w-3'
                }`}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-clean-gray-600">
              {currentIndex + 1} / {featuredProjects.length}
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="clean-card p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="heading-md mb-4">
              ייצור מלא בבית מלאכה מא&apos; – ת&apos;
            </h3>
            <p className="text-body max-w-2xl mx-auto">
              ייצור תחת קורת גג אחת - מהחומר הגלם ועד למוצר המושלם
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                title: "דיוק מקסימלי",
                description: "מדידות מדויקות ועבודה לפי סטנדרטים הגבוהים ביותר"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                ),
                title: "ביצוע מהיר",
                description: "לוחות זמנים קצרים וקיום מועדים ללא פשרות"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                title: "איכות מובטחת",
                description: "אחריות מלאה על כל העבודות והחומרים"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
                title: "שירות יוקרתי",
                description: "ליווי צמוד ושירות אישי לאורך כל הפרויקט"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-clean-blue-50 rounded-xl text-clean-blue mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-clean-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-clean-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center mt-12">
            <Link href="/contact">
              <button
                className="clean-btn text-lg px-12 py-4"
                aria-label="צור קשר כדי להתחיל לעבוד יחד"
              >
                בואו נתחיל לעבוד יחד
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
