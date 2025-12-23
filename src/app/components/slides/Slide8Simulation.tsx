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
          <p className="text-sm text-slate-400">
            Используйте панель управления ниже, чтобы изменить параметры массы и масштаба (S) и запустить процесс калибровки вакуума.
          </p>
        </div>

        <InformationalCollapseSimulation />
      </div>
    </Slide>
  );
};
