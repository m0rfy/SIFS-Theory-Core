import { Slide } from '../Slide';
import { Telescope, TrendingUp, Radio, CheckCircle } from 'lucide-react';
import { DarkEnergyEvolution } from '../DarkEnergyEvolution';

interface Slide4Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide4Data({ slideNumber, totalSlides }: Slide4Props) {
  const confirmations = [
    {
      icon: TrendingUp,
      title: 'DESI DR2 (март 2025)',
      description: 'Evolving dark energy (>4σ отклонение от ΛCDM)',
      interpretation: 'Дрейф глобальной масштабной координаты S_global',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Telescope,
      title: 'Euclid / JWST',
      description: 'Early massive spirals + warped gravitational lensing',
      interpretation: 'Фрактальная самоподобность на разных масштабах',
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Radio,
      title: 'EHT (сентябрь 2025)',
      description: 'Polarization flips в M87* черной дыре',
      interpretation: 'Лог-периодические моды масштабной координаты',
      color: 'text-green-400',
      borderColor: 'border-green-500/30'
    }
  ];

  return (
    <Slide
      title="Подтверждения данными 2025 года"
      subtitle="Три независимых наблюдения согласуются с предсказаниями SIFS"
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
                    <p className="text-sm text-gray-400 mb-1">Интерпретация SIFS:</p>
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
          <h3 className="mb-3 text-cyan-400">Статистическая значимость</h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Совместная вероятность того, что три независимых наблюдения (космология, структурообразование, 
            динамика ЧД) случайно согласуются с единой геометрической теорией, чрезвычайно мала. 
            Это указывает на фундаментальное единство механизма.
          </p>
        </div>
      </div>
    </Slide>
  );
}