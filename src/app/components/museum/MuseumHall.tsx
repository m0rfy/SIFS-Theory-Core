/**
 * MuseumHall Component
 * 
 * Отображает зал музея с визуальными эффектами, прогрессивным раскрытием информации
 * и параллакс эффектами при прокрутке
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { InteractiveExhibit } from './InteractiveExhibit';
import { StorytellingSection } from './StorytellingSection';

export interface MuseumHall {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  documents?: string[];
  exhibits?: Exhibit[];
}

export interface Exhibit {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'simulation' | 'visualization' | 'example';
  contentId: string;
  visualEffects?: VisualEffect[];
  interactions?: Interaction[];
}

export interface VisualEffect {
  type: 'particles' | 'glow' | 'pulse' | 'wave';
  intensity?: number;
}

export interface Interaction {
  type: 'click' | 'hover' | 'scroll';
  action: string;
}

export interface MuseumHallProps {
  /** Данные зала */
  hall: MuseumHall;
  /** Экспонаты зала */
  exhibits?: Exhibit[];
  /** Обработчик клика по экспонату */
  onExhibitClick?: (exhibit: Exhibit) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * MuseumHall component
 * 
 * Отображает зал музея с визуальными эффектами, прогрессивным раскрытием информации
 * и параллакс эффектами при прокрутке
 */
export function MuseumHall({
  hall,
  exhibits = hall.exhibits || [],
  onExhibitClick,
  className,
}: MuseumHallProps) {
  const [scrollY, setScrollY] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Параллакс эффект при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Прогрессивное раскрытие информации (storytelling)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setRevealedSections((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const sections = containerRef.current?.querySelectorAll('.storytelling-section');
    sections?.forEach((section) => observer.observe(section));

    return () => {
      sections?.forEach((section) => observer.unobserve(section));
    };
  }, [exhibits]);

  const parallaxOffset = scrollY * 50; // Параллакс смещение

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full min-h-screen',
        'spatial-page-block',
        className
      )}
      style={{
        '--parallax-offset': `${parallaxOffset}px`,
      } as React.CSSProperties}
    >
      {/* Заголовок зала с параллакс эффектом */}
      <motion.div
        className="relative z-10 mb-12"
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px)`,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            color: hall.color || 'var(--sifs-delta-color, oklch(65% 0.25 250))',
          }}
        >
          {hall.name}
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl line-height-[1.6]">
          {hall.description}
        </p>
      </motion.div>

      {/* Экспонаты с прогрессивным раскрытием */}
      <div className="space-y-16">
        {exhibits.map((exhibit, index) => (
          <motion.div
            key={exhibit.id}
            className="storytelling-section"
            initial={{ opacity: 0, y: 50 }}
            animate={
              revealedSections.has(index)
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transform: `translateY(${parallaxOffset * (0.3 - index * 0.05)}px)`,
            }}
          >
            <InteractiveExhibit
              exhibit={exhibit}
              onInteract={onExhibitClick}
            />
          </motion.div>
        ))}
      </div>

      {/* Storytelling секции для дополнительного контента */}
      {hall.description && (
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <StorytellingSection
            title="О зале"
            content={hall.description}
            delay={0}
          />
        </motion.div>
      )}
    </div>
  );
}
