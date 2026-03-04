/**
 * Level 0: The Temporal Abyss
 * 
 * T099 [US10]: Level 0 (Temporal Abyss) background with time particles,
 * WebGPU rendering with Canvas fallback (FR-021), compute shaders for particles (FR-028.1),
 * reaction to --sifs-oscillation-speed (particle acceleration), 60 FPS performance
 * 
 * T074: Фоновая сетка координат, которая "дышит" в такт с --sifs-oscillation-speed
 */

import { useEffect, useRef } from 'react';
import { createParticleSystem, ParticleSystem } from '@/app/utils/webgpu-particles';

export function TemporalAbyss() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const speedMultiplierRef = useRef<number>(1);

  // T099: Инициализация системы частиц с WebGPU/Canvas fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Получаем размеры контейнера
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Создаём систему частиц (2000 частиц для эффекта времени)
    const system = createParticleSystem({
      canvas,
      particleCount: 2000,
      width: canvas.width,
      height: canvas.height,
      useWebGPU: 'gpu' in navigator, // Автоматическое определение WebGPU
    });

    particleSystemRef.current = system;

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      system.destroy();
      particleSystemRef.current = null;
    };
  }, []);

  // T099: Реакция на --sifs-oscillation-speed для ускорения частиц (< 100ms delay)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateParticleSpeed = () => {
      const root = getComputedStyle(document.documentElement);
      const oscillationSpeed = root.getPropertyValue('--sifs-oscillation-speed') || '1s';
      const seconds = parseFloat(oscillationSpeed.replace('s', '')) || 1;
      
      // Ускорение частиц обратно пропорционально скорости осцилляции
      // Меньше скорость осцилляции = быстрее частицы
      const particleSpeed = 1 / seconds;
      speedMultiplierRef.current = particleSpeed;
      
      // Обновляем скорость частиц в реальном времени
      if (particleSystemRef.current) {
        particleSystemRef.current.setSpeedMultiplier(particleSpeed);
      }
      
      // Применяем к контейнеру через CSS переменную для других эффектов
      container.style.setProperty('--particle-speed', particleSpeed.toString());
    };

    // Обновляем при изменении CSS переменной через requestAnimationFrame для 60 FPS
    let rafId: number | null = null;
    const checkSpeed = () => {
      updateParticleSpeed();
      rafId = requestAnimationFrame(checkSpeed);
    };
    
    rafId = requestAnimationFrame(checkSpeed);
    updateParticleSpeed();

    // Также слушаем изменения через MutationObserver для быстрой реакции (< 100ms)
    const observer = new MutationObserver(updateParticleSpeed);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="temporal-abyss">
      {/* T099: Canvas для WebGPU/Canvas 2D частиц времени */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      
      {/* Сетка координат */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          animation: `breathe var(--sifs-oscillation-speed, 1s) ease-in-out infinite`,
        }}
      >
        <defs>
          <pattern
            id="temporal-grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#temporal-grid)" />
      </svg>
      
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        
        .temporal-abyss {
          --particle-speed: 1;
        }
      `}</style>
    </div>
  );
}
