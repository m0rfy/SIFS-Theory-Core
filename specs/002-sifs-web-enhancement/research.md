# Research: Улучшение веб-версии SIFS Theory

**Date**: 2025-01-27  
**Phase**: 0 - Outline & Research  
**Status**: Complete

## Research Tasks

### 1. Markdown рендеринг с поддержкой формул и кода

**Decision**: Использовать `react-markdown` с плагинами `remark-gfm`, `rehype-highlight`, `rehype-katex`

**Rationale**:
- `react-markdown` - стандартная библиотека для рендеринга Markdown в React
- `remark-gfm` - поддержка GitHub Flavored Markdown (таблицы, задачи, ссылки)
- `rehype-highlight` - подсветка синтаксиса кода (использует highlight.js)
- `rehype-katex` - рендеринг LaTeX формул через KaTeX (быстрее MathJax, уже установлен)

**Alternatives considered**:
- `marked` + `DOMPurify` - более низкоуровневый подход, требует ручной обработки безопасности
- `MDX` - требует компиляции, избыточен для статической документации
- `react-markdown` без плагинов - не поддерживает формулы и подсветку кода

**Implementation**: Модульная структура `MarkdownRenderer.tsx` с подмодулями для элементов, формул, изображений, ссылок и визуализаций.

---

### 2. SSF-2025 Spatial Framework интеграция

**Decision**: Реализовать через CSS переменные и JavaScript коннектор `sifs-spatial-connector.ts`

**Rationale**:
- CSS переменные обеспечивают реактивность UI на параметры теории
- JavaScript коннектор связывает симуляции с CSS переменными в реальном времени
- `requestAnimationFrame` обеспечивает плавные обновления (60 FPS)
- Батчинг обновлений минимизирует перерисовки

**Alternatives considered**:
- Redux/Context для состояния - избыточно, CSS переменные проще и быстрее
- Прямое обновление стилей через inline - нарушает принцип разделения concerns
- Web Components - избыточно для текущих требований

**Implementation**: 
- CSS переменные в `src/styles/ssf-2025.css`
- Коннектор в `src/app/utils/sifs-spatial-connector.ts`
- React хук `useSpatialConnector()` для автоматической интеграции

---

### 3. WebGPU частицы времени с Canvas fallback

**Decision**: Использовать WebGPU API с автоматическим fallback на Canvas 2D

**Rationale**:
- WebGPU обеспечивает высокую производительность для тысяч частиц (60 FPS)
- Compute shaders позволяют обрабатывать тысячи частиц без потери производительности
- Canvas fallback обеспечивает совместимость со старыми браузерами
- Автоматическое определение поддержки WebGPU через `navigator.gpu`

**Alternatives considered**:
- Только Canvas 2D - низкая производительность для тысяч частиц
- WebGL - устаревший API, WebGPU более современный и производительный
- CSS анимации - недостаточно гибкости для физических симуляций

**Implementation**: Утилита `src/app/utils/webgpu-particles.ts` с автоматическим fallback.

---

### 4. Модульная структура Markdown рендерера

**Decision**: Разбить на модули: основной компонент, компоненты элементов, формулы, изображения, ссылки, визуализации, типы

**Rationale**:
- Соблюдение правила модульности (< 300 строк на файл)
- Улучшенная читаемость и поддерживаемость
- Легче тестировать отдельные модули
- Переиспользование компонентов в других местах

**Alternatives considered**:
- Один большой файл - нарушает правило модульности, сложно поддерживать
- Полностью отдельные компоненты - избыточно, модули достаточно

**Implementation**:
- `MarkdownRenderer.tsx` (< 300 строк) - основной компонент
- `MarkdownRenderer.components.tsx` - элементы (заголовки, списки, таблицы, код, цитаты)
- `MarkdownRenderer.math.tsx` - LaTeX/MathJax формулы
- `MarkdownRenderer.images.tsx` - изображения с lazy loading
- `MarkdownRenderer.links.tsx` - внутренние/внешние ссылки
- `MarkdownRenderer.visuals.tsx` - интерактивные графики и визуализации
- `MarkdownRenderer.types.ts` - типы и интерфейсы

---

### 5. Интернационализация (i18n)

**Decision**: Простой React Context с JSON файлами локалей, без внешних библиотек

**Rationale**:
- Простота реализации и поддержки
- Нет необходимости в сложных функциях (pluralization, date formatting)
- Легко расширять новыми языками
- Минимальный bundle size

**Alternatives considered**:
- `react-i18next` - избыточно для простой структуры локалей
- `next-intl` - специфичен для Next.js
- `react-intl` - сложнее в настройке, избыточно

**Implementation**:
- `I18nContext.tsx` с хуками `useTranslation()` и `useLanguage()`
- Структура локалей: `src/locales/{lang}/common.json`, `nav.json`, `pages.json`
- Сохранение выбранного языка в `localStorage`

---

### 6. Интеграция существующих симуляций

**Decision**: Автоматическая интеграция через JavaScript коннектор с React хуком

**Rationale**:
- Минимальные изменения в существующих компонентах
- Централизованное управление связью параметров теории с UI
- Автоматическое обновление CSS переменных при изменении параметров
- Батчинг обновлений для производительности

**Alternatives considered**:
- Ручная интеграция в каждом компоненте - дублирование кода, сложнее поддерживать
- Redux для состояния - избыточно, CSS переменные проще

**Implementation**:
- Коннектор автоматически определяет параметры из симуляций
- `InformationalCollapseSimulation`: `metricStress` → `--sifs-metric-stability`, `waveAmplitude` → `--sifs-oscillation-speed`
- `AtomicClockSync`: `frequency` → `--sifs-oscillation-speed`, `timeDilationDelta` → `--sifs-time-dilation-delta`
- React хук `useSpatialConnector()` для автоматической интеграции

---

### 7. MCP DALL-E для генерации изображений

**Decision**: Использовать MCP DALL-E сервер для генерации изображений проекта

**Rationale**:
- Генерация уникальных изображений для проекта
- Соответствие тематике SIFS Theory
- Сохранение в `public/images/generated/` для использования в приложении

**Alternatives considered**:
- Использование готовых изображений - менее уникально
- Ручное создание изображений - требует дизайнера, больше времени

**Implementation**: 
- Использовать MCP DALL-E инструменты для генерации
- Сохранять в `public/images/generated/`
- Использовать для Hero изображений, иконок разделов, фоновых паттернов

---

### 8. Мобильная адаптация

**Decision**: Mobile-first подход с адаптивными breakpoints и упрощённой навигацией

**Rationale**:
- Mobile-first обеспечивает оптимальную производительность на всех устройствах
- Упрощённая навигация на мобильных улучшает UX
- Touch-friendly интерфейс (минимум 44x44px) обязателен для мобильных

**Alternatives considered**:
- Desktop-first - сложнее адаптировать под мобильные
- Отдельная мобильная версия - избыточно, адаптивный дизайн достаточно

**Implementation**:
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Упрощённая Dock-навигация на мобильных (меньше иконок или горизонтальный скролл)
- Полноэкранное подменю на мобильных (Sheet из shadcn)
- Адаптивная типографика (h1: 32px на мобильных, 48px на десктопе)
- Уменьшенные отступы на мобильных (spacing-md вместо spacing-xl)
- Горизонтальный скролл или карточки для таблиц
- Адаптивные размеры графиков (100% ширины)
- Упрощённые анимации на мобильных для производительности

---

### 9. Структура документов

**Decision**: Использовать существующую структуру `docs/` с метаданными в TypeScript файле

**Rationale**:
- Сохранение существующей структуры документации
- Метаданные в TypeScript обеспечивают типизацию и автодополнение
- Легко расширять новыми документами

**Alternatives considered**:
- Frontmatter в Markdown - требует парсинга, сложнее валидация
- Отдельная база данных - избыточно для статической документации

**Implementation**:
- Структура в `src/app/utils/docs-structure.ts`
- Метаданные: `title`, `description`, `category`, `path`, `date`
- Автоматическое построение индекса документов

---

### 10. Производительность и оптимизация

**Decision**: Lazy loading для markdown документов, code splitting, оптимизация анимаций

**Rationale**:
- Lazy loading уменьшает начальный bundle size
- Code splitting оптимизирует загрузку по маршрутам
- Оптимизация анимаций через Motion обеспечивает 60 FPS

**Alternatives considered**:
- Загрузка всех документов сразу - большой bundle size, медленная загрузка
- Без code splitting - избыточная загрузка неиспользуемого кода

**Implementation**:
- React.lazy() для markdown документов
- Vite code splitting через `manualChunks` в `vite.config.ts`
- Motion оптимизация анимаций (will-change, transform вместо position)
- Tailwind CSS v4.0 для максимальной производительности

---

### 11. Spatial Presets (Monolith, Orbital Dock, Data Capsule)

**Decision**: Реализовать три готовых пресета SSF-2025 для разных типов контента

**Rationale**:
- Monolith: для основных страниц с центральным блоком и перспективой (margin: 40px, border-radius: 40px, box-shadow: spatial-heavy, эффект уменьшения в перспективе при скролле)
- Orbital Dock: для навигации с островками и левитацией (каждая с частотой "левитации", вибрация при низкой стабильности)
- Data Capsule: для виджетов с градиентной обводкой 0.5px (цвет меняется от синего к красному в зависимости от Time Dilation Delta)

**Alternatives considered**:
- Единый стиль для всех элементов - недостаточно гибкости для разных типов контента
- Полностью кастомные стили - избыточно, пресеты покрывают основные случаи

**Implementation**: CSS классы в `src/styles/ssf-2025.css` с применением через Tailwind utility классы.

---

### 12. Экспорт графиков и диаграмм

**Decision**: Использовать библиотеки для экспорта Recharts графиков в PNG, SVG, PDF

**Rationale**:
- PNG: для быстрого экспорта и вставки в документы
- SVG: для масштабируемых векторных изображений
- PDF: для печати и документооборота
- Recharts предоставляет API для экспорта через `toDataURL()` и `toSVG()`

**Alternatives considered**:
- Только скриншоты - низкое качество, нет векторных форматов
- Сторонние сервисы - требует backend, избыточно

**Implementation**: 
- PNG: `canvas.toDataURL('image/png')` для Canvas-based графиков
- SVG: `toSVG()` метод Recharts для векторных графиков
- PDF: библиотека `jspdf` для генерации PDF из изображений

---

### 13. Aceternity UI элементы

**Decision**: Интегрировать визуальные эффекты из Aceternity UI (бесплатные, MIT лицензия)

**Rationale**:
- Эффекты сияния для важных элементов (glow effects)
- Движущиеся сетки для фона (animated grids)
- Сложные анимации для переходов (complex transitions)
- Неоновые акценты для визуализации "волн времени" (neon accents)

**Alternatives considered**:
- Создание с нуля - больше времени, может быть менее качественно
- Платные библиотеки - нарушает FR-062 (только бесплатные ресурсы)

**Implementation**: 
- Использовать готовые компоненты из Aceternity UI (MIT лицензия)
- Адаптировать под SSF-2025 цветовую палитру
- Интегрировать с Motion для плавных анимаций

---

### 14. Neomorphism стили

**Decision**: Реализовать neomorphism стили через CSS классы: neo-raised, neo-pressed, neo-card, neo-glow, neo-grid

**Rationale**:
- neo-raised: приподнятые элементы с тенями
- neo-pressed: вдавленные элементы (для кнопок в активном состоянии)
- neo-card: карточки с neomorphism эффектом
- neo-glow: свечение для важных элементов
- neo-grid: сетка с neomorphism эффектом

**Alternatives considered**:
- Плоский дизайн - менее выразительно для музейного опыта
- Material Design - не соответствует тематике SIFS

**Implementation**: CSS классы в `src/styles/theme.css` с использованием box-shadow и градиентов.

---

### 15. Spacing и типографика система

**Decision**: Единая система spacing и типографики с конкретными значениями

**Rationale**:
- Spacing: xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px
- Typography: h1: 48px (32px мобильные), h2: 36px, h3: 28px, h4: 24px, base: 16px, small: 14px
- Line-height: 1.6 для текста, 1.2 для заголовков
- Максимальная ширина текста: 800px для читаемости

**Alternatives considered**:
- Произвольные значения - нарушает консистентность дизайна
- Слишком большие/маленькие значения - ухудшают читаемость

**Implementation**: CSS переменные в `src/styles/theme.css` и Tailwind конфигурация.

---

### 16. Цветовая палитра SIFS

**Decision**: Конкретные цвета для каждого уровня SSF-2025

**Rationale**:
- Level 0 (Temporal Abyss): oklch(0% 0 0) - абсолютная темнота
- Level 1 (Substrate): rgba(15, 15, 15, 0.7) - полупрозрачная подложка
- Level 2 (Control Plane): rgba(255, 255, 255, 0.03) - сверхпрозрачное стекло
- Neomorphism база: #1e1e1e - тёмный фон для neomorphism эффектов
- Динамические цвета через CSS переменные (--sifs-delta-color)

**Alternatives considered**:
- Светлая тема - не соответствует тематике космоса и времени
- Яркие цвета - отвлекают от контента

**Implementation**: CSS переменные в `src/styles/theme.css` и `src/styles/ssf-2025.css`.

---

## Summary

Все ключевые технические решения определены. Проект использует современный технологический стек 2025 года с акцентом на производительность, модульность и пользовательский опыт. Все решения соответствуют принципам конституции SIFS Theory и обеспечивают соблюдение правил модульности, мобильной адаптации и SSF-2025 Framework.

**Дополнительно покрыто**:
- Spatial Presets (Monolith, Orbital Dock, Data Capsule)
- Экспорт графиков (PNG, SVG, PDF)
- Aceternity UI элементы
- Neomorphism стили
- Детальная spacing и типографика система
- Конкретная цветовая палитра SIFS
