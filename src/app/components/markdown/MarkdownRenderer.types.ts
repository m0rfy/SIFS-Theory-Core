/**
 * MarkdownRenderer Types
 * 
 * TypeScript interfaces for MarkdownRenderer and its submodules
 */

import { ReactNode } from 'react';

/**
 * Main MarkdownRenderer component props
 */
export interface MarkdownRendererProps {
  /** Markdown content to render */
  content: string;
  /** Additional CSS classes */
  className?: string;
  /** Handler for link clicks */
  onLinkClick?: (href: string) => void;
}

/**
 * Component props for custom markdown elements
 */
export interface ComponentProps {
  /** Children elements */
  children?: ReactNode;
  /** HTML node properties */
  node?: any;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Math/Formula props
 */
export interface MathProps extends ComponentProps {
  /** LaTeX formula content */
  formula?: string;
  /** Inline or block formula */
  inline?: boolean;
}

/**
 * Image props
 */
export interface ImageProps extends ComponentProps {
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Image caption */
  caption?: string;
  /** Image format (jpg, png, svg, webp) */
  format?: string;
}

/**
 * Link props
 */
export interface LinkProps extends ComponentProps {
  /** Link href */
  href?: string;
  /** Is external link */
  isExternal?: boolean;
}

/**
 * Visual props for charts and 3D visualizations
 */
export interface VisualProps extends ComponentProps {
  /** Chart type (chart, 3d) */
  type?: 'chart' | '3d';
  /** Data format (JSON, CSV, TSV) */
  format?: 'json' | 'csv' | 'tsv';
  /** Chart data */
  data?: any;
}
