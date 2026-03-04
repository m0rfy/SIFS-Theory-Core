/**
 * SimulationsIndexPage - Индекс симуляций
 * 
 * Каталог доступных симуляций с описаниями, фильтрацией по категориям,
 * статистикой использования и быстрым доступом к недавно использованным симуляциям
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { SpatialSlab } from '@/app/components/spatial';
import {
  Activity,
  Clock,
  Calculator,
  BarChart3,
  Search,
  Filter,
  TrendingUp,
  History,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

interface Simulation {
  id: string;
  name: string;
  description: string;
  /** Краткий список «что внутри» для карточки */
  features: string[];
  category: 'collapse' | 'temporal' | 'calculations' | 'visualizations';
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  usageCount?: number;
  lastUsed?: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  collapse: 'Коллапс',
  temporal: 'Время',
  calculations: 'Расчёты',
  visualizations: 'Графики',
};

const simulations: Simulation[] = [
  {
    id: 'collapse',
    name: 'Гравитационный коллапс',
    description: 'Реакция вакуумной энергии SIFS на потерю топологического узла: волны, масштаб, масса.',
    features: ['Параметры массы и масштаба', 'Распространение информационных волн', 'Визуализация коллапса'],
    category: 'collapse',
    path: '/simulations/collapse',
    icon: Activity,
    color: 'from-red-600/20 to-orange-600/20',
    borderColor: 'border-red-500/30',
  },
  {
    id: 'temporal',
    name: 'Темпоральная калибровка',
    description: 'Синхронизация атомных часов с учётом флуктуаций метрики SIFS, точность до аттосекунд.',
    features: ['Дрейф времени', 'Аттосекундная точность', 'Сравнение с эталоном'],
    category: 'temporal',
    path: '/simulations/temporal',
    icon: Clock,
    color: 'from-blue-600/20 to-cyan-600/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'calculations',
    name: 'Интерактивные расчёты',
    description: 'Калькуляторы по теории SIFS: константы связи, тёмная энергия, массы, фрактальная структура.',
    features: ['Константы связи', 'w(z) тёмная энергия', 'Иерархия масс', 'Формулы из документации'],
    category: 'calculations',
    path: '/simulations/calculations',
    icon: Calculator,
    color: 'from-indigo-600/20 to-purple-600/20',
    borderColor: 'border-indigo-500/30',
  },
  {
    id: 'visualizations',
    name: 'Визуализации',
    description: 'Графики и диаграммы: иерархия масс, эволюция тёмной энергии, константы связи.',
    features: ['Иерархия масс', 'Эволюция w(z)', 'Константы связи', 'RS2 и фракталы'],
    category: 'visualizations',
    path: '/simulations/visualizations',
    icon: BarChart3,
    color: 'from-green-600/20 to-emerald-600/20',
    borderColor: 'border-green-500/30',
  },
];

export function SimulationsIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentSimulations, setRecentSimulations] = useState<string[]>([]);
  const [usageStats, setUsageStats] = useState<Record<string, number>>({});

  // Загрузка статистики использования из localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('sifs-simulation-stats');
    if (savedStats) {
      try {
        setUsageStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to load usage stats:', e);
      }
    }

    const savedRecent = localStorage.getItem('sifs-recent-simulations');
    if (savedRecent) {
      try {
        setRecentSimulations(JSON.parse(savedRecent));
      } catch (e) {
        console.error('Failed to load recent simulations:', e);
      }
    }
  }, []);

  // Фильтрация симуляций
  const filteredSimulations = simulations.filter((sim) => {
    const matchesSearch =
      sim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sim.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sim.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Получение недавно использованных симуляций
  const recentSims = recentSimulations
    .map((id) => simulations.find((s) => s.id === id))
    .filter((s): s is Simulation => s !== undefined)
    .slice(0, 3);

  // Обновление статистики при клике на симуляцию
  const handleSimulationClick = (id: string) => {
    const newStats = { ...usageStats, [id]: (usageStats[id] || 0) + 1 };
    setUsageStats(newStats);
    localStorage.setItem('sifs-simulation-stats', JSON.stringify(newStats));

    const newRecent = [id, ...recentSimulations.filter((sid) => sid !== id)].slice(0, 5);
    setRecentSimulations(newRecent);
    localStorage.setItem('sifs-recent-simulations', JSON.stringify(newRecent));
  };

  return (
    <SpatialSlab preset="monolith" className="min-h-screen p-4 md:p-6 lg:p-8 pb-20">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Симуляции SIFS
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl">
            Калькуляторы, визуализации и интерактивные сценарии по теории Scale-Invariant Fractal Spacetime.
          </p>
        </header>

        {/* Hero — компактный баннер */}
        <ImagePlaceholder
          id="simulations-index-hero"
          label="Баннер раздела симуляций"
          hint="1200×300px"
          aspect="4/1"
          className="w-full rounded-xl"
        />

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Поиск симуляций..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-800 text-slate-100 min-h-[44px]"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] bg-slate-900 border-slate-800 min-h-[44px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800">
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="collapse">Коллапс</SelectItem>
              <SelectItem value="temporal">Темпоральные</SelectItem>
              <SelectItem value="calculations">Расчёты</SelectItem>
              <SelectItem value="visualizations">Визуализации</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recently Used */}
        {recentSims.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4" />
              Недавно открывали
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recentSims.map((sim) => {
                const Icon = sim.icon;
                return (
                  <Link
                    key={sim.id}
                    to={sim.path}
                    onClick={() => handleSimulationClick(sim.id)}
                    className="block"
                  >
                    <Card
                      className={`bg-gradient-to-br ${sim.color} border ${sim.borderColor} hover:border-opacity-70 transition-all cursor-pointer h-full`}
                    >
                      <CardHeader className="py-3 px-4 flex flex-row items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900/50 flex-shrink-0">
                          <Icon className="w-5 h-5 text-slate-300" />
                        </div>
                        <CardTitle className="text-base break-words">{sim.name}</CardTitle>
                        <ChevronRight className="w-4 h-4 text-slate-500 ml-auto flex-shrink-0" />
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All Simulations — карточки с «что внутри» */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200">
              Выберите симуляцию
            </h2>
            {Object.keys(usageStats).length > 0 && (
              <Badge variant="secondary" className="bg-slate-800/80 text-slate-400 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Статистика
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredSimulations.map((sim) => {
              const Icon = sim.icon;
              const usageCount = usageStats[sim.id] || 0;
              return (
                <Link
                  key={sim.id}
                  to={sim.path}
                  onClick={() => handleSimulationClick(sim.id)}
                  className="block group"
                >
                  <Card
                    className={`bg-gradient-to-br ${sim.color} border ${sim.borderColor} hover:border-opacity-70 transition-all cursor-pointer overflow-hidden`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-stretch">
                      <div className="flex items-center gap-4 p-4 md:p-6 flex-1 min-w-0">
                        <div className="p-3 rounded-xl bg-slate-900/50 flex-shrink-0">
                          <Icon className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <CardTitle className="text-lg md:text-xl break-words">{sim.name}</CardTitle>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {CATEGORY_LABELS[sim.category] ?? sim.category}
                            </Badge>
                            {usageCount > 0 && (
                              <span className="text-xs text-slate-500">{usageCount} использований</span>
                            )}
                          </div>
                          <CardDescription className="text-slate-300 text-sm md:text-base leading-relaxed">
                            {sim.description}
                          </CardDescription>
                          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                            {sim.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <span className="text-slate-500">·</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-center sm:justify-end p-4 md:p-6 border-t sm:border-t-0 sm:border-l border-slate-700/50">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 hover:bg-slate-800 hover:border-slate-500 min-h-[44px] gap-2 group-hover:gap-3 transition-all"
                        >
                          Открыть
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {filteredSimulations.length === 0 && (
          <Card className="bg-slate-950/80 border-slate-700 text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Ничего не найдено</p>
              <p className="text-slate-500 text-sm mt-2">
                Измените поиск или выберите «Все категории»
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </SpatialSlab>
  );
}
