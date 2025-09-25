
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { projects, categories } from '@/lib/projects';

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string>('כל הפרויקטים');

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <motion.div initial="initial" animate="animate" className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
              <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight">
                גלריית פרויקטים לפי סוג שירות
              </motion.h1>
              <motion.p variants={fadeInUp} transition={{ delay: 0.15 }} className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                דפדפו בפרויקטים אמיתיים שביצענו, מחולקים לפי קטגוריות. כל כרטיס כולל תמונה ברורה, מיקום ושנה, ותיאור קצר.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tag Filters */}
      <nav className="py-6" aria-label="סינון לפי תגיות">
        <div className="section-padding">
          <div className="container-max">
            <motion.ul
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              role="list"
            >
              {tags.map((tag) => (
                <motion.li key={tag} variants={staggerItem} role="listitem">
                  <button
                    type="button"
                    aria-pressed={selectedTag === tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </nav>

      {/* Unified Grid */}
      <section className="py-10 lg:py-14" aria-label="גלריית פרויקטים">
        <div className="section-padding">
          <div className="container-max">
            <motion.div
              layout
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
              role="list"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer w-full"
                    role="listitem"
                    aria-label={`${project.title} – ${project.location} (${project.year})`}
                    onClick={() => openLightbox(project)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
                      <div className="relative w-full h-56 sm:h-64">
                        <Image
                          src={project.images[0]}
                          alt={`${project.title} – ${project.category} ב${project.location}`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={false}
                        />
                        {/* Readable text overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                          <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{project.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-100">
                            <span>{project.location}</span>
                            <span>•</span>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </div>
                      {/* Card bottom info */}
                      <div className="p-4">
                        <p className="text-sm text-gray-700 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-2xl shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-neutral-800/90 rounded-full flex items-center justify-center text-white hover:bg-neutral-700 transition-colors"
                aria-label="סגור תצוגה"
              >
                ✕
              </button>

              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {selectedProject.images.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={image}
                      alt={`${selectedProject.title} - תמונה ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="p-6 pt-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-gray-300 mb-4">
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.category}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
                <p className="text-gray-200 leading-relaxed mb-6">{selectedProject.description}</p>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => (window.location.href = '/contact')}
                    className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                  >
                    מעוניינים בפרויקט דומה? בואו נדבר
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 