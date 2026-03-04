# Implementation Plan: Улучшение веб-версии SIFS Theory

**Branch**: `002-sifs-web-enhancement` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-sifs-web-enhancement/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Создание полноценной веб-версии SIFS Theory с роутингом, интеграцией всех документов, улучшенным дизайном в тематике SIFS, внедрением SSF-2025 Spatial Framework, концепцией технического документального музея, интеграцией всех интерактивных симуляций и использованием MCP для генерации изображений.

**Технический подход**:

- React Router DOM 7.11.0 для SPA навигации
- Модульная архитектура компонентов (< 300 строк на файл)
- SSF-2025 Spatial Framework с CSS переменными и JavaScript коннектором
- React Markdown с плагинами для рендеринга документации (формулы, код, изображения)
- Автоматическая интеграция существующих симуляций через `useSpatialConnector()` хук
- WebGPU частицы времени с Canvas fallback
- Mobile-first адаптивный дизайн
- Простой React Context для i18n (без внешних библиотек)

**Статус планирования**: Phase 0 и Phase 1 завершены. Все технические решения определены, модели данных и контракты созданы.

## Technical Context

**Language/Version**: TypeScript 5.x (строгая типизация, без `any`)  
**Primary Dependencies**: React 18.3.1, React Router DOM 7.11.0, Vite 6.3.5, Tailwind CSS 4.1.12, Motion 12.23.24, Recharts 2.15.2, react-markdown 10.1.0, rehype-highlight 7.0.2, rehype-katex 7.0.1, remark-gfm 4.0.1, shadcn/ui (48+ компонентов), Lucide React 0.487.0  
**Storage**: Локальное хранилище браузера (localStorage) для настроек языка и истории расчётов, файловая система для markdown документов в `docs/`  
**Testing**: Ручное тестирование навигации, отображения документов, симуляций, адаптивности (пока нет автоматизированных тестов)  
**Target Platform**: Веб-браузеры (Chrome, Firefox, Safari, Edge) с поддержкой ES2020+, CSS переменных, WebGPU (с Canvas fallback)  
**Project Type**: Web application (SPA - Single Page Application)  
**Performance Goals**: 60 FPS для анимаций и визуальных эффектов, загрузка страниц < 3 секунд на 3G/4G, интерактивность < 100ms для обновления CSS переменных, рендеринг markdown документов < 1 секунда  
**Constraints**: Все файлы < 300 строк (правило модульности), мобильная адаптация обязательна (320px-1920px+), только бесплатные ресурсы (MIT/ISC/CC0 лицензии), UTF-8 кодировка для всех файлов, только Orbital Dock навигация (без sidebar/header)  
**Scale/Scope**: ~50+ markdown документов в `docs/`, 4 основные симуляции, 10+ направлений интерактивных расчётов, 6 залов "Как теория изменит мир", ~15 страниц приложения

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Проверка соответствия принципам конституции SIFS Theory:

- [x] **TypeScript First**: Все компоненты используют TypeScript со строгой типизацией, без `any`
- [x] **Component-Based**: Используются функциональные React компоненты, переиспользование из `src/app/components/ui/`
- [x] **Sequential Execution**: План учитывает последовательное выполнение задач
- [x] **Documentation**: Документация на русском языке, формулы в LaTeX
- [x] **Scientific Accuracy**: Математические расчёты валидируются, единицы измерения указаны
- [x] **UI Consistency**: Используется Tailwind CSS utility классы, shadcn/ui компоненты
- [x] **UTF-8 Encoding**: Все файлы в UTF-8
- [x] **Error Handling**: План включает обработку ошибок и логирование
- [x] **File Modularity**: Все файлы < 300 строк, разбиты на модули при необходимости
- [x] **SSF-2025 Framework**: Используется SSF-2025 Spatial Framework с Z-пространством и CSS переменными
- [x] **Museum Experience**: Реализована концепция технического документального музея с интерактивными экспонатами
- [x] **Mobile-First**: Все компоненты адаптивны с mobile-first подходом, touch-friendly интерфейс
- [x] **Navigation**: Только Orbital Dock навигация, без sidebar/header
- [x] **React Router**: Используется React Router DOM для SPA навигации

