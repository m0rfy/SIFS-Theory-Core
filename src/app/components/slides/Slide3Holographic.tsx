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
              <h3 className="mb-2 text-purple-300">Фрактальное расширение AdS/CFT</h3>
              <p className="text-gray-300 leading-relaxed">
                SIFS является фрактальным расширением голографического принципа AdS/CFT: 
                брана дуальна гравитации в warped fractal AdS₅ пространстве.
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
            <p className="text-gray-300">
              Энтропия Бекенштейна-Хокинга является источником натяжения браны в 5D-bulk
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-green-400">Осцилляции</h3>
            </div>
            <p className="text-gray-300">
              Лог-периодические осцилляции S → модуляции в entanglement entropy
            </p>
          </div>

          <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-6 w-6 text-orange-400" />
              <h3 className="text-orange-400">Дуальность</h3>
            </div>
            <p className="text-gray-300">
              Гравитация в bulk ↔ квантовая теория на бране через голографическое соответствие
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
