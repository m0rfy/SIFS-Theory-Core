import { useState, useEffect, useCallback, useRef } from 'react';
import { SlideNavigation } from './components/SlideNavigation';
import { SlideNavigationContext } from './contexts/SlideNavigationContext';
import { Slide0About } from './components/slides/Slide0About';
import { Slide1Abstract } from './components/slides/Slide1Abstract';
import { Slide1bFractal } from './components/slides/Slide1bFractal';
import { Slide2Axioms } from './components/slides/Slide2Axioms';
import { Slide3Holographic } from './components/slides/Slide3Holographic';
import { Slide4Data } from './components/slides/Slide4Data';
import { Slide5Unification } from './components/slides/Slide5Unification';
import { Slide6References } from './components/slides/Slide6References';
import { Slide8Simulation } from './components/slides/Slide8Simulation';
import { Slide9Applications } from './components/slides/Slide9Applications';
import { Slide7Conclusion } from './components/slides/Slide7Conclusion';

const SlideComponents = [
  Slide0About,
  Slide1Abstract,
  Slide1bFractal,
  Slide2Axioms,
  Slide3Holographic,
  Slide4Data,
  Slide5Unification,
  Slide6References,
  Slide8Simulation,
  Slide9Applications,
  Slide7Conclusion
];

export default function App() {
  const totalSlides = SlideComponents.length;
  const slideContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize from URL parameter or default to 0
  const getInitialSlide = () => {
    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get('slide');
    if (slideParam) {
      const slideIndex = parseInt(slideParam, 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
        return slideIndex;
      }
    }
    return 0;
  };

  const [currentSlide, setCurrentSlide] = useState(getInitialSlide);

  // Update URL when slide changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentSlide === 0) {
      url.searchParams.delete('slide');
    } else {
      url.searchParams.set('slide', currentSlide.toString());
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentSlide]);

  // Scroll to top when slide changes
  useEffect(() => {
    if (slideContainerRef.current) {
      const activeSlide = slideContainerRef.current.querySelector(`[data-slide-index="${currentSlide}"]`);
      if (activeSlide) {
        const scrollableContent = activeSlide.querySelector('.overflow-y-auto');
        if (scrollableContent) {
          scrollableContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleGoTo = useCallback((slide: number) => {
    if (slide >= 0 && slide < totalSlides) {
      setCurrentSlide(slide);
    }
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleGoTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        handleGoTo(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleGoTo, totalSlides]);

  const slides = SlideComponents.map((SlideComponent, index) => (
    <SlideComponent
      key={index}
      slideNumber={index + 1}
      totalSlides={totalSlides}
    />
  ));

  const navigationContextValue = {
    goToSlide: handleGoTo,
    nextSlide: handleNext,
    prevSlide: handlePrev,
    currentSlide,
    totalSlides,
  };

  return (
    <SlideNavigationContext.Provider value={navigationContextValue}>
      <div className="w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Slides Container */}
        <div ref={slideContainerRef} className="relative w-full h-screen overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              data-slide-index={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full z-0 pointer-events-none'
                  : 'opacity-0 translate-x-full z-0 pointer-events-none'
              }`}
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNext={handleNext}
          onPrev={handlePrev}
          onGoTo={handleGoTo}
        />

        {/* Instructions */}
        <div className="fixed top-8 right-8 z-40 p-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-400">
          <p className="mb-2">← → или Space для навигации</p>
          <p className="text-xs">Home/End для первого/последнего слайда</p>
        </div>
      </div>
    </SlideNavigationContext.Provider>
  );
}
