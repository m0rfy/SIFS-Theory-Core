# Component Library

Руководство по переиспользуемым компонентам проекта SIFS.

## 🎨 Визуальные компоненты

### 1. MassHierarchyChart

**Файл:** `/src/app/components/MassHierarchyChart.tsx`

**Описание:** Интерактивная диаграмма иерархии масс от планковского до хаббловского масштаба.

**Использование:**

```tsx
import { MassHierarchyChart } from './components/MassHierarchyChart';

<MassHierarchyChart />
```

**Возможности:**
- Логарифмическая шкала масштабов
- Tooltip с подробной информацией
- Responsive design
- Цветовое кодирование по типу объектов

**Данные:**
- Планковский масштаб: 10⁻³⁵ m
- Протон: 10⁻¹⁵ m (|S| ≈ 11.2)
- Атом: 10⁻¹⁰ m (|S| ≈ 16)
- Солнечная система: 10¹³ m
- Хаббл: 10²⁶ m

---

### 2. DarkEnergyEvolution

**Файл:** `/src/app/components/DarkEnergyEvolution.tsx`

**Описание:** График эволюции тёмной энергии (DESI 2025 данные).

**Использование:**

```tsx
import { DarkEnergyEvolution } from './components/DarkEnergyEvolution';

<DarkEnergyEvolution />
```

**Данные:**
- DESI best fit: w(z)
- ΛCDM baseline: w = −1
- Error bands (1σ, 2σ)

**Формула:**

```
w(z) = w₀ + wₐ × z/(1+z)
w₀ = −0.827 ± 0.063
wₐ = −0.75 ± 0.29
```

---

### 3. CouplingConstantsDiagram

**Файл:** `/src/app/components/CouplingConstantsDiagram.tsx`

**Описание:** Диаграмма констант связи vs. масштабная координата |S|.

**Использование:**

```tsx
import { CouplingConstantsDiagram } from './components/CouplingConstantsDiagram';

<CouplingConstantsDiagram />
```

**Отображаемые константы:**
- Gravity: G_eff(S)
- EM: α ≈ 1/137
- Strong: α_s(S)
- Weak: G_F

**Цветовая схема:**
- Гравитация: `#60a5fa` (blue-400)
- EM: `#22d3ee` (cyan-400)
- Strong: `#f59e0b` (amber-500)
- Weak: `#a78bfa` (violet-400)

---

### 4. ProtonBlackHoleCalc

**Файл:** `/src/app/components/ProtonBlackHoleCalc.tsx`

**Описание:** Калькулятор параметров протона как микро-ЧД Керра-Ньюмана.

**Использование:**

```tsx
import { ProtonBlackHoleCalc } from './components/ProtonBlackHoleCalc';

<ProtonBlackHoleCalc />
```

**Расчёты:**
1. Schwarzschild радиус: `r_s = 2GM/c²`
2. Warping factor: `η = m_obs/M_eff`
3. Масштабная координата: `|S| = −ln(η)/k`

**Результаты:**
- r_s ≈ 2.48 × 10⁻⁵⁴ m
- |S| ≈ 11.2
- Соответствие наблюдениям ✓

---

### 5. OpticalMetricDiagram

**Файл:** `/src/app/components/OpticalMetricDiagram.tsx`

**Описание:** Визуализация оптической метрики Гордона и градиентов dn/dr.

**Использование:**

```tsx
import { OpticalMetricDiagram } from './components/OpticalMetricDiagram';

<OpticalMetricDiagram />
```

**Формула:**

```
ds² = n²(r, S) · (c²dt² − dx²)
F = −∇n(r, S)
```

**Градиенты:**
- Gravity: 10⁻²⁰ m⁻¹
- EM: 10⁻¹⁰ m⁻¹
- Strong: 10⁵ m⁻¹

---

### 6. FractalScaleDiagram

**Файл:** `/src/app/components/FractalScaleDiagram.tsx`

**Описание:** Диаграмма фрактальной иерархии масштабов.

**Использование:**

```tsx
import { FractalScaleDiagram } from './components/FractalScaleDiagram';

<FractalScaleDiagram />
```

**Визуализация:**
- Лог-периодическая структура
- Резонансные моды S
- Самоподобность

---

### 7. RS2GeometryDiagram

**Файл:** `/src/app/components/RS2GeometryDiagram.tsx`

**Описание:** 3D визуализация RS2 warped геометрии.

**Использование:**

```tsx
import { RS2GeometryDiagram } from './components/RS2GeometryDiagram';

<RS2GeometryDiagram />
```

**Особенности:**
- Интерактивная 3D сцена
- Warp factor профиль
- Brane embedding в bulk

---

## 🧩 UI Компоненты

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

<Card className="bg-black/60 backdrop-blur-sm border border-white/10">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 📊 Recharts Integration

### Базовая конфигурация

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
    <XAxis dataKey="x" stroke="#fff" />
    <YAxis stroke="#fff" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        border: '1px solid rgba(255,255,255,0.2)' 
      }} 
    />
    <Legend />
    <Line type="monotone" dataKey="y" stroke="#22d3ee" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

### Custom Tooltip

```tsx
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 p-2 rounded">
        <p className="text-cyan-400">{`${label}`}</p>
        <p className="text-white">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

<Tooltip content={<CustomTooltip />} />
```

---

## 🎨 Стилевая система

### Цветовая палитра

```css
/* Primary colors */
--cyan-400: #22d3ee;      /* Математика, формулы */
--blue-400: #60a5fa;      /* Физика, данные */
--purple-400: #c084fc;    /* Геометрия, RS2 */
--green-400: #4ade80;     /* Подтверждения */
--orange-400: #fb923c;    /* Оптическая метрика */
--amber-500: #f59e0b;     /* Сильное взаимодействие */
--violet-400: #a78bfa;    /* Слабое взаимодействие */

/* Backgrounds */
--bg-primary: rgba(0, 0, 0, 0.6);
--bg-card: rgba(0, 0, 0, 0.8);
--border: rgba(255, 255, 255, 0.1);
```

### Типичные классы

```tsx
// Карточка с эффектом стекла
className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-6"

// Заголовок
className="text-2xl font-bold text-cyan-400"

// Текст формулы
className="font-mono text-purple-300 bg-black/40 p-2 rounded"

// Hover эффект
className="hover:border-white/30 transition-all duration-300"
```

---

## 🔧 Создание нового компонента

### Шаблон

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface MyComponentProps {
  title?: string;
  data?: any[];
}

export function MyComponent({ title = "Default Title", data = [] }: MyComponentProps) {
  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle className="text-cyan-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Your content here */}
      </CardContent>
    </Card>
  );
}
```

### Checklist

- [ ] TypeScript типы для props
- [ ] Default значения
- [ ] Responsive design
- [ ] Цветовая схема проекта
- [ ] Комментарии для сложной логики
- [ ] Экспорт из компонента

---

## 📐 Layout Patterns

### Slide Layout

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-8">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold mb-4 text-cyan-400">Title</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Content */}
    </div>
  </div>
</div>
```

### Two-column

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div>{/* Left */}</div>
  <div>{/* Right */}</div>
</div>
```

### Three-column

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>{/* Col 1 */}</div>
  <div>{/* Col 2 */}</div>
  <div>{/* Col 3 */}</div>
</div>
```

---

## 🚀 Performance Tips

### Мемоизация

```tsx
import { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  const processedData = useMemo(() => {
    return data.map(/* expensive operation */);
  }, [data]);
  
  return <>{/* render */}</>;
});
```

### Lazy loading

```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyChart />
</Suspense>
```

---

## 📚 References

- [Recharts Documentation](https://recharts.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**[← Вернуться к документации](../README.md)**
