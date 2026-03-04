/**
 * Level 3: The Pulse - Delta Pulse Indicator
 * 
 * T069: Индикатор пульса (SSF-2025 Level 3: Pulse)
 * Связь с --sifs-delta-color для динамического цвета
 * Плавная анимация пульса
 */

import { useEffect, useState } from 'react';

interface DeltaPulseProps {
  className?: string;
  size?: number;
}

export function DeltaPulse({ className = '', size = 8 }: DeltaPulseProps) {
  const [pulseColor, setPulseColor] = useState('oklch(65% 0.25 250)');

  // Читаем --sifs-delta-color из CSS переменной
  useEffect(() => {
    const updateColor = () => {
      const root = getComputedStyle(document.documentElement);
      const deltaColor = root.getPropertyValue('--sifs-delta-color').trim() || 'oklch(65% 0.25 250)';
      setPulseColor(deltaColor);
    };

    // Обновляем при изменении CSS переменной
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Также проверяем через requestAnimationFrame для плавности
    let rafId: number | null = null;
    const checkColor = () => {
      updateColor();
      rafId = requestAnimationFrame(checkColor);
    };
    
    rafId = requestAnimationFrame(checkColor);
    
    updateColor();
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`delta-pulse ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: pulseColor,
        boxShadow: `0 0 ${size * 1.5}px ${pulseColor}`,
        animation: `pulse var(--sifs-oscillation-speed, 1s) ease-in-out infinite`,
      }}
      aria-label="Delta Pulse Indicator"
    />
  );
}
