/**
 * TimeWaveVisualization Component
 *
 * Визуализация временных волн, связана с --sifs-oscillation-speed
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface TimeWaveVisualizationProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Амплитуда волны (0-1) */
  amplitude?: number;
  /** Частота волны */
  frequency?: number;
  /** Связать с --sifs-oscillation-speed */
  useOscillationSpeed?: boolean;
  /** Количество волн */
  waveCount?: number;
  /** Дети компонента */
  children?: React.ReactNode;
}

/**
 * TimeWaveVisualization component
 *
 * Создаёт визуализацию временных волн, связанную с параметрами теории
 */
export function TimeWaveVisualization({
  className,
  amplitude = 0.5,
  frequency = 1,
  useOscillationSpeed = true,
  waveCount = 3,
  children,
}: TimeWaveVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Установка размера canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Параметры волны
    let time = 0;

    const drawWave = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Получаем CSS переменные
      const computedStyle = getComputedStyle(canvas);
      const oscillationSpeed = parseFloat(
        computedStyle.getPropertyValue('--sifs-oscillation-speed') || '1'
      );

      let waveFrequency = frequency;
      if (useOscillationSpeed) {
        waveFrequency = (1 / oscillationSpeed) * frequency;
      }

      // Очистка canvas
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const waveAmplitude = centerY * amplitude;

      // Рисуем несколько волн
      for (let waveIndex = 0; waveIndex < waveCount; waveIndex++) {
        ctx.beginPath();
        ctx.strokeStyle = `oklch(65% 0.25 ${250 - waveIndex * 20} / ${0.6 - waveIndex * 0.1})`;
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x += 2) {
          const y =
            centerY +
            Math.sin((x / width) * Math.PI * 2 * waveFrequency + time * 0.01 + waveIndex) *
              waveAmplitude *
              (1 - waveIndex * 0.2);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      time += 1;
      animationFrameRef.current = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [amplitude, frequency, useOscillationSpeed, waveCount]);

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
