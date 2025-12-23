import { useState, useEffect } from 'react';
import { SlideNavigation } from './components/SlideNavigation';
import { Slide1Abstract } from './components/slides/Slide1Abstract';
import { Slide1bFractal } from './components/slides/Slide1bFractal';
import { Slide2Axioms } from './components/slides/Slide2Axioms';
import { Slide3Holographic } from './components/slides/Slide3Holographic';
import { Slide4Data } from './components/slides/Slide4Data';
import { Slide5Unification } from './components/slides/Slide5Unification';
import { Slide6References } from './components/slides/Slide6References';
import { Slide7Conclusion } from './components/slides/Slide7Conclusion';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGoTo = (slide: number) => {
    setCurrentSlide(slide);
  };

  const slides = [
    <Slide1Abstract slideNumber={1} totalSlides={totalSlides} />,
    <Slide1bFractal slideNumber={2} totalSlides={totalSlides} />,
    <Slide2Axioms slideNumber={3} totalSlides={totalSlides} />,
    <Slide3Holographic slideNumber={4} totalSlides={totalSlides} />,
    <Slide4Data slideNumber={5} totalSlides={totalSlides} />,
    <Slide5Unification slideNumber={6} totalSlides={totalSlides} />,
    <Slide6References slideNumber={7} totalSlides={totalSlides} />,
    <Slide7Conclusion slideNumber={8} totalSlides={totalSlides} />
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
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
        <p>← → или Space для навигации</p>
      </div>
    </div>
  );
}