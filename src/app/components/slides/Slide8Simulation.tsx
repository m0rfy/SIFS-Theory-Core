import React from 'react';
import { Slide } from '../Slide';
import { InformationalCollapseSimulation } from '../InformationalCollapseSimulation';

interface Slide8SimulationProps {
  slideNumber: number;
  totalSlides: number;
}

export const Slide8Simulation: React.FC<Slide8SimulationProps> = ({ slideNumber, totalSlides }) => {
  return (
    <Slide
      title="Informational Collapse Simulation"
      subtitle="Interactive analysis of metric recalibration events"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-8">
        <div className="text-center max-w-3xl space-y-4">
          <p className="text-xl text-slate-300">
            Моделирование реакции SIFS-метрики на мгновенное уничтожение планетарного узла.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left bg-slate-900/50 p-6 rounded-lg border border-slate-800">
            <div>
              <h4 className="text-blue-400 font-mono text-sm mb-2">INPUT PARAMETERS</h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Target Mass: 5.97e24 kg</li>
                <li>• Scale S: 37.0 (Earth-like)</li>
                <li>• Event: Instant topology loss</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-mono text-sm mb-2">PREDICTED OUTCOME</h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Vacuum Shift: ΔE ≈ 0.61 Planck Units</li>
                <li>• Entropy Release: 100% Diffusion</li>
                <li>• Recalibration: &lt; 1 Planck Time</li>
              </ul>
            </div>
          </div>
        </div>

        <InformationalCollapseSimulation />
      </div>
    </Slide>
  );
};
