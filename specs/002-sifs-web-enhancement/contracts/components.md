# Component Contracts: Улучшение веб-версии SIFS Theory

**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts  
**Status**: Complete

## Component Interfaces

### MarkdownRenderer

**File**: `src/app/components/markdown/MarkdownRenderer.tsx`

**Props**:

```typescript
interface MarkdownRendererProps {
  content: string; // Markdown контент
  className?: string; // Дополнительные CSS классы
  onLinkClick?: (href: string) => void; // Обработчик клика по ссылке
}
```

**Behavior**:

- Рендерит markdown контент с поддержкой формул, кода, изображений
- Использует модульную структуру (подмодули для элементов, формул, изображений, ссылок, визуализаций)
- Поддерживает lazy loading изображений
- Автоматически определяет и вставляет интерактивные графики Recharts

**Dependencies**:

- `react-markdown`
- `remark-gfm`
- `rehype-highlight`
- `rehype-katex`
- Подмодули: `MarkdownRenderer.components.tsx`, `MarkdownRenderer.math.tsx`, `MarkdownRenderer.images.tsx`, `MarkdownRenderer.links.tsx`, `MarkdownRenderer.visuals.tsx`

---

### OrbitalDock

**File**: `src/app/components/spatial/OrbitalDock.tsx`

**Props**:

```typescript
interface OrbitalDockProps {
  items: DockItem[]; // Элементы навигации
  activePath?: string; // Активный путь (для подсветки)
  onNavigate?: (path: string) => void; // Обработчик навигации
}
```

**Behavior**:

- Фиксированная позиция снизу по центру экрана
- Скруглённые углы (border-radius: 24px)
- Сверхпрозрачное стекло с backdrop-filter
- Парящие "островки" с анимацией float (связь с --sifs-oscillation-speed для частоты "дыхания")
- Иконки категорий в Bento-стиле
- Hover эффект увеличения иконки (scale 1.2) с использованием Motion
- Активное состояние с подсветкой динамическим цветом (--sifs-delta-color)
- Click раскрывает подменю с Fractal Dropdown анимацией
- Вибрация при низкой Metric Stability (связь с --sifs-metric-stability)

**Dependencies**:

- `Motion` для анимаций
- `FractalDropdownMenu` для подменю
- CSS переменные SSF-2025

---

### FractalDropdownMenu

**File**: `src/app/components/spatial/FractalDropdownMenu.tsx`

**Props**:

```typescript
interface FractalDropdownMenuProps {
  items: MenuItem[]; // Элементы меню
  isOpen: boolean; // Открыто ли меню
  onClose: () => void; // Обработчик закрытия
  onSelect: (item: MenuItem) => void; // Обработчик выбора
}
```

**Behavior**:

- При открытии остальные блоки слегка отдаляются по оси Z (Z-пространство SSF-2025)
- Clip-path анимация раскрытия сверху вниз
- Список документов/подразделов с плавной анимацией появления
- Закрытие при клике вне меню или на другую категорию
- Поддержка touch-жестов на мобильных устройствах

**Dependencies**:

- `Motion` для анимаций
- CSS переменные SSF-2025 для Z-пространства

---

### TemporalAbyss

**File**: `src/app/components/spatial/TemporalAbyss.tsx`

**Props**:

```typescript
interface TemporalAbyssProps {
  particleCount?: number; // Количество частиц (по умолчанию 1000)
  intensity?: number; // Интенсивность (0-1)
  speed?: number; // Скорость частиц (связь с --sifs-oscillation-speed)
}
```

**Behavior**:

- Рендерит частицы времени в фоне (SSF-2025 Level 0)
- Использует WebGPU с Canvas fallback
- Реагирует на изменения --sifs-oscillation-speed (ускорение частиц)
- Обеспечивает 60 FPS

**Dependencies**:

- `webgpu-particles.ts` для рендеринга
- CSS переменные SSF-2025

---

### MuseumHall

**File**: `src/app/components/museum/MuseumHall.tsx`

**Props**:

```typescript
interface MuseumHallProps {
  hall: MuseumHall; // Данные зала
  exhibits: Exhibit[]; // Экспонаты зала
  onExhibitClick?: (exhibit: Exhibit) => void; // Обработчик клика по экспонату
}
```

**Behavior**:

- Отображает зал музея с визуальными эффектами
- Прогрессивное раскрытие информации (storytelling)
- Параллакс эффекты при прокрутке

**Dependencies**:

- `InteractiveExhibit` для экспонатов
- `StorytellingSection` для storytelling
- `Motion` для анимаций

---

### InteractiveExhibit

