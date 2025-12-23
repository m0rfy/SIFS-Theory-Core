import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';
import { CheckCircle2, TrendingUp, Lightbulb, Rocket } from 'lucide-react';

interface Slide7Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide7Conclusion({ slideNumber, totalSlides }: Slide7Props) {
  const { t } = useTranslation();

  return (
    <Slide
      title={t('conclusion_slide.title')}
      subtitle={t('conclusion_slide.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1709141428202-e21518e6481f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBjb3NtaWMlMjB3ZWJ8ZW58MXx8fHwxNzY2NDcxMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Main Achievement */}
        <div className="p-8 bg-gradient-to-br from-green-950/50 to-emerald-950/50 border border-green-500/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-green-500/20 rounded-lg">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <div>
              <h3 className="mb-3 text-green-400">{t('conclusion_slide.achievement.title')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('conclusion_slide.achievement.text')}
              </p>
            </div>
          </div>
        </div>

        {/* Key Points Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <h3 className="text-blue-400">{t('conclusion_slide.points.confirmations.title')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('conclusion_slide.points.confirmations.text')}
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-purple-400" />
              <h3 className="text-purple-400">{t('conclusion_slide.points.solutions.title')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('conclusion_slide.points.solutions.text')}
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-6 w-6 text-green-400" />
              <h3 className="text-green-400">{t('conclusion_slide.points.perspectives.title')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('conclusion_slide.points.perspectives.text')}
            </p>
          </div>
        </div>

        {/* Future Tests */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 rounded-lg">
          <h3 className="mb-4 text-cyan-400 text-center">{t('conclusion_slide.predictions.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-lg">
              <p className="text-white mb-2">{t('conclusion_slide.predictions.lensing.title')}</p>
              <p className="text-gray-400 text-sm">{t('conclusion_slide.predictions.lensing.desc')}</p>
            </div>
            <div className="p-4 bg-black/40 rounded-lg">
              <p className="text-white mb-2">{t('conclusion_slide.predictions.cmb.title')}</p>
              <p className="text-gray-400 text-sm">{t('conclusion_slide.predictions.cmb.desc')}</p>
            </div>
            <div className="p-4 bg-black/40 rounded-lg">
              <p className="text-white mb-2">{t('conclusion_slide.predictions.running.title')}</p>
              <p className="text-gray-400 text-sm">{t('conclusion_slide.predictions.running.desc')}</p>
            </div>
            <div className="p-4 bg-black/40 rounded-lg">
              <p className="text-white mb-2">{t('conclusion_slide.predictions.anomalies.title')}</p>
              <p className="text-gray-400 text-sm">{t('conclusion_slide.predictions.anomalies.desc')}</p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="p-8 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30 rounded-lg text-center">
          <h3 className="mb-4 text-purple-400">{t('conclusion_slide.final.title')}</h3>
          <p className="text-gray-300 leading-relaxed mb-4 max-w-2xl mx-auto">
            {t('conclusion_slide.final.text')}
          </p>
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-gray-400">
              {t('conclusion_slide.final.footer')}
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
