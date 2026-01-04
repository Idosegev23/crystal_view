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

// Create a flat list of all images with their project info
interface GalleryImage {
  src: string;
  project: typeof projects[0];
  imageIndex: number;
}

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string>('כל הפרויקטים');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tags = useMemo(() => categories, []);
  
  // Create flat list of all images
  const allImages = useMemo(() => {
    const images: GalleryImage[] = [];
    const filteredProjects = selectedTag === 'כל הפרויקטים' 
      ? projects 
      : projects.filter((p) => p.category === selectedTag);
    
    filteredProjects.forEach(project => {
      project.images.forEach((src, imageIndex) => {
        images.push({ src, project, imageIndex });
      });
    });
    return images;
  }, [selectedTag]);

  const openLightbox = (galleryImage: GalleryImage) => {
    setSelectedImage(galleryImage);
    // Find the index of this image in the project's images array
    setCurrentImageIndex(galleryImage.imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage) {
      const newIndex = (currentImageIndex + 1) % selectedImage.project.images.length;
      setCurrentImageIndex(newIndex);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const newIndex = (currentImageIndex - 1 + selectedImage.project.images.length) % selectedImage.project.images.length;
      setCurrentImageIndex(newIndex);
    }
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
            <p className="glass-body mt-6">{allImages.length} תמונות</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-18 lg:top-20 z-40 py-3 glass-panel border-b border-glass-mist/50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-2" role="tablist">
            {tags.map((tag, index) => {
              const count = tag === 'כל הפרויקטים' 
                ? projects.reduce((acc, p) => acc + p.images.length, 0)
                : projects.filter(p => p.category === tag).reduce((acc, p) => acc + p.images.length, 0);
              
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

      {/* Bento Grid - All Images */}
      <section id="projects-grid" className="py-8 md:py-12 lg:py-16" role="tabpanel">
        <div className="container-max">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
            <AnimatePresence mode="popLayout">
              {allImages.map((galleryImage, index) => (
                <motion.article
                  key={`${galleryImage.project.id}-${galleryImage.imageIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.5) }}
                  style={getBentoStyle(index)}
                  className="aspect-square glass-card cursor-pointer overflow-hidden group relative"
                  onClick={() => openLightbox(galleryImage)}
                  role="button"
                  tabIndex={0}
                  aria-label={`פתח ${galleryImage.project.title} - תמונה ${galleryImage.imageIndex + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(galleryImage);
                    }
                  }}
                >
                  <Image
                    src={galleryImage.src}
                    alt={`${galleryImage.project.title} - תמונה ${galleryImage.imageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-glass-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-xs md:text-sm line-clamp-1">{galleryImage.project.title}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {allImages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="glass-body text-xl">לא נמצאו תמונות בקטגוריה זו</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-glass-dark/95 backdrop-blur-md overflow-y-auto"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button - Fixed */}
            <button
              onClick={closeLightbox}
              style={{ borderRadius: '0 12px 12px 12px' }}
              className="fixed top-4 left-4 z-[60] w-12 h-12 glass-panel flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all touch-target"
              aria-label="סגור"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <div className="min-h-screen py-8 px-4" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: '0 24px 24px 24px' }}
                className="max-w-6xl mx-auto glass-card overflow-hidden"
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
                        src={selectedImage.project.images[currentImageIndex]}
                        alt={`${selectedImage.project.title} - תמונה ${currentImageIndex + 1}`}
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
                    {currentImageIndex + 1} / {selectedImage.project.images.length}
                  </div>

                  {/* Navigation Arrows */}
                  {selectedImage.project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-panel bento-1 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all"
                        aria-label="תמונה קודמת"
                      >
                        <span className="text-xl">&rarr;</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-panel bento-2 flex items-center justify-center text-glass-charcoal hover:bg-glass-blue hover:text-white transition-all"
                        aria-label="תמונה הבאה"
                      >
                        <span className="text-xl">&larr;</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {selectedImage.project.images.length > 1 && (
                  <div className="p-4 bg-glass-frost border-t border-glass-mist">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {selectedImage.project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                          className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-glass-blue scale-105' 
                              : 'opacity-60 hover:opacity-100'
                          }`}
                          style={getBentoStyle(index)}
                          aria-label={`תמונה ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedImage.project.title} - תמונה ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
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
                      {selectedImage.project.category}
                    </span>
                    <span className="text-glass-steel text-sm">{selectedImage.project.year}</span>
                  </div>
                  
                  <h2 className="glass-heading-md mb-4">{selectedImage.project.title}</h2>
                  <p className="glass-body mb-8 max-w-3xl">{selectedImage.project.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link href="/contact">
                      <button className="glass-btn" style={{ borderRadius: '0 16px 16px 16px' }}>
                        מעוניינים בפרויקט דומה?
                      </button>
                    </Link>
                    <button 
                      onClick={closeLightbox}
                      className="glass-btn-outline" 
                      style={{ borderRadius: '16px 0 16px 16px' }}
                    >
                      חזרה לגלריה
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
