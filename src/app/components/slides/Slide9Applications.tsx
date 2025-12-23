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
  Satellite
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
      description: "Поиск корреляций эволюции темной энергии w(z) в открытых данных DR2.",
      icon: Database,
      tag: "Data Science"
    },
    {
      title: "GW-аналитика",
      description: "Поиск высокочастотных гармоник в каталогах гравитационных волн GWTC-3.",
      icon: Radio,
      tag: "LIGO/Virgo"
    },
    {
      title: "Симуляция орбит",
      description: "Моделирование движения тел в метрике Гордона (Python/Julia).",
      icon: Laptop,
      tag: "Software"
    },
    {
      title: "Анализ CMB",
      description: "Поиск фрактальных паттернов и 'холодных пятен' на картах Planck.",
      icon: Search,
      tag: "Cosmology"
    },
    {
      title: "Кривые блеска",
      description: "Изучение лог-периодичности в данных светимости квазаров (SDSS).",
      icon: TrendingUp, // Will import locally or reuse
      tag: "Astrophysics"
    },
    {
      title: "Верификация масс",
      description: "Математическая проверка иерархии масс частиц через SIFS-геометрию.",
      icon: Calculator,
      tag: "Math"
    },
    {
      title: "Образование",
      description: "Создание визуализаций 5D-пространства для учебных материалов.",
      icon: Globe,
      tag: "Education"
    },
    {
      title: "Exoplanet Atmospheres",
      description: "Поиск аномалий рефракции в данных JWST (метрика Гордона).",
      icon: Search,
      tag: "JWST"
    },
    {
      title: "Open Source Libs",
      description: "Разработка библиотек для расчета геодезических в AdS5.",
      icon: Code,
      tag: "Dev"
    },
    {
      title: "Теоретический анализ",
      description: "Уточнение метрики для многочастичных систем.",
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
      description: "Калориметры для поиска 'исчезающей' энергии (уход в 5D).",
      icon: Atom,
      cost: "$50M+"
    },
    {
      title: "Нейтринная лаб.",
      description: "Глубоководный детектор для локализации источников нейтрино.",
      icon: Microscope,
      cost: "$100M"
    },
    {
      title: "Вакуумная энергетика",
      description: "R&D генератора на эффекте Швингера в искривленном поле.",
      icon: Zap,
      cost: "$1B+"
    },
    {
      title: "AI-Датацентр",
      description: "Кластер для ML-симуляции эволюции фрактальной Вселенной.",
      icon: Server,
      cost: "$10M"
    },
    {
      title: "Стелс-материалы",
      description: "Метаматериалы, имитирующие оптическую метрику Гордона.",
      icon: Microscope,
      cost: "$20M"
    },
    {
      title: "Квантовая связь",
      description: "Прототипирование дальней связи через ER=EPR мосты.",
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

  // Need to define TrendingUp locally since I used it above but didn't import it in the first list
  const TrendingUp = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

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
              Открытые исследования (0 ₽)
            </CardTitle>
            <p className="text-xs text-gray-400">Требуются только данные и время</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {freeApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-900/10 border border-green-500/10 hover:bg-green-900/20 transition-colors">
                    <div className="mt-1 p-2 rounded-md bg-green-500/10 text-green-400">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-green-200 text-sm">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-500 h-5 px-1.5">
                          {app.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
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
            <p className="text-xs text-gray-400">Требуются капитал или господдержка</p>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full max-h-[600px] p-4">
              <div className="space-y-3">
                {fundedApplications.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-900/10 border border-purple-500/10 hover:bg-purple-900/20 transition-colors">
                    <div className="mt-1 p-2 rounded-md bg-purple-500/10 text-purple-400">
                      <app.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-purple-200 text-sm">{app.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500 h-5 px-1.5">
                          {app.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
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
