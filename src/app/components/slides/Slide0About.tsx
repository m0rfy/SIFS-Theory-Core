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
          <Tabs defaultValue="conceptual" className="w-full max-w-5xl">
            <div className="flex justify-center mb-6 overflow-x-auto">
              <TabsList className="bg-slate-900/80 border border-slate-700 min-w-max p-1 h-auto">
                <TabsTrigger value="beginner" className="px-4 py-2 text-sm data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  🌱 Просто о сложном
                </TabsTrigger>
                <TabsTrigger value="conceptual" className="px-4 py-2 text-sm data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
                  🧠 Популярная наука
                </TabsTrigger>
                <TabsTrigger value="mathematical" className="px-4 py-2 text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  📐 Строгий формализм
                </TabsTrigger>
                <TabsTrigger value="technical" className="px-4 py-2 text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  💻 Для разработчиков
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 1. Beginner Content - Analogies (Google Maps) */}
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
            </TabsContent>

            {/* 2. Conceptual Content - Deep Logic, No Formulas */}
            <TabsContent value="conceptual" className="space-y-8">
               <div className={`p-8 bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 rounded-xl backdrop-blur-sm`}>
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">
                     Логика Единой Теории Поля
                  </h2>
                  <p className="text-gray-200 text-lg leading-relaxed text-center">
                    SIFS Theory предлагает геометрическую унификацию всех фундаментальных взаимодействий, основываясь на принципе 
                    масштабной инвариантности (фрактальности) пространства-времени.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-black/40 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                      <h4 className="text-cyan-400 font-bold mb-3 text-xl">5D Пространство (Bulk)</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Мы живем не в 4-мерном мире, а на 4-мерной "мебране" (бране), которая плывет в 5-мерном объеме (Bulk). 
                        Пятое измерение — это не просто дополнительная координата "влево-вправо", это координата <strong>Масштаба</strong>. 
                        Движение вдоль пятого измерения равносильно изменению масштаба наблюдения (от атомов к галактикам).
                      </p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                      <h4 className="text-cyan-400 font-bold mb-3 text-xl">Иерархия Сил</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Почему гравитация такая слабая? Магнит может поднять скрепку против притяжения всей Земли. 
                        В теории SIFS гравитация кажется слабой только на нашем масштабе, потому что большая часть её "силы" 
                        утекает в пятое измерение. На микромасштабе (внутри атома) гравитация становится такой же сильной, 
                        как и другие взаимодействия.
                      </p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                      <h4 className="text-cyan-400 font-bold mb-3 text-xl">Природа Протона</h4>
                      <p className="text-gray-300 leading-relaxed">
                        В стандартной физике протон — это частица из кварков. В SIFS протон — это микроскопическая черная дыра Керра-Ньюмана. 
                        Её масса точно совпадает с предсказаниями для черной дыры такого радиуса, если учесть поправки на кривизну 
                        5-мерного пространства. Это решает проблему "тонкой настройки" массы частиц.
                      </p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                      <h4 className="text-cyan-400 font-bold mb-3 text-xl">Темная Энергия</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Вселенная расширяется с ускорением не из-за мифической "темной энергии", а из-за дрейфа нашей браны 
                        вдоль масштабной координаты. Это геометрический эффект, похожий на то, как меридианы на глобусе 
                        расходятся при движении к экватору.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics for Enthusiasts */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg backdrop-blur-sm"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Visualizations without heavy math */}
              <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">
                  Визуализация Структуры
                </h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="p-4 bg-white/5 rounded-lg">
                     <h4 className="text-center mb-4 text-gray-300">Фрактальная Иерархия</h4>
                     <MassHierarchyChart />
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                     <h4 className="text-center mb-4 text-gray-300">Эволюция Энергии</h4>
                     <DarkEnergyEvolution />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 3. Mathematical Content - Pure Formulas */}
            <TabsContent value="mathematical" className="space-y-8">
               <div className="p-8 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-xl backdrop-blur-sm">
                 <h2 className="text-2xl font-mono text-blue-400 mb-6 border-b border-slate-800 pb-4">
                   SIFS Formalism: Core Equations
                 </h2>
                 
                 <div className="grid md:grid-cols-2 gap-8 font-mono text-sm">
                   <div className="space-y-6">
                     <div className="p-4 bg-black border border-slate-800 rounded">
                       <p className="text-slate-500 mb-2">// 5D Action Integral (Einstein-Hilbert + Brane)</p>
                       <div className="text-gray-300 overflow-x-auto whitespace-pre">
                         S = ∫ d⁵x √(-G) [ M³ (R - 2Λ) + δ(y) L_brane ]
                       </div>
                     </div>

                     <div className="p-4 bg-black border border-slate-800 rounded">
                       <p className="text-slate-500 mb-2">// Warp Factor & Metric Solution</p>
                       <div className="text-gray-300 overflow-x-auto whitespace-pre">
                         ds² = e^(-2k|y|) η_μν dx^μ dx^ν + dy²
                         <br/>
                         Ω(y) = exp(-k|y|)
                       </div>
                     </div>

                     <div className="p-4 bg-black border border-slate-800 rounded">
                       <p className="text-slate-500 mb-2">// Mass Hierarchy (Planck vs Proton)</p>
                       <div className="text-gray-300 overflow-x-auto whitespace-pre">
                         m_proton ≈ M_Planck * exp(-kπR_c)
                         <br/>
                         10^-27 kg ≈ 10^-8 kg * 10^-19
                       </div>
                     </div>
                   </div>

                   <div className="space-y-6">
                      <div className="p-4 bg-black border border-slate-800 rounded">
                       <p className="text-slate-500 mb-2">// Fine Structure Constant Derivation</p>
                       <div className="text-gray-300 overflow-x-auto whitespace-pre">
                         α = (e² / 4πε₀ħc) = f_geom(Vol_S3)
                         <br/>
                         α ≈ 1/137.035999 (Predicted)
                       </div>
                     </div>

                     <div className="p-4 bg-black border border-slate-800 rounded">
                       <p className="text-slate-500 mb-2">// Friedmann Equation Modification (Dark Energy)</p>
                       <div className="text-gray-300 overflow-x-auto whitespace-pre">
                         H² = (8πG/3)ρ (1 + ρ/2λ) + Λ_eff + C/a⁴
                         <br/>
                         Λ_eff(t) = Λ₀ + β * H(t) * dS/dt
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-slate-800">
                    <h3 className="text-xl font-mono text-blue-400 mb-4">Interactive Derivations</h3>
                    <InteractiveCalculations />
                 </div>
               </div>
            </TabsContent>

            {/* 4. Technical Content (Developers) */}
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
                <a href="https://github.com/m0rfy/SIFS-Theory-Core" target="_blank" rel="noopener noreferrer" className="block p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
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
