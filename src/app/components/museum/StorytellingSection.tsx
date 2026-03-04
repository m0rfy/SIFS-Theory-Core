/**
 * StorytellingSection Component
 * 
 * Постепенное раскрытие информации (storytelling) с анимациями,
 * срабатывающими при прокрутке, и плавным повествовательным потоком
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface StorytellingSectionProps {
  /** Заголовок секции */
  title?: string;
  /** Контент секции (может быть строкой или ReactNode) */
  content: string | React.ReactNode;
  /** Задержка анимации в миллисекундах */
  delay?: number;
  /** Направление появления */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Дополнительные CSS классы */
  className?: string;
  /** Порог видимости (0-1) */
  threshold?: number;
  /** Разбивать ли контент на части для постепенного раскрытия */
  progressive?: boolean;
}

/**
 * StorytellingSection component
 * 
 * Постепенно раскрывает информацию с анимациями при прокрутке
 */
export function StorytellingSection({
  title,
  content,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.2,
  progressive = true,
}: StorytellingSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedParts, setRevealedParts] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  // Разбиваем контент на части для постепенного раскрытия
  const contentParts = typeof content === 'string' 
    ? content.split(/\n\n+/) // Разбиваем по двойным переносам строк
    : [content];

  // Intersection Observer для определения видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Отключаем наблюдение после первого появления
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Начинаем анимацию немного раньше
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Постепенное раскрытие частей контента
  useEffect(() => {
    if (isVisible && progressive && contentParts.length > 1) {
      contentParts.forEach((_, index) => {
        setTimeout(() => {
          setRevealedParts((prev) => new Set([...prev, index]));
        }, delay + index * 200); // 200ms задержка между частями
      });
    } else if (isVisible) {
      // Если не прогрессивное, показываем всё сразу
      contentParts.forEach((_, index) => {
        setRevealedParts((prev) => new Set([...prev, index]));
      });
    }
  }, [isVisible, progressive, delay]);

  // Определяем начальное и конечное положение в зависимости от направления
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: 50, opacity: 0 };
      case 'right':
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay: delay / 1000, // Конвертируем миллисекунды в секунды
        ease: [0.16, 1, 0.3, 1], // Custom easing для плавности
      }}
      className={cn('w-full space-y-6', className)}
    >
      {title && (
        <motion.h2
          className="text-3xl font-bold mb-6"
          style={{
            color: 'var(--sifs-delta-color, oklch(65% 0.25 250))',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: delay / 1000 + 0.1, duration: 0.6 }}
        >
          {title}
        </motion.h2>
      )}

      <div className="space-y-4">
        {contentParts.map((part, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={
              revealedParts.has(index)
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: progressive ? index * 0.2 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-gray-300 line-height-[1.6]"
          >
            {typeof part === 'string' ? (
              <p>{part}</p>
            ) : (
              part
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
