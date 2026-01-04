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

const getBentoStyle = (index: number) => {
  const styles = [
    { borderRadius: '0 16px 16px 16px' },
    { borderRadius: '16px 0 16px 16px' },
    { borderRadius: '16px 16px 0 16px' },
    { borderRadius: '16px 16px 16px 0' },
    { borderRadius: '4px 16px 16px 16px' },
    { borderRadius: '16px 4px 16px 16px' },
  ];
  return styles[index % styles.length];
};

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === 'Escape') closeProject();
        if (e.key === 'ArrowLeft') nextImage();
        if (e.key === 'ArrowRight') prevImage();
      } else {
        if (e.key === 'ArrowLeft') nextSlide();
        else if (e.key === 'ArrowRight') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, selectedProject]);

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
                  {/* Image Side - Clickable */}
                  <div 
                    className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] cursor-pointer group"
                    onClick={() => openProject(currentProject)}
                    role="button"
                    tabIndex={0}
                    aria-label={`צפה בכל התמונות של ${currentProject.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openProject(currentProject);
                      }
                    }}
                  >
                    <Image
                      src={getProjectImage(currentProject)}
                      alt={`${currentProject.title} - פרויקט אלומיניום`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-glass-dark/0 group-hover:bg-glass-dark/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-medium transition-opacity duration-300 bg-glass-dark/50 px-6 py-3 bento-1">
                        לחצו לצפייה בכל התמונות ({currentProject.images.length})
                      </span>
                    </div>
                    
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
                      {currentProject.year}
                    </p>

                    <p className="glass-body mb-10">
                      {currentProject.description}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => openProject(currentProject)}
                        className="glass-btn w-full sm:w-auto" 
                        style={{ borderRadius: '0 16px 16px 16px' }}
                      >
                        צפה בכל התמונות
                      </button>
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
              תכנון וביצוע בבית מלאכה
            </h3>
            <p className="glass-body max-w-2xl mx-auto">
              מהרעיון ועד הפתרון המדויק לבית שלכם – הכל תחת קורת גג אחת
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-glass-dark/95 backdrop-blur-md overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button - Fixed */}
            <button
              onClick={closeProject}
              style={{ borderRadius: '0 12px 12px 12px' }}
              className="fixed top-4 left-4 z-[60] w-12 h-12 glass-panel flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all touch-target"
              aria-label="סגור"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <div className="min-h-screen py-8 px-4" dir="rtl">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: '0 24px 24px 24px' }}
                className="max-w-6xl mx-auto glass-card overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Image with Navigation */}
                <div className="relative aspect-[16/10] md:aspect-video bg-glass-dark">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedProject.images[currentImageIndex] || getProjectImage(selectedProject)}
                        alt={`${selectedProject.title} - תמונה ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        style={{ borderRadius: '0 24px 0 0' }}
                        sizes="90vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Counter */}
                  <div 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-glass-dark/70 backdrop-blur-sm text-white text-sm font-medium"
                    style={{ borderRadius: '20px' }}
                  >
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>

                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-panel bento-1 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all"
                        aria-label="תמונה קודמת"
                      >
                        <span className="text-xl">&rarr;</span>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-panel bento-2 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all"
                        aria-label="תמונה הבאה"
                      >
                        <span className="text-xl">&larr;</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {selectedProject.images.length > 1 && (
                  <div className="p-4 bg-glass-frost border-t border-glass-mist">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-glass-blue scale-105' 
                              : 'opacity-60 hover:opacity-100'
                          }`}
                          style={getBentoStyle(index)}
                          aria-label={`תמונה ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedProject.title} - תמונה ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1 bg-glass-blue/10 text-glass-blue text-sm font-medium"
                      style={{ borderRadius: '0 8px 8px 8px' }}
                    >
                      {selectedProject.category}
                    </span>
                    <span className="text-glass-steel text-sm">{selectedProject.year}</span>
                  </div>
                  
                  <h2 className="glass-heading-md mb-4">{selectedProject.title}</h2>
                  <p className="glass-body mb-8 max-w-3xl">{selectedProject.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link href="/contact">
                      <button className="glass-btn" style={{ borderRadius: '0 16px 16px 16px' }}>
                        מעוניינים בפרויקט דומה?
                      </button>
                    </Link>
                    <button 
                      onClick={closeProject}
                      className="glass-btn-outline" 
                      style={{ borderRadius: '16px 0 16px 16px' }}
                    >
                      חזרה
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
