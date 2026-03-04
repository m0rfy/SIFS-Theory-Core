/**
 * Frequency Knob - Интерактивный регулятор частоты
 * 
 * T070: Интерактивный регулятор частоты
 * Связь с --sifs-oscillation-speed
 * Визуальная обратная связь при изменении
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { RotateCw } from 'lucide-react';

interface FrequencyKnobProps {
  className?: string;
  initialFrequency?: number;
  min?: number;
  max?: number;
  step?: number;
  onFrequencyChange?: (frequency: number) => void;
}

export function FrequencyKnob({
  className = '',
  initialFrequency = 1.0,
  min = 0.1,
  max = 5.0,
  step = 0.1,
  onFrequencyChange,
}: FrequencyKnobProps) {
  const [frequency, setFrequency] = useState(initialFrequency);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startFreqRef = useRef<number>(0);

  // Обновляем CSS переменную при изменении частоты
  useEffect(() => {
    const root = document.documentElement;
    const speed = Math.max(0.5, Math.min(3, 1 / (frequency || 1)));
    root.style.setProperty('--sifs-oscillation-speed', `${speed}s`);
    
    if (onFrequencyChange) {
      onFrequencyChange(frequency);
    }
  }, [frequency, onFrequencyChange]);

  // Обработка перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startFreqRef.current = frequency;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = startYRef.current - e.clientY; // Инвертируем для интуитивности (вверх = больше)
    const deltaFreq = (deltaY / 100) * (max - min); // Масштабируем движение мыши
    const newFreq = Math.max(min, Math.min(max, startFreqRef.current + deltaFreq));
    
    // Округляем до шага
    const roundedFreq = Math.round(newFreq / step) * step;
    setFrequency(roundedFreq);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Обработка колесика мыши
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -step : step;
    const newFreq = Math.max(min, Math.min(max, frequency + delta));
    setFrequency(Math.round(newFreq / step) * step);
  };

  // Вычисляем угол поворота для визуализации
  const rotation = ((frequency - min) / (max - min)) * 270; // 270 градусов поворота

  return (
    <div className={`frequency-knob ${className}`}>
      <motion.div
        ref={knobRef}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 cursor-pointer select-none"
        style={{
          rotate: rotation,
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Frequency: ${frequency.toFixed(1)} Hz`}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={frequency}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <RotateCw className="w-6 h-6 text-slate-300" />
        </div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-200 rounded-full" />
      </motion.div>
      <div className="mt-2 text-center">
        <div className="text-xs text-slate-400">Frequency</div>
        <div className="text-sm font-mono text-slate-200">{frequency.toFixed(1)} Hz</div>
      </div>
    </div>
  );
}
