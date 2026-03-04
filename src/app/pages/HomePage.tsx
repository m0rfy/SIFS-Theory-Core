/**
 * HomePage — Главная страница SIFS Theory
 * Презентация теории: ядро, структура, доказательства, применения
 */

import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BookOpen, Calculator, Atom, Globe,
  TrendingUp, FlaskConical, Layers, Sigma,
  ExternalLink, ChevronRight
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ScrollReveal } from '@/app/components/enhanced/ScrollReveal';
import { FractalBackground, CosmicGradient } from '@/app/components/visual';
import { NeoCard } from '@/app/components/visual';
import { SpatialSlab } from '@/app/components/spatial';
import { cn } from '@/app/components/ui/utils';

const MassHierarchyChart = lazy(() =>
  import('@/app/components/MassHierarchyChart').then(m => ({ default: m.MassHierarchyChart }))
);
const DarkEnergyEvolution = lazy(() =>
  import('@/app/components/DarkEnergyEvolution').then(m => ({ default: m.DarkEnergyEvolution }))
);
const CouplingConstantsDiagram = lazy(() =>
  import('@/app/components/CouplingConstantsDiagram').then(m => ({ default: m.CouplingConstantsDiagram }))
);
const FractalScaleDiagram = lazy(() =>
  import('@/app/components/FractalScaleDiagram').then(m => ({ default: m.FractalScaleDiagram }))
);
const RS2GeometryDiagram = lazy(() =>
  import('@/app/components/RS2GeometryDiagram').then(m => ({ default: m.RS2GeometryDiagram }))
);

// Фундаментальные уравнения
const coreEquations = [
  {
    label: 'Метрика 5D',
    formula: 'ds² = exp(−2k|S|) · (c²dt² − dx² − dy² − dz²) + dS²',
    desc: 'Пятимерная RS-метрика с масштабной координатой S',
  },
  {
    label: 'Варпинг-фактор',
    formula: 'W(S) = exp(−2k|S|),  k ≈ 0.1 M_Pl',
    desc: 'Экспоненциальное подавление — основа иерархии масс',
  },
  {
    label: 'Иерархия масс',
    formula: 'm_obs = M_true × exp(−2k|S|)',
    desc: 'Протон: M_true ≈ 10¹⁴ g → m_obs = 1.67 × 10⁻²⁴ g',
  },
  {
    label: 'Силы = градиенты',
    formula: 'F = −∇n(r, S)',
    desc: 'Все фундаментальные взаимодействия — градиенты n(r,S)',
  },
];

// Ключевые результаты (математически верифицированные)
const results = [
  {
    title: 'Масса протона из геометрии',
    value: '0.938 ГэВ',
    match: '< 1% погрешности',
    color: 'text-cyan-400',
    link: '/docs/calculations/proton-mass',
  },
  {
    title: 'Константы связи α, G, α_s, G_F',
    value: '4 константы',
    match: '≈ CODATA-2018',
    color: 'text-purple-400',
    link: '/docs/calculations/coupling-constants',
  },
  {
    title: 'Тёмная энергия w(z)',
    value: 'w₀ = −0.827',
    match: 'DESI 2025 >4σ',
    color: 'text-green-400',
    link: '/docs/data/desi-2025',
  },
  {
    title: 'Лог-периодические осцилляции',
    value: 'δS ≈ 2π',
    match: 'EHT M87*',
    color: 'text-blue-400',
    link: '/docs/data/euclid-jwst',
  },
];

// Разделы теории
const sections = [
  {
    icon: Atom,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    title: 'Теоретическая база',
    desc: 'RS2-геометрия, фрактальная структура, оптическая метрика, квантовая запутанность',
    to: '/docs/theory/overview',
    count: '11 документов',
  },
  {
    icon: Calculator,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    title: 'Расчёты',
    desc: 'Масса протона, константы связи, иерархия масс, тёмная энергия, энтропия',
    to: '/docs/calculations/proton-mass',
    count: '11 расчётов',
  },
  {
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    title: 'Предсказания',
    desc: 'KK-моды гравитонов, ГВ-модификации, CMB-осцилляции, астрофизика',
    to: '/docs/predictions/README',
    count: '27 предсказаний',
  },
  {
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    title: 'Наблюдательные данные',
    desc: 'DESI DR2, Euclid+JWST, EHT M87*, CMB, LIGO/Virgo',
    to: '/docs/data/desi-2025',
    count: '5 источников',
  },
  {
    icon: FlaskConical,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    title: 'Применения',
    desc: 'Нейроморфный процессор (0.1 см³, 22 мкВт), анализ иерархических систем',
    to: '/docs/applications/sifs-system-overview',
    count: 'Физика → Практика',
  },
  {
    icon: Layers,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    title: 'Аппаратная реализация',
    desc: 'SIFS Processor: φ-пороговый транзистор, 3.46 бит/ячейка, φ-тесселяция',
    to: '/docs/hardware/README',
    count: 'Концепция',
  },
];

