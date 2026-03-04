/**
 * MarkdownRenderer
 * 
 * Main component for rendering markdown content with support for:
 * - Headings with gradients and anchor links
 * - Lists with icons
 * - Tables with neomorphism
 * - Code blocks with syntax highlighting and copy
 * - Math formulas with LaTeX/MathJax
 * - Images with lazy loading and zoom
 * - Links with hover effects
 * - Interactive charts and visualizations
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import { cn } from '@/app/components/ui/utils';
import { MarkdownRendererProps } from './MarkdownRenderer.types';
import {
  Heading,
  OrderedList,
  UnorderedList,
  ListItem,
  Table,
  TableRow,
  CodeBlock,
  InlineCode,
  Blockquote,
} from './MarkdownRenderer.components';
import { InlineMath, BlockMath } from './MarkdownRenderer.math';
import { Image } from './MarkdownRenderer.images';
import { Link } from './MarkdownRenderer.links';
import { Chart } from './MarkdownRenderer.visuals';

/**
 * MarkdownRenderer component
 */
export function MarkdownRenderer({ content, className, onLinkClick }: MarkdownRendererProps) {
  const components = {
    // Headings
    h1: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),
    h2: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),
    h3: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),
    h4: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),
    h5: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),
    h6: ({ node, children, className: headingClassName }: any) => (
      <Heading node={node} className={headingClassName}>{children}</Heading>
    ),

    // Lists
    ol: ({ children, className: listClassName }: any) => (
      <OrderedList className={listClassName}>{children}</OrderedList>
    ),
    ul: ({ children, className: listClassName }: any) => (
      <UnorderedList className={listClassName}>{children}</UnorderedList>
    ),
    li: ({ node, children, className: itemClassName }: any) => (
      <ListItem node={node} className={itemClassName}>{children}</ListItem>
    ),

    // Tables
    table: ({ children, className: tableClassName }: any) => (
      <Table className={tableClassName}>{children}</Table>
    ),
    tr: ({ children, className: rowClassName }: any) => (
      <TableRow className={rowClassName}>{children}</TableRow>
    ),
    td: ({ children, className: cellClassName }: any) => (
      <td className={cn('px-4 py-2', cellClassName)}>{children}</td>
    ),
    th: ({ children, className: headerClassName }: any) => (
      <th className={cn('px-4 py-2 text-left font-semibold bg-foreground/10', headerClassName)}>
        {children}
      </th>
    ),

    // Code blocks - используем pre для блочных кодов, чтобы избежать DOM nesting
    pre: ({ children, className: preClassName }: any) => {
      // Если внутри pre есть code, обрабатываем его как CodeBlock
      const codeElement = React.Children.toArray(children).find(
        (child: any) => child?.props?.node?.tagName === 'code'
      ) as any;
      
      if (codeElement) {
        const codeString = String(codeElement.props.children).replace(/\n$/, '');
        const isChart = codeString.trim().toLowerCase().startsWith('chart');
        const is3d = codeString.trim().toLowerCase().startsWith('3d');
        
        if (isChart || is3d) {
          return (
            <Chart
              node={codeElement.props.node}
              type={is3d ? '3d' : 'chart'}
              className={preClassName}
            >
              {codeString}
            </Chart>
          );
        }
        
        // Для обычных code блоков используем CodeBlock
        return (
          <CodeBlock node={codeElement.props.node} className={preClassName}>
            {codeElement.props.children}
          </CodeBlock>
        );
      }
      
      // Fallback для обычного pre
      return <pre className={preClassName}>{children}</pre>;
    },
    
    // Inline code
    code: ({ node, inline, children, className: codeClassName, ...props }: any) => {
      if (inline) {
        return (
          <InlineCode className={codeClassName} {...props}>
            {children}
          </InlineCode>
        );
      }
      
      // Блочный code обрабатывается через pre компонент выше
      // Но на случай если react-markdown не обернул в pre, возвращаем как есть
      return (
        <code className={codeClassName} {...props}>
          {children}
        </code>
      );
    },

    // Math (inline and block)
    // Note: KaTeX is handled via rehype-katex plugin, but we can also handle custom math blocks

    // Images
    img: ({ node, src, alt, ...props }: any) => {
      const caption = node?.properties?.title || alt;
      return (
        <Image
          src={src}
          alt={alt}
          caption={caption}
          {...props}
        />
      );
    },

    // Links
    a: ({ node, href, children, ...props }: any) => {
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onLinkClick) {
          e.preventDefault();
          onLinkClick(href);
        }
      };
      
      return (
        <Link
          href={href}
          node={node}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Link>
      );
    },

    // Blockquotes
    blockquote: ({ children, className: quoteClassName }: any) => (
      <Blockquote className={quoteClassName}>{children}</Blockquote>
    ),

    // Other elements
    p: ({ children, className: paraClassName }: any) => (
      <p className={cn('my-3 md:my-4 leading-relaxed text-base md:text-base', paraClassName)}>{children}</p>
    ),
    strong: ({ children, className: strongClassName }: any) => (
      <strong className={cn('font-semibold', strongClassName)}>{children}</strong>
    ),
    em: ({ children, className: emClassName }: any) => (
      <em className={cn('italic', emClassName)}>{children}</em>
    ),
    hr: ({ className: hrClassName }: any) => (
      <hr className={cn('my-8 border-border', hrClassName)} />
    ),
  };

  return (
    <div
      className={cn(
        'markdown-content',
        'prose prose-invert max-w-none',
        'prose-headings:font-bold prose-headings:text-foreground',
        'prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-base',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-a:min-h-[44px] prose-a:inline-flex prose-a:items-center', // T060: Touch-friendly links
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-em:text-foreground/80 prose-em:italic',
        'prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-transparent prose-pre:p-0',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary/50',
        'prose-img:rounded-lg prose-img:shadow-lg prose-img:max-w-full', // T062: Responsive images
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
