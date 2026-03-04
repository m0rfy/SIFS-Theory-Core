/**
 * Chrono Odometer - Отображение времени с анимацией одометра
 * 
 * T071: Отображение времени с анимацией одометра
 * Связь с темпоральной дилатацией через --sifs-time-dilation-delta
 * Плавная анимация изменения значений
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChronoOdometerProps {
  className?: string;
  initialTime?: number;
  format?: 'seconds' | 'milliseconds';
}

export function ChronoOdometer({
  className = '',
  initialTime = 0,
  format = 'seconds',
}: ChronoOdometerProps) {
  // Используем реальное время системы как базовое время
  const [startTime] = useState(() => Date.now() / 1000); // Время старта в секундах
  const [time, setTime] = useState(0);
  const [timeDilationDelta, setTimeDilationDelta] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastUpdateRef = useRef<number>(performance.now());

  // Читаем --sifs-time-dilation-delta из CSS переменной
  useEffect(() => {
    const updateDelta = () => {
      const root = getComputedStyle(document.documentElement);
      const delta = parseFloat(root.getPropertyValue('--sifs-time-dilation-delta') || '0');
      setTimeDilationDelta(delta);
    };

    // Обновляем при изменении CSS переменной
    const observer = new MutationObserver(updateDelta);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Также проверяем через requestAnimationFrame для плавности
    let rafId: number | null = null;
    const checkDelta = () => {
      updateDelta();
      rafId = requestAnimationFrame(checkDelta);
    };
    
    rafId = requestAnimationFrame(checkDelta);
    
    updateDelta();
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Обновляем время с учетом темпоральной дилатации
  // Используем реальное время системы + дилатация
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Инициализируем время с момента монтирования компонента
    setTime(0); // Начинаем с 0
    lastUpdateRef.current = performance.now();

    // Обновляем время каждые 100ms для плавности
    const updateInterval = 100;
    
    intervalRef.current = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - lastUpdateRef.current) / 1000; // Прошедшее время в секундах
      lastUpdateRef.current = now;
      
      // Применяем темпоральную дилатацию:
      // delta > 0 означает замедление времени (время идет медленнее)
      // delta < 0 означает ускорение времени (время идет быстрее)
      // Формула: реальное_время * (1 + delta)
      const dilatedElapsed = elapsed * (1 + timeDilationDelta);
      
      setTime((prev) => {
        const newTime = prev + dilatedElapsed;
        return newTime;
      });
    }, updateInterval);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeDilationDelta]);

  // Форматируем время для отображения
  // Показываем реальное время системы + накопленная дилатация
  const formatTime = (t: number): string => {
    if (format === 'milliseconds') {
      const totalMs = Math.floor(t * 1000);
      const ms = totalMs % 1000;
      const s = Math.floor((totalMs / 1000) % 60);
      const m = Math.floor((totalMs / 60000) % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    } else {
      const totalSeconds = Math.floor(t);
      const s = totalSeconds % 60;
      const m = Math.floor((totalSeconds / 60) % 60);
      const h = Math.floor(totalSeconds / 3600);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  };

  const timeString = formatTime(time);
  const digits = timeString.split('');
  
  // Используем предыдущее значение для определения изменений
  const prevTimeStringRef = useRef(timeString);
  
  // Обновляем ref при изменении времени
  useEffect(() => {
    prevTimeStringRef.current = timeString;
  }, [timeString]);

  return (
    <div className={`chrono-odometer ${className}`}>
      <div className="flex items-center gap-1 font-mono text-2xl text-slate-200">
        {digits.map((digit, index) => {
          const isSeparator = digit === ':' || digit === '.';
          // Используем комбинацию индекса и значения для уникального key
          // Это заставит Motion переанимировать только измененные цифры
          const key = `${index}-${digit}-${timeString}`;
          const hasChanged = prevTimeStringRef.current[index] !== digit;
          
          return (
            <motion.span
              key={key}
              initial={hasChanged && !isSeparator ? { y: -20, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="inline-block"
            >
              {isSeparator ? (
                <span className="text-slate-400">{digit}</span>
              ) : (
                digit
              )}
            </motion.span>
          );
        })}
      </div>
      {timeDilationDelta !== 0 && (
        <div className="mt-1 text-xs text-slate-400 text-center">
          Δ: {timeDilationDelta > 0 ? '+' : ''}{timeDilationDelta.toFixed(3)}
        </div>
      )}
    </div>
  );
}
