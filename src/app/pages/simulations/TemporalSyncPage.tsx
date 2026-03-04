/**
 * TemporalSyncPage - Темпоральная калибровка
 * 
 * Интегрирует AtomicClockSync с useSpatialConnector для связи
 * параметров симуляции с CSS переменными SSF-2025
 * 
 * Функции:
 * - Экспорт результатов (JSON, CSV, изображения)
 * - Валидация параметров
 * - Сравнение с теоретическими предсказаниями SIFS
 * - Оптимизация производительности (SC-003: результаты в течение 5 секунд)
 */

import React, { useState, useEffect, useRef } from 'react';
import { AtomicClockSync } from '@/app/components/AtomicClockSync';
import { useSpatialConnector } from '@/app/utils/sifs-spatial-connector';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Download, Save, History, Image, FileText, AlertCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { exportToJSON, exportToCSV, exportCanvasToImage, ExportableData } from '@/app/utils/simulation-export';
import { validateTemporalParams, validateAndHandleErrors, ValidationError } from '@/app/utils/simulation-validation';
import { compareTemporalWithTheory, TemporalComparison } from '@/app/utils/sifs-theory-comparison';
import { useSimulationSync } from '@/app/utils/simulation-sync';
import { DeltaPulse, FrequencyKnob, ChronoOdometer, TemporalWave, SyncOrb, SpatialSlab } from '@/app/components/spatial';

interface SimulationResult {
  id: string;
  timestamp: number;
  parameters: {
    amplitude: number;
    frequency: number;
    speedMultiplier: number;
  };
  results: {
    timeDilationDelta: number;
    driftNs: number;
  };
}

export function TemporalSyncPage() {
  const [frequency, setFrequency] = useState(0.2);
  const [timeDilationDelta, setTimeDilationDelta] = useState(0);
  const [amplitude, setAmplitude] = useState(0.5);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [theoryComparison, setTheoryComparison] = useState<TemporalComparison | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const simulationContainerRef = useRef<HTMLDivElement>(null);

  // Загрузка сохранённых результатов из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sifs-temporal-results');
    if (saved) {
      try {
        setResults(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved results:', e);
      }
    }
  }, []);

  // Интеграция с useSpatialConnector
  // frequency → --sifs-oscillation-speed
  // timeDilationDelta → --sifs-time-dilation-delta
  useSpatialConnector({
    frequency: frequency,
    timeDilationDelta: timeDilationDelta,
  });

  // Синхронизация визуальных эффектов с другими симуляциями (FR-049)
  useSimulationSync('temporal-sync', {
    frequency: frequency,
    timeDilationDelta: timeDilationDelta,
  });

  // Валидация параметров при изменении
  useEffect(() => {
    const isValid = validateAndHandleErrors(
      { amplitude, frequency, speedMultiplier, timeDilationDelta },
      validateTemporalParams,
      (errors) => setValidationErrors(errors)
    );
    
    if (isValid) {
      setValidationErrors([]);
    }
  }, [amplitude, frequency, speedMultiplier, timeDilationDelta]);

  // Обновление времени для сравнения с теорией
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now() / 1000); // Время в секундах
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Сравнение с теорией при изменении результатов
  useEffect(() => {
    if (timeDilationDelta !== 0 || frequency > 0) {
      const driftNs = timeDilationDelta * 1e9; // Конвертация в наносекунды
      const comparison = compareTemporalWithTheory({
        timeDilationDelta,
        driftNs,
        amplitude,
        frequency,
        time: currentTime,
      });
      setTheoryComparison(comparison);
    }
  }, [timeDilationDelta, frequency, amplitude, currentTime]);

  // Сохранение результатов в localStorage с валидацией
  const saveResults = () => {
    const isValid = validateAndHandleErrors(
      { amplitude, frequency, speedMultiplier, timeDilationDelta },
      validateTemporalParams,
      (errors) => {
        setValidationErrors(errors);
        // Показываем ошибки пользователю
      }
    );

    if (!isValid) {
      return; // Не сохраняем при ошибках валидации
    }

    const driftNs = timeDilationDelta * 1e9; // Конвертация в наносекунды
    const newResult: SimulationResult = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      parameters: {
        amplitude,
        frequency,
        speedMultiplier,
      },
      results: {
        timeDilationDelta,
        driftNs,
      },
    };

    const updatedResults = [newResult, ...results].slice(0, 10); // Храним последние 10
    setResults(updatedResults);
    localStorage.setItem('sifs-temporal-results', JSON.stringify(updatedResults));
  };

  // Экспорт результатов в JSON
  const exportToJSONFormat = () => {
    try {
      exportToJSON(results, `sifs-temporal-results-${Date.now()}.json`);
    } catch (error) {
      console.error('Ошибка экспорта JSON:', error);
      alert('Ошибка при экспорте JSON. Проверьте консоль для деталей.');
    }
  };

  // Экспорт результатов в CSV
  const exportToCSVFormat = () => {
    try {
      const csvData: ExportableData[] = results.map((result) => ({
        timestamp: new Date(result.timestamp).toISOString(),
        amplitude: result.parameters.amplitude,
        frequency: result.parameters.frequency,
        speedMultiplier: result.parameters.speedMultiplier,
        timeDilationDelta: result.results.timeDilationDelta,
        driftNs: result.results.driftNs,
      }));
      exportToCSV(csvData, `sifs-temporal-results-${Date.now()}.csv`);
    } catch (error) {
      console.error('Ошибка экспорта CSV:', error);
      alert('Ошибка при экспорте CSV. Проверьте консоль для деталей.');
    }
  };

  // Экспорт canvas в изображение
  const exportToImageFormat = () => {
    try {
      // Ищем canvas или график в компоненте симуляции
      const canvas = document.querySelector('canvas');
      if (canvas) {
        exportCanvasToImage(canvas, `sifs-temporal-simulation-${Date.now()}.png`);
      } else {
        // Пытаемся экспортировать график Recharts
        const svg = document.querySelector('svg.recharts-surface');
        if (svg) {
          // Для SVG можно использовать другой метод, но пока используем canvas fallback
          alert('Экспорт SVG графиков будет добавлен в будущих версиях. Используйте скриншот экрана.');
        } else {
          alert('Canvas или график не найден. Убедитесь, что симуляция запущена.');
        }
      }
    } catch (error) {
      console.error('Ошибка экспорта изображения:', error);
      alert('Ошибка при экспорте изображения. Проверьте консоль для деталей.');
    }
  };

  // Оптимизация: отложенная загрузка результатов для обеспечения SC-003 (< 5 секунд)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Минимальная задержка для плавности UI

    return () => clearTimeout(timer);
  }, [results]);

  return (
    <SpatialSlab preset="monolith" className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
          <div className="flex-1">
            <h1 className="text-[32px] md:text-4xl font-bold mb-2 text-slate-100">Темпоральная калибровка</h1>
            <p className="text-sm md:text-base text-slate-400">
              Синхронизация атомных часов с учётом флуктуаций метрики SIFS
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={saveResults}
              disabled={validationErrors.length > 0}
              className="border-slate-700 hover:bg-slate-800 min-h-[44px] flex-1 md:flex-none"
            >
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToJSONFormat}
              disabled={results.length === 0}
              className="border-slate-700 hover:bg-slate-800 min-h-[44px] flex-1 md:flex-none"
            >
              <FileText className="w-4 h-4 mr-2" />
              JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSVFormat}
              disabled={results.length === 0}
              className="border-slate-700 hover:bg-slate-800 min-h-[44px] flex-1 md:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToImageFormat}
              className="border-slate-700 hover:bg-slate-800 min-h-[44px] flex-1 md:flex-none"
            >
              <Image className="w-4 h-4 mr-2" />
              PNG
            </Button>
          </div>
        </div>

        {/* T075: Spatial Components - Индикаторы параметров теории */}
        <Card className="bg-slate-950/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">Параметры теории SIFS</CardTitle>
            <CardDescription className="text-slate-500">
              Индикаторы в реальном времени
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
              <div className="flex flex-col items-center gap-2">
                <DeltaPulse size={12} />
                <span className="text-xs text-slate-400">Delta Pulse</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FrequencyKnob
                  initialFrequency={frequency || 0.2}
                  min={0.1}
                  max={5.0}
                  step={0.1}
                  onFrequencyChange={(freq) => {
                    // Обновляем frequency при изменении
                    setFrequency(freq);
                  }}
                />
                <span className="text-xs text-slate-400">Frequency</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ChronoOdometer format="seconds" />
                <span className="text-xs text-slate-400">Time</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <TemporalWave width={120} height={60} amplitude={20} frequency={frequency || 0.2} />
                <span className="text-xs text-slate-400">Wave</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SyncOrb size={32} />
                <span className="text-xs text-slate-400">Sync</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Валидационные ошибки */}
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="bg-red-950/50 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ошибки валидации параметров</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {validationErrors.map((error, idx) => (
                  <li key={idx} className="text-sm">
                    <strong>{error.field}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Сравнение с теорией */}
        {theoryComparison && (
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-lg">Сравнение с теорией SIFS</CardTitle>
              </div>
              <CardDescription className="text-slate-500">
                Сравнение результатов симуляции с теоретическими предсказаниями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Дельта дилатации времени */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Дельта дилатации времени</span>
                    {Math.abs(theoryComparison.timeDilationDelta.percentageDiff) < 10 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <span className="text-slate-300 font-mono">
                        {theoryComparison.timeDilationDelta.actual.toExponential(3)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Теоретическое:</span>
                      <span className="text-slate-300 font-mono">
                        {theoryComparison.timeDilationDelta.theoretical.toExponential(3)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Отклонение:</span>
                      <span className={`font-mono ${Math.abs(theoryComparison.timeDilationDelta.percentageDiff) < 10 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {theoryComparison.timeDilationDelta.percentageDiff > 0 ? '+' : ''}
                        {theoryComparison.timeDilationDelta.percentageDiff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Дрифт в наносекундах */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Дрифт (наносекунды)</span>
                    {Math.abs(theoryComparison.driftNs.percentageDiff) < 10 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <span className="text-slate-300 font-mono">
                        {theoryComparison.driftNs.actual.toFixed(6)} ns
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Теоретическое:</span>
                      <span className="text-slate-300 font-mono">
                        {theoryComparison.driftNs.theoretical.toFixed(6)} ns
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Отклонение:</span>
                      <span className={`font-mono ${Math.abs(theoryComparison.driftNs.percentageDiff) < 10 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {theoryComparison.driftNs.percentageDiff > 0 ? '+' : ''}
                        {theoryComparison.driftNs.percentageDiff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simulation Component */}
        <div ref={simulationContainerRef} className="space-y-4">
          <AtomicClockSync
            onFrequencyChange={(value) => {
              setFrequency(value);
            }}
            onTimeDilationDeltaChange={(value) => {
              setTimeDilationDelta(value);
            }}
            onAmplitudeChange={(value) => {
              setAmplitude(value);
            }}
          />
        </div>

        {/* Results History */}
        {results.length > 0 && (
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-400" />
                  <CardTitle className="text-lg">История результатов</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-slate-800 text-slate-400">
                  {results.length} записей
                </Badge>
              </div>
              <CardDescription className="text-slate-500">
                Последние сохранённые результаты калибровки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-slate-400 font-mono text-xs">
                        {new Date(result.timestamp).toLocaleString('ru-RU')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Δt: {result.results.driftNs.toFixed(6)} ns
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">Частота:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          {result.parameters.frequency.toFixed(2)} Hz
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Амплитуда:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          {result.parameters.amplitude.toFixed(2)} σ
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Дилтация:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          {result.results.timeDilationDelta.toFixed(9)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SpatialSlab>
  );
}
