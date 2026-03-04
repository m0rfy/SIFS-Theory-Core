/**
 * Утилита для синхронизации визуальных эффектов между несколькими симуляциями
 * Реализует FR-049: синхронизация визуальных эффектов при запуске нескольких симуляций
 */

import React from 'react';
import { updateSpatialVariables, SpatialParams } from './sifs-spatial-connector';

/**
 * Глобальное состояние синхронизации
 */
interface SimulationState {
  id: string;
  params: SpatialParams;
  timestamp: number;
}

class SimulationSyncManager {
  private simulations: Map<string, SimulationState> = new Map();
  private syncInterval: number | null = null;
  private readonly SYNC_INTERVAL_MS = 16; // ~60 FPS для плавной синхронизации

  /**
   * Регистрация симуляции в системе синхронизации
   */
  register(id: string, params: SpatialParams): void {
    this.simulations.set(id, {
      id,
      params,
      timestamp: Date.now(),
    });

    // Запускаем синхронизацию если это первая симуляция
    if (this.simulations.size === 1) {
      this.startSync();
    } else {
      // Немедленно синхронизируем при добавлении новой симуляции
      this.sync();
    }
  }

  /**
   * Обновление параметров симуляции
   */
  update(id: string, params: Partial<SpatialParams>): void {
    const existing = this.simulations.get(id);
    if (existing) {
      this.simulations.set(id, {
        ...existing,
        params: { ...existing.params, ...params },
        timestamp: Date.now(),
      });
      this.sync();
    }
  }

  /**
   * Отмена регистрации симуляции
   */
  unregister(id: string): void {
    this.simulations.delete(id);
    
    // Останавливаем синхронизацию если нет активных симуляций
    if (this.simulations.size === 0) {
      this.stopSync();
    } else {
      // Синхронизируем оставшиеся симуляции
      this.sync();
    }
  }

  /**
   * Синхронизация всех активных симуляций
   * Объединяет параметры всех симуляций для единого визуального эффекта
   */
  private sync(): void {
    if (this.simulations.size === 0) {
      return;
    }

    // Объединяем параметры всех симуляций
    const combinedParams: SpatialParams = {};
    
    // Суммируем метрические параметры (для визуальных эффектов)
    let totalMetricStress = 0;
    let totalWaveAmplitude = 0;
    let totalFrequency = 0;
    let totalTimeDilationDelta = 0;
    let count = 0;

    this.simulations.forEach((state) => {
      if (state.params.metricStress !== undefined) {
        totalMetricStress += state.params.metricStress;
        count++;
      }
      if (state.params.waveAmplitude !== undefined) {
        totalWaveAmplitude += state.params.waveAmplitude;
      }
      if (state.params.frequency !== undefined) {
        totalFrequency += state.params.frequency;
      }
      if (state.params.timeDilationDelta !== undefined) {
        totalTimeDilationDelta += state.params.timeDilationDelta;
      }
    });

    // Усредняем параметры для плавной синхронизации
    if (count > 0) {
      combinedParams.metricStress = totalMetricStress / count;
    }
    if (this.simulations.size > 0) {
      combinedParams.waveAmplitude = totalWaveAmplitude / this.simulations.size;
      combinedParams.frequency = totalFrequency / this.simulations.size;
      combinedParams.timeDilationDelta = totalTimeDilationDelta / this.simulations.size;
    }

    // Обновляем CSS переменные через spatial connector
    updateSpatialVariables(combinedParams);
  }

  /**
   * Запуск периодической синхронизации
   */
  private startSync(): void {
    if (this.syncInterval !== null) {
      return; // Уже запущена
    }

    this.syncInterval = window.setInterval(() => {
      this.sync();
    }, this.SYNC_INTERVAL_MS);
  }

  /**
   * Остановка периодической синхронизации
   */
  private stopSync(): void {
    if (this.syncInterval !== null) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    // Сбрасываем CSS переменные к значениям по умолчанию
    updateSpatialVariables({
      metricStability: 1,
      timeDilationDelta: 0,
      oscillationFreq: 1,
    });
  }

  /**
   * Получение количества активных симуляций
   */
  getActiveCount(): number {
    return this.simulations.size;
  }
}

// Глобальный экземпляр менеджера синхронизации
const syncManager = new SimulationSyncManager();

/**
 * React хук для синхронизации визуальных эффектов симуляций
 * 
 * @param id Уникальный идентификатор симуляции
 * @param params Параметры симуляции для синхронизации
 */
export function useSimulationSync(id: string, params: SpatialParams): void {
  React.useEffect(() => {
    // Регистрируем симуляцию при монтировании
    syncManager.register(id, params);

    // Обновляем параметры при их изменении
    syncManager.update(id, params);

    // Отменяем регистрацию при размонтировании
    return () => {
      syncManager.unregister(id);
    };
  }, [id, params.metricStress, params.waveAmplitude, params.frequency, params.timeDilationDelta]);
}

/**
 * Получение количества активных симуляций (для отладки)
 */
export function getActiveSimulationsCount(): number {
  return syncManager.getActiveCount();
}
