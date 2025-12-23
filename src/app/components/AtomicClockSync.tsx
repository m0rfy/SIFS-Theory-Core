import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Play, Pause, RefreshCw, Activity, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ClockState {
  globalTime: number; // ms
  atomicTime: number; // ms
  driftHistory: { time: number; drift: number; metric: number }[];
}

export const AtomicClockSync: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simulation parameters
  const [amplitude, setAmplitude] = useState([0.5]); // Influence of S-factor fluctuation (0-1)
  const [frequency, setFrequency] = useState([0.2]); // Frequency of S-factor oscillation (Hz)
  const [baseRate, setBaseRate] = useState([1.0]); // Base tick rate relative to global time
  
  const [state, setState] = useState<ClockState>({
    globalTime: 0,
    atomicTime: 0,
    driftHistory: [],
  });

  const lastUpdateRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const resetSimulation = () => {
    setState({
      globalTime: 0,
      atomicTime: 0,
      driftHistory: [],
    });
    startTimeRef.current = performance.now();
    lastUpdateRef.current = performance.now();
  };

  const syncClocks = () => {
    setState(prev => ({
      ...prev,
      atomicTime: prev.globalTime
    }));
  };

  const animate = useCallback((time: number) => {
    if (!lastUpdateRef.current) lastUpdateRef.current = time;
    const deltaTime = (time - lastUpdateRef.current) / 1000; // seconds
    lastUpdateRef.current = time;

    setState(prev => {
      // SIFS Theory: Dynamic Scaling S(t) affects local time metric
      // n(t) ~ 1 + A * cos(omega * t)
      // d(tau) = n(t) * dt
      
      const t = prev.globalTime / 1000; // global time in seconds
      
      // Calculate instantaneous metric factor (refractive index of vacuum)
      // Base rate + amplitude * oscillation
      const metricFactor = baseRate[0] + (amplitude[0] * 0.1) * Math.cos(2 * Math.PI * frequency[0] * t);
      
      const deltaGlobal = deltaTime * 1000; // ms
      const deltaAtomic = deltaGlobal * metricFactor;
      
      const newGlobalTime = prev.globalTime + deltaGlobal;
      const newAtomicTime = prev.atomicTime + deltaAtomic;
      const drift = newAtomicTime - newGlobalTime;

      // Keep history limited to last 100 points for performance
      const newHistory = [...prev.driftHistory, {
        time: parseFloat(t.toFixed(1)),
        drift: drift,
        metric: metricFactor
      }].slice(-100);

      return {
        globalTime: newGlobalTime,
        atomicTime: newAtomicTime,
        driftHistory: newHistory
      };
    });

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, amplitude, frequency, baseRate]);

  useEffect(() => {
    if (isPlaying) {
      lastUpdateRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, animate]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor(ms % 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <Card className="w-full bg-slate-900 border-slate-700 text-slate-100">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Синхронизация Атомных Часов
                </CardTitle>
                <CardDescription className="text-slate-400">
                Моделирование дрейфа времени из-за колебаний масштабного фактора S
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button 
                    variant={isPlaying ? "destructive" : "default"}
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={resetSimulation}>
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Clocks Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center">
                <span className="text-sm text-slate-500 mb-1">Координатное Время (Global)</span>
                <span className="text-3xl font-mono text-blue-400 font-bold">
                    {formatTime(state.globalTime)}
                </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center relative overflow-hidden">
                <div className={`absolute inset-0 opacity-10 pointer-events-none ${Math.abs(state.atomicTime - state.globalTime) > 100 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-sm text-slate-500 mb-1">Атомное Время (Local, S-dependent)</span>
                <span className={`text-3xl font-mono font-bold transition-colors ${Math.abs(state.atomicTime - state.globalTime) > 1000 ? 'text-red-400' : 'text-green-400'}`}>
                    {formatTime(state.atomicTime)}
                </span>
                <div className="mt-2 text-xs text-slate-500 font-mono">
                    Δ = {(state.atomicTime - state.globalTime).toFixed(2)} ms
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Амплитуда флуктуаций S (Гравитация)</span>
                        <Badge variant="outline">{amplitude[0].toFixed(2)}</Badge>
                    </div>
                    <Slider 
                        value={amplitude} 
                        onValueChange={setAmplitude} 
                        max={5} 
                        step={0.1}
                        className="py-2" 
                    />
                    <p className="text-xs text-slate-500">Влияет на силу искажения метрики времени.</p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Частота осцилляций (Гц)</span>
                        <Badge variant="outline">{frequency[0].toFixed(2)} Hz</Badge>
                    </div>
                    <Slider 
                        value={frequency} 
                        onValueChange={setFrequency} 
                        max={2} 
                        step={0.1}
                        className="py-2" 
                    />
                     <p className="text-xs text-slate-500">Скорость изменения масштабного фактора.</p>
                </div>
            </div>

            <div className="space-y-4 flex flex-col justify-center">
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Базовая скорость тиков</span>
                        <Badge variant="outline">x{baseRate[0].toFixed(2)}</Badge>
                    </div>
                    <Slider 
                        value={baseRate} 
                        onValueChange={setBaseRate} 
                        min={0.5}
                        max={1.5} 
                        step={0.05}
                        className="py-2" 
                    />
                </div>
                <Button onClick={syncClocks} className="w-full mt-4" variant="secondary">
                    <Activity className="w-4 h-4 mr-2" />
                    Синхронизировать (Рекалибровка)
                </Button>
            </div>
        </div>

        {/* Chart */}
        <div className="h-[200px] w-full mt-4 bg-slate-950/50 rounded-lg p-2 border border-slate-800">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={state.driftHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                        dataKey="time" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickFormatter={(val) => `${val}s`}
                        interval="preserveStartEnd"
                    />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                    />
                    <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
                    <Line 
                        type="monotone" 
                        dataKey="drift" 
                        stroke="#60a5fa" 
                        strokeWidth={2} 
                        dot={false} 
                        name="Drift (ms)"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="metric" 
                        stroke="#34d399" 
                        strokeWidth={1} 
                        dot={false} 
                        name="Metric Factor"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

      </CardContent>
    </Card>
  );
};
