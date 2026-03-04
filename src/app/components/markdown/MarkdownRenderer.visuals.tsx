/**
 * MarkdownRenderer Visuals
 * 
 * Automatic detection and insertion of interactive Recharts graphs and 3D visualizations
 */

import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/app/components/ui/utils';
import { VisualProps } from './MarkdownRenderer.types';

/**
 * Parse data from string (JSON, CSV, TSV)
 */
function parseData(dataString: string, format: 'json' | 'csv' | 'tsv'): any[] {
  try {
    if (format === 'json') {
      return JSON.parse(dataString);
    }
    
    if (format === 'csv' || format === 'tsv') {
      const delimiter = format === 'csv' ? ',' : '\t';
      const lines = dataString.trim().split('\n');
      const headers = lines[0].split(delimiter).map(h => h.trim());
      
      return lines.slice(1).map(line => {
        const values = line.split(delimiter).map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, index) => {
          const value = values[index];
          // Try to parse as number
          const numValue = Number(value);
          obj[header] = isNaN(numValue) ? value : numValue;
        });
        return obj;
      });
    }
    
    return [];
  } catch (error) {
    console.error('Failed to parse data:', error);
    return [];
  }
}

/**
 * Detect chart type and format from code block
 */
function detectChartType(content: string): { type: 'chart' | '3d' | null; format: 'json' | 'csv' | 'tsv' | null } {
  const lowerContent = content.toLowerCase().trim();
  
  if (lowerContent.startsWith('chart')) {
    // Detect format
    if (lowerContent.includes('json') || content.trim().startsWith('{') || content.trim().startsWith('[')) {
      return { type: 'chart', format: 'json' };
    }
    if (lowerContent.includes('csv') || content.includes(',')) {
      return { type: 'chart', format: 'csv' };
    }
    if (lowerContent.includes('tsv') || content.includes('\t')) {
      return { type: 'chart', format: 'tsv' };
    }
    return { type: 'chart', format: 'json' }; // Default to JSON
  }
  
  if (lowerContent.startsWith('3d')) {
    return { type: '3d', format: 'json' };
  }
  
  return { type: null, format: null };
}

/**
 * Chart component with Recharts
 */
export function Chart({ children, type, format, data, className, node }: VisualProps) {
  const chartConfig = useMemo(() => {
    // Try to extract data from children or node
    let dataString = '';
    let detectedType = type;
    let detectedFormat = format;
    
    if (node?.children) {
      // Extract text from code block
      const codeContent = node.children
        .map((child: any) => child.value || child.children?.map((c: any) => c.value).join('') || '')
        .join('\n');
      
      if (codeContent) {
        const detection = detectChartType(codeContent);
        detectedType = detectedType || detection.type || 'chart';
        detectedFormat = detectedFormat || detection.format || 'json';
        
        // Extract data part (after "chart json:" or similar)
        const dataMatch = codeContent.match(/(?:chart|3d)\s*(?:json|csv|tsv)?:?\s*(.+)/is);
        if (dataMatch) {
          dataString = dataMatch[1].trim();
        } else {
          dataString = codeContent;
        }
      }
    } else if (typeof children === 'string') {
      const detection = detectChartType(children);
      detectedType = detectedType || detection.type || 'chart';
      detectedFormat = detectedFormat || detection.format || 'json';
      dataString = children.replace(/^(?:chart|3d)\s*(?:json|csv|tsv)?:?\s*/i, '').trim();
    }
    
    if (!dataString && data) {
      dataString = typeof data === 'string' ? data : JSON.stringify(data);
    }
    
    if (!dataString) {
      return null;
    }
    
    const parsedData = parseData(dataString, detectedFormat || 'json');
    
    if (parsedData.length === 0) {
      return null;
    }
    
    // Determine chart type from data structure
    const keys = Object.keys(parsedData[0] || {});
    const isTimeSeries = keys.some(k => k.toLowerCase().includes('time') || k.toLowerCase().includes('date'));
    const isCategorical = keys.length === 2 && keys.some(k => typeof parsedData[0][k] === 'string');
    
    return {
      data: parsedData,
      chartType: isTimeSeries ? 'line' : isCategorical ? 'bar' : 'line',
      keys: keys.filter(k => typeof parsedData[0][k] === 'number'),
    };
  }, [children, type, format, data, node]);
  
  if (!chartConfig || chartConfig.data.length === 0) {
    return (
      <div className={cn('my-4 p-4 border border-destructive/50 rounded-md bg-destructive/10', className)}>
        <p className="text-sm text-destructive">Не удалось загрузить данные для графика</p>
      </div>
    );
  }
  
  const { data: chartData, chartType, keys } = chartConfig;
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];
  
  if (type === '3d') {
    // 3D visualization placeholder (can be extended with Three.js or similar)
    return (
      <div className={cn('my-4 p-4 border border-border rounded-md bg-muted/50', className)}>
        <p className="text-sm text-foreground/70">3D визуализация: {keys.length} измерений</p>
        <p className="text-xs text-foreground/50 mt-2">3D визуализация будет реализована в будущих версиях</p>
      </div>
    );
  }
  
  return (
    <div className={cn('my-6 w-full', className)}>
      <div className="neo-card p-4">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="currentColor" opacity={0.7} />
              <YAxis stroke="currentColor" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {keys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="currentColor" opacity={0.7} />
              <YAxis stroke="currentColor" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {keys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
