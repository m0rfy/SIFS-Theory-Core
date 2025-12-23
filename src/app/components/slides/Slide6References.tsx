import { useTranslation } from 'react-i18next';
import { Slide } from '../Slide';
import { BookOpen, ExternalLink } from 'lucide-react';

interface Slide6Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide6References({ slideNumber, totalSlides }: Slide6Props) {
  const { t } = useTranslation();

  const references = [
    {
      author: 'Nassim Haramein',
      title: 'The Schwarzschild Proton',
      year: '2010',
      url: 'https://pubs.aip.org/aip/acp/article/1303/1/95/869984/The-Schwarzschild-Proton',
      description: t('references_slide.items.haramein.desc')
    },
    {
      author: 'Alexander Burinskii',
      title: 'Kerr-Newman Electron',
      year: '2005',
      url: 'https://arxiv.org/abs/hep-th/0507109',
      description: t('references_slide.items.burinskii.desc')
    },
    {
      author: 'Laurent Nottale',
      title: 'Scale Relativity',
      year: '2008',
      url: 'https://arxiv.org/abs/0812.3857',
      description: t('references_slide.items.nottale.desc')
    },
    {
      author: 'Lisa Randall & Raman Sundrum',
      title: 'RS Model',
      year: '1999',
      url: 'https://arxiv.org/abs/hep-ph/9905221',
      description: t('references_slide.items.randall.desc')
    },
    {
      author: 'Carlo Rovelli et al.',
      title: 'Analog Gravity / Gordon Metric',
      year: '2011',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5255570/',
      description: t('references_slide.items.rovelli.desc')
    }
  ];

  return (
    <Slide
      title={t('references_slide.title')}
      subtitle={t('references_slide.subtitle')}
      backgroundImage="https://images.unsplash.com/photo-1728675437273-d83d4cfaf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFjdGFsJTIwbWFuZGVsYnJvdCUyMHNldHxlbnwxfHx8fDE3NjY0NzExMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-4 max-w-5xl mx-auto">
        {references.map((ref, index) => (
          <div 
            key={index}
            className="p-5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-blue-400 mb-1">{ref.author}</h3>
                    <p className="text-white">{ref.title}</p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap">{ref.year}</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">
                  {ref.description}
                </p>
                
                <a 
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="font-mono break-all">{ref.url}</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="p-6 bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-500/30 rounded-lg mt-8">
          <h3 className="mb-3 text-purple-400 text-center">{t('references_slide.synthesis.title')}</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            {t('references_slide.synthesis.text')}
          </p>
        </div>
      </div>
    </Slide>
  );
}
