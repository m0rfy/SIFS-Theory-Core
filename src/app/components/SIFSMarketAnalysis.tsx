/**
 * SIFSMarketAnalysis — интерактивная визуализация SIFS System
 * Показывает: W(n) варпинг, отображение TF→S, компоненты Score, история BTC коллапсов
 */

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';

// ─── Математическое ядро SIFS ───────────────────────────────────────────────
const PI = Math.PI;
const PHI = (1 + Math.sqrt(5)) / 2;
const K_SYSTEM = 1 / (PI * (9 / PI));  // k = 1/(π × Ψ₁) ≈ 0.1111
const K_THEORY = 1 / (PI * PI);        // k = 1/π² ≈ 0.1013 (из физической теории)

const W_n = (n: number, k = K_SYSTEM) => Math.exp(-2 * k * Math.abs(n));
const S_TF = (t_min: number, k = K_SYSTEM) => Math.log(t_min) / (2 * k);

const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const EMA_MASS = (p: number) => Math.pow(p, PHI);

// ─── Данные для графиков ─────────────────────────────────────────────────────
const warpingData = Array.from({ length: 16 }, (_, n) => ({
  n,
  W_system: +W_n(n, K_SYSTEM).toFixed(4),
  W_theory: +W_n(n, K_THEORY).toFixed(4),
  label: n < 10 ? `F${FIB[n]}` : `n=${n}`,
}));

const timeframeData = [
  { tf: '1m',  t: 1,    s: +S_TF(1).toFixed(2),   label: '1m' },
  { tf: '3m',  t: 3,    s: +S_TF(3).toFixed(2),   label: '3m' },
  { tf: '5m',  t: 5,    s: +S_TF(5).toFixed(2),   label: '5m' },
  { tf: '15m', t: 15,   s: +S_TF(15).toFixed(2),  label: '15m' },
  { tf: '30m', t: 30,   s: +S_TF(30).toFixed(2),  label: '30m' },
  { tf: '1h',  t: 60,   s: +S_TF(60).toFixed(2),  label: '1h' },
  { tf: '4h',  t: 240,  s: +S_TF(240).toFixed(2), label: '4h' },
  { tf: '1d',  t: 1440, s: +S_TF(1440).toFixed(2),label: '1d' },
];

const btcData = [
  { era: '2010', price: 0.3,    ticks: 9,  event: 'КОЛЛАПС↑ S=0₁', type: 'up' },
  { era: '2011-06', price: 29.6, ticks: 28, event: 'ATH₁ S=0₂', type: 'ath' },
  { era: '2011-11', price: 2.3,  ticks: -21,event: 'КОЛЛАПС↓ −92%', type: 'down' },
  { era: '2013-11', price: 1242, ticks: 15, event: 'ATH₂ S=0₄', type: 'ath' },
  { era: '2014-02', price: 111,  ticks: -15,event: 'Mt.Gox −91%', type: 'down' },
  { era: '2016-12', price: 966,  ticks: 3,  event: 'Истина S=0₆', type: 'truth' },
  { era: '2017-12', price: 19891,ticks: 13, event: 'ATH₃ S=0₇', type: 'ath' },
  { era: '2020-03', price: 3800, ticks: -9, event: 'COVID S=0₉', type: 'down' },
  { era: '2020-12', price: 29300,ticks: 9,  event: 'КОЛЛАПС↑ S=0₁₀', type: 'up' },
  { era: '2021-04', price: 63600,ticks: 9,  event: 'ATH₄ S=0₁₂', type: 'ath' },
  { era: '2021-11', price: 67600,ticks: 9,  event: 'ATH₅ S=0₁₃', type: 'ath' },
  { era: '2022-05', price: 25500,ticks: -9, event: 'LUNA S=0₁₄', type: 'down' },
  { era: '2022-11', price: 15800,ticks: -9, event: 'FTX S=0₁₅', type: 'down' },
  { era: '2024-01', price: 46000,ticks: 9,  event: 'BTC ETF S=0₁₇', type: 'up' },
  { era: '2024-11', price: 73000,ticks: 9,  event: 'ATH₆ S=0₁₈', type: 'ath' },
];

// Real BTC multi-TF snapshot (17.02.2026)
const scoreComponents = [
  { name: '1m', W1: -0.564, W2: 0.518, W3: 0.5, W4: 0.967, score: 0.559 },
  { name: '3m', W1: 0.009, W2: -4.437, W3: 0.0, W4: -0.623, score: -0.771 },
  { name: '5m', W1: -4.064, W2: 0.963, W3: 0.2, W4: -1.019, score: -0.732 },
  { name: '15m', W1: -3.918, W2: -1.838, W3: -0.2, W4: -0.231, score: -0.792 },
  { name: '1h', W1: -1.054, W2: 2.125, W3: 0.2, W4: -0.909, score: 0.346 },
];

const emaBodies = [
  { period: 9,   mass: +EMA_MASS(9).toFixed(0),   label: 'EMA9\n(Луна)',    color: '#94a3b8' },
  { period: 20,  mass: +EMA_MASS(20).toFixed(0),  label: 'EMA20\n(Планета)',color: '#60a5fa' },
  { period: 50,  mass: +EMA_MASS(50).toFixed(0),  label: 'EMA50\n(Звезда)', color: '#fbbf24' },
  { period: 89,  mass: +EMA_MASS(89).toFixed(0),  label: 'EMA89\n(Гигант)', color: '#f97316' },
  { period: 200, mass: +EMA_MASS(200).toFixed(0), label: 'EMA200\n(Галактика)', color: '#a78bfa' },
  { period: 500, mass: +EMA_MASS(500).toFixed(0), label: 'EMA500\n(ЧД)',     color: '#1a1a2e' },
];

