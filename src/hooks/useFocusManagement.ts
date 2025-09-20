import { useRef, useEffect, useCallback } from 'react';

interface FocusableElement extends HTMLElement {
  focus(): void;
}

export function useFocusManagement() {
  const focusRef = useRef<HTMLElement>(null);

  const focusElement = useCallback(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = focusRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<FocusableElement>;
    
    if (!focusableElements?.length) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      // Shift + Tab (backward)
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  const getFocusableElements = useCallback((): FocusableElement[] => {
    if (!focusRef.current) return [];
    
    const focusableElements = focusRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<FocusableElement>;
    
    return Array.from(focusableElements);
  }, []);

  const focusFirst = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }, [getFocusableElements]);

  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }, [getFocusableElements]);

  const restoreFocus = useCallback((previouslyFocusedElement?: HTMLElement) => {
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    } else {
      // Fallback to body if no previous element
      document.body.focus();
    }
  }, []);

  // Enhanced keyboard navigation handler
  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        // Allow components to handle escape
        return;
      case 'Tab':
        trapFocus(e);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        // Allow custom arrow key navigation
        const elements = getFocusableElements();
        const currentIndex = elements.findIndex(el => el === document.activeElement);
        
        if (currentIndex !== -1) {
          e.preventDefault();
          const nextIndex = e.key === 'ArrowDown' 
            ? (currentIndex + 1) % elements.length
            : (currentIndex - 1 + elements.length) % elements.length;
          elements[nextIndex].focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        focusFirst();
        break;
      case 'End':
        e.preventDefault();
        focusLast();
        break;
    }
  }, [trapFocus, getFocusableElements, focusFirst, focusLast]);

  return {
    focusRef,
    focusElement,
    trapFocus,
    getFocusableElements,
    focusFirst,
    focusLast,
    restoreFocus,
    handleKeyNavigation
  };
}
