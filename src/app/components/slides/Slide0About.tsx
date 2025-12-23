import { useEffect, useState } from 'react';
import { Slide } from '../Slide';
import { useSlideNavigation } from '../../contexts/SlideNavigationContext';
import { FractalScaleDiagram } from '../FractalScaleDiagram';
import { MassHierarchyChart } from '../MassHierarchyChart';
import { DarkEnergyEvolution } from '../DarkEnergyEvolution';

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
        {/* Hero Section with Image */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Что такое SIFS?
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  <strong className="text-white">Scale-Invariant Fractal Spacetime</strong> — это унифицированная 
                  геометрическая теория поля, которая объединяет гравитацию, квантовую механику и космологию 
                  через фрактальную геометрию 5-мерного пространства.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  Наша 4D-вселенная — это <span className="text-cyan-400 font-mono">3-брана</span> в 5-мерном 
                  фрактальном bulk-пространстве, где пятая координата <span className="text-purple-400 font-mono">S</span> 
                  представляет <strong>физический масштаб</strong>.
                </p>
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
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => goToSlide(1)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              📚 Документация
            </button>
            <button
              onClick={() => goToSlide(6)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              🧮 Расчёты
            </button>
            <button
              onClick={() => goToSlide(5)}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 rounded-lg text-white font-semibold hover:from-pink-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              🔮 Предсказания
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
