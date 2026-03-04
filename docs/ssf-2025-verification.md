# SSF-2025 Spatial Framework: Верификация реакции уровней реальности

**T105 [US10]**: Verify all 4 levels of reality react to theory parameters in real-time (< 100ms delay)

## Обзор уровней реальности

SSF-2025 Spatial Framework реализует 4 уровня реальности, которые реагируют на параметры теории SIFS:

### Level 0: The Temporal Abyss (Фон)
- **Компонент**: `TemporalAbyss.tsx`
- **Реакция на параметры**:
  - `--sifs-oscillation-speed` → ускорение частиц времени (обратно пропорционально)
  - Частицы ускоряются при уменьшении скорости осцилляции
  - WebGPU/Canvas fallback для рендеринга
  - 60 FPS производительность

### Level 1: The Substrate (Подложка страницы)
- **Компонент**: `SpatialSlab` с preset="monolith"
- **Реакция на параметры**:
  - `--sifs-metric-stability` → размытие подложки (`--sifs-sigma-blur = 20px * (1 - stability)`)
  - `--sifs-time-dilation-delta` → Z-позиция (`transform: translateZ(calc(var(--sifs-time-dilation-delta) * 10px))`)
  - `--sifs-delta-color` → динамический цвет границ

### Level 2: The Control Plane (Навигация)
- **Компонент**: `OrbitalDock.tsx`
- **Реакция на параметры**:
  - `--sifs-metric-stability` → вибрация при низкой стабильности (< 0.5)
  - `--sifs-oscillation-speed` → частота float анимации "островков"
  - `--sifs-delta-color` → подсветка активных элементов
  - `--sifs-time-dilation-delta` → Z-позиция (`translateZ(calc(var(--sifs-time-dilation-delta) * 20px))`)

### Level 3: The Pulse (Индикаторы)
- **Компоненты**: `DeltaPulse`, `FrequencyKnob`, `ChronoOdometer`, `TemporalWave`, `SyncOrb`
- **Реакция на параметры**:
  - `--sifs-delta-color` → цвет пульсации
  - `--sifs-oscillation-speed` → частота пульсации
  - `--sifs-metric-stability` → статус синхронизации (synced/syncing/error)

## Инструкции по проверке

### Шаг 1: Запуск симуляции

1. Откройте любую симуляцию (например, `/simulations/collapse` или `/simulations/temporal`)
2. Симуляции автоматически интегрируются с `useSpatialConnector()` для обновления CSS переменных

### Шаг 2: Изменение параметров

#### Для CollapseSimulation:
- Измените `massExponent` или `scaleS`
- Наблюдайте изменения в:
  - **Level 0**: Ускорение частиц времени (реакция на `waveAmplitude` → `--sifs-oscillation-speed`)
  - **Level 1**: Размытие подложки (реакция на `metricStress` → `--sifs-metric-stability`)
  - **Level 2**: Вибрация Orbital Dock при низкой стабильности
  - **Level 3**: Изменение цвета и частоты пульсации индикаторов

#### Для TemporalSyncPage:
- Измените `frequency` или `timeDilationDelta`
- Наблюдайте изменения в:
  - **Level 0**: Ускорение частиц (реакция на `frequency` → `--sifs-oscillation-speed`)
  - **Level 1**: Z-позиция подложки (реакция на `timeDilationDelta`)
  - **Level 2**: Частота float анимации "островков"
  - **Level 3**: Изменение цвета индикаторов (синий → красный при изменении дельты)

#### Для InteractiveCalculationsPage:
- Измените параметры расчётов
- Все уровни реагируют через `useSpatialConnector()`

### Шаг 3: Проверка задержки (< 100ms)

1. Откройте DevTools (F12)
2. Перейдите на вкладку Performance
3. Запустите запись
4. Измените параметры симуляции
5. Остановите запись
6. Проверьте время между изменением параметра и обновлением CSS переменных

**Ожидаемый результат**: Обновление CSS переменных происходит в течение одного кадра requestAnimationFrame (< 16ms), общая задержка визуальной реакции < 100ms.

### Шаг 4: Проверка каждого уровня

#### Level 0 (Temporal Abyss):
```javascript
// В консоли браузера:
const root = getComputedStyle(document.documentElement);
console.log('Oscillation Speed:', root.getPropertyValue('--sifs-oscillation-speed'));
// Измените параметры симуляции и проверьте обновление
```

#### Level 1 (Substrate):
```javascript
// Проверьте размытие и Z-позицию
const substrate = document.querySelector('.spatial-page-block');
console.log('Blur:', root.getPropertyValue('--sifs-sigma-blur'));
console.log('Time Dilation Delta:', root.getPropertyValue('--sifs-time-dilation-delta'));
```

#### Level 2 (Control Plane):
```javascript
// Проверьте вибрацию и float анимацию
const dock = document.querySelector('.dock-spatial-module');
console.log('Stability:', root.getPropertyValue('--sifs-metric-stability'));
console.log('Dock stability attribute:', dock?.getAttribute('data-stability'));
```

#### Level 3 (Pulse):
```javascript
// Проверьте цвет и частоту пульсации
console.log('Delta Color:', root.getPropertyValue('--sifs-delta-color'));
```

## Автоматическая проверка

Все симуляции автоматически используют `useSpatialConnector()` для связи параметров с CSS переменными:

- `InformationalCollapseSimulation`: `metricStress` → `--sifs-metric-stability`, `waveAmplitude` → `--sifs-oscillation-speed`
- `AtomicClockSync`: `frequency` → `--sifs-oscillation-speed`, `timeDilationDelta` → `--sifs-time-dilation-delta`
- `InteractiveCalculations`: все параметры расчётов → соответствующие CSS переменные

## Критерии успеха

✅ **Level 0**: Частицы времени ускоряются при изменении `--sifs-oscillation-speed`  
✅ **Level 1**: Подложка размывается и меняет Z-позицию при изменении параметров  
✅ **Level 2**: Orbital Dock вибрирует при низкой стабильности, float анимация синхронизирована  
✅ **Level 3**: Индикаторы меняют цвет и частоту пульсации в реальном времени  
✅ **Задержка**: Все изменения происходят < 100ms после изменения параметров

## Примечания

- Все обновления батчатся через `requestAnimationFrame` для оптимизации производительности
- CSS переменные обновляются синхронно, визуальные эффекты применяются через CSS transitions
- MutationObserver используется для быстрой реакции на изменения (< 100ms)
- Все компоненты используют `requestAnimationFrame` для плавных обновлений (60 FPS)
