/**
 * RouteSelector Component
 * 
 * T078: Recommended route selection (for beginners, experts, curious),
 * route visualization, navigation along selected route
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Rocket, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DOCUMENTS, getDocumentById } from '@/app/utils/docs-structure';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export type RouteType = 'beginners' | 'experts' | 'curious';

export interface Route {
  id: RouteType;
  title: string;
  description: string;
  icon: typeof GraduationCap;
  color: string;
  documents: string[];
  estimatedTime: string;
}

export const ROUTES: Route[] = [
  {
    id: 'beginners',
    title: 'Для начинающих',
    description: 'Введение в теорию SIFS для новичков. Начните с основ и постепенно углубляйтесь в детали.',
    icon: GraduationCap,
    color: 'oklch(65% 0.25 150)', // green
    documents: ['overview', 'fractal-structure', 'mathematics'],
    estimatedTime: '30-45 минут',
  },
  {
    id: 'experts',
    title: 'Для экспертов',
    description: 'Продвинутые материалы для специалистов. Углублённые расчёты и детальные предсказания.',
    icon: Rocket,
    color: 'oklch(65% 0.25 320)', // purple
    documents: ['equations-of-motion', 'constants-unification', 'detailed-predictions'],
    estimatedTime: '60-90 минут',
  },
  {
    id: 'curious',
    title: 'Для любознательных',
    description: 'Интересные материалы для широкой аудитории. Космология, астрофизика и практические применения.',
    icon: Lightbulb,
    color: 'oklch(65% 0.25 60)', // orange
    documents: ['overview', 'cosmological', 'astrophysical'],
    estimatedTime: '45-60 минут',
  },
];

export interface RouteSelectorProps {
  /** Выбранный маршрут */
  selectedRoute?: RouteType | null;
  /** Обработчик выбора маршрута */
  onRouteSelect?: (route: RouteType) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * RouteSelector component
 * 
 * Отображает выбор рекомендуемых маршрутов с визуализацией и навигацией
 */
export function RouteSelector({ selectedRoute, onRouteSelect, className }: RouteSelectorProps) {
  const [hoveredRoute, setHoveredRoute] = useState<RouteType | null>(null);

  const handleRouteClick = (routeId: RouteType) => {
    onRouteSelect?.(routeId);
  };

  const selectedRouteData = selectedRoute ? ROUTES.find(r => r.id === selectedRoute) : null;

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          Рекомендуемые маршруты
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Выберите маршрут, который подходит вам лучше всего
        </p>
      </div>

      {/* Выбор маршрута */}
      <div className="grid md:grid-cols-3 gap-4">
        {ROUTES.map((route) => {
          const Icon = route.icon;
          const isSelected = selectedRoute === route.id;
          const isHovered = hoveredRoute === route.id;

          return (
            <motion.div
              key={route.id}
              onHoverStart={() => setHoveredRoute(route.id)}
              onHoverEnd={() => setHoveredRoute(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={cn(
                  'relative overflow-hidden cursor-pointer transition-all duration-300',
                  'bg-slate-950/50 border-slate-800',
                  isSelected && 'border-cyan-400 shadow-lg shadow-cyan-400/20',
                  isHovered && !isSelected && 'border-slate-700'
                )}
                style={{
                  borderColor: isSelected ? route.color : undefined,
                }}
                onClick={() => handleRouteClick(route.id)}
              >
                {/* Градиентный фон при выборе */}
                <motion.div
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${route.color}20 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: isSelected || isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <motion.div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${route.color}20`,
                        color: route.color,
                      }}
                      animate={{
                        scale: isSelected ? [1, 1.1, 1] : 1,
                        rotate: isSelected ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    {isSelected && (
                      <Badge
                        variant="outline"
                        className="bg-slate-900/50"
                        style={{ borderColor: route.color, color: route.color }}
                      >
                        Выбрано
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{route.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {route.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>⏱️ {route.estimatedTime}</span>
                    <span>{route.documents.length} документов</span>
                  </div>
                </CardContent>

                {/* Эффект свечения при выборе */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: `0 0 20px ${route.color}40`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Визуализация выбранного маршрута */}
      <AnimatePresence>
        {selectedRouteData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-950/50 border-slate-800 mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <selectedRouteData.icon
                      className="w-6 h-6"
                      style={{ color: selectedRouteData.color }}
                    />
                    Маршрут: {selectedRouteData.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    style={{ borderColor: selectedRouteData.color, color: selectedRouteData.color }}
                  >
                    {selectedRouteData.estimatedTime}
                  </Badge>
                </div>
                <CardDescription>{selectedRouteData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 mb-3">
                    Документы в маршруте:
                  </h3>
                  <div className="space-y-2">
                    {selectedRouteData.documents.map((docId, index) => {
                      const doc = getDocumentById(docId);
                      if (!doc) return null;

                      const docPath = doc.path.replace('/docs/', '/docs/').replace('.md', '');

                      return (
                        <motion.div
                          key={docId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
                        >
                          <CheckCircle2
                            className="w-5 h-5 shrink-0"
                            style={{ color: selectedRouteData.color }}
                          />
                          <div className="flex-1">
                            <Link
                              to={docPath}
                              className="text-slate-200 hover:text-cyan-400 transition-colors font-medium"
                            >
                              {doc.title}
                            </Link>
                            {doc.description && (
                              <p className="text-sm text-slate-400 mt-1">{doc.description}</p>
                            )}
                          </div>
                          <Link to={docPath}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0"
                              style={{ color: selectedRouteData.color }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <Link to={`/docs?route=${selectedRouteData.id}`}>
                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: `${selectedRouteData.color}20`,
                          borderColor: selectedRouteData.color,
                          color: selectedRouteData.color,
                        }}
                      >
                        Начать маршрут
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
