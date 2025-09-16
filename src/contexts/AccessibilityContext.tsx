'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface AccessibilitySettings {
  // Text adjustments
  fontSize: number; // 100%, 125%, 150%, 175%
  fontFamily: 'default' | 'readable'; // Switch to readable font

  // Contrast & colors
  highContrast: boolean; // Black bg, white text
  invertedContrast: boolean; // White bg, black text bold
  grayscaleMode: boolean; // Grayscale filter
  darkMode: boolean; // Dark theme mode
  highlightLinks: boolean; // Underline + color links
  highlightHeadings: boolean; // Border/background highlight for headings

  // Navigation improvements
  enhancedFocus: boolean; // Visible focus ring

  // Content accessibility
  improvedReadability: boolean; // Better line spacing, margins

  // Control behavior
  reduceAnimations: boolean; // Toggle animations/parallax off
  stopAutoplay: boolean; // Toggle autoplay video/slider off

  // Panel state
  isOpen: boolean;
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  fontFamily: 'default',
  highContrast: false,
  invertedContrast: false,
  grayscaleMode: false,
  darkMode: false,
  highlightLinks: false,
  highlightHeadings: false,
  enhancedFocus: true,
  improvedReadability: false,
  reduceAnimations: false,
  stopAutoplay: false,
  isOpen: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  announceToScreenReader: (message: string) => void;
  announcement: string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY_SETTINGS);
  const [announcement, setAnnouncement] = useState<string>('');

  // Load saved settings on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedSettings = localStorage.getItem('crystal-view-accessibility');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed, isOpen: false })); // Never restore open state
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);

  const announceToScreenReader = useCallback((message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 1000);
  }, []);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };

      // Handle mutual exclusivity for contrast modes
      if (key === 'highContrast' && value === true) {
        newSettings.invertedContrast = false;
        newSettings.darkMode = false;
      } else if (key === 'invertedContrast' && value === true) {
        newSettings.highContrast = false;
        newSettings.darkMode = false;
      } else if (key === 'darkMode' && value === true) {
        newSettings.highContrast = false;
        newSettings.invertedContrast = false;
      }

      return newSettings;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
    announceToScreenReader('הגדרות נגישות אופסו לברירת מחדל');
  }, [announceToScreenReader]);

  // Apply settings to DOM and save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Save settings to localStorage (exclude isOpen state)
    const { isOpen, ...settingsToSave } = settings;
    localStorage.setItem('crystal-view-accessibility', JSON.stringify(settingsToSave));

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Font family
    if (settings.fontFamily === 'readable') {
      body.style.fontFamily = 'Arial, "Open Sans", sans-serif';
    } else {
      body.style.fontFamily = '';
    }

    // High contrast mode (black bg, white text)
    body.classList.toggle('accessibility-high-contrast', settings.highContrast);

    // Inverted contrast mode (white bg, black text)
    body.classList.toggle('accessibility-inverted-contrast', settings.invertedContrast);

    // Grayscale mode
    body.classList.toggle('accessibility-grayscale', settings.grayscaleMode);

    // Dark mode
    body.classList.toggle('accessibility-dark-mode', settings.darkMode);

    // Highlight links
    body.classList.toggle('accessibility-highlight-links', settings.highlightLinks);

    // Highlight headings
    body.classList.toggle('accessibility-highlight-headings', settings.highlightHeadings);

    // Enhanced focus
    body.classList.toggle('accessibility-enhanced-focus', settings.enhancedFocus);

    // Improved readability
    body.classList.toggle('accessibility-improved-readability', settings.improvedReadability);

    // Reduced animations
    body.classList.toggle('accessibility-reduce-animations', settings.reduceAnimations);

    // Stop autoplay
    body.classList.toggle('accessibility-stop-autoplay', settings.stopAutoplay);
    if (settings.stopAutoplay) {
      // Pause all videos and stop autoplay
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        const videoEl = video as HTMLVideoElement;
        videoEl.pause();
        videoEl.removeAttribute('autoplay');
        videoEl.muted = false; // Unmute to give users control
        videoEl.controls = true; // Show controls
      });

      // Stop auto-advancing carousels/sliders
      const autoSliders = document.querySelectorAll('[data-auto-slide], .carousel, .slider, .swiper');
      autoSliders.forEach(slider => {
        slider.setAttribute('data-auto-slide-paused', 'true');
        // Stop any running intervals on the element
        const intervals = (slider as any)._intervals || [];
        intervals.forEach((interval: number) => clearInterval(interval));
      });

      // Stop CSS animations
      const animatedElements = document.querySelectorAll('.animate-bounce, .animate-pulse, .animate-ping, .animate-spin');
      animatedElements.forEach(el => {
        (el as HTMLElement).style.animationPlayState = 'paused';
      });

      // Stop background video animations
      const heroVideos = document.querySelectorAll('.hero-video, .hero-video-pingpong');
      heroVideos.forEach(video => {
        (video as HTMLVideoElement).pause();
        (video as HTMLElement).style.animation = 'none';
        (video as HTMLElement).style.transform = 'none';
      });
    } else {
      // Re-enable autoplay when disabled
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        const videoEl = video as HTMLVideoElement;
        if (videoEl.hasAttribute('data-was-autoplay')) {
          videoEl.setAttribute('autoplay', '');
          videoEl.play().catch(() => {}); // Attempt to play, ignore if blocked
        }
      });
    }

  }, [settings]);

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSetting,
      resetSettings,
      announceToScreenReader,
      announcement
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}