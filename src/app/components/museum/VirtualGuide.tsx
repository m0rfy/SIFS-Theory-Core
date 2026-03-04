/**
 * VirtualGuide Component
 * 
 * T079: Virtual guide through museum, step-by-step instructions, recommended routes
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  Pause, 
  RotateCcw,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DOCUMENTS, getDocumentById } from '@/app/utils/docs-structure';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { RouteType, ROUTES } from './RouteSelector';

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  documentId?: string;
  action?: 'read' | 'explore' | 'calculate' | 'visualize';
  estimatedTime?: string;
}

export interface VirtualGuideProps {
  /** Тип маршрута для гида */
  routeType?: RouteType;
  /** Автоматическое воспроизведение */
  autoPlay?: boolean;
  /** Обработчик завершения шага */
  onStepComplete?: (stepId: string) => void;
  /** Обработчик завершения маршрута */
  onRouteComplete?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * VirtualGuide component
 * 
 * Отображает виртуального гида по музею с пошаговыми инструкциями
 */
export function VirtualGuide({
  routeType = 'beginners',
  autoPlay = false,
  onStepComplete,
  onRouteComplete,
  className,
}: VirtualGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isMinimized, setIsMinimized] = useState(false);

  const route = ROUTES.find(r => r.id === routeType) || ROUTES[0];
  
  const steps: GuideStep[] = route.documents.map((docId, index) => {
    const doc = getDocumentById(docId);
    return {
      id: `step-${index + 1}`,
      title: doc?.title || `Шаг ${index + 1}`,
      description: doc?.description || `Изучите этот документ`,
      documentId: docId,
      action: 'read',
      estimatedTime: '10-15 минут',
    };
  });

  // Автоматическое воспроизведение
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
        onRouteComplete?.();
      }
    }, 5000); // 5 секунд на шаг

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, onRouteComplete]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onRouteComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    onStepComplete?.(stepId);
    
    // Автоматически перейти к следующему шагу
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 1000);
    } else {
      onRouteComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isStepCompleted = completedSteps.has(currentStepData.id);

  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full shadow-lg"
          size="lg"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Показать гид
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={cn('fixed bottom-4 right-4 z-50 w-full max-w-md', className)}
    >
      <Card className="bg-slate-950/95 border-slate-800 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <CardTitle className="text-lg">Виртуальный гид</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="h-8 w-8"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs">
            Маршрут: {route.title} • Шаг {currentStep + 1} из {steps.length}
          </CardDescription>
        </CardHeader>

        {/* Прогресс-бар */}
        <div className="px-6 pb-4">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <CardContent className="space-y-4">
          {/* Текущий шаг */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{
                    backgroundColor: `${route.color}20`,
                    color: route.color,
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-200">{currentStepData.title}</h3>
                    {isStepCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{currentStepData.description}</p>
                  {currentStepData.documentId && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {currentStepData.action === 'read' && '📄 Читать'}
                        {currentStepData.action === 'explore' && '🔍 Исследовать'}
                        {currentStepData.action === 'calculate' && '🧮 Рассчитать'}
                        {currentStepData.action === 'visualize' && '📊 Визуализировать'}
                      </Badge>
                      {currentStepData.estimatedTime && (
                        <span className="text-xs text-slate-500">
                          ⏱️ {currentStepData.estimatedTime}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Навигация */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Назад
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleStepComplete(currentStepData.id)}
              disabled={isStepCompleted}
              style={{
                backgroundColor: isStepCompleted ? undefined : `${route.color}20`,
                borderColor: route.color,
                color: route.color,
              }}
            >
              {isStepCompleted ? 'Выполнено' : 'Завершить шаг'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStep >= steps.length - 1}
            >
              Вперёд
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Список всех шагов */}
          <div className="pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-2">Все шаги маршрута:</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-center gap-2 text-xs p-2 rounded cursor-pointer transition-colors',
                    index === currentStep && 'bg-slate-800/50',
                    completedSteps.has(step.id) && 'text-green-400',
                    index < currentStep && 'text-slate-500'
                  )}
                  onClick={() => setCurrentStep(index)}
                >
                  {completedSteps.has(step.id) ? (
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className="truncate">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
