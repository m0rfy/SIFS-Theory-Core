/**
 * WorldChangeExample Component
 * 
 * Примеры применения теории с визуализациями, сравнениями "до" и "после",
 * интерактивными примерами с симуляциями
 * 
 * T092 [US9]: Application examples with visualizations, "before" and "after" comparisons,
 * interactive examples with simulations
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { NeoCard } from '@/app/components/visual/NeoCard';
import { BeforeAfterComparison, BeforeAfterData } from './BeforeAfterComparison';

export interface WorldChangeExampleData {
  /** ID примера */
  id: string;
  /** Заголовок примера */
  title: string;
  /** Описание примера */
  description: string;
  /** Категория примера */
  category: 'energy' | 'time' | 'quantum' | 'space' | 'medicine' | 'communication';
  /** Данные для сравнения "до" и "после" */
  comparison?: BeforeAfterData;
  /** Визуализация примера */
  visualization?: React.ReactNode;
  /** Интерактивная симуляция */
  simulation?: React.ReactNode;
  /** Иконка примера */
  icon?: string;
  /** Цвет примера */
  color?: string;
}

export interface WorldChangeExampleProps {
  /** Данные примера */
  example: WorldChangeExampleData;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * WorldChangeExample component
 * 
 * Отображает пример применения теории с визуализациями и интерактивными элементами
 */
export function WorldChangeExample({
  example,
  className,
}: WorldChangeExampleProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'simulation'>('overview');

  const exampleColor = example.color || 'var(--sifs-delta-color, oklch(65% 0.25 250))';

  const categoryLabels = {
    energy: 'Энергетика',
    time: 'Время',
    quantum: 'Квантовые вычисления',
    space: 'Космос',
    medicine: 'Медицина',
    communication: 'Связь',
  };

  return (
    <div className={cn('w-full', className)}>
      <NeoCard variant="raised" className="p-6">
        {/* Заголовок с иконкой */}
        <div className="flex items-start gap-4 mb-6">
          {example.icon && (
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {example.icon}
            </motion.div>
          )}
          <div className="flex-1">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: exampleColor }}
            >
              {example.title}
            </h3>
            <div className="text-sm text-gray-400 mb-2">
              {categoryLabels[example.category]}
            </div>
            <p className="text-gray-300 line-height-[1.6]">
              {example.description}
            </p>
          </div>
        </div>

        {/* Вкладки */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          {['overview', 'comparison', 'simulation'].map((tab) => {
            const tabLabels = {
              overview: 'Обзор',
              comparison: 'Сравнение',
              simulation: 'Симуляция',
            };
            const isActive = activeTab === tab;
            return (
              <motion.button
                key={tab}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors relative',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                )}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tabLabels[tab as keyof typeof tabLabels]}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: exampleColor }}
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Контент вкладок */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {example.visualization && (
                <div className="bg-black/20 rounded-lg p-4">
                  {example.visualization}
                </div>
              )}
              <p className="text-gray-300 line-height-[1.6]">
                {example.description}
              </p>
            </div>
          )}

          {activeTab === 'comparison' && example.comparison && (
            <BeforeAfterComparison data={example.comparison} />
          )}

          {activeTab === 'simulation' && example.simulation && (
            <div className="bg-black/20 rounded-lg p-4">
              {example.simulation}
            </div>
          )}
        </motion.div>
      </NeoCard>
    </div>
  );
}
