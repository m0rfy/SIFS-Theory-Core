/**
 * Layout - Основной layout компонент с SSF-2025 Spatial Framework
 * 
 * T104 [US10]: Integrate TemporalAbyss with Layout
 * 
 * Реализует 4 уровня реальности SSF-2025:
 * - Level 0: Temporal Abyss (Background) - фон с частицами времени
 * - Level 1: Substrate (Main Content) - подложка страницы с контентом
 * - Level 2: Control Plane (Navigation) - навигация Orbital Dock
 * - Level 3: Pulse (Indicators) - индикаторы в компонентах
 */

import { Outlet } from 'react-router-dom';
import { OrbitalDock } from '../spatial/OrbitalDock';
import { TemporalAbyss } from '../spatial/TemporalAbyss';

export function Layout() {
  return (
    <div className="relative w-full min-h-screen" style={{ position: 'relative' }}>
      {/* T104 [US10]: Level 0: The Temporal Abyss (Background) */}
      {/* Фон с частицами времени, WebGPU/Canvas fallback, реакция на --sifs-oscillation-speed */}
      <TemporalAbyss />
      
      {/* Level 1: The Substrate (Main Content) */}
      {/* Подложка страницы с контентом, использует Spatial Presets (Monolith, Orbital, Data Capsule) */}
      <div className="relative z-10" style={{ position: 'relative' }}>
        <Outlet />
      </div>
      
      {/* Level 2: The Control Plane (Navigation) */}
      {/* Навигация Orbital Dock с парящими "островками", вибрация при низкой стабильности */}
      <OrbitalDock />
    </div>
  );
}
