'use client';

/* eslint-disable @next/next/no-img-element */
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
          "relative h-64 w-80 cursor-pointer overflow-hidden rounded-xl",
          "clean-card shadow-clean hover:shadow-clean-md",
          "transition-all duration-300"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={project.images[0]}
            alt={`פרויקט ${project.title} - ${project.location}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="320px"
          />
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 text-shadow-light">
              {project.title}
            </h3>
            <p className="text-white/90 text-sm font-medium text-shadow-light">
              {project.location}
            </p>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export default function MarqueeGallery() {
  return (
    <section 
      className="clean-section bg-white" 
      aria-labelledby="gallery-heading" 
      role="region"
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
          <h2
            id="gallery-heading"
            className="heading-lg mb-6"
          >
            פרויקטים נבחרים
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            כל פרויקט הוא הזדמנות להראות מהי שלמות
          </p>
        </motion.div>
      </div>

      {/* Marquee Gallery */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Marquee>
        
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" aria-hidden="true" />
      </div>

      {/* CTA Button */}
      <div className="container-max">
        <div className="text-center mt-16">
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="clean-btn text-lg px-12 py-4"
              aria-label="צפה בכל הפרויקטים בגלריה המלאה"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              צפו בכל הפרויקטים
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
