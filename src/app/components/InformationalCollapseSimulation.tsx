import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Play, RotateCcw, Activity } from "lucide-react";

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
  const [metricStress, setMetricStress] = useState(100); // 100% stress initially
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  
  // Simulation state refs to avoid re-renders during animation loop
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();
  
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
    setMetricStress(100);
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
    const massPlanet = isCollapsed ? 0 : 2000; // Mass pulls nodes

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Physics Update
      pointsRef.current.forEach((p, idx) => {
        if (p.fixed) return;

        let fx = 0;
        let fy = 0;

        // Spring force to original position (Fabric memory)
        fx += (p.ox - p.x) * k;
        fy += (p.oy - p.y) * k;

        // Gravity/Tension from the Planet (Center)
        // We simulate gravity by pulling points towards the center point
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
        } else {
             // Wave propagation effect (simple ripple)
             // Not physically accurate 5D math, but visual representation
        }

        p.vx = (p.vx + fx) * damp;
        p.vy = (p.vy + fy) * damp;
        p.x += p.vx;
        p.y += p.vy;
      });

      // Compute metrics for UI
      let totalDisplacement = 0;
      pointsRef.current.forEach(p => {
          totalDisplacement += Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy);
      });
      setMetricStress(Math.min(100, totalDisplacement / 5));

      // Draw Grid
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // Draw lines (horizontal & vertical)
      // Simplified: just draw dots for now to save performance or connect neighbors
      // Let's connect neighbors roughly
      const rows = 15;
      const cols = 20;
      
      ctx.beginPath();
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const idx = i * cols + j;
            const p = pointsRef.current[idx];
            
            // Right neighbor
            if (j < cols - 1) {
                const pRight = pointsRef.current[idx + 1];
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pRight.x, pRight.y);
            }
            // Bottom neighbor
            if (i < rows - 1) {
                const pBottom = pointsRef.current[idx + cols];
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pBottom.x, pBottom.y);
            }
        }
      }
      ctx.stroke();

      // Draw Center Mass (if not collapsed)
      if (!isCollapsed) {
          const cp = pointsRef.current[centerIdx];
          ctx.beginPath();
          ctx.arc(cp.ox, cp.oy, 15, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444'; // Red Planet
          ctx.fill();
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ef4444';
      } else {
           // Draw "Ghost" Information
          const cp = pointsRef.current[centerIdx];
          ctx.beginPath();
          ctx.arc(cp.ox, cp.oy, waveAmplitude, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - waveAmplitude/50})`;
          ctx.stroke();
          if (waveAmplitude < 50) setWaveAmplitude(prev => prev + 1);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
      runSimulation();
  }, [isCollapsed]);

  const handleCollapse = () => {
      setIsCollapsed(true);
      setWaveAmplitude(0);
  };

  const handleReset = () => {
      initGrid();
      // Need to trigger re-run
      setTimeout(() => setIsCollapsed(false), 10);
  };

  return (
    <Card className="w-full max-w-4xl bg-slate-950 border-slate-800 text-slate-100">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-xl font-mono text-blue-400">SIFS Metric Calibration</CardTitle>
                <CardDescription>Visualizing Brane Tension Relaxation (Topological Shift)</CardDescription>
            </div>
            <Badge variant={isCollapsed ? "destructive" : "outline"} className="font-mono">
                {isCollapsed ? "STATE: CALIBRATING..." : "STATE: STABLE"}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50">
            <canvas 
                ref={canvasRef} 
                width={700} 
                height={500} 
                className="w-full h-auto block cursor-crosshair"
            />
            
            <div className="absolute top-4 left-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono bg-black/50 p-2 rounded">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span>Metric Stress: {metricStress.toFixed(1)}%</span>
                </div>
                 <div className="flex items-center gap-2 text-xs font-mono bg-black/50 p-2 rounded">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                    <span>Node Mass: {isCollapsed ? "0 (NULL)" : "5.97e24 kg"}</span>
                </div>
            </div>
        </div>

        <div className="flex gap-4">
            <Button 
                onClick={handleCollapse} 
                disabled={isCollapsed}
                className="bg-red-900/50 hover:bg-red-800 text-red-100 border-red-800"
            >
                <Play className="w-4 h-4 mr-2" />
                Initiate Collapse
            </Button>
            <Button 
                onClick={handleReset}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800"
            >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset System
            </Button>
        </div>
        
        <div className="bg-slate-900 p-4 rounded text-xs font-mono text-slate-400">
            <p>{">"} Analyzing vacuum refractive index n(r, S)...</p>
            {isCollapsed && (
                <>
                    <p className="text-yellow-500">{">"} WARN: Node topology lost. Recalculating geodesics.</p>
                    <p className="text-blue-400">{">"} INFO: Entropy wave propagating to S-Scale layers.</p>
                </>
            )}
        </div>
      </CardContent>
    </Card>
  );
};
