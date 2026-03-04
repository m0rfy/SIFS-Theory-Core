/**
 * FormulaBlock Component
 * 
 * Оформление математических формул с neomorphism фоном
 * Возможность копирования формулы (FR-023)
 * Поддержка LaTeX через KaTeX
 * 
 * T109: Create FormulaBlock component
 */

import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';

export interface FormulaBlockProps {
  /** LaTeX формула */
  formula: string;
  /** Описание формулы */
  description?: string;
  /** Обработчик копирования */
  onCopy?: () => void;
  /** Режим отображения (inline или block) */
  displayMode?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Copy to clipboard utility
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * FormulaBlock component
 */
export function FormulaBlock({
  formula,
  description,
  onCopy,
  displayMode = true,
  className,
}: FormulaBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current && formula) {
      try {
        katex.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = formula;
        }
      }
    }
  }, [formula, displayMode]);

  const handleCopy = async () => {
    const success = await copyToClipboard(formula);
    if (success) {
      setCopied(true);
      toast.success('Формула скопирована в буфер обмена');
      if (onCopy) {
        onCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Не удалось скопировать формулу');
    }
  };

  if (!displayMode) {
    // Inline mode
    return (
      <span
        ref={containerRef}
        className={cn('inline-block mx-0.5', className)}
      />
    );
  }

  // Block mode with neomorphism background
  return (
    <div className={cn('relative group my-4', className)}>
      <div className="neo-card p-4 overflow-x-auto">
        {description && (
          <p className="text-sm text-muted-foreground mb-2 italic">
            {description}
          </p>
        )}
        <div
          ref={containerRef}
          className="text-center"
        />
      </div>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="sm"
        className={cn(
          'absolute top-2 right-2',
          'p-2 rounded-md',
          'bg-background/80 backdrop-blur-sm',
          'border border-border',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'hover:bg-background hover:border-foreground/20',
          'focus:outline-none focus:ring-2 focus:ring-ring',
          'h-8 w-8'
        )}
        aria-label="Копировать формулу"
        title="Копировать формулу"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
