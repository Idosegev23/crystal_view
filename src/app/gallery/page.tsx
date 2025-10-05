'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categories } from '@/lib/projects';
import { ShimmerButton } from '@/components/ui/shimmer-button';

// Helper to get the first image from project
const getProjectImage = (project: any) => {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images[0];
  }
  return project.image || '/images/hero.jpg';
};

// Masonry layout algorithm - distributes items across columns evenly
const distributeMasonryItems = (items: any[], columns: number) => {
  const columnArrays: any[][] = Array.from({ length: columns }, () => []);
  const columnHeights = Array(columns).fill(0);

  items.forEach((item, index) => {
    // Assign varying heights for visual interest
    const heightVariants = [1, 1.2, 1.5, 1, 1.3, 1, 1.4, 1];
    const itemHeight = heightVariants[index % heightVariants.length];
    
    // Find column with minimum height
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
    
    // Add item to that column
    columnArrays[minHeightIndex].push({ ...item, height: itemHeight });
    columnHeights[minHeightIndex] += itemHeight;
  });

  return columnArrays;
};

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string>('כל הפרויקטים');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [columns, setColumns] = useState(3);

  // Detect screen size and set columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const tags = useMemo(() => categories, []);
  
  const filteredProjects = useMemo(
    () => (selectedTag === 'כל הפרויקטים' ? projects : projects.filter((p) => p.category === selectedTag)),
    [selectedTag]
  );

  // Distribute projects across columns
  const masonryColumns = useMemo(
    () => distributeMasonryItems(filteredProjects, columns),
    [filteredProjects, columns]
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
              גלריית הפרויקטים שלנו
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              עבודות אלומיניום מעוצבות ומקצועיות שביצענו ברחבי הארץ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters with Glass Effect */}
      <section className="sticky top-20 z-40 py-6 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {tags.map((tag, index) => {
                const count = tag === 'כל הפרויקטים' 
                  ? projects.length 
                  : projects.filter(p => p.category === tag).length;
                
                return (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.05, 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20 
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedTag === tag
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tag}
                    <span className={`mr-2 text-xs px-2 py-0.5 rounded-full ${
                      selectedTag === tag
                        ? 'bg-white/20'
                        : 'bg-gray-200'
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="text-center text-sm text-gray-600"
            >
              מציג {filteredProjects.length} פרויקטים
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* True Masonry Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
            <AnimatePresence mode="popLayout">
              {masonryColumns.map((column, columnIndex) => (
                <motion.div
                  key={`column-${columnIndex}-${selectedTag}`}
                  layout
                  className="flex-1 flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {column.map((project, itemIndex) => {
                    const globalIndex = columnIndex * column.length + itemIndex;
                    return (
                      <motion.div
                        key={project.id}
                        layout
                        layoutId={`project-${project.id}`}
                        initial={{ 
                          opacity: 0, 
                          scale: 0.8, 
                          y: 50 
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 120,
                            damping: 20,
                            mass: 0.8,
                            delay: globalIndex * 0.03
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.85,
                          y: -20,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            mass: 0.5
                          }
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          y: -8,
                          zIndex: 10,
                          transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 12,
                            mass: 0.6
                          }
                        }}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        style={{
                          aspectRatio: project.height > 1.3 ? '3/4' : project.height > 1.1 ? '4/5' : '1/1'
                        }}
                        onClick={() => openLightbox(project)}
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={getProjectImage(project)}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-3">
                              {project.category}
                            </span>
                            <h3 className="text-white font-bold text-lg sm:text-xl mb-2 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <span>{project.location}</span>
                              <span>•</span>
                              <span>{project.year}</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 z-20 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
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
              <p className="text-gray-500 text-xl">לא נמצאו פרויקטים בקטגוריה זו</p>
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0, 
                y: 50,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }
              }}
              className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg"
                aria-label="סגור"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 mb-4">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-3 text-gray-600 mb-6">
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* CTA */}
                <div className="text-center">
                  <Link href="/contact">
                    <ShimmerButton className="shadow-2xl glass-button-liquid">
                      <span className="text-center text-lg leading-none font-bold tracking-tight whitespace-pre-wrap text-white lg:text-xl">
                        מעוניינים בפרויקט דומה? צרו קשר
                      </span>
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}