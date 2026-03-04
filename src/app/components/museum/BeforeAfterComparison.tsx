/**
 * BeforeAfterComparison Component
 * 
 * Отображение сравнения "до" и "после" (FR-036), интерактивные визуализации,
 * плавные переходы между состояниями
 * 
 * T093 [US9]: Before and after comparison display (FR-036), interactive visualizations,
 * smooth transitions between states
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { NeoCard } from '@/app/components/visual/NeoCard';

export interface BeforeAfterData {
  /** Заголовок состояния "до" */
  beforeTitle: string;
  /** Описание состояния "до" */
  beforeDescription: string;
  /** Визуализация состояния "до" */
  beforeVisual?: React.ReactNode;
  /** Заголовок состояния "после" */
  afterTitle: string;
  /** Описание состояния "после" */
  afterDescription: string;
  /** Визуализация состояния "после" */
  afterVisual?: React.ReactNode;
}

export interface BeforeAfterComparisonProps {
  /** Данные для сравнения */
  data: BeforeAfterData;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * BeforeAfterComparison component
 * 
 * Отображает сравнение "до" и "после" с интерактивными визуализациями
 */
export function BeforeAfterComparison({
  data,
  className,
}: BeforeAfterComparisonProps) {
  const [activeState, setActiveState] = useState<'before' | 'after' | 'both'>('both');
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value);
    setSliderPosition(position);
    setActiveState('both');
  };

  return (
    <div className={cn('w-full', className)}>
      <NeoCard variant="card" className="p-6">
        {/* Переключатель режимов */}
        <div className="flex gap-2 mb-6 justify-center">
          <motion.button
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeState === 'before'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            )}
            onClick={() => setActiveState('before')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            До
          </motion.button>
          <motion.button
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeState === 'after'
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            )}
            onClick={() => setActiveState('after')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            После
          </motion.button>
          <motion.button
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeState === 'both'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            )}
            onClick={() => setActiveState('both')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Сравнение
          </motion.button>
        </div>

        {/* Контент сравнения */}
        <AnimatePresence mode="wait">
          {activeState === 'before' && (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-cyan-400">{data.beforeTitle}</h3>
              <p className="text-gray-300 line-height-[1.6]">{data.beforeDescription}</p>
              {data.beforeVisual && (
                <div className="mt-4">{data.beforeVisual}</div>
              )}
            </motion.div>
          )}

          {activeState === 'after' && (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-purple-400">{data.afterTitle}</h3>
              <p className="text-gray-300 line-height-[1.6]">{data.afterDescription}</p>
              {data.afterVisual && (
                <div className="mt-4">{data.afterVisual}</div>
              )}
            </motion.div>
          )}

          {activeState === 'both' && (
            <motion.div
              key="both"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Слайдер для сравнения */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* До */}
                  <motion.div
                    className="space-y-2"
                    style={{
                      opacity: sliderPosition < 50 ? 1 : 1 - (sliderPosition - 50) / 50,
                    }}
                  >
                    <h4 className="text-lg font-semibold text-cyan-400">До</h4>
                    <p className="text-sm text-gray-400">{data.beforeDescription}</p>
                    {data.beforeVisual && (
                      <div className="mt-2 opacity-60">{data.beforeVisual}</div>
                    )}
                  </motion.div>

                  {/* После */}
                  <motion.div
                    className="space-y-2"
                    style={{
                      opacity: sliderPosition > 50 ? 1 : 1 - (50 - sliderPosition) / 50,
                    }}
                  >
                    <h4 className="text-lg font-semibold text-purple-400">После</h4>
                    <p className="text-sm text-gray-400">{data.afterDescription}</p>
                    {data.afterVisual && (
                      <div className="mt-2 opacity-60">{data.afterVisual}</div>
                    )}
                  </motion.div>
                </div>

                {/* Интерактивный слайдер */}
                <div className="mt-6 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, 
                        cyan 0%, 
                        cyan ${sliderPosition}%, 
                        purple ${sliderPosition}%, 
                        purple 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>До</span>
                    <span>После</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </NeoCard>
    </div>
  );
}
