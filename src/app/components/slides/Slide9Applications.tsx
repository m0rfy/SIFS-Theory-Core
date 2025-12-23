import { Slide } from '../Slide';
import { 
  Laptop, 
  Database, 
  Calculator, 
  Globe, 
  Code, 
  Rocket, 
  Microscope, 
  Zap, 
  Radio, 
  Atom,
  Brain,
  Search,
  Server,
  Satellite,
  TrendingUp
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface Slide9Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide9Applications({ slideNumber, totalSlides }: Slide9Props) {
  const freeApplications = [
    {
      title: "Анализ данных DESI",
      description: "Использование Python (CosmoMC/Cobaya) для проверки CPL-параметризации темной энергии (w₀, wₐ) на открытых данных DESI DR1. Поиск статистических отклонений >3σ от ΛCDM модели в корреляционных функциях галактик.",
      icon: Database,
      tag: "Data Science"
    },
    {
      title: "GW-аналитика",
      description: "Обработка сигналов LIGO/Virgo (GWOSC) методом согласованной фильтрации (PyCBC) для поиска 'эхо-сигналов' после слияния ЧД (Ringdown phase), предсказываемых моделями с модифицированным горизонтом событий.",
      icon: Radio,
      tag: "LIGO/Virgo"
    },
    {
      title: "Симуляция орбит",
      description: "Разработка численного интегратора (Runge-Kutta 4th order) на Julia для расчета прецессии S2 вокруг Sgr A* в метрике Гордона. Сравнение отклонений геодезических с предсказаниями ОТО (Schwarzschild metric).",
      icon: Laptop,
      tag: "Simulation"
    },
    {
      title: "Анализ CMB",
      description: "Применение вейвлет-анализа и статистики Минковского к картам Planck 2018 (Healpy) для поиска негауссовостей и лог-периодических паттернов, характерных для моделей фрактальной инфляции.",
      icon: Search,
      tag: "Cosmology"
    },
    {
      title: "Кривые блеска",
      description: "Спектральный анализ временных рядов квазаров (SDSS/ZTF) с использованием периодограммы Ломба-Скаргла для выявления вторичных периодов аккреции, указывающих на дискретную масштабную структуру.",
      icon: TrendingUp,
      tag: "Astrophysics"
    },
    {
      title: "Верификация масс",
      description: "Численное решение уравнения Шредингера на 5D-многообразии с warp-фактором (метод конечных элементов) для теоретического расчета спектра масс мезонов и сравнения с экспериментальными данными PDG.",
      icon: Calculator,
      tag: "Math"
    },
    {
      title: "Образовательные 3D",
      description: "Создание интерактивных WebGL-моделей (Three.js/React-Fiber) для визуализации проекций 4D-гиперсфер и 5D-геодезических на трехмерное пространство, демонстрирующих эффекты искривления.",
      icon: Globe,
      tag: "Education"
    },
    {
      title: "Exoplanet Atmospheres",
      description: "Анализ трансмиссионных спектров экзопланет (JWST MAST API) на наличие аномального рэлеевского рассеяния, вызванного вариациями показателя преломления вакуума n(S) в сильных гравитационных полях.",
      icon: Search,
      tag: "JWST"
    },
    {
      title: "Open Source Libs",
      description: "Разработка Python-библиотеки на базе SymPy/EinsteinPy для символьных вычислений тензоров Риччи и скаляров Кречмана в метриках Рэндалл-Сундрума (AdS5) и Калуцы-Клейна.",
      icon: Code,
      tag: "Dev"
    },
    {
      title: "Теоретический анализ",
      description: "Вывод эффективных уравнений движения частиц в поле слабого гравитационного потенциала с учетом скалярного поля радиона. Оценка влияния на кривые вращения галактик как альтернатива темной материи.",
      icon: Brain,
      tag: "Theory"
    }
  ];

  const fundedApplications = [
    {
      title: "Спутник-гравиметр",
      description: "Разработка 3U CubeSat с атомным интерферометром на холодных атомах (Rb-87) для измерения отклонений от закона Ньютона (1/r²) на НОО с точностью до 10⁻⁹ м/с².",
      icon: Satellite,
      cost: "$5M+"
    },
    {
      title: "ВЧ ГВ-детектор",
      description: "Строительство детектора на эффекте Герценштейна-Пустовойта (конверсия гравитонов в фотоны в магнитном поле) для регистрации ГВ мегагерцового диапазона от ранней Вселенной.",
      icon: Radio,
      cost: "$2M"
    },
    {
      title: "Модификация LHC",
      description: "Проектирование специализированных калориметров (Forward Physics Facility) для поиска 'missing energy' — сигнатуры ухода гравитонов в дополнительные измерения при столкновениях >13 ТэВ.",
      icon: Atom,
      cost: "$50M+"
    },
    {
      title: "Нейтринная лаб.",
      description: "Создание глубоководного нейтринного телескопа (аналог KM3NeT) для детектирования нейтрино PeV-энергий и проверки нарушения лоренц-инвариантности на планковских масштабах.",
      icon: Microscope,
      cost: "$100M"
    },
    {
      title: "Вакуумная энергетика",
      description: "Экспериментальная установка с использованием сверхпроводящих резонаторов (SQUID) для тестирования динамического эффекта Казимира и генерации фотонов из вакуумных флуктуаций.",
      icon: Zap,
      cost: "$1B+"
    },
    {
      title: "AI-Датацентр",
      description: "Кластер HPC (GPU A100/H100) для космологических N-body симуляций (Modified Gravity Gadget-4) эволюции крупномасштабной структуры Вселенной в рамках SIFS-теории.",
      icon: Server,
      cost: "$10M"
    },
    {
      title: "Стелс-материалы",
      description: "Разработка электромагнитных метаматериалов с отрицательным показателем преломления (Transformation Optics) для аналогового моделирования метрики искривленного пространства-времени в лаборатории.",
      icon: Microscope,
      cost: "$20M"
    },
    {
      title: "Квантовая связь",
      description: "Спутниковая миссия (QKD) для тестирования декогеренции запутанных фотонов в переменном гравитационном потенциале, проверка гипотезы ER=EPR и квантовой природы гравитации.",
      icon: Radio,
      cost: "$200M"
    },
    {
      title: "Космический телескоп",
      description: "Широкоугольный обзорный телескоп (класс Probe) для картографирования слабого гравитационного линзирования на z>2 с целью обнаружения отклонений от ОТО на космологических масштабах.",
      icon: Rocket,
      cost: "$500M"
    },
    {
      title: "Институт 5D",
      description: "Создание международного исследовательского центра (Think Tank) для объединения физиков-теоретиков и математиков: разработка формализма квантовой гравитации на базе фрактальной геометрии.",
      icon: Globe,
      cost: "$15M/год"
    }
  ];

  return (
    <Slide
      title="Практическое применение теории"
      subtitle="20 направлений для исследований: от анализа открытых данных до Mega-Science проектов"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full max-h-[80vh]">
        {/* Free / Open Access Section */}
        <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm overflow-hidden flex flex-col">
          <CardHeader className="pb-2 border-b border-green-500/20 bg-green-950/20">
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Laptop className="h-5 w-5" />
              Открытые исследования (Free / $0)
            </CardTitle>
            <p className="text-xs text-gray-400">Требуются: Python/Julia, доступ к arXiv/NASA ADS, вычислительное время</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {freeApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-900/10 border border-green-500/10 hover:bg-green-900/20 transition-colors group">
                    <div className="mt-1 p-2 rounded-md bg-green-500/10 text-green-400 group-hover:text-green-300 transition-colors shrink-0">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-green-200 text-sm group-hover:text-green-100">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-500 h-5 px-1.5 shrink-0">
                          {app.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed group-hover:text-gray-300 text-justify">
                        {app.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Funded / Capital Intensive Section */}
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm overflow-hidden flex flex-col">
          <CardHeader className="pb-2 border-b border-purple-500/20 bg-purple-950/20">
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Проекты с финансированием
            </CardTitle>
            <p className="text-xs text-gray-400">Требуются: Инвестиции, R&D лаборатории, международное сотрудничество</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {fundedApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-900/10 border border-purple-500/10 hover:bg-purple-900/20 transition-colors group">
                    <div className="mt-1 p-2 rounded-md bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors shrink-0">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-purple-200 text-sm group-hover:text-purple-100">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500 h-5 px-1.5 shrink-0">
                          {app.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed group-hover:text-gray-300 text-justify">
                        {app.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Slide>
  );
}
