/**
 * SpatialScrollbar - Кастомный скроллбар с SSF-2025 стилями
 * 
 * T101 [US10]: Custom scrollbar with SSF-2025 styles,
 * smooth animation on scroll, progress indicator
 */

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/app/components/ui/utils';

interface SpatialScrollbarProps {
  className?: string;
  children: React.ReactNode;
  showProgress?: boolean;
}

/**
 * SpatialScrollbar - Кастомный скроллбар с SSF-2025 стилями
 * 
 * @param className - Дополнительные CSS классы
 * @param children - Контент для скролла
 * @param showProgress - Показывать ли индикатор прогресса
 */
export function SpatialScrollbar({ 
  className, 
  children,
  showProgress = true 
}: SpatialScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
    };

    const handleScroll = () => {
      updateScrollProgress();
      setIsScrolling(true);
      
      // Скрываем индикатор через 1 секунду после остановки скролла
      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if ((window as any).scrollTimeout) {
        clearTimeout((window as any).scrollTimeout);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn('spatial-scrollbar-container', className)}
    >
      {children}
      
      {/* Индикатор прогресса */}
      {showProgress && (
        <div 
          className={cn(
            'spatial-scrollbar-progress',
            isScrolling && 'spatial-scrollbar-progress-visible'
          )}
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      )}
    </div>
  );
}
