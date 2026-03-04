/**
 * FractalBackground Component
 *
 * Фрактальный фон с анимацией, связанный с параметрами теории, оптимизированная производительность
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface FractalBackgroundProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Скорость анимации (0-1) */
  speed?: number;
  /** Интенсивность фрактала */
  intensity?: number;
  /** Связать с --sifs-oscillation-speed */
  useOscillationSpeed?: boolean;
  /** Связать с --sifs-metric-stability */
  useMetricStability?: boolean;
  /** Дети компонента */
  children?: React.ReactNode;
}

/**
 * FractalBackground component
 *
 * Создаёт фрактальный фон с анимацией, связанный с параметрами теории
 */
export function FractalBackground({
  className,
  speed = 0.5,
  intensity = 1,
  useOscillationSpeed = true,
  useMetricStability = false,
  children,
}: FractalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Установка размера canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Параметры фрактала
    let time = 0;
    const maxIterations = 50;

    const drawFractal = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Получаем CSS переменные
      const computedStyle = getComputedStyle(canvas);
      const oscillationSpeed = parseFloat(
        computedStyle.getPropertyValue('--sifs-oscillation-speed') || '1'
      );
      const metricStability = parseFloat(
        computedStyle.getPropertyValue('--sifs-metric-stability') || '1'
      );

      let animationSpeed = speed;
      if (useOscillationSpeed) {
        animationSpeed = oscillationSpeed * speed;
      }

      let fractalIntensity = intensity;
      if (useMetricStability) {
        fractalIntensity = metricStability * intensity;
      }

      // Очистка canvas
      ctx.fillStyle = 'oklch(0% 0 0)';
      ctx.fillRect(0, 0, width, height);

      // Рисуем фрактальный паттерн (упрощённая версия для производительности)
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.6;

      for (let i = 0; i < maxIterations; i++) {
        const angle = (i / maxIterations) * Math.PI * 2 + time * animationSpeed * 0.01;
        const radius = (i / maxIterations) * maxRadius * fractalIntensity;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const size = (maxIterations - i) / maxIterations * 4;
        const opacity = (maxIterations - i) / maxIterations * 0.3;

        ctx.fillStyle = `oklch(65% 0.25 250 / ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationFrameRef.current = requestAnimationFrame(drawFractal);
    };

    drawFractal();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, intensity, useOscillationSpeed, useMetricStability]);

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      {children}
    </div>
  );
}
