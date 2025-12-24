import { Slide } from '../Slide';
import { FractalScaleDiagram } from '../FractalScaleDiagram';

interface Slide1bProps {
  slideNumber: number;
  totalSlides: number;
}

export function Slide1bFractal({ slideNumber, totalSlides }: Slide1bProps) {
  return (
    <Slide
      title="Фрактальная структура пространства-времени"
      subtitle="Принцип Уробороса: от Планка до Хаббла"
      backgroundImage="https://images.unsplash.com/photo-1728675437273-d83d4cfaf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFjdGFsJTIwbWFuZGVsYnJvdCUyMHNldHxlbnwxfHx8fDE3NjY0NzExMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Main Diagram */}
        <FractalScaleDiagram />

        <div className="flex flex-col items-center justify-center my-6 p-4 bg-black/40 rounded-lg border border-purple-500/20">
           <h4 className="text-purple-300 mb-2 text-sm">Theoretical Scaling Law Validation</h4>
           <img src="/images/fractal_hierarchy.png" alt="Fractal Hierarchy Plot" className="rounded-lg border border-purple-500/50 shadow-2xl max-w-2xl w-full hover:scale-105 transition-transform duration-500" />
           <p className="text-center text-gray-400 text-xs mt-2 font-mono">Log-log plot showing linearity across 60 orders of magnitude</p>
        </div>

        {/* Key Images */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-lg border border-purple-500/30 group">
            <img 
              src="https://images.unsplash.com/photo-1540974195715-681a4872dd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0aWNsZSUyMHBoeXNpY3MlMjBjb2xsaXNpb258ZW58MXx8fHwxNzY2NDcxNDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Particle physics"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-4">
              <div>
                <h5 className="text-white mb-1">Квантовый уровень</h5>
                <p className="text-gray-400 text-sm">|S| ≈ 0-15</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 group">
            <img 
              src="https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzZSUyMGV4cGFuc2lvbiUyMGNvc21pY3xlbnwxfHx8fDE3NjY0NzE0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Universe expansion"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-4">
              <div>
                <h5 className="text-white mb-1">Космологический уровень</h5>
                <p className="text-gray-400 text-sm">|S| ≈ 20-28</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-green-500/30 group">
            <img 
              src="https://images.unsplash.com/photo-1585423543780-989fb67f6321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF2aXRhdGlvbmFsJTIwd2F2ZXMlMjBzcGFjZXxlbnwxfHx8fDE3NjY0NzE0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Gravitational waves"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-4">
              <div>
                <h5 className="text-white mb-1">Гравитационные волны</h5>
                <p className="text-gray-400 text-sm">Связь масштабов</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Framework */}
        <div className="p-6 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border border-indigo-500/30 rounded-lg">
          <h4 className="text-indigo-400 mb-4">Математическая формулировка</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-lg">
              <h5 className="text-cyan-400 text-sm mb-2">Масштабное преобразование</h5>
              <div className="font-mono text-xs text-gray-300 space-y-1">
                <div>S → S + δS</div>
                <div>λ → λ × exp(δS)</div>
                <div>M → M × exp(−δS)</div>
              </div>
            </div>
            
            <div className="p-4 bg-black/40 rounded-lg">
              <h5 className="text-purple-400 text-sm mb-2">Действие в bulk</h5>
              <div className="font-mono text-xs text-gray-300 space-y-1">
                <div>S = ∫ d⁴x dS √|g| R</div>
                <div>g_μν = exp(−2k|S|) η_μν</div>
                <div>R = R₄ + ∂²(warping)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="p-6 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30 rounded-lg">
          <h4 className="text-purple-400 mb-3 text-center">Центральная идея SIFS</h4>
          <p className="text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            Каждая "частица" — это не точка, а сингулярность в 5D-bulk, протянутая вдоль координаты S. 
            То, что мы наблюдаем как массу и заряд, — это 4D-проекция глубинной 5D-геометрии. 
            Масштаб не абстракция, а физическое измерение.
          </p>
        </div>
      </div>
    </Slide>
  );
}
