'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categories } from '@/lib/projects';

// Helper to get the first image from project
const getProjectImage = (project: any) => {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images[0];
  }
  return project.image || '/images/hero.jpg';
};

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string>('כל הפרויקטים');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const tags = useMemo(() => categories, []);
  
  const filteredProjects = useMemo(
    () => (selectedTag === 'כל הפרויקטים' ? projects : projects.filter((p) => p.category === selectedTag)),
    [selectedTag]
  );

  const openLightbox = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
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
            <h1 className="heading-lg mb-6">
              גלריית הפרויקטים שלנו
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              עבודות אלומיניום מעוצבות ומקצועיות שביצענו ברחבי הארץ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 py-6 bg-white border-b border-clean-gray-200">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-4" role="tablist" aria-label="סינון פרויקטים לפי קטגוריה">
              {tags.map((tag, index) => {
                const count = tag === 'כל הפרויקטים' 
                  ? projects.length 
                  : projects.filter(p => p.category === tag).length;
                
                return (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTag(tag)}
                    role="tab"
                    aria-selected={selectedTag === tag}
                    aria-controls="projects-grid"
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 touch-target ${
                      selectedTag === tag
                        ? 'bg-clean-blue text-white shadow-clean-md'
                        : 'bg-clean-gray-100 text-clean-gray-800 hover:bg-clean-gray-200'
                    }`}
                  >
                    {tag}
                    <span className={`mr-2 text-xs px-2 py-0.5 rounded-full ${
                      selectedTag === tag
                        ? 'bg-white/20'
                        : 'bg-clean-gray-200'
                    }`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Results Counter */}
            <motion.div
              key={filteredProjects.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-clean-gray-600"
              role="status"
              aria-live="polite"
            >
              מציג {filteredProjects.length} פרויקטים
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-grid" className="clean-section" role="tabpanel">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="clean-card cursor-pointer overflow-hidden group"
                  onClick={() => openLightbox(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`פתח פרטים על ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(project);
                    }
                  }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={getProjectImage(project)}
                      alt={`${project.title} - ${project.description}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-clean-gray-900">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="heading-sm mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-clean-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-clean-gray-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <svg className="w-16 h-16 mx-auto text-clean-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-clean-gray-600 text-xl">לא נמצאו פרויקטים בקטגוריה זו</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-clean-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-clean-gray-800 hover:bg-white transition-all shadow-clean-lg touch-target"
                aria-label="סגור חלון מידע"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Hero Image */}
              <div className="relative h-96">
                <Image
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block px-4 py-2 bg-clean-gray-100 rounded-full text-sm font-semibold text-clean-gray-700 mb-4">
                  {selectedProject.category}
                </span>
                <h2 id="modal-title" className="heading-md mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-3 text-clean-gray-600 mb-6 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
                <p className="text-body mb-8">
                  {selectedProject.description}
                </p>

                {/* CTA */}
                <div className="text-center">
                  <Link href="/contact">
                    <button className="clean-btn text-lg px-12 py-4" aria-label="צור קשר לפרויקט דומה">
                      מעוניינים בפרויקט דומה? צרו קשר
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
