/**
 * MarkdownRenderer Math
 * 
 * LaTeX/MathJax formula rendering with neomorphism background and copy functionality
 */

import { useEffect, useRef } from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/app/components/ui/utils';
import { MathProps } from './MarkdownRenderer.types';

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
 * Inline math formula component
 */
export function InlineMath({ children, formula, className }: MathProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const mathContent = formula || (typeof children === 'string' ? children : String(children));

  useEffect(() => {
    if (containerRef.current && mathContent) {
      try {
        katex.render(mathContent, containerRef.current, {
          throwOnError: false,
          displayMode: false,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = mathContent;
        }
      }
    }
  }, [mathContent]);

  return (
    <span
      ref={containerRef}
      className={cn('inline-block mx-0.5', className)}
    />
  );
}

/**
 * Block math formula component with neomorphism background and copy button
 */
export function BlockMath({ children, formula, className }: MathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathContent = formula || (typeof children === 'string' ? children : String(children));

  useEffect(() => {
    if (containerRef.current && mathContent) {
      try {
        katex.render(mathContent, containerRef.current, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = mathContent;
        }
      }
    }
  }, [mathContent]);

  const handleCopy = async () => {
    const success = await copyToClipboard(mathContent);
    if (success) {
      toast.success('Формула скопирована в буфер обмена');
    } else {
      toast.error('Не удалось скопировать формулу');
    }
  };

  return (
    <div className={cn('relative group my-4', className)}>
      <div className="neo-card p-4 overflow-x-auto">
        <div
          ref={containerRef}
          className="text-center"
        />
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2',
          'p-2 rounded-md',
          'bg-background/80 backdrop-blur-sm',
          'border border-border',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'hover:bg-background hover:border-foreground/20',
          'focus:outline-none focus:ring-2 focus:ring-ring'
        )}
        aria-label="Копировать формулу"
        title="Копировать формулу"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
}
