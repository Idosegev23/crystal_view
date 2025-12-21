'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    // Check if this is a fresh page load (not navigation)
    const isFirstLoad = !sessionStorage.getItem('hasLoaded');
    
    if (!isFirstLoad) {
      setIsVisible(false);
      return;
    }

    // Mark as loaded for this session
    sessionStorage.setItem('hasLoaded', 'true');

    // Minimum display time for smooth UX
    const minDisplayTime = 1500;
    const startTime = Date.now();

    // Animate fill progress smoothly
    const fillInterval = setInterval(() => {
      setFillProgress(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval);
          return 100;
        }
        // Ease-out effect - slower as it approaches 100
        const increment = Math.max(1, (100 - prev) / 20);
        return Math.min(100, prev + increment);
      });
    }, 40);

    // Handle page load
    const handleComplete = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        setFillProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => setIsVisible(false), 600);
        }, 300);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      window.addEventListener('load', handleComplete);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      handleComplete();
    }, 4000);

    return () => {
      clearInterval(fillInterval);
      window.removeEventListener('load', handleComplete);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div className={`relative flex flex-col items-center gap-8 transition-all duration-500 ${
        isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        {/* Logo Container with Fill Effect */}
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          {/* Background Logo (grayscale/outline) */}
          <Image
            src="/logontext.png"
            alt=""
            fill
            className="object-contain opacity-15 grayscale"
            priority
          />
          
          {/* Filling Logo with clip mask */}
          <div 
            className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
            style={{ 
              clipPath: `inset(${100 - fillProgress}% 0 0 0)` 
            }}
          >
            <Image
              src="/logontext.png"
              alt="Crystal View"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Subtle glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl bg-glass-blue/20 transition-opacity duration-500"
            style={{ opacity: fillProgress / 200 }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-40 h-0.5 bg-glass-mist/40 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-glass-blue via-glass-accent to-glass-blue transition-all duration-200 ease-out rounded-full"
            style={{ width: `${fillProgress}%` }}
          />
        </div>

        {/* Brand name */}
        <p className="text-glass-charcoal/50 text-xs tracking-[0.3em] font-light uppercase">
          Crystal View
        </p>
      </div>
    </div>
  );
}
