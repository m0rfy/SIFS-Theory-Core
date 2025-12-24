/**
 * Level 2: The Control Plane - Orbital Dock
 * 
 * Плавающая навигация снизу с парящими "островками" (Bento-стиль)
 * Связь с Metric Stability (вибрация при низкой стабильности)
 */

import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Calculator, Zap, Database, Presentation } from 'lucide-react';
import { useState } from 'react';
import { FractalDropdownMenu } from './FractalDropdownMenu';

interface DockItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  submenu?: { path: string; label: string }[];
}

const dockItems: DockItem[] = [
  {
    path: '/',
    icon: Home,
    label: 'Главная',
  },
  {
    path: '/docs',
    icon: BookOpen,
    label: 'Теория',
    submenu: [
      { path: '/docs/theory', label: 'Теоретическая база' },
      { path: '/docs/calculations', label: 'Расчёты' },
      { path: '/docs/predictions', label: 'Предсказания' },
      { path: '/docs/data', label: 'Данные' },
    ],
  },
  {
    path: '/simulations',
    icon: Zap,
    label: 'Симуляции',
    submenu: [
      { path: '/simulations/collapse', label: 'Коллапс' },
      { path: '/simulations/temporal', label: 'Темпоральная' },
      { path: '/simulations/calculations', label: 'Расчёты' },
      { path: '/simulations/visualizations', label: 'Визуализации' },
    ],
  },
  {
    path: '/docs/predictions',
    icon: Calculator,
    label: 'Предсказания',
  },
  {
    path: '/docs/data',
    icon: Database,
    label: 'Данные',
  },
];

export function OrbitalDock() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <div className="dock-spatial-module" data-stability="normal">
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSubmenu === item.path;

        return (
          <div key={item.path} className="relative">
            {item.submenu ? (
              <>
                <button
                  className="dock-island"
                  onClick={() => setActiveSubmenu(isActive ? null : item.path)}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
                {isActive && (
                  <FractalDropdownMenu
                    items={item.submenu}
                    onClose={() => setActiveSubmenu(null)}
                  />
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `dock-island ${isActive ? 'active' : ''}`
                }
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            )}
          </div>
        );
      })}
    </div>
  );
}
