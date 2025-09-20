import { useState, useCallback, useRef } from 'react';

interface LiveRegionProps {
  className?: string;
  priority?: 'polite' | 'assertive';
}

export function useScreenReader() {
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear current announcement first
    setAnnouncement('');
    
    // Set new announcement after a brief delay to ensure screen readers pick it up
    setTimeout(() => {
      setAnnouncement(message);
      
      // Clear announcement after it's been read
      timeoutRef.current = setTimeout(() => {
        setAnnouncement('');
      }, 1000);
    }, 100);
  }, []);

  const announceNavigation = useCallback((destination: string) => {
    announce(`עבר לדף ${destination}`, 'polite');
  }, [announce]);

  const announceAction = useCallback((action: string) => {
    announce(action, 'assertive');
  }, [announce]);

  const announceError = useCallback((error: string) => {
    announce(`שגיאה: ${error}`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((success: string) => {
    announce(`הצלחה: ${success}`, 'polite');
  }, [announce]);

  const announceFormValidation = useCallback((fieldName: string, error: string) => {
    announce(`שדה ${fieldName}: ${error}`, 'assertive');
  }, [announce]);

  const announceLoadingStart = useCallback((context: string = 'תוכן') => {
    announce(`טוען ${context}...`, 'polite');
  }, [announce]);

  const announceLoadingEnd = useCallback((context: string = 'תוכן') => {
    announce(`${context} נטען בהצלחה`, 'polite');
  }, [announce]);

  const createLiveRegion = (className = "sr-only", priority: 'polite' | 'assertive' = "polite") => ({
    className,
    'aria-live': priority,
    'aria-atomic': 'true',
    role: 'status',
    'aria-label': 'הודעות לקורא מסך',
    children: announcement
  });

  return {
    announcement,
    announce,
    announceNavigation,
    announceAction,
    announceError,
    announceSuccess,
    announceFormValidation,
    announceLoadingStart,
    announceLoadingEnd,
    createLiveRegion
  };
}
