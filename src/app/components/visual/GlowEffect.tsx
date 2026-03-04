/**
 * GlowEffect Component
 *
 * Эффект свечения для важных элементов, связанный с параметрами теории через CSS переменные
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface GlowEffectProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Интенсивность свечения (0-1) */
  intensity?: number;
  /** Цвет свечения (CSS переменная или цвет) */
  color?: string;
  /** Связать с --sifs-delta-color */
  useDeltaColor?: boolean;
  /** Связать с --sifs-metric-stability */
  useMetricStability?: boolean;
  /** Дети компонента */
  children: React.ReactNode;
}

/**
 * GlowEffect component
 *
 * Создаёт эффект свечения для важных элементов с плавной анимацией
 */
export function GlowEffect({
  className,
  intensity = 0.5,
  color = 'var(--sifs-delta-color, oklch(65% 0.25 250))',
  useDeltaColor = true,
  useMetricStability = false,
  children,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateGlow = () => {
      if (!containerRef.current) return;

      const computedStyle = getComputedStyle(containerRef.current);
      const deltaColor = computedStyle.getPropertyValue('--sifs-delta-color') || 'oklch(65% 0.25 250)';
      const metricStability = parseFloat(computedStyle.getPropertyValue('--sifs-metric-stability') || '1');

      let glowColor = color;
      let glowIntensity = intensity;

      if (useDeltaColor) {
        glowColor = deltaColor;
      }

      if (useMetricStability) {
        // Чем ниже стабильность метрики, тем ярче свечение
        glowIntensity = Math.max(0.1, 1 - metricStability) * intensity;
      }

      containerRef.current.style.setProperty('--glow-color', glowColor);
      containerRef.current.style.setProperty('--glow-intensity', glowIntensity.toString());
    };

    updateGlow();

    // Обновляем при изменении CSS переменных
    const observer = new MutationObserver(updateGlow);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, [color, intensity, useDeltaColor, useMetricStability]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative',
        // Базовое свечение через box-shadow
        'before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none',
        'before:shadow-[0_0_20px_var(--glow-color)] before:opacity-[calc(var(--glow-intensity)*0.3)]',
        // Дополнительное свечение через filter
        'after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
        'after:bg-gradient-radial after:from-[var(--glow-color)] after:to-transparent after:opacity-[calc(var(--glow-intensity)*0.1)]',
        className
      )}
      animate={{
        filter: [
          'drop-shadow(0 0 5px var(--glow-color))',
          'drop-shadow(0 0 15px var(--glow-color))',
          'drop-shadow(0 0 5px var(--glow-color))',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        '--glow-color': color,
        '--glow-intensity': intensity,
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
