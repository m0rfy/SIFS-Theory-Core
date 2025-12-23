import { Slide } from '../Slide';

interface Slide1Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide1Abstract({ slideNumber, totalSlides }: Slide1Props) {
  return (
    <Slide
      title="Scale-Invariant Fractal Spacetime"
      subtitle="SIFS Theory — Унификация квантовой механики, гравитации и космологии"
      backgroundImage="https://images.unsplash.com/photo-1728675437273-d83d4cfaf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFjdGFsJTIwbWFuZGVsYnJvdCUyMHNldHxlbnwxfHx8fDE3NjY0NzExMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Абстракт теории SIFS
          </h3>
          <p className="text-gray-200 text-center leading-relaxed mb-4">
            <strong className="text-white">Scale-Invariant Fractal Spacetime (SIFS)</strong> представляет собой унифицированную 
            геометрическую теорию поля, которая решает фундаментальные проблемы современной физики через введение масштабной 
            координаты как реальной геометрической размерности. Теория объединяет гравитацию, квантовую механику и космологию 
            в единую математическую структуру без свободных параметров.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-blue-400 text-lg font-semibold">🌌 Основная концепция</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              SIFS постулирует, что наша 4D-вселенная — это <span className="text-cyan-400 font-mono font-semibold">3-брана</span> 
              в 5-мерном фрактальном bulk-пространстве (модель Randall-Sundrum типа II), где пятая координата 
              <span className="font-mono text-cyan-400"> S</span> представляет <strong>физический масштаб</strong> — не абстрактный 
              параметр, а реальную геометрическую размерность.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Метрика имеет вид: <code className="text-cyan-300">ds² = exp(−2k|S|) η_μν dx^μ dx^ν + dS²</code>, где экспоненциальное 
              warping естественно объясняет иерархию масс между планковским и электрослабым масштабами. Масштабная координата охватывает 
              весь диапазон от 10⁻³⁵ м (планковский) до 10²⁶ м (хаббловский), создавая фрактальную самоподобную структуру.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-purple-400 text-lg font-semibold">⚛️ Элементарные частицы</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Протоны и электроны рассматриваются как <strong>микро-сингулярности</strong> (Kerr-Newman чёрные дыры) с эффективными 
              горизонтами в 5D-bulk, где масса подавлена RS-warping механизмом: <code className="text-purple-300">m_obs = M_bulk × exp(−k|S|)</code>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Для протона: истинная масса в bulk M_bulk ≈ 10¹⁴ г, но наблюдаемая масса m_p = 1.67×10⁻²⁴ г из-за подавления на 14 порядков. 
              Стабильность обеспечивается замороженным временем на горизонте и топологическим инвариантом заряда. Испарение Хокинга 
              подавлено экспоненциально: τ ∝ exp(2k|S|).
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-green-400 text-lg font-semibold">🔗 Унификация взаимодействий</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Гравитация и квантовые эффекты — проявления warped геометрии RS2 + фрактальной самоподобности. 
              <strong> Оптическая метрика Гордона</strong> делает все взаимодействия градиентами показателя преломления вакуума: 
              <code className="text-green-300">F = −∇n(r, S)</code>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Все фундаментальные силы (гравитация, электромагнетизм, сильное, слабое) возникают как градиенты dn/dr на разных 
              значениях масштабной координаты |S|. Гравитация слаба, потому что |S_grav| ≈ 20, а сильное взаимодействие сильное, 
              потому что |S_QCD| ≈ 2.8. Это геометрическое следствие, а не совпадение.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-orange-400 text-lg font-semibold">♾️ Принцип Уробороса</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Бесконечная иерархия масштабов: микро ↔ макро. Фрактальная самоподобность связывает квантовый мир с космологическими 
              структурами через лог-периодические осцилляции: <code className="text-orange-300">f(S) = f₀ × [1 + A cos(ω ln|S| + φ)]</code>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Структура материи демонстрирует самоподобие: кварки → нуклоны → атомы → планеты → галактики. Временные масштабы в 
              астрофизических явлениях (аккреция, джеты, поляризационные флипы) также показывают лог-периодичность, что подтверждено 
              наблюдениями Event Horizon Telescope для M87*.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-gray-400">
            Автор архитектуры: <span className="text-white">Vorobey</span> • 
            Дата: <span className="text-white">22 декабря 2025</span> • 
            Лицензия: <span className="text-white">CC BY 4.0</span>
          </p>
        </div>
      </div>
    </Slide>
  );
}
