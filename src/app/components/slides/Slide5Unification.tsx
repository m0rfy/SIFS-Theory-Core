import { Slide } from '../Slide';
import { Target, Waves, Boxes, Sparkles } from 'lucide-react';
import { MassHierarchyChart } from '../MassHierarchyChart';
import { CouplingConstantsDiagram } from '../CouplingConstantsDiagram';
import { OpticalMetricDiagram } from '../OpticalMetricDiagram';

interface Slide5Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide5Unification({ slideNumber, totalSlides }: Slide5Props) {
  const constants = [
    {
      symbol: 'G_eff',
      name: 'Гравитационная константа',
      formula: 'G_Pl × exp(−2k|S_grav|)',
      description: 'Слабость гравитации относительно других сил',
      color: 'text-blue-400'
    },
    {
      symbol: 'α ≈ 1/137',
      name: 'Постоянная тонкой структуры',
      formula: '|S|_em ≈ ln(137π) ≈ 5',
      description: 'Калибровка по солнечной системе',
      color: 'text-purple-400'
    },
    {
      symbol: 'α_s',
      name: 'Константа сильного взаимодействия',
      formula: 'π / |S|_QCD ln(μ/Λ)',
      description: 'Running coupling → конфайнмент',
      color: 'text-green-400'
    },
    {
      symbol: 'G_F',
      name: 'Константа слабого взаимодействия',
      formula: 'exp(−4k|S|_weak) с |S|_weak ≈ 8–10',
      description: 'Экспоненциальное подавление',
      color: 'text-orange-400'
    }
  ];

  return (
    <Slide
      title="Завершение унификации"
      subtitle="Все фундаментальные константы из одной геометрической аксиомы"
      backgroundImage="https://images.unsplash.com/photo-1762962531310-a51532209ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZXRpbWUlMjBnZW9tZXRyeXxlbnwxfHx8fDE3NjY0NzExMTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Core Axiom */}
        <div className="p-8 bg-gradient-to-br from-cyan-950/50 to-purple-950/50 border border-cyan-500/30 rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="mb-2 text-cyan-300">Единая геометрическая аксиома</h3>
              <p className="text-gray-300 leading-relaxed">
                Warped fractal 5D-метрика с масштабной координатой S и RS-warping exp(−k|S|)
              </p>
            </div>
          </div>
          <div className="p-4 bg-black/40 rounded-lg text-center font-mono text-cyan-300">
            ds² = exp(−2k|S|) η_μν dx^μ dx^ν + dS²
          </div>
        </div>

        {/* Constants Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {constants.map((constant, index) => (
            <div 
              key={index}
              className="p-5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Waves className={`h-5 w-5 ${constant.color}`} />
                <h3 className={constant.color}>{constant.symbol}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">{constant.name}</p>
              <div className="p-2 bg-black/40 rounded font-mono text-sm text-gray-300 mb-2">
                {constant.formula}
              </div>
              <p className="text-sm text-gray-400">{constant.description}</p>
            </div>
          ))}
        </div>

        {/* Mass Hierarchy Chart */}
        <div>
          <MassHierarchyChart />
        </div>

        {/* Coupling Constants Diagram */}
        <div>
          <CouplingConstantsDiagram />
        </div>

        {/* Optical Metric */}
        <div>
          <OpticalMetricDiagram />
        </div>

        {/* Dark Energy */}
        <div className="p-6 bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-500/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-orange-400">Λ_eff — Тёмная энергия</h3>
              <p className="text-gray-300 mb-3 leading-relaxed">
                Эффективная космологическая константа через энтропийное натяжение:
              </p>
              <div className="p-3 bg-black/40 rounded font-mono text-sm text-orange-300 text-center">
                Λ_eff ≈ (S_horizon / Area) × exp(−2k|S_global|)
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Совпадение с DESI 2025 без fine-tuning параметров
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="p-6 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30 rounded-lg text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Boxes className="h-6 w-6 text-purple-400" />
            <h3 className="text-purple-400">Единый механизм</h3>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Все взаимодействия — градиенты dn/dr на разных |S|. Иерархия масс и констант возникает 
            из одной геометрии, без произвольных параметров.
          </p>
        </div>
      </div>
    </Slide>
  );
}