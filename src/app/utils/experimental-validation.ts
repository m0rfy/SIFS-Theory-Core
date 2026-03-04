/**
 * Experimental Data Validation
 * 
 * T088: Валидация результатов расчётов с экспериментальными данными (FR-032)
 * - CODATA 2018/2022: фундаментальные константы
 * - DESI: тёмная энергия
 * - EHT: чёрные дыры
 * - LIGO: гравитационные волны
 */

export type ExperimentalDataSource = 'CODATA' | 'DESI' | 'EHT' | 'LIGO';

export interface ExperimentalData {
  /** Источник данных */
  source: ExperimentalDataSource;
  /** Название величины */
  name: string;
  /** Значение */
  value: number;
  /** Неопределённость */
  uncertainty?: number;
  /** Единицы измерения */
  units?: string;
  /** Год публикации */
  year?: number;
}

export interface ValidationResult {
  /** Теоретическое значение */
  theoretical: number;
  /** Экспериментальное значение */
  experimental: number;
  /** Источник данных */
  source: ExperimentalDataSource;
  /** Процент совпадения (0-100+) */
  accuracy: number;
  /** Отклонение в сигмах */
  deviation?: number;
  /** Соответствует ли критерию (±5%) */
  isValid: boolean;
}

/**
 * Экспериментальные данные CODATA 2018/2022
 */
export const CODATA_DATA: Record<string, ExperimentalData> = {
  // Гравитационная константа
  G: {
    source: 'CODATA',
    name: 'Гравитационная константа',
    value: 6.67430e-11,
    uncertainty: 0.00015e-11,
    units: 'm³/(kg·s²)',
    year: 2022,
  },
  // Постоянная тонкой структуры
  alpha: {
    source: 'CODATA',
    name: 'Постоянная тонкой структуры',
    value: 1 / 137.035999206,
    uncertainty: 0.000000011,
    units: '',
    year: 2022,
  },
  // Сильная константа связи (при M_Z)
  alpha_s: {
    source: 'CODATA',
    name: 'Сильная константа связи α_s(M_Z)',
    value: 0.1179,
    uncertainty: 0.0010,
    units: '',
    year: 2022,
  },
  // Ферми константа
  G_F: {
    source: 'CODATA',
    name: 'Ферми константа',
    value: 1.1663787e-5,
    uncertainty: 0.0000006e-5,
    units: 'GeV⁻²',
    year: 2022,
  },
  // Масса протона
  m_proton: {
    source: 'CODATA',
    name: 'Масса протона',
    value: 1.67262192369e-27,
    uncertainty: 0.00000000051e-27,
    units: 'kg',
    year: 2022,
  },
  // Масса электрона
  m_electron: {
    source: 'CODATA',
    name: 'Масса электрона',
    value: 9.1093837015e-31,
    uncertainty: 0.0000000028e-31,
    units: 'kg',
    year: 2022,
  },
};

/**
 * Экспериментальные данные DESI 2025
 */
export const DESI_DATA: Record<string, ExperimentalData> = {
  // Уравнение состояния тёмной энергии (z=0)
  w0: {
    source: 'DESI',
    name: 'w₀ (z=0)',
    value: -0.827,
    uncertainty: 0.063,
    units: '',
    year: 2025,
  },
  // Параметр эволюции
  wa: {
    source: 'DESI',
    name: 'wₐ',
    value: -0.75,
    uncertainty: 0.29,
    units: '',
    year: 2025,
  },
};

/**
 * Экспериментальные данные EHT (Event Horizon Telescope)
 */
export const EHT_DATA: Record<string, ExperimentalData> = {
  // M87* масса
  M87_mass: {
    source: 'EHT',
    name: 'Масса M87*',
    value: 6.5e9,
    uncertainty: 0.7e9,
    units: 'M☉',
    year: 2019,
  },
  // M87* радиус горизонта
  M87_radius: {
    source: 'EHT',
    name: 'Радиус горизонта M87*',
    value: 1.9e13,
    uncertainty: 0.2e13,
    units: 'm',
    year: 2019,
  },
  // Sgr A* масса
  SgrA_mass: {
    source: 'EHT',
    name: 'Масса Sgr A*',
    value: 4.1e6,
    uncertainty: 0.6e6,
    units: 'M☉',
    year: 2022,
  },
};

