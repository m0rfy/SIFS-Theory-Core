import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';
import { Atom, Zap, Orbit, Shield } from 'lucide-react';
import { ProtonBlackHoleCalc } from '../ProtonBlackHoleCalc';

interface Slide2Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide2Axioms({ slideNumber, totalSlides }: Slide2Props) {
  const { t } = useTranslation();

  const axioms = [
    {
      icon: Atom,
      title: t('axioms_slide.items.micro.title'),
      description: t('axioms_slide.items.micro.desc'),
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: t('axioms_slide.items.stability.title'),
      description: t('axioms_slide.items.stability.desc'),
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: t('axioms_slide.items.strong.title'),
      description: t('axioms_slide.items.strong.desc'),
      color: 'text-purple-400'
    },
    {
      icon: Orbit,
      title: t('axioms_slide.items.dark_energy.title'),
      description: t('axioms_slide.items.dark_energy.desc'),
      color: 'text-orange-400'
    }
  ];

  return (
    <Slide
      title={t('axioms_slide.title')}
      subtitle={t('axioms_slide.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1759327847036-22d9bad214bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvbGUlMjBldmVudCUyMGhvcml6b258ZW58MXx8fHwxNzY2NDcxMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
          {axioms.map((axiom, index) => {
            const Icon = axiom.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-white/5 rounded-lg ${axiom.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-2 ${axiom.color}`}>{axiom.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {axiom.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-blue-500/30 rounded-lg max-w-6xl">
          <h3 className="mb-3 text-cyan-400 text-center">{t('axioms_slide.braneworld.title')}</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            {t('axioms_slide.braneworld.text')}
          </p>
        </div>

        {/* Detailed Calculations */}
        <div className="max-w-6xl">
          <ProtonBlackHoleCalc />
        </div>
      </div>
    </Slide>
  );
}
