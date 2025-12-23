import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { goToSlide } = useSlideNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: t('about.stats.predictions'), value: '27', color: 'text-blue-400', delay: 0 },
    { label: t('about.stats.confirmed'), value: '11', color: 'text-green-400', delay: 100 },
    { label: t('about.stats.constants'), value: '8', color: 'text-purple-400', delay: 200 },
    { label: t('about.stats.deviation'), value: '>4σ', color: 'text-orange-400', delay: 300 },
  ];

  const achievements = [
    {
      icon: '🌌',
      title: t('about.cards.unification.title'),
      description: t('about.cards.unification.desc'),
      gradient: 'from-blue-600/20 to-cyan-600/20',
      border: 'border-blue-500/30'
    },
    {
      icon: '🔬',
      title: t('about.cards.fractal.title'),
      description: t('about.cards.fractal.desc'),
      gradient: 'from-purple-600/20 to-pink-600/20',
      border: 'border-purple-500/30'
    },
    {
      icon: '⚛️',
      title: t('about.cards.micro.title'),
      description: t('about.cards.micro.desc'),
      gradient: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-500/30'
    },
    {
      icon: '📊',
      title: t('about.cards.data.title'),
      description: t('about.cards.data.desc'),
      gradient: 'from-orange-600/20 to-red-600/20',
      border: 'border-orange-500/30'
    },
  ];

  return (
    <Slide
      title={t('about.title')}
      subtitle={t('about.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-8">
        {/* Project Overview - Clear Description */}
        <div className={`p-8 bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-pink-950/60 border border-indigo-500/30 rounded-xl backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {t('about.main_title')}
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              <strong className="text-white">{t('about.description_prefix')}</strong> {t('about.description_body')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
              <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                <h4 className="text-cyan-400 font-semibold mb-3 text-lg">{t('about.main_idea_title')}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {t('about.main_idea_text1')}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {t('about.main_idea_text2')}
                </p>
              </div>
              <div className="p-5 bg-black/40 rounded-lg border border-white/10">
                <h4 className="text-purple-400 font-semibold mb-3 text-lg">{t('about.calculations_title')}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {t('about.calculations_text1')}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {t('about.calculations_text2')}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-5 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg text-left">
              <h4 className="text-white font-semibold mb-3 text-lg">{t('about.scientific_significance')}</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="text-cyan-400 mb-2">{t('about.unification.title')}</h5>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.unification.text')}
                  </p>
                </div>
                <div>
                  <h5 className="text-purple-400 mb-2">{t('about.predictions.title')}</h5>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.predictions.text')}
                  </p>
                </div>
                <div>
                  <h5 className="text-green-400 mb-2">{t('about.confirmations.title')}</h5>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.confirmations.text')}
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
                  {t('about.key_achievements')}
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      {t('about.achievements_list.mass_hierarchy')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      {t('about.achievements_list.constants')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      {t('about.achievements_list.desi')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      {t('about.achievements_list.predictions_count')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      {t('about.achievements_list.paradoxes')}
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
                <h4 className="text-xl font-bold text-white mb-2">{t('about.fractal_universe.title')}</h4>
                <p className="text-gray-300 text-sm">
                  {t('about.fractal_universe.subtitle')}
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
              {t('about.main_title').replace('🌌', '').trim()} {/* Reuse title without icon if needed, or create new key */}
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
                <h4 className="text-white font-semibold">{t('about.footer.author_title')}</h4>
                <p className="text-cyan-400 font-mono">Vorobey</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {t('about.footer.author_desc')}
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <h4 className="text-white font-semibold">{t('about.footer.release_title')}</h4>
                <p className="text-purple-400 font-mono">22 декабря 2025</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {t('about.footer.release_desc')}
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-950/30 to-emerald-950/30 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                📜
              </div>
              <div>
                <h4 className="text-white font-semibold">{t('about.footer.license_title')}</h4>
                <p className="text-green-400 font-mono">CC BY 4.0</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {t('about.footer.license_desc')}
            </p>
          </div>
        </div>

        {/* Interactive Calculations Section */}
        <div className={`space-y-6 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="p-6 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('about.interactive_calculations.title')}
            </h3>
            <p className="text-gray-300 text-center mb-2 max-w-3xl mx-auto leading-relaxed">
              {t('about.interactive_calculations.text1')}
            </p>
            <p className="text-gray-400 text-center mb-6 max-w-3xl mx-auto text-sm">
              {t('about.interactive_calculations.text2')}
            </p>
            <InteractiveCalculations />
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center p-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('about.explore.title')}
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('about.explore.subtitle')}
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-semibold mb-2 text-white">{t('about.explore.docs.title')}</h4>
              <p className="text-gray-400 text-sm mb-3">{t('about.explore.docs.desc')}</p>
              <p className="text-blue-400 text-xs group-hover:text-blue-300">{t('about.explore.links.open_docs')}</p>
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/calculations/proton-mass.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">🧮</div>
              <h4 className="font-semibold mb-2 text-white">{t('about.explore.calcs.title')}</h4>
              <p className="text-gray-400 text-sm mb-3">{t('about.explore.calcs.desc')}</p>
              <p className="text-purple-400 text-xs group-hover:text-purple-300">{t('about.explore.links.open_calcs')}</p>
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/predictions/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gradient-to-r from-pink-600/20 to-orange-600/20 border border-pink-500/30 rounded-lg text-white hover:from-pink-500/30 hover:to-orange-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer text-left no-underline"
            >
              <div className="text-3xl mb-2">🔮</div>
              <h4 className="font-semibold mb-2 text-white">{t('about.explore.preds.title')}</h4>
              <p className="text-gray-400 text-sm mb-3">{t('about.explore.preds.desc')}</p>
              <p className="text-pink-400 text-xs group-hover:text-pink-300">{t('about.explore.links.open_preds')}</p>
            </a>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/theory/overview.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              {t('about.footer.overview')}
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/data/desi-2025.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              {t('about.footer.desi')}
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/defense/stress-testing-report.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              {t('about.footer.defense')}
            </a>
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all text-sm no-underline"
            >
              {t('about.footer.github')}
            </a>
          </div>
        </div>
      </div>
    </Slide>
  );
}
