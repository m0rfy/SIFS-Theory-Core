/**
 * DocsIndexPage - Индекс документации (Карта музея)
 * 
 * T076: Document index ("Museum Map"), search functionality, category filtering,
 * results with preview and descriptions, recommended routes, document statistics
 * SC-001: Document can be found within 30 seconds
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Filter, TrendingUp, Users, BookMarked } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { DOCUMENTS, Document, DocumentCategory, searchDocuments, getDocumentsByCategory } from '@/app/utils/docs-structure';
import { SpatialSlab } from '@/app/components/spatial';
import { cn } from '@/app/components/ui/utils';

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  theory: 'Теория',
  calculations: 'Расчёты',
  predictions: 'Предсказания',
  data: 'Данные',
  defense: 'Защита',
  protocol: 'Протоколы',
  analysis: 'Анализ',
  visualizations: 'Визуализации',
};

const READING_PATHS = {
  core: {
    title: 'Математическое ядро',
    description: 'Метрика, уравнения движения, константы, фрактальная структура',
    icon: '∑',
    color: 'text-cyan-400',
    docs: ['overview', 'mathematics', 'fractal-structure'],
  },
  predictions: {
    title: 'Предсказания и данные',
    description: 'Проверяемые следствия теории и их сопоставление с экспериментом',
    icon: '📊',
    color: 'text-green-400',
    docs: ['detailed-predictions', 'desi-2025', 'euclid-jwst'],
  },
  calculations: {
    title: 'Расчёты',
    description: 'Масса протона, константы связи, иерархия масс из геометрии',
    icon: '🧮',
    color: 'text-purple-400',
    docs: ['proton-mass', 'coupling-constants', 'constants-unification'],
  },
};

function calculateRelevanceScore(doc: Document, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  if (doc.title.toLowerCase().includes(lowerQuery)) score += 10;
  if (doc.description?.toLowerCase().includes(lowerQuery)) score += 5;
  if (doc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 3;
  
  return score;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-400/30 text-yellow-200">{part}</mark>
    ) : (
      part
    )
  );
}

export function DocsIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');

  const filteredDocs = useMemo(() => {
    let docs: Document[] = [];
    
    if (selectedCategory === 'all') {
      docs = DOCUMENTS.all;
    } else {
      docs = getDocumentsByCategory(selectedCategory);
    }
    
    if (searchQuery.trim()) {
      docs = searchDocuments(searchQuery).filter(doc => 
        selectedCategory === 'all' || doc.category === selectedCategory
      );
      
      // Sort by relevance
      docs.sort((a, b) => 
        calculateRelevanceScore(b, searchQuery) - calculateRelevanceScore(a, searchQuery)
      );
    } else {
      // Sort by order if no search
      docs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    
    return docs;
  }, [searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = DOCUMENTS.all.length;
    const byCategory = Object.entries(DOCUMENTS.categories).reduce((acc, [cat, docs]) => {
      acc[cat] = docs.length;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, byCategory };
  }, []);

  return (
    <SpatialSlab preset="monolith" className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            Документация SIFS Theory
          </h1>
          <p className="text-slate-400 text-lg">
            Полная документация теории Scale-Invariant Fractal Spacetime: ядро, расчёты, предсказания, данные
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Всего документов</p>
                  <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
                </div>
                <BookMarked className="w-8 h-8 text-cyan-400/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Теория</p>
                  <p className="text-2xl font-bold text-slate-100">{stats.byCategory.theory || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Расчёты</p>
                  <p className="text-2xl font-bold text-slate-100">{stats.byCategory.calculations || 0}</p>
                </div>
                <Users className="w-8 h-8 text-green-400/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Предсказания</p>
                  <p className="text-2xl font-bold text-slate-100">{stats.byCategory.predictions || 0}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-400/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Поиск документов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-950/50 border-slate-800 text-slate-100"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as DocumentCategory | 'all')}>
            <SelectTrigger className="w-full md:w-[200px] bg-slate-950/50 border-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                <SelectItem key={cat} value={cat}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reading Paths */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-100">Разделы теории</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(READING_PATHS).map(([key, path]) => (
                <Card key={key} className="bg-slate-950/50 border-slate-800 hover:border-cyan-400/50 transition-colors">
                  <CardHeader>
                    <CardTitle className={`text-lg flex items-center gap-2 ${path.color}`}>
                      <span>{path.icon}</span>
                      {path.title}
                    </CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const firstDoc = DOCUMENTS.all.find(d => d.id === path.docs[0]);
                      const docPath = firstDoc ? firstDoc.path.replace('/docs/', '/docs/').replace('.md', '') : '/docs';
                      return (
                        <Link to={docPath}>
                          <Button variant="outline" size="sm" className="w-full">
                            Открыть раздел →
                          </Button>
                        </Link>
                      );
                    })()}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-100">
              {searchQuery ? `Результаты поиска (${filteredDocs.length})` : 'Все документы'}
            </h2>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
              >
                Очистить поиск
              </Button>
            )}
          </div>

          {filteredDocs.length === 0 ? (
            <Card className="bg-slate-950/50 border-slate-800">
              <CardContent className="pt-6 text-center">
                <p className="text-slate-400">Документы не найдены</p>
                <p className="text-sm text-slate-500 mt-2">
                  Попробуйте изменить поисковый запрос или выбрать другую категорию
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => (
                <Card
                  key={doc.id}
                  className="bg-slate-950/50 border-slate-800 hover:border-cyan-400/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2">
                        {searchQuery ? highlightText(doc.title, searchQuery) : doc.title}
                      </CardTitle>
                      <Badge variant="outline" className="shrink-0">
                        {CATEGORY_LABELS[doc.category]}
                      </Badge>
                    </div>
                    {doc.description && (
                      <CardDescription className="line-clamp-2">
                        {searchQuery ? highlightText(doc.description, searchQuery) : doc.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link to={doc.path.replace('/docs/', '/docs/').replace('.md', '')}>
                      <Button variant="outline" size="sm" className="w-full">
                        Открыть документ
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </SpatialSlab>
  );
}
