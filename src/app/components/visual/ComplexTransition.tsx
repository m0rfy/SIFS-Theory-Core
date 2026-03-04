/**
 * ComplexTransition Component
 *
 * Сложные анимации для переходов (FR-061), плавные переходы страниц, связаны с библиотекой Motion
 */

import { motion, AnimatePresence, Variants } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface ComplexTransitionProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Тип перехода */
  type?: 'fade' | 'slide' | 'scale' | 'rotate' | 'blur';
  /** Направление (для slide) */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Длительность анимации в секундах */
  duration?: number;
  /** Дети компонента */
  children: React.ReactNode;
  /** Показывать ли элемент */
  show?: boolean;
}

/**
 * ComplexTransition component
 *
 * Создаёт сложные анимации для переходов между страницами
 */
export function ComplexTransition({
  className,
  type = 'fade',
  direction = 'up',
  duration = 0.5,
  show = true,
  children,
}: ComplexTransitionProps) {
  const variants: Record<string, Variants> = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: {
        opacity: 0,
        y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
        x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
      },
      animate: {
        opacity: 1,
        y: 0,
        x: 0,
      },
      exit: {
        opacity: 0,
        y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
        x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 10 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' },
    },
  };

  const currentVariants = variants[type];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={cn('relative', className)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={currentVariants}
          transition={{
            duration,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
