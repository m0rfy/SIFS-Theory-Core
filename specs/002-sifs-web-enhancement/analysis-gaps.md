# Анализ упущений: Улучшение веб-версии SIFS Theory

**Date**: 2025-01-27  
**Status**: Complete

## Выявленные упущения

### 1. Spatial компоненты (FR-027)

**Требуется**: SpatialSlab, OrbitalDock, DeltaPulse, FrequencyKnob, ChronoOdometer, TemporalWave, SyncOrb, BentoCell, SpatialScrollbar, FractalDropdownMenu

**В плане упомянуты**: OrbitalDock, FractalDropdownMenu, TemporalAbyss

**Упущены**: SpatialSlab, DeltaPulse, FrequencyKnob, ChronoOdometer, TemporalWave, SyncOrb, BentoCell, SpatialScrollbar

**Действие**: Добавить в Project Structure и contracts

---

### 2. Музейные компоненты (FR-037)

**Требуется**: MuseumHall, InteractiveExhibit, StorytellingSection, WorldChangeExample, MuseumMap, VirtualGuide, TimelineExhibit, BeforeAfterComparison, ParallaxHero, ParticleCursor, ExhibitCard, HallCard, RouteSelector

**В плане упомянуты**: MuseumHall, InteractiveExhibit, StorytellingSection

**Упущены**: MuseumMap, VirtualGuide, TimelineExhibit, BeforeAfterComparison, ParticleCursor, ExhibitCard, HallCard, RouteSelector

**Действие**: Добавить в Project Structure и contracts

---

### 3. Визуальные компоненты (FR-039)

**Требуется**: FractalBackground, CosmicGradient, NeoCard, GlowEffect, MovingGrid, TimeWaveVisualization

**В плане упомянуты**: NeoCard, GlowEffect (частично)

**Упущены**: FractalBackground, CosmicGradient, MovingGrid, TimeWaveVisualization

**Действие**: Добавить в Project Structure и contracts

---

### 4. Spatial Presets (FR-030)

**Требуется**: Monolith, Orbital Dock, Data Capsule

**В плане**: Упомянуты, но без деталей

**Упущено**: Детальное описание каждого пресета

**Действие**: Добавить детали в research.md и contracts

---

### 5. Breadcrumbs компонент (FR-051)

**Требуется**: Компонент Breadcrumbs для навигации внутри контента

**В плане**: Не упомянут

**Действие**: Добавить в Project Structure и contracts

---

### 6. Дополнительные компоненты (FR-052)

**Требуется**: ScrollReveal, InteractiveGraph, FormulaBlock

**В плане**: Не упомянуты

**Действие**: Добавить в Project Structure и contracts

---

### 7. Экспорт графиков (FR-048)

**Требуется**: Экспорт графиков и диаграмм в PNG, SVG, PDF

**В плане**: Не упомянут

**Действие**: Добавить в research.md и contracts

---

### 8. Aceternity UI элементы (FR-061)

**Требуется**: Эффекты сияния, движущиеся сетки, сложные анимации, неоновые акценты

**В research.md**: Не упомянут

**Действие**: Добавить research task в research.md

---

### 9. Направления интерактивных расчётов (FR-031)

**Требуется**: Все 10 направлений: константы связи (G, α, α_s, G_F), тёмная энергия w(z), масса частиц, фрактальная структура, натяжение браны, квантовая запутанность, оптическая метрика, RS2 геометрия, зеркальные зоны, электрон как тор

**В data-model.md**: Упоминается, но без деталей

**Действие**: Добавить детали в data-model.md

---

### 10. Детали Orbital Dock (FR-069)

**Требуется**: Фиксированная позиция, скруглённые углы, сверхпрозрачное стекло, парящие островки, связь с --sifs-oscillation-speed, Bento-стиль, hover эффект, активное состояние, вибрация

**В contracts**: Частично упомянуто

**Действие**: Дополнить деталями в contracts/components.md

---

### 11. Детали Fractal Dropdown (FR-070)

**Требуется**: Z-отдаление блоков, clip-path анимация, список документов, закрытие при клике вне

**В contracts**: Частично упомянуто

**Действие**: Дополнить деталями в contracts/components.md

---

### 12. Neomorphism стили (FR-038)

**Требуется**: neo-raised, neo-pressed, neo-card, neo-glow, neo-grid

**В плане**: Упомянуто, но без деталей

**Действие**: Добавить детали в research.md

---

### 13. Spacing система (FR-040, FR-068)

**Требуется**: xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**В плане**: Упомянуто, но без конкретных значений

**Действие**: Добавить конкретные значения в research.md

---

### 14. Типографика (FR-041, FR-055, FR-068)

**Требуется**: h1: 48px (32px мобильные), h2: 36px, h3: 28px, h4: 24px, base: 16px, small: 14px, line-height: 1.6 для текста, 1.2 для заголовков, максимальная ширина: 800px

**В плане**: Упомянуто, но без полных деталей

**Действие**: Добавить полные детали в research.md

---

### 15. Цветовая палитра SIFS (FR-056)

**Требуется**: Level 0 (oklch(0% 0 0)), Level 1 (rgba(15, 15, 15, 0.7)), Level 2 (rgba(255, 255, 255, 0.03)), Neomorphism база (#1e1e1e)

**В плане**: Упомянуто, но без конкретных цветов

**Действие**: Добавить конкретные цвета в research.md

---

## Итоговый список действий

1. ✅ Добавить все Spatial компоненты в Project Structure
2. ✅ Добавить все музейные компоненты в Project Structure
3. ✅ Добавить все визуальные компоненты в Project Structure
4. ✅ Добавить детали Spatial Presets в research.md
5. ✅ Добавить Breadcrumbs в Project Structure и contracts
6. ✅ Добавить дополнительные компоненты в Project Structure и contracts
7. ✅ Добавить экспорт графиков в research.md и contracts
8. ✅ Добавить Aceternity UI research task в research.md
9. ✅ Добавить детали направлений расчётов в data-model.md
10. ✅ Дополнить детали Orbital Dock в contracts
11. ✅ Дополнить детали Fractal Dropdown в contracts
12. ✅ Добавить детали neomorphism стилей в research.md
13. ✅ Добавить конкретные значения spacing в research.md
14. ✅ Добавить полные детали типографики в research.md
15. ✅ Добавить конкретные цвета в research.md
