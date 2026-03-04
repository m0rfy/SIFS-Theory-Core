/**
 * ScrollReveal Component
 * 
 * Плавное появление контента при прокрутке страницы
 * Использует Intersection Observer API для определения видимости
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface ScrollRevealProps {
  /** Дочерние элементы для анимации */
  children: React.ReactNode;
  /** Задержка анимации в миллисекундах */
  delay?: number;
  /** Направление появления контента */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Дополнительные CSS классы */
  className?: string;
  /** Порог видимости (0-1) */
  threshold?: number;
}

/**
 * ScrollReveal component
 * 
 * Плавно показывает контент при прокрутке страницы
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        rootMargin: '0px 0px -50px 0px', // Начинаем анимацию немного раньше
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

  // Определяем начальное и конечное положение в зависимости от направления
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 30, opacity: 0 };
      case 'down':
        return { y: -30, opacity: 0 };
      case 'left':
        return { x: 30, opacity: 0 };
      case 'right':
        return { x: -30, opacity: 0 };
      default:
        return { y: 30, opacity: 0 };
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
        duration: 0.6,
        delay: delay / 1000, // Конвертируем миллисекунды в секунды
        ease: [0.16, 1, 0.3, 1], // Custom easing для плавности
      }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
}
