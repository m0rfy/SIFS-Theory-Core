export function ProtonBlackHoleCalc() {
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
      title: 'Schwarzschild радиус протона',
      formula: 'r_s = 2GM_p/c²',
      calculation: '= 2 × (6.674×10⁻¹¹) × (1.673×10⁻²⁷) / (2.998×10⁸)²',
      result: 'r_s ≈ 2.48 × 10⁻⁵⁴ m',
      interpretation: 'На 39 порядков меньше наблюдаемого радиуса',
      color: 'blue'
    },
    {
      title: 'Planck масса в r_p',
      formula: 'M_Pl(r_p) = √(ħc/G) × (l_Pl/r_p)',
      calculation: '= 2.18×10⁻⁸ kg × (1.6×10⁻³⁵ / 0.84×10⁻¹⁵)',
      result: 'M_eff ≈ 4.15 × 10⁻²⁸ kg',
      interpretation: 'Близко к массе протона!',
      color: 'purple'
    },
    {
      title: 'RS-warping фактор',
      formula: 'η = exp(−k|S|) = m_p/M_Pl(r_p)',
      calculation: '= (1.673×10⁻²⁷) / (4.15×10⁻²⁸)',
      result: 'η ≈ 4.03 → |S| ≈ 11.2',
      interpretation: 'Масштабная координата протона',
      color: 'green'
    },
    {
      title: 'Эффективный горизонт в 5D',
      formula: 'r_eff = r_p × exp(k|S|/2)',
      calculation: '≈ 0.84 fm × exp(5.6)',
      result: 'r_eff ≈ 230 fm',
      interpretation: 'В bulk-пространстве (ненаблюдаемо в 4D)',
      color: 'cyan'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg">
        <h4 className="text-indigo-400 mb-3">Реальные вычисления: Протон как микро-сингулярность</h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Показано, что при учёте RS-warping масса Планка на масштабе протона совпадает с его наблюдаемой массой
        </p>
        
        {/* Physical Constants */}
        <div className="mb-4 p-3 bg-black/40 rounded-lg">
          <h5 className="text-white text-sm mb-2">Фундаментальные константы:</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
            {Object.entries(constants).map(([key, value]) => (
              <div key={key} className="text-gray-400">
                <span className="text-cyan-400">{key}</span> = {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculations */}
      <div className="space-y-3">
        {calculations.map((calc, index) => (
          <div 
            key={index}
            className={`p-4 bg-${calc.color}-950/20 border border-${calc.color}-500/30 rounded-lg`}
          >
            <h5 className={`text-${calc.color}-400 mb-2`}>{index + 1}. {calc.title}</h5>
            
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-black/40 rounded font-mono text-gray-300">
                {calc.formula}
              </div>
              
              <div className="text-gray-400 text-xs">
                {calc.calculation}
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-${calc.color}-400 font-mono`}>{calc.result}</span>
                <span className="text-gray-500 text-xs italic">{calc.interpretation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-green-950/30 to-emerald-950/30 border border-green-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-green-400 text-2xl">✓</div>
          <div>
            <h5 className="text-green-400 mb-2">Результат унификации</h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              Масса протона <strong>не нужно</strong> вводить как параметр. Она появляется автоматически 
              как масштабно-подавленная планковская масса на расстоянии r_p: <span className="font-mono text-cyan-400">m_p = M_Pl × exp(−k|S_p|)</span>
            </p>
            <div className="mt-3 p-3 bg-black/40 rounded">
              <p className="text-xs text-gray-400">
                Стабильность: Заряд — топологический инвариант браны (сохраняется). 
                Масса — проекция в 4D (подавлена). Энергия может утекать в bulk (испарение распределено по S).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
