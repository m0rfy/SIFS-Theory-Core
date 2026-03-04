import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, ExternalLink, CheckCircle2, Clock,
  Atom, Calculator, TrendingUp, Globe, FlaskConical, Cpu,
} from 'lucide-react';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

// Chart components (lazy)
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

// ─── Constants ───────────────────────────────────────────────────────────────

const EQUATIONS = [
  {
    tag: '5D Метрика',
    formula: 'ds² = e⁻²ᵏ|ˢ| ημν dxμdxν + dS²',
    desc: 'Пятимерная Рэндалл–Сандрум метрика с масштабной координатой S',
    color: '#22d3ee',
  },
  {
    tag: 'Варпинг-фактор',
    formula: 'W(S) = exp(−2k|S|),  k ≈ 0.1 M_Pl',
    desc: 'Экспоненциальное подавление — геометрическое происхождение иерархии масс',
    color: '#a78bfa',
  },
  {
    tag: 'Иерархия масс',
    formula: 'm_obs = M_true × exp(−2k|S|)',
    desc: 'Масса протона: M_true ≈ 10¹⁴ g → m_obs = 1.67 × 10⁻²⁴ g',
    color: '#34d399',
  },
  {
    tag: 'Силы = градиенты',
    formula: 'F = −∇n(r, S)',
    desc: 'Все фундаментальные взаимодействия — градиенты показателя преломления n(r,S)',
    color: '#fb923c',
  },
];

const METRICS = [
  {
    value: '0.938',
    unit: 'ГэВ',
    label: 'Масса протона',
    sub: 'из геометрии',
    match: '< 1% погрешности',
    status: 'verified',
    to: '/docs/calculations/proton-mass',
    color: '#22d3ee',
  },
  {
    value: '4',
    unit: 'константы',
    label: 'α, G, α_s, G_F',
    sub: 'из S-координаты',
    match: 'CODATA-2018',
    status: 'verified',
    to: '/docs/calculations/coupling-constants',
    color: '#a78bfa',
  },
  {
    value: '−0.827',
    unit: 'w₀',
    label: 'Тёмная энергия',
    sub: 'w(z) эволюция',
    match: 'DESI 2025 >4σ',
    status: 'verified',
    to: '/docs/data/desi-2025',
    color: '#34d399',
  },
  {
    value: '2π',
    unit: 'δS',
    label: 'Лог-периодика',
    sub: 'EHT M87*',
    match: 'EHT M87* >3σ',
    status: 'verified',
    to: '/docs/data/euclid-jwst',
    color: '#f59e0b',
  },
];

const SECTIONS = [
  {
    icon: Atom,
    title: 'Теоретическая база',
    desc: 'RS2-геометрия, фрактальная структура, оптическая метрика, квантовая запутанность в 5D',
    to: '/docs/theory/overview',
    tag: '11 документов',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.06)',
    border: 'rgba(34,211,238,0.12)',
  },
  {
    icon: Calculator,
    title: 'Расчёты',
    desc: 'Масса протона, константы связи, иерархия масс, тёмная энергия w(z), энтропия',
    to: '/docs/calculations/proton-mass',
    tag: '11 расчётов',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.12)',
  },
  {
    icon: TrendingUp,
    title: 'Предсказания',
    desc: 'KK-моды гравитонов (2–5 ТэВ), ГВ-модификации, CMB-осцилляции, астрофизика',
    to: '/docs/predictions/README',
    tag: '27 предсказаний',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.06)',
    border: 'rgba(52,211,153,0.12)',
  },
  {
    icon: Globe,
    title: 'Наблюдательные данные',
    desc: 'DESI DR2, Euclid+JWST, EHT M87*, CMB-поляризация, LIGO/Virgo',
    to: '/docs/data/desi-2025',
    tag: '5 источников',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.06)',
    border: 'rgba(56,189,248,0.12)',
  },
  {
    icon: FlaskConical,
    title: 'Применения',
    desc: 'Нейроморфный процессор (0.1 см³, 22 мкВт), иерархический анализ систем',
    to: '/docs/applications/sifs-system-overview',
    tag: 'Физика → Практика',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.06)',
    border: 'rgba(251,146,60,0.12)',
  },
  {
    icon: Cpu,
    title: 'Аппаратная реализация',
    desc: 'φ-пороговый транзистор, 3.46 бит/ячейка, φ-тесселяция, h-BN туннельный барьер',
    to: '/docs/hardware/README',
    tag: 'Концепция',
    color: '#e879f9',
    bg: 'rgba(232,121,249,0.06)',
    border: 'rgba(232,121,249,0.12)',
  },
];

const PREDICTIONS = [
  { text: 'Evolving dark energy w(z) ≠ −1', status: 'Согласуется', src: 'DESI 2025', ok: true },
  { text: 'Лог-периодические осцилляции: A ≈ 0.01–0.05', status: 'Согласуется', src: 'EHT M87*', ok: true },
  { text: 'Подавление структур: ~2–3% при z ≈ 1–2', status: 'Согласуется', src: 'Euclid', ok: true },
  { text: 'Ранние галактики при z > 10', status: 'Согласуется', src: 'JWST', ok: true },
  { text: 'KK-моды гравитонов: m_KK ≈ 2–5 ТэВ', status: 'Ожидает', src: 'LHC/FCC', ok: false },
  { text: 'Модификации waveform: δφ ≈ 10⁻⁴–10⁻⁶', status: 'Ожидает', src: 'LISA', ok: false },
];

const SIMULATIONS = [
  {
    to: '/simulations/collapse',
    title: 'Информационный коллапс',
    desc: 'Коллапс в 5D RS-пространстве',
    icon: '⬛',
  },
  {
    to: '/simulations/temporal',
    title: 'Синхронизация времени',
    desc: 'Атомные часы и RS-варпинг',
    icon: '⏱',
  },
  {
    to: '/simulations/calculations',
    title: 'Интерактивные расчёты',
    desc: 'Параметры теории онлайн',
    icon: '🧮',
  },
  {
    to: '/simulations/visualizations',
    title: 'Все визуализации',
    desc: 'RS2, фракталы, метрики',
    icon: '📊',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const S = { fontFamily: 'Syne, sans-serif' };
const M = { fontFamily: 'DM Sans, sans-serif' };
const MONO = { fontFamily: 'JetBrains Mono, monospace' };

function Divider() {
  return (
    <div
      className="w-full"
      style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}
    />
  );
}

function SectionHeader({
  tag,
  title,
  desc,
}: {
  tag?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-12 text-center">
      {tag && (
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{
            color: '#22d3ee',
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.15)',
            ...MONO,
          }}
        >
          {tag}
        </span>
      )}
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f1f5f9] mb-4"
        style={S}
      >
        {title}
      </h2>
      {desc && (
        <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto" style={M}>
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Glow behind headline */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)',
          }}
        />

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              color: '#94a3b8',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              ...MONO,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#22d3ee' }}
            />
            SCALE-INVARIANT FRACTAL SPACETIME
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05]"
            style={{ ...S, letterSpacing: '-0.03em' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SIFS Theory
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto mb-10 leading-relaxed"
            style={M}
          >
            Унифицированная геометрическая теория поля. Гравитация, квантовая механика
            и структура частиц — следствия единой фрактальной 5D-геометрии.
          </p>

          {/* Core equation */}
          <div
            className="inline-block px-6 py-3.5 rounded-xl mb-10 text-sm md:text-base"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(34,211,238,0.2)',
              color: '#67e8f9',
              ...MONO,
            }}
          >
            ds² = e<sup>−2k|S|</sup> · η<sub>μν</sub> dx<sup>μ</sup>dx<sup>ν</sup> + dS²
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/docs/theory/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                boxShadow: '0 0 24px rgba(34,211,238,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(34,211,238,0.35)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Изучить теорию
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/simulations/visualizations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f1f5f9';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              Визуализации
            </Link>

            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f1f5f9';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div style={{ color: '#334155', fontSize: '11px', letterSpacing: '0.1em', ...MONO }}>
            SCROLL
          </div>
          <motion.div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, #334155, transparent)' }}
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      <Divider />

      {/* ── Metrics bar ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.08 }}
          >
            {METRICS.map((m) => (
              <Link
                key={m.label}
                to={m.to}
                className="group block p-6 rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="text-3xl md:text-4xl font-extrabold mb-1"
                  style={{ color: m.color, ...S, lineHeight: 1 }}
                >
                  {m.value}
                  <span className="text-base font-medium ml-1" style={{ color: '#64748b', ...M }}>
                    {m.unit}
                  </span>
                </div>
                <div className="text-[#94a3b8] text-sm font-medium mb-0.5" style={M}>
                  {m.label}
                </div>
                <div className="text-[#475569] text-xs mb-3" style={M}>
                  {m.sub}
                </div>
                <div
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.15)',
                    color: '#34d399',
                    ...MONO,
                  }}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {m.match}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Core Equations ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Математическое ядро"
              title="Четыре фундаментальных уравнения"
              desc="Из этих четырёх выражений без дополнительных параметров выводятся все наблюдаемые"
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {EQUATIONS.map((eq, i) => (
              <motion.div
                key={eq.tag}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{ color: eq.color, ...MONO }}
                >
                  {eq.tag}
                </div>
                <div
                  className="text-base md:text-lg px-4 py-3 rounded-xl mb-3 overflow-x-auto"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: `1px solid ${eq.color}20`,
                    color: eq.color,
                    ...MONO,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {eq.formula}
                </div>
                <p className="text-[#64748b] text-sm leading-relaxed" style={M}>
                  {eq.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Theory Diagram (image placeholder) ─────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Геометрия"
              title="5D Рэндалл–Сандрум пространство"
              desc="Схема RS2-геометрии с браной, балком и масштабной координатой S"
            />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ImagePlaceholder
              id="rs2-geometry-diagram"
              label="RS2 геометрия — брана и балк"
              hint="1200×800px — диаграмма 5D пространства"
              aspect="3/2"
            />
            <ImagePlaceholder
              id="warp-factor-visualization"
              label="Варпинг-фактор W(S) = exp(−2k|S|)"
              hint="1200×800px — график экспоненциального подавления"
              aspect="3/2"
            />
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Visualizations ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Ключевые визуализации"
              title="Диаграммы из математического ядра"
              desc="Интерактивные графики построены непосредственно из уравнений теории"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Иерархия масс',
                sub: 'от Планка до нуклона',
                Component: MassHierarchyChart,
                color: '#22d3ee',
              },
              {
                title: 'Тёмная энергия',
                sub: 'w(z) — DESI 2025',
                Component: DarkEnergyEvolution,
                color: '#34d399',
              },
              {
                title: 'Константы связи',
                sub: 'α, G, α_s из S',
                Component: CouplingConstantsDiagram,
                color: '#a78bfa',
              },
              {
                title: 'Фрактальная иерархия',
                sub: 'от Планка до Хаббла',
                Component: FractalScaleDiagram,
                color: '#38bdf8',
              },
              {
                title: 'RS2 геометрия',
                sub: '5D bulk-бран структура',
                Component: RS2GeometryDiagram,
                color: '#fb923c',
              },
            ].map(({ title, sub, Component, color }, i) => (
              <motion.div
                key={title}
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <h4 className="text-sm font-semibold mb-0.5" style={{ color, ...S }}>
                  {title}
                </h4>
                <p className="text-xs text-[#475569] mb-4" style={M}>
                  {sub}
                </p>
                <Suspense
                  fallback={
                    <div
                      className="rounded-lg animate-pulse"
                      style={{ height: '180px', background: 'rgba(255,255,255,0.03)' }}
                    />
                  }
                >
                  <Component />
                </Suspense>
              </motion.div>
            ))}

            <Link
              to="/simulations/visualizations"
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl transition-all duration-200 min-h-[220px]"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px dashed rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <span className="text-2xl">📊</span>
              <span className="text-[#475569] text-sm" style={M}>
                Все визуализации →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Theory Sections ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Документация"
              title="Структура теории"
              desc="Полная документация — от аксиом до аппаратных применений"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    to={s.to}
                    className="group flex flex-col p-6 rounded-2xl h-full transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid rgba(255,255,255,0.06)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = s.bg;
                      e.currentTarget.style.borderColor = s.border;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: s.bg, border: `1px solid ${s.border}` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          color: s.color,
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                          ...MONO,
                        }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="text-[#f1f5f9] font-semibold mb-2 text-sm" style={S}>
                      {s.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed flex-1" style={M}>
                      {s.desc}
                    </p>
                    <div
                      className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: s.color, ...M }}
                    >
                      Открыть <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Predictions ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Проверки"
              title="Предсказания и их статус"
              desc="Теоретически обоснованные следствия, сопоставленные с наблюдательными данными"
            />
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {PREDICTIONS.map((p, i) => (
              <div
                key={p.text}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 transition-colors"
                style={{
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                  borderBottom: i < PREDICTIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
                    style={{ background: p.ok ? '#34d399' : '#94a3b8' }}
                  />
                  <span className="text-[#94a3b8] text-sm" style={M}>
                    {p.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 pl-5 sm:pl-0">
                  {p.ok ? (
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#34d399' }} />
                  ) : (
                    <Clock className="w-4 h-4" style={{ color: '#94a3b8' }} />
                  )}
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: p.ok ? '#34d399' : '#94a3b8',
                      background: p.ok ? 'rgba(52,211,153,0.08)' : 'rgba(148,163,184,0.08)',
                      ...MONO,
                    }}
                  >
                    {p.status} — {p.src}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-6">
            <Link
              to="/docs/predictions/README"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#475569', ...M }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
            >
              Полный каталог предсказаний (27)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Simulations ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Симуляции"
              title="Интерактивные инструменты"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SIMULATIONS.map((sim, i) => (
              <motion.div
                key={sim.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  to={sim.to}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl h-full transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(34,211,238,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="text-3xl mb-4">{sim.icon}</span>
                  <h3 className="text-[#f1f5f9] text-sm font-semibold mb-2" style={S}>
                    {sim.title}
                  </h3>
                  <p className="text-[#475569] text-xs" style={M}>
                    {sim.desc}
                  </p>
                  <ArrowRight
                    className="w-4 h-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#22d3ee' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <Divider />

      {/* ── About image placeholder ─────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="О теории"
              title="Автор и история SIFS"
            />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ImagePlaceholder
              id="author-photo"
              label="Фото автора"
              hint="600×600px — квадратный формат"
              aspect="1/1"
            />
            <div className="md:col-span-2 flex flex-col gap-4 justify-center">
              <ImagePlaceholder
                id="timeline-sifs-history"
                label="Хронология развития теории SIFS"
                hint="1600×600px — горизонтальная временная шкала"
                aspect="8/3"
              />
              <ImagePlaceholder
                id="theory-overview-banner"
                label="Схема структуры теории"
                hint="1600×400px — баннер-схема разделов"
                aspect="4/1"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6">
        <div
          className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-[#334155] text-sm mb-1" style={M}>
              SIFS Theory: Scale-Invariant Fractal Spacetime
            </div>
            <div className="text-[#1e293b] text-xs" style={M}>
              Теоретическая концепция — математически верифицирована
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#334155] hover:text-[#94a3b8] text-sm transition-colors"
              style={M}
            >
              GitHub
            </a>
            <Link
              to="/docs/white-paper"
              className="text-[#334155] hover:text-[#94a3b8] text-sm transition-colors"
              style={M}
            >
              White Paper
            </Link>
            <Link
              to="/docs/theory/overview"
              className="text-[#334155] hover:text-[#94a3b8] text-sm transition-colors"
              style={M}
            >
              Документация
            </Link>
            <Link
              to="/docs/terminology-guide"
              className="text-[#334155] hover:text-[#94a3b8] text-sm transition-colors"
              style={M}
            >
              Терминология
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