**File**: `src/app/components/museum/InteractiveExhibit.tsx`

**Props**:

```typescript
interface InteractiveExhibitProps {
  exhibit: Exhibit; // Данные экспоната
  onInteract?: (exhibit: Exhibit) => void; // Обработчик взаимодействия
}
```

**Behavior**:

- Отображает интерактивный экспонат
- Плавные анимации при взаимодействии
- Визуальные эффекты (частицы, свечение)

**Dependencies**:

- `Motion` для анимаций
- Визуальные компоненты (GlowEffect, ParticleCursor)

---

### LanguageSwitcher

**File**: `src/app/components/LanguageSwitcher.tsx`

**Props**:

```typescript
interface LanguageSwitcherProps {
  className?: string; // Дополнительные CSS классы
}
```

**Behavior**:

- Отображает переключатель языка (RU/EN)
- Сохраняет выбранный язык в localStorage
- Обновляет все тексты интерфейса без перезагрузки страницы

**Dependencies**:

- `I18nContext` для управления языком
- `useLanguage()` хук

---

## Hook Contracts

### useSpatialConnector

**File**: `src/app/utils/sifs-spatial-connector.ts`

**Signature**:

```typescript
function useSpatialConnector(params: {
  metricStress?: number;
  waveAmplitude?: number;
  frequency?: number;
  timeDilationDelta?: number;
}): void;
```

**Behavior**:

- Автоматически обновляет CSS переменные SSF-2025 при изменении параметров
- Использует `requestAnimationFrame` для плавных обновлений
- Батчинг обновлений для производительности
- Интегрируется с существующими симуляциями автоматически

**Returns**: `void` (обновляет CSS переменные напрямую)

**Dependencies**:

- CSS переменные SSF-2025 в `src/styles/ssf-2025.css`

---

### useTranslation

**File**: `src/app/contexts/I18nContext.tsx`

**Signature**:

```typescript
function useTranslation(namespace?: "common" | "nav" | "pages"): {
  t: (key: string) => string;
};
```

**Behavior**:

- Возвращает функцию `t` для получения переводов
- Загружает переводы из `src/locales/{language}/{namespace}.json`
- Кэширует переводы для производительности

**Returns**: `{ t: (key: string) => string }`

**Dependencies**:

- `I18nContext` для текущего языка
- JSON файлы локалей

---

### useLanguage

**File**: `src/app/contexts/I18nContext.tsx`

**Signature**:

```typescript
function useLanguage(): {
  language: "ru" | "en";
  setLanguage: (lang: "ru" | "en") => void;
};
```

**Behavior**:

- Возвращает текущий язык и функцию для его изменения
- Сохраняет выбранный язык в localStorage
- Обновляет все компоненты при изменении языка

**Returns**: `{ language: 'ru' | 'en', setLanguage: (lang: 'ru' | 'en') => void }`

**Dependencies**:

- `I18nContext` для управления языком
- `localStorage` для сохранения

---

## Utility Contracts

### sifs-spatial-connector.ts

**File**: `src/app/utils/sifs-spatial-connector.ts`

**Exports**:

```typescript
export function updateSpatialVariables(params: {
  metricStress?: number;
  waveAmplitude?: number;
  frequency?: number;
  timeDilationDelta?: number;
}): void;

export function initializeSpatialFramework(): void;

export function useSpatialConnector(params: {
  metricStress?: number;
  waveAmplitude?: number;
  frequency?: number;
  timeDilationDelta?: number;
}): void;
```

**Behavior**:

- `updateSpatialVariables`: Обновляет CSS переменные SSF-2025 напрямую
- `initializeSpatialFramework`: Инициализирует SSF-2025 при загрузке приложения
- `useSpatialConnector`: React хук для автоматической интеграции в компоненты

**Mapping**:

- `metricStress` → `--sifs-metric-stability` (0-1)
- `waveAmplitude` → `--sifs-oscillation-speed` (Hz)
- `frequency` → `--sifs-oscillation-speed` (Hz)
- `timeDilationDelta` → `--sifs-time-dilation-delta` (0-1)

---

### webgpu-particles.ts

**File**: `src/app/utils/webgpu-particles.ts`

**Exports**:

```typescript
export function createParticleSystem(options: {
  canvas: HTMLCanvasElement;
  particleCount?: number;
  intensity?: number;
  speed?: number;
}): ParticleSystem;

export interface ParticleSystem {
  update: (params: { speed?: number; intensity?: number }) => void;
  destroy: () => void;
}
```

**Behavior**:

