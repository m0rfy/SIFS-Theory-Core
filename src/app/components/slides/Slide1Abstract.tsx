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
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
        <div className="space-y-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-blue-400">Основная концепция</h3>
            <p className="text-gray-300 leading-relaxed">
              SIFS постулирует, что наша 4D-вселенная — это 3-брана в 5-мерном фрактальном bulk, 
              где 5-я координата <span className="font-mono text-cyan-400">S</span> представляет масштаб.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-purple-400">Элементарные частицы</h3>
            <p className="text-gray-300 leading-relaxed">
              Протоны и электроны рассматриваются как микро-сингулярности с эффективными горизонтами, 
              где масса подавлена RS-warping механизмом.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-green-400">Унификация взаимодействий</h3>
            <p className="text-gray-300 leading-relaxed">
              Гравитация и квантовые эффекты — проявления warped геометрии RS2 + фрактальной 
              самоподобности. Оптическая метрика Гордона делает гравитацию градиентом преломления вакуума.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="mb-4 text-orange-400">Принцип Уробороса</h3>
            <p className="text-gray-300 leading-relaxed">
              Бесконечная иерархия масштабов: микро ↔ макро. Фрактальная самоподобность 
              связывает квантовый мир с космологическими структурами.
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
