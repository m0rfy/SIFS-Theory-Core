import { Slide } from '../Slide';
import { Layers, Radio, Activity } from 'lucide-react';

interface Slide3Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide3Holographic({ slideNumber, totalSlides }: Slide3Props) {
  return (
    <Slide
      title="Голографическая формулировка"
      subtitle="AdS/CFT в фрактальном bulk"
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
              <h3 className="mb-2 text-purple-300 text-xl font-semibold">Фрактальное расширение AdS/CFT</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                SIFS является фрактальным расширением голографического принципа AdS/CFT соответствия: 
                наша 4D-брана дуальна гравитации в warped fractal AdS₅ bulk-пространстве. Это означает, 
                что вся информация о квантовой теории поля на бране закодирована в гравитационной динамике 
                в 5-мерном bulk.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ключевое отличие от стандартного AdS/CFT: масштабная координата S создаёт фрактальную структуру, 
                что приводит к лог-периодическим осцилляциям в энтропии запутанности и модуляциям в голографической 
                энтропии. Это объясняет наблюдаемые временные масштабы в астрофизических явлениях.
              </p>
            </div>
          </div>
        </div>

        {/* Three Key Points */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="h-6 w-6 text-cyan-400" />
              <h3 className="text-cyan-400">Энтропия</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              Энтропия Бекенштейна-Хокинга <code className="text-cyan-300 text-xs">S_BH = A/(4G)</code> является источником 
              натяжения браны в 5D-bulk. Это натяжение создаёт эффективную космологическую константу через энтропийное 
              давление: <code className="text-cyan-300 text-xs">Λ_eff ∝ (S_horizon / Area) × exp(−2k|S_global|)</code>.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Энтропия масштабируется с площадью горизонта, но подавляется warping фактором, что объясняет малость 
              космологической константы и её эволюцию со временем (evolving dark energy).
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-green-400">Осцилляции</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              Лог-периодические осцилляции масштабной координаты S создают модуляции в энтропии запутанности 
              (entanglement entropy). Это проявляется в поляризационных флипах в аккреционных дисках чёрных дыр 
              и временных масштабах астрофизических явлений.
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Формула: <code className="text-green-300 text-xs">S_ent(S) = S₀ × [1 + A cos(ω ln|S| + φ)]</code>, где 
              амплитуда A и частота ω определяются фрактальной структурой пространства-времени.
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-6 w-6 text-orange-400" />
              <h3 className="text-orange-400">Дуальность</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-2">
              Гравитация в 5D-bulk полностью эквивалентна квантовой теории поля на 4D-бране через голографическое 
              соответствие. Это означает, что гравитационные эффекты в bulk (например, испарение Хокинга) соответствуют 
              квантовым процессам на бране (например, распаду частиц).
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Информационный парадокс чёрных дыр решается через ER=EPR соответствие: запутанные частицы соединены 
              мостами Эйнштейна-Розена в bulk, что сохраняет унитарность квантовой механики.
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
              <h3 className="mb-2 text-green-400">Подтверждение: EHT 2025</h3>
              <p className="text-gray-300 leading-relaxed">
                Polarization flips в M87* (Event Horizon Telescope, сентябрь 2025) согласуются 
                с предсказанной holographic динамикой и лог-периодическими модами масштабной координаты S.
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