**Нарушения (если есть)**: Нет нарушений. Все принципы конституции соблюдены.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui компоненты (48+ компонентов)
│   │   ├── spatial/               # SSF-2025 Spatial компоненты
│   │   │   ├── OrbitalDock.tsx
│   │   │   ├── FractalDropdownMenu.tsx
│   │   │   ├── TemporalAbyss.tsx
│   │   │   ├── SpatialSlab.tsx
│   │   │   ├── DeltaPulse.tsx
│   │   │   ├── FrequencyKnob.tsx
│   │   │   ├── ChronoOdometer.tsx
│   │   │   ├── TemporalWave.tsx
│   │   │   ├── SyncOrb.tsx
│   │   │   ├── BentoCell.tsx
│   │   │   └── SpatialScrollbar.tsx
│   │   ├── museum/                # Музейные компоненты
│   │   │   ├── MuseumHall.tsx
│   │   │   ├── InteractiveExhibit.tsx
│   │   │   ├── StorytellingSection.tsx
│   │   │   ├── WorldChangeExample.tsx
│   │   │   ├── MuseumMap.tsx
│   │   │   ├── VirtualGuide.tsx
│   │   │   ├── TimelineExhibit.tsx
│   │   │   ├── BeforeAfterComparison.tsx
│   │   │   ├── ParallaxHero.tsx
│   │   │   ├── ParticleCursor.tsx
│   │   │   ├── ExhibitCard.tsx
│   │   │   ├── HallCard.tsx
│   │   │   └── RouteSelector.tsx
│   │   ├── markdown/              # Модульная структура Markdown рендерера
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── MarkdownRenderer.components.tsx
│   │   │   ├── MarkdownRenderer.math.tsx
│   │   │   ├── MarkdownRenderer.images.tsx
│   │   │   ├── MarkdownRenderer.links.tsx
│   │   │   ├── MarkdownRenderer.visuals.tsx
│   │   │   └── MarkdownRenderer.types.ts
│   │   ├── layout/
│   │   │   └── Layout.tsx          # Layout БЕЗ sidebar/header
│   │   ├── visual/                 # Визуальные компоненты
│   │   │   ├── FractalBackground.tsx
│   │   │   ├── CosmicGradient.tsx
│   │   │   ├── NeoCard.tsx
│   │   │   ├── GlowEffect.tsx
│   │   │   ├── MovingGrid.tsx
│   │   │   └── TimeWaveVisualization.tsx
│   │   ├── enhanced/               # Дополнительные компоненты
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── InteractiveGraph.tsx
│   │   │   └── FormulaBlock.tsx
│   │   ├── slides/                 # Существующие слайды презентации
│   │   ├── InformationalCollapseSimulation.tsx
│   │   ├── AtomicClockSync.tsx
│   │   ├── InteractiveCalculations.tsx
│   │   ├── ProtonBlackHoleCalc.tsx
│   │   ├── MassHierarchyChart.tsx
│   │   ├── DarkEnergyEvolution.tsx
│   │   ├── CouplingConstantsDiagram.tsx
│   │   ├── OpticalMetricDiagram.tsx
│   │   ├── FractalScaleDiagram.tsx
│   │   ├── RS2GeometryDiagram.tsx
│   │   └── ErrorBoundary.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PresentationPage.tsx
│   │   ├── DocsIndexPage.tsx
│   │   ├── DocPage.tsx
│   │   ├── WorldChangePage.tsx
│   │   └── simulations/
│   │       ├── SimulationsIndexPage.tsx
│   │       ├── CollapseSimulationPage.tsx
│   │       ├── TemporalSyncPage.tsx
│   │       ├── InteractiveCalculationsPage.tsx
│   │       └── VisualizationsPage.tsx
│   ├── contexts/
│   │   ├── SlideNavigationContext.tsx
│   │   └── I18nContext.tsx
│   ├── utils/
│   │   ├── sifs-spatial-connector.ts
│   │   └── webgpu-particles.ts
│   ├── locales/
│   │   ├── ru/
│   │   │   ├── common.json
│   │   │   ├── nav.json
│   │   │   └── pages.json
│   │   └── en/
│   │       ├── common.json
│   │       ├── nav.json
│   │       └── pages.json
│   ├── router.tsx
│   └── App.tsx                     # Старая презентация (для совместимости)
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css               # Цветовая палитра, spacing, типографика
│   │   ├── ssf-2025.css            # SSF-2025 Spatial Framework
│   │   └── responsive.css          # Мобильные стили и breakpoints
│   └── main.tsx
├── docs/                            # Markdown документация
│   ├── theory/
│   ├── calculations/
│   ├── predictions/
│   ├── data/
│   ├── defense/
│   └── protocol/
└── public/
    └── images/
        └── generated/               # MCP DALL-E сгенерированные изображения
```

**Structure Decision**: Web application (SPA) с модульной архитектурой. Проект использует существующую структуру с добавлением новых компонентов для SSF-2025, музейного опыта и модульного Markdown рендерера. Все компоненты следуют правилу модульности (< 300 строк), разбиты на логические части (Header, Body, Footer для компонентов, подмодули для утилит).

### SSF-2025 Levels Mapping

- Level 0 (Temporal Abyss): TemporalAbyss.tsx - фон с частицами времени
- Level 1 (Substrate): Layout.tsx - подложка страницы с neomorphism эффектами
- Level 2 (Control Plane): OrbitalDock.tsx - навигация с парящими островками
- Level 3 (Pulse): DeltaPulse.tsx - индикаторы с динамическим цветом

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation     | Why Needed | Simpler Alternative Rejected Because |
| ------------- | ---------- | ------------------------------------ |
| Нет нарушений | -          | -                                    |

## Phase 0: Outline & Research

**Status**: ✅ Complete

**Output**: `research.md`

**Research Tasks Completed**:

1. ✅ Markdown рендеринг с поддержкой формул и кода - решение: react-markdown с плагинами
2. ✅ SSF-2025 Spatial Framework интеграция - решение: CSS переменные + JavaScript коннектор
3. ✅ WebGPU частицы времени с Canvas fallback - решение: WebGPU API с автоматическим fallback
4. ✅ Модульная структура Markdown рендерера - решение: разбиение на модули (< 300 строк)
5. ✅ Интернационализация (i18n) - решение: простой React Context с JSON файлами
6. ✅ Интеграция существующих симуляций - решение: автоматическая интеграция через коннектор
7. ✅ MCP DALL-E для генерации изображений - решение: использование MCP DALL-E сервера
8. ✅ Мобильная адаптация - решение: mobile-first подход с адаптивными breakpoints
9. ✅ Структура документов - решение: существующая структура docs/ с метаданными в TypeScript
10. ✅ Производительность и оптимизация - решение: lazy loading, code splitting, оптимизация анимаций

**All NEEDS CLARIFICATION resolved**: ✅ Да

## Phase 1: Design & Contracts

**Status**: ✅ Complete

**Outputs**:

- ✅ `data-model.md` - модели данных (Document, Simulation, MuseumHall, и т.д.)
- ✅ `contracts/components.md` - контракты компонентов и хуков
- ✅ `quickstart.md` - быстрый старт для разработки

**Design Artifacts**:

- ✅ Модели данных определены с валидацией и связями
- ✅ Компонентные контракты определены (MarkdownRenderer, OrbitalDock, и т.д.)
- ✅ Hook контракты определены (useSpatialConnector, useTranslation, useLanguage)
- ✅ Utility контракты определены (sifs-spatial-connector.ts, webgpu-particles.ts)
- ✅ Page контракты определены (HomePage, DocPage, CollapseSimulationPage, и т.д.)

**Constitution Check Re-evaluation**: ✅ Passed - все принципы соблюдены

## Next Steps

**Phase 2**: Создание задач через `/speckit.tasks` команду

- Разбить план на конкретные задачи
- Определить приоритеты и зависимости
- Создать чеклист для проверки

**Phase 3**: Реализация (после создания задач)

- Разработка компонентов согласно контрактам
- Интеграция существующих симуляций
- Тестирование и валидация

## Анализ упущений и дополнения

**Date**: 2025-01-27  
**Status**: ✅ Complete

**Проведён детальный анализ спецификации и выявлены упущения**:

1. ✅ **Spatial компоненты (FR-027)**: Добавлены все 10 компонентов в Project Structure и contracts

   - SpatialSlab, DeltaPulse, FrequencyKnob, ChronoOdometer, TemporalWave, SyncOrb, BentoCell, SpatialScrollbar

2. ✅ **Музейные компоненты (FR-037)**: Добавлены все 13 компонентов в Project Structure и contracts

   - MuseumMap, VirtualGuide, TimelineExhibit, BeforeAfterComparison, ParticleCursor, ExhibitCard, HallCard, RouteSelector

3. ✅ **Визуальные компоненты (FR-039)**: Добавлены все 6 компонентов в Project Structure и contracts

   - FractalBackground, CosmicGradient, MovingGrid, TimeWaveVisualization

4. ✅ **Дополнительные компоненты (FR-051, FR-052)**: Добавлены в Project Structure и contracts

   - Breadcrumbs, ScrollReveal, InteractiveGraph, FormulaBlock

5. ✅ **Spatial Presets (FR-030)**: Добавлены детали в research.md

   - Monolith, Orbital Dock, Data Capsule с полным описанием

6. ✅ **Экспорт графиков (FR-048)**: Добавлен research task в research.md

   - PNG, SVG, PDF экспорт через Recharts API и jspdf

7. ✅ **Aceternity UI элементы (FR-061)**: Добавлен research task в research.md

   - Эффекты сияния, движущиеся сетки, сложные анимации, неоновые акценты

8. ✅ **Направления расчётов (FR-031)**: Добавлены детали в data-model.md

   - Все 10 направлений с описанием: константы связи, тёмная энергия, масса частиц, фрактальная структура, натяжение браны, квантовая запутанность, оптическая метрика, RS2 геометрия, зеркальные зоны, электрон как тор

9. ✅ **Детали Orbital Dock (FR-069)**: Дополнены в contracts/components.md

   - Фиксированная позиция, скруглённые углы, сверхпрозрачное стекло, парящие островки, связь с --sifs-oscillation-speed, Bento-стиль, hover эффект, активное состояние, вибрация

10. ✅ **Детали Fractal Dropdown (FR-070)**: Дополнены в contracts/components.md

    - Z-отдаление блоков, clip-path анимация, список документов, закрытие при клике вне

11. ✅ **Neomorphism стили (FR-038)**: Добавлены детали в research.md

    - neo-raised, neo-pressed, neo-card, neo-glow, neo-grid

12. ✅ **Spacing система (FR-040, FR-068)**: Добавлены конкретные значения в research.md

    - xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

13. ✅ **Типографика (FR-041, FR-055, FR-068)**: Добавлены полные детали в research.md

    - h1: 48px (32px мобильные), h2: 36px, h3: 28px, h4: 24px, base: 16px, small: 14px, line-height: 1.6 для текста, 1.2 для заголовков, максимальная ширина: 800px

14. ✅ **Цветовая палитра SIFS (FR-056)**: Добавлены конкретные цвета в research.md
    - Level 0 (oklch(0% 0 0)), Level 1 (rgba(15, 15, 15, 0.7)), Level 2 (rgba(255, 255, 255, 0.03)), Neomorphism база (#1e1e1e)

**Создан документ**: `analysis-gaps.md` с полным списком выявленных упущений и выполненных действий.

**Итог**: Все требования из спецификации (80 FR) теперь полностью покрыты в плане, research.md, data-model.md и contracts/components.md. План готов для Phase 2 (создание задач).
