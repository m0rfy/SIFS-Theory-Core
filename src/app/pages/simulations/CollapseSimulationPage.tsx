/**
 * CollapseSimulationPage - Симуляция гравитационного коллапса
 * 
 * Интегрирует InformationalCollapseSimulation с useSpatialConnector для связи
 * параметров симуляции с CSS переменными SSF-2025
 * 
 * Функции:
 * - Экспорт результатов (JSON, CSV, изображения)
 * - Валидация параметров
 * - Сравнение с теоретическими предсказаниями SIFS
 * - Пресеты сценариев (планета, звезда, черная дыра)
 * - Оптимизация производительности (SC-003: результаты в течение 5 секунд)
 */

import React, { useState, useEffect, useRef } from 'react';
import { InformationalCollapseSimulation } from '@/app/components/InformationalCollapseSimulation';
import { useSpatialConnector } from '@/app/utils/sifs-spatial-connector';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Download, Save, History, Image, FileText, AlertCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { exportToJSON, exportToCSV, exportCanvasToImage, ExportableData } from '@/app/utils/simulation-export';
import { validateCollapseParams, validateAndHandleErrors, ValidationError } from '@/app/utils/simulation-validation';
import { compareCollapseWithTheory, CollapseComparison } from '@/app/utils/sifs-theory-comparison';
import { useSimulationSync } from '@/app/utils/simulation-sync';
import { DeltaPulse, FrequencyKnob, ChronoOdometer, TemporalWave, SyncOrb, SpatialSlab } from '@/app/components/spatial';

interface SimulationResult {
  id: string;
  timestamp: number;
  parameters: {
    massExponent: number;
    scaleS: number;
    calculatedTension: number;
  };
  results: {
    metricStress: number;
    waveAmplitude: number;
    isCollapsed: boolean;
  };
}

// Пресеты сценариев
interface PresetScenario {
  name: string;
  massExponent: number;
  scaleS: number;
  description: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    name: 'planet',
    massExponent: 24, // 10^24 kg (планета Земля)
    scaleS: 37,
    description: 'Планета (10²⁴ kg)',
  },
  {
    name: 'star',
    massExponent: 30, // 10^30 kg (звезда)
    scaleS: 40,
    description: 'Звезда (10³⁰ kg)',
  },
  {
    name: 'blackhole',
    massExponent: 36, // 10^36 kg (черная дыра)
    scaleS: 45,
    description: 'Черная дыра (10³⁶ kg)',
  },
];

export function CollapseSimulationPage() {
  const [metricStress, setMetricStress] = useState(0);
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  const [massExponent, setMassExponent] = useState(24);
  const [scaleS, setScaleS] = useState(37);
  const [calculatedTension, setCalculatedTension] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [theoryComparison, setTheoryComparison] = useState<CollapseComparison | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationContainerRef = useRef<HTMLDivElement>(null);

  // Загрузка сохранённых результатов из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sifs-collapse-results');
    if (saved) {
      try {
        setResults(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved results:', e);
      }
    }
  }, []);

  // Интеграция с useSpatialConnector
  // metricStress → --sifs-metric-stability (инвертированное значение)
  // waveAmplitude → --sifs-oscillation-speed
  useSpatialConnector({
    metricStress: metricStress / 100, // Нормализуем к 0-1
    waveAmplitude: waveAmplitude,
  });

  // Синхронизация визуальных эффектов с другими симуляциями (FR-049)
  useSimulationSync('collapse-simulation', {
    metricStress: metricStress / 100,
    waveAmplitude: waveAmplitude,
  });

  // Валидация параметров при изменении
  useEffect(() => {
    const isValid = validateAndHandleErrors(
      { massExponent, scaleS, calculatedTension, metricStress, waveAmplitude },
      validateCollapseParams,
      (errors) => setValidationErrors(errors)
    );
    
    if (isValid) {
      setValidationErrors([]);
    }
  }, [massExponent, scaleS, calculatedTension, metricStress, waveAmplitude]);

  // Сравнение с теорией при изменении результатов
  useEffect(() => {
    if (metricStress > 0 || waveAmplitude > 0) {
      const comparison = compareCollapseWithTheory({
        metricStress,
        waveAmplitude,
        calculatedTension,
        isCollapsed,
        massExponent,
        scaleS,
      });
      setTheoryComparison(comparison);
    }
  }, [metricStress, waveAmplitude, calculatedTension, isCollapsed, massExponent, scaleS]);

  // Применение пресета
  const applyPreset = (preset: PresetScenario) => {
    setMassExponent(preset.massExponent);
    setScaleS(preset.scaleS);
    // Параметры обновятся через InformationalCollapseSimulation
  };

  // Сохранение результатов в localStorage с валидацией
  const saveResults = () => {
    const isValid = validateAndHandleErrors(
      { massExponent, scaleS, calculatedTension, metricStress, waveAmplitude },
      validateCollapseParams,
      (errors) => {
        setValidationErrors(errors);
        // Показываем ошибки пользователю
      }
    );

    if (!isValid) {
      return; // Не сохраняем при ошибках валидации
    }

    const newResult: SimulationResult = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      parameters: {
        massExponent,
        scaleS,
        calculatedTension,
      },
      results: {
        metricStress,
        waveAmplitude,
        isCollapsed,
      },
    };

    const updatedResults = [newResult, ...results].slice(0, 10); // Храним последние 10
    setResults(updatedResults);
    localStorage.setItem('sifs-collapse-results', JSON.stringify(updatedResults));
  };

  // Экспорт результатов в JSON
  const exportToJSONFormat = () => {
    try {
      exportToJSON(results, `sifs-collapse-results-${Date.now()}.json`);
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
        massExponent: result.parameters.massExponent,
        scaleS: result.parameters.scaleS,
        calculatedTension: result.parameters.calculatedTension,
        metricStress: result.results.metricStress,
        waveAmplitude: result.results.waveAmplitude,
        isCollapsed: result.results.isCollapsed ? 'Да' : 'Нет',
      }));
      exportToCSV(csvData, `sifs-collapse-results-${Date.now()}.csv`);
    } catch (error) {
      console.error('Ошибка экспорта CSV:', error);
      alert('Ошибка при экспорте CSV. Проверьте консоль для деталей.');
    }
  };

  // Экспорт canvas в изображение
  const exportToImageFormat = () => {
    try {
      // Ищем canvas в компоненте симуляции
      const canvas = document.querySelector('canvas');
      if (canvas) {
        exportCanvasToImage(canvas, `sifs-collapse-simulation-${Date.now()}.png`);
      } else {
        alert('Canvas не найден. Убедитесь, что симуляция запущена.');
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
            <h1 className="text-[32px] md:text-4xl font-bold mb-2 text-slate-100">Симуляция гравитационного коллапса</h1>
            <p className="text-sm md:text-base text-slate-400">
              Моделирование реакции вакуумной энергии SIFS на мгновенную потерю топологического узла
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
            <Select onValueChange={(value) => {
              const preset = PRESET_SCENARIOS.find(p => p.name === value);
              if (preset) applyPreset(preset);
            }}>
              <SelectTrigger className="w-full md:w-[180px] bg-slate-900 border-slate-700 min-h-[44px]">
                <SelectValue placeholder="Пресеты" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                {PRESET_SCENARIOS.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    {preset.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  initialFrequency={waveAmplitude || 1.0}
                  min={0.1}
                  max={5.0}
                  step={0.1}
                  onFrequencyChange={(freq) => {
                    // Обновляем waveAmplitude при изменении частоты
                    setWaveAmplitude(freq);
                  }}
                />
                <span className="text-xs text-slate-400">Frequency</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ChronoOdometer format="seconds" />
                <span className="text-xs text-slate-400">Time</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <TemporalWave width={120} height={60} amplitude={20} frequency={1} />
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
                {/* Метрическое напряжение */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Метрическое напряжение</span>
                    {Math.abs(theoryComparison.metricStress.percentageDiff) < 5 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.metricStress.actual.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Теоретическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.metricStress.theoretical.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Отклонение:</span>
                      <span className={`font-mono ${Math.abs(theoryComparison.metricStress.percentageDiff) < 5 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {theoryComparison.metricStress.percentageDiff > 0 ? '+' : ''}
                        {theoryComparison.metricStress.percentageDiff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Амплитуда волны */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Амплитуда волны</span>
                    {Math.abs(theoryComparison.waveAmplitude.percentageDiff) < 5 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.waveAmplitude.actual.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Теоретическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.waveAmplitude.theoretical.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Отклонение:</span>
                      <span className={`font-mono ${Math.abs(theoryComparison.waveAmplitude.percentageDiff) < 5 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {theoryComparison.waveAmplitude.percentageDiff > 0 ? '+' : ''}
                        {theoryComparison.waveAmplitude.percentageDiff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Напряжение */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Напряжение</span>
                    {Math.abs(theoryComparison.tension.percentageDiff) < 5 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.tension.actual.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Теоретическое:</span>
                      <span className="text-slate-300 font-mono">{theoryComparison.tension.theoretical.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Отклонение:</span>
                      <span className={`font-mono ${Math.abs(theoryComparison.tension.percentageDiff) < 5 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {theoryComparison.tension.percentageDiff > 0 ? '+' : ''}
                        {theoryComparison.tension.percentageDiff.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Статус коллапса */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Статус коллапса</span>
                    {theoryComparison.isCollapsed.matches ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Фактическое:</span>
                      <Badge variant={theoryComparison.isCollapsed.actual ? 'destructive' : 'outline'} className="text-xs">
                        {theoryComparison.isCollapsed.actual ? 'Коллапс' : 'Стабильно'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ожидаемое:</span>
                      <Badge variant={theoryComparison.isCollapsed.expected ? 'destructive' : 'outline'} className="text-xs">
                        {theoryComparison.isCollapsed.expected ? 'Коллапс' : 'Стабильно'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simulation Component */}
        <div ref={simulationContainerRef} className="space-y-4">
          <InformationalCollapseSimulation
            onMetricStressChange={(value) => {
              setMetricStress(value);
              // Также обновляем другие параметры для сохранения
              const impact = (massExponent / 30) * (1 + scaleS / 100) * 100;
              setCalculatedTension(Math.min(100, Math.max(0, impact)));
            }}
            onWaveAmplitudeChange={(value) => {
              setWaveAmplitude(value);
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
                Последние сохранённые результаты симуляции
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
                      <Badge
                        variant={result.results.isCollapsed ? 'destructive' : 'outline'}
                        className="text-xs"
                      >
                        {result.results.isCollapsed ? 'Коллапс' : 'Стабильно'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">Масса:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          10^{result.parameters.massExponent} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">S:</span>
                        <span className="ml-2 text-slate-300 font-mono">{result.parameters.scaleS}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Напряжение:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          {result.parameters.calculatedTension.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Амплитуда:</span>
                        <span className="ml-2 text-slate-300 font-mono">
                          {result.results.waveAmplitude.toFixed(1)}
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
