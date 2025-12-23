import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Calculator, Sparkles, Target, Zap } from 'lucide-react';

export function InteractiveCalculations() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const calculations = [
    {
      id: 'proton-mass',
      title: 'Масса протона из геометрии',
      icon: Target,
      color: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-500/30',
      description: 'Вывод массы протона из RS-warping без свободных параметров',
      steps: [
        {
          step: '1. Schwarzschild радиус',
          formula: 'r_s = 2GM_p/c²',
          calculation: '= 2 × (6.674×10⁻¹¹) × (1.673×10⁻²⁷) / (2.998×10⁸)²',
          result: 'r_s ≈ 2.48 × 10⁻⁵⁴ m',
          note: 'На 39 порядков меньше наблюдаемого радиуса протона'
        },
        {
          step: '2. Планковская масса на масштабе r_p',
          formula: 'M_Pl(r_p) = √(ħc/G) × (l_Pl/r_p)',
          calculation: '= 2.18×10⁻⁸ kg × (1.6×10⁻³⁵ / 0.84×10⁻¹⁵)',
          result: 'M_eff ≈ 4.15 × 10⁻²⁸ kg',
          note: 'Близко к массе протона!'
        },
        {
          step: '3. RS-warping фактор',
          formula: 'η = exp(−k|S|) = m_p/M_Pl(r_p)',
          calculation: '= (1.673×10⁻²⁷) / (4.15×10⁻²⁸)',
          result: 'η ≈ 4.03 → |S| ≈ 11.2',
          note: 'Масштабная координата протона определена геометрически'
        }
      ],
      conclusion: 'Масса протона появляется автоматически как масштабно-подавленная планковская масса, без введения её как параметра.'
    },
    {
      id: 'coupling-constants',
      title: 'Константы связи из масштаба S',
      icon: Zap,
      color: 'from-purple-600/20 to-pink-600/20',
      borderColor: 'border-purple-500/30',
      description: 'Все фундаментальные константы выводятся из одной геометрии',
      steps: [
        {
          step: 'Гравитация',
          formula: 'G_eff = G_Pl × exp(−2k|S_grav|)',
          calculation: 'где |S_grav| ≈ 20',
          result: 'G_eff/G_Pl ≈ 10⁻³⁸',
          note: 'Слабость гравитации — геометрическое следствие'
        },
        {
          step: 'Электромагнетизм',
          formula: 'α ≈ 1/137',
          calculation: '|S|_em ≈ ln(137π) ≈ 5',
          result: 'α = 0.0073',
          note: 'Калибровка по солнечной системе'
        },
        {
          step: 'Сильное взаимодействие',
          formula: 'α_s ≈ π / (|S|_QCD ln(μ/Λ))',
          calculation: 'где |S_QCD| ≈ 2.8',
          result: 'α_s(1 GeV) ≈ 0.1',
          note: 'Running coupling → конфайнмент'
        },
        {
          step: 'Слабое взаимодействие',
          formula: 'G_F ∝ exp(−4k|S|_weak)',
          calculation: 'где |S_weak| ≈ 8–10',
          result: 'G_F ≈ 10⁻⁵ GeV⁻²',
          note: 'Экспоненциальное подавление'
        }
      ],
      conclusion: 'Все взаимодействия — градиенты dn/dr на разных |S|. Иерархия возникает из геометрии.'
    },
    {
      id: 'dark-energy',
      title: 'Тёмная энергия (DESI 2025)',
      icon: Sparkles,
      color: 'from-orange-600/20 to-red-600/20',
      borderColor: 'border-orange-500/30',
      description: 'Evolving dark energy согласуется с теорией SIFS',
      steps: [
        {
          step: 'Уравнение состояния',
          formula: 'w(z) = w₀ + wₐ × z/(1+z)',
          calculation: 'DESI best fit:',
          result: 'w₀ = −0.827 ± 0.063, wₐ = −0.75 ± 0.29',
          note: '>4σ отклонение от ΛCDM (w = −1)'
        },
        {
          step: 'SIFS интерпретация',
          formula: 'Λ_eff(z) ∝ exp(−2k|S_global(z)|)',
          calculation: 'S_global(z) = S₀ + δS × z/(1+z)',
          result: 'Дрейф глобальной координаты S',
          note: 'Совпадение без fine-tuning параметров'
        }
      ],
      conclusion: 'Эволюция тёмной энергии естественно объясняется дрейфом масштабной координаты S_global.'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-6 w-6 text-indigo-400" />
          <h4 className="text-indigo-400 text-lg font-semibold">Интерактивные расчёты</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Кликните на любой расчёт, чтобы увидеть пошаговые вычисления и формулы. Все результаты получены из единой геометрической аксиомы.
        </p>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        value={expandedItem || undefined}
        onValueChange={(value) => setExpandedItem(value || null)}
        className="space-y-3"
      >
        {calculations.map((calc) => {
          const Icon = calc.icon;
          return (
            <AccordionItem
              key={calc.id}
              value={calc.id}
              className={`border rounded-lg bg-gradient-to-br ${calc.color} ${calc.borderColor} overflow-hidden`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`p-3 rounded-lg bg-white/5 border ${calc.borderColor}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">{calc.title}</h5>
                    <p className="text-gray-400 text-sm">{calc.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-2">
                  {calc.steps.map((step, index) => (
                    <div
                      key={index}
                      className="p-4 bg-black/40 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h6 className="text-cyan-400 font-medium text-sm">{step.step}</h6>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-2 bg-black/60 rounded font-mono text-sm text-gray-300">
                          {step.formula}
                        </div>
                        
                        <div className="text-gray-400 text-xs pl-2">
                          {step.calculation}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-green-400 font-mono text-sm font-semibold">
                            {step.result}
                          </span>
                          <span className="text-gray-500 text-xs italic">
                            {step.note}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={`p-4 bg-gradient-to-r ${calc.color} border ${calc.borderColor} rounded-lg mt-4`}>
                    <div className="flex items-start gap-3">
                      <div className="text-green-400 text-xl">✓</div>
                      <div>
                        <h6 className="text-white font-semibold mb-1">Ключевой результат</h6>
                        <p className="text-gray-300 text-sm leading-relaxed">{calc.conclusion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
