# Data Model: Улучшение веб-версии SIFS Theory

**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts  
**Status**: Complete

## Entities

### Document (Документ)

Представляет markdown файл из директории `docs/` с метаданными.

**Fields**:
- `id: string` - уникальный идентификатор документа (путь относительно `docs/`)
- `title: string` - название документа
- `description: string` - описание документа
- `category: DocumentCategory` - категория документа (theory, calculations, predictions, data, defense, protocol)
- `path: string` - путь к файлу относительно `docs/`
- `date: string` - дата создания/обновления (ISO 8601)
- `tags: string[]` - теги для поиска и фильтрации
- `relatedDocuments: string[]` - связанные документы (ID)
- `hall?: MuseumHall` - зал музея для концепции "технического документального музея"

**Relationships**:
- Связан с другими документами через `relatedDocuments`
- Принадлежит категории через `category`
- Может принадлежать залу музея через `hall`

**Validation Rules**:
- `id` должен быть уникальным
- `path` должен существовать в файловой системе
- `category` должен быть валидным значением из `DocumentCategory`
- `date` должен быть валидной ISO 8601 датой

**State Transitions**: Нет (статический контент)

---

### Simulation (Симуляция)

Интерактивный инструмент для экспериментирования с теорией SIFS.

**Fields**:
- `id: string` - уникальный идентификатор симуляции
- `name: string` - название симуляции
- `description: string` - описание симуляции
- `category: SimulationCategory` - категория (collapse, temporal, calculations, visualizations)
- `component: React.ComponentType` - React компонент симуляции
- `parameters: SimulationParameter[]` - параметры симуляции
- `defaultParameters: Record<string, number>` - значения по умолчанию
- `presets: SimulationPreset[]` - предустановленные сценарии

**Relationships**:
- Связана с теоретическими предсказаниями для сравнения
- Может использовать JavaScript коннектор для связи с CSS переменными

**Validation Rules**:
- `id` должен быть уникальным
- `parameters` должны иметь валидные типы и диапазоны
- `defaultParameters` должны соответствовать `parameters`

**State Transitions**:
- `idle` → `running` - запуск симуляции
- `running` → `paused` - пауза симуляции
- `running` → `idle` - остановка симуляции
- `running` → `saving` - сохранение результатов

---

### SimulationParameter (Параметр симуляции)

Параметр симуляции с валидацией и связью с теорией SIFS.

**Fields**:
- `id: string` - идентификатор параметра
- `name: string` - название параметра
- `type: 'number' | 'boolean' | 'string'` - тип параметра
- `min?: number` - минимальное значение (для number)
- `max?: number` - максимальное значение (для number)
- `step?: number` - шаг изменения (для number)
- `default: number | boolean | string` - значение по умолчанию
- `spatialVariable?: string` - CSS переменная для связи с SSF-2025 (например, `--sifs-metric-stability`)
- `description: string` - описание параметра

**Relationships**:
- Принадлежит симуляции через `Simulation.parameters`
- Может быть связан с CSS переменной через `spatialVariable`

**Validation Rules**:
- Для `type: 'number'`: `min` и `max` должны быть определены, `default` должен быть в диапазоне
- `spatialVariable` должен быть валидной CSS переменной (начинается с `--`)

---

### SimulationPreset (Предустановленный сценарий)

Предустановленный набор параметров для быстрого старта.

**Fields**:
- `id: string` - идентификатор пресета
- `name: string` - название пресета (например, "Планета", "Звезда", "Чёрная дыра")
- `parameters: Record<string, number | boolean | string>` - значения параметров
- `description: string` - описание сценария

**Relationships**:
- Принадлежит симуляции через `Simulation.presets`

**Validation Rules**:
- `parameters` должны соответствовать `Simulation.parameters`
- Все обязательные параметры должны быть указаны

---

### SimulationResult (Результат симуляции)

Результаты выполнения симуляции для сохранения и сравнения.

**Fields**:
- `id: string` - уникальный идентификатор результата
- `simulationId: string` - ID симуляции
- `parameters: Record<string, number | boolean | string>` - использованные параметры
- `results: Record<string, any>` - результаты расчётов
- `timestamp: number` - время выполнения (Unix timestamp)
- `comparison?: ComparisonResult` - сравнение с теоретическими предсказаниями

**Relationships**:
- Принадлежит симуляции через `simulationId`
- Может иметь сравнение с теоретическими предсказаниями

**Validation Rules**:
- `simulationId` должен существовать
- `parameters` должны соответствовать `Simulation.parameters`
- `timestamp` должен быть валидным Unix timestamp

---

### ComparisonResult (Результат сравнения)

Сравнение результатов симуляции с теоретическими предсказаниями и экспериментальными данными.

**Fields**:
- `theoretical: Record<string, number>` - теоретические значения SIFS
- `experimental: Record<string, { value: number; source: string; uncertainty?: number }>` - экспериментальные данные (CODATA, DESI, EHT, LIGO)
- `accuracy: Record<string, number>` - точность совпадения (в процентах)
- `notes: string[]` - примечания к сравнению