// Предсказания с текущим статусом
const predictions = [
  { text: 'KK-моды гравитонов: m_KK ≈ 2–5 ТэВ', status: 'Ожидает LHC/FCC', color: 'text-yellow-400' },
  { text: 'Evolving dark energy: w(z) ≠ −1', status: 'Согласуется — DESI 2025', color: 'text-green-400' },
  { text: 'Лог-периодика в CMB: A ≈ 0.01–0.05', status: 'Согласуется — EHT M87*', color: 'text-green-400' },
  { text: 'Модификации waveform: δφ ≈ 10⁻⁴–10⁻⁶', status: 'Ожидает LISA', color: 'text-yellow-400' },
  { text: 'Подавление структур: ~2–3% при z≈1–2', status: 'Согласуется — Euclid', color: 'text-green-400' },
  { text: 'Ранние галактики при z>10', status: 'Согласуется — JWST', color: 'text-green-400' },
];

export function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <FractalBackground className="opacity-20" />
        <CosmicGradient className="absolute inset-0 opacity-15" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 text-xs tracking-widest px-4 py-1">
            SCALE-INVARIANT FRACTAL SPACETIME
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIFS Theory
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Унифицированная геометрическая теория поля, объединяющая гравитацию,
            квантовую механику и структуру элементарных частиц через фрактальный 5D-балк
            с голографической квантовой запутанностью.
          </p>

          {/* Core equation */}
          <div className="my-4 px-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg inline-block font-mono text-sm md:text-base text-cyan-300">
            ds² = exp(−2k|S|) · η<sub>μν</sub> dx<sup>μ</sup>dx<sup>ν</sup> + dS²
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link to="/docs/theory/overview">
                <BookOpen className="mr-2 h-5 w-5" />
                Начать изучение
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
              <Link to="/simulations/visualizations">
                <Sigma className="mr-2 h-5 w-5" />
                Визуализации
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
              <a href="https://github.com/m0rfy/SIFS-Theory-Core" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <SpatialSlab preset="monolith" className="relative z-10">

        {/* ── Математическое ядро ──────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
              Математическое ядро
            </h2>
            <p className="text-center text-gray-400 mb-8 text-sm">
              Четыре уравнения, из которых без дополнительных параметров выводятся все наблюдаемые
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {coreEquations.map((eq) => (
                <NeoCard key={eq.label} variant="card" className="p-4">
                  <div className="text-xs text-cyan-400 font-mono tracking-widest mb-2 uppercase">
                    {eq.label}
                  </div>
                  <div className="font-mono text-sm md:text-base text-green-300 bg-black/30 rounded px-3 py-2 mb-2 overflow-x-auto">
                    {eq.formula}
                  </div>
                  <p className="text-gray-400 text-xs">{eq.desc}</p>
                </NeoCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Верифицированные результаты ─────────────────────────────── */}
        <ScrollReveal direction="up" delay={100}>
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
              Результаты, согласующиеся с данными
            </h2>
            <p className="text-center text-gray-400 mb-8 text-sm">
              Предсказания теории, проверенные математически и сравненные с экспериментальными данными
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {results.map((r) => (
                <Link key={r.title} to={r.link}>
                  <NeoCard variant="raised" hover className="p-5 h-full group">
                    <div className={cn('text-2xl font-bold font-mono mb-1', r.color)}>
                      {r.value}
                    </div>
                    <div className="text-white text-sm font-medium mb-2 leading-tight">
                      {r.title}
                    </div>
                    <Badge variant="outline" className={cn('text-xs', r.color, 'border-current')}>
                      {r.match}
                    </Badge>
                    <ChevronRight className={cn('h-4 w-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity', r.color)} />
                  </NeoCard>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Интерактивные визуализации ───────────────────────────────── */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
              Ключевые визуализации
            </h2>
            <p className="text-center text-gray-400 mb-8 text-sm">
              Интерактивные диаграммы — прямо из математического ядра теории
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                { title: 'Иерархия масс', subtitle: 'от планковской до нуклонной', Component: MassHierarchyChart, color: 'text-cyan-400' },
                { title: 'Тёмная энергия', subtitle: 'w(z) — DESI 2025', Component: DarkEnergyEvolution, color: 'text-green-400' },
                { title: 'Константы связи', subtitle: 'α, G, α_s из S-координаты', Component: CouplingConstantsDiagram, color: 'text-purple-400' },
                { title: 'Фрактальная иерархия', subtitle: 'от Планка до Хаббла', Component: FractalScaleDiagram, color: 'text-blue-400' },
                { title: 'RS2 геометрия', subtitle: '5D bulk-бран структура', Component: RS2GeometryDiagram, color: 'text-orange-400' },
              ].map(({ title, subtitle, Component, color }) => (
                <NeoCard key={title} variant="card" className="p-4">
                  <h4 className={cn('font-semibold mb-0.5', color)}>{title}</h4>
                  <p className="text-gray-500 text-xs mb-3">{subtitle}</p>
                  <Suspense fallback={<div className="h-48 bg-black/40 rounded animate-pulse" />}>
                    <Component />
                  </Suspense>
                </NeoCard>
              ))}
              <Link to="/simulations/visualizations" className="block">
                <NeoCard variant="card" hover className="p-4 h-full flex flex-col items-center justify-center gap-3 min-h-[220px] border-dashed">
                  <Sigma className="h-8 w-8 text-gray-500" />
                  <span className="text-gray-400 text-sm">Все визуализации →</span>
                </NeoCard>
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Разделы теории ────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
              Структура теории
            </h2>
            <p className="text-center text-gray-400 mb-8 text-sm">
              Полная документация от аксиом до аппаратных применений
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <Link key={s.title} to={s.to}>
                    <NeoCard variant="raised" hover className="p-5 h-full group">
                      <div className="flex items-start gap-3">
                        <div className={cn('p-2 rounded-lg shrink-0', s.bg)}>
                          <Icon className={cn('h-5 w-5', s.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-white font-semibold text-sm leading-tight">{s.title}</h3>
                            <Badge variant="outline" className={cn('text-[10px] shrink-0', s.color, 'border-current/30')}>
                              {s.count}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                          <ChevronRight className={cn('h-3.5 w-3.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity', s.color)} />
                        </div>
                      </div>
                    </NeoCard>
                  </Link>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Предсказания теории ─────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
              Предсказания и проверки
            </h2>
            <p className="text-center text-gray-400 mb-8 text-sm">
              Проверяемые следствия теории и их текущий статус
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {predictions.map((p) => (
                <div key={p.text}
                  className="flex items-start gap-3 p-3 bg-black/30 border border-white/5 rounded-lg">
                  <div className={cn('h-1.5 w-1.5 rounded-full mt-1.5 shrink-0', p.color.replace('text-', 'bg-'))} />
                  <div>
                    <p className="text-gray-200 text-sm leading-tight">{p.text}</p>
                    <p className={cn('text-xs mt-0.5', p.color)}>{p.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button asChild variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-white/5">
                <Link to="/docs/predictions/README">
                  Полный каталог предсказаний (27)
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Симуляции ────────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={100}>
          <section className="py-12 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
              Интерактивные симуляции
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { to: '/simulations/collapse', icon: '💥', title: 'Информационный коллапс', desc: 'Процесс коллапса в 5D' },
                { to: '/simulations/temporal', icon: '⏱️', title: 'Синхронизация времени', desc: 'Атомные часы и RS-варпинг' },
                { to: '/simulations/calculations', icon: '🧮', title: 'Интерактивные расчёты', desc: 'Параметры теории' },
                { to: '/simulations/visualizations', icon: '📊', title: 'Все визуализации', desc: 'RS2, фракталы, метрики' },
              ].map((sim) => (
                <Link key={sim.to} to={sim.to}>
                  <NeoCard variant="card" hover className="p-5 text-center h-full group">
                    <div className="text-3xl mb-3">{sim.icon}</div>
                    <h3 className="text-white text-sm font-semibold mb-1">{sim.title}</h3>
                    <p className="text-gray-400 text-xs">{sim.desc}</p>
                    <ChevronRight className="h-4 w-4 mx-auto mt-3 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                  </NeoCard>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="py-10 px-4 text-center border-t border-white/5 mt-8">
          <p className="text-gray-500 text-sm mb-2">
            SIFS Theory: Scale-Invariant Fractal Spacetime
          </p>
          <p className="text-gray-600 text-xs mb-4">
            Теоретическая концепция — математически верифицирована. Терминология:{' '}
            <Link to="/docs/terminology-guide" className="underline hover:text-gray-400">
              «согласуется с данными»
            </Link>
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/m0rfy/SIFS-Theory-Core"
              className="text-gray-500 hover:text-white text-sm transition-colors"
              target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Link to="/docs/white-paper" className="text-gray-500 hover:text-white text-sm transition-colors">
              White Paper
            </Link>
            <Link to="/docs/theory/overview" className="text-gray-500 hover:text-white text-sm transition-colors">
              Документация
            </Link>
          </div>
        </footer>

      </SpatialSlab>
    </div>
  );
}
