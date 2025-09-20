'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useFocusManagement } from '@/hooks/useFocusManagement';

export default function AccessibilityWidget() {
  const {
    settings,
    updateSetting,
    resetSettings,
    announceToScreenReader,
    announcement
  } = useAccessibility();

  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  
  // Use our custom focus management hook
  const { focusRef, handleKeyNavigation, restoreFocus } = useFocusManagement();

  const closeWidget = useCallback(() => {
    updateSetting('isOpen', false);
    announceToScreenReader('תפריט נגישות נסגר');
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, [updateSetting, announceToScreenReader]);

  const toggleWidget = useCallback(() => {
    const newIsOpen = !settings.isOpen;
    updateSetting('isOpen', newIsOpen);

    if (newIsOpen) {
      announceToScreenReader('תפריט נגישות נפתח - השתמש בטאב לניווט בין האפשרויות');
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    } else {
      announceToScreenReader('תפריט נגישות נסגר');
      setTimeout(() => triggerRef.current?.focus(), 100);
    }
  }, [settings.isOpen, updateSetting, announceToScreenReader]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settings.isOpen && widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        closeWidget();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [settings.isOpen, closeWidget]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!settings.isOpen) {
        // Alt + A to open widget
        if (e.altKey && e.key.toLowerCase() === 'a') {
          e.preventDefault();
          toggleWidget();
        }
        return;
      }

      // Handle escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        closeWidget();
        return;
      }

      // Use our enhanced keyboard navigation
      handleKeyNavigation(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.isOpen, toggleWidget, closeWidget, handleKeyNavigation]);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(75, Math.min(175, settings.fontSize + increment));
    updateSetting('fontSize', newSize);
    announceToScreenReader(`גודל טקסט שונה ל-${newSize} אחוז`);
  };

  const handleBooleanToggle = (key: keyof typeof settings, onMessage: string, offMessage: string) => {
    const currentValue = settings[key] as boolean;
    const newValue = !currentValue;
    updateSetting(key, newValue as any);
    announceToScreenReader(newValue ? onMessage : offMessage);
  };

  const handleFontFamilyToggle = () => {
    const newFont = settings.fontFamily === 'default' ? 'readable' : 'default';
    updateSetting('fontFamily', newFont);
    announceToScreenReader(newFont === 'readable' ? 'גופן קריא הופעל - שונה לגופן Arial' : 'גופן קריא כובה - חזר לגופן ברירת המחדל');
  };

  const handleResetSettings = () => {
    resetSettings();
    announceToScreenReader('כל ההגדרות אופסו לברירת המחדל');
  };

  // Dynamic styling based on current accessibility modes
  const getTriggerButtonClasses = () => {
    let baseClasses = "accessibility-widget-trigger fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group focus-visible:outline-4 focus-visible:outline-offset-3";

    if (settings.highContrast) {
      return `${baseClasses} bg-black text-white border-4 border-white hover:bg-white hover:text-black focus-visible:outline-yellow-400`;
    } else if (settings.invertedContrast) {
      return `${baseClasses} bg-white text-black border-4 border-black hover:bg-gray-200 focus-visible:outline-blue-600`;
    } else if (settings.darkMode) {
      return `${baseClasses} bg-gray-800 text-white border-4 border-gray-600 hover:bg-gray-700 hover:border-teal-400 focus-visible:outline-teal-400 shadow-2xl`;
    } else {
      return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl focus-visible:outline-white`;
    }
  };

  const getPanelClasses = () => {
    let baseClasses = "fixed top-0 right-0 h-full w-96 max-w-[90vw] shadow-2xl z-50 overflow-y-auto";

    if (settings.highContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-black`;
    } else if (settings.invertedContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-gray-400`;
    } else if (settings.darkMode) {
      return `${baseClasses} bg-gray-900 text-white border-l-4 border-gray-700 shadow-3xl`;
    } else {
      return `${baseClasses} bg-white`;
    }
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
        aria-label="הודעות נגישות"
      >
        {announcement}
      </div>

      {/* Floating trigger button with dynamic styling */}
      <motion.button
        ref={triggerRef}
        onClick={toggleWidget}
        className={getTriggerButtonClasses()}
        data-accessibility-trigger
        aria-label={settings.isOpen ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות - קיצור מקלדת Alt ועוד A'}
        aria-expanded={settings.isOpen}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        aria-describedby="accessibility-trigger-help"
        title="תפריט נגישות - Alt+A"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${settings.isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-labelledby="accessibility-icon-title"
        >
          <title id="accessibility-icon-title">סמל נגישות</title>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.12-4.06l10.94 10.94C14.86 19.59 13.48 20 12 20zM18.88 15.94L7.94 5.06C9.14 4.41 10.52 4 12 4c4.41 0 8 3.59 8 8 0 1.48-.41 2.86-1.12 4.06z"/>
        </svg>
        <span id="accessibility-trigger-help" className="sr-only">
          לחץ כדי לפתוח תפריט נגישות או השתמש בקיצור מקלדת Alt+A
        </span>
      </motion.button>

      {/* Accessibility panel */}
      <AnimatePresence>
        {settings.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={closeWidget}
              aria-hidden="true"
            />

            {/* Panel with dynamic styling */}
            <motion.div
              ref={(node) => {
                if (widgetRef.current !== node) {
                  (widgetRef as any).current = node;
                }
                if (focusRef.current !== node) {
                  (focusRef as any).current = node;
                }
              }}
              id="accessibility-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className={getPanelClasses()}
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
              aria-modal="true"
            >
              <div className="p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                  <h1 id="accessibility-title" className="text-2xl font-bold text-gray-900">
                    הגדרות נגישות
                  </h1>
                  <button
                    ref={lastFocusableRef}
                    onClick={closeWidget}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-label="סגור תפריט נגישות"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </header>

                <p id="accessibility-description" className="text-gray-600 mb-6 text-sm">
                  התאם את האתר לצרכי הנגישות שלך. השינויים יישמרו אוטומטית ויחזרו בביקור הבא.
                </p>

                <div className="space-y-6">
                  {/* Text Adjustments Section */}
                  <section aria-labelledby="text-adjustments-title">
                    <h2 id="text-adjustments-title" className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                      התאמות טקסט
                    </h2>

                    {/* Font Size Controls */}
                    <div className="mb-4" role="group" aria-labelledby="font-size-label">
                      <label id="font-size-label" className="block text-sm font-semibold text-gray-900 mb-3">
                        גודל טקסט: {settings.fontSize}%
                        <span className="sr-only">גודל טקסט נוכחי הוא {settings.fontSize} אחוז</span>
                      </label>
                      <div className="flex items-center gap-3" role="group" aria-label="בקרי גודל טקסט">
                        <button
                          onClick={() => adjustFontSize(-25)}
                          disabled={settings.fontSize <= 75}
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label={`הקטן טקסט - גודל נוכחי ${settings.fontSize}%`}
                          aria-describedby="decrease-font-help"
                          type="button"
                        >
                          א-
                        </button>
                        <span id="decrease-font-help" className="sr-only">הקטנת טקסט ב-25 אחוז</span>

                        <button
                          onClick={() => updateSetting('fontSize', 100)}
                          className="px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label="איפוס גודל טקסט ל-100 אחוז"
                          type="button"
                        >
                          איפוס
                        </button>

                        <button
                          onClick={() => adjustFontSize(25)}
                          disabled={settings.fontSize >= 175}
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label={`הגדל טקסט - גודל נוכחי ${settings.fontSize}%`}
                          aria-describedby="increase-font-help"
                          type="button"
                        >
                          א+
                        </button>
                        <span id="increase-font-help" className="sr-only">הגדלת טקסט ב-25 אחוז</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2" aria-hidden="true">
                        <span>-25%</span>
                        <span>רגיל</span>
                        <span>+75%</span>
                      </div>
                    </div>

                    {/* Readable Font Toggle */}
                    <div className="flex items-center justify-between" role="group" aria-labelledby="readable-font-label">
                      <div>
                        <label id="readable-font-label" htmlFor="readable-font" className="text-sm font-semibold text-gray-900">
                          גופן קריא
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="readable-font-desc">
                          החלף לגופן Arial/Open Sans קריא יותר
                        </p>
                      </div>
                      <button
                        id="readable-font"
                        role="switch"
                        aria-checked={settings.fontFamily === 'readable'}
                        aria-describedby="readable-font-desc"
                        onClick={handleFontFamilyToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.fontFamily === 'readable' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.fontFamily === 'readable' ? 'גופן קריא פעיל - לחץ לכיבוי' : 'גופן קריא כבוי - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.fontFamily === 'readable' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </section>

                  {/* Contrast & Colors Section */}
                  <section aria-labelledby="contrast-colors-title">
                    <h2 id="contrast-colors-title" className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                      ניגודיות וצבעים
                    </h2>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="high-contrast-label">
                      <div>
                        <label id="high-contrast-label" htmlFor="high-contrast" className="text-sm font-semibold text-gray-900">
                          ניגודיות גבוהה
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="high-contrast-desc">
                          רקע שחור וטקסט לבן לראייה טובה יותר
                        </p>
                      </div>
                      <button
                        id="high-contrast"
                        role="switch"
                        aria-checked={settings.highContrast}
                        aria-describedby="high-contrast-desc"
                        onClick={() => handleBooleanToggle('highContrast', 'ניגודיות גבוהה הופעלה - רקע שחור וטקסט לבן', 'ניגודיות גבוהה כובתה - חזר למצב רגיל')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.highContrast ? 'ניגודיות גבוהה פעילה - לחץ לכיבוי' : 'ניגודיות גבוהה כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Inverted Contrast */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="inverted-contrast-label">
                      <div>
                        <label id="inverted-contrast-label" htmlFor="inverted-contrast" className="text-sm font-semibold text-gray-900">
                          ניגודיות הפוכה
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="inverted-contrast-desc">
                          רקע לבן וטקסט שחור מודגש
                        </p>
                      </div>
                      <button
                        id="inverted-contrast"
                        role="switch"
                        aria-checked={settings.invertedContrast}
                        disabled={settings.highContrast}
                        aria-describedby="inverted-contrast-desc"
                        onClick={() => handleBooleanToggle('invertedContrast', 'ניגודיות הפוכה הופעלה - רקע לבן וטקסט שחור מודגש', 'ניגודיות הפוכה כובתה - חזר למצב רגיל')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.invertedContrast ? 'bg-blue-600' : 'bg-gray-300'
                        } ${settings.highContrast ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.invertedContrast ? 'ניגודיות הפוכה פעילה - לחץ לכיבוי' : 'ניגודיות הפוכה כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.invertedContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Grayscale Mode */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="grayscale-label">
                      <div>
                        <label id="grayscale-label" htmlFor="grayscale-mode" className="text-sm font-semibold text-gray-900">
                          מצב אפור
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="grayscale-desc">
                          הצגה בגווני אפור בלבד לבהירות טובה יותר
                        </p>
                      </div>
                      <button
                        id="grayscale-mode"
                        role="switch"
                        aria-checked={settings.grayscaleMode}
                        aria-describedby="grayscale-desc"
                        onClick={() => handleBooleanToggle('grayscaleMode', 'מצב אפור הופעל - הצגה בגווני אפור בלבד', 'מצב אפור כובה - חזר לצבעים רגילים')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.grayscaleMode ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.grayscaleMode ? 'מצב אפור פעיל - לחץ לכיבוי' : 'מצב אפור כבוי - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.grayscaleMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Dark Mode */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="dark-mode-label">
                      <div>
                        <label id="dark-mode-label" htmlFor="dark-mode" className="text-sm font-semibold text-gray-900">
                          מצב כהה
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="dark-mode-desc">
                          עיצוב כהה נוח לעיניים במיוחד באור חלש
                        </p>
                      </div>
                      <button
                        id="dark-mode"
                        role="switch"
                        aria-checked={settings.darkMode}
                        disabled={settings.highContrast || settings.invertedContrast}
                        aria-describedby="dark-mode-desc"
                        onClick={() => handleBooleanToggle('darkMode', 'מצב כהה הופעל - עיצוב כהה נוח לעיניים', 'מצב כהה כובה - חזר למצב רגיל')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                        } ${(settings.highContrast || settings.invertedContrast) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.darkMode ? 'מצב כהה פעיל - לחץ לכיבוי' : 'מצב כהה כבוי - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Highlight Links */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="highlight-links-label">
                      <div>
                        <label id="highlight-links-label" htmlFor="highlight-links" className="text-sm font-semibold text-gray-900">
                          הדגש קישורים
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="highlight-links-desc">
                          קו תחתון וצבע מודגש לקישורים
                        </p>
                      </div>
                      <button
                        id="highlight-links"
                        role="switch"
                        aria-checked={settings.highlightLinks}
                        aria-describedby="highlight-links-desc"
                        onClick={() => handleBooleanToggle('highlightLinks', 'הדגשת קישורים הופעלה - קו תחתון וצבע מודגש', 'הדגשת קישורים כובתה - קישורים רגילים')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highlightLinks ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.highlightLinks ? 'הדגשת קישורים פעילה - לחץ לכיבוי' : 'הדגשת קישורים כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highlightLinks ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Highlight Headings */}
                    <div className="flex items-center justify-between" role="group" aria-labelledby="highlight-headings-label">
                      <div>
                        <label id="highlight-headings-label" htmlFor="highlight-headings" className="text-sm font-semibold text-gray-900">
                          הדגש כותרות
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="highlight-headings-desc">
                          מסגור או רקע מודגש לכותרות
                        </p>
                      </div>
                      <button
                        id="highlight-headings"
                        role="switch"
                        aria-checked={settings.highlightHeadings}
                        aria-describedby="highlight-headings-desc"
                        onClick={() => handleBooleanToggle('highlightHeadings', 'הדגשת כותרות הופעלה - מסגור ורקע מודגש לכותרות', 'הדגשת כותרות כובתה - כותרות רגילות')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highlightHeadings ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.highlightHeadings ? 'הדגשת כותרות פעילה - לחץ לכיבוי' : 'הדגשת כותרות כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highlightHeadings ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </section>

                  {/* Navigation & Content Section */}
                  <section aria-labelledby="navigation-content-title">
                    <h2 id="navigation-content-title" className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                      ניווט ותוכן
                    </h2>

                    {/* Enhanced Focus */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="enhanced-focus-label">
                      <div>
                        <label id="enhanced-focus-label" htmlFor="enhanced-focus" className="text-sm font-semibold text-gray-900">
                          פוקוס מוגבר
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="enhanced-focus-desc">
                          מסגור בולט יותר לאלמנטים בפוקוס לניווט טוב יותר עם מקלדת
                        </p>
                      </div>
                      <button
                        id="enhanced-focus"
                        role="switch"
                        aria-checked={settings.enhancedFocus}
                        aria-describedby="enhanced-focus-desc"
                        onClick={() => handleBooleanToggle('enhancedFocus', 'פוקוס מוגבר הופעל - מסגור בולט יותר לאלמנטים', 'פוקוס מוגבר כובה - מסגור רגיל')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.enhancedFocus ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.enhancedFocus ? 'פוקוס מוגבר פעיל - לחץ לכיבוי' : 'פוקוס מוגבר כבוי - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Improved Readability */}
                    <div className="flex items-center justify-between" role="group" aria-labelledby="improved-readability-label">
                      <div>
                        <label id="improved-readability-label" htmlFor="improved-readability" className="text-sm font-semibold text-gray-900">
                          קריאות משופרת
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="improved-readability-desc">
                          מרווחי שורות ושוליים טובים יותר לקריאה נוחה
                        </p>
                      </div>
                      <button
                        id="improved-readability"
                        role="switch"
                        aria-checked={settings.improvedReadability}
                        aria-describedby="improved-readability-desc"
                        onClick={() => handleBooleanToggle('improvedReadability', 'קריאות משופרת הופעלה - מרווחי שורות וטקסט טובים יותר', 'קריאות משופרת כובתה - מרווחים רגילים')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.improvedReadability ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.improvedReadability ? 'קריאות משופרת פעילה - לחץ לכיבוי' : 'קריאות משופרת כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.improvedReadability ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </section>

                  {/* Control Behavior Section */}
                  <section aria-labelledby="control-behavior-title">
                    <h2 id="control-behavior-title" className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                      בקרת התנהגות
                    </h2>

                    {/* Reduce Animations */}
                    <div className="flex items-center justify-between mb-3" role="group" aria-labelledby="reduce-animations-label">
                      <div>
                        <label id="reduce-animations-label" htmlFor="reduce-animations" className="text-sm font-semibold text-gray-900">
                          הפחת אנימציות
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="reduce-animations-desc">
                          השבת אנימציות ופרלקס להפחתת הפרעות
                        </p>
                      </div>
                      <button
                        id="reduce-animations"
                        role="switch"
                        aria-checked={settings.reduceAnimations}
                        aria-describedby="reduce-animations-desc"
                        onClick={() => handleBooleanToggle('reduceAnimations', 'הפחתת אנימציות הופעלה - אנימציות ופרלקס מושבתים', 'הפחתת אנימציות כובתה - אנימציות פעילות')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.reduceAnimations ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.reduceAnimations ? 'הפחתת אנימציות פעילה - לחץ לכיבוי' : 'הפחתת אנימציות כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.reduceAnimations ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Stop Autoplay */}
                    <div className="flex items-center justify-between" role="group" aria-labelledby="stop-autoplay-label">
                      <div>
                        <label id="stop-autoplay-label" htmlFor="stop-autoplay" className="text-sm font-semibold text-gray-900">
                          עצור הפעלה אוטומטית
                        </label>
                        <p className="text-xs text-gray-600 mt-1" id="stop-autoplay-desc">
                          השבת וידיאו ומחזורי תמונות אוטומטיים
                        </p>
                      </div>
                      <button
                        id="stop-autoplay"
                        role="switch"
                        aria-checked={settings.stopAutoplay}
                        aria-describedby="stop-autoplay-desc"
                        onClick={() => handleBooleanToggle('stopAutoplay', 'עצירת הפעלה אוטומטית הופעלה - וידיאו ומחזורי תמונות מושבתים', 'עצירת הפעלה אוטומטית כובתה - הפעלה אוטומטית פעילה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.stopAutoplay ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        type="button"
                      >
                        <span className="sr-only">
                          {settings.stopAutoplay ? 'עצירת הפעלה אוטומטית פעילה - לחץ לכיבוי' : 'עצירת הפעלה אוטומטית כבויה - לחץ להפעלה'}
                        </span>
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.stopAutoplay ? 'translate-x-6' : 'translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </section>
                </div>

                {/* Reset button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    ref={firstFocusableRef}
                    onClick={handleResetSettings}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-describedby="reset-help"
                    type="button"
                  >
                    איפוס לברירת מחדל
                  </button>
                  <p id="reset-help" className="sr-only">
                    מחזיר את כל ההגדרות למצב הראשוני
                  </p>
                </div>

                {/* Help section */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg" role="region" aria-labelledby="help-title">
                  <h3 id="help-title" className="font-semibold text-blue-900 mb-2 text-sm">
                    עזרה וקיצורי מקלדת
                  </h3>
                  <div className="text-blue-800 text-xs leading-relaxed">
                    <dl>
                      <dt className="sr-only">קיצורי מקלדת:</dt>
                      <dd className="mb-2">
                        <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs" aria-label="Alt ועוד A">Alt+A</kbd>
                        <span className="mr-2">פתיחת תפריט נגישות</span>
                        <br/>
                        <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs">Escape</kbd>
                        <span className="mr-2">סגירת תפריט</span>
                        <br/>
                        <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs">Tab</kbd>
                        <span className="mr-2">ניווט בין אפשרויות</span>
                      </dd>
                    </dl>
                    <p className="border-t border-blue-200 pt-2">
                      לתמיכה טכנית:
                      <a
                        href="tel:053-3366101"
                        className="underline font-medium hover:text-blue-600 mr-1"
                        aria-label="התקשר למספר 053-3366101 לתמיכה טכנית"
                      >
                        053-3366101
                      </a>
                      <br/>
                      <a
                        href="/accessibility-statement"
                        className="underline font-medium hover:text-blue-600"
                        aria-label="קרא את הצהרת הנגישות המלאה"
                      >
                        הצהרת נגישות מלאה
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}