import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (slide: number) => void;
}

export function SlideNavigation({ currentSlide, totalSlides, onNext, onPrev, onGoTo }: SlideNavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {/* Slide Indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="rounded-full hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
