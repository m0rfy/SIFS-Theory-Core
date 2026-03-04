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
  category: 'collapse' | 'temporal' | 'calculations' | 'visualizations';
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  usageCount?: number;
  lastUsed?: number;
}

const simulations: Simulation[] = [
  {
    id: 'collapse',
    name: 'Гравитационный коллапс',
    description:
      'Моделирование реакции вакуумной энергии SIFS на мгновенную потерю топологического узла. Изменяйте массу и масштабный коэффициент для наблюдения распространения информационных волн.',
    category: 'collapse',
    path: '/simulations/collapse',
    icon: Activity,
    color: 'from-red-600/20 to-orange-600/20',
    borderColor: 'border-red-500/30',
  },
  {
    id: 'temporal',
    name: 'Темпоральная калибровка',
    description:
      'Синхронизация атомных часов с учётом флуктуаций метрики SIFS. Точность до аттосекунд (10⁻¹⁸ с) с визуализацией дрейфа времени.',
    category: 'temporal',
    path: '/simulations/temporal',
    icon: Clock,
    color: 'from-blue-600/20 to-cyan-600/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'calculations',
    name: 'Интерактивные расчёты',
    description:
      'Калькуляторы для всех направлений теории SIFS: константы связи, тёмная энергия, масса частиц, фрактальная структура и другие.',
    category: 'calculations',
    path: '/simulations/calculations',
    icon: Calculator,
    color: 'from-indigo-600/20 to-purple-600/20',
    borderColor: 'border-indigo-500/30',
  },
  {
    id: 'visualizations',
    name: 'Визуализации',
    description:
      'Интерактивные графики и диаграммы для визуализации различных аспектов теории SIFS: иерархия масс, эволюция тёмной энергии, константы связи и другие.',
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
    <SpatialSlab preset="monolith" className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-[32px] md:text-4xl font-bold text-slate-100">Интерактивные симуляции</h1>
          <p className="text-sm md:text-base text-slate-400 max-w-3xl">
            Экспериментируйте с теорией SIFS через интерактивные симуляции. Все симуляции
            интегрированы с SSF-2025 Spatial Framework для real-time визуальных эффектов.
          </p>
        </div>

        {/* Hero image placeholder */}
        <ImagePlaceholder
          id="simulations-index-hero"
          label="Баннер раздела симуляций"
          hint="1920×480px — коллапс, часы, графики"
          aspect="4/1"
          className="w-full"
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
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
              <History className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Недавно использованные</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
                      className={`bg-gradient-to-br ${sim.color} border ${sim.borderColor} hover:border-opacity-60 transition-all cursor-pointer h-full`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`p-2 rounded-lg bg-slate-900/50 flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-slate-300" />
                          </div>
                          <CardTitle className="text-base md:text-lg break-words">{sim.name}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Simulations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">
              Все симуляции ({filteredSimulations.length})
            </h2>
            {Object.keys(usageStats).length > 0 && (
              <Badge variant="secondary" className="bg-slate-800 text-slate-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                Статистика доступна
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredSimulations.map((sim) => {
              const Icon = sim.icon;
              const usageCount = usageStats[sim.id] || 0;
              return (
                <Link
                  key={sim.id}
                  to={sim.path}
                  onClick={() => handleSimulationClick(sim.id)}
                  className="block"
                >
                  <Card
                    className={`bg-gradient-to-br ${sim.color} border ${sim.borderColor} hover:border-opacity-60 transition-all cursor-pointer flex flex-col`}
                  >
                    <CardHeader className="flex-1 flex flex-col !px-4 md:!px-6 !pt-4 md:!pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-lg bg-slate-900/50 flex-shrink-0`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg md:text-xl mb-1 break-words">{sim.name}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className="text-xs border-slate-700 text-slate-400"
                              >
                                {sim.category}
                              </Badge>
                              {usageCount > 0 && (
                                <Badge variant="secondary" className="text-xs bg-slate-800 text-slate-400">
                                  {usageCount} использований
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm md:text-base text-slate-300 leading-relaxed !mt-2 !mb-0">
                        {sim.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="!px-4 md:!px-6 !pt-4 !pb-4 md:!pb-6">
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 hover:bg-slate-800 hover:border-slate-600 min-h-[44px]"
                      >
                        Открыть симуляцию
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredSimulations.length === 0 && (
          <Card className="bg-slate-950 border-slate-800 text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Симуляции не найдены</p>
              <p className="text-slate-500 text-sm mt-2">
                Попробуйте изменить параметры поиска или фильтра
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </SpatialSlab>
  );
}