/**
 * Экспериментальные данные LIGO/Virgo
 */
export const LIGO_DATA: Record<string, ExperimentalData> = {
  // GW150914 частота слияния
  GW150914_freq: {
    source: 'LIGO',
    name: 'Частота слияния GW150914',
    value: 35,
    uncertainty: 4,
    units: 'Hz',
    year: 2016,
  },
  // GW150914 масса чёрной дыры
  GW150914_mass: {
    source: 'LIGO',
    name: 'Масса ЧД GW150914',
    value: 36,
    uncertainty: 5,
    units: 'M☉',
    year: 2016,
  },
};

/**
 * Валидация теоретического значения с экспериментальными данными
 * 
 * @param theoretical Теоретическое значение
 * @param experimentalData Экспериментальные данные
 * @param threshold Порог точности в процентах (по умолчанию 5%)
 * @returns Результат валидации
 */
export function validateWithExperimentalData(
  theoretical: number,
  experimentalData: ExperimentalData,
  threshold: number = 5
): ValidationResult {
  const experimental = experimentalData.value;
  const uncertainty = experimentalData.uncertainty || 0;

  // Вычисляем процент совпадения
  const accuracy = Math.abs(1 - Math.abs(theoretical - experimental) / experimental) * 100;

  // Вычисляем отклонение в сигмах
  const deviation = uncertainty > 0
    ? Math.abs(theoretical - experimental) / uncertainty
    : undefined;

  // Проверяем соответствие критерию (±threshold%)
  const isValid = accuracy >= (100 - threshold);

  return {
    theoretical,
    experimental,
    source: experimentalData.source,
    accuracy,
    deviation,
    isValid,
  };
}

/**
 * Валидация константы связи с CODATA
 */
export function validateCouplingConstant(
  name: 'G' | 'alpha' | 'alpha_s' | 'G_F',
  theoretical: number
): ValidationResult {
  const data = CODATA_DATA[name];
  if (!data) {
    throw new Error(`Unknown coupling constant: ${name}`);
  }
  return validateWithExperimentalData(theoretical, data);
}

/**
 * Валидация тёмной энергии с DESI
 */
export function validateDarkEnergy(
  parameter: 'w0' | 'wa',
  theoretical: number
): ValidationResult {
  const data = DESI_DATA[parameter];
  if (!data) {
    throw new Error(`Unknown dark energy parameter: ${parameter}`);
  }
  return validateWithExperimentalData(theoretical, data, 10); // 10% для космологии
}

/**
 * Валидация массы частицы с CODATA
 */
export function validateParticleMass(
  particle: 'm_proton' | 'm_electron',
  theoretical: number
): ValidationResult {
  const data = CODATA_DATA[particle];
  if (!data) {
    throw new Error(`Unknown particle: ${particle}`);
  }
  return validateWithExperimentalData(theoretical, data);
}

/**
 * Валидация параметров чёрной дыры с EHT
 */
export function validateBlackHole(
  parameter: 'M87_mass' | 'M87_radius' | 'SgrA_mass',
  theoretical: number
): ValidationResult {
  const data = EHT_DATA[parameter];
  if (!data) {
    throw new Error(`Unknown EHT parameter: ${parameter}`);
  }
  return validateWithExperimentalData(theoretical, data, 20); // 20% для астрофизики
}

/**
 * Валидация гравитационных волн с LIGO
 */
export function validateGravitationalWave(
  parameter: 'GW150914_freq' | 'GW150914_mass',
  theoretical: number
): ValidationResult {
  const data = LIGO_DATA[parameter];
  if (!data) {
    throw new Error(`Unknown LIGO parameter: ${parameter}`);
  }
  return validateWithExperimentalData(theoretical, data, 20); // 20% для гравитационных волн
}
