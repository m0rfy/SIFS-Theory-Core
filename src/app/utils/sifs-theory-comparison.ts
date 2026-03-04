/**
 * Утилиты для сравнения результатов симуляций с теоретическими предсказаниями SIFS
 */

/**
 * Теоретические предсказания для гравитационного коллапса
 */
export interface CollapseTheoryPrediction {
  expectedMetricStress: number;
  expectedWaveAmplitude: number;
  collapseThreshold: number;
  tensionFormula: (massExponent: number, scaleS: number) => number;
}

/**
 * Вычисляет теоретическое значение напряжения на основе формулы SIFS
 * Формула: impact = (massExponent / 30) * (1 + scaleS / 100) * 100
 */
export function calculateTheoreticalTension(massExponent: number, scaleS: number): number {
  return Math.min(100, Math.max(0, (massExponent / 30) * (1 + scaleS / 100) * 100));
}

/**
 * Вычисляет теоретическое метрическое напряжение
 * На основе массы и координаты S
 */
export function calculateTheoreticalMetricStress(massExponent: number, scaleS: number): number {
  // Теоретическая формула из SIFS: метрическое напряжение зависит от массы и координаты S
  const baseStress = (massExponent / 30) * 50; // Базовое напряжение от массы
  const scaleFactor = 1 + (scaleS / 100) * 0.5; // Влияние координаты S
  return Math.min(100, Math.max(0, baseStress * scaleFactor));
}

/**
 * Вычисляет теоретическую амплитуду волны
 * На основе метрического напряжения и координаты S
 */
export function calculateTheoreticalWaveAmplitude(metricStress: number, scaleS: number): number {
  // Амплитуда волны пропорциональна метрическому напряжению и зависит от координаты S
  const baseAmplitude = metricStress * 0.3; // Базовый коэффициент
  const scaleModifier = 1 + (scaleS / 100) * 0.2; // Модификатор от координаты S
  return Math.min(100, Math.max(0, baseAmplitude * scaleModifier));
}

/**
 * Порог коллапса на основе теоретических предсказаний
 * Коллапс происходит при метрическом напряжении > 80
 */
export function getCollapseThreshold(): number {
  return 80; // Порог коллапса в процентах
}

/**
 * Сравнение результатов коллапса с теорией
 */
export interface CollapseComparison {
  metricStress: {
    actual: number;
    theoretical: number;
    difference: number;
    percentageDiff: number;
  };
  waveAmplitude: {
    actual: number;
    theoretical: number;
    difference: number;
    percentageDiff: number;
  };
  tension: {
    actual: number;
    theoretical: number;
    difference: number;
    percentageDiff: number;
  };
  isCollapsed: {
    actual: boolean;
    expected: boolean;
    matches: boolean;
  };
}

export function compareCollapseWithTheory(
  actual: {
    metricStress: number;
    waveAmplitude: number;
    calculatedTension: number;
    isCollapsed: boolean;
    massExponent: number;
    scaleS: number;
  }
): CollapseComparison {
  const theoreticalTension = calculateTheoreticalTension(actual.massExponent, actual.scaleS);
  const theoreticalMetricStress = calculateTheoreticalMetricStress(actual.massExponent, actual.scaleS);
  const theoreticalWaveAmplitude = calculateTheoreticalWaveAmplitude(theoreticalMetricStress, actual.scaleS);
  const collapseThreshold = getCollapseThreshold();
  const expectedCollapse = theoreticalMetricStress > collapseThreshold;

  return {
    metricStress: {
      actual: actual.metricStress,
      theoretical: theoreticalMetricStress,
      difference: actual.metricStress - theoreticalMetricStress,
      percentageDiff: theoreticalMetricStress > 0
        ? ((actual.metricStress - theoreticalMetricStress) / theoreticalMetricStress) * 100
        : 0,
    },
    waveAmplitude: {
      actual: actual.waveAmplitude,
      theoretical: theoreticalWaveAmplitude,
      difference: actual.waveAmplitude - theoreticalWaveAmplitude,
      percentageDiff: theoreticalWaveAmplitude > 0
        ? ((actual.waveAmplitude - theoreticalWaveAmplitude) / theoreticalWaveAmplitude) * 100
        : 0,
    },
    tension: {
      actual: actual.calculatedTension,
      theoretical: theoreticalTension,
      difference: actual.calculatedTension - theoreticalTension,
      percentageDiff: theoreticalTension > 0
        ? ((actual.calculatedTension - theoreticalTension) / theoreticalTension) * 100
        : 0,
    },
    isCollapsed: {
      actual: actual.isCollapsed,
      expected: expectedCollapse,
      matches: actual.isCollapsed === expectedCollapse,
    },
  };
}

/**
 * Теоретические предсказания для темпоральной синхронизации
 */
export interface TemporalTheoryPrediction {
  expectedTimeDilationDelta: number;
  expectedDriftNs: number;
  frequencyFormula: (amplitude: number, frequency: number) => number;
}

/**
 * Вычисляет теоретическую дельту дилатации времени
 * На основе амплитуды и частоты флуктуаций метрики
 * Формула из SIFS: δt = A × cos(2π × f × t) × ε
 */
export function calculateTheoreticalTimeDilationDelta(
  amplitude: number,
  frequency: number,
  time: number = 0
): number {
  // Теоретическая формула: дельта дилатации пропорциональна амплитуде и частоте
  const epsilon = amplitude * 0.000001; // Коэффициент из теории SIFS
  const metricFactor = 1.0 + epsilon * Math.cos(2 * Math.PI * frequency * time);
  return metricFactor - 1.0;
}

/**
 * Вычисляет теоретический дрифт в наносекундах
 */
export function calculateTheoreticalDriftNs(
  amplitude: number,
  frequency: number,
  time: number = 0
): number {
  const delta = calculateTheoreticalTimeDilationDelta(amplitude, frequency, time);
  return delta * 1e9; // Конвертация в наносекунды
}

/**
 * Сравнение результатов темпоральной синхронизации с теорией
 */
export interface TemporalComparison {
  timeDilationDelta: {
    actual: number;
    theoretical: number;
    difference: number;
    percentageDiff: number;
  };
  driftNs: {
    actual: number;
    theoretical: number;
    difference: number;
    percentageDiff: number;
  };
}

export function compareTemporalWithTheory(
  actual: {
    timeDilationDelta: number;
    driftNs: number;
    amplitude: number;
    frequency: number;
    time?: number;
  }
): TemporalComparison {
  const theoreticalDelta = calculateTheoreticalTimeDilationDelta(
    actual.amplitude,
    actual.frequency,
    actual.time || 0
  );
  const theoreticalDriftNs = calculateTheoreticalDriftNs(
    actual.amplitude,
    actual.frequency,
    actual.time || 0
  );

  return {
    timeDilationDelta: {
      actual: actual.timeDilationDelta,
      theoretical: theoreticalDelta,
      difference: actual.timeDilationDelta - theoreticalDelta,
      percentageDiff: Math.abs(theoreticalDelta) > 1e-10
        ? ((actual.timeDilationDelta - theoreticalDelta) / Math.abs(theoreticalDelta)) * 100
        : 0,
    },
    driftNs: {
      actual: actual.driftNs,
      theoretical: theoreticalDriftNs,
      difference: actual.driftNs - theoreticalDriftNs,
      percentageDiff: Math.abs(theoreticalDriftNs) > 1e-6
        ? ((actual.driftNs - theoreticalDriftNs) / Math.abs(theoreticalDriftNs)) * 100
        : 0,
    },
  };
}
