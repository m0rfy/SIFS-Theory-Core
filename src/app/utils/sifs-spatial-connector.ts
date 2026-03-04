/**
 * SSF-2025 Spatial Connector
 * 
 * Связывает параметры теории SIFS с CSS переменными для real-time обновления UI
 */

export interface SpatialParams {
  metricStability?: number; // 0.0 - 1.0
  timeDilationDelta?: number;
  oscillationFreq?: number; // Hz
  metricStress?: number; // для InformationalCollapseSimulation
  waveAmplitude?: number; // для InformationalCollapseSimulation
  frequency?: number; // для AtomicClockSync
}

let rafId: number | null = null;
let pendingUpdates: Partial<SpatialParams> = {};

/**
 * Обновляет CSS переменные в реальном времени
 */
export function updateSpatialVariables(params: SpatialParams): void {
  // Батчинг обновлений через requestAnimationFrame
  Object.assign(pendingUpdates, params);

  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      applySpatialUpdates();
      rafId = null;
    });
  }
}

function applySpatialUpdates(): void {
  const root = document.documentElement;

  if (pendingUpdates.metricStability !== undefined) {
    const stability = Math.max(0, Math.min(1, pendingUpdates.metricStability));
    root.style.setProperty('--sifs-metric-stability', stability.toString());
    root.style.setProperty('--sifs-sigma-blur', `${20 * (1 - stability)}px`);
    
    // Обновляем data-атрибут для вибрации
    const dock = document.querySelector('.dock-spatial-module');
    if (dock) {
      if (stability < 0.5) {
        dock.setAttribute('data-stability', 'low');
      } else {
        dock.setAttribute('data-stability', 'normal');
      }
    }
  }

  if (pendingUpdates.timeDilationDelta !== undefined) {
    const delta = pendingUpdates.timeDilationDelta;
    root.style.setProperty('--sifs-time-dilation-delta', delta.toString());
    
    // Вычисляем цвет в зависимости от дельты
    // Синий (250) для стабильного, красный (0) для нестабильного
    const hue = 250 - Math.abs(delta) * 50; // Переход от синего к красному
    const chroma = 0.25;
    const lightness = 65;
    root.style.setProperty('--sifs-delta-color', `oklch(${lightness}% ${chroma} ${hue})`);
  }

  if (pendingUpdates.oscillationFreq !== undefined) {
    const freq = pendingUpdates.oscillationFreq;
    // Преобразуем частоту в скорость анимации (обратная зависимость)
    const speed = Math.max(0.5, Math.min(3, 1 / (freq || 1)));
    root.style.setProperty('--sifs-oscillation-speed', `${speed}s`);
  }

  // Интеграция с InformationalCollapseSimulation
  if (pendingUpdates.metricStress !== undefined) {
    updateSpatialVariables({ metricStability: 1 - pendingUpdates.metricStress });
  }

  if (pendingUpdates.waveAmplitude !== undefined) {
    updateSpatialVariables({ oscillationFreq: pendingUpdates.waveAmplitude });
  }

  // Интеграция с AtomicClockSync
  if (pendingUpdates.frequency !== undefined) {
    updateSpatialVariables({ oscillationFreq: pendingUpdates.frequency });
  }

  pendingUpdates = {};
}

/**
 * React хук для автоматической интеграции в компоненты
 */
import { useEffect } from 'react';

export function useSpatialConnector(params: SpatialParams): void {
  useEffect(() => {
    updateSpatialVariables(params);
    
    return () => {
      // Сброс к значениям по умолчанию при размонтировании
      updateSpatialVariables({
        metricStability: 1,
        timeDilationDelta: 0,
        oscillationFreq: 1,
      });
    };
  }, [params.metricStability, params.timeDilationDelta, params.oscillationFreq]);
}

/**
 * Инициализация значений по умолчанию
 */
export function initializeSpatialFramework(): void {
  updateSpatialVariables({
    metricStability: 1,
    timeDilationDelta: 0,
    oscillationFreq: 1,
  });
}
