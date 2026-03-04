/**
 * MarkdownRenderer Images
 * 
 * Image rendering with lazy loading, smooth appearance, zoom, and captions
 */

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { ImageProps } from './MarkdownRenderer.types';

/**
 * Image format detection
 */
function detectImageFormat(src?: string): 'jpg' | 'png' | 'svg' | 'webp' | 'unknown' {
  if (!src) return 'unknown';
  const ext = src.split('.').pop()?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'jpg';
  if (ext === 'png') return 'png';
  if (ext === 'svg') return 'svg';
  if (ext === 'webp') return 'webp';
  return 'unknown';
}

/**
 * Image component with lazy loading and zoom
 */
export function Image({ src, alt, caption, format, className }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const detectedFormat = format || detectImageFormat(src);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;

    // If browser supports native lazy loading, use it
    if ('loading' in HTMLImageElement.prototype) {
      setIsLoaded(false);
      // Native lazy loading will handle loading
      return;
    }

    // Fallback: use IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (img.dataset.src) {
      observer.observe(img);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handleClick = () => {
    if (isLoaded && !hasError) {
      setIsZoomed(true);
    }
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsZoomed(false);
    }
  };

  if (hasError) {
    return (
      <div className={cn('my-4 p-4 border border-destructive/50 rounded-md bg-destructive/10', className)}>
        <p className="text-sm text-destructive">Не удалось загрузить изображение: {alt || src}</p>
      </div>
    );
  }

  return (
    <>
      <figure className={cn('my-4 md:my-6', className)}>
        <div
          className={cn(
            'relative overflow-hidden rounded-lg',
            'cursor-pointer transition-all duration-200 md:duration-300', // T060: Simplified animations on mobile
            'hover:scale-[1.02] hover:shadow-lg',
            'active:scale-[1.01]', // T060: Touch feedback on mobile
            !isLoaded && 'bg-muted animate-pulse'
          )}
          onClick={handleClick}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt || ''}
            className={cn(
              'w-full h-auto transition-opacity duration-300',
              'max-w-full', // T062: Responsive images
              isLoaded ? 'opacity-100' : 'opacity-0',
              `format-${detectedFormat}`
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        {caption && (
          <figcaption className={cn(
            'mt-2 text-sm italic text-foreground/70',
            'text-center'
          )}>
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className={cn(
            'fixed inset-0 z-50',
            'bg-black/80 backdrop-blur-sm',
            'flex items-center justify-center',
            'p-4'
          )}
          onClick={handleCloseZoom}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            onClick={handleCloseZoom}
            className={cn(
              'absolute top-4 right-4',
              'p-2 rounded-full',
              'bg-background/90 backdrop-blur-sm',
              'border border-border',
              'hover:bg-background',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              'transition-all'
            )}
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt={alt || ''}
            className={cn(
              'max-w-full max-h-[90vh]',
              'object-contain',
              'rounded-lg shadow-2xl'
            )}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
