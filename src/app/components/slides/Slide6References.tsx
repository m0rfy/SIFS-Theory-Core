import { Slide } from '../Slide';
import { BookOpen, ExternalLink, FileText, Calculator, Microscope, GitBranch } from 'lucide-react';

interface Slide6Props {
  slideNumber: number;
  totalSlides: number;
}

export function Slide6References({ slideNumber, totalSlides }: Slide6Props) {
  const externalReferences = [
    {
      author: 'Nassim Haramein',
      title: 'The Schwarzschild Proton',
      year: '2010',
      url: 'https://pubs.aip.org/aip/acp/article/1303/1/95/869984/The-Schwarzschild-Proton',
      description: 'Протон как микро-ЧД'
    },
    {
      author: 'Lisa Randall & Raman Sundrum',
      title: 'RS Model',
      year: '1999',
      url: 'https://arxiv.org/abs/hep-ph/9905221',
      description: 'Warped Extra Dimensions'
    },
    {
      author: 'DESI Collaboration',
      title: 'Year 1 Results',
      year: '2024',
      url: 'https://arxiv.org/abs/2404.03002',
      description: 'Evolving Dark Energy'
    }
  ];

  const internalDocs = [
    {
      category: 'Theory',
      icon: FileText,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      items: [
        { name: 'overview.md', desc: 'Полный обзор архитектуры SIFS', path: 'docs/theory/overview.md' },
        { name: 'rs2-geometry.md', desc: 'Математика RS-warping метрики', path: 'docs/theory/rs2-geometry.md' },
        { name: 'optical-metric.md', desc: 'Вывод сил как градиентов n(r,S)', path: 'docs/theory/optical-metric.md' }
      ]
    },
    {
      category: 'Calculations',
      icon: Calculator,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      items: [
        { name: 'proton-mass.md', desc: 'Вывод массы протона из геометрии', path: 'docs/calculations/proton-mass.md' },
        { name: 'coupling-constants.md', desc: 'Расчет G, α, α_s, G_F', path: 'docs/calculations/coupling-constants.md' },
        { name: 'brane-tension.md', desc: 'Расчет натяжения и разрыва вакуума', path: 'docs/calculations/brane-tension.md' }
      ]
    },
    {
      category: 'Predictions',
      icon: Microscope,
      color: 'text-green-400',
      borderColor: 'border-green-500/30',
      items: [
        { name: 'cosmological-predictions.md', desc: 'Bayes Factor > 3000 (DESI)', path: 'docs/predictions/cosmological-predictions.md' },
        { name: 'gravitational-waves.md', desc: 'Спектр гравитационных волн', path: 'docs/predictions/gravitational-waves.md' },
        { name: 'falsification-criteria.md', desc: 'Критерии опровержения теории', path: 'docs/predictions/falsification-criteria.md' }
      ]
    }
  ];

  return (
    <Slide
      title="Документация и Референсы"
      subtitle="Теоретический фундамент и доказательная база проекта"
      backgroundImage="https://images.unsplash.com/photo-1728675437273-d83d4cfaf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFjdGFsJTIwbWFuZGVsYnJvdCUyMHNldHxlbnwxfHx8fDE3NjY0NzExMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="space-y-6 max-w-6xl mx-auto h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
        
        {/* Intro Box */}
        <div className="p-6 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-indigo-300">📚 Полная документация доступна в репозитории</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Проект содержит исчерпывающую документацию (более 20 MD-файлов), описывающую каждый аспект теории: 
            от вывода метрики до байесовского анализа данных 2025 года. Используйте ссылки ниже для навигации.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Internal Documentation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold mb-4">
              <GitBranch className="h-5 w-5 text-cyan-400" />
              Внутренняя структура проекта (/docs)
            </h4>
            
            <div className="grid gap-4">
              {internalDocs.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <div key={idx} className={`p-4 bg-black/60 border ${section.borderColor} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 bg-white/5 rounded-lg ${section.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h5 className={`${section.color} font-semibold`}>{section.category}</h5>
                    </div>
                    <div className="grid md:grid-cols-1 gap-2">
                      {section.items.map((item, i) => (
                        <a 
                          key={i}
                          href={`https://github.com/m0rfy/SIFS-Theory-Core/blob/main/${item.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                            <div>
                              <div className="text-gray-200 font-mono text-xs group-hover:text-cyan-400 transition-colors">{item.name}</div>
                              <div className="text-gray-500 text-xs">{item.desc}</div>
                            </div>
                          </div>
                          <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* External References Column */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold mb-4">
              <BookOpen className="h-5 w-5 text-purple-400" />
              Научные публикации
            </h4>
            
            <div className="space-y-3">
              {externalReferences.map((ref, index) => (
                <a 
                  key={index}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-black/40 border border-white/10 rounded-lg hover:border-purple-500/40 hover:bg-purple-900/10 transition-all group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="text-purple-300 text-sm font-semibold group-hover:text-purple-200">{ref.author}</h5>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{ref.year}</span>
                  </div>
                  <p className="text-gray-300 text-xs italic mb-2">{ref.title}</p>
                  <p className="text-gray-500 text-xs">{ref.description}</p>
                </a>
              ))}
              
              <div className="p-4 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg mt-6">
                <h5 className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Note</h5>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Теория SIFS является синтезом идей, представленных в данных работах, но предлагает уникальный математический аппарат (фрактальную метрику) для их объединения.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
