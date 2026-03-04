/**
 * HomePage - Главная страница с Hero секцией, статистикой, достижениями и визуализациями
 * 
 * T056: Hero section, Stats section, Features section, Visual Examples
 * T057: ParallaxHero integration
 * T058: MuseumHall components integration
 * T059: Visual components (FractalBackground, CosmicGradient, MovingGrid) integration
 * T128: Existing visualization components integration
 * SC-024: Page load time < 3 seconds
 */

import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Calculator, 
  Zap, 
  Database, 
  Atom, 
  Globe,
  TrendingUp,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { ParallaxHero } from '@/app/components/museum/ParallaxHero';
import { MuseumHall } from '@/app/components/museum/MuseumHall';
import { ScrollReveal } from '@/app/components/enhanced/ScrollReveal';
import { FractalBackground, CosmicGradient, MovingGrid } from '@/app/components/visual';
import { NeoCard } from '@/app/components/visual';
import { SpatialSlab } from '@/app/components/spatial';
import { cn } from '@/app/components/ui/utils';

// Lazy load visualization components for performance (SC-024)
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

// Statistics data
const stats = [
  { label: 'Документов', value: '50+', icon: BookOpen, color: 'text-cyan-400' },
  { label: 'Расчётов', value: '10+', icon: Calculator, color: 'text-purple-400' },
  { label: 'Симуляций', value: '4', icon: Zap, color: 'text-blue-400' },
  { label: 'Визуализаций', value: '6', icon: Database, color: 'text-green-400' },
];

// Features data
const features = [
  {
    title: 'Унификация физики',
    description: 'Объединение гравитации, квантовой механики и структуры частиц через фрактальную геометрию',
    icon: Atom,
    color: 'text-cyan-400',
  },
  {
    title: 'Решённые парадоксы',
    description: 'Парадокс массы, тёмная энергия, иерархия масштабов - всё объясняется единой теорией',
    icon: Target,
    color: 'text-purple-400',
  },
  {
    title: 'Экспериментальные предсказания',
    description: 'Совпадение с данными DESI, CODATA, EHT, LIGO с точностью до 1%',
    icon: TrendingUp,
    color: 'text-blue-400',
  },
  {
    title: 'Интерактивные инструменты',
    description: 'Симуляции, расчёты и визуализации для изучения теории',
    icon: Sparkles,
    color: 'text-green-400',
  },
];

// Museum hall data for HomePage
const homeHall = {
  id: 'home',
  name: 'Главный зал',
  description: 'Добро пожаловать в SIFS Theory - унифицированную геометрическую теорию поля',
  icon: '🏛️',
  color: 'cyan',
  exhibits: [
    {
      id: 'intro',
      title: 'Введение в теорию',
      description: 'Основные принципы и аксиомы SIFS',
      type: 'document' as const,
      contentId: '/docs/theory/overview',
    },
  ],
};

export function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background visual effects */}
      <div className="fixed inset-0 -z-10">
        <FractalBackground className="opacity-30" />
        <CosmicGradient className="absolute inset-0 opacity-20" />
        <MovingGrid className="absolute inset-0 opacity-10" />
      </div>

      {/* Hero Section with ParallaxHero */}
      <ParallaxHero
        title="SIFS Theory"
        subtitle="Scale-Invariant Fractal Spacetime"
        parallaxSpeed={0.5}
        className="min-h-[60vh] md:min-h-[80vh] w-full"
      >
        <div className="text-center space-y-4 md:space-y-6 z-10 relative px-4 md:px-0 w-full max-w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }} // T060: Simplified animations on mobile
            className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Унифицированная геометрическая теория поля, объединяющая гравитацию, 
            квантовую механику и структуру элементарных частиц через фрактальную 
            геометрию 5D-пространства.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }} // T060: Simplified animations on mobile
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 min-h-[44px] w-full sm:w-auto">
              <Link to="/docs/theory/overview" className="flex items-center justify-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Начать изучение
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-[44px] w-full sm:w-auto">
              <Link to="/simulations" className="flex items-center justify-center">
                <Calculator className="mr-2 h-5 w-5" />
                Симуляции
              </Link>
            </Button>
          </motion.div>
        </div>
      </ParallaxHero>

      {/* T103 [US10]: Main content with Monolith preset */}
      <SpatialSlab preset="monolith" className="relative z-10">
        {/* Stats Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-8 md:py-16 px-4 md:px-0">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Статистика теории
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <ScrollReveal key={stat.label} direction="up" delay={index * 100}>
                    <NeoCard variant="card" hover className="text-center p-6">
                      <Icon className={cn('h-8 w-8 mx-auto mb-4', stat.color)} />
                      <div className={cn('text-3xl font-bold mb-2', stat.color)}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </NeoCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Features Section */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-8 md:py-16 px-4 md:px-0">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ключевые достижения
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal key={feature.title} direction="up" delay={index * 100}>
                    <NeoCard variant="raised" hover className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={cn('p-3 bg-white/5 rounded-lg', feature.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={cn('text-xl font-bold mb-2', feature.color)}>
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </NeoCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Visual Examples Section */}
        <ScrollReveal direction="up" delay={400}>
          <section className="py-8 md:py-16 px-4 md:px-0">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Интерактивные визуализации
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-cyan-400 mb-4 text-center">Иерархия масс</h4>
                  <MassHierarchyChart />
                </NeoCard>
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-green-400 mb-4 text-center">Эволюция тёмной энергии</h4>
                  <DarkEnergyEvolution />
                </NeoCard>
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-purple-400 mb-4 text-center">Константы связи</h4>
                  <CouplingConstantsDiagram />
                </NeoCard>
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-blue-400 mb-4 text-center">Оптическая метрика</h4>
                  <OpticalMetricDiagram />
                </NeoCard>
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-cyan-400 mb-4 text-center">Фрактальная иерархия</h4>
                  <FractalScaleDiagram />
                </NeoCard>
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                <NeoCard variant="card" className="p-4">
                  <h4 className="text-purple-400 mb-4 text-center">RS2 геометрия</h4>
                  <RS2GeometryDiagram />
                </NeoCard>
              </Suspense>
            </div>
          </section>
        </ScrollReveal>

        {/* Museum Hall Section */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-8 md:py-16 px-4 md:px-0">
            <MuseumHall hall={homeHall} />
          </section>
        </ScrollReveal>
      </SpatialSlab>
    </div>
  );
}
