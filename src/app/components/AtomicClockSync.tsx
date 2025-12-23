import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
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

type TimeUnit = 'attoseconds' | 'femtoseconds' | 'picoseconds' | 'nanoseconds' | 'microseconds' | 'milliseconds' | 'seconds' | 'minutes';

interface ClockState {
  globalTime: bigint; // attoseconds from epoch
  atomicTime: bigint; // attoseconds from epoch
  driftHistory: { time: number; drift: number }[]; // drift in ns for visualization
}

export const AtomicClockSync: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState<TimeUnit>('seconds');
  
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
    switch(unit) {
      case 'attoseconds': return 1n; // Very slow (1 atto per real sec?) No, let's make it observable
      case 'femtoseconds': return 1000n;
      case 'picoseconds': return 1000000n;
      case 'nanoseconds': return 1000000000n;
      case 'microseconds': return 1000000000000n;
      case 'milliseconds': return 1000000000000000n;
      case 'seconds': return 1000000000000000000n; // Real time (1s per 1s)
      case 'minutes': return 60n * 1000000000000000000n;
      default: return 1000000000000000000n;
    }
  };

  const formatHighPrecisionTime = (time: bigint) => {
    // Convert to local time components
    // Note: This is a simplification. For true timezone support we'd need more complex logic.
    // We'll use the date object for the macro part and manual formatting for micro part.
    
    const ms = Number(time / ATTO_PER_MILLI);
    const date = new Date(ms);
    
    const remainingAtto = time % ATTO_PER_MILLI;
    const micro = remainingAtto / ATTO_PER_MICRO;
    const nano = (remainingAtto % ATTO_PER_MICRO) / ATTO_PER_NANO;
    const pico = (remainingAtto % ATTO_PER_NANO) / ATTO_PER_PICO;
    const femto = (remainingAtto % ATTO_PER_PICO) / ATTO_PER_FEMTO;
    const atto = remainingAtto % ATTO_PER_FEMTO;

    const timeString = date.toLocaleTimeString('ru-RU', { hour12: false });
    const msPart = date.getMilliseconds().toString().padStart(3, '0');
    
    return {
      macro: `${timeString}.${msPart}`,
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

    // Calculate time step based on selected scale
    // If scale is 'seconds', we add exactly deltaTimeMs converted to attoseconds
    // If scale is 'nanoseconds', we pretend 1 real second = 1 nanosecond (slow motion)
    // Wait, the user asked for "control of animation speed" 
    
    // Let's interpret "scale" as: how much simulation time passes per real second.
    // Real-time = 1 sec / sec
    // Nanosecond scale = 1 ns / sec (Extreme Slow Motion)
    // Minute scale = 1 min / sec (Fast Forward)
    
    // Calculate simulation delta in attoseconds
    const scaleMult = getScaleMultiplier(timeScale);
    // scaleMult is attoseconds per REAL SECOND
    
    // deltaTimeMs is real milliseconds passed since last frame
    // deltaSimulation = (deltaTimeMs / 1000) * scaleMult
    
    const deltaSimAtto = (BigInt(Math.round(deltaTimeMs * 1000)) * scaleMult) / 1000000n; // optimize calculation

    setState(prev => {
      // SIFS Effect
      const t = Number(prev.globalTime / ATTO_PER_SEC); 
      // Metric fluctuation: n(t)
      const metricFactor = 1.0 + (amplitude[0] * 0.000001) * Math.cos(2 * Math.PI * frequency[0] * t);
      
      // Apply metric to atomic time flow
      // atomic_delta = global_delta * metricFactor
      // We need to handle BigInt multiplication with float factor carefully
      // metricFactor = 1 + epsilon. 
      // deltaAtomic = deltaSimAtto + deltaSimAtto * epsilon
      
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

  return (
    <Card className="w-full bg-slate-950 border-slate-800 text-slate-100 shadow-2xl">
      <CardHeader className="border-b border-slate-800/50 pb-4">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-xl text-blue-100">
                    <Clock className="w-6 h-6 text-blue-500" />
                    SIFS Chronometer
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Синхронизация с локальным временем • Точность до аттосекунд (10⁻¹⁸ с)
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Select value={timeScale} onValueChange={(v: TimeUnit) => setTimeScale(v)}>
                    <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700">
                        <SelectValue placeholder="Scale" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectItem value="attoseconds">1 as / sec (x10⁻¹⁸)</SelectItem>
                        <SelectItem value="femtoseconds">1 fs / sec (x10⁻¹⁵)</SelectItem>
                        <SelectItem value="picoseconds">1 ps / sec (x10⁻¹²)</SelectItem>
                        <SelectItem value="nanoseconds">1 ns / sec (x10⁻⁹)</SelectItem>
                        <SelectItem value="microseconds">1 µs / sec (x10⁻⁶)</SelectItem>
                        <SelectItem value="milliseconds">1 ms / sec (x10⁻³)</SelectItem>
                        <SelectItem value="seconds">Real-time (1x)</SelectItem>
                        <SelectItem value="minutes">1 min / sec (x60)</SelectItem>
                    </SelectContent>
                </Select>
                
                <Button 
                    variant={isPlaying ? "destructive" : "default"}
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <Button variant="outline" size="icon" onClick={syncWithSystem} className="w-10 h-10 border-slate-700 hover:bg-slate-800">
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
                     <div className="font-mono text-4xl font-bold text-slate-200 tracking-tight mb-2">
                        {tGlobal.macro}
                     </div>
                     <div className="grid grid-cols-5 gap-1 text-xs font-mono text-slate-500 border-t border-slate-800/50 pt-2">
                        <div className="text-center p-1 rounded bg-slate-800/20 text-slate-400">{tGlobal.micro}</div>
                        <div className="text-center p-1 rounded bg-slate-800/20 text-slate-500">{tGlobal.nano}</div>
                        <div className="text-center p-1 rounded bg-slate-800/20 text-slate-600">{tGlobal.pico}</div>
                        <div className="text-center p-1 rounded bg-slate-800/20 text-slate-700">{tGlobal.femto}</div>
                        <div className="text-center p-1 rounded bg-slate-800/20 text-slate-800">{tGlobal.atto}</div>
                     </div>
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
                     <div className="font-mono text-4xl font-bold text-blue-400 tracking-tight mb-2 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                        {tAtomic.macro}
                     </div>
                      <div className="grid grid-cols-5 gap-1 text-xs font-mono text-blue-500/70 border-t border-blue-500/10 pt-2">
                        <div className="text-center p-1 rounded bg-blue-500/5 text-blue-300">{tAtomic.micro}</div>
                        <div className="text-center p-1 rounded bg-blue-500/5 text-blue-400">{tAtomic.nano}</div>
                        <div className="text-center p-1 rounded bg-blue-500/5 text-blue-500">{tAtomic.pico}</div>
                        <div className="text-center p-1 rounded bg-blue-500/5 text-blue-600">{tAtomic.femto}</div>
                        <div className="text-center p-1 rounded bg-blue-500/5 text-blue-700">{tAtomic.atto}</div>
                     </div>
                </div>
            </div>
        </div>

        {/* Controls & Graph */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="md:col-span-1 space-y-6">
                <div className="space-y-3 p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
                            <Settings className="w-3 h-3" /> Metric Stability
                        </span>
                        <span className="text-xs font-mono text-slate-500">{amplitude[0].toFixed(2)} σ</span>
                    </div>
                    <Slider 
                        value={amplitude} 
                        onValueChange={setAmplitude} 
                        max={10} 
                        step={0.1}
                        className="[&_.range]:bg-blue-500"
                    />
                     <div className="flex items-center justify-between mt-2">
                         <span className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Oscillation Freq
                        </span>
                        <span className="text-xs font-mono text-slate-500">{frequency[0].toFixed(2)} Hz</span>
                    </div>
                    <Slider 
                        value={frequency} 
                        onValueChange={setFrequency} 
                        max={5} 
                        step={0.1}
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
