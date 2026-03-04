/**
 * MovingGrid Component
 *
 * Движущаяся сетка для фона (Aceternity UI элемент) (FR-061), плавная анимация движения,
 * связана с --sifs-oscillation-speed
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface MovingGridProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Скорость движения (0-1) */
  speed?: number;
  /** Размер ячейки сетки в пикселях */
  gridSize?: number;
  /** Связать с --sifs-oscillation-speed */
  useOscillationSpeed?: boolean;
  /** Дети компонента */
  children?: React.ReactNode;
}

/**
 * MovingGrid component
 *
 * Создаёт движущуюся сетку для фона с плавной анимацией
 */
export function MovingGrid({
  className,
  speed = 0.5,
  gridSize = 20,
  useOscillationSpeed = true,
  children,
}: MovingGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      const computedStyle = getComputedStyle(containerRef.current!);
      const oscillationSpeed = parseFloat(
        computedStyle.getPropertyValue('--sifs-oscillation-speed') || '1'
      );

      let animationSpeed = speed;
      if (useOscillationSpeed) {
        animationSpeed = oscillationSpeed * speed;
      }

      // Плавное движение сетки
      setOffsetX((time * animationSpeed * 0.1) % gridSize);
      setOffsetY((time * animationSpeed * 0.1) % gridSize);

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, gridSize, useOscillationSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
    >
      {children}
    </div>
  );
}
