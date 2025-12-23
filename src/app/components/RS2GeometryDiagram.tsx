export function RS2GeometryDiagram() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-purple-400 mb-3">Модель Рэндалл-Сундрума (RS2): Решение парадокса массы</h4>
        <p className="text-gray-400 text-sm mb-4">
          Гравитация утекает в 5D-bulk, мы наблюдаем только "поверхностное натяжение"
        </p>

        {/* Visual representation */}
        <div className="relative h-64 bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-lg overflow-hidden mb-4">
          {/* 5D Bulk */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse" />
          </div>

          {/* 3-Brane */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-cyan-400 shadow-lg shadow-cyan-500/50">
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-cyan-400 text-xs whitespace-nowrap">
              3D-брана (наша Вселенная)
            </div>
          </div>

          {/* Proton as singularity */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Gravity leaking into bulk */}
            <div className="absolute w-32 h-32 -left-16 -top-16">
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-500/30 via-orange-500/10 to-transparent blur-sm" />
              <div className="absolute inset-4 rounded-full bg-gradient-radial from-yellow-500/40 via-orange-500/20 to-transparent blur-md" />
            </div>
            
            {/* Proton core */}
            <div className="relative w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-500/50">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-xs whitespace-nowrap">
                Протон
              </div>
            </div>
          </div>

          {/* Arrows showing gravity leak */}
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-orange-400 text-xs flex items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-orange-400 to-transparent" />
            <span>Утечка G в bulk</span>
          </div>
          <div className="absolute left-1/2 top-3/4 -translate-x-1/2 text-orange-400 text-xs flex items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-t from-orange-400 to-transparent" />
          </div>
        </div>

        {/* Mass breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-950/40 to-orange-950/40 border border-yellow-500/30 rounded-lg">
            <h5 className="text-yellow-400 mb-2">Истинная масса в 5D</h5>
            <div className="font-mono text-2xl text-yellow-300 mb-2">10¹⁴ г</div>
            <p className="text-gray-400 text-sm">Планковская масса на масштабе r_p</p>
            <div className="mt-3 p-2 bg-black/40 rounded text-xs font-mono text-gray-300">
              M_true = √(ħc/G) × (l_Pl/r_p)
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-lg">
            <h5 className="text-cyan-400 mb-2">Наблюдаемая масса на бране</h5>
            <div className="font-mono text-2xl text-cyan-300 mb-2">10⁻²⁴ г</div>
            <p className="text-gray-400 text-sm">Поверхностное натяжение прокола</p>
            <div className="mt-3 p-2 bg-black/40 rounded text-xs font-mono text-gray-300">
              m_obs = M_true × exp(−2k|S|)
            </div>
          </div>
        </div>
      </div>

      {/* Warping factor */}
      <div className="p-4 bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-500/30 rounded-lg">
        <h5 className="text-purple-400 mb-3">Экспоненциальное подавление (RS-warping)</h5>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-black/40 rounded">
            <div className="text-gray-400 mb-1">Warping параметр</div>
            <div className="font-mono text-purple-300">k ≈ 0.1 M_Pl</div>
          </div>
          <div className="p-3 bg-black/40 rounded">
            <div className="text-gray-400 mb-1">Масштаб протона</div>
            <div className="font-mono text-cyan-300">|S_p| ≈ 11.2</div>
          </div>
          <div className="p-3 bg-black/40 rounded">
            <div className="text-gray-400 mb-1">Подавление</div>
            <div className="font-mono text-green-300">η ≈ 10⁻¹⁴</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-black/40 rounded">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-purple-400 font-mono">Ключевой инсайт:</span> Ложка не весит триллионы тонн, 
            потому что 99.999...% её гравитации находится вне нашего «оптического среза» 4D-браны. 
            Мы ощущаем только остаточное напряжение на бране.
          </p>
        </div>
      </div>

      {/* Why gravity is weak */}
      <div className="p-4 bg-gradient-to-r from-orange-950/30 to-red-950/30 border border-orange-500/30 rounded-lg">
        <h5 className="text-orange-400 mb-2">Почему гравитация слабая?</h5>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          В отличие от электромагнетизма (привязан к бране), гравитация распространяется в полном 5D-объёме. 
          Это разбавляет её силу пропорционально exp(−2k|S|).
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2 bg-black/40 rounded">
            <div className="text-orange-400 mb-1">Электромагнитная сила</div>
            <div className="font-mono text-gray-300">F_EM ~ 1/r²</div>
            <div className="text-gray-500 mt-1">Ограничена браной</div>
          </div>
          <div className="p-2 bg-black/40 rounded">
            <div className="text-cyan-400 mb-1">Гравитационная сила</div>
            <div className="font-mono text-gray-300">F_G ~ exp(−2k|S|)/r²</div>
            <div className="text-gray-500 mt-1">Утекает в bulk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
