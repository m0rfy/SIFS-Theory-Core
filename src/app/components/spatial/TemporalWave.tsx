/**
 * Temporal Wave - Визуализация темпоральной волны
 * 
 * T072: Визуализация темпоральной волны
 * Связь с --sifs-oscillation-speed
 * Плавная анимация волны
 */

import { useEffect, useRef } from 'react';

interface TemporalWaveProps {
  className?: string;
  width?: number;
  height?: number;
  amplitude?: number;
  frequency?: number;
}

export function TemporalWave({
  className = '',
  width = 200,
  height = 100,
  amplitude = 30,
  frequency = 1,
}: TemporalWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Читаем --sifs-oscillation-speed из CSS переменной
    const getOscillationSpeed = (): number => {
      const root = getComputedStyle(document.documentElement);
      const speed = root.getPropertyValue('--sifs-oscillation-speed') || '1s';
      // Преобразуем "1s" в число (секунды)
      const seconds = parseFloat(speed.replace('s', '')) || 1;
      return seconds;
    };

    const drawWave = () => {
      const oscillationSpeed = getOscillationSpeed();
      const adjustedFreq = frequency / oscillationSpeed; // Адаптируем частоту к скорости осцилляции
      
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'var(--sifs-delta-color, oklch(65% 0.25 250))';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = height / 2;
      const points = 200;
      const step = width / points;

      for (let i = 0; i <= points; i++) {
        const x = i * step;
        // Комбинируем несколько волн для более сложной формы
        const wave1 = Math.sin((x / width) * Math.PI * 2 * adjustedFreq + timeRef.current) * amplitude;
        const wave2 = Math.sin((x / width) * Math.PI * 4 * adjustedFreq + timeRef.current * 1.5) * (amplitude * 0.5);
        const y = centerY + wave1 + wave2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Обновляем время для анимации
      timeRef.current += 0.02;
      animationFrameRef.current = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, amplitude, frequency]);

  return (
    <div className={`temporal-wave ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
        aria-label="Temporal Wave Visualization"
      />
    </div>
  );
}
