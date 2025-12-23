import { createContext, useContext } from 'react';

interface SlideNavigationContextType {
  goToSlide: (slideIndex: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  currentSlide: number;
  totalSlides: number;
}

export const SlideNavigationContext = createContext<SlideNavigationContextType | null>(null);

export function useSlideNavigation() {
  const context = useContext(SlideNavigationContext);
  if (!context) {
    throw new Error('useSlideNavigation must be used within SlideNavigationProvider');
  }
  return context;
}
