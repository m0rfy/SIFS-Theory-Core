import { Outlet } from 'react-router-dom';
import { OrbitalDock } from '../spatial/OrbitalDock';
import { TemporalAbyss } from '../spatial/TemporalAbyss';

export function Layout() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Level 0: The Temporal Abyss (Background) */}
      <TemporalAbyss />
      
      {/* Level 1: The Substrate (Main Content) */}
      <div className="relative z-10">
        <Outlet />
      </div>
      
      {/* Level 2: The Control Plane (Navigation) */}
      <OrbitalDock />
    </div>
  );
}
