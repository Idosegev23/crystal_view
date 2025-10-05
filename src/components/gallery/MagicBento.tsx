'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
}

export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = '132, 0, 255'
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global spotlight effect
  useEffect(() => {
    if (!mounted || !enableSpotlight || !spotlightRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      
      gsap.to(spotlightRef.current, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, enableSpotlight]);

  // Card hover effects
  useEffect(() => {
    if (!mounted || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.card');

    cards.forEach((card) => {
      const cardElement = card as HTMLElement;

      // Border glow effect
      if (enableBorderGlow) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = cardElement.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          cardElement.style.setProperty('--glow-x', `${x}%`);
          cardElement.style.setProperty('--glow-y', `${y}%`);
          cardElement.style.setProperty('--glow-intensity', '1');
        };

        const handleMouseLeave = () => {
          cardElement.style.setProperty('--glow-intensity', '0');
        };

        cardElement.addEventListener('mousemove', handleMouseMove);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
      }

      // Tilt effect
      if (enableTilt) {
        const handleTilt = (e: MouseEvent) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;

          gsap.to(cardElement, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 1000,
            ease: 'power2.out'
          });
        };

        const handleTiltReset = () => {
          gsap.to(cardElement, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out'
          });
        };

        cardElement.addEventListener('mousemove', handleTilt);
        cardElement.addEventListener('mouseleave', handleTiltReset);
      }

      // Magnetism effect
      if (enableMagnetism) {
        const handleMagnet = (e: MouseEvent) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(cardElement, {
            duration: 0.3,
            x: x * 0.1,
            y: y * 0.1,
            ease: 'power2.out'
          });
        };

        const handleMagnetReset = () => {
          gsap.to(cardElement, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)'
          });
        };

        cardElement.addEventListener('mousemove', handleMagnet);
        cardElement.addEventListener('mouseleave', handleMagnetReset);
      }

      // Click effect
      if (clickEffect) {
        const handleClick = () => {
          gsap.to(cardElement, {
            duration: 0.1,
            scale: 0.95,
            ease: 'power2.in',
            onComplete: () => {
              gsap.to(cardElement, {
                duration: 0.3,
                scale: 1,
                ease: 'elastic.out(1, 0.3)'
              });
            }
          });
        };

        cardElement.addEventListener('click', handleClick);
      }
    });
  }, [mounted, enableBorderGlow, enableTilt, enableMagnetism, clickEffect]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">טוען גלריה...</div>
      </div>
    );
  }

  return (
    <section className="bento-section relative py-20 lg:py-32 bg-[#060010] overflow-hidden">
      {/* Global Spotlight */}
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          className="global-spotlight fixed pointer-events-none"
          style={{
            width: `${spotlightRadius * 2}px`,
            height: `${spotlightRadius * 2}px`,
            background: `radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 200
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={gridRef}
          className="card-grid"
        >
          {projects.slice(0, 6).map((project, index) => (
            <Link
              key={project.id}
              href={`/gallery#${project.id}`}
              className={`card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow ? 'card--border-glow' : ''}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-40"
                  sizes="(max-width: 599px) 90vw, (max-width: 1023px) 45vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[#060010]/50 to-transparent" />
              </div>

              {/* Stars/Particles */}
              {enableStars && (
                <div className="particle-container absolute inset-0 z-0">
                  {Array.from({ length: particleCount }).map((_, i) => (
                    <div
                      key={i}
                      className="particle absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="card__header">
                <span className="card__label text-purple-400 font-semibold">
                  {project.category}
                </span>
              </div>

              <div className="card__content">
                <h3 className="card__title text-white font-bold">
                  {project.title}
                </h3>
                <p className="card__description text-gray-300">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


