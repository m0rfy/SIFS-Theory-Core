import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export function DarkEnergyEvolution() {
  // DESI 2025 data: evolving dark energy
  // w(z) = w0 + wa * z/(1+z)
  const w0 = -0.827; // DESI best fit
  const wa = -0.75;  // Evolution parameter
  
  const data = [];
  for (let z = 0; z <= 3; z += 0.1) {
    const w_z = w0 + wa * z / (1 + z);
    const w_LCDM = -1.0;
    const S_global = 20 + 0.5 * z; // SIFS prediction: S increases with redshift
    
    data.push({
      z: parseFloat(z.toFixed(2)),
      w_SIFS: parseFloat(w_z.toFixed(3)),
      w_LCDM: w_LCDM,
      S: parseFloat(S_global.toFixed(2))
    });
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-black/40 rounded-lg">
        <h4 className="text-green-400 mb-2">Эволюция тёмной энергии (DESI 2025)</h4>
        <p className="text-gray-400 text-sm mb-4">
          w(z) = w₀ + wₐ × z/(1+z), где w₀ = {w0}, wₐ = {wa}
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="z" 
              stroke="#9ca3af"
              label={{ value: 'Redshift (z)', position: 'insideBottom', offset: -10, fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              domain={[-1.5, -0.5]}
              label={{ value: 'w = P/ρ', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <ReferenceLine 
              y={-1} 
              stroke="#ef4444" 
              strokeDasharray="5 5" 
              label={{ value: 'ΛCDM (w = -1)', fill: '#ef4444', position: 'right' }}
            />
            <Line 
              type="monotone" 
              dataKey="w_SIFS" 
              stroke="#10b981" 
              strokeWidth={3}
              name="SIFS (Evolving)" 
              dot={{ fill: '#10b981', r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="w_LCDM" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="ΛCDM (Constant)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="p-3 bg-green-950/30 border border-green-500/30 rounded">
          <div className="text-green-400 font-mono mb-1">&gt;4σ</div>
          <div className="text-gray-400">Отклонение от ΛCDM</div>
        </div>
        <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded">
          <div className="text-blue-400 font-mono mb-1">ΔS ≈ 1.5</div>
          <div className="text-gray-400">Дрейф за z=0→3</div>
        </div>
        <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded">
          <div className="text-purple-400 font-mono mb-1">Λ_eff(z)</div>
          <div className="text-gray-400">Динамическая ТЭ</div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-green-950/30 to-cyan-950/30 border border-green-500/20 rounded-lg">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-green-400 font-mono">SIFS интерпретация:</span> w(z) отражает изменение 
          глобальной масштабной координаты S_global со временем через энтропийное натяжение браны: 
          Λ_eff ∝ exp(−2k|S_global|). Наблюдаемая эволюция естественна без fine-tuning.
        </p>
      </div>
    </div>
  );
}
