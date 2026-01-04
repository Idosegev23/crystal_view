'use client';

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const firstRow = projects.slice(0, Math.ceil(projects.length / 2));
const secondRow = projects.slice(Math.ceil(projects.length / 2));

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4', 'bento-mixed'];
  return classes[index % classes.length];
};

const ProjectCard = ({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) => {
  return (
    <Link href="/gallery" className="group block">
      <figure
        className={cn(
          "relative h-72 w-80 cursor-pointer overflow-hidden",
          "glass-card",
          getBentoClass(index),
          "transition-all duration-500"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={project.images[0]}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="320px"
            role="presentation"
          />
          
          {/* Glass overlay on hover */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-glass-dark/80 via-glass-charcoal/20 to-transparent" 
            aria-hidden="true" 
          />
          
          {/* Text overlay - bottom */}
          <figcaption className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-semibold text-lg mb-1">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm">
              {project.category}
            </p>
          </figcaption>
        </div>
      </figure>
    </Link>
  );
};

export default function MarqueeGallery() {
  return (
    <section 
      className="glass-section glass-gradient-bg" 
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
          <p className="glass-subheading mb-4">גלריה</p>
          <h2 id="gallery-heading" className="glass-heading-lg mb-6">
            פרויקטים נבחרים
          </h2>
          <div className="glass-divider mx-auto" />
        </motion.div>
      </div>

      {/* Marquee Gallery */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-6">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + firstRow.length} />
          ))}
        </Marquee>
        
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-glass-ice" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-glass-ice" aria-hidden="true" />
      </div>

      {/* CTA Button */}
      <div className="container-max">
        <div className="text-center mt-16">
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-btn"
              style={{ borderRadius: '0 16px 16px 16px' }}
              aria-label="צפה בכל הפרויקטים"
            >
              צפו בכל הפרויקטים
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
