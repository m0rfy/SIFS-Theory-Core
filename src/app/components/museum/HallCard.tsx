/**
 * HallCard Component
 * 
 * Карточка зала музея с визуализацией зала (иконка и цвет), интерактивными эффектами
 * 
 * T096 [US9]: Museum hall card, hall visualization with icon and color, interactive effects
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { NeoCard } from '@/app/components/visual/NeoCard';
import { MuseumHall } from './MuseumHall';

export interface HallCardProps {
  /** Данные зала */
  hall: MuseumHall;
  /** Обработчик клика */
  onClick?: (hall: MuseumHall) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * HallCard component
 * 
 * Отображает карточку зала музея с визуализацией и интерактивными эффектами
 */
export function HallCard({
  hall,
  onClick,
  className,
}: HallCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hallColor = hall.color || 'var(--sifs-delta-color, oklch(65% 0.25 250))';

  return (
    <motion.div
      className={cn('relative', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick?.(hall)}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <NeoCard
        variant="raised"
        hover
        className="h-full cursor-pointer overflow-hidden relative"
      >
        {/* Градиентный фон с цветом зала */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              ${hallColor}15 0%, 
              transparent 50%,
              ${hallColor}05 100%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Контент карточки */}
        <div className="relative z-10 p-6">
          {/* Иконка зала */}
          <motion.div
            className="text-6xl mb-4 text-center"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hall.icon || '🏛️'}
          </motion.div>

          {/* Название зала */}
          <motion.h3
            className="text-2xl font-bold mb-3 text-center"
            style={{
              color: hallColor,
            }}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {hall.name}
          </motion.h3>

          {/* Описание зала */}
          <p className="text-gray-300 text-sm line-height-[1.6] text-center mb-4">
            {hall.description}
          </p>

          {/* Индикатор количества экспонатов */}
          {hall.exhibits && hall.exhibits.length > 0 && (
            <motion.div
              className="flex items-center justify-center gap-2 text-xs text-gray-400"
              animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
            >
              <span>{hall.exhibits.length}</span>
              <span>экспонатов</span>
            </motion.div>
          )}
        </div>

        {/* Эффект свечения при наведении */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: isHovered
              ? `0 0 40px ${hallColor}40`
              : 'none',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Анимированная граница */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl border-2"
          style={{
            borderColor: hallColor,
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </NeoCard>
    </motion.div>
  );
}
