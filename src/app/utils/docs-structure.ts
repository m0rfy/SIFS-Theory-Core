/**
 * Document Structure Utility
 * 
 * Определяет структуру всех документов в docs/ для навигации и отображения
 */

export interface Document {
  id: string;
  title: string;
  category: DocumentCategory;
  path: string;
  description?: string;
  tags?: string[];
  related?: string[];
  order?: number;
}

export type DocumentCategory =
  | 'theory'
  | 'calculations'
  | 'predictions'
  | 'data'
  | 'defense'
  | 'protocol'
  | 'analysis'
  | 'visualizations';

export interface DocumentStructure {
  categories: Record<DocumentCategory, Document[]>;
  all: Document[];
}

/**
 * Структура всех документов в docs/
 * Автоматически синхронизируется с файловой структурой
 */
export const DOCUMENTS: DocumentStructure = {
  categories: {
    theory: [
      {
        id: 'overview',
        title: 'Обзор теории',
        category: 'theory',
        path: '/docs/theory/overview.md',
        description: 'Введение в SIFS Theory',
        order: 1,
      },
      {
        id: 'fractal-structure',
        title: 'Фрактальная структура',
        category: 'theory',
        path: '/docs/theory/fractal-structure.md',
        description: 'Фрактальная геометрия пространства-времени',
        order: 2,
      },
      {
        id: 'mathematics',
        title: 'Математика',
        category: 'theory',
        path: '/docs/theory/mathematics.md',
        description: 'Математический аппарат теории',
        order: 3,
      },
      {
        id: 'equations-of-motion',
        title: 'Уравнения движения',
        category: 'theory',
        path: '/docs/theory/equations-of-motion.md',
        description: 'Уравнения движения в фрактальном пространстве-времени',
        order: 4,
      },
      {
        id: 'dynamic-scaling',
        title: 'Динамическое масштабирование',
        category: 'theory',
        path: '/docs/theory/dynamic-scaling.md',
        description: 'Масштабно-инвариантные свойства',
        order: 5,
      },
      {
        id: 'holographic',
        title: 'Голографический принцип',
        category: 'theory',
        path: '/docs/theory/holographic.md',
        description: 'Голографическая природа информации',
        order: 6,
      },
      {
        id: 'quantum-entanglement',
        title: 'Квантовая запутанность',
        category: 'theory',
        path: '/docs/theory/quantum-entanglement.md',
        description: 'Квантовая запутанность в SIFS',
        order: 7,
      },
      {
        id: 'optical-metric',
        title: 'Оптическая метрика',
        category: 'theory',
        path: '/docs/theory/optical-metric.md',
        description: 'Оптическая метрика пространства-времени',
        order: 8,
      },
      {
        id: 'rs2-geometry',
        title: 'RS2 геометрия',
        category: 'theory',
        path: '/docs/theory/rs2-geometry.md',
        description: 'Геометрия Рэндалла-Сандрама',
        order: 9,
      },
      {
        id: 'brane-tension',
        title: 'Натяжение браны',
        category: 'theory',
        path: '/docs/theory/brane-tension.md',
        description: 'Натяжение браны в RS2 модели',
        order: 10,
      },
      {
        id: 'informational-collapse',
        title: 'Информационный коллапс',
        category: 'theory',
        path: '/docs/theory/informational-collapse.md',
        description: 'Коллапс информационной структуры',
        order: 11,
      },
    ],
    calculations: [
      {
        id: 'constants-unification',
        title: 'Унификация констант',
        category: 'calculations',
        path: '/docs/calculations/constants-unification-proof.md',
        description: 'Доказательство унификации констант связи',
        order: 1,
      },
      {
        id: 'coupling-constants',
        title: 'Константы связи',
        category: 'calculations',
        path: '/docs/calculations/coupling-constants.md',
        description: 'Расчёт констант связи',
        order: 2,
      },
      {
        id: 'proton-mass',
        title: 'Масса протона',
        category: 'calculations',
        path: '/docs/calculations/proton-mass.md',
        description: 'Расчёт массы протона',
        order: 3,
      },
      {
        id: 'electron-torus',
        title: 'Электрон как тор',
        category: 'calculations',
        path: '/docs/calculations/electron-torus.md',
        description: 'Модель электрона как тора',
        order: 4,
      },
      {
        id: 'brane-tension-calc',
        title: 'Натяжение браны (расчёт)',
        category: 'calculations',
        path: '/docs/calculations/brane-tension.md',
        description: 'Расчёт натяжения браны',
        order: 5,
      },
      {
        id: 'mirror-zones',
        title: 'Зеркальные зоны',
        category: 'calculations',
        path: '/docs/calculations/mirror-zones.md',
        description: 'Расчёт зеркальных зон',
        order: 6,
      },
      {
        id: 'quantum-entanglement-calc',
        title: 'Квантовая запутанность (расчёт)',
        category: 'calculations',
        path: '/docs/calculations/quantum-entanglement.md',
        description: 'Расчёт квантовой запутанности',
        order: 7,
      },
      {
        id: 'defense-calculations',
        title: 'Защитные расчёты',
        category: 'calculations',
        path: '/docs/calculations/defense-calculations.md',
        description: 'Расчёты для защиты теории',
        order: 8,
      },
    ],
    predictions: [
      {
        id: 'cosmological',
        title: 'Космологические предсказания',
        category: 'predictions',
        path: '/docs/predictions/cosmological-predictions.md',
        description: 'Предсказания для космологии',
        order: 1,
      },
      {
        id: 'astrophysical',
        title: 'Астрофизические предсказания',
        category: 'predictions',
        path: '/docs/predictions/astrophysical-predictions.md',
        description: 'Предсказания для астрофизики',
        order: 2,
      },
      {
        id: 'collider',
        title: 'Предсказания для коллайдеров',
        category: 'predictions',
        path: '/docs/predictions/collider-predictions.md',
        description: 'Предсказания для экспериментов на коллайдерах',
        order: 3,
      },
      {
        id: 'gravitational-waves',
        title: 'Гравитационные волны',
        category: 'predictions',
        path: '/docs/predictions/gravitational-waves.md',
        description: 'Предсказания для гравитационных волн',
        order: 4,
      },
      {
        id: 'detailed',
        title: 'Детальные предсказания',
        category: 'predictions',
        path: '/docs/predictions/detailed-predictions.md',
        description: 'Детальные предсказания теории',
        order: 5,
      },
      {
        id: 'falsification',
        title: 'Критерии фальсификации',
        category: 'predictions',
        path: '/docs/predictions/falsification-criteria.md',
        description: 'Критерии для фальсификации теории',
        order: 6,
      },
    ],
    data: [
      {
        id: 'desi-2025',
        title: 'DESI 2025',
        category: 'data',
        path: '/docs/data/desi-2025.md',
        description: 'Данные DESI 2025',
        order: 1,
      },
      {
        id: 'euclid-jwst',
        title: 'Euclid & JWST',
        category: 'data',
        path: '/docs/data/euclid-jwst.md',
        description: 'Данные Euclid и JWST',
        order: 2,
      },
    ],
    defense: [
      {
        id: 'critical-analysis',
        title: 'Ответ на критический анализ',
        category: 'defense',
        path: '/docs/defense/critical-analysis-response.md',
        description: 'Ответ на критический анализ теории',
        order: 1,
      },
      {
        id: 'reverse-logic',
        title: 'Стратегия обратной логики',
        category: 'defense',
        path: '/docs/defense/reverse-logic-strategy.md',
        description: 'Стратегия защиты через обратную логику',
        order: 2,
      },
    ],
    protocol: [
      {
        id: 'handover-v3',
        title: 'Протокол передачи v3',
        category: 'protocol',
        path: '/docs/protocol/handover-protocol-v3.md',
        description: 'Протокол передачи проекта v3',
        order: 1,
      },
      {
        id: 'handover',
        title: 'Протокол передачи',
        category: 'protocol',
        path: '/docs/protocol/handover-protocol.md',
        description: 'Протокол передачи проекта',
        order: 2,
      },
    ],
    analysis: [],
    visualizations: [],
  },
  all: [],
};

// Flatten all documents into a single array
DOCUMENTS.all = Object.values(DOCUMENTS.categories).flat();

/**
 * Get document by ID
 */
export function getDocumentById(id: string): Document | undefined {
  return DOCUMENTS.all.find((doc) => doc.id === id);
}

/**
 * Get documents by category
 */
export function getDocumentsByCategory(category: DocumentCategory): Document[] {
  return DOCUMENTS.categories[category] || [];
}

/**
 * Get document by path
 */
export function getDocumentByPath(path: string): Document | undefined {
  return DOCUMENTS.all.find((doc) => doc.path === path);
}

/**
 * Search documents by query
 */
export function searchDocuments(query: string): Document[] {
  const lowerQuery = query.toLowerCase();
  return DOCUMENTS.all.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description?.toLowerCase().includes(lowerQuery) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
