/**
 * CalculationHistory Component
 * 
 * T089: История расчётов для сравнения (FR-034)
 * - Отображение нескольких расчётов side-by-side
 * - Экспорт истории (JSON, CSV)
 * - Очистка истории
 * - Сохранение в localStorage
 */

import { useState, useEffect } from 'react';
import { Download, Trash2, FileJson, FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { cn } from '@/app/components/ui/utils';
import { toast } from 'sonner';

export interface CalculationResult {
  /** Уникальный ID расчёта */
  id: string;
  /** Название расчёта */
  name: string;
  /** Время выполнения (timestamp) */
  timestamp: number;
  /** Параметры расчёта */
  parameters: Record<string, number | string>;
  /** Результаты расчёта */
  results: Record<string, number | string>;
  /** Сравнение с экспериментальными данными */
  comparison?: {
    theoretical: number;
    experimental: number;
    source: string; // CODATA, DESI, EHT, LIGO
    accuracy: number; // процент совпадения
  };
}

export interface CalculationHistoryProps {
  /** Максимальное количество сохранённых расчётов */
  maxHistory?: number;
  /** Дополнительные CSS классы */
  className?: string;
  /** Callback при удалении расчёта */
  onRemove?: (id: string) => void;
}

const STORAGE_KEY = 'sifs-calculation-history';

/**
 * CalculationHistory component
 * 
 * Отображает историю расчётов с возможностью сравнения и экспорта
 */
export function CalculationHistory({
  maxHistory = 10,
  className,
  onRemove,
}: CalculationHistoryProps) {
  const [history, setHistory] = useState<CalculationResult[]>([]);

  // Загрузка истории из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.warn('Failed to load calculation history:', error);
    }
  }, []);

  // Сохранение истории в localStorage
  const saveHistory = (newHistory: CalculationResult[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.warn('Failed to save calculation history:', error);
      toast.error('Не удалось сохранить историю');
    }
  };

  // Добавление нового расчёта в историю
  const addCalculation = (calculation: CalculationResult) => {
    const newHistory = [calculation, ...history].slice(0, maxHistory);
    saveHistory(newHistory);
  };

  // Удаление расчёта
  const removeCalculation = (id: string) => {
    const newHistory = history.filter(calc => calc.id !== id);
    saveHistory(newHistory);
    onRemove?.(id);
    toast.success('Расчёт удалён из истории');
  };

  // Очистка всей истории
  const clearHistory = () => {
    if (history.length === 0) return;
    
    if (confirm('Вы уверены, что хотите очистить всю историю расчётов?')) {
      saveHistory([]);
      toast.success('История очищена');
    }
  };

  // Экспорт в JSON
  const exportJSON = () => {
    try {
      const dataStr = JSON.stringify(history, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sifs-calculations-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('История экспортирована в JSON');
    } catch (error) {
      console.error('Failed to export JSON:', error);
      toast.error('Не удалось экспортировать историю');
    }
  };

  // Экспорт в CSV
  const exportCSV = () => {
    try {
      if (history.length === 0) {
        toast.error('История пуста');
        return;
      }

      // Заголовки
      const headers = ['ID', 'Название', 'Время', 'Параметры', 'Результаты', 'Сравнение'];
      const rows = history.map(calc => {
        const params = Object.entries(calc.parameters)
          .map(([k, v]) => `${k}=${v}`)
          .join('; ');
        const results = Object.entries(calc.results)
          .map(([k, v]) => `${k}=${v}`)
          .join('; ');
        const comparison = calc.comparison
          ? `${calc.comparison.source}: ${calc.comparison.accuracy.toFixed(2)}%`
          : 'N/A';
        const date = new Date(calc.timestamp).toISOString();

        return [
          calc.id,
          calc.name,
          date,
          params,
          results,
          comparison,
        ];
      });

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sifs-calculations-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('История экспортирована в CSV');
    } catch (error) {
      console.error('Failed to export CSV:', error);
      toast.error('Не удалось экспортировать историю');
    }
  };

  if (history.length === 0) {
    return (
      <Card className={cn('bg-slate-950/50 border-slate-800', className)}>
        <CardContent className="p-6 text-center">
          <p className="text-slate-400">История расчётов пуста</p>
          <p className="text-sm text-slate-500 mt-2">
            Выполненные расчёты будут автоматически сохраняться здесь
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('bg-slate-950/50 border-slate-800', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">История расчётов</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Экспорт
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportJSON}>
                  <FileJson className="h-4 w-4 mr-2" />
                  JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportCSV}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="flex items-center gap-2 text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              Очистить
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((calc) => (
            <div
              key={calc.id}
              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{calc.name}</h4>
                  <p className="text-xs text-slate-400">
                    {new Date(calc.timestamp).toLocaleString('ru-RU')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCalculation(calc.id)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Параметры */}
              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1">Параметры:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(calc.parameters).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Результаты */}
              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1">Результаты:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(calc.results).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Сравнение с экспериментальными данными */}
              {calc.comparison && (
                <div className="mt-3 p-3 bg-indigo-950/20 border border-indigo-500/30 rounded">
                  <div className="text-xs text-indigo-400 mb-1">
                    Сравнение с {calc.comparison.source}:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Теоретическое:</span>
                      <span className="text-cyan-400 ml-2 font-mono">
                        {calc.comparison.theoretical.toExponential(3)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Экспериментальное:</span>
                      <span className="text-green-400 ml-2 font-mono">
                        {calc.comparison.experimental.toExponential(3)}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Точность:</span>
                      <span
                        className={cn(
                          'ml-2 font-semibold',
                          calc.comparison.accuracy >= 95
                            ? 'text-green-400'
                            : calc.comparison.accuracy >= 90
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        )}
                      >
                        {calc.comparison.accuracy.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Экспорт функции для добавления расчёта в историю
export function addToCalculationHistory(calculation: CalculationResult) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const history: CalculationResult[] = saved ? JSON.parse(saved) : [];
  const newHistory = [calculation, ...history].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}
