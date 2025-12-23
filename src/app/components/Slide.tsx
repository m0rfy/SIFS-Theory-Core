import { ReactNode } from 'react';

interface SlideProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backgroundImage?: string;
  slideNumber?: number;
  totalSlides?: number;
}

export function Slide({ title, subtitle, children, backgroundImage, slideNumber, totalSlides }: SlideProps) {
  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>
        </div>
      )}
      
      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
        <div className="p-8 md:p-16 pb-32 min-h-full w-full max-w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">{title}</h1>
            {subtitle && (
              <p className="text-gray-400">{subtitle}</p>
            )}
          </div>
          
          {/* Main Content */}
          <div className="flex-1 w-full max-w-full">
            {children}
          </div>
          
          {/* Footer */}
          {slideNumber && totalSlides && (
            <div className="flex justify-between items-center text-gray-500 mt-8">
              <div>SIFS Theory — Scale-Invariant Fractal Spacetime</div>
              <div>{slideNumber} / {totalSlides}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}