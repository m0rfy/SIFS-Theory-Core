/**
 * VisualizationsPage - Визуализации
 * 
 * T138: Integrate existing visualization components with useSpatialConnector() hook
 * 
 * Интегрирует все компоненты визуализации:
 * - MassHierarchyChart
 * - DarkEnergyEvolution
 * - CouplingConstantsDiagram
 * - OpticalMetricDiagram
 * - FractalScaleDiagram
 * - RS2GeometryDiagram
 */

import { useState, lazy, Suspense } from 'react';
import { useSpatialConnector } from '@/app/utils/sifs-spatial-connector';
import { SpatialSlab } from '@/app/components/spatial';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Loader2 } from 'lucide-react';

// Lazy load visualization components for performance
const MassHierarchyChart = lazy(() => 
  import('@/app/components/MassHierarchyChart').then(m => ({ default: m.MassHierarchyChart }))
);
const DarkEnergyEvolution = lazy(() => 
  import('@/app/components/DarkEnergyEvolution').then(m => ({ default: m.DarkEnergyEvolution }))
);
const CouplingConstantsDiagram = lazy(() => 
  import('@/app/components/CouplingConstantsDiagram').then(m => ({ default: m.CouplingConstantsDiagram }))
);
const OpticalMetricDiagram = lazy(() => 
  import('@/app/components/OpticalMetricDiagram').then(m => ({ default: m.OpticalMetricDiagram }))
);
const FractalScaleDiagram = lazy(() => 
  import('@/app/components/FractalScaleDiagram').then(m => ({ default: m.FractalScaleDiagram }))
);
const RS2GeometryDiagram = lazy(() => 
  import('@/app/components/RS2GeometryDiagram').then(m => ({ default: m.RS2GeometryDiagram }))
);

export function VisualizationsPage() {
  // Параметры для связи с SSF-2025 Spatial Framework
  const [metricStress, setMetricStress] = useState(100);
  const [waveAmplitude, setWaveAmplitude] = useState(0.5);
  const [frequency, setFrequency] = useState(0.2);
  const [timeDilationDelta, setTimeDilationDelta] = useState(0);

  // Интеграция с useSpatialConnector для связи параметров с CSS переменными
  useSpatialConnector({
    metricStress: metricStress,
    waveAmplitude: waveAmplitude,
    frequency: frequency,
    timeDilationDelta: timeDilationDelta,
  });

  return (
    <SpatialSlab preset="monolith" className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
            Визуализации теории SIFS
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            Интерактивные визуализации различных аспектов теории Scale-Invariant Fractal Spacetime.
            Все компоненты интегрированы с SSF-2025 Spatial Framework для real-time визуальных эффектов.
          </p>
        </div>

        {/* Visualizations */}
        <Tabs defaultValue="mass" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="mass">Массы</TabsTrigger>
            <TabsTrigger value="energy">Тёмная энергия</TabsTrigger>
            <TabsTrigger value="coupling">Константы</TabsTrigger>
            <TabsTrigger value="optical">Оптическая метрика</TabsTrigger>
            <TabsTrigger value="fractal">Фракталы</TabsTrigger>
            <TabsTrigger value="geometry">RS2</TabsTrigger>
          </TabsList>

          <TabsContent value="mass" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>Иерархия масс</CardTitle>
                <CardDescription>
                  Логарифмическая шкала масс от планковского до хаббловского масштаба
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <MassHierarchyChart />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="energy" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>Эволюция тёмной энергии</CardTitle>
                <CardDescription>
                  Данные DESI 2025: w(z) = w₀ + wₐ × z/(1+z)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <DarkEnergyEvolution />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coupling" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>Константы связи</CardTitle>
                <CardDescription>
                  Зависимость констант связи от масштабной координаты |S|
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <CouplingConstantsDiagram />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optical" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>Оптическая метрика</CardTitle>
                <CardDescription>
                  Визуализация оптической метрики Гордона и градиентов dn/dr
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <OpticalMetricDiagram />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fractal" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>Фрактальная структура</CardTitle>
                <CardDescription>
                  Диаграмма фрактальной иерархии масштабов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <FractalScaleDiagram />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geometry" className="mt-6">
            <Card className="bg-slate-950/50 border-slate-800">
              <CardHeader>
                <CardTitle>RS2 геометрия</CardTitle>
                <CardDescription>
                  Визуализация искривлённой 5D геометрии Randall-Sundrum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>}>
                  <RS2GeometryDiagram />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SpatialSlab>
  );
}