- Создаёт систему частиц с использованием WebGPU
- Автоматически использует Canvas fallback если WebGPU недоступен
- Обеспечивает 60 FPS для тысяч частиц
- Реагирует на изменения скорости и интенсивности

**Dependencies**:

- WebGPU API (с Canvas fallback)

---

## Page Contracts

### HomePage

**File**: `src/app/pages/HomePage.tsx`

**Props**: Нет (страница)

**Behavior**:

- Отображает Hero секцию с анимированным фоном
- Stats секция со статистикой теории
- Features секция с ключевыми достижениями
- Visual Examples с интерактивными визуализациями

**Dependencies**:

- `ParallaxHero` для Hero секции
- `MuseumHall` для секций
- Визуальные компоненты

---

### DocPage

**File**: `src/app/pages/DocPage.tsx`

**Props**: Нет (использует React Router params)

**Route Params**:

- `category: string` - категория документа
- `*: string` - путь к документу

**Behavior**:

- Загружает markdown файл из `docs/{category}/*`
- Рендерит через `MarkdownRenderer`
- Отображает метаданные документа
- Показывает связанные документы
- Оглавление для длинных документов

**Dependencies**:

- `MarkdownRenderer` для рендеринга
- `docs-structure.ts` для метаданных

---

### CollapseSimulationPage

**File**: `src/app/pages/simulations/CollapseSimulationPage.tsx`

**Props**: Нет (страница)

**Behavior**:

- Отображает `InformationalCollapseSimulation`
- Интегрирует с JavaScript коннектором
- Показывает параметры и результаты
- Сохраняет результаты в localStorage

**Dependencies**:

- `InformationalCollapseSimulation`
- `useSpatialConnector` для интеграции

---

### Breadcrumbs

**File**: `src/app/components/enhanced/Breadcrumbs.tsx`

**Props**:

```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // Элементы навигации
  className?: string; // Дополнительные CSS классы
}
```

**Behavior**:

- Отображает навигационную цепочку внутри контента (не в основной навигации)
- Показывает путь от главной страницы до текущего документа
- Плавные переходы между элементами

**Dependencies**:

- React Router для определения текущего пути

---

### ScrollReveal

**File**: `src/app/components/enhanced/ScrollReveal.tsx`

**Props**:

```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // Задержка анимации (мс)
  direction?: "up" | "down" | "left" | "right";
}
```

**Behavior**:

- Плавное появление контента при прокрутке страницы
- Intersection Observer API для определения видимости
- Настраиваемое направление и задержка анимации

**Dependencies**:

- `Motion` для анимаций
- Intersection Observer API

---

### InteractiveGraph

**File**: `src/app/components/enhanced/InteractiveGraph.tsx`

**Props**:

```typescript
interface InteractiveGraphProps {
  data: GraphData[]; // Данные для графика
  type: "line" | "bar" | "scatter" | "area";
  onExport?: (format: "png" | "svg" | "pdf") => void; // Экспорт графика
}
```

**Behavior**:

- Интерактивные графики с использованием Recharts
- Экспорт в PNG, SVG, PDF (FR-048)
- Tooltip с подробной информацией
- Zoom и pan для детального изучения

**Dependencies**:

- `Recharts` для графиков
- `jspdf` для экспорта в PDF

---

### FormulaBlock

**File**: `src/app/components/enhanced/FormulaBlock.tsx`

**Props**:

```typescript
interface FormulaBlockProps {
  formula: string; // LaTeX формула
  description?: string; // Описание формулы
  onCopy?: () => void; // Обработчик копирования
}
```

**Behavior**:

- Оформление математических формул с neomorphism фоном
- Возможность копирования формулы (FR-023)
- Поддержка LaTeX через KaTeX

**Dependencies**:

- `katex` для рендеринга формул
- Neomorphism стили из theme.css

---

### SpatialSlab

**File**: `src/app/components/spatial/SpatialSlab.tsx`

**Props**:

```typescript
interface SpatialSlabProps {
  children: React.ReactNode;
  preset?: "monolith" | "orbital" | "data-capsule";
  className?: string;
}
```

**Behavior**:

- Базовый компонент для применения Spatial Presets
- Monolith: центральный блок с перспективой
- Orbital: островки с левитацией
- Data Capsule: градиентная обводка 0.5px

**Dependencies**:

- CSS классы из ssf-2025.css

---

### DeltaPulse

**File**: `src/app/components/spatial/DeltaPulse.tsx`

**Props**:

```typescript
interface DeltaPulseProps {
  value: number; // Значение для отображения
  color?: string; // Цвет пульсации
}
```

**Behavior**:

