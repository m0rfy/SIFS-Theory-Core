import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell, Legend } from 'recharts';

export function CouplingConstantsDiagram() {
  // Real coupling constants at different energy scales
  const data = [
    { 
      name: 'Gravity', 
      S: 20, 
      alpha: 1e-38, 
      displayAlpha: -38,
      strength: 1,
      formula: 'G_eff = G_Pl × exp(−2k|S|)',
      color: '#8b5cf6'
    },
    { 
      name: 'Weak', 
      S: 9, 
      alpha: 1e-6, 
      displayAlpha: -6,
      strength: 100,
      formula: 'G_F ∝ exp(−4k|S|_weak)',
      color: '#3b82f6'
    },
    { 
      name: 'EM', 
      S: 5.1, 
      alpha: 1/137, 
      displayAlpha: -2.14,
      strength: 150,
      formula: 'α ≈ 1/137, |S| ≈ ln(137π)',
      color: '#06b6d4'
    },
    { 
      name: 'Strong', 
      S: 2.8, 
      alpha: 1, 
      displayAlpha: 0,
      strength: 200,
      formula: 'α_s ≈ π/|S|ln(μ/Λ)',
      color: '#10b981'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-cyan-400 mb-2">Константы связи как функции масштаба S</h4>
        <p className="text-gray-400 text-sm mb-4">
          Все взаимодействия: градиенты dn/dr на разных |S|
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              type="number"
              dataKey="S" 
              stroke="#9ca3af"
              domain={[0, 22]}
              label={{ value: 'Масштабная координата |S|', position: 'insideBottom', offset: -10, fill: '#9ca3af' }}
            />
            <YAxis 
              type="number"
              dataKey="displayAlpha" 
              stroke="#9ca3af"
              domain={[-40, 2]}
              label={{ value: 'log₁₀(α)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <ZAxis 
              type="number" 
              dataKey="strength" 
              range={[100, 400]} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '12px'
              }}
              labelStyle={{ color: '#f3f4f6' }}
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                      <p className="text-white font-medium mb-2">{data.name}</p>
                      <p className="text-gray-400 text-sm">|S| = {data.S}</p>
                      <p className="text-gray-400 text-sm">α ≈ 10^{data.displayAlpha}</p>
                      <p className="text-cyan-400 text-xs mt-2 font-mono">{data.formula}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Coupling Constants" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.map((item, index) => (
          <div 
            key={index}
            className="p-3 bg-black/60 border rounded-lg"
            style={{ borderColor: item.color + '40' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white text-sm">{item.name}</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">{item.formula}</div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-950/30 to-blue-950/30 border border-purple-500/20 rounded-lg">
        <h4 className="text-purple-400 text-sm mb-2">Ключевой результат:</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          Экспоненциальное убывание силы взаимодействия с увеличением |S| объясняет, почему гравитация 
          в 10³⁸ раз слабее сильного взаимодействия. Это геометрическое следствие, а не совпадение.
        </p>
      </div>
    </div>
  );
}
