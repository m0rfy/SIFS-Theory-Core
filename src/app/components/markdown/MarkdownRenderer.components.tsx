/**
 * MarkdownRenderer Components
 * 
 * Custom components for markdown elements: headings, lists, tables, code blocks, quotes
 */

import { ReactNode } from 'react';
import { CheckCircle, Circle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/app/components/ui/utils';
import { ComponentProps } from './MarkdownRenderer.types';

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
 * Heading component with gradients and anchor links
 */
export function Heading({ children, node, className }: ComponentProps) {
  const level = node?.tagName?.replace('h', '') || '1';
  const id = node?.properties?.id || 
    (typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : `heading-${level}`);
  
  // T062: Adaptive typography sizes (h1: 32px mobile, 48px desktop)
  const headingClasses = {
    '1': 'text-[32px] md:text-[48px] font-bold mb-4 md:mb-6 mt-6 md:mt-8',
    '2': 'text-[28px] md:text-[36px] font-bold mb-3 md:mb-5 mt-5 md:mt-7',
    '3': 'text-[24px] md:text-[28px] font-semibold mb-3 md:mb-4 mt-4 md:mt-6',
    '4': 'text-[20px] md:text-[24px] font-semibold mb-2 md:mb-3 mt-3 md:mt-5',
  }[level] || 'text-lg md:text-xl font-semibold mb-2 mt-4';

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <Tag
      id={id}
      className={cn(
        headingClasses,
        'scroll-mt-20 group relative',
        'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent',
        'hover:from-foreground hover:to-foreground/90 transition-all duration-200',
        className
      )}
    >
      {children}
      <a
        href={`#${id}`}
        className="no-underline hover:underline opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-foreground/50 hover:text-foreground"
        onClick={handleAnchorClick}
        aria-label={`Ссылка на раздел: ${typeof children === 'string' ? children : id}`}
      >
        #
      </a>
    </Tag>
  );
}

/**
 * Ordered list component with CheckCircle icons
 */
export function OrderedList({ children, className }: ComponentProps) {
  return (
    <ol className={cn('list-none space-y-2 my-4', className)}>
      {children}
    </ol>
  );
}

/**
 * Unordered list component with Circle icons
 */
export function UnorderedList({ children, className }: ComponentProps) {
  return (
    <ul className={cn('list-none space-y-2 my-4', className)}>
      {children}
    </ul>
  );
}

/**
 * List item component with icons
 */
export function ListItem({ children, node, className }: ComponentProps) {
  const isOrdered = node?.parent?.tagName === 'ol';
  const Icon = isOrdered ? CheckCircle : Circle;
  
  return (
    <li className={cn('flex items-start gap-3', className)}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-foreground/60" />
      <span className="flex-1">{children}</span>
    </li>
  );
}

/**
 * Table component with neomorphism styling and mobile-friendly horizontal scroll
 * T060, T062: Horizontal scroll or cards for tables on mobile
 */
export function Table({ children, className }: ComponentProps) {
  return (
    <div className="overflow-x-auto my-4 md:my-6 -mx-4 md:mx-0">
      <div className="min-w-full inline-block">
        <table className={cn('w-full border-collapse neo-card', className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

/**
 * Table row with zebra striping
 */
export function TableRow({ children, className }: ComponentProps) {
  return (
    <tr className={cn(
      'border-b border-border/50',
      'even:bg-foreground/5',
      'hover:bg-foreground/10 transition-colors',
      className
    )}>
      {children}
    </tr>
  );
}

/**
 * Code block component with syntax highlighting and copy button
 */
export function CodeBlock({ children, node, className }: ComponentProps) {
  const codeString = typeof children === 'string' 
    ? children 
    : (Array.isArray(children) ? children.join('') : String(children));
  
  const language = node?.properties?.className?.[0]?.replace('language-', '') || '';

  const handleCopy = async () => {
    const success = await copyToClipboard(codeString);
    if (success) {
      toast.success('Код скопирован в буфер обмена', {
        description: language ? `Язык: ${language}` : undefined,
      });
    } else {
      toast.error('Не удалось скопировать код');
    }
  };

  return (
    <div className={cn('relative group my-4', className)}>
      <div className="neo-card p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code className={cn('block', language && `language-${language}`)}>
            {children}
          </code>
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2',
          'p-2 rounded-md',
          'min-w-[44px] min-h-[44px]', // T060: Touch-friendly button sizes minimum 44x44px
          'bg-background/80 backdrop-blur-sm',
          'border border-border',
          'opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100',
          'transition-opacity',
          'hover:bg-background hover:border-foreground/20',
          'focus:outline-none focus:ring-2 focus:ring-ring',
          'active:opacity-100' // T060: Show on mobile tap
        )}
        aria-label="Копировать код"
        title="Копировать код"
      >
        <Copy className="w-4 h-4 md:w-4 md:h-4" />
      </button>
    </div>
  );
}

/**
 * Inline code component
 */
export function InlineCode({ children, className }: ComponentProps) {
  return (
    <code className={cn(
      'px-1.5 py-0.5 rounded',
      'bg-muted text-foreground',
      'font-mono text-sm',
      'border border-border',
      className
    )}>
      {children}
    </code>
  );
}

/**
 * Blockquote component with visual styling
 */
export function Blockquote({ children, className }: ComponentProps) {
  return (
    <blockquote className={cn(
      'my-4 pl-4 border-l-4 border-primary/50',
      'italic text-foreground/80',
      'bg-foreground/5 rounded-r-md py-2',
      className
    )}>
      {children}
    </blockquote>
  );
}
