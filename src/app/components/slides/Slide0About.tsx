import { useEffect, useState } from 'react';
import { Slide } from '../Slide';
import { useSlideNavigation } from '../../contexts/SlideNavigationContext';
import { FractalScaleDiagram } from '../FractalScaleDiagram';
import { MassHierarchyChart } from '../MassHierarchyChart';
import { DarkEnergyEvolution } from '../DarkEnergyEvolution';
import { InteractiveCalculations } from '../InteractiveCalculations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Slide0Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide0About({ slideNumber, totalSlides }: Slide0Props) {
  const { goToSlide } = useSlideNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Предсказаний', value: '27', color: 'text-blue-400', delay: 0 },
    { label: 'Подтверждено', value: '11', color: 'text-green-400', delay: 100 },
    { label: 'Констант выведено', value: '8', color: 'text-purple-400', delay: 200 },
    { label: 'Отклонение от ΛCDM', value: '>4σ', color: 'text-orange-400', delay: 300 },
  ];

  const achievements = [
    {
      icon: '🌌',
      title: 'Унификация',
      description: 'Гравитация + Квантовая механика + Космология',
      gradient: 'from-blue-600/20 to-cyan-600/20',
      border: 'border-blue-500/30'
    },
    {
      icon: '🔬',
      title: 'Фрактальная геометрия',
      description: '5D пространство с масштабной координатой S',
      gradient: 'from-purple-600/20 to-pink-600/20',
      border: 'border-purple-500/30'
    },
    {
      icon: '⚛️',
      title: 'Микро-сингулярности',
      description: 'Протоны как заряженные вращающиеся ЧД',
      gradient: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-500/30'
    },
    {
      icon: '📊',
      title: 'Наблюдательные данные',
      description: 'DESI 2025, Euclid, JWST, EHT',
      gradient: 'from-orange-600/20 to-red-600/20',
      border: 'border-orange-500/30'
    },
  ];

  return (
    <Slide
      title="О проекте SIFS Theory"
      subtitle="Scale-Invariant Fractal Spacetime — Унификация физики через фрактальную геометрию"
      backgroundImage="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <Tabs defaultValue="scientific" className="w-full max-w-5xl">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-slate-900/80 border border-slate-700">
                <TabsTrigger value="beginner" className="px-6 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  🌱 Просто о сложном
                </TabsTrigger>
                <TabsTrigger value="scientific" className="px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  🔬 Научный подход
                </TabsTrigger>
                <TabsTrigger value="technical" className="px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  💻 Для разработчиков
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Beginner Content */}
            <TabsContent value="beginner" className="space-y-6">
              <div className="p-8 bg-gradient-to-r from-green-950/60 to-emerald-950/60 border border-green-500/30 rounded-xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-green-400 mb-6">Вселенная как Карта Google</h2>
                <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-200">
                  <div className="space-y-4">
                    <p>
                      Представьте, что вы смотрите на карту в телефоне. Когда вы приближаете карту (<strong>Zoom In</strong>), 
                      вы видите дома, машины, людей. Это наш микромир: атомы, частицы.
                    </p>
                    <p>
                      Когда вы отдаляете карту (<strong>Zoom Out</strong>), дома исчезают, появляются города, страны, континенты. 
                      Это наш макромир: планеты, звезды, галактики.
                    </p>
                    <div className="p-4 bg-black/30 rounded-lg border border-white/10 mt-4">
                      <p className="text-sm">
                        🧐 <strong>Проблема современной науки:</strong> У физиков есть "карта города" (Квантовая механика) и 
                        "карта мира" (Теория Относительности), но они <strong>не склеиваются</strong> друг с другом.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Решение SIFS</h3>
                    <p>
                      Теория SIFS говорит: Вселенная — это одна большая фрактальная карта. Мы добавляем 5-е измерение — <strong>Масштаб</strong>.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✅</span>
                        <span>Все силы природы — это одно и то же явление, просто видимое на разном "зуме".</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✅</span>
                        <span>Протон — это просто маленькая Черная Дыра.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✅</span>
                        <span>Темная энергия — это не магия, а эффект растяжения самой карты со временем.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-bold text-white mb-2">Фрактальность</h3>
                  <p className="text-gray-400">
                    Как береговая линия выглядит одинаково извилисто с любой высоты, так и законы физики повторяют сами себя на разных масштабах.
                  </p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="text-4xl mb-4">🎈</div>
                  <h3 className="text-xl font-bold text-white mb-2">Расширение</h3>
                  <p className="text-gray-400">
                    Вселенная не просто разлетается в разные стороны, она "растет" внутрь и наружу одновременно, меняя масштаб сетки пространства.
                  </p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="text-4xl mb-4">🔋</div>
                  <h3 className="text-xl font-bold text-white mb-2">Энергия</h3>
                  <p className="text-gray-400">
                    Вакуум — это не пустота, а океан энергии. Материя — это просто "пузырьки" на поверхности этого океана.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Scientific Content (Original) */}
            <TabsContent value="scientific" className="space-y-8">
               <div className={`p-8 bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-pink-950/60 border border-indigo-500/30 rounded-xl backdrop-blur-sm`}>
                <div className="max-w-4xl mx-auto text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    🌌 О проекте SIFS Theory
                  </h2>
                  <p className="text-gray-200 text-lg leading-relaxed mb-6">
                    <strong className="text-white">Scale-Invariant Fractal Spacetime (SIFS)</strong> — это унифицированная 
                    геометрическая теория поля, которая <strong className="text-cyan-400">объединяет гравитацию, квантовую механику и космологию</strong> 
                    через фрактальную геометрию 5-мерного пространства.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
                    <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                      <h4 className="text-cyan-400 font-semibold mb-3 text-lg">🎯 Главная идея</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Наша 4D-вселенная — это <span className="text-cyan-400 font-mono">3-брана</span> в 5-мерном 
                        фрактальном bulk-пространстве (модель Randall-Sundrum). Пятая координата <span className="text-purple-400 font-mono">S</span> 
                        представляет <strong>физический масштаб</strong>.
                      </p>
                    </div>
                    <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                      <h4 className="text-purple-400 font-semibold mb-3 text-lg">📊 Что рассчитывается?</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        <strong>Все фундаментальные константы</strong> (G, α, α_s, G_F) выводятся из одной геометрической аксиомы 
                        без свободных параметров.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg backdrop-blur-sm transition-all duration-700 ${
                      statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${stat.delay}ms` }}
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Concepts with Diagrams */}
              <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ключевые концепции теории
                </h3>
                <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
                  <div className="lg:col-span-1"><FractalScaleDiagram /></div>
                  <div className="lg:col-span-1"><MassHierarchyChart /></div>
                  <div className="lg:col-span-1"><DarkEnergyEvolution /></div>
                </div>
              </div>
              
              {/* Interactive Calculations */}
              <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
                 <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🧮 Интерактивные расчёты
                </h3>
                <InteractiveCalculations />
              </div>
            </TabsContent>

            {/* Technical (Dev) Content */}
            <TabsContent value="technical" className="space-y-6">
              <div className="p-8 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30 rounded-xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-purple-400 mb-6 font-mono">System Architecture</h2>
                <div className="grid md:grid-cols-2 gap-8 text-sm font-mono text-gray-300">
                  <div className="space-y-4">
                    <h3 className="text-white text-lg">Tech Stack</h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><strong>Core:</strong> React 18 + TypeScript</li>
                      <li><strong>Build:</strong> Vite 6 (ESM High Performance)</li>
                      <li><strong>Styling:</strong> TailwindCSS 4 + Framer Motion</li>
                      <li><strong>Visualization:</strong> HTML5 Canvas (Physics Engine) + Recharts</li>
                      <li><strong>Deploy:</strong> GitHub Pages (Automated Workflow)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-white text-lg">Implementation Details</h3>
                    <p>
                      The physics engine implements real-time simulation of vacuum energy recalibration. 
                      Metric tensor perturbations are calculated using a simplified discrete element method (DEM) 
                      on a 2D lattice grid.
                    </p>
                    <div className="p-4 bg-black/50 rounded border border-purple-500/20 overflow-x-auto">
                      <pre className="text-xs text-purple-300">
{`// Example: Metric Tensor Update
const calculateMetricStress = (S: number, Mass: number) => {
  // S = Scale coordinate
  const warpingFactor = Math.exp(-k * Math.abs(S));
  return (Mass / PlanckMass) * warpingFactor;
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <a href="https://github.com/m0rfy/SIFS-Theory-Core" target="_blank" rel="noopener" className="block p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                  <h3 className="font-bold text-white mb-2">📁 Repository</h3>
                  <p className="text-gray-400 text-sm">Access the full source code, documentation, and mathematical proofs.</p>
                </a>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white mb-2">⚡ Performance</h3>
                  <p className="text-gray-400 text-sm">Optimized for 60FPS physics simulations using React refs and requestAnimationFrame loop outside React render cycle.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white mb-2">🧪 Testing</h3>
                  <p className="text-gray-400 text-sm">Unit tests for physical constants calculations to ensure 99.9% accuracy against CODATA 2018/2022 values.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action (Shared) */}
        <div className={`text-center p-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-xl backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Исследуйте теорию SIFS
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
             Используйте стрелки на клавиатуре для навигации по слайдам презентации
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              🔗 GitHub
            </a>
          </div>
        </div>
      </div>
    </Slide>
  );
}
