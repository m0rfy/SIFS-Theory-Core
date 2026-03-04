/**
 * WorldChangePage - Страница "Как теория изменит мир"
 * 
 * Эпичная анимация входа, "путешествие" по залам применения теории,
 * визуализации и примеры
 * 
 * T091 [US9]: Epic entrance animation and 6 halls
 * T097 [US9]: Integrate all museum components
 * T098 [US9]: Add visualizations for each hall
 * SC-021: Page load time < 5 seconds
 */

import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Clock, 
  Cpu, 
  Rocket, 
  Heart, 
  Radio,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ParallaxHero } from '@/app/components/museum/ParallaxHero';
import { HallCard, MuseumHall } from '@/app/components/museum';
import { WorldChangeExample, WorldChangeExampleData } from '@/app/components/museum/WorldChangeExample';
import { BeforeAfterComparison, BeforeAfterData } from '@/app/components/museum/BeforeAfterComparison';
import { TimelineExhibit, TimelineEvent } from '@/app/components/museum/TimelineExhibit';
import { ExhibitCard } from '@/app/components/museum/ExhibitCard';
import { ScrollReveal } from '@/app/components/enhanced/ScrollReveal';
import { FractalBackground, CosmicGradient, MovingGrid } from '@/app/components/visual';
import { NeoCard } from '@/app/components/visual';
import { SpatialSlab } from '@/app/components/spatial';
import { cn } from '@/app/components/ui/utils';

// Lazy load visualization components for performance (SC-021)
const MassHierarchyChart = lazy(() => 
  import('@/app/components/MassHierarchyChart').then(m => ({ default: m.MassHierarchyChart }))
);
const DarkEnergyEvolution = lazy(() => 
  import('@/app/components/DarkEnergyEvolution').then(m => ({ default: m.DarkEnergyEvolution }))
);
const CouplingConstantsDiagram = lazy(() => 
  import('@/app/components/CouplingConstantsDiagram').then(m => ({ default: m.CouplingConstantsDiagram }))
);

// Данные для 6 залов
const halls: MuseumHall[] = [
  {
    id: 'energy',
    name: 'Будущее энергетики',
    description: 'Революционные технологии получения и передачи энергии на основе фрактальной геометрии пространства-времени',
    icon: '⚡',
    color: 'oklch(70% 0.3 150)',
    exhibits: [
      {
        id: 'energy-1',
        title: 'Беспроводная передача энергии',
        description: 'Использование фрактальных резонансов для передачи энергии на любые расстояния без потерь',
        type: 'example',
        contentId: 'energy-wireless',
      },
      {
        id: 'energy-2',
        title: 'Генерация из вакуума',
        description: 'Извлечение энергии из квантовых флуктуаций пространства-времени',
        type: 'example',
        contentId: 'energy-vacuum',
      },
    ],
  },
  {
    id: 'time',
    name: 'Путешествия во времени',
    description: 'Манипуляции с временной структурой пространства-времени для перемещений во времени',
    icon: '⏰',
    color: 'oklch(65% 0.25 250)',
    exhibits: [
      {
        id: 'time-1',
        title: 'Временные порталы',
        description: 'Создание стабильных временных коридоров для безопасных перемещений',
        type: 'example',
        contentId: 'time-portals',
      },
      {
        id: 'time-2',
        title: 'Хронометраж',
        description: 'Точная синхронизация времени в масштабах Вселенной',
        type: 'example',
        contentId: 'time-chronometry',
      },
    ],
  },
  {
    id: 'quantum',
    name: 'Квантовые вычисления',
    description: 'Квантовые компьютеры нового поколения с использованием фрактальной структуры пространства',
    icon: '💻',
    color: 'oklch(70% 0.3 280)',
    exhibits: [
      {
        id: 'quantum-1',
        title: 'Фрактальные кубиты',
        description: 'Квантовые биты на основе фрактальной геометрии с улучшенной стабильностью',
        type: 'example',
        contentId: 'quantum-qubits',
      },
      {
        id: 'quantum-2',
        title: 'Квантовая телепортация',
        description: 'Мгновенная передача информации через квантовую запутанность',
        type: 'example',
        contentId: 'quantum-teleportation',
      },
    ],
  },
  {
    id: 'space',
    name: 'Космические путешествия',
    description: 'Межзвёздные и межгалактические путешествия через манипуляции с пространством-временем',
    icon: '🚀',
    color: 'oklch(70% 0.3 200)',
    exhibits: [
      {
        id: 'space-1',
        title: 'Искривление пространства',
        description: 'Создание "пузырей Алькубьерре" для сверхсветовых перемещений',
        type: 'example',
        contentId: 'space-warp',
      },
      {
        id: 'space-2',
        title: 'Порталы в другие измерения',
        description: 'Использование дополнительных измерений для мгновенных перемещений',
        type: 'example',
        contentId: 'space-portals',
      },
    ],
  },
  {
    id: 'medicine',
    name: 'Медицина будущего',
    description: 'Революционные методы лечения и продления жизни через управление временем и пространством',
    icon: '❤️',
    color: 'oklch(70% 0.3 20)',
    exhibits: [
      {
        id: 'medicine-1',
        title: 'Регенерация тканей',
        description: 'Ускорение процессов регенерации через манипуляции с временной структурой клеток',
        type: 'example',
        contentId: 'medicine-regeneration',
      },
      {
        id: 'medicine-2',
        title: 'Обращение старения',
        description: 'Контроль течения времени на клеточном уровне',
        type: 'example',
        contentId: 'medicine-aging',
      },
    ],
  },
  {
    id: 'communication',
    name: 'Связь и коммуникации',
    description: 'Мгновенная связь на любых расстояниях через квантовую запутанность и фрактальные резонансы',
    icon: '📡',
    color: 'oklch(70% 0.3 320)',
    exhibits: [
      {
        id: 'communication-1',
        title: 'Квантовая связь',
        description: 'Мгновенная передача информации без задержек на любые расстояния',
        type: 'example',
        contentId: 'communication-quantum',
      },
      {
        id: 'communication-2',
        title: 'Фрактальные антенны',
        description: 'Антенны с фрактальной структурой для максимальной эффективности',
        type: 'example',
        contentId: 'communication-fractal',
      },
    ],
  },
];

// Примеры применения теории для каждого зала
const getHallExamples = (hallId: string): WorldChangeExampleData[] => {
  const examples: Record<string, WorldChangeExampleData[]> = {
    energy: [
      {
        id: 'energy-example-1',
        title: 'Беспроводная передача энергии',
        description: 'Использование фрактальных резонансов позволяет передавать энергию на любые расстояния без проводов и потерь',
        category: 'energy',
        icon: '⚡',
        color: 'oklch(70% 0.3 150)',
        comparison: {
          beforeTitle: 'Традиционная передача',
          beforeDescription: 'Энергия передаётся по проводам с потерями до 30%, ограничена расстоянием',
          afterTitle: 'Фрактальная передача',
          afterDescription: 'Энергия передаётся через резонансы пространства-времени без потерь на любые расстояния',
        },
      },
    ],
    time: [
      {
        id: 'time-example-1',
        title: 'Временные порталы',
        description: 'Стабильные временные коридоры для безопасных перемещений во времени',
        category: 'time',
        icon: '⏰',
        color: 'oklch(65% 0.25 250)',
        comparison: {
          beforeTitle: 'Невозможность перемещений',
          beforeDescription: 'Путешествия во времени считались невозможными из-за парадоксов',
          afterTitle: 'Стабильные порталы',
          afterDescription: 'Фрактальная структура пространства-времени позволяет создавать стабильные временные коридоры',
        },
      },
    ],
    quantum: [
      {
        id: 'quantum-example-1',
        title: 'Фрактальные кубиты',
        description: 'Квантовые биты на основе фрактальной геометрии с улучшенной стабильностью и производительностью',
        category: 'quantum',
        icon: '💻',
        color: 'oklch(70% 0.3 280)',
        comparison: {
          beforeTitle: 'Традиционные кубиты',
          beforeDescription: 'Высокая чувствительность к внешним воздействиям, короткое время когерентности',
          afterTitle: 'Фрактальные кубиты',
          afterDescription: 'Улучшенная стабильность благодаря фрактальной структуре, длительное время когерентности',
        },
      },
    ],
    space: [
      {
        id: 'space-example-1',
        title: 'Искривление пространства',
        description: 'Создание "пузырей Алькубьерре" для сверхсветовых перемещений между звёздами',
        category: 'space',
        icon: '🚀',
        color: 'oklch(70% 0.3 200)',
        comparison: {
          beforeTitle: 'Ограничение скоростью света',
          beforeDescription: 'Межзвёздные путешествия занимают тысячи лет даже к ближайшим звёздам',
          afterTitle: 'Сверхсветовые перемещения',
          afterDescription: 'Искривление пространства-времени позволяет достигать других звёзд за дни',
        },
      },
    ],
    medicine: [
      {
        id: 'medicine-example-1',
        title: 'Регенерация тканей',
        description: 'Ускорение процессов регенерации через манипуляции с временной структурой клеток',
        category: 'medicine',
        icon: '❤️',
        color: 'oklch(70% 0.3 20)',
        comparison: {
          beforeTitle: 'Медленная регенерация',
          beforeDescription: 'Естественные процессы заживления занимают недели и месяцы',
          afterTitle: 'Ускоренная регенерация',
          afterDescription: 'Контроль времени на клеточном уровне ускоряет заживление в разы',
        },
      },
    ],
    communication: [
      {
        id: 'communication-example-1',
        title: 'Квантовая связь',
        description: 'Мгновенная передача информации без задержек на любые расстояния через квантовую запутанность',
        category: 'communication',
        icon: '📡',
        color: 'oklch(70% 0.3 320)',
        comparison: {
          beforeTitle: 'Ограниченная скорость',
          beforeDescription: 'Связь ограничена скоростью света, задержки при межпланетной связи',
          afterTitle: 'Мгновенная связь',
          afterDescription: 'Квантовая запутанность обеспечивает мгновенную связь на любых расстояниях',
        },
      },
    ],
  };
  return examples[hallId] || [];
};

// Временная линия для зала
const getHallTimeline = (hallId: string): TimelineEvent[] => {
  const timelines: Record<string, TimelineEvent[]> = {
    energy: [
      {
        id: 'energy-timeline-1',
        title: 'Открытие фрактальных резонансов',
        description: 'Обнаружение возможности передачи энергии через резонансы пространства-времени',
        date: '2025',
        icon: '🔬',
        color: 'oklch(70% 0.3 150)',
      },
      {
        id: 'energy-timeline-2',
        title: 'Первый прототип передатчика',
        description: 'Создание рабочего прототипа беспроводной передачи энергии',
        date: '2027',
        icon: '⚡',
        color: 'oklch(70% 0.3 150)',
      },
      {
        id: 'energy-timeline-3',
        title: 'Коммерческое применение',
        description: 'Внедрение технологии в повседневную жизнь',
        date: '2030',
        icon: '🏭',
        color: 'oklch(70% 0.3 150)',
      },
    ],
  };
  return timelines[hallId] || [];
};

export function WorldChangePage() {
  const [selectedHall, setSelectedHall] = useState<MuseumHall | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Эпичная анимация входа
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedHallExamples = selectedHall ? getHallExamples(selectedHall.id) : [];
  const selectedHallTimeline = selectedHall ? getHallTimeline(selectedHall.id) : [];

  return (
    <div className="relative min-h-screen">
      {/* Background visual effects */}
      <div className="fixed inset-0 -z-10">
        <FractalBackground className="opacity-30" />
        <CosmicGradient className="absolute inset-0 opacity-20" />
        <MovingGrid className="absolute inset-0 opacity-10" />
      </div>

      {/* T103 [US10]: Main content with Monolith preset */}
      <SpatialSlab preset="monolith" className="relative z-10">
        {/* Epic entrance animation with ParallaxHero */}
        <ParallaxHero
        title="Как теория изменит мир"
        subtitle="Путешествие по залам применения SIFS Theory"
        parallaxSpeed={0.5}
        className="min-h-[60vh] md:min-h-[80vh] w-full"
      >
        <motion.div
          className="text-center space-y-4 z-10 relative px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
            Откройте для себя революционные применения теории SIFS в различных областях:
            от энергетики до медицины, от космических путешествий до квантовых вычислений
          </p>
        </motion.div>
      </ParallaxHero>

      {/* Main content */}
      <div className="spatial-page-block spatial-monolith relative z-10">
        {/* Залы музея */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-8 md:py-16 px-4 md:px-0">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Залы применения теории
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {halls.map((hall, index) => (
                <ScrollReveal key={hall.id} direction="up" delay={index * 100}>
                  <HallCard
                    hall={hall}
                    onClick={() => setSelectedHall(hall)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Детали выбранного зала */}
        <AnimatePresence>
          {selectedHall && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="py-8 md:py-16 px-4 md:px-0"
            >
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Заголовок зала */}
                <div className="text-center">
                  <motion.button
                    onClick={() => setSelectedHall(null)}
                    className="mb-4 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ArrowRight className="rotate-180" />
                    Вернуться к залам
                  </motion.button>
                  <h2
                    className="text-3xl md:text-5xl font-bold mb-4"
                    style={{ color: selectedHall.color }}
                  >
                    {selectedHall.name}
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    {selectedHall.description}
                  </p>
                </div>

                {/* Визуализации для зала */}
                <ScrollReveal direction="up" delay={100}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                      <NeoCard variant="card" className="p-4">
                        <h4 className="text-cyan-400 mb-4 text-center">Иерархия масс</h4>
                        <MassHierarchyChart />
                      </NeoCard>
                    </Suspense>
                    <Suspense fallback={<div className="h-64 bg-black/40 rounded-lg animate-pulse" />}>
                      <NeoCard variant="card" className="p-4">
                        <h4 className="text-green-400 mb-4 text-center">Эволюция тёмной энергии</h4>
                        <DarkEnergyEvolution />
                      </NeoCard>
                    </Suspense>
                  </div>
                </ScrollReveal>

                {/* Примеры применения */}
                {selectedHallExamples.length > 0 && (
                  <ScrollReveal direction="up" delay={200}>
                    <section>
                      <h3 className="text-2xl font-bold mb-6 text-center">Примеры применения</h3>
                      <div className="space-y-6">
                        {selectedHallExamples.map((example) => (
                          <WorldChangeExample key={example.id} example={example} />
                        ))}
                      </div>
                    </section>
                  </ScrollReveal>
                )}

                {/* Временная линия */}
                {selectedHallTimeline.length > 0 && (
                  <ScrollReveal direction="up" delay={300}>
                    <section>
                      <h3 className="text-2xl font-bold mb-6 text-center">Временная линия развития</h3>
                      <TimelineExhibit events={selectedHallTimeline} />
                    </section>
                  </ScrollReveal>
                )}

                {/* Экспонаты зала */}
                {selectedHall.exhibits && selectedHall.exhibits.length > 0 && (
                  <ScrollReveal direction="up" delay={400}>
                    <section>
                      <h3 className="text-2xl font-bold mb-6 text-center">Экспонаты зала</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedHall.exhibits.map((exhibit) => (
                          <ExhibitCard key={exhibit.id} exhibit={exhibit} />
                        ))}
                      </div>
                    </section>
                  </ScrollReveal>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </SpatialSlab>
    </div>
  );
}
