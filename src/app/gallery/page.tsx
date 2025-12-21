'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categories } from '@/lib/projects';

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

// Bento grid patterns - some items span 2 cols or 2 rows
const getBentoSpan = (index: number) => {
  const pattern = index % 6;
  if (pattern === 0) return 'col-span-1 row-span-2'; // Tall
  if (pattern === 3) return 'col-span-2 row-span-1'; // Wide
  return 'col-span-1 row-span-1'; // Normal
};

const getProjectImage = (project: typeof projects[0]) => {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images[0];
  }
  return '/images/hero.jpg';
};

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string>('כל הפרויקטים');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const tags = useMemo(() => categories, []);
  
  const filteredProjects = useMemo(
    () => (selectedTag === 'כל הפרויקטים' ? projects : projects.filter((p) => p.category === selectedTag)),
    [selectedTag]
  );

  const openLightbox = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <main id="main-content" role="main" className="min-h-screen bg-glass-white" dir="rtl">
      {/* Hero Section */}
      <section className="pt-36 pb-12 glass-gradient-bg">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">עבודות</p>
            <h1 className="glass-heading-lg mb-6">גלריית הפרויקטים</h1>
            <div className="glass-divider mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-18 lg:top-20 z-40 py-3 glass-panel border-b border-glass-mist/50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-2" role="tablist">
            {tags.map((tag, index) => {
              const count = tag === 'כל הפרויקטים' 
                ? projects.length 
                : projects.filter(p => p.category === tag).length;
              
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  role="tab"
                  aria-selected={selectedTag === tag}
                  style={getBentoStyle(index)}
                  className={`px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 touch-target ${
                    selectedTag === tag
                      ? 'bg-glass-blue text-white shadow-glass'
                      : 'glass-panel text-glass-steel hover:text-glass-charcoal hover:shadow-glass'
                  }`}
                >
                  {tag} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="projects-grid" className="py-8 md:py-12 lg:py-16" role="tabpanel">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[200px] gap-2 md:gap-3 lg:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  style={getBentoStyle(index)}
                  className={`${getBentoSpan(index)} glass-card cursor-pointer overflow-hidden group relative`}
                  onClick={() => openLightbox(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`פתח ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(project);
                    }
                  }}
                >
                  <Image
                    src={getProjectImage(project)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-glass-dark/80 via-glass-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-xs md:text-sm lg:text-base line-clamp-1">{project.title}</h3>
                    <p className="text-white/70 text-xs hidden md:block">{project.location}</p>
                  </div>
                  
                  {/* Category Badge */}
                  <div 
                    className="absolute top-2 right-2 md:top-3 md:right-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-glass-charcoal text-[10px] md:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ borderRadius: '0 8px 8px 8px' }}
                  >
                    {project.category}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="glass-body text-xl">לא נמצאו פרויקטים בקטגוריה זו</p>
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
            className="fixed inset-0 z-50 bg-glass-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ borderRadius: '0 24px 24px 24px' }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                style={{ borderRadius: '0 12px 12px 12px' }}
                className="absolute top-4 left-4 z-10 w-10 h-10 glass-panel flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all touch-target"
                aria-label="סגור"
              >
                <span className="text-xl">&times;</span>
              </button>

              <div className="relative aspect-video" style={{ borderRadius: '0 24px 0 0' }}>
                <Image
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  style={{ borderRadius: '0 24px 0 0' }}
                  sizes="80vw"
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="glass-subheading mb-2">{selectedProject.category}</p>
                <h2 className="glass-heading-sm md:glass-heading-md mb-2">{selectedProject.title}</h2>
                <p className="text-glass-steel text-sm mb-4">{selectedProject.location} — {selectedProject.year}</p>
                <p className="glass-body text-sm md:text-base mb-6">{selectedProject.description}</p>
                <Link href="/contact">
                  <button className="glass-btn text-sm" style={{ borderRadius: '0 16px 16px 16px' }}>
                    מעוניינים בפרויקט דומה?
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
