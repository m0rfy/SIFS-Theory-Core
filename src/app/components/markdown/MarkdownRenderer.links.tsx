/**
 * MarkdownRenderer Links
 * 
 * Internal/external link detection with hover effects and icons
 */

import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { LinkProps } from './MarkdownRenderer.types';

/**
 * Detect if link is external
 */
function isExternalLink(href?: string): boolean {
  if (!href) return false;
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

/**
 * Detect if link is internal
 */
function isInternalLink(href?: string): boolean {
  if (!href) return false;
  return href.startsWith('/') || href.startsWith('#');
}

/**
 * Link component with hover effects and icons
 */
export function Link({ children, href, isExternal: isExternalProp, className, node }: LinkProps) {
  const hrefValue = href || node?.properties?.href || '#';
  const isExternal = isExternalProp !== undefined 
    ? isExternalProp 
    : isExternalLink(hrefValue);
  const isInternal = isInternalLink(hrefValue);
  
  const Icon = isExternal ? ExternalLink : ArrowRight;
  const iconSize = isExternal ? 14 : 12;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle internal links with smooth scroll
    if (isInternal && hrefValue.startsWith('#')) {
      e.preventDefault();
      const id = hrefValue.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', hrefValue);
      }
    }
    // External links open in new tab (handled by target="_blank")
  };

  return (
    <a
      href={hrefValue}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1',
        'text-primary hover:text-primary/80',
        'underline underline-offset-2',
        'hover:underline-offset-4',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm',
        className
      )}
    >
      <span>{children}</span>
      <Icon 
        className={cn(
          'inline-block transition-transform duration-200',
          isExternal ? 'w-3.5 h-3.5' : 'w-3 h-3',
          'group-hover:translate-x-0.5'
        )}
        style={{ width: iconSize, height: iconSize }}
      />
    </a>
  );
}
