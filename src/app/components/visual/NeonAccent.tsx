/**
 * NeonAccent Component
 *
 * Неоновые акценты для визуализации "time waves" (FR-061), анимированное неоновое свечение,
 * связано с --sifs-oscillation-speed
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface NeonAccentProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Интенсивность неона (0-1) */
  intensity?: number;
  /** Цвет неона */
  color?: string;
  /** Связать с --sifs-oscillation-speed */
  useOscillationSpeed?: boolean;
  /** Связать с --sifs-delta-color */
  useDeltaColor?: boolean;
  /** Дети компонента */
  children?: React.ReactNode;
}

/**
 * NeonAccent component
 *
 * Создаёт неоновые акценты с анимированным свечением для визуализации "time waves"
 */
export function NeonAccent({
  className,
  intensity = 0.8,
  color = 'oklch(65% 0.25 250)',
  useOscillationSpeed = true,
  useDeltaColor = true,
  children,
}: NeonAccentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateNeon = () => {
      if (!containerRef.current) return;

      const computedStyle = getComputedStyle(containerRef.current);
      const oscillationSpeed = parseFloat(
        computedStyle.getPropertyValue('--sifs-oscillation-speed') || '1'
      );
      const deltaColor = computedStyle.getPropertyValue('--sifs-delta-color') || color;

      let neonColor = color;
      if (useDeltaColor) {
        neonColor = deltaColor;
      }

      containerRef.current.style.setProperty('--neon-color', neonColor);
      containerRef.current.style.setProperty('--neon-speed', `${oscillationSpeed}s`);
      containerRef.current.style.setProperty('--neon-intensity', intensity.toString());
    };

    updateNeon();

    // Обновляем при изменении CSS переменных
    const observer = new MutationObserver(updateNeon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, [color, intensity, useOscillationSpeed, useDeltaColor]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative',
        // Неоновое свечение через box-shadow
        'before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none',
        'before:shadow-[0_0_10px_var(--neon-color),0_0_20px_var(--neon-color),0_0_30px_var(--neon-color)]',
        'before:opacity-[calc(var(--neon-intensity)*0.5)]',
        // Дополнительное свечение
        'after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
        'after:border after:border-[var(--neon-color)] after:opacity-[calc(var(--neon-intensity)*0.3)]',
        className
      )}
      animate={{
        boxShadow: [
          `0 0 10px var(--neon-color), 0 0 20px var(--neon-color), 0 0 30px var(--neon-color)`,
          `0 0 15px var(--neon-color), 0 0 30px var(--neon-color), 0 0 45px var(--neon-color)`,
          `0 0 10px var(--neon-color), 0 0 20px var(--neon-color), 0 0 30px var(--neon-color)`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        '--neon-color': color,
        '--neon-intensity': intensity,
        '--neon-speed': '1s',
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
