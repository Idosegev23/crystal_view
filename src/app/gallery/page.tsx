'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { projects, categories } from '@/lib/projects';

function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .toLowerCase()
    // keep latin, digits, and Hebrew letters (U+0590–U+05FF), replace others with '-'
    .replace(/[^a-z0-9\u0590-\u05FF]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const serviceCategories = useMemo(() => categories.filter(c => c !== 'כל הפרויקטים'), []);
  const grouped = useMemo(() => serviceCategories.map(cat => ({
    cat,
    slug: slugify(cat),
    items: projects.filter(p => p.category === cat)
  })), [serviceCategories]);

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

      {/* Services Navigation (anchors) */}
      <nav className="py-6" aria-label="ניווט לפי סוג שירות">
        <div className="section-padding">
          <div className="container-max">
            <motion.ul initial="initial" animate="animate" variants={staggerContainer} className="flex flex-wrap justify-center gap-3 sm:gap-4" role="list">
              {serviceCategories.map((cat) => (
                <motion.li key={slugify(cat)} variants={staggerItem} role="listitem">
                  <a
                    href={`#${slugify(cat)}`}
                    className="px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {cat}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </nav>

      {/* Grouped sections */}
      {grouped.map(({ cat, slug, items }) => (
        <section key={slug} id={slug} className="py-10 lg:py-14" aria-labelledby={`heading-${slug}`}>
          <div className="section-padding">
            <div className="container-max">
              <div className="text-center mb-6 lg:mb-8">
                <h2 id={`heading-${slug}`} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {cat}
                </h2>
              </div>

              <motion.div layout variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8" role="list">
                <AnimatePresence mode="wait">
                  {items.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      variants={staggerItem}
                      whileHover={{ y: -6 }}
                      className="group cursor-pointer"
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
                            className="object-cover"
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
      ))}

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
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { projects, categories } from '@/lib/projects';

function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .toLowerCase()
    // keep latin, digits, and Hebrew letters (U+0590–U+05FF), replace others with '-'
    .replace(/[^a-z0-9\u0590-\u05FF]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const openLightbox = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const serviceCategories = useMemo(() => categories.filter(c => c !== 'כל הפרויקטים'), []);
  const grouped = useMemo(() => serviceCategories.map(cat => ({
    cat,
    slug: slugify(cat),
    items: projects.filter(p => p.category === cat)
  })), [serviceCategories]);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <motion.div
              initial="initial"
              animate="animate"
              className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              >
                הפרויקטים שמגדירים אותנו
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                כל פרויקט הוא הזדמנות להראות מהי שלמות.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                גלו את מגוון הפרויקטים שביצענו ברחבי הארץ, כי התמונות אומרות הכל.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <nav className="py-8" aria-label="ניווט לפי סוג שירות">
        <div className="section-padding">
          <div className="container-max">
            <motion.ul
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              role="list"
            >
              {categories.filter(c => c !== 'כל הפרויקטים').map((cat) => (
                <motion.li key={slugify(cat)} variants={staggerItem} role="listitem">
                  <a href={`#${slugify(cat)}`} className="px-5 py-2.5 rounded-lg font-medium bg-crystal-dark/50 text-crystal-blue hover:bg-crystal-silver/20 transition-colors">
                    {cat}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </nav>

      {/* Gallery Section */}
      <section className="py-12 lg:py-20">
        <div className="section-padding">
          <div className="container-max">
            
            {/* Projects Grid */}
            <motion.div
              layout
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="wait">
                {projects.filter(p => p.category === 'כל הפרויקטים').map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={staggerItem}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(project)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-crystal-dark">
                      <div className="aspect-w-16 aspect-h-12 relative">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 right-0 left-0 p-6">
                            <h3 className="text-xl font-bold text-crystal-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-crystal-white font-medium mb-2">
                              {project.location}
                            </p>
                            <p className="text-crystal-white text-sm line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-crystal-blue/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <span className="text-crystal-white text-sm font-medium">
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
                        <h3 className="text-xl font-bold text-crystal-silver mb-2">
                          {project.title}
                        </h3>
                        <p className="text-crystal-blue font-medium mb-2">
                          {project.location}
                        </p>
                        <p className="text-crystal-silver text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Grouped by Category */}
            {categories.filter(c => c !== 'כל הפרויקטים').map((cat) => (
              <section key={cat} id={slugify(cat)} className="pt-14" aria-labelledby={`heading-${slugify(cat)}`}>
                <div className="text-center mb-6">
                  <h2 id={`heading-${slugify(cat)}`} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{cat}</h2>
                </div>
                <motion.div layout variants={staggerContainer} initial="initial" animate="animate" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" role="list">
                  <AnimatePresence mode="wait">
                    {projects.filter(p => p.category === cat).map((project) => (
                      <motion.div key={project.id} layout variants={staggerItem} whileHover={{ y: -10 }} className="group cursor-pointer" onClick={() => openLightbox(project)} role="listitem" aria-label={`${project.title} – ${project.location} (${project.year})`}>
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-crystal-dark">
                          <div className="aspect-w-16 aspect-h-12 relative">
                            <Image src={project.images[0]} alt={`${project.title} – ${project.category} ב${project.location}`} width={400} height={300} className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 right-0 left-0 p-6">
                                <h3 className="text-xl font-bold text-crystal-white mb-2">{project.title}</h3>
                                <p className="text-crystal-white font-medium mb-2">{project.location}</p>
                                <p className="text-crystal-white text-sm line-clamp-2">{project.description}</p>
                              </div>
                            </div>
                            <div className="absolute top-4 left-4 bg-crystal-dark/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                              <span className="text-crystal-white text-sm font-medium">{project.year}</span>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-crystal-silver mb-1">{project.category}</p>
                            <h3 className="text-lg font-bold text-crystal-silver mb-1">{project.title}</h3>
                            <p className="text-crystal-blue text-sm">{project.location}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            ))}

            {/* Stats Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="mt-20 grid md:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "25+", label: "פרויקטים פעילים", icon: "🏗️" },
                { number: "500+", label: "פרויקטים הושלמו", icon: "✅" },
                { number: "15+", label: "שנות ניסיון", icon: "📅" },
                { number: "100%", label: "שביעות רצון לקוחות", icon: "😊" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-xl glass-effect"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-crystal-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-crystal-silver text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-2xl shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-crystal-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-crystal-white hover:bg-crystal-silver/20 transition-colors"
              >
                ✕
              </button>

              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {selectedProject.images.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-12">
                    <Image
                      src={image}
                      alt={`${selectedProject.title} - תמונה ${index + 1}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="p-6 pt-0">
                <h3 className="text-3xl font-bold text-crystal-silver mb-4">
                  {selectedProject.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-crystal-blue font-bold mb-2">מיקום</h4>
                    <p className="text-crystal-silver">{selectedProject.location}</p>
                  </div>
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

                {/* CTA */}
                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/contact'}
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