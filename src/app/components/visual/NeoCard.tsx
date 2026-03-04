/**
 * NeoCard Component
 *
 * Неоморфная карта компонент, соответствующий классам neomorphism из theme.css
 */

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Дополнительные CSS классы */
  className?: string;
  /** Вариант неоморфизма */
  variant?: 'raised' | 'pressed' | 'card' | 'glow' | 'grid';
  /** Анимировать ли при наведении */
  hover?: boolean;
  /** Дополнительные props для motion.div */
  motionProps?: React.ComponentProps<typeof motion.div>;
}

/**
 * NeoCard component
 *
 * Создаёт неоморфную карту с различными вариантами стилей
 */
export const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant = 'card', hover = false, motionProps, ...props }, ref) => {
    const baseClasses = 'neo-card';

    const variantClasses = {
      raised: 'neo-raised',
      pressed: 'neo-pressed',
      card: 'neo-card',
      glow: 'neo-glow',
      grid: 'neo-grid',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hover && 'hover:scale-105 transition-transform duration-300',
          className
        )}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.2 }}
        {...motionProps}
        {...props}
      />
    );
  }
);

NeoCard.displayName = 'NeoCard';
