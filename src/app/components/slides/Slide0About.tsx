import { useEffect, useState } from 'react';
import { Slide } from '../Slide';
import { useSlideNavigation } from '../../contexts/SlideNavigationContext';
import { FractalScaleDiagram } from '../FractalScaleDiagram';
import { MassHierarchyChart } from '../MassHierarchyChart';
import { DarkEnergyEvolution } from '../DarkEnergyEvolution';
import { InteractiveCalculations } from '../InteractiveCalculations';

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
      <div className="space-y-8">
        {/* Project Overview - Clear Description */}
        <div className={`p-8 bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-pink-950/60 border border-indigo-500/30 rounded-xl backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🌌 О проекте SIFS Theory
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              <strong className="text-white">Scale-Invariant Fractal Spacetime (SIFS)</strong> — это унифицированная 
              геометрическая теория поля, которая <strong className="text-cyan-400">объединяет гравитацию, квантовую механику и космологию</strong> 
              через фрактальную геометрию 5-мерного пространства. Теория решает фундаментальные проблемы современной физики: 
              иерархию масс, природу тёмной энергии, стабильность протона и информационный парадокс чёрных дыр.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
              <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                <h4 className="text-cyan-400 font-semibold mb-3 text-lg">🎯 Главная идея</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Наша 4D-вселенная — это <span className="text-cyan-400 font-mono">3-брана</span> в 5-мерном 
                  фрактальном bulk-пространстве (модель Randall-Sundrum). Пятая координата <span className="text-purple-400 font-mono">S</span> 
                  представляет <strong>физический масштаб</strong> — не абстрактный параметр, а реальную геометрическую координату.
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Масштабная координата охватывает весь диапазон от планковского масштаба (10⁻³⁵ м) до хаббловского (10²⁶ м), 
                  создавая фрактальную самоподобную структуру пространства-времени. Экспоненциальное warping метрики 
                  exp(−k|S|) естественно объясняет, почему гравитация в 10³⁸ раз слабее сильного взаимодействия.
                </p>
              </div>
              <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                <h4 className="text-purple-400 font-semibold mb-3 text-lg">📊 Что рассчитывается?</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  <strong>Все фундаментальные константы</strong> (G, α, α_s, G_F) выводятся из одной геометрической аксиомы 
                  без свободных параметров. <strong>Масса протона</strong> появляется автоматически как масштабно-подавленная 
                  планковская масса. <strong>Тёмная энергия</strong> объясняется дрейфом глобальной масштабной координаты.
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Теория делает 27 проверяемых предсказаний, из которых 11 уже подтверждено наблюдательными данными (DESI 2025, 
                  Euclid, JWST, EHT). Ключевое достижение — объяснение evolving dark energy с отклонением {'>'}4σ от стандартной 
                  модели ΛCDM, что согласуется с предсказаниями SIFS о дрейфе масштабной координаты.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-5 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg text-left">
              <h4 className="text-white font-semibold mb-3 text-lg">🔬 Научная значимость</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="text-cyan-400 mb-2">Унификация</h5>
                  <p className="text-gray-300 leading-relaxed">
                    Единая геометрическая основа для всех взаимодействий. Гравитация, электромагнетизм, сильное и слабое 
                    взаимодействия — все являются градиентами показателя преломления вакуума на разных масштабах.
                  </p>
                </div>
                <div>
                  <h5 className="text-purple-400 mb-2">Предсказания</h5>
                  <p className="text-gray-300 leading-relaxed">
                    27 проверяемых предсказаний с конкретными численными значениями. Предсказания для коллайдеров (LHC, FCC), 
                    гравитационных волн (LIGO, Virgo), космологии (CMB, структурообразование).
                  </p>
                </div>
                <div>
                  <h5 className="text-green-400 mb-2">Подтверждения</h5>
                  <p className="text-gray-300 leading-relaxed">
                    DESI 2025: evolving dark energy ({'>'}4σ). Euclid/JWST: ранние массивные структуры. EHT: поляризационные 
                    флипы в M87*. Все согласуется с теорией без fine-tuning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Image */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ключевые достижения теории
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">Иерархия масс:</strong> Объяснение от планковского масштаба (10⁻³⁵ м) 
                      до хаббловского (10²⁶ м) из единой геометрической аксиомы. Масса протона появляется автоматически 
                      как масштабно-подавленная планковская масса без введения её как параметра.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">8 фундаментальных констант выведено:</strong> Гравитационная константа G, 
                      постоянная тонкой структуры α, константа сильного взаимодействия α_s, константа Ферми G_F, космологическая 
                      константа Λ, и другие — все из одной геометрии без свободных параметров.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">DESI 2025:</strong> Evolving dark energy с отклонением {'>'}4σ от стандартной 
                      модели ΛCDM полностью согласуется с предсказаниями SIFS о дрейфе глобальной масштабной координаты. 
                      Это не совпадение, а следствие геометрии.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">27 проверяемых предсказаний:</strong> 11 уже подтверждено наблюдательными 
                      данными (DESI, Euclid, JWST, EHT), 4 находятся в процессе проверки, 12 ожидают экспериментальной проверки 
                      на коллайдерах и гравитационно-волновых детекторах.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">Решение парадоксов:</strong> Информационный парадокс чёрных дыр решается через 
                      ER=EPR соответствие. Стабильность протона объясняется квантовой запутанностью и замороженным временем на 
                      эффективном горизонте.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Image Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
                alt="Fractal Universe"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">Фрактальная структура Вселенной</h4>
                <p className="text-gray-300 text-sm">
                  Самоподобие от планковского масштаба (10⁻³⁵ м) до хаббловского (10²⁶ м)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-gradient-to-br ${achievement.gradient} border ${achievement.border} rounded-xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h4 className="text-white font-semibold mb-2">{achievement.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
            </div>
          ))}
        </div>

        {/* Key Concepts with Diagrams */}
        <div className={`space-y-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ключевые концепции теории
            </h3>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
              {/* Fractal Scale Diagram */}
              <div className="lg:col-span-1 transform transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <FractalScaleDiagram />
                </div>
              </div>

              {/* Mass Hierarchy Chart */}
              <div className="lg:col-span-1 transform transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <MassHierarchyChart />
                </div>
              </div>

              {/* Dark Energy Evolution */}
              <div className="lg:col-span-1 transform transition-all duration-500 hover:scale-105">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <DarkEnergyEvolution />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author & License Info */}
        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="p-6 bg-gradient-to-br from-blue-950/30 to-cyan-950/30 border border-blue-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h4 className="text-white font-semibold">Автор архитектуры</h4>
                <p className="text-cyan-400 font-mono">Vorobey</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Разработка теоретической основы и математического формализма
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <h4 className="text-white font-semibold">Дата релиза</h4>
                <p className="text-purple-400 font-mono">22 декабря 2025</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Первая публичная версия теории с полной документацией
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-950/30 to-emerald-950/30 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                📜
              </div>
              <div>
                <h4 className="text-white font-semibold">Лицензия</h4>
                <p className="text-green-400 font-mono">CC BY 4.0</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Свободное использование с указанием авторства
            </p>
          </div>
        </div>

        {/* Interactive Calculations Section */}
        <div className={`space-y-6 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🧮 Интерактивные расчёты
            </h3>
            <p className="text-gray-300 text-center mb-2 max-w-3xl mx-auto leading-relaxed">
              Кликните на любой расчёт ниже, чтобы увидеть пошаговые вычисления с формулами, численными значениями и физической интерпретацией. 
              Все результаты получены из единой геометрической аксиомы (warped 5D-метрика с масштабной координатой S) без свободных параметров.
            </p>
            <p className="text-gray-400 text-center mb-6 max-w-3xl mx-auto text-sm">
              Каждый расчёт показывает: исходные формулы, пошаговые вычисления с реальными физическими константами, полученные результаты 
              и их физическую интерпретацию в контексте теории SIFS. Это не нумерология — это следствия геометрии.
            </p>
            <InteractiveCalculations />
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center p-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Исследуйте теорию SIFS
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Изучите документацию, расчёты, предсказания и наблюдательные данные, подтверждающие теорию
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-semibold mb-2 text-white">Документация</h4>
              <p className="text-gray-400 text-sm mb-3">Полная теоретическая база, математический формализм, уравнения движения, RS2-геометрия, фрактальная структура</p>
              <p className="text-blue-400 text-xs group-hover:text-blue-300">Открыть документацию →</p>
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/calculations/proton-mass.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">🧮</div>
              <h4 className="font-semibold mb-2 text-white">Расчёты</h4>
              <p className="text-gray-400 text-sm mb-3">Детальные вычисления: масса протона из геометрии, константы связи (G, α, α_s, G_F), тёмная энергия, иерархия масс</p>
              <p className="text-purple-400 text-xs group-hover:text-purple-300">Открыть расчёты →</p>
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/predictions/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-pink-600/20 to-orange-600/20 border border-pink-500/30 rounded-lg text-white hover:from-pink-500/30 hover:to-orange-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">🔮</div>
              <h4 className="font-semibold mb-2 text-white">Предсказания</h4>
              <p className="text-gray-400 text-sm mb-3">27 проверяемых предсказаний с численными значениями: коллайдеры, гравитационные волны, космология, астрофизика. 11 подтверждено.</p>
              <p className="text-pink-400 text-xs group-hover:text-pink-300">Открыть предсказания →</p>
            </a>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/theory/overview.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              📖 Обзор теории
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/data/desi-2025.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              📊 DESI 2025 данные
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/defense/stress-testing-report.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              🛡️ Защита теории
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              🔗 GitHub репозиторий
            </a>
          </div>
        </div>
      </div>
    </Slide>
  );
}
