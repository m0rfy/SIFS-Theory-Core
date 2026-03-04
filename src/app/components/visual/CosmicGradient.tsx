/**
 * CosmicGradient Component
 *
 * Космический градиент для фона с плавной анимацией цвета, связанный с SSF-2025 цветовой палитрой
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface CosmicGradientProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Скорость анимации (0-1) */
  speed?: number;
  /** Интенсивность градиента */
  intensity?: number;
  /** Связать с --sifs-oscillation-speed */
  useOscillationSpeed?: boolean;
  /** Дети компонента */
  children?: React.ReactNode;
}

/**
 * CosmicGradient component
 *
 * Создаёт космический градиент для фона с плавной анимацией цвета
 */
export function CosmicGradient({
  className,
  speed = 0.5,
  intensity = 1,
  useOscillationSpeed = true,
  children,
}: CosmicGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateGradient = () => {
      if (!containerRef.current) return;

      const computedStyle = getComputedStyle(containerRef.current);
      const oscillationSpeed = parseFloat(computedStyle.getPropertyValue('--sifs-oscillation-speed') || '1');

      let animationSpeed = speed;
      if (useOscillationSpeed) {
        // Связываем скорость анимации с параметром теории
        animationSpeed = oscillationSpeed * speed;
      }

      containerRef.current.style.setProperty('--animation-speed', `${animationSpeed}s`);
      containerRef.current.style.setProperty('--gradient-intensity', intensity.toString());
    };

    updateGradient();

    // Обновляем при изменении CSS переменных
    const observer = new MutationObserver(updateGradient);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, [speed, intensity, useOscillationSpeed]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden',
        // SSF-2025 цветовая палитра градиентов
        'bg-gradient-to-br from-oklch(30%_0.15_250) via-oklch(20%_0.1_260) to-oklch(10%_0.05_270)',
        className
      )}
      animate={{
        background: [
          'linear-gradient(45deg, oklch(30% 0.15 250), oklch(20% 0.1 260), oklch(10% 0.05 270))',
          'linear-gradient(135deg, oklch(25% 0.12 255), oklch(15% 0.08 265), oklch(5% 0.03 275))',
          'linear-gradient(225deg, oklch(35% 0.18 245), oklch(25% 0.12 255), oklch(15% 0.08 265))',
          'linear-gradient(315deg, oklch(30% 0.15 250), oklch(20% 0.1 260), oklch(10% 0.05 270))',
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        '--animation-speed': `${speed}s`,
        '--gradient-intensity': intensity,
      } as React.CSSProperties}
    >
      {/* Дополнительные слои для глубины */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Анимированные частицы */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {children}
    </motion.div>
  );
}
