import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function MassHierarchyChart() {
  // Real mass scales in eV (logarithmic)
  const data = [
    { name: 'Планк', value: 19, realValue: '1.22 × 10¹⁹ GeV', color: '#8b5cf6', S: 0 },
    { name: 'GUT', value: 16, realValue: '10¹⁶ GeV', color: '#a78bfa', S: 2 },
    { name: 'Weak', value: 2.4, realValue: '246 GeV', color: '#6366f1', S: 8.5 },
    { name: 'Proton', value: 0.938, realValue: '938 MeV', color: '#3b82f6', S: 11.2 },
    { name: 'Electron', value: 0.000511, realValue: '511 keV', color: '#06b6d4', S: 18.7 }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-cyan-400 mb-2">Иерархия масс через RS-warping</h4>
        <p className="text-gray-400 text-sm mb-4">
          Экспоненциальное подавление: m_eff = m_Pl × exp(−k|S|)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#9ca3af" 
              label={{ value: 'log₁₀(E/GeV)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#f3f4f6' }}
              formatter={(value: any, name: string, props: any) => [
                `${props.payload.realValue}\n|S| ≈ ${props.payload.S}`,
                'Масштаб'
              ]}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded">
          <div className="text-purple-400 font-mono mb-1">k ≈ 0.1 M_Pl</div>
          <div className="text-gray-400">Warping параметр</div>
        </div>
        <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded">
          <div className="text-blue-400 font-mono mb-1">Δ|S| ≈ 20</div>
          <div className="text-gray-400">Полная иерархия</div>
        </div>
      </div>
    </div>
  );
}
