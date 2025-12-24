import React from 'react';
import { Slide } from '../Slide';
import { InformationalCollapseSimulation } from '../InformationalCollapseSimulation';
import { AtomicClockSync } from '../AtomicClockSync';

interface Slide8SimulationProps {
  slideNumber: number;
  totalSlides: number;
}

export const Slide8Simulation: React.FC<Slide8SimulationProps> = ({ slideNumber, totalSlides }) => {
  return (
    <Slide
      title="Интерактивная Симуляция SIFS"
      subtitle="Анализ коллапса метрики и темпоральной синхронизации"
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-10 pb-16 px-4">
        
        {/* Section 1: Collapse Simulation */}
        <div className="w-full max-w-6xl space-y-6">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl font-light text-blue-100 tracking-wide">
              Моделирование Гравитационного Коллапса
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Экспериментальная установка для визуализации реакции вакуумной энергии SIFS на мгновенную потерю топологического узла. 
              Изменяйте массу и масштабный коэффициент (S), чтобы наблюдать распространение информационных волн.
            </p>
          </div>
          
          <div className="flex justify-center">
             <InformationalCollapseSimulation />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl border-t border-slate-800/60 my-4"></div>

        {/* Section 2: Atomic Clock Sync */}
        <div className="w-full max-w-5xl space-y-6">
          <div className="text-center mb-8 space-y-2">
             <h3 className="text-xl font-semibold text-slate-200 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Темпоральная Калибровка
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Система мониторинга релятивистского дрейфа времени. Позволяет отслеживать расхождение между локальным временем наблюдателя и метрическим временем SIFS с точностью до аттосекунд.
            </p>
          </div>
          
          <AtomicClockSync />
        </div>
      </div>
    </Slide>
  );
};
