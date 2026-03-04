/**
 * StepByStepDerivation Component
 * 
 * T087: Пошаговое отображение математических выводов (FR-033)
 * - Анимация появления шагов (fade-in 300ms)
 * - Навигация между шагами (prev/next)
 * - Индикатор прогресса
 * - Сохранение прогресса в localStorage
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { cn } from '@/app/components/ui/utils';

export interface DerivationStep {
  /** Номер шага */
  stepNumber: number;
  /** Заголовок шага */
  title: string;
  /** Формула в LaTeX */
  formula: string;
  /** Объяснение шага */
  explanation: string;
  /** Результат с единицами измерения */
  result?: string;
  /** Дополнительные примечания */
  notes?: string;
}

export interface StepByStepDerivationProps {
  /** ID расчёта для сохранения прогресса */
  calculationId: string;
  /** Массив шагов вывода */
  steps: DerivationStep[];
  /** Дополнительные CSS классы */
  className?: string;
  /** Автоматическое сохранение прогресса */
  autoSave?: boolean;
}

/**
 * StepByStepDerivation component
 * 
 * Отображает пошаговый математический вывод с навигацией и сохранением прогресса
 */
export function StepByStepDerivation({
  calculationId,
  steps,
  className,
  autoSave = true,
}: StepByStepDerivationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Загрузка сохранённого прогресса из localStorage
  useEffect(() => {
    if (!autoSave) return;

    const storageKey = `sifs-derivation-progress-${calculationId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentStep(data.currentStep || 0);
        setCompletedSteps(new Set(data.completedSteps || []));
      } catch (error) {
        console.warn('Failed to load derivation progress:', error);
      }
    }
  }, [calculationId, autoSave]);

  // Сохранение прогресса в localStorage
  useEffect(() => {
    if (!autoSave) return;

    const storageKey = `sifs-derivation-progress-${calculationId}`;
    const data = {
      currentStep,
      completedSteps: Array.from(completedSteps),
      timestamp: Date.now(),
    };
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save derivation progress:', error);
    }
  }, [calculationId, currentStep, completedSteps, autoSave]);

  // Отметка шага как выполненного
  const markStepCompleted = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  // Навигация
  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
      markStepCompleted(stepIndex);
    }
  };

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className={cn('bg-slate-950/50 border-slate-800', className)}>
      <CardContent className="p-6">
        {/* Прогресс-индикатор */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Шаг {currentStep + 1} из {steps.length}
            </span>
            <span className="text-sm text-slate-400">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Навигация */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Предыдущий
          </Button>

          {/* Быстрая навигация по шагам */}
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <button
                key={step.stepNumber}
                onClick={() => goToStep(index)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                  index === currentStep
                    ? 'bg-cyan-500 text-white'
                    : completedSteps.has(index)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                )}
                aria-label={`Перейти к шагу ${step.stepNumber}`}
              >
                {completedSteps.has(index) ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  step.stepNumber
                )}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            Следующий
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Отображение текущего шага с анимацией */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg">
              <h4 className="text-indigo-400 font-semibold mb-2">
                {currentStepData.stepNumber}. {currentStepData.title}
              </h4>
            </div>

            {/* Формула */}
            <div className="p-4 bg-black/60 rounded-lg border border-white/10">
              <div className="text-sm text-slate-400 mb-2">Формула:</div>
              <div className="font-mono text-lg text-cyan-400 p-3 bg-black/40 rounded">
                {currentStepData.formula}
              </div>
            </div>

            {/* Объяснение */}
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-2">Объяснение:</div>
              <p className="text-slate-300 leading-relaxed">
                {currentStepData.explanation}
              </p>
            </div>

            {/* Результат */}
            {currentStepData.result && (
              <div className="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
                <div className="text-sm text-green-400 mb-2">Результат:</div>
                <div className="font-mono text-lg text-green-400">
                  {currentStepData.result}
                </div>
              </div>
            )}

            {/* Примечания */}
            {currentStepData.notes && (
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-lg">
                <div className="text-sm text-amber-400 mb-2">Примечание:</div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  {currentStepData.notes}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
