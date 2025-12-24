/**
 * HomePage - Главная страница с Hero секцией
 */

export function HomePage() {
  return (
    <div className="spatial-page-block spatial-monolith">
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          SIFS Theory
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Scale-Invariant Fractal Spacetime
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Унифицированная геометрическая теория поля, объединяющая гравитацию, 
          квантовую механику и структуру элементарных частиц через фрактальную 
          геометрию 5D-пространства.
        </p>
      </div>
    </div>
  );
}
