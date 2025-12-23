import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ProtonBlackHoleCalc() {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Real physical constants
  const constants = {
    G: '6.674 × 10⁻¹¹ m³/kg·s²',
    c: '2.998 × 10⁸ m/s',
    hbar: '1.055 × 10⁻³⁴ J·s',
    m_p: '1.673 × 10⁻²⁷ kg',
    r_p: '0.84 × 10⁻¹⁵ m'
  };

  const calculations = [
    {
      title: t('components.proton_calc.items.schwarzschild.title'),
      formula: 'r_s = 2GM_p/c²',
      calculation: '= 2 × (6.674×10⁻¹¹) × (1.673×10⁻²⁷) / (2.998×10⁸)²',
      result: 'r_s ≈ 2.48 × 10⁻⁵⁴ m',
      interpretation: t('components.proton_calc.items.schwarzschild.interpretation'),
      color: 'blue',
      details: t('components.proton_calc.items.schwarzschild.details')
    },
    {
      title: t('components.proton_calc.items.planck.title'),
      formula: 'M_Pl(r_p) = √(ħc/G) × (l_Pl/r_p)',
      calculation: '= 2.18×10⁻⁸ kg × (1.6×10⁻³⁵ / 0.84×10⁻¹⁵)',
      result: 'M_eff ≈ 4.15 × 10⁻²⁸ kg',
      interpretation: t('components.proton_calc.items.planck.interpretation'),
      color: 'purple',
      details: t('components.proton_calc.items.planck.details')
    },
    {
      title: t('components.proton_calc.items.warping.title'),
      formula: 'η = exp(−k|S|) = m_p/M_Pl(r_p)',
      calculation: '= (1.673×10⁻²⁷) / (4.15×10⁻²⁸)',
      result: 'η ≈ 4.03 → |S| ≈ 11.2',
      interpretation: t('components.proton_calc.items.warping.interpretation'),
      color: 'green',
      details: t('components.proton_calc.items.warping.details')
    },
    {
      title: t('components.proton_calc.items.horizon.title'),
      formula: 'r_eff = r_p × exp(k|S|/2)',
      calculation: '≈ 0.84 fm × exp(5.6)',
      result: 'r_eff ≈ 230 fm',
      interpretation: t('components.proton_calc.items.horizon.interpretation'),
      color: 'cyan',
      details: t('components.proton_calc.items.horizon.details')
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg">
        <h4 className="text-indigo-400 mb-3">{t('components.proton_calc.title')}</h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {t('components.proton_calc.subtitle')}
        </p>
        
        {/* Physical Constants */}
        <div className="mb-4 p-3 bg-black/40 rounded-lg">
          <h5 className="text-white text-sm mb-2">{t('components.proton_calc.constants')}</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
            {Object.entries(constants).map(([key, value]) => (
              <div key={key} className="text-gray-400">
                <span className="text-cyan-400">{key}</span> = {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculations - Interactive */}
      <div className="space-y-3">
        {calculations.map((calc, index) => {
          const isExpanded = expandedIndex === index;
          
          const getColorClasses = (color: string) => {
            switch (color) {
              case 'blue':
                return {
                  bg: 'bg-blue-950/20',
                  border: 'border-blue-500/30',
                  text: 'text-blue-400'
                };
              case 'purple':
                return {
                  bg: 'bg-purple-950/20',
                  border: 'border-purple-500/30',
                  text: 'text-purple-400'
                };
              case 'green':
                return {
                  bg: 'bg-green-950/20',
                  border: 'border-green-500/30',
                  text: 'text-green-400'
                };
              case 'cyan':
                return {
                  bg: 'bg-cyan-950/20',
                  border: 'border-cyan-500/30',
                  text: 'text-cyan-400'
                };
              default:
                return {
                  bg: 'bg-gray-950/20',
                  border: 'border-gray-500/30',
                  text: 'text-gray-400'
                };
            }
          };
          
          const colors = getColorClasses(calc.color);
          
          return (
            <div 
              key={index}
              className={`p-4 ${colors.bg} border ${colors.border} rounded-lg cursor-pointer transition-all hover:scale-[1.02]`}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className={`${colors.text} font-semibold`}>
                      {index + 1}. {calc.title}
                    </h5>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-black/40 rounded font-mono text-gray-300">
                      {calc.formula}
                    </div>
                    
                    {isExpanded && (
                      <>
                        <div className="text-gray-400 text-xs pl-2">
                          {calc.calculation}
                        </div>
                        <div className="p-3 bg-black/60 rounded-lg border border-white/10 mt-2">
                          <p className="text-gray-300 text-xs leading-relaxed">{calc.details}</p>
                        </div>
                      </>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className={`${colors.text} font-mono font-semibold`}>
                        {calc.result}
                      </span>
                      <span className="text-gray-500 text-xs italic">{calc.interpretation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-gradient-to-r from-green-950/30 to-emerald-950/30 border border-green-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-green-400 text-2xl">✓</div>
          <div>
            <h5 className="text-green-400 mb-2">{t('components.proton_calc.result.title')}</h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('components.proton_calc.result.text').split(': ')[0]}: <span className="font-mono text-cyan-400">m_p = M_Pl × exp(−k|S_p|)</span>
            </p>
            <div className="mt-3 p-3 bg-black/40 rounded">
              <p className="text-xs text-gray-400">
                {t('components.proton_calc.result.subtext')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