**Relationships**:
- Принадлежит результату симуляции через `SimulationResult.comparison`

**Validation Rules**:
- Все значения должны быть числами
- `accuracy` должен быть в диапазоне 0-100 (или больше для сверхточных совпадений)

---

### MuseumHall (Зал музея)

Зал в концепции "технического документального музея".

**Fields**:
- `id: string` - идентификатор зала
- `name: string` - название зала
- `description: string` - описание зала
- `icon: string` - иконка зала (Lucide React icon name)
- `color: string` - цветовая схема зала (CSS цвет)
- `documents: string[]` - документы в зале (Document ID)
- `exhibits: Exhibit[]` - интерактивные экспонаты

**Relationships**:
- Содержит документы через `documents`
- Содержит экспонаты через `exhibits`

**Validation Rules**:
- `id` должен быть уникальным
- `icon` должен быть валидным именем иконки Lucide React
- `color` должен быть валидным CSS цветом

---

### Exhibit (Экспонат)

Интерактивный экспонат в зале музея.

**Fields**:
- `id: string` - идентификатор экспоната
- `title: string` - название экспоната
- `description: string` - описание экспоната
- `type: 'document' | 'simulation' | 'visualization' | 'example'` - тип экспоната
- `contentId: string` - ID связанного контента (документ, симуляция, визуализация)
- `visualEffects: VisualEffect[]` - визуальные эффекты экспоната
- `interactions: Interaction[]` - интерактивные элементы

**Relationships**:
- Принадлежит залу через `MuseumHall.exhibits`
- Связан с контентом через `contentId`

**Validation Rules**:
- `id` должен быть уникальным
- `contentId` должен существовать в соответствующей категории
- `type` должен соответствовать типу контента

---

### Route (Маршрут навигации)

Маршрут в React Router для навигации по приложению.

**Fields**:
- `path: string` - путь маршрута (React Router path)
- `component: React.ComponentType` - React компонент страницы
- `title: string` - заголовок страницы (для i18n)
- `description: string` - описание страницы (для SEO)
- `hidden?: boolean` - скрыт ли маршрут из навигации (например, `/presentation`)
- `requiresAuth?: boolean` - требует ли маршрут аутентификации (пока не используется)

**Relationships**:
- Связан с компонентом страницы через `component`

**Validation Rules**:
- `path` должен быть валидным React Router path
- `component` должен быть валидным React компонентом

---

### SpatialVariable (CSS переменная SSF-2025)

CSS переменная для связи параметров теории SIFS с визуальными эффектами.

**Fields**:
- `name: string` - имя CSS переменной (например, `--sifs-metric-stability`)
- `value: number` - текущее значение
- `min: number` - минимальное значение
- `max: number` - максимальное значение
- `unit?: string` - единица измерения (опционально)
- `description: string` - описание переменной

**Relationships**:
- Связана с параметрами симуляций через `SimulationParameter.spatialVariable`

**Validation Rules**:
- `name` должен начинаться с `--` (CSS custom property)
- `value` должен быть в диапазоне `min` - `max`

**State Transitions**:
- Значение обновляется через JavaScript коннектор при изменении параметров симуляций

---

### Localization (Локализация)

Переводы интерфейса для поддержки i18n.

**Fields**:
- `language: 'ru' | 'en'` - язык локализации
- `namespace: 'common' | 'nav' | 'pages'` - пространство имён переводов
- `translations: Record<string, string>` - ключ-значение переводов

**Relationships**:
- Принадлежит языку через `language`
- Группируется по пространству имён через `namespace`

**Validation Rules**:
- `language` должен быть валидным кодом языка
- `namespace` должен быть валидным пространством имён
- Все ключи должны быть строками
- Все значения должны быть строками

---

### CalculationDirection (Направление расчёта)

Одно из направлений теории SIFS для интерактивных расчётов.

**Fields**:
- `id: string` - идентификатор направления
- `name: string` - название направления
- `description: string` - описание направления
- `formulas: Formula[]` - математические формулы
- `parameters: CalculationParameter[]` - параметры для расчёта
- `experimentalData: ExperimentalData[]` - экспериментальные данные для сравнения (CODATA, DESI, EHT, LIGO)
- `stepByStep: boolean` - показывать ли пошаговый вывод

**Relationships**:
- Принадлежит интерактивным расчётам через `InteractiveCalculationsPage`
- Связан с экспериментальными данными через `experimentalData`

**Validation Rules**:
- `id` должен быть уникальным
- Все формулы должны быть валидными LaTeX выражениями
- Параметры должны иметь валидные типы и диапазоны

**Направления** (FR-031):
1. **Константы связи** (G, α, α_s, G_F) - унификация констант связи через масштабную координату |S|
2. **Тёмная энергия w(z)** - эволюция тёмной энергии с красным смещением
3. **Масса частиц** - расчёт масс частиц через RS-warping
4. **Фрактальная структура** - лог-периодическая структура пространства-времени
5. **Натяжение браны** - расчёт натяжения 3-браны в 5D пространстве
6. **Квантовая запутанность** - корреляции через фрактальную структуру
7. **Оптическая метрика** - метрика Гордона для описания оптических эффектов
8. **RS2 геометрия** - геометрия Рэндалла-Сандрама второго типа
9. **Зеркальные зоны** - зоны с обратным временем
10. **Электрон как тор** - модель электрона как тора в фрактальном пространстве

---

## Enums

### DocumentCategory

```typescript
type DocumentCategory = 
  | 'theory'        // Теория
  | 'calculations'  // Расчёты
  | 'predictions'   // Предсказания
  | 'data'          // Данные
  | 'defense'       // Защита теории
  | 'protocol';     // Протоколы
```

### SimulationCategory

```typescript
type SimulationCategory =
  | 'collapse'      // Гравитационный коллапс
  | 'temporal'      // Темпоральная калибровка
  | 'calculations'  // Интерактивные расчёты
  | 'visualizations'; // Визуализации
```

### MuseumHallType

```typescript
type MuseumHallType =
  | 'energy'        // Будущее энергетики
  | 'time-travel'   // Путешествия во времени
  | 'quantum'       // Квантовые вычисления
  | 'space'         // Космические путешествия
  | 'medicine'      // Медицина будущего
  | 'communication'; // Связь и коммуникации
```

---

## Data Structures

### docs-structure.ts

Структура документов с метаданными для построения индекса.

```typescript
interface DocsStructure {
  categories: Record<DocumentCategory, Document[]>;
  allDocuments: Document[];
  byId: Record<string, Document>;
  byCategory: Record<DocumentCategory, Document[]>;
}
```

### SpatialVariables

Объект всех CSS переменных SSF-2025 для управления через коннектор.

```typescript
interface SpatialVariables {
  '--sifs-metric-stability': number;      // Метрическая стабильность (0-1)
  '--sifs-delta-color': string;           // Динамический цвет (oklch)
  '--sifs-sigma-blur': number;             // Размытие подложки (px)
  '--sifs-oscillation-speed': number;     // Частота колебаний (Hz)
  '--sifs-time-dilation-delta': number;   // Дельта временной дилатации (0-1)
}
```

---

## Validation Rules Summary

1. **Document**: ID уникален, path существует, category валиден, date валидна ISO 8601
2. **Simulation**: ID уникален, parameters валидны, defaultParameters соответствуют parameters
3. **SimulationParameter**: Для number: min/max определены, default в диапазоне; spatialVariable валидна CSS переменная
4. **SimulationPreset**: parameters соответствуют Simulation.parameters, все обязательные параметры указаны
5. **SimulationResult**: simulationId существует, parameters соответствуют Simulation.parameters, timestamp валиден
6. **ComparisonResult**: Все значения числа, accuracy в диапазоне 0-100+
7. **MuseumHall**: ID уникален, icon валиден, color валиден CSS цвет
8. **Exhibit**: ID уникален, contentId существует, type соответствует контенту
9. **Route**: path валиден React Router path, component валиден React компонент
10. **SpatialVariable**: name начинается с `--`, value в диапазоне min-max
11. **Localization**: language валиден, namespace валиден, все ключи и значения строки

---

## State Management

### Client-Side State

- **Router State**: React Router DOM управляет навигацией и URL
- **UI State**: React useState/useReducer для локального состояния компонентов
- **Spatial Variables**: JavaScript коннектор обновляет CSS переменные через `requestAnimationFrame`
- **i18n State**: React Context (`I18nContext`) для выбранного языка, сохранение в `localStorage`
- **Simulation State**: Локальное состояние в компонентах симуляций, сохранение результатов в `localStorage`

### Persistence

- **Language Preference**: `localStorage.getItem('sifs-language')` → `'ru' | 'en'`
- **Simulation Results**: `localStorage.getItem('sifs-simulation-results')` → `SimulationResult[]`
- **Simulation Parameters**: `localStorage.getItem('sifs-simulation-params')` → `Record<string, Record<string, any>>`

---

## Data Flow

1. **Document Loading**: 
   - Пользователь переходит на `/docs/:category/*`
   - `DocPage` загружает markdown файл из `docs/`
   - `MarkdownRenderer` рендерит контент с поддержкой формул, кода, изображений

2. **Simulation Execution**:
   - Пользователь настраивает параметры в симуляции
   - Симуляция вычисляет результаты
   - JavaScript коннектор обновляет CSS переменные SSF-2025
   - Результаты сохраняются в `localStorage` (опционально)

3. **Spatial Variables Update**:
   - Симуляция изменяет параметры (metricStress, frequency, timeDilationDelta)
   - Коннектор получает изменения через `useSpatialConnector()`
   - CSS переменные обновляются через `requestAnimationFrame` с батчингом
   - UI реагирует на изменения переменных (вибрация, свечение, анимации)

4. **Navigation**:
   - Пользователь использует Orbital Dock для навигации
   - React Router обновляет URL и рендерит соответствующий компонент
   - Layout обновляется без перезагрузки страницы (SPA)
