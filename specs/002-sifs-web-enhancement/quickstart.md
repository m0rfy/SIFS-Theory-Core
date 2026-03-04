# Quick Start: Улучшение веб-версии SIFS Theory

**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts  
**Status**: Complete

## Обзор

Этот документ описывает быстрый старт для разработки улучшенной веб-версии SIFS Theory. Проект использует React 18+, TypeScript, Vite, Tailwind CSS, SSF-2025 Spatial Framework и концепцию технического документального музея.

## Предварительные требования

- Node.js 18+ и npm
- Git
- Современный браузер с поддержкой ES2020+, CSS переменных, WebGPU (опционально)

## Установка

```bash
# Клонировать репозиторий (если ещё не клонирован)
git clone https://github.com/m0rfy/SIFS-Theory-Core.git
cd SIFS-Theory-Core

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## Структура проекта

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # shadcn/ui компоненты
│   │   ├── spatial/          # SSF-2025 Spatial компоненты
│   │   ├── museum/           # Музейные компоненты
│   │   └── markdown/         # Модульный Markdown рендерер
│   ├── pages/                # Страницы приложения
│   ├── contexts/             # React контексты
│   ├── utils/                # Утилиты (коннектор, WebGPU)
│   ├── locales/              # Локализация (ru, en)
│   └── router.tsx            # React Router конфигурация
└── styles/
    ├── index.css
    ├── theme.css             # Цветовая палитра, spacing, типографика
    ├── ssf-2025.css          # SSF-2025 Spatial Framework
    └── responsive.css        # Мобильные стили
```

## Ключевые концепции

### SSF-2025 Spatial Framework

SSF-2025 создаёт архитектурную среду с Z-пространством и 4 уровнями реальности:

- **Level 0 (Temporal Abyss)**: Фон с частицами времени (WebGPU)
- **Level 1 (Substrate)**: Подложка страницы с neomorphism эффектами
- **Level 2 (Control Plane)**: Навигация Orbital Dock с парящими "островками"
- **Level 3 (Pulse)**: Индикаторы и динамические элементы

CSS переменные связывают параметры теории SIFS с визуальными эффектами:
- `--sifs-metric-stability` - метрическая стабильность (0-1)
- `--sifs-delta-color` - динамический цвет (oklch)
- `--sifs-sigma-blur` - размытие подложки (px)
- `--sifs-oscillation-speed` - частота колебаний (Hz)
- `--sifs-time-dilation-delta` - дельта временной дилатации (0-1)

### JavaScript коннектор

Коннектор `sifs-spatial-connector.ts` автоматически связывает параметры симуляций с CSS переменными:

```typescript
import { useSpatialConnector } from '@/app/utils/sifs-spatial-connector';

function MySimulation() {
  const [metricStress, setMetricStress] = useState(0.5);
  
  // Автоматически обновляет CSS переменные
  useSpatialConnector({ metricStress });
  
  return <div>...</div>;
}
```

### Модульный Markdown рендерер

Markdown рендерер разбит на модули для соблюдения правила модульности:

- `MarkdownRenderer.tsx` - основной компонент (< 300 строк)
- `MarkdownRenderer.components.tsx` - элементы (заголовки, списки, таблицы, код, цитаты)
- `MarkdownRenderer.math.tsx` - LaTeX/MathJax формулы
- `MarkdownRenderer.images.tsx` - изображения с lazy loading
- `MarkdownRenderer.links.tsx` - внутренние/внешние ссылки
- `MarkdownRenderer.visuals.tsx` - интерактивные графики и визуализации
- `MarkdownRenderer.types.ts` - типы и интерфейсы

### Музейный опыт

Концепция "технического документального музея" реализуется через:

- **MuseumHall** - залы музея с визуальными эффектами
- **InteractiveExhibit** - интерактивные экспонаты
- **StorytellingSection** - постепенное раскрытие информации
- **WorldChangeExample** - примеры применения теории

## Разработка

### Создание нового компонента

1. Создать файл в соответствующей директории (`components/spatial/`, `components/museum/`, и т.д.)
2. Использовать TypeScript интерфейсы для пропсов
3. Использовать Tailwind CSS utility классы
4. Следовать правилу модульности (< 300 строк)
5. Добавить адаптивность (mobile-first)

Пример:

```typescript
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/ui/utils";

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <div className={cn("p-4", className)}>
      <h2>{title}</h2>
      <Button>Action</Button>
    </div>
  );
}
```

### Интеграция симуляции с SSF-2025

1. Использовать хук `useSpatialConnector()` в компоненте симуляции
2. Передать параметры теории (metricStress, frequency, timeDilationDelta)
3. CSS переменные обновятся автоматически
4. UI отреагирует на изменения (вибрация, свечение, анимации)

Пример:

```typescript
import { useSpatialConnector } from '@/app/utils/sifs-spatial-connector';

export function MySimulation() {
  const [params, setParams] = useState({
    metricStress: 0.5,
    frequency: 1.0,
    timeDilationDelta: 0.0
  });
  
  // Автоматическая интеграция с SSF-2025
  useSpatialConnector(params);
  
  return (
    <div>
      {/* Симуляция */}
    </div>
  );
}
```

### Добавление нового документа

1. Создать markdown файл в `docs/{category}/`
2. Добавить метаданные в `src/app/utils/docs-structure.ts`:
   ```typescript
   {
     id: 'my-document',
     title: 'My Document',
     description: 'Description',
     category: 'theory',
     path: 'theory/my-document.md',
     date: '2025-01-27',
     tags: ['tag1', 'tag2']
   }
   ```
3. Документ будет доступен через навигацию и поиск

### Добавление перевода

1. Добавить ключ в соответствующий JSON файл:
   - `src/locales/ru/common.json` - общие строки
   - `src/locales/ru/nav.json` - навигация
   - `src/locales/ru/pages.json` - заголовки страниц
2. Использовать хук `useTranslation()` в компоненте:
   ```typescript
   import { useTranslation } from '@/app/contexts/I18nContext';
   
   function MyComponent() {
     const { t } = useTranslation('common');
     return <h1>{t('welcome')}</h1>;
   }
   ```

## Тестирование

### Ручное тестирование

1. **Навигация**: Проверить все маршруты, подменю, переходы
2. **Документы**: Открыть несколько документов, проверить рендеринг формул, кода, изображений
3. **Симуляции**: Запустить все симуляции, проверить интеграцию с SSF-2025
4. **Адаптивность**: Проверить на разных размерах экранов (320px-1920px+)
5. **i18n**: Переключить язык, проверить все тексты интерфейса

### Проверка производительности

1. Открыть DevTools → Performance
2. Записать сессию использования приложения
3. Проверить FPS (должно быть 60 FPS)
4. Проверить время загрузки страниц (< 3 секунд)
5. Проверить размер bundle (должен быть оптимизирован через code splitting)

## Сборка и деплой

```bash
# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview

# Деплой на GitHub Pages
npm run deploy
```

## Полезные ссылки

- [Документация проекта](../docs/README.md)
- [Конституция SIFS Theory](../../spec-kit/memory/constitution.md)
- [Спецификация фичи](./spec.md)
- [План реализации](./plan.md)
- [Исследования](./research.md)
- [Модель данных](./data-model.md)

## Следующие шаги

1. Изучить существующие компоненты в `src/app/components/`
2. Изучить структуру роутинга в `src/app/router.tsx`
3. Изучить SSF-2025 CSS переменные в `src/styles/ssf-2025.css`
4. Изучить JavaScript коннектор в `src/app/utils/sifs-spatial-connector.ts`
5. Начать разработку согласно плану реализации

## Поддержка

При возникновении вопросов или проблем:
1. Проверить документацию проекта
2. Проверить конституцию SIFS Theory
3. Создать issue в репозитории
