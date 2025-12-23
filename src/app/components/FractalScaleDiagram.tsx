export function FractalScaleDiagram() {
  // Log-periodic oscillations data
  const scales = [
    { scale: 'Планковская', size: '1.6 × 10⁻³⁵ m', S: 0, description: 'Квантовая гравитация' },
    { scale: 'Нуклонная', size: '10⁻¹⁵ m', S: 11, description: 'Протоны/нейтроны' },
    { scale: 'Атомная', size: '10⁻¹⁰ m', S: 16, description: 'Боровский радиус' },
    { scale: 'Солнечная система', size: '10¹³ m', S: 20, description: 'Калибровочный масштаб' },
    { scale: 'Галактическая', size: '10²¹ m', S: 24, description: 'Млечный Путь' },
    { scale: 'Хаббл', size: '10²⁶ m', S: 28, description: 'Наблюдаемая Вселенная' }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-purple-400 mb-3">Фрактальная иерархия масштабов</h4>
        <p className="text-gray-400 text-sm mb-4">
          Принцип Уробороса: самоподобие от Планка до Хаббла
        </p>
        
        <div className="relative">
          {/* Scale line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 rounded-full" />
          
          {/* Scale points */}
          <div className="space-y-6 pl-20 pr-4">
            {scales.map((item, index) => (
              <div 
                key={index}
                className="relative group"
              >
                {/* Dot */}
                <div 
                  className="absolute -left-[49px] top-2 w-4 h-4 rounded-full border-2 border-white bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg group-hover:scale-125 transition-transform"
                  style={{
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                  }}
                />
                
                {/* Content */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg group-hover:border-white/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-white">{item.scale}</h5>
                    <span className="text-cyan-400 font-mono text-sm">|S| ≈ {item.S}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    <span className="text-purple-400 font-mono text-sm">{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-lg">
          <h5 className="text-purple-400 mb-2">Лог-периодичность</h5>
          <p className="text-gray-400 text-sm leading-relaxed">
            ΔS ≈ const между естественными масштабами → самоподобие
          </p>
          <div className="mt-2 font-mono text-purple-300 text-xs">
            λ = λ₀ × exp(k|S|)
          </div>
        </div>
        
        <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
          <h5 className="text-blue-400 mb-2">Фрактальная размерность</h5>
          <p className="text-gray-400 text-sm leading-relaxed">
            D_f ≈ 2 + δ, где δ → 0 на больших масштабах
          </p>
          <div className="mt-2 font-mono text-blue-300 text-xs">
            ⟨N(r)⟩ ∝ r^D_f
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-cyan-400 text-2xl mt-1">∞</div>
          <div>
            <h5 className="text-cyan-400 mb-1">Бесконечная вложенность</h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              Каждый масштаб содержит структуры меньших масштабов и является частью больших структур. 
              Микро-ЧД на планковском уровне ↔ супермассивные ЧД в галактиках: одна геометрия.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
