import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Play, Pause, RefreshCw, Clock, History, Zap, Settings, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Constants for time conversion
const ATTO_PER_FEMTO = 1000n;
const ATTO_PER_PICO = 1000n * ATTO_PER_FEMTO;
const ATTO_PER_NANO = 1000n * ATTO_PER_PICO;
const ATTO_PER_MICRO = 1000n * ATTO_PER_NANO;
const ATTO_PER_MILLI = 1000n * ATTO_PER_MICRO;
const ATTO_PER_SEC = 1000n * ATTO_PER_MILLI;

type TimeUnit = 
  | 'attoseconds' | 'femtoseconds' | 'picoseconds' | 'nanoseconds' | 'microseconds' | 'milliseconds' 
  | 'seconds' | 'minutes' | 'minutes_2' | 'minutes_4' | 'minutes_10' | 'minutes_15' | 'minutes_30'
  | 'hours' | 'hours_2' | 'hours_4' | 'hours_12' | 'days' | 'weeks' | 'months' | 'years';

interface ClockState {
  globalTime: bigint; // attoseconds from epoch
  atomicTime: bigint; // attoseconds from epoch
  driftHistory: { time: number; drift: number }[]; // drift in ns for visualization
}

export const AtomicClockSync: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState<TimeUnit>('seconds');
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  
  // Simulation parameters
  const [amplitude, setAmplitude] = useState([0.5]); 
  const [frequency, setFrequency] = useState([0.2]); 
  
  const [state, setState] = useState<ClockState>({
    globalTime: 0n,
    atomicTime: 0n,
    driftHistory: [],
  });

  const lastUpdateRef = useRef<number>(0);
  const requestRef = useRef<number>();
  
  // Initialize with system time
  useEffect(() => {
    syncWithSystem();
  }, []);

  const syncWithSystem = () => {
    const now = BigInt(Date.now()) * ATTO_PER_MILLI;
    setState({
      globalTime: now,
      atomicTime: now,
      driftHistory: [],
    });
    lastUpdateRef.current = performance.now();
  };

  const getScaleMultiplier = (unit: TimeUnit): bigint => {
    const sec = ATTO_PER_SEC;
    switch(unit) {
      case 'attoseconds': return 1n; 
      case 'femtoseconds': return 1000n;
      case 'picoseconds': return 1000000n;
      case 'nanoseconds': return 1000000000n;
      case 'microseconds': return 1000000000000n;
      case 'milliseconds': return 1000000000000000n;
      case 'seconds': return sec; // Real time (1s per 1s)
      case 'minutes': return 60n * sec;
      case 'minutes_2': return 120n * sec;
      case 'minutes_4': return 240n * sec;
      case 'minutes_10': return 600n * sec;
      case 'minutes_15': return 900n * sec;
      case 'minutes_30': return 1800n * sec;
      case 'hours': return 3600n * sec;
      case 'hours_2': return 7200n * sec;
      case 'hours_4': return 14400n * sec;
      case 'hours_12': return 43200n * sec;
      case 'days': return 86400n * sec;
      case 'weeks': return 604800n * sec;
      case 'months': return 2592000n * sec; // 30 days
      case 'years': return 31536000n * sec; // 365 days
      default: return sec;
    }
  };

  const formatHighPrecisionTime = (time: bigint) => {
    const ms = Number(time / ATTO_PER_MILLI);
    // Use a safe date conversion, handling potential overflow for very large simulated dates if needed
    const date = new Date(ms);
    
    const remainingAtto = time % ATTO_PER_MILLI;
    const micro = remainingAtto / ATTO_PER_MICRO;
    const nano = (remainingAtto % ATTO_PER_MICRO) / ATTO_PER_NANO;
    const pico = (remainingAtto % ATTO_PER_NANO) / ATTO_PER_PICO;
    const femto = (remainingAtto % ATTO_PER_PICO) / ATTO_PER_FEMTO;
    const atto = remainingAtto % ATTO_PER_FEMTO;

    const datePart = date.toLocaleDateString('ru-RU');
    const timePart = date.toLocaleTimeString('ru-RU', { hour12: false });
    const msPart = date.getMilliseconds().toString().padStart(3, '0');
    
    return {
      date: datePart,
      time: timePart,
      ms: msPart,
      micro: `${micro.toString().padStart(3, '0')} µs`,
      nano: `${nano.toString().padStart(3, '0')} ns`,
      pico: `${pico.toString().padStart(3, '0')} ps`,
      femto: `${femto.toString().padStart(3, '0')} fs`,
      atto: `${atto.toString().padStart(3, '0')} as`
    };
  };

  const animate = useCallback((time: number) => {
    if (!lastUpdateRef.current) lastUpdateRef.current = time;
    const deltaTimeMs = time - lastUpdateRef.current;
    lastUpdateRef.current = time;

    const scaleMult = getScaleMultiplier(timeScale);
    // scaleMult is attoseconds per REAL SECOND
    
    // deltaTimeMs is real milliseconds passed since last frame
    const effectiveSpeed = scaleMult * BigInt(Math.floor(speedMultiplier * 100)); // Maintain precision
    const deltaSimAtto = (BigInt(Math.round(deltaTimeMs * 10)) * effectiveSpeed) / 1000000n; // Adjusted for multiplier math

    setState(prev => {
      // SIFS Effect
      const t = Number(prev.globalTime / ATTO_PER_SEC); 
      // Metric fluctuation: n(t)
      const metricFactor = 1.0 + (amplitude[0] * 0.000001) * Math.cos(2 * Math.PI * frequency[0] * t);
      
      const epsilon = metricFactor - 1.0;
      const driftAtto = BigInt(Math.round(Number(deltaSimAtto) * epsilon));
      
      const newGlobal = prev.globalTime + deltaSimAtto;
      const newAtomic = prev.atomicTime + deltaSimAtto + driftAtto;
      
      // Calculate drift in nanoseconds for chart
      const currentDriftNs = Number(newAtomic - newGlobal) / 1000000000;
      
      const newHistory = [...prev.driftHistory, {
        time: t % 100, // Rolling window visual
        drift: currentDriftNs
      }].slice(-50);

      return {
        globalTime: newGlobal,
        atomicTime: newAtomic,
        driftHistory: newHistory
      };
    });

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, timeScale, amplitude, frequency]);

  useEffect(() => {
    if (isPlaying) {
      lastUpdateRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, animate]);

  const tGlobal = formatHighPrecisionTime(state.globalTime);
  const tAtomic = formatHighPrecisionTime(state.atomicTime);

  // Determine if high precision elements should be visible
  // Hide if timeScale is 'minutes' or larger
  const isHighPrecisionVisible = !['minutes', 'minutes_2', 'minutes_4', 'minutes_10', 'minutes_15', 'minutes_30', 
                                  'hours', 'hours_2', 'hours_4', 'hours_12', 'days', 'weeks', 'months', 'years']
                                  .includes(timeScale);

  return (
    <Card className="w-full bg-slate-950 border-slate-800 text-slate-100 shadow-2xl">
      <CardHeader className="border-b border-slate-800/50 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-xl text-blue-100">
                    <Clock className="w-6 h-6 text-blue-500" />
                    SIFS Chronometer
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Синхронизация с локальным временем • Точность до аттосекунд (10⁻¹⁸ с)
                </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <Select value={timeScale} onValueChange={(v: TimeUnit) => setTimeScale(v)}>
                    <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700">
                        <SelectValue placeholder="Scale" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100 max-h-[300px]">
                        <SelectItem value="attoseconds">1 as / sec (x10⁻¹⁸)</SelectItem>
                        <SelectItem value="femtoseconds">1 fs / sec (x10⁻¹⁵)</SelectItem>
                        <SelectItem value="picoseconds">1 ps / sec (x10⁻¹²)</SelectItem>
                        <SelectItem value="nanoseconds">1 ns / sec (x10⁻⁹)</SelectItem>
                        <SelectItem value="microseconds">1 µs / sec (x10⁻⁶)</SelectItem>
                        <SelectItem value="milliseconds">1 ms / sec (x10⁻³)</SelectItem>
                        <SelectItem value="seconds">Real-time (1x)</SelectItem>
                        <SelectItem value="minutes">1 min / sec</SelectItem>
                        <SelectItem value="minutes_2">2 min / sec</SelectItem>
                        <SelectItem value="minutes_4">4 min / sec</SelectItem>
                        <SelectItem value="minutes_10">10 min / sec</SelectItem>
                        <SelectItem value="minutes_15">15 min / sec</SelectItem>
                        <SelectItem value="minutes_30">30 min / sec</SelectItem>
                        <SelectItem value="hours">1 hour / sec</SelectItem>
                        <SelectItem value="hours_2">2 hours / sec</SelectItem>
                        <SelectItem value="hours_4">4 hours / sec</SelectItem>
                        <SelectItem value="hours_12">12 hours / sec</SelectItem>
                        <SelectItem value="days">1 day / sec</SelectItem>
                        <SelectItem value="weeks">1 week / sec</SelectItem>
                        <SelectItem value="months">1 month / sec</SelectItem>
                        <SelectItem value="years">1 year / sec</SelectItem>
                    </SelectContent>
                </Select>
                
                <Button 
                    variant={isPlaying ? "destructive" : "default"}
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 shrink-0"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <Button variant="outline" size="icon" onClick={syncWithSystem} className="w-10 h-10 border-slate-700 hover:bg-slate-800 shrink-0">
                    <History className="w-5 h-5" />
                </Button>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-8">
        
        {/* Time Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Global Time (Reference) */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-slate-500" />
                    Reference Standard
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-2 opacity-50">
                        <Badge variant="secondary" className="bg-slate-800 text-slate-400">UTC Local</Badge>
                     </div>
                     <div className="flex flex-col gap-1 mb-2">
                        <div className="text-sm text-slate-500 font-mono">{tGlobal.date}</div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-slate-200 tracking-tight">
                            {tGlobal.time}.<span className="text-slate-400">{tGlobal.ms}</span>
                        </div>
                     </div>
                     {isHighPrecisionVisible && (
                         <div className="grid grid-cols-5 gap-1 text-[10px] md:text-xs font-mono text-slate-500 border-t border-slate-800/50 pt-2 transition-opacity duration-500">
                            <div className="text-center p-1 rounded bg-slate-800/20 text-slate-400">{tGlobal.micro}</div>
                            <div className="text-center p-1 rounded bg-slate-800/20 text-slate-500">{tGlobal.nano}</div>
                            <div className="text-center p-1 rounded bg-slate-800/20 text-slate-600">{tGlobal.pico}</div>
                            <div className="text-center p-1 rounded bg-slate-800/20 text-slate-700">{tGlobal.femto}</div>
                            <div className="text-center p-1 rounded bg-slate-800/20 text-slate-800">{tGlobal.atto}</div>
                         </div>
                     )}
                </div>
            </div>

            {/* Atomic Time (Variable) */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium uppercase tracking-wider">
                    <Activity className="w-4 h-4" />
                    Atomic Metric Time
                </div>
                <div className="bg-slate-900/80 rounded-xl p-6 border border-blue-900/30 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)]">
                     <div className="absolute top-0 right-0 p-2">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">SIFS Corrected</Badge>
                     </div>
                     <div className="flex flex-col gap-1 mb-2">
                        <div className="text-sm text-blue-500/50 font-mono">{tAtomic.date}</div>
                        <div className="font-mono text-3xl md:text-4xl font-bold text-blue-400 tracking-tight drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                            {tAtomic.time}.<span className="text-blue-600">{tAtomic.ms}</span>
                        </div>
                     </div>
                      {isHighPrecisionVisible && (
                        <div className="grid grid-cols-5 gap-1 text-[10px] md:text-xs font-mono text-blue-500/70 border-t border-blue-500/10 pt-2 transition-opacity duration-500">
                            <div className="text-center p-1 rounded bg-blue-500/5 text-blue-300">{tAtomic.micro}</div>
                            <div className="text-center p-1 rounded bg-blue-500/5 text-blue-400">{tAtomic.nano}</div>
                            <div className="text-center p-1 rounded bg-blue-500/5 text-blue-500">{tAtomic.pico}</div>
                            <div className="text-center p-1 rounded bg-blue-500/5 text-blue-600">{tAtomic.femto}</div>
                            <div className="text-center p-1 rounded bg-blue-500/5 text-blue-700">{tAtomic.atto}</div>
                        </div>
                     )}
                </div>
            </div>
        </div>

        {/* Controls & Graph */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="md:col-span-1 space-y-6">
                <div className="space-y-3 p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Time Dilation Speed
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-200">{speedMultiplier.toFixed(1)}x</span>
                        </div>
                    </div>
                    <Slider 
                        value={[speedMultiplier]} 
                        onValueChange={(v) => setSpeedMultiplier(v[0])} 
                        max={20} 
                        min={-50}
                        step={0.1}
                        className="[&_.range]:bg-slate-500"
                    />

                    <div className="flex items-center justify-between mt-4">
                         <span className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
                            <Settings className="w-3 h-3" /> Metric Stability
                        </span>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={amplitude[0]}
                                onChange={(e) => setAmplitude([Math.min(10, Math.max(0, parseFloat(e.target.value) || 0))])}
                                className="w-16 h-6 text-right font-mono text-xs bg-slate-800 border-slate-700 text-slate-200"
                                step={0.01}
                                min={0}
                                max={10}
                            />
                            <span className="text-xs font-mono text-slate-500 w-4">σ</span>
                        </div>
                    </div>
                    <Slider 
                        value={amplitude} 
                        onValueChange={setAmplitude} 
                        max={10} 
                        step={0.01}
                        className="[&_.range]:bg-blue-500"
                    />
                     <div className="flex items-center justify-between mt-2">
                         <span className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Oscillation Freq
                        </span>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={frequency[0]}
                                onChange={(e) => setFrequency([Math.min(5, Math.max(0, parseFloat(e.target.value) || 0))])}
                                className="w-16 h-6 text-right font-mono text-xs bg-slate-800 border-slate-700 text-slate-200"
                                step={0.01}
                                min={0}
                                max={5}
                            />
                            <span className="text-xs font-mono text-slate-500 w-4">Hz</span>
                        </div>
                    </div>
                    <Slider 
                        value={frequency} 
                        onValueChange={setFrequency} 
                        max={5} 
                        step={0.01}
                         className="[&_.range]:bg-purple-500"
                    />
                </div>
                
                 <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-500 font-mono mb-2">TIME DILATION DELTA</div>
                    <div className="text-2xl font-bold text-slate-200">
                        {((Number(state.atomicTime - state.globalTime)) / 1000000).toFixed(6)} <span className="text-sm text-slate-500">ns</span>
                    </div>
                 </div>
            </div>

            <div className="md:col-span-2 h-[200px] bg-slate-900 rounded-lg border border-slate-800 p-2">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={state.driftHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis hide dataKey="time" />
                    <YAxis 
                        stroke="#475569" 
                        fontSize={10} 
                        tickFormatter={(val) => val.toFixed(2)}
                        domain={['auto', 'auto']}
                        width={30}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                        itemStyle={{ fontSize: '12px' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number) => [`${value.toFixed(6)} ns`, 'Drift']}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="drift" 
                        stroke="#60a5fa" 
                        strokeWidth={2} 
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>

      </CardContent>
    </Card>
  );
};