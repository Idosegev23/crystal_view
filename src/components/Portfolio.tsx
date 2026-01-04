'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { projects, categories } from '@/lib/projects';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("כל הפרויקטים");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === "כל הפרויקטים" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openLightbox = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-crystal-dark to-crystal-dark" role="region" aria-labelledby="portfolio-heading">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
          >
            <motion.h2
              id="portfolio-heading"
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-crystal-white mb-4 sm:mb-6 leading-tight"
            >
              הפרויקטים שמגדירים אותנו
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              כל פרויקט הוא הזדמנות להראות מהי שלמות.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              אנחנו בוחרים להציג רק חלק קטן, כי התמונות אומרות הכל.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 sm:px-0"
            role="group"
            aria-labelledby="category-filter-heading"
          >
            <h3 id="category-filter-heading" className="sr-only">
              סינון פרויקטים לפי קטגוריה
            </h3>
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark'
                    : 'bg-crystal-dark/50 text-crystal-white hover:bg-crystal-silver/20 glass-effect'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`${selectedCategory === category ? 'מסנן פעיל' : 'סנן לפי'} ${category}`}
              >
                {category}
              </motion.button>
            ))}
            
            {/* Status message for screen readers */}
            <div className="sr-only" aria-live="polite" role="status">
              {`מציג ${filteredProjects.length} פרויקטים בקטגוריה ${selectedCategory}`}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.button
                  key={project.id}
                  layout
                  variants={staggerItem}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer w-full text-right"
                  onClick={() => openLightbox(project)}
                  aria-label={`פתח תצוגה מורחבת של פרויקט ${project.title} - ${project.category}`}
                  aria-describedby={`project-summary-${project.id}`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-crystal-dark">
                    <div className="aspect-w-16 aspect-h-12 relative">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} - ${project.category} שנת ${project.year} | פרויקט זכוכית ואלומיניום Crystal View`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
                        aria-describedby={`project-desc-${project.id}`}
                        loading="lazy"
                      />
                      
                      <p id={`project-desc-${project.id}`} className="sr-only">
                        פרויקט {project.title} בקטגוריה {project.category}, 
                        שנת ביצוע: {project.year}.
                        {project.description}
                      </p>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 right-0 left-0 p-6">
                          <h3 className="text-xl font-bold text-crystal-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-crystal-silver text-sm line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-crystal-blue/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <span className="text-crystal-dark text-sm font-medium">
                          {project.category}
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-4 left-4 bg-crystal-dark/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <span className="text-crystal-white text-sm font-medium">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-crystal-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-crystal-blue font-medium mb-2">
                        {project.category}
                      </p>
                      <p className="text-crystal-silver text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <span id={`project-summary-${project.id}`} className="sr-only">
                    לחץ כדי לפתוח תצוגה מורחבת עם כל התמונות ופרטים נוספים על הפרויקט
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-crystal-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-description"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-crystal-dark rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-crystal-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-crystal-white hover:bg-crystal-silver/20 transition-colors"
                aria-label="סגור תצוגה מורחבת"
                aria-describedby="close-help"
              >
                <span aria-hidden="true">✕</span>
                <span id="close-help" className="sr-only">
                  לחץ כדי לסגור את התצוגה המורחבת ולחזור לרשימת הפרויקטים
                </span>
              </button>

              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 gap-4 p-6">
                {selectedProject.images.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-12">
                    <Image
                      src={image}
                      alt={`${selectedProject.title} - ${selectedProject.category} תמונה ${index + 1} | Crystal View זכוכית ואלומיניום`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="p-6 pt-0">
                <h3 id="lightbox-title" className="text-3xl font-bold text-crystal-white mb-4">
                  {selectedProject.title}
                </h3>
                <p id="lightbox-description" className="sr-only">
                  תצוגה מורחבת של פרויקט {selectedProject.title} - {selectedProject.category}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-crystal-blue font-bold mb-2">קטגוריה</h4>
                    <p className="text-crystal-silver">{selectedProject.category}</p>
                  </div>
                  <div>
                    <h4 className="text-crystal-blue font-bold mb-2">שנה</h4>
                    <p className="text-crystal-silver">{selectedProject.year}</p>
                  </div>
                  {selectedProject.client && (
                    <div>
                      <h4 className="text-crystal-blue font-bold mb-2">לקוח</h4>
                      <p className="text-crystal-silver">{selectedProject.client}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-crystal-blue font-bold mb-2">תיאור הפרויקט</h4>
                  <p className="text-crystal-silver leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
