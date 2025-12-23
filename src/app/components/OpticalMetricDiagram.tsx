export function OpticalMetricDiagram() {
  const interactions = [
    {
      force: 'Гравитация',
      gradient: 'dn/dr ≈ 10⁻²⁰ m⁻¹',
      scale: '|S| ≈ 20',
      n_profile: 'n(r) = 1 + GM/rc²',
      effect: 'Искривление траекторий (орбиты)',
      color: 'purple',
      strength: 'Слабый'
    },
    {
      force: 'Электромагнетизм',
      gradient: 'dn/dr ≈ 10⁻¹⁰ m⁻¹',
      scale: '|S| ≈ 5',
      n_profile: 'n(r) = 1 + αħ/mc·r',
      effect: 'Средний (атомы)',
      color: 'cyan',
      strength: 'Средний'
    },
    {
      force: 'Сильное взаимодействие',
      gradient: 'dn/dr ≈ 10⁵ m⁻¹',
      scale: '|S| ≈ 2.8',
      n_profile: 'n(r) = 1 + exp(−r/r_QCD)',
      effect: 'Конфайнмент (кварки)',
      color: 'green',
      strength: 'Очень сильный'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-orange-400 mb-3">Оптическая метрика Гордона</h4>
        <p className="text-gray-400 text-sm mb-4">
          Все силы = градиенты показателя преломления вакуума на разных масштабах S
        </p>

        {/* Core Formula */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-950/30 to-red-950/30 border border-orange-500/30 rounded-lg">
          <div className="text-center mb-3">
            <div className="text-orange-400 font-mono text-lg mb-2">
              ds² = n²(r,S) · (c²dt² − dx²)
            </div>
            <p className="text-gray-400 text-sm">
              Метрика Минковского с переменным показателем преломления
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">Фотоны</div>
              <div className="text-cyan-400 font-mono">v = c/n(r)</div>
            </div>
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">Частицы</div>
              <div className="text-green-400 font-mono">F = −∇n</div>
            </div>
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">Потенциал</div>
              <div className="text-purple-400 font-mono">V ∝ n(r)</div>
            </div>
          </div>
        </div>

        {/* Interactions Table */}
        <div className="space-y-3">
          {interactions.map((item, index) => (
            <div 
              key={index}
              className={`p-4 bg-${item.color}-950/20 border border-${item.color}-500/30 rounded-lg hover:border-${item.color}-500/50 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className={`text-${item.color}-400 mb-1`}>{item.force}</h5>
                  <div className="text-gray-500 text-xs">{item.strength} градиент</div>
                </div>
                <div className="text-right">
                  <div className={`text-${item.color}-400 font-mono text-sm`}>{item.scale}</div>
                  <div className="text-gray-500 text-xs">Масштаб</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-black/40 rounded">
                  <div className="text-gray-400 text-xs mb-1">Градиент:</div>
                  <div className={`text-${item.color}-400 font-mono text-xs`}>{item.gradient}</div>
                </div>
                <div className="p-2 bg-black/40 rounded">
                  <div className="text-gray-400 text-xs mb-1">Профиль n(r):</div>
                  <div className="text-gray-300 font-mono text-xs">{item.n_profile}</div>
                </div>
              </div>

              <div className="mt-2 text-gray-400 text-xs italic">
                → {item.effect}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-950/30 to-yellow-950/30 border border-orange-500/30 rounded-lg">
        <h5 className="text-orange-400 mb-2">Ключевой инсайт</h5>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Градиент показателя преломления создаёт эффективную силу. Чем резче меняется n(r), тем сильнее взаимодействие:
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-purple-400 mb-1">Гравитация</div>
            <div className="text-gray-400">Плавный ∇n</div>
          </div>
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-cyan-400 mb-1">EM</div>
            <div className="text-gray-400">Умеренный ∇n</div>
          </div>
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-green-400 mb-1">Strong</div>
            <div className="text-gray-400">Резкий ∇n</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-lg">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-indigo-400 font-mono">SIFS связь:</span> Показатель преломления n(r, S) 
          определяется warped метрикой 5D-bulk. Разные |S| → разные dn/dr → разные силы. 
          Унификация через геометрию, а не через группы симметрии.
        </p>
      </div>
    </div>
  );
}
