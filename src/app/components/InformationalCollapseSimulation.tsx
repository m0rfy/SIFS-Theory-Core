import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Play, RotateCcw, Activity, Settings2 } from "lucide-react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number; // original x
  oy: number; // original y
  fixed: boolean;
}

export const InformationalCollapseSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [metricStress, setMetricStress] = useState(0);
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  
  // Simulation Parameters
  const [massExponent, setMassExponent] = useState(24); // 10^24 kg
  const [scaleS, setScaleS] = useState(37); // S coordinate
  const [calculatedTension, setCalculatedTension] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1.0);

  // Update speed ref when state changes
  useEffect(() => {
    simulationSpeedRef.current = simulationSpeed;
  }, [simulationSpeed]);
  
  // Simulation state refs to avoid re-renders during animation loop
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();
  const simulationSpeedRef = useRef(1.0);
  
  // Constants based on SIFS theory
  const k_warp = 0.05; // Warping constant for visualization scaling

  // Calculate Theoretical Impact based on SIFS formula
  useEffect(() => {
    // Tension/Impact ~ Mass * e^(-k*S) (Simplified for visualization)
    // We normalize it to a percentage 0-100 for the UI
    // In real SIFS: Tension drop is proportional to Mass lost relative to local vacuum energy
    
    // Heuristic for simulation visualization:
    // Higher mass = more tension drop
    // Higher S (smaller scale) = typically more "local" impact, but here we visualize global metric shift
    const impact = (massExponent / 30) * (1 + scaleS / 100) * 100;
    setCalculatedTension(Math.min(100, Math.max(0, impact)));
  }, [massExponent, scaleS]);

  // Init grid
  const initGrid = () => {
    const points: Point[] = [];
    const rows = 15;
    const cols = 20;
    const spacing = 30;
    const offsetX = 50;
    const offsetY = 50;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        points.push({
          x: offsetX + j * spacing,
          y: offsetY + i * spacing,
          vx: 0,
          vy: 0,
          ox: offsetX + j * spacing,
          oy: offsetY + i * spacing,
          fixed: i === 0 || i === rows - 1 || j === 0 || j === cols - 1 // Fix borders
        });
      }
    }
    pointsRef.current = points;
    setMetricStress(100); // Initial tension
    setWaveAmplitude(0);
    setIsCollapsed(false);
  };

  useEffect(() => {
    initGrid();
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  const runSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerIdx = Math.floor(pointsRef.current.length / 2) + 10; // Approximate center
    const k = 0.05; // Spring constant
    const damp = 0.95; // Damping
    const massFactor = Math.pow(massExponent, 2) * 5; // Visual mass pull
    const massPlanet = isCollapsed ? 0 : massFactor; 

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const speed = simulationSpeedRef.current;
      const isReverse = speed < 0;

      // Physics Update
      pointsRef.current.forEach((p, idx) => {
        if (p.fixed) return;

        let fx = 0;
        let fy = 0;

        // Spring force to original position (Fabric memory)
        fx += (p.ox - p.x) * k;
        fy += (p.oy - p.y) * k;

        // Gravity/Tension from the Planet (Center)
        if (!isCollapsed) {
            const cp = pointsRef.current[centerIdx];
            const dx = cp.x - p.x;
            const dy = cp.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > 5 && dist < 200) {
                const force = massPlanet / (dist * dist);
                fx += (dx / dist) * force;
                fy += (dy / dist) * force;
            }
        } 

        // Apply speed
        // Logic for negative time: Invert damping or simply reverse flow
        // Standard damping: velocity *= 0.95
        // Reverse damping: velocity /= 0.95 (adds energy) -> unstable
        // Better: Just apply dt scaling. Negative speed moves particles backwards along trajectory (roughly)
        
        // If speed is negative, we add "Mirror Sector" physics
        // In mirror sector, forces might be repulsive or just visually inverted
        
        p.vx = (p.vx + fx * speed) * damp;
        p.vy = (p.vy + fy * speed) * damp;
        p.x += p.vx * speed;
        p.y += p.vy * speed;
      });

      // Compute visual stress (not used for logic, just physics update)
      
      // Draw Grid
      ctx.strokeStyle = isReverse ? 'rgba(255, 100, 100, 0.4)' : 'rgba(100, 200, 255, 0.3)';
      ctx.lineWidth = 1;
      
      const rows = 15;
      const cols = 20;
      
      // Mirror Projection Function
      const drawGrid = (mirror: boolean) => {
        ctx.beginPath();
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const idx = i * cols + j;
                const p = pointsRef.current[idx];
                
                let px = p.x;
                let py = p.y;

                if (mirror) {
                    // Mirror projection: Invert coordinates around center
                    // Center approx: 600/2, 400/2
                     const cx = 300; // rough center relative to grid logic
                     const cy = 200;
                     // Simple reflection
                     px = cx - (p.x - cx);
                     py = cy - (p.y - cy);
                }

                // Right neighbor
                if (j < cols - 1) {
                    const pRight = pointsRef.current[idx + 1];
                    let prx = pRight.x;
                    let pry = pRight.y;
                    if (mirror) {
                        const cx = 300; const cy = 200;
                        prx = cx - (pRight.x - cx);
                        pry = cy - (pRight.y - cy);
                    }
                    ctx.moveTo(px, py);
                    ctx.lineTo(prx, pry);
                }
                // Bottom neighbor
                if (i < rows - 1) {
                    const pBottom = pointsRef.current[idx + cols];
                    let pbx = pBottom.x;
                    let pby = pBottom.y;
                    if (mirror) {
                        const cx = 300; const cy = 200;
                        pbx = cx - (pBottom.x - cx);
                        pby = cy - (pBottom.y - cy);
                    }
                    ctx.moveTo(px, py);
                    ctx.lineTo(pbx, pby);
                }
            }
        }
        ctx.stroke();
      };

      // Draw Main Grid
      drawGrid(false);

      // Draw Mirror Grid if Reverse Time (Throat Transition)
      if (isReverse) {
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)'; // Cyan ghost
          ctx.save();
          // Add a slight scaling or distortion for the throat effect
          // ctx.translate(300, 200);
          // ctx.scale(0.9, 0.9);
          // ctx.translate(-300, -200);
          drawGrid(true);
          ctx.restore();
          
          // Visual Glitch/Throat Text
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
          ctx.font = "10px monospace";
          ctx.fillText("4D-THROAT TRAVERSAL", 10, 390);
      }

      // Draw Center Mass (if not collapsed)
      if (!isCollapsed) {
          const cp = pointsRef.current[centerIdx];
          ctx.beginPath();
          // Radius depends on mass exponent
          const radius = Math.max(5, massExponent / 1.5);
          ctx.arc(cp.ox, cp.oy, radius, 0, Math.PI * 2);
          ctx.fillStyle = isReverse ? '#00ffff' : '#ef4444'; // Red Planet or Cyan Anti-Planet
          ctx.fill();
          ctx.shadowBlur = 20;
          ctx.shadowColor = isReverse ? '#00ffff' : '#ef4444';
      } else {
           // Draw "Ghost" / Calibration Wave
          const cp = pointsRef.current[centerIdx];
          ctx.beginPath();
          ctx.arc(cp.ox, cp.oy, waveAmplitude, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - waveAmplitude/100)})`;
          ctx.stroke();
          
          if (waveAmplitude < 150) {
              setWaveAmplitude(prev => prev + 2 * Math.abs(speed)); // Animate wave forward regardless of time direction visually for effect? 
              // Or better:
              // setWaveAmplitude(prev => prev + 2 * speed);
              // But wave amplitude is a visual effect of explosion.
          }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
      runSimulation();
  }, [isCollapsed, massExponent]); // Re-run when mass changes to update visual pull

  const handleCollapse = () => {
      setIsCollapsed(true);
      setWaveAmplitude(0);
  };

  const handleReset = () => {
      initGrid();
      setTimeout(() => setIsCollapsed(false), 10);
  };

  return (
    <Card className="w-full max-w-5xl bg-slate-950 border-slate-800 text-slate-100 shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
            <div>
                <CardTitle className="text-xl font-mono text-blue-400 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    SIFS Metric Calibration
                </CardTitle>
                <CardDescription>
                    Real-time simulation of vacuum energy recalibration after topological node loss.
                </CardDescription>
            </div>
            <Badge variant={isCollapsed ? "destructive" : "outline"} className="font-mono text-sm px-3 py-1">
                {isCollapsed ? "STATUS: RECALIBRATING..." : "STATUS: STABLE METRIC"}
            </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Controls */}
        <div className="space-y-6 lg:col-span-1 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
                <Settings2 className="h-4 w-4" />
                <h4 className="font-semibold text-sm tracking-wider">SYSTEM PARAMETERS</h4>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                        <Label>Node Mass (log kg)</Label>
                        <span>10^{massExponent} kg</span>
                    </div>
                    <Slider 
                        value={[massExponent]} 
                        onValueChange={(v) => !isCollapsed && setMassExponent(v[0])}
                        min={18} 
                        max={30} 
                        step={1}
                        disabled={isCollapsed}
                        className="cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-500">
                        Planet (24) to Star (30) range
                    </p>
                </div>

                <div className="space-y-2">
                     <div className="flex justify-between text-xs font-mono text-slate-400">
                        <Label>Scale Coordinate (S)</Label>
                        <span>S = {scaleS}</span>
                    </div>
                    <Slider 
                        value={[scaleS]} 
                        onValueChange={(v) => !isCollapsed && setScaleS(v[0])}
                        min={1} 
                        max={100} 
                        step={1}
                        disabled={isCollapsed}
                        className="cursor-pointer"
                    />
                     <p className="text-[10px] text-slate-500">
                        Planetary Scale (~37) to Quantum (&lt;10)
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                        <Label>Time Flow (Simulation Speed)</Label>
                        <span className={simulationSpeed < 0 ? "text-cyan-400" : "text-white"}>
                            {simulationSpeed.toFixed(1)}x {simulationSpeed < 0 && "(REVERSE)"}
                        </span>
                    </div>
                    <Slider 
                        value={[simulationSpeed]} 
                        onValueChange={(v) => setSimulationSpeed(v[0])}
                        min={-3.0} 
                        max={3.0} 
                        step={0.1}
                        className="cursor-pointer"
                    />
                     <p className="text-[10px] text-slate-500">
                        {simulationSpeed < 0 ? "Inverting causal horizon (Anti-dS)" : "Standard vacuum relaxation rate"}
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Calc. Brane Tension:</span>
                    <span className="font-mono text-green-400">{calculatedTension.toFixed(2)} units</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Entropy Release:</span>
                    <span className="font-mono text-orange-400">
                        {isCollapsed ? "100% (DIFFUSED)" : "0% (BOUND)"}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 pt-2">
                <Button 
                    onClick={handleCollapse} 
                    disabled={isCollapsed}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
                >
                    <Play className="w-4 h-4 mr-2" />
                    Collapse
                </Button>
                <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="px-3 border-slate-700 hover:bg-slate-800"
                >
                    <RotateCcw className="w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-black shadow-inner">
                <canvas 
                    ref={canvasRef} 
                    width={600} 
                    height={400} 
                    className="w-full h-auto block"
                />
                
                {/* Overlay Info */}
                <div className="absolute top-4 right-4 text-right space-y-1 pointer-events-none">
                    <div className="text-[10px] font-mono text-slate-500">REAL-TIME METRIC</div>
                    <div className={`text-sm font-mono font-bold ${isCollapsed ? 'text-red-500' : 'text-blue-500'}`}>
                        {isCollapsed ? `ΔE = ${(calculatedTension * 0.015).toFixed(4)} Planck Units` : 'E ≈ 0 (Stable)'}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 border border-slate-800 h-24 overflow-y-auto">
                <p className="mb-1 text-slate-500"># SYSTEM LOG</p>
                <p>{">"} Monitoring SIFS-metric tensor g_uv...</p>
                <p>{">"} Scale coordinate locked at S={scaleS}.</p>
                {isCollapsed && (
                    <>
                        <p className="text-red-400 mt-1">{">"} ALERT: Topological node failure detected.</p>
                        <p className="text-yellow-500">{">"} CALIBRATION: Redistributing {calculatedTension.toFixed(1)}% tension to global halo.</p>
                        <p className="text-blue-400">{">"} SUCCESS: New vacuum state established.</p>
                    </>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