- Индикатор с пульсацией (SSF-2025 Level 3: Pulse)
- Связь с --sifs-delta-color для динамического цвета
- Плавная анимация пульсации

**Dependencies**:

- CSS переменные SSF-2025
- `Motion` для анимаций

---

### FrequencyKnob

**File**: `src/app/components/spatial/FrequencyKnob.tsx`

**Props**:

```typescript
interface FrequencyKnobProps {
  value: number; // Текущее значение частоты
  onChange: (value: number) => void; // Обработчик изменения
  min?: number; // Минимальное значение
  max?: number; // Максимальное значение
}
```

**Behavior**:

- Интерактивный регулятор частоты
- Связь с --sifs-oscillation-speed
- Визуальная обратная связь при изменении

**Dependencies**:

- `useSpatialConnector` для интеграции

---

### ChronoOdometer

**File**: `src/app/components/spatial/ChronoOdometer.tsx`

**Props**:

```typescript
interface ChronoOdometerProps {
  time: number; // Время для отображения
  format?: "seconds" | "minutes" | "hours";
}
```

**Behavior**:

- Отображение времени с анимацией одометра
- Связь с временной дилатацией через --sifs-time-dilation-delta
- Плавная анимация изменения значений

**Dependencies**:

- CSS переменные SSF-2025
- `Motion` для анимаций

---

### TemporalWave

**File**: `src/app/components/spatial/TemporalWave.tsx`

**Props**:

```typescript
interface TemporalWaveProps {
  frequency: number; // Частота волны
  amplitude?: number; // Амплитуда волны
}
```

**Behavior**:

- Визуализация временной волны
- Связь с --sifs-oscillation-speed
- Плавная анимация волны

**Dependencies**:

- CSS переменные SSF-2025
- Canvas или SVG для рендеринга

---

### SyncOrb

**File**: `src/app/components/spatial/SyncOrb.tsx`

**Props**:

```typescript
interface SyncOrbProps {
  synced: boolean; // Синхронизировано ли состояние
  color?: string; // Цвет орба
}
```

**Behavior**:

- Индикатор синхронизации
- Плавная анимация при изменении состояния
- Связь с параметрами теории через CSS переменные

**Dependencies**:

- CSS переменные SSF-2025
- `Motion` для анимаций

---

### BentoCell

**File**: `src/app/components/spatial/BentoCell.tsx`

**Props**:

```typescript
interface BentoCellProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}
```

**Behavior**:

- Ячейка в Bento-стиле для навигации
- Парящий эффект с левитацией
- Hover эффекты с увеличением

**Dependencies**:

- CSS классы из ssf-2025.css
- `Motion` для анимаций

---

### SpatialScrollbar

**File**: `src/app/components/spatial/SpatialScrollbar.tsx`

**Props**:

```typescript
interface SpatialScrollbarProps {
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}
```

**Behavior**:

- Кастомный скроллбар с SSF-2025 стилями
- Плавная анимация при прокрутке
- Индикатор прогресса

**Dependencies**:

- CSS стили из ssf-2025.css

---

### MuseumMap

**File**: `src/app/components/museum/MuseumMap.tsx`

**Props**:

```typescript
interface MuseumMapProps {
  halls: MuseumHall[]; // Залы музея
  onHallClick?: (hall: MuseumHall) => void;
}
```

**Behavior**:

- Интерактивная карта всех залов музея
- Визуализация структуры музея
- Навигация между залами

**Dependencies**:

- `MuseumHall` для данных залов

---

### VirtualGuide

**File**: `src/app/components/museum/VirtualGuide.tsx`

**Props**:

```typescript
interface VirtualGuideProps {
  route: RouteItem[]; // Маршрут для гида
  onComplete?: () => void; // Обработчик завершения маршрута
}
```

**Behavior**:

- Виртуальный гид по музею
- Пошаговые инструкции
- Рекомендуемые маршруты (для новичков, экспертов, любопытных)

**Dependencies**:

- `RouteSelector` для выбора маршрута

---

### TimelineExhibit

**File**: `src/app/components/museum/TimelineExhibit.tsx`

**Props**:

```typescript
interface TimelineExhibitProps {
  events: TimelineEvent[]; // События временной линии
  orientation?: "horizontal" | "vertical";
}
```

**Behavior**:

- Временная линия экспонатов
- Интерактивные события с деталями
- Плавная анимация при прокрутке

**Dependencies**:

- `Motion` для анимаций

---

### BeforeAfterComparison

**File**: `src/app/components/museum/BeforeAfterComparison.tsx`

**Props**:

```typescript
interface BeforeAfterComparisonProps {
  before: ComparisonData; // Данные "до"
  after: ComparisonData; // Данные "после"
  visualization?: React.ReactNode; // Визуализация сравнения
}
```

**Behavior**:

- Сравнение "до" и "после" применения теории (FR-036)
- Интерактивные визуализации
- Плавные переходы между состояниями

**Dependencies**:

- Визуальные компоненты для сравнения

---

### ParticleCursor

**File**: `src/app/components/museum/ParticleCursor.tsx`

**Props**:

```typescript
interface ParticleCursorProps {
  enabled?: boolean; // Включен ли эффект
  intensity?: number; // Интенсивность частиц
}
```

**Behavior**:

- Эффект частиц, следующих за курсором
- Связь с параметрами теории через CSS переменные
- Оптимизированная производительность

**Dependencies**:

- Canvas для рендеринга частиц

---

### ExhibitCard

**File**: `src/app/components/museum/ExhibitCard.tsx`

**Props**:

```typescript
interface ExhibitCardProps {
  exhibit: Exhibit; // Данные экспоната
  onInteract?: (exhibit: Exhibit) => void;
}
```

**Behavior**:

- Карточка экспоната с визуальными эффектами
- Hover эффекты с увеличением
- Плавные переходы

**Dependencies**:

- `Exhibit` для данных

---

### HallCard

**File**: `src/app/components/museum/HallCard.tsx`

**Props**:

```typescript
interface HallCardProps {
  hall: MuseumHall; // Данные зала
  onEnter?: (hall: MuseumHall) => void;
}
```

**Behavior**:

- Карточка зала музея
- Визуализация зала с иконкой и цветом
- Интерактивные эффекты

**Dependencies**:

- `MuseumHall` для данных

---

### RouteSelector

**File**: `src/app/components/museum/RouteSelector.tsx`

**Props**:

```typescript
interface RouteSelectorProps {
  routes: Route[]; // Доступные маршруты
  onSelect?: (route: Route) => void; // Обработчик выбора
}
```

**Behavior**:

- Выбор рекомендуемого маршрута (для новичков, экспертов, любопытных)
- Визуализация маршрута
- Навигация по выбранному маршруту

**Dependencies**:

- `Route` для данных маршрутов

---

### FractalBackground

**File**: `src/app/components/visual/FractalBackground.tsx`

**Props**:

```typescript
interface FractalBackgroundProps {
  intensity?: number; // Интенсивность фрактала
  color?: string; // Цвет фрактала
}
```

**Behavior**:

- Фрактальный фон с анимацией
- Связь с параметрами теории
- Оптимизированная производительность

**Dependencies**:

- Canvas или WebGL для рендеринга

---

### CosmicGradient

**File**: `src/app/components/visual/CosmicGradient.tsx`

**Props**:

```typescript
interface CosmicGradientProps {
  colors?: string[]; // Цвета градиента
  direction?: "horizontal" | "vertical" | "radial";
}
```

**Behavior**:

- Космический градиент для фона
- Плавная анимация цветов
- Связь с SSF-2025 цветовой палитрой

**Dependencies**:

- CSS градиенты

---

### MovingGrid

**File**: `src/app/components/visual/MovingGrid.tsx`

**Props**:

```typescript
interface MovingGridProps {
  speed?: number; // Скорость движения сетки
  opacity?: number; // Прозрачность сетки
}
```

**Behavior**:

- Движущаяся сетка для фона (Aceternity UI элемент)
- Плавная анимация движения
- Связь с --sifs-oscillation-speed

**Dependencies**:

- CSS анимации или Canvas

---

### TimeWaveVisualization

**File**: `src/app/components/visual/TimeWaveVisualization.tsx`

**Props**:

```typescript
interface TimeWaveVisualizationProps {
  data: TimeWaveData[]; // Данные волны времени
  frequency?: number; // Частота волны
}
```

**Behavior**:

- Визуализация волн времени
- Интерактивное отображение
- Связь с параметрами теории

**Dependencies**:

- Canvas или SVG для рендеринга

---

## Validation Contracts

Все компоненты должны:

1. Использовать TypeScript со строгой типизацией (без `any`)
2. Следовать правилу модульности (< 300 строк на файл)
3. Использовать Tailwind CSS utility классы (без inline стилей)
4. Быть адаптивными (mobile-first)
5. Обрабатывать ошибки через ErrorBoundary
6. Использовать UTF-8 кодировку
7. Интегрироваться с SSF-2025 через CSS переменные (где применимо)
8. Поддерживать экспорт данных (где применимо, FR-048)
