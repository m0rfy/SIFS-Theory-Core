import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';
import { Telescope, TrendingUp, Radio, CheckCircle } from 'lucide-react';
import { DarkEnergyEvolution } from '../DarkEnergyEvolution';

interface Slide4Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide4Data({ slideNumber, totalSlides }: Slide4Props) {
  const { t } = useTranslation();

  const confirmations = [
    {
      icon: TrendingUp,
      title: t('data_slide.items.desi.title'),
      description: t('data_slide.items.desi.desc'),
      interpretation: t('data_slide.items.desi.interpretation'),
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Telescope,
      title: t('data_slide.items.euclid.title'),
      description: t('data_slide.items.euclid.desc'),
      interpretation: t('data_slide.items.euclid.interpretation'),
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Radio,
      title: t('data_slide.items.eht.title'),
      description: t('data_slide.items.eht.desc'),
      interpretation: t('data_slide.items.eht.interpretation'),
      color: 'text-green-400',
      borderColor: 'border-green-500/30'
    }
  ];

  return (
    <Slide
      title={t('data_slide.title')}
      subtitle={t('data_slide.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1709141428202-e21518e6481f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBjb3NtaWMlMjB3ZWJ8ZW58MXx8fHwxNzY2NDcxMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {confirmations.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`p-6 bg-black/60 backdrop-blur-sm border ${item.borderColor} rounded-lg hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 bg-white/5 rounded-lg ${item.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className={`mb-2 ${item.color}`}>{item.title}</h3>
                    <p className="text-gray-300">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="pl-4 border-l-2 border-white/20">
                    <p className="text-sm text-gray-400 mb-1">{t('data_slide.interpretation_label')}</p>
                    <p className="text-white">
                      {item.interpretation}
                    </p>
                  </div>
                </div>

                <div className={`p-2 ${item.color}`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Dark Energy Chart */}
        <div>
          <DarkEnergyEvolution />
        </div>

        {/* Statistical Significance */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 rounded-lg text-center">
          <h3 className="mb-3 text-cyan-400">{t('data_slide.significance.title')}</h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('data_slide.significance.text')}
          </p>
        </div>
      </div>
    </Slide>
  );
}