// ─── Компонент ───────────────────────────────────────────────────────────────
export function SIFSMarketAnalysis() {
  const [activeTab, setActiveTab] = useState('warping');

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SIFS System — Аналитические визуализации</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Применение математического ядра SIFS к анализу рыночных структур.{' '}
            <a href="https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/applications/README.md"
               className="underline opacity-70 hover:opacity-100" target="_blank" rel="noopener noreferrer">
              docs/applications/
            </a>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">k = 1/π² ≈ 0.101</Badge>
          <Badge variant="outline">W(n) = e^(−2kn)</Badge>
          <Badge variant="outline">Цикл [3→5→9]</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="warping">W(n) Варпинг</TabsTrigger>
          <TabsTrigger value="timeframes">TF → S</TabsTrigger>
          <TabsTrigger value="score">Score BTC</TabsTrigger>
          <TabsTrigger value="gravity">EMA Гравитация</TabsTrigger>
        </TabsList>

        {/* ── Варпинг-функция ──────────────────────────────────────────── */}
        <TabsContent value="warping">
          <Card>
            <CardHeader>
              <CardTitle>Варпинг-функция W(n)</CardTitle>
              <CardDescription>
                W(n) = exp(−2k|n|) — экспоненциальное затухание «видимости» уровней.
                Синяя линия: k = 1/(π×Ψ₁) ≈ 0.111 (SIFS System).
                Зелёная: k = 1/π² ≈ 0.101 (SIFS Theory Spacetime).
                Точки Фибоначчи: n = 1..9 соответствуют F₁..F₉ = [2,3,5,8,13,21,34,55,89].
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={warpingData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="n" label={{ value: 'Уровень n', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[0, 1]} label={{ value: 'W(n)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    formatter={(v: number, name: string) => [v.toFixed(4), name]}
                    labelFormatter={(n) => `n=${n} (${warpingData[n]?.label || ''})`}
                  />
                  <Legend verticalAlign="top" />
                  <ReferenceLine y={0.5} stroke="#666" strokeDasharray="4 4" label={{ value: 'W=0.5', fill: '#888' }} />
                  <Line type="monotone" dataKey="W_system" stroke="#60a5fa" strokeWidth={2.5}
                    dot={{ r: 4, fill: '#60a5fa' }} name="W_System (k≈0.111)" />
                  <Line type="monotone" dataKey="W_theory" stroke="#34d399" strokeWidth={2.5}
                    dot={{ r: 4, fill: '#34d399' }} name="W_Theory (k≈0.101)" strokeDasharray="6 3" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="font-mono font-semibold">SIFS System</p>
                  <p className="text-muted-foreground">k = 1/(π×Ψ₁) ≈ 0.1111</p>
                  <p className="text-muted-foreground">W(1)=0.800, W(5)=0.329, W(9)=0.135</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="font-mono font-semibold">SIFS Theory (Spacetime)</p>
                  <p className="text-muted-foreground">k = 1/π² ≈ 0.1013</p>
                  <p className="text-muted-foreground">W(1)=0.817, W(5)=0.363, W(9)=0.161</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Отображение TF → S ───────────────────────────────────────── */}
        <TabsContent value="timeframes">
          <Card>
            <CardHeader>
              <CardTitle>Отображение таймфреймов на S-координату</CardTitle>
              <CardDescription>
                S(T) = ln(T_minutes) / (2k) — строгая формула из v6.2.
                Каждый таймфрейм — это точка в 5-мерном масштабном пространстве.
                Расстояние между ТФ определяет силу варпинга W(a→b) = exp(−2k × |S(a)−S(b)|).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeframeData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="tf" />
                  <YAxis label={{ value: 'S(T)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    formatter={(v: number) => [v.toFixed(2), 'S(T)']}
                    labelFormatter={(tf) => `Таймфрейм: ${tf}`}
                  />
                  <Bar dataKey="s" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="S-координата" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1 text-left">ТФ</th>
                      <th className="py-1 text-right">S(T)</th>
                      <th className="py-1 text-right">W(1m→ТФ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeframeData.map(({ tf, s }) => (
                      <tr key={tf} className="border-b border-muted">
                        <td className="py-1 font-mono">{tf}</td>
                        <td className="py-1 text-right font-mono">{s.toFixed(2)}</td>
                        <td className="py-1 text-right font-mono">
                          {W_n(Math.abs(s - timeframeData[0].s)).toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Score компоненты (BTC 17.02.2026) ───────────────────────── */}
        <TabsContent value="score">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Score компоненты по ТФ</CardTitle>
                <CardDescription>BTC/USDT, 17.02.2026, $68,352</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={scoreComponents} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[-5, 3]} />
                    <Tooltip formatter={(v: number) => [v.toFixed(3)]} />
                    <Legend />
                    <ReferenceLine y={0} stroke="#888" strokeWidth={1} />
                    <ReferenceLine y={2.38} stroke="#fbbf24" strokeDasharray="4 4"
                      label={{ value: 'GM=2.38', fill: '#fbbf24', fontSize: 11 }} />
                    <Bar dataKey="W1" name="W1 объём" fill="#60a5fa" stackId="a" />
                    <Bar dataKey="W2" name="W2 ускор" fill="#a78bfa" stackId="a" />
                    <Bar dataKey="W3" name="W3 OBV" fill="#34d399" stackId="a" />
                    <Bar dataKey="W4" name="W4 VWAP" fill="#f97316" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Итоговый Score с варпингом</CardTitle>
                <CardDescription>Multi-Scale консенсус = +0.075 → Нейтраль</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={scoreComponents} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" domain={[-1, 1]} />
                    <YAxis type="category" dataKey="name" width={30} />
                    <Tooltip formatter={(v: number) => [v.toFixed(3), 'Score']} />
                    <ReferenceLine x={0} stroke="#888" strokeWidth={1} />
                    <Bar dataKey="score" name="Score" radius={[0, 4, 4, 0]}
                      fill="#8b5cf6"
                      label={{ position: 'right', fontSize: 11, formatter: (v: number) => v.toFixed(3) }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-sm">
                  <p className="font-semibold text-amber-600 dark:text-amber-400">Интерпретация</p>
                  <p className="text-muted-foreground mt-1">
                    Все ТФ в Contraction (FER &lt; 0.3). Score конфликтует: 1m/1h ↑ vs 3m/5m/15m ↓.
                    Multi-Scale = +0.075 — «сэндвич», рынок накапливает давление. Диапазон: $67,300–$68,700.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>BTC: история коллапсов 2010–2024</CardTitle>
              <CardDescription>
                Ключевые структурные переходы (смены S=0) на месячном таймфрейме.
                Коллапс ≥ 9 тиков от S=0 → система обнуляет нулевую точку.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="era" type="category" name="Дата"
                    label={{ value: 'Эра', position: 'insideBottom', offset: -5 }} />
                  <YAxis dataKey="price" type="number" scale="log"
                    domain={['auto', 'auto']}
                    label={{ value: 'Цена $ (log)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg bg-popover border p-3 text-sm shadow-lg">
                          <p className="font-semibold">{d.era}</p>
                          <p>Цена: ${d.price.toLocaleString()}</p>
                          <p>Тики: {d.ticks > 0 ? '+' : ''}{d.ticks}</p>
                          <p className="text-muted-foreground">{d.event}</p>
                        </div>
                      );
                    }}
                  />
                  <Scatter
                    data={btcData.filter(d => d.type === 'down')}
                    fill="#ef4444" name="Коллапс↓" shape="triangle"
                  />
                  <Scatter
                    data={btcData.filter(d => d.type === 'ath' || d.type === 'up')}
                    fill="#22c55e" name="Коллапс↑ / ATH" shape="circle"
                  />
                  <Scatter
                    data={btcData.filter(d => d.type === 'truth')}
                    fill="#fbbf24" name="Истина" shape="diamond"
                  />
                  <Legend />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── EMA гравитация ──────────────────────────────────────────── */}
        <TabsContent value="gravity">
          <Card>
            <CardHeader>
              <CardTitle>EMA как небесные тела (v6.6)</CardTitle>
              <CardDescription>
                mass(p) = p^φ — геометрически выведено, не подбор.
                F(p) = −G × mass(p) / dist² — EMA притягивает цену к себе как планеты.
                EMA500 притягивает в 665× сильнее EMA9 на том же расстоянии.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emaBodies} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="label" />
                  <YAxis scale="log" domain={[1, 100000]}
                    label={{ value: 'mass(p) = p^φ (log)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)}
                  />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Масса']} />
                  <Bar dataKey="mass" name="Масса EMA-тела" radius={[4, 4, 0, 0]}>
                    {emaBodies.map((entry, idx) => (
                      <rect key={idx} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {emaBodies.map(({ period, mass, label, color }) => (
                  <div key={period}
                    className="rounded-lg border p-3 text-sm"
                    style={{ borderColor: color + '80', backgroundColor: color + '15' }}>
                    <p className="font-mono font-bold">{label.replace('\n', ' ')}</p>
                    <p className="text-muted-foreground font-mono">mass = {(+mass).toLocaleString()}</p>
                    <p className="text-muted-foreground font-mono text-xs">p^φ = {period}^{PHI.toFixed(3)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                <p className="font-semibold">Физическая аналогия с теорией SIFS</p>
                <p className="text-muted-foreground">
                  В физической теории: F = −∇n(r,S) — все фундаментальные силы как градиенты
                  показателя преломления вакуума (оптическая метрика Гордона).
                </p>
                <p className="text-muted-foreground">
                  В SIFS System: F(EMA) = −G × mass(p) / dist² — цена движется по «геодезическим»
                  в поле EMA-тел, аналогично движению тел в 5D bulk.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
