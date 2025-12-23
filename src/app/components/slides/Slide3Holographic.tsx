import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';
import { Layers, Radio, Activity } from 'lucide-react';

interface Slide3Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide3Holographic({ slideNumber, totalSlides }: Slide3Props) {
  const { t } = useTranslation();

  return (
    <Slide
      title={t('holographic_slide.title')}
      subtitle={t('holographic_slide.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1752451399417-eb6e072269bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljcyUyMGFic3RyYWN0fGVufDF8fHx8MTc2NjQ3MTExM3ww&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Main Concept */}
        <div className="p-8 bg-gradient-to-br from-purple-950/50 to-blue-950/50 border border-purple-500/30 rounded-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Layers className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h3 className="mb-2 text-purple-300 text-xl font-semibold">{t('holographic_slide.main_concept.title')}</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                {t('holographic_slide.main_concept.text')}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('holographic_slide.main_concept.subtext')}
              </p>
            </div>
          </div>
        </div>

        {/* Three Key Points */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="h-6 w-6 text-cyan-400" />
              <h3 className="text-cyan-400">{t('holographic_slide.points.entropy.title')}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              {t('holographic_slide.points.entropy.text').split('S_BH')[0]}
              <code className="text-cyan-300 text-xs">S_BH = A/(4G)</code>
              {t('holographic_slide.points.entropy.text').split('S_BH = A/(4G)')[1].split('Λ_eff')[0]}
              <code className="text-cyan-300 text-xs">Λ_eff ∝ (S_horizon / Area) × exp(−2k|S_global|)</code>.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t('holographic_slide.points.entropy.subtext')}
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-green-400">{t('holographic_slide.points.oscillations.title')}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              {t('holographic_slide.points.oscillations.text')}
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t('holographic_slide.points.oscillations.subtext').split(':')[0]}: <code className="text-green-300 text-xs">S_ent(S) = S₀ × [1 + A cos(ω ln|S| + φ)]</code>
              {t('holographic_slide.points.oscillations.subtext').split('φ)]')[1]}
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-6 w-6 text-orange-400" />
              <h3 className="text-orange-400">{t('holographic_slide.points.duality.title')}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              {t('holographic_slide.points.duality.text')}
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t('holographic_slide.points.duality.subtext')}
            </p>
          </div>
        </div>

        {/* EHT Confirmation */}
        <div className="p-6 bg-gradient-to-r from-green-950/50 to-emerald-950/50 border border-green-500/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="px-4 py-2 bg-green-500/20 rounded-lg">
              <span className="text-green-400 font-mono">✓</span>
            </div>
            <div>
              <h3 className="mb-2 text-green-400">{t('holographic_slide.confirmation.title')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('holographic_slide.confirmation.text')}
              </p>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-lg text-center">
          <code className="text-cyan-300 font-mono">
            S<sub>BH</sub> = A / 4G → T<sub>brane</sub> ∝ ∂S / ∂Area
          </code>
        </div>
      </div>
    </Slide>
  );
}
