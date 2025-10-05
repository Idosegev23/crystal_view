'use client';

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const firstRow = projects.slice(0, Math.ceil(projects.length / 2));
const secondRow = projects.slice(Math.ceil(projects.length / 2));

const ProjectCard = ({
  project,
}: {
  project: typeof projects[0];
}) => {
  return (
    <Link href="/gallery" className="group">
      <figure
        className={cn(
          "relative h-64 w-80 cursor-pointer overflow-hidden rounded-xl border",
          // light styles
          "border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md",
          // glass effect
          "shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]",
          "transition-all duration-500"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={project.images[0]}
            alt={`פרויקט ${project.title} - עבודות אלומיניום וזכוכית באיכות גבוהה`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="320px"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Text overlay - visible on hover for desktop, always visible on mobile */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 md:block">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-white/80 text-sm mb-1">
                {project.location}
              </p>
              <p className="text-white/60 text-xs">
                {project.category}
              </p>
            </div>
            
            {/* Mobile - always visible text */}
            <div className="md:hidden">
              <h3 className="text-white font-bold text-base mb-1 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-white/80 text-sm">
                {project.location}
              </p>
            </div>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export default function MarqueeGallery() {
  return (
    <section className="py-20 lg:py-32 relative" aria-labelledby="gallery-heading" role="region">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 lg:mb-20 px-6"
        >
          <div className="glass-card p-8 mb-12 max-w-4xl mx-auto">
            <h2
              id="gallery-heading"
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
            >
              פרויקטים נבחרים
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              כל פרויקט הוא הזדמנות להראות מהי שלמות
            </p>
          </div>
        </motion.div>

        {/* Marquee Gallery */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem]" repeat={5}>
            {firstRow.map((project) => (
              <ProjectCard key={`first-${project.id}`} project={project} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:1rem]" repeat={5}>
            {secondRow.map((project) => (
              <ProjectCard key={`second-${project.id}`} project={project} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white via-white/50 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/50 to-transparent z-10"></div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button text-gray-800 px-12 py-4 font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              צפו בכל הפרויקטים
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
