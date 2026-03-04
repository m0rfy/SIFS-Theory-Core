/**
 * DocPage - Страница отдельного документа
 * 
 * Загружает и отображает markdown документы с:
 * - Метаданными документа (FR-024)
 * - Связанными документами (FR-018)
 * - Оглавлением для длинных документов (FR-017)
 * - Индикаторами загрузки (FR-022)
 * - Lazy loading для изображений и графиков (FR-016)
 */

import { useEffect, useState, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Loader2, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { MarkdownRenderer } from '@/app/components/markdown/MarkdownRenderer';
import { ScrollReveal } from '@/app/components/enhanced/ScrollReveal';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Breadcrumbs, BreadcrumbItem } from '@/app/components/enhanced/Breadcrumbs';
import { getDocumentByPath, getDocumentById, getDocumentsByCategory, type Document, type DocumentCategory } from '@/app/utils/docs-structure';
import { SpatialSlab } from '@/app/components/spatial';
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract table of contents from markdown content
 */
function extractTableOfContents(content: string): TableOfContentsItem[] {
  const lines = content.split('\n');
  const toc: TableOfContentsItem[] = [];

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      toc.push({ id, text, level });
    }
  });

  return toc;
}

/**
 * DocPage component
 */
export function DocPage() {
  const { category, '*': docPath } = useParams<{ category: string; '*': string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<Document | null>(null);

  // Redirect to first document if only category is specified
  useEffect(() => {
    if (category && !docPath) {
      const categoryDocs = getDocumentsByCategory(category as DocumentCategory);
      if (categoryDocs.length > 0) {
        // Get first document (sorted by order if available)
        const firstDoc = categoryDocs.sort((a, b) => (a.order || 0) - (b.order || 0))[0];
        const docId = firstDoc.id;
        navigate(`/docs/${category}/${docId}`, { replace: true });
        return;
      }
    }
  }, [category, docPath, navigate]);

  // Construct document path from URL
  const fullPath = useMemo(() => {
    if (!category || !docPath) return null;
    // Remove leading slash if present
    const cleanPath = docPath.startsWith('/') ? docPath.slice(1) : docPath;
    return `/docs/${category}/${cleanPath}.md`;
  }, [category, docPath]);

  // Load document metadata
  useEffect(() => {
    if (!fullPath) return;

    const doc = getDocumentByPath(fullPath);
    if (doc) {
      setDocument(doc);
    }
  }, [fullPath]);

  // Load markdown content
  useEffect(() => {
    if (!fullPath) {
      setError('Путь к документу не указан');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Build URL relative to the app base path so it works on both
    // GitHub Pages (sub-path) and local dev/preview servers.
    // import.meta.env.BASE_URL is './' in production, '/' in dev.
    const base = import.meta.env.BASE_URL;
    const relativePath = fullPath.replace(/^\//, '');
    const fetchUrl = base.endsWith('/') ? `${base}${relativePath}` : `${base}/${relativePath}`;
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Документ не найден: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading document:', err);
        setError(err.message || 'Ошибка загрузки документа');
        setLoading(false);
      });
  }, [fullPath]);

  // Extract table of contents
  const tableOfContents = useMemo(() => {
    if (!content) return [];
    return extractTableOfContents(content);
  }, [content]);

  // Build breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [];

    if (category) {
      items.push({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        path: `/docs/${category}`,
      });
    }

    if (document) {
      items.push({
        label: document.title,
        path: location.pathname,
        isActive: true,
      });
    }

    return items;
  }, [category, document, location.pathname]);

  // Get related documents
  const relatedDocuments = useMemo(() => {
    if (!document?.related) return [];
    return document.related
      .map((id) => getDocumentById(id))
      .filter((doc): doc is Document => doc !== undefined);
  }, [document]);

  // Handle link clicks in markdown
  const handleLinkClick = (href: string) => {
    if (href.startsWith('/')) {
      // Internal link - use React Router
      window.location.href = href;
    } else if (href.startsWith('http')) {
      // External link - open in new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <SpatialSlab preset="monolith" className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Загрузка документа...</p>
        </div>
      </SpatialSlab>
    );
  }

  if (error) {
    return (
      <SpatialSlab preset="monolith" className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Ошибка загрузки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button asChild variant="outline">
              <Link to="/docs">Вернуться к документам</Link>
            </Button>
          </CardContent>
        </Card>
      </SpatialSlab>
    );
  }

  return (
    <SpatialSlab preset="monolith" className="min-h-screen">
      <div className="container mx-auto px-4 md:px-4 py-4 md:py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <ScrollReveal direction="down" delay={0}>
          <Breadcrumbs items={breadcrumbs} />
        </ScrollReveal>

        {/* Document Metadata */}
        {document && (
          <ScrollReveal direction="down" delay={50}>
            <div className="mb-4 md:mb-8">
              <h1 className="text-[32px] md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{document.title}</h1>
              {document.description && (
                <p className="text-base md:text-lg text-muted-foreground mb-3 md:mb-4">{document.description}</p>
              )}
              {document.tags && document.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <ImagePlaceholder
                id={`doc-cover-${document.category}`}
                label={`Обложка раздела «${document.category}»`}
                hint="1200×400px"
                aspect="3/1"
                className="mt-4 w-full"
              />
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="up" delay={100}>
              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer content={content} onLinkClick={handleLinkClick} />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar: Table of Contents & Related Documents */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 md:top-8 space-y-4 md:space-y-6">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <ScrollReveal direction="left" delay={150}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Оглавление
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <nav className="space-y-2">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                              'block text-sm transition-colors hover:text-foreground',
                              'hover:underline underline-offset-4',
                              item.level === 1 && 'font-semibold',
                              item.level === 2 && 'ml-2',
                              item.level === 3 && 'ml-4 text-muted-foreground',
                              item.level >= 4 && 'ml-6 text-muted-foreground/80'
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = window.document.getElementById(item.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                window.history.pushState(null, '', `#${item.id}`);
                              }
                            }}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Related Documents */}
              {relatedDocuments.length > 0 && (
                <ScrollReveal direction="left" delay={200}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Связанные документы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <nav className="space-y-2">
                        {relatedDocuments.map((doc) => (
                          <Link
                            key={doc.id}
                            to={doc.path.replace('/docs/', '/docs/')}
                            className="block text-sm transition-colors hover:text-foreground hover:underline underline-offset-4"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span>{doc.title}</span>
                            </div>
                          </Link>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </SpatialSlab>
  );
}
