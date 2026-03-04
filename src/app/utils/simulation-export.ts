/**
 * Утилиты для экспорта результатов симуляций
 * Поддерживает экспорт в JSON, CSV и изображения
 */

export interface ExportableData {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Экспорт данных в CSV формат
 */
export function exportToCSV(
  data: ExportableData[],
  filename: string = `sifs-export-${Date.now()}.csv`
): void {
  if (data.length === 0) {
    throw new Error('Нет данных для экспорта');
  }

  // Получаем все ключи из первого объекта
  const headers = Object.keys(data[0]);
  
  // Создаём CSV строку
  const csvRows: string[] = [];
  
  // Заголовки
  csvRows.push(headers.join(','));
  
  // Данные
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Экранируем запятые и кавычки
      if (value === null || value === undefined) {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(','));
  }
  
  const csvContent = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM для Excel
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Экспорт canvas в изображение (PNG)
 */
export function exportCanvasToImage(
  canvas: HTMLCanvasElement,
  filename: string = `sifs-canvas-${Date.now()}.png`
): void {
  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Не удалось создать изображение из canvas');
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

/**
 * Экспорт элемента в изображение (PNG)
 * Использует html2canvas или создаёт скриншот через canvas
 */
export async function exportElementToImage(
  element: HTMLElement,
  filename: string = `sifs-screenshot-${Date.now()}.png`
): Promise<void> {
  // Создаём canvas для скриншота
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Не удалось получить контекст canvas');
  }

  // Устанавливаем размеры canvas
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;

  // Используем html2canvas если доступен, иначе простой метод
  try {
    // Попытка использовать html2canvas (если установлен)
    const html2canvas = (window as any).html2canvas;
    if (html2canvas) {
      const canvasEl = await html2canvas(element, {
        backgroundColor: '#0f172a', // slate-950
        scale: 2,
      });
      exportCanvasToImage(canvasEl, filename);
      return;
    }
  } catch (e) {
    console.warn('html2canvas не доступен, используем альтернативный метод', e);
  }

  // Альтернативный метод: копируем стили и содержимое
  ctx.fillStyle = '#0f172a'; // slate-950 background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Рисуем текст с информацией о том, что это упрощённый экспорт
  ctx.fillStyle = '#cbd5e1'; // slate-300
  ctx.font = '16px sans-serif';
  ctx.fillText('Упрощённый экспорт (используйте html2canvas для полного)', 10, 30);
  
  exportCanvasToImage(canvas, filename);
}

/**
 * Экспорт данных в JSON (уже реализовано в компонентах, но вынесено для переиспользования)
 */
export function exportToJSON(
  data: unknown,
  filename: string = `sifs-export-${Date.now()}.json`
): void {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
