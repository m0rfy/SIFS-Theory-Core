import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MASS_HIERARCHY, k_over_M_Pl } from '@/app/utils/sifs-theory-constants';

const HIERARCHY_COLORS = ['#8b5cf6', '#a78bfa', '#6366f1', '#3b82f6', '#06b6d4'];

export function MassHierarchyChart() {
  const data = MASS_HIERARCHY.map((entry, i) => ({
    name: entry.name,
    value: entry.logGeV,
    realValue: entry.realValue,
    S: entry.S,
    color: HIERARCHY_COLORS[i] ?? '#8b5cf6',
  }));

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
          <div className="text-purple-400 font-mono mb-1">k ≈ {k_over_M_Pl} M_Pl</div>
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
