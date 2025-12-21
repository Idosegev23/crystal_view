'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    // Animate fill progress
    const fillInterval = setInterval(() => {
      setFillProgress(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Check if page is loaded
    const handleLoad = () => {
      setTimeout(() => {
        setFillProgress(100);
        setTimeout(() => setIsLoading(false), 400);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      setFillProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 3000);

    return () => {
      clearInterval(fillInterval);
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-glass-light transition-opacity duration-500 ${
        fillProgress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo Container with Fill Effect */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Background Logo (grayscale/outline) */}
          <Image
            src="/logontext.png"
            alt=""
            fill
            className="object-contain opacity-20 grayscale"
            priority
          />
          
          {/* Filling Logo with clip mask */}
          <div 
            className="absolute inset-0 overflow-hidden transition-all duration-100 ease-out"
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
          
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent animate-shimmer"
            style={{
              transform: `translateY(${100 - fillProgress}%)`,
            }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-glass-mist/30 rounded-full overflow-hidden bento-soft">
          <div 
            className="h-full bg-gradient-to-r from-glass-blue to-glass-blue/60 transition-all duration-100 ease-out rounded-full"
            style={{ width: `${fillProgress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-glass-charcoal/60 text-sm tracking-widest font-light">
          טוען...
        </p>
      </div>
    </div>
  );
}

