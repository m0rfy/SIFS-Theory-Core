/**
 * ParticleCursor Component
 * 
 * Эффект частиц, следующих за курсором, с связью с параметрами теории через CSS переменные
 * и оптимизированной производительностью
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface ParticleCursorProps {
  /** X координата курсора */
  x: number;
  /** Y координата курсора */
  y: number;
  /** Интенсивность эффекта (0-1) */
  intensity?: number;
  /** Количество частиц */
  particleCount?: number;
  /** Дополнительные CSS классы */
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/**
 * ParticleCursor component
 * 
 * Создаёт эффект частиц, следующих за курсором, с оптимизацией производительности
 */
export function ParticleCursor({
  x,
  y,
  intensity = 1,
  particleCount = 20,
  className,
}: ParticleCursorProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  // Инициализация частиц
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random(),
      maxLife: 1,
    }));
    setParticles(newParticles);
  }, [x, y, particleCount]);

  // Анимация частиц с оптимизацией через requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000; // В секундах
      lastUpdateRef.current = now;

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Обновление позиции
          let newX = particle.x + particle.vx * deltaTime * 60;
          let newY = particle.y + particle.vy * deltaTime * 60;

          // Притяжение к курсору (с учётом интенсивности)
          const dx = x - newX;
          const dy = y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const attraction = intensity * 0.5;

          if (distance > 0) {
            newX += (dx / distance) * attraction;
            newY += (dy / distance) * attraction;
          }

          // Обновление жизни
          const newLife = Math.max(0, particle.life - deltaTime * 0.5);

          // Перезапуск частицы, если она умерла
          if (newLife <= 0) {
            return {
              ...particle,
              x: x + (Math.random() - 0.5) * 20,
              y: y + (Math.random() - 0.5) * 20,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 1,
              maxLife: 1,
            };
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            life: newLife,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [x, y, intensity]);

  // Получаем цвет из CSS переменной (связь с параметрами теории)
  const particleColor = 'var(--sifs-delta-color, oklch(65% 0.25 250))';
  const oscillationSpeed = 'var(--sifs-oscillation-speed, 1s)';

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        '--particle-color': particleColor,
        '--oscillation-speed': oscillationSpeed,
      } as React.CSSProperties}
    >
      {particles.map((particle) => {
        const opacity = particle.life * intensity;
        const scale = 0.5 + particle.life * 0.5;

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              backgroundColor: particleColor,
              opacity,
              scale,
              boxShadow: `0 0 ${4 * intensity}px ${particleColor}`,
            }}
            animate={{
              scale: [scale, scale * 1.2, scale],
              opacity: [opacity, opacity * 0.8, opacity],
            }}
            transition={{
              duration: parseFloat(oscillationSpeed) || 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
