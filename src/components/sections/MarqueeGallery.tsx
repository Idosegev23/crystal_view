'use client';

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const firstRow = projects.slice(0, Math.ceil(projects.length / 4));
const secondRow = projects.slice(Math.ceil(projects.length / 4), Math.ceil(projects.length / 2));
const thirdRow = projects.slice(Math.ceil(projects.length / 2), Math.ceil(projects.length * 3 / 4));
const fourthRow = projects.slice(Math.ceil(projects.length * 3 / 4));

const ProjectCard = ({
  project,
}: {
  project: typeof projects[0];
}) => {
  return (
    <Link href="/gallery" className="group">
      <figure
        className={cn(
          "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-72",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className="relative h-48 w-full mb-2">
          <Image
            src={project.images[0]}
            alt={`פרויקט ${project.title}`}
            fill
            className="object-cover rounded-lg"
            sizes="288px"
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white line-clamp-2">
            {project.title}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40 mt-1">{project.location}</p>
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

        {/* 3D Marquee Gallery */}
        <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
          <div
            className="flex flex-row items-center gap-4"
            style={{
              transform:
                "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
            }}
          >
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstRow.map((project) => (
                <ProjectCard key={`first-${project.id}`} project={project} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
              {secondRow.map((project) => (
                <ProjectCard key={`second-${project.id}`} project={project} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
              {thirdRow.map((project) => (
                <ProjectCard key={`third-${project.id}`} project={project} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" vertical>
              {fourthRow.map((project) => (
                <ProjectCard key={`fourth-${project.id}`} project={project} />
              ))}
            </Marquee>
          </div>

          <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
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
