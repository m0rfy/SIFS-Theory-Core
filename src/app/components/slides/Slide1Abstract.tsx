import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';

interface Slide1Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide1Abstract({ slideNumber, totalSlides }: Slide1Props) {
  const { t } = useTranslation();

  return (
    <Slide
      title={t('abstract.title')}
      subtitle={t('abstract.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1728675437273-d83d4cfaf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFjdGFsJTIwbWFuZGVsYnJvdCUyMHNldHxlbnwxfHx8fDE3NjY0NzExMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('abstract.main_title')}
          </h3>
          <p className="text-gray-200 text-center leading-relaxed mb-4">
            <strong className="text-white">{t('abstract.intro.prefix')}</strong> {t('abstract.intro.body')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-blue-400 text-lg font-semibold">{t('abstract.concepts.main.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              {t('abstract.concepts.main.text')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('abstract.concepts.main.subtext')}
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-purple-400 text-lg font-semibold">{t('abstract.concepts.particles.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              {t('abstract.concepts.particles.text')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('abstract.concepts.particles.subtext')}
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-green-400 text-lg font-semibold">{t('abstract.concepts.unification.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              {t('abstract.concepts.unification.text')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('abstract.concepts.unification.subtext')}
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-orange-400 text-lg font-semibold">{t('abstract.concepts.ouroboros.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              {t('abstract.concepts.ouroboros.text')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('abstract.concepts.ouroboros.subtext')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-gray-400">
            {t('abstract.footer')}
          </p>
        </div>
      </div>
    </Slide>
  );
}
