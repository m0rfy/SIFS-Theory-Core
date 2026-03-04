/**
 * InteractiveExhibit Component
 * 
 * Отображает интерактивный экспонат с плавными анимациями при взаимодействии
 * и визуальными эффектами (частицы, свечение)
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { ParticleCursor } from './ParticleCursor';

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

export interface InteractiveExhibitProps {
  /** Данные экспоната */
  exhibit: Exhibit;
  /** Обработчик взаимодействия */
  onInteract?: (exhibit: Exhibit) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * InteractiveExhibit component
 * 
 * Отображает интерактивный экспонат с плавными анимациями при взаимодействии
 * и визуальными эффектами (частицы, свечение)
 */
export function InteractiveExhibit({
  exhibit,
  onInteract,
  className,
}: InteractiveExhibitProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Отслеживание позиции мыши для эффекта частиц
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  const handleClick = () => {
    setIsInteracting(true);
    onInteract?.(exhibit);
    
    // Сброс состояния взаимодействия через анимацию
    setTimeout(() => setIsInteracting(false), 600);
  };

  // Определяем визуальные эффекты
  const hasParticles = exhibit.visualEffects?.some((eff) => eff.type === 'particles');
  const hasGlow = exhibit.visualEffects?.some((eff) => eff.type === 'glow');
  const hasPulse = exhibit.visualEffects?.some((eff) => eff.type === 'pulse');
  const glowIntensity = exhibit.visualEffects?.find((eff) => eff.type === 'glow')?.intensity || 1;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative neo-card p-8',
        'cursor-pointer',
        'transition-all duration-300',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Эффект свечения при наведении */}
      {hasGlow && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, ${0.1 * glowIntensity}) 0%, 
              transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Эффект пульсации */}
      {hasPulse && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
          style={{
            borderColor: 'var(--sifs-delta-color, oklch(65% 0.25 250))',
          }}
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Эффект частиц при наведении */}
      {hasParticles && isHovered && (
        <ParticleCursor
          x={mousePosition.x}
          y={mousePosition.y}
          intensity={exhibit.visualEffects?.find((eff) => eff.type === 'particles')?.intensity || 1}
        />
      )}

      {/* Контент экспоната */}
      <div className="relative z-10">
        <motion.h3
          className="text-2xl font-bold mb-4"
          style={{
            color: 'var(--sifs-delta-color, oklch(65% 0.25 250))',
          }}
          animate={isInteracting ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {exhibit.title}
        </motion.h3>

        <p className="text-gray-300 mb-6 line-height-[1.6]">
          {exhibit.description}
        </p>

        {/* Индикатор типа экспоната */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-gray-400">Тип:</span>
          <span className="font-medium text-white">
            {exhibit.type === 'document' && '📄 Документ'}
            {exhibit.type === 'simulation' && '⚡ Симуляция'}
            {exhibit.type === 'visualization' && '📊 Визуализация'}
            {exhibit.type === 'example' && '💡 Пример'}
          </span>
        </motion.div>
      </div>

      {/* Эффект волны при клике */}
      <AnimatePresence>
        {isInteracting && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
