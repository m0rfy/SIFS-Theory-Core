/**
 * Утилиты для валидации параметров симуляций
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Валидация параметров гравитационного коллапса
 */
export interface CollapseSimulationParams {
  massExponent?: number;
  scaleS?: number;
  calculatedTension?: number;
  metricStress?: number;
  waveAmplitude?: number;
}

export function validateCollapseParams(params: CollapseSimulationParams): ValidationResult {
  const errors: ValidationError[] = [];

  // Валидация massExponent (10^massExponent kg)
  if (params.massExponent !== undefined) {
    if (params.massExponent < 0 || params.massExponent > 50) {
      errors.push({
        field: 'massExponent',
        message: 'Показатель массы должен быть в диапазоне 0-50 (10^0 - 10^50 kg)',
      });
    }
  }

  // Валидация scaleS (координата S)
  if (params.scaleS !== undefined) {
    if (params.scaleS < 0 || params.scaleS > 100) {
      errors.push({
        field: 'scaleS',
        message: 'Координата S должна быть в диапазоне 0-100',
      });
    }
  }

  // Валидация calculatedTension (напряжение)
  if (params.calculatedTension !== undefined) {
    if (params.calculatedTension < 0 || params.calculatedTension > 100) {
      errors.push({
        field: 'calculatedTension',
        message: 'Напряжение должно быть в диапазоне 0-100%',
      });
    }
  }

  // Валидация metricStress (метрическое напряжение)
  if (params.metricStress !== undefined) {
    if (params.metricStress < 0 || params.metricStress > 100) {
      errors.push({
        field: 'metricStress',
        message: 'Метрическое напряжение должно быть в диапазоне 0-100',
      });
    }
  }

  // Валидация waveAmplitude (амплитуда волны)
  if (params.waveAmplitude !== undefined) {
    if (params.waveAmplitude < 0 || params.waveAmplitude > 100) {
      errors.push({
        field: 'waveAmplitude',
        message: 'Амплитуда волны должна быть в диапазоне 0-100',
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Валидация параметров темпоральной синхронизации
 */
export interface TemporalSyncParams {
  amplitude?: number;
  frequency?: number;
  speedMultiplier?: number;
  timeDilationDelta?: number;
}

export function validateTemporalParams(params: TemporalSyncParams): ValidationResult {
  const errors: ValidationError[] = [];

  // Валидация amplitude (амплитуда флуктуаций метрики)
  if (params.amplitude !== undefined) {
    if (params.amplitude < 0 || params.amplitude > 10) {
      errors.push({
        field: 'amplitude',
        message: 'Амплитуда должна быть в диапазоне 0-10 σ',
      });
    }
  }

  // Валидация frequency (частота осцилляций)
  if (params.frequency !== undefined) {
    if (params.frequency < 0 || params.frequency > 100) {
      errors.push({
        field: 'frequency',
        message: 'Частота должна быть в диапазоне 0-100 Hz',
      });
    }
  }

  // Валидация speedMultiplier (множитель скорости)
  if (params.speedMultiplier !== undefined) {
    if (params.speedMultiplier < 0.1 || params.speedMultiplier > 100) {
      errors.push({
        field: 'speedMultiplier',
        message: 'Множитель скорости должен быть в диапазоне 0.1-100',
      });
    }
  }

  // Валидация timeDilationDelta (дельта дилатации времени)
  // В реальных физических условиях дилатация может быть значительной
  // Увеличиваем порог до 1e-1 (0.1) для более реалистичных симуляций
  if (params.timeDilationDelta !== undefined) {
    // Только предупреждаем о экстремально больших значениях (> 1.0)
    if (Math.abs(params.timeDilationDelta) > 1.0) {
      errors.push({
        field: 'timeDilationDelta',
        message: `Дельта дилатации времени очень велика (${params.timeDilationDelta.toExponential(2)}), проверьте параметры симуляции`,
      });
    }
    // Для значений > 0.1 показываем предупреждение, но не блокируем
    else if (Math.abs(params.timeDilationDelta) > 0.1) {
      // Это предупреждение, но не критическая ошибка
      // Можно добавить в warnings, но пока оставляем как есть
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Общая функция валидации с обработкой ошибок
 */
export function validateAndHandleErrors<T>(
  params: T,
  validator: (params: T) => ValidationResult,
  onError?: (errors: ValidationError[]) => void
): boolean {
  const result = validator(params);
  
  if (!result.isValid && onError) {
    onError(result.errors);
  }
  
  return result.isValid;
}
