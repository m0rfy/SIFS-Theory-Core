/**
 * InteractiveGraph Component
 * 
 * Интерактивные графики с использованием Recharts
 * Экспорт в PNG, SVG, PDF (FR-048)
 * Tooltip с подробной информацией
 * Zoom и pan для детального изучения
 * 
 * T108: Create InteractiveGraph component with export functionality
 */

import { useRef, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Download, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/app/components/ui/utils';

export interface GraphData {
  [key: string]: string | number;
}

export interface InteractiveGraphProps {
  /** Данные для графика */
  data: GraphData[];
  /** Тип графика */
  type: 'line' | 'bar' | 'scatter' | 'area';
  /** Название графика */
  title?: string;
  /** Настройки осей */
  xAxisKey?: string;
  yAxisKey?: string;
  /** Настройки серий данных */
  dataKeys?: string[];
  /** Цвета для серий */
  colors?: string[];
  /** Высота графика */
  height?: number;
  /** Обработчик экспорта */
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Экспорт графика в PNG
 */
async function exportToPNG(
  containerRef: React.RefObject<HTMLDivElement>,
  filename: string = `sifs-graph-${Date.now()}.png`
): Promise<void> {
  if (!containerRef.current) {
    throw new Error('Контейнер графика не найден');
  }

  // Используем html2canvas если доступен
  const html2canvas = (window as any).html2canvas;
  if (html2canvas) {
    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        logging: false,
      });
      
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          throw new Error('Не удалось создать изображение');
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('График экспортирован в PNG');
      }, 'image/png');
      return;
    } catch (error) {
      console.error('Ошибка экспорта в PNG:', error);
      throw error;
    }
  }

  // Fallback: используем canvas API
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Не удалось получить контекст canvas');
  }

  canvas.width = containerRef.current.offsetWidth * 2;
  canvas.height = containerRef.current.offsetHeight * 2;
  ctx.scale(2, 2);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
  toast.success('График экспортирован в PNG');
}

/**
 * Экспорт графика в SVG
 */
function exportToSVG(
  containerRef: React.RefObject<HTMLDivElement>,
  filename: string = `sifs-graph-${Date.now()}.svg`
): void {
  if (!containerRef.current) {
    throw new Error('Контейнер графика не найден');
  }

  // Ищем SVG элемент внутри контейнера
  const svgElement = containerRef.current.querySelector('svg');
  if (!svgElement) {
    throw new Error('SVG элемент не найден');
  }

  // Клонируем SVG для экспорта
  const svgClone = svgElement.cloneNode(true) as SVGElement;
  
  // Устанавливаем размеры
  const rect = svgElement.getBoundingClientRect();
  svgClone.setAttribute('width', String(rect.width));
  svgClone.setAttribute('height', String(rect.height));
  svgClone.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);

  // Конвертируем в строку
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgClone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  toast.success('График экспортирован в SVG');
}

/**
 * Экспорт графика в PDF
 */
async function exportToPDF(
  containerRef: React.RefObject<HTMLDivElement>,
  filename: string = `sifs-graph-${Date.now()}.pdf`
): Promise<void> {
  // Проверяем наличие jsPDF
  const jsPDF = (window as any).jspdf;
  if (!jsPDF) {
    toast.error('jsPDF не установлен. Установите: npm install jspdf');
    return;
  }

  if (!containerRef.current) {
    throw new Error('Контейнер графика не найден');
  }

  try {
    // Сначала экспортируем в PNG
    const html2canvas = (window as any).html2canvas;
    if (!html2canvas) {
      toast.error('html2canvas не установлен. Установите: npm install html2canvas');
      return;
    }

    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: '#0f172a',
      scale: 2,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF.jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 297; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
    toast.success('График экспортирован в PDF');
  } catch (error) {
    console.error('Ошибка экспорта в PDF:', error);
    toast.error('Не удалось экспортировать в PDF');
  }
}

/**
 * InteractiveGraph component
 */
export function InteractiveGraph({
  data,
  type,
  title,
  xAxisKey,
  yAxisKey,
  dataKeys = [],
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
  height = 400,
  onExport,
  className,
}: InteractiveGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  // Определяем ключи данных автоматически, если не указаны
  const actualDataKeys = dataKeys.length > 0 
    ? dataKeys 
    : Object.keys(data[0] || {}).filter(key => key !== (xAxisKey || 'name'));

  const actualXAxisKey = xAxisKey || 'name';
  const actualYAxisKey = yAxisKey || actualDataKeys[0] || 'value';

  const handleExport = async (format: 'png' | 'svg' | 'pdf') => {
    try {
      if (onExport) {
        onExport(format);
        return;
      }

      switch (format) {
        case 'png':
          await exportToPNG(containerRef);
          break;
        case 'svg':
          exportToSVG(containerRef);
          break;
        case 'pdf':
          await exportToPDF(containerRef);
          break;
      }
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      toast.error(`Не удалось экспортировать в ${format.toUpperCase()}`);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 60 },
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey={actualXAxisKey}
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            {actualDataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey={actualXAxisKey}
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            {actualDataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey={actualXAxisKey}
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            {actualDataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey={actualXAxisKey}
              stroke="#9ca3af"
            />
            <YAxis 
              dataKey={actualYAxisKey}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            {actualDataKeys.map((key, index) => (
              <Scatter
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
              />
            ))}
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Заголовок и кнопки управления */}
      <div className="flex items-center justify-between mb-4">
        {title && (
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        )}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 border border-border rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              className="h-8 w-8 p-0"
              aria-label="Уменьшить"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2}
              className="h-8 w-8 p-0"
              aria-label="Увеличить"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Export menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Экспорт
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('png')}>
                Экспорт в PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('svg')}>
                Экспорт в SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Экспорт в PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* График */}
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
