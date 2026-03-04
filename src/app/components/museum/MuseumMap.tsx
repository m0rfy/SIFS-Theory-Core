/**
 * MuseumMap Component
 * 
 * T077: Interactive map of all museum halls, visualization of museum structure,
 * navigation between halls
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Calculator, TrendingUp, Database, Shield, FileText, BarChart3, Eye } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DOCUMENTS, DocumentCategory } from '@/app/utils/docs-structure';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

const CATEGORY_ICONS: Record<DocumentCategory, typeof BookOpen> = {
  theory: BookOpen,
  calculations: Calculator,
  predictions: TrendingUp,
  data: Database,
  defense: Shield,
  protocol: FileText,
  analysis: BarChart3,
  visualizations: Eye,
};

const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  theory: 'oklch(65% 0.25 250)', // cyan
  calculations: 'oklch(65% 0.25 150)', // green
  predictions: 'oklch(65% 0.25 320)', // purple
  data: 'oklch(65% 0.25 200)', // blue
  defense: 'oklch(65% 0.25 30)', // red
  protocol: 'oklch(65% 0.25 60)', // orange
  analysis: 'oklch(65% 0.25 280)', // violet
  visualizations: 'oklch(65% 0.25 180)', // teal
};

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  theory: 'Теория',
  calculations: 'Расчёты',
  predictions: 'Предсказания',
  data: 'Данные',
  defense: 'Защита',
  protocol: 'Протоколы',
  analysis: 'Анализ',
  visualizations: 'Визуализации',
};

export interface MuseumMapProps {
  /** Обработчик выбора зала */
  onHallSelect?: (category: DocumentCategory) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * MuseumMap component
 * 
 * Отображает интерактивную карту всех залов музея с визуализацией структуры
 * и навигацией между залами
 */
export function MuseumMap({ onHallSelect, className }: MuseumMapProps) {
  const [hoveredHall, setHoveredHall] = useState<DocumentCategory | null>(null);

  const halls = useMemo(() => {
    return Object.entries(DOCUMENTS.categories).map(([category, docs]) => ({
      category: category as DocumentCategory,
      documents: docs,
      count: docs.length,
      icon: CATEGORY_ICONS[category as DocumentCategory],
      color: CATEGORY_COLORS[category as DocumentCategory],
      label: CATEGORY_LABELS[category as DocumentCategory],
    }));
  }, []);

  const handleHallClick = (category: DocumentCategory) => {
    onHallSelect?.(category);
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          Карта музея SIFS Theory
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Исследуйте все залы музея и найдите интересующие вас документы
        </p>
      </div>

      {/* Интерактивная карта залов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {halls.map((hall) => {
          const Icon = hall.icon;
          const isHovered = hoveredHall === hall.category;
          
          return (
            <motion.div
              key={hall.category}
              onHoverStart={() => setHoveredHall(hall.category)}
              onHoverEnd={() => setHoveredHall(null)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/docs?category=${hall.category}`}
                onClick={() => handleHallClick(hall.category)}
              >
                <Card
                  className={cn(
                    'relative overflow-hidden cursor-pointer transition-all duration-300',
                    'bg-slate-950/50 border-slate-800',
                    isHovered && 'border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                  )}
                  style={{
                    borderColor: isHovered ? hall.color : undefined,
                  }}
                >
                  {/* Градиентный фон при наведении */}
                  <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${hall.color}20 0%, transparent 70%)`,
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <motion.div
                        className="p-3 rounded-lg"
                        style={{
                          backgroundColor: `${hall.color}20`,
                          color: hall.color,
                        }}
                        animate={{
                          scale: isHovered ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <Badge variant="outline" className="bg-slate-900/50">
                        {hall.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{hall.label}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {hall.count} {hall.count === 1 ? 'документ' : hall.count < 5 ? 'документа' : 'документов'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    {/* Индикатор связи между залами */}
                    <motion.div
                      className="h-1 rounded-full bg-gradient-to-r"
                      style={{
                        background: `linear-gradient(to right, ${hall.color}, transparent)`,
                      }}
                      animate={{
                        width: isHovered ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>

                  {/* Эффект свечения при наведении */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: `0 0 20px ${hall.color}40`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Легенда */}
      <Card className="bg-slate-950/50 border-slate-800 mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Легенда</CardTitle>
          <CardDescription>
            Нажмите на зал, чтобы перейти к документам этой категории
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {halls.map((hall) => {
              const Icon = hall.icon;
              return (
                <div key={hall.category} className="flex items-center gap-2">
                  <Icon
                    className="w-4 h-4"
                    style={{ color: hall.color }}
                  />
                  <span className="text-sm text-slate-400">{hall.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
