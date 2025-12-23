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
      description: "Валидация дрейфа темной энергии w(z) на Python по открытым датасетам DR2 (LBL).",
      icon: Database,
      tag: "Data Science"
    },
    {
      title: "GW-аналитика",
      description: "Спектральный анализ сигналов LIGO (GWTC-3) на наличие частот >1 кГц (следы 5D).",
      icon: Radio,
      tag: "LIGO/Virgo"
    },
    {
      title: "Симуляция орбит",
      description: "Численное моделирование геодезических в метрике Гордона (Julia/Python).",
      icon: Laptop,
      tag: "Simulation"
    },
    {
      title: "Анализ CMB",
      description: "Поиск фрактальных паттернов и 'холодных пятен' на картах Planck (HEALPix).",
      icon: Search,
      tag: "Cosmology"
    },
    {
      title: "Кривые блеска",
      description: "Изучение лог-периодичности в данных светимости квазаров (SDSS/ZTF).",
      icon: TrendingUp,
      tag: "Astrophysics"
    },
    {
      title: "Верификация масс",
      description: "Математическая проверка иерархии масс частиц через SIFS-геометрию.",
      icon: Calculator,
      tag: "Math"
    },
    {
      title: "Образовательные 3D",
      description: "Разработка WebGL визуализаций 5D-пространства для студентов.",
      icon: Globe,
      tag: "Education"
    },
    {
      title: "Exoplanet Atmospheres",
      description: "Поиск аномалий рефракции в открытых данных JWST (метрика Гордона).",
      icon: Search,
      tag: "JWST"
    },
    {
      title: "Open Source Libs",
      description: "Создание открытых библиотек для расчета тензоров в AdS5 (GitHub).",
      icon: Code,
      tag: "Dev"
    },
    {
      title: "Теоретический анализ",
      description: "Уточнение уравнений движения для многочастичных систем в SIFS.",
      icon: Brain,
      tag: "Theory"
    }
  ];

  const fundedApplications = [
    {
      title: "Спутник-гравиметр",
      description: "CubeSat с атомным интерферометром для теста закона 1/r² на орбите.",
      icon: Satellite,
      cost: "$5M+"
    },
    {
      title: "ВЧ ГВ-детектор",
      description: "Детектор на эффекте Герценштейна-Пустовойта для частот >10 кГц.",
      icon: Radio,
      cost: "$2M"
    },
    {
      title: "Модификация LHC",
      description: "Калориметры для поиска 'исчезающей' энергии (уход в 5D-балк).",
      icon: Atom,
      cost: "$50M+"
    },
    {
      title: "Нейтринная лаб.",
      description: "Глубоководный детектор для точной локализации источников ВЭ-нейтрино.",
      icon: Microscope,
      cost: "$100M"
    },
    {
      title: "Вакуумная энергетика",
      description: "R&D генератора на эффекте Швингера в искривленном поле (прототип).",
      icon: Zap,
      cost: "$1B+"
    },
    {
      title: "AI-Датацентр",
      description: "HPC-кластер для ML-симуляции эволюции фрактальной Вселенной.",
      icon: Server,
      cost: "$10M"
    },
    {
      title: "Стелс-материалы",
      description: "Метаматериалы, имитирующие оптическую метрику Гордона для волн.",
      icon: Microscope,
      cost: "$20M"
    },
    {
      title: "Квантовая связь",
      description: "Прототипирование дальней связи через ER=EPR мосты (спутники).",
      icon: Radio,
      cost: "$200M"
    },
    {
      title: "Космический телескоп",
      description: "Специализированный инструмент для поиска warp-линзирования.",
      icon: Rocket,
      cost: "$500M"
    },
    {
      title: "Институт 5D",
      description: "Создание международного центра теоретической физики.",
      icon: Globe,
      cost: "$15M/год"
    }
  ];

  return (
    <Slide
      title="Практическое применение теории"
      subtitle="20 реальных направлений для исследований и реализации"
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
            <p className="text-xs text-gray-400">Требуются только данные, код и время</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {freeApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-900/10 border border-green-500/10 hover:bg-green-900/20 transition-colors group">
                    <div className="mt-1 p-2 rounded-md bg-green-500/10 text-green-400 group-hover:text-green-300 transition-colors">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-green-200 text-sm group-hover:text-green-100">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-500 h-5 px-1.5">
                          {app.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed group-hover:text-gray-300">
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
            <p className="text-xs text-gray-400">Требуются инвестиции или гранты</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {fundedApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-900/10 border border-purple-500/10 hover:bg-purple-900/20 transition-colors group">
                    <div className="mt-1 p-2 rounded-md bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-purple-200 text-sm group-hover:text-purple-100">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500 h-5 px-1.5">
                          {app.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed group-hover:text-gray-300">
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
