import { useTranslation } from 'react-i18next';

export function OpticalMetricDiagram() {
  const { t } = useTranslation();

  const interactions = [
    {
      force: t('optical_metric.forces.gravity.name'),
      gradient: 'dn/dr ≈ 10⁻²⁰ m⁻¹',
      scale: '|S| ≈ 20',
      n_profile: 'n(r) = 1 + GM/rc²',
      effect: t('optical_metric.forces.gravity.effect'),
      color: 'purple',
      strength: t('optical_metric.forces.gravity.strength')
    },
    {
      force: t('optical_metric.forces.em.name'),
      gradient: 'dn/dr ≈ 10⁻¹⁰ m⁻¹',
      scale: '|S| ≈ 5',
      n_profile: 'n(r) = 1 + αħ/mc·r',
      effect: t('optical_metric.forces.em.effect'),
      color: 'cyan',
      strength: t('optical_metric.forces.em.strength')
    },
    {
      force: t('optical_metric.forces.strong.name'),
      gradient: 'dn/dr ≈ 10⁵ m⁻¹',
      scale: '|S| ≈ 2.8',
      n_profile: 'n(r) = 1 + exp(−r/r_QCD)',
      effect: t('optical_metric.forces.strong.effect'),
      color: 'green',
      strength: t('optical_metric.forces.strong.strength')
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-orange-400 mb-3">{t('optical_metric.title')}</h4>
        <p className="text-gray-400 text-sm mb-4">
          {t('optical_metric.subtitle')}
        </p>

        {/* Core Formula */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-950/30 to-red-950/30 border border-orange-500/30 rounded-lg">
          <div className="text-center mb-3">
            <div className="text-orange-400 font-mono text-lg mb-2">
              {t('optical_metric.formula.main')}
            </div>
            <p className="text-gray-400 text-sm">
              {t('optical_metric.formula.desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">{t('optical_metric.formula.photons')}</div>
              <div className="text-cyan-400 font-mono">v = c/n(r)</div>
            </div>
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">{t('optical_metric.formula.particles')}</div>
              <div className="text-green-400 font-mono">F = −∇n</div>
            </div>
            <div className="p-2 bg-black/40 rounded text-center">
              <div className="text-gray-400 mb-1">{t('optical_metric.formula.potential')}</div>
              <div className="text-purple-400 font-mono">V ∝ n(r)</div>
            </div>
          </div>
        </div>

        {/* Interactions Table */}
        <div className="space-y-3">
          {interactions.map((item, index) => (
            <div 
              key={index}
              className={`p-4 bg-${item.color}-950/20 border border-${item.color}-500/30 rounded-lg hover:border-${item.color}-500/50 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className={`text-${item.color}-400 mb-1`}>{item.force}</h5>
                  <div className="text-gray-500 text-xs">{item.strength} {t('optical_metric.labels.gradient_suffix')}</div>
                </div>
                <div className="text-right">
                  <div className={`text-${item.color}-400 font-mono text-sm`}>{item.scale}</div>
                  <div className="text-gray-500 text-xs">{t('optical_metric.labels.scale')}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-black/40 rounded">
                  <div className="text-gray-400 text-xs mb-1">{t('optical_metric.labels.gradient')}</div>
                  <div className={`text-${item.color}-400 font-mono text-xs`}>{item.gradient}</div>
                </div>
                <div className="p-2 bg-black/40 rounded">
                  <div className="text-gray-400 text-xs mb-1">{t('optical_metric.labels.profile')}</div>
                  <div className="text-gray-300 font-mono text-xs">{item.n_profile}</div>
                </div>
              </div>

              <div className="mt-2 text-gray-400 text-xs italic">
                → {item.effect}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-950/30 to-yellow-950/30 border border-orange-500/30 rounded-lg">
        <h5 className="text-orange-400 mb-2">{t('optical_metric.insight.title')}</h5>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          {t('optical_metric.insight.text')}
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-purple-400 mb-1">{t('optical_metric.forces.gravity.name')}</div>
            <div className="text-gray-400">{t('optical_metric.insight.gravity_desc')}</div>
          </div>
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-cyan-400 mb-1">EM</div>
            <div className="text-gray-400">{t('optical_metric.insight.em_desc')}</div>
          </div>
          <div className="p-2 bg-black/40 rounded text-center">
            <div className="text-green-400 mb-1">Strong</div>
            <div className="text-gray-400">{t('optical_metric.insight.strong_desc')}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-lg">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-indigo-400 font-mono">{t('optical_metric.connection.prefix')}</span> {t('optical_metric.connection.text')}
        </p>
      </div>
    </div>
  );
}
