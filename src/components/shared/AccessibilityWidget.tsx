'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useFocusManagement } from '@/hooks/useFocusManagement';

// Icon components for better visual presentation
const IconFontSize = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

const IconContrast = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconNavigation = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);

const IconContent = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconMotion = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const { focusRef, handleKeyNavigation } = useFocusManagement();

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
        if (e.altKey && e.key.toLowerCase() === 'a') {
          e.preventDefault();
          toggleWidget();
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeWidget();
        return;
      }

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
    announceToScreenReader(newFont === 'readable' ? 'גופן קריא הופעל' : 'גופן קריא כובה');
  };

  const handleResetSettings = () => {
    resetSettings();
    announceToScreenReader('כל ההגדרות אופסו לברירת המחדל');
  };

  // Toggle component for reuse
  const ToggleButton = ({ 
    id, 
    checked, 
    onChange, 
    disabled = false,
    srText 
  }: { 
    id: string; 
    checked: boolean; 
    onChange: () => void; 
    disabled?: boolean;
    srText: string;
  }) => (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      type="button"
    >
      <span className="sr-only">{srText}</span>
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        aria-hidden="true"
      />
    </button>
  );

  // Option row component
  const OptionRow = ({ 
    id, 
    label, 
    description, 
    checked, 
    onChange,
    disabled = false 
  }: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
  }) => (
    <div className="flex items-center justify-between py-2" role="group" aria-labelledby={`${id}-label`}>
      <div className="flex-1 min-w-0">
        <label id={`${id}-label`} htmlFor={id} className="text-sm font-medium text-gray-900 block">
          {label}
        </label>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
      <ToggleButton
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        srText={checked ? `${label} פעיל` : `${label} כבוי`}
      />
    </div>
  );

  // Collapsible section component
  const Section = ({ 
    id, 
    title, 
    icon: Icon, 
    children 
  }: {
    id: string;
    title: string;
    icon: React.FC;
    children: React.ReactNode;
  }) => {
    const isOpen = activeSection === id;
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setActiveSection(isOpen ? null : id)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          aria-expanded={isOpen}
          aria-controls={`section-${id}`}
          type="button"
        >
          <div className="flex items-center gap-3">
            <span className="text-blue-600"><Icon /></span>
            <span className="text-sm font-semibold text-gray-900">{title}</span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-gray-500"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`section-${id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 divide-y divide-gray-100"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Dynamic styling based on current accessibility modes
  const getTriggerButtonClasses = () => {
    let baseClasses = "accessibility-widget-trigger fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group focus-visible:outline-4 focus-visible:outline-offset-3";

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
    let baseClasses = "fixed top-0 right-0 h-full w-[400px] max-w-[95vw] shadow-2xl z-50 overflow-y-auto";

    if (settings.highContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-black`;
    } else if (settings.invertedContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-gray-400`;
    } else if (settings.darkMode) {
      return `${baseClasses} bg-gray-900 text-white border-l-4 border-gray-700`;
    } else {
      return `${baseClasses} bg-white`;
    }
  };

  // Count active settings for badge
  const activeCount = Object.entries(settings).filter(([key, value]) => {
    if (key === 'isOpen' || key === 'fontSize' || key === 'fontFamily') return false;
    if (key === 'enhancedFocus') return false; // Default on
    return value === true;
  }).length + (settings.fontSize !== 100 ? 1 : 0) + (settings.fontFamily !== 'default' ? 1 : 0);

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

      {/* Floating trigger button */}
      <motion.button
        ref={triggerRef}
        onClick={toggleWidget}
        className={getTriggerButtonClasses()}
        data-accessibility-trigger
        aria-label={settings.isOpen ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות - קיצור מקלדת Alt ועוד A'}
        aria-expanded={settings.isOpen}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        title="תפריט נגישות - Alt+A"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-7 h-7 transition-transform duration-300 ${settings.isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/>
        </svg>
        
        {/* Active settings badge */}
        {activeCount > 0 && (
          <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {activeCount}
        </span>
        )}
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

            {/* Panel */}
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
              <div className="p-5">
                {/* Header */}
                <header className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h2 id="accessibility-title" className="text-xl font-bold text-gray-900">
                    הגדרות נגישות
                    </h2>
                    <p id="accessibility-description" className="text-xs text-gray-600 mt-1">
                      התאם את האתר לצרכיך
                    </p>
                  </div>
                  <button
                    ref={lastFocusableRef}
                    onClick={closeWidget}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-label="סגור תפריט נגישות"
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </header>

                {/* Quick Actions - Profiles */}
                <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs font-semibold text-blue-900 mb-2">פרופילים מומלצים</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        updateSetting('fontSize', 125);
                        updateSetting('improvedReadability', true);
                        announceToScreenReader('פרופיל לקויי ראייה הופעל');
                      }}
                      className="text-xs p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-blue-900"
                      type="button"
                    >
                      👁️ לקויי ראייה
                        </button>
                    <button
                      onClick={() => {
                        updateSetting('reduceAnimations', true);
                        updateSetting('stopAutoplay', true);
                        announceToScreenReader('פרופיל קוגניטיבי הופעל');
                      }}
                      className="text-xs p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-blue-900"
                      type="button"
                    >
                      🧠 קוגניטיבי
                        </button>
                    <button
                      onClick={() => {
                        updateSetting('highContrast', true);
                        updateSetting('fontSize', 125);
                        announceToScreenReader('פרופיל עיוורון צבעים הופעל');
                      }}
                      className="text-xs p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-blue-900"
                      type="button"
                    >
                      🎨 עיוורון צבעים
                        </button>
                      </div>
                    </div>

                <div className="space-y-3">
                  {/* Typography Section */}
                  <Section id="typography" title="טיפוגרפיה וטקסט" icon={IconFontSize}>
                    {/* Font size */}
                    <div className="py-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">גודל טקסט</span>
                        <span className="text-xs text-gray-500">{settings.fontSize}%</span>
                      </div>
                      <div className="flex items-center gap-2" role="group" aria-label="בקרי גודל טקסט">
                        <button
                          onClick={() => adjustFontSize(-25)}
                          disabled={settings.fontSize <= 75}
                          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-bold focus-visible:outline-2 focus-visible:outline-blue-600"
                          aria-label="הקטן טקסט"
                          type="button"
                        >
                          א-
                        </button>
                        <button
                          onClick={() => updateSetting('fontSize', 100)}
                          className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium focus-visible:outline-2 focus-visible:outline-blue-600"
                          aria-label="איפוס גודל טקסט"
                          type="button"
                        >
                          רגיל
                        </button>
                        <button
                          onClick={() => adjustFontSize(25)}
                          disabled={settings.fontSize >= 175}
                          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-bold focus-visible:outline-2 focus-visible:outline-blue-600"
                          aria-label="הגדל טקסט"
                          type="button"
                        >
                          א+
                        </button>
                      </div>
                    </div>

                    <OptionRow
                      id="readable-font"
                      label="גופן קריא"
                      description="שימוש בגופן Arial קריא יותר"
                      checked={settings.fontFamily === 'readable'}
                      onChange={handleFontFamilyToggle}
                    />

                    <OptionRow
                      id="text-spacing"
                      label="ריווח טקסט"
                      description="הגדלת המרווח בין אותיות ומילים"
                      checked={settings.textSpacing}
                      onChange={() => handleBooleanToggle('textSpacing', 'ריווח טקסט הופעל', 'ריווח טקסט כובה')}
                    />

                    <OptionRow
                      id="improved-readability"
                      label="שיפור קריאות"
                      description="ריווח רחב יותר בין השורות"
                      checked={settings.improvedReadability}
                      onChange={() => handleBooleanToggle('improvedReadability', 'שיפור קריאות הופעל', 'שיפור קריאות כובה')}
                    />
                  </Section>

                  {/* Contrast Section */}
                  <Section id="contrast" title="ניגודיות וצבעים" icon={IconContrast}>
                    <OptionRow
                      id="high-contrast"
                      label="ניגודיות גבוהה"
                      description="רקע שחור וטקסט לבן"
                      checked={settings.highContrast}
                      onChange={() => handleBooleanToggle('highContrast', 'ניגודיות גבוהה הופעלה', 'ניגודיות גבוהה כובתה')}
                    />

                    <OptionRow
                      id="dark-mode"
                      label="מצב כהה"
                      description="עיצוב כהה נוח לעיניים"
                      checked={settings.darkMode}
                      disabled={settings.highContrast}
                      onChange={() => handleBooleanToggle('darkMode', 'מצב כהה הופעל', 'מצב כהה כובה')}
                    />

                    <OptionRow
                      id="inverted-contrast"
                      label="ניגודיות הפוכה"
                      description="רקע לבן וטקסט שחור עבה"
                      checked={settings.invertedContrast}
                      disabled={settings.highContrast || settings.darkMode}
                      onChange={() => handleBooleanToggle('invertedContrast', 'ניגודיות הפוכה הופעלה', 'ניגודיות הפוכה כובתה')}
                    />

                    <OptionRow
                      id="grayscale"
                      label="מצב אפור"
                      description="הצגה בגווני אפור בלבד"
                      checked={settings.grayscaleMode}
                      onChange={() => handleBooleanToggle('grayscaleMode', 'מצב אפור הופעל', 'מצב אפור כובה')}
                    />

                    <OptionRow
                      id="sepia-mode"
                      label="גוון ספיה"
                      description="גוון חום נוח לקריאה ארוכה"
                      checked={settings.sepiaMode}
                      onChange={() => handleBooleanToggle('sepiaMode', 'גוון ספיה הופעל', 'גוון ספיה כובה')}
                    />

                    <OptionRow
                      id="low-saturation"
                      label="הפחתת רוויה"
                      description="צבעים עדינים יותר"
                      checked={settings.lowSaturation}
                      onChange={() => handleBooleanToggle('lowSaturation', 'הפחתת רוויה הופעלה', 'הפחתת רוויה כובתה')}
                    />
                  </Section>

                  {/* Navigation Section */}
                  <Section id="navigation" title="ניווט וסיוע חזותי" icon={IconNavigation}>
                    <OptionRow
                      id="highlight-links"
                      label="הדגש קישורים"
                      description="רקע צהוב לכל הקישורים"
                      checked={settings.highlightLinks}
                      onChange={() => handleBooleanToggle('highlightLinks', 'הדגשת קישורים הופעלה', 'הדגשת קישורים כובתה')}
                    />

                    <OptionRow
                      id="highlight-headings"
                      label="הדגש כותרות"
                      description="רקע וגבול לכותרות"
                      checked={settings.highlightHeadings}
                      onChange={() => handleBooleanToggle('highlightHeadings', 'הדגשת כותרות הופעלה', 'הדגשת כותרות כובתה')}
                    />

                    <OptionRow
                      id="enhanced-focus"
                      label="הדגשת פוקוס"
                      description="מסגרת בולטת לאלמנט הפעיל"
                      checked={settings.enhancedFocus}
                      onChange={() => handleBooleanToggle('enhancedFocus', 'הדגשת פוקוס הופעלה', 'הדגשת פוקוס כובתה')}
                    />

                    <OptionRow
                      id="large-cursor"
                      label="סמן גדול"
                      description="סמן עכבר מוגדל לראות טובה יותר"
                      checked={settings.largeCursor}
                      onChange={() => handleBooleanToggle('largeCursor', 'סמן גדול הופעל', 'סמן גדול כובה')}
                    />

                    <OptionRow
                      id="reading-guide"
                      label="סרגל קריאה"
                      description="פס אופקי לעזרה במעקב אחר שורות"
                      checked={settings.readingGuide}
                      onChange={() => handleBooleanToggle('readingGuide', 'סרגל קריאה הופעל', 'סרגל קריאה כובה')}
                    />
                  </Section>

                  {/* Content Section */}
                  <Section id="content" title="תוכן וקריאה" icon={IconContent}>
                    <OptionRow
                      id="hide-images"
                      label="הסתר תמונות"
                      description="עמעום תמונות לקריאה ללא הסחות"
                      checked={settings.hideImages}
                      onChange={() => handleBooleanToggle('hideImages', 'הסתרת תמונות הופעלה', 'הסתרת תמונות כובתה')}
                    />

                    <OptionRow
                      id="focus-mode"
                      label="מצב ריכוז"
                      description="הדגשת התוכן הראשי בלבד"
                      checked={settings.focusMode}
                      onChange={() => handleBooleanToggle('focusMode', 'מצב ריכוז הופעל', 'מצב ריכוז כובה')}
                    />
                  </Section>

                  {/* Motion Section */}
                  <Section id="motion" title="תנועה ומדיה" icon={IconMotion}>
                    <OptionRow
                      id="reduce-animations"
                      label="הפחת אנימציות"
                      description="השבת אנימציות מסחררות"
                      checked={settings.reduceAnimations}
                      onChange={() => handleBooleanToggle('reduceAnimations', 'הפחתת אנימציות הופעלה', 'הפחתת אנימציות כובתה')}
                    />

                    <OptionRow
                      id="stop-autoplay"
                      label="עצור הפעלה אוטומטית"
                      description="השבת וידאו ואנימציות אוטומטיות"
                      checked={settings.stopAutoplay}
                      onChange={() => handleBooleanToggle('stopAutoplay', 'עצירת הפעלה אוטומטית הופעלה', 'עצירת הפעלה אוטומטית כובתה')}
                    />
                  </Section>
                </div>

                {/* Reset button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    ref={firstFocusableRef}
                    onClick={handleResetSettings}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    type="button"
                  >
                    איפוס לברירת מחדל
                  </button>
                </div>

                {/* Help section */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg" role="region" aria-labelledby="help-title">
                  <h3 id="help-title" className="font-semibold text-gray-900 mb-2 text-xs">
                    קיצורי מקלדת
                  </h3>
                  <div className="text-gray-700 text-xs space-y-1">
                    <p>
                      <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs ml-2">Alt+A</kbd>
                      פתיחת/סגירת תפריט
                    </p>
                    <p>
                      <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs ml-2">Tab</kbd>
                      מעבר בין אפשרויות
                    </p>
                    <p>
                      <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs ml-2">Escape</kbd>
                      סגירת תפריט
                    </p>
                  </div>
                </div>

                {/* Accessibility Statement Link */}
                <div className="mt-4 text-center">
                  <a
                    href="/accessibility-statement"
                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                  >
                    הצהרת נגישות מלאה
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
