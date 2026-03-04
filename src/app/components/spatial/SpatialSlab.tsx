/**
 * SpatialSlab - Базовый компонент для применения Spatial Presets
 * 
 * T100 [US10]: Base component for Spatial Presets application
 * - Monolith preset: central block with perspective
 * - Orbital preset: islands with levitation
 * - Data Capsule preset: gradient border 0.5px
 */

import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

export type SpatialPreset = 'monolith' | 'orbital' | 'data-capsule';

interface SpatialSlabProps {
  children: ReactNode;
  preset?: SpatialPreset;
  className?: string;
}

/**
 * SpatialSlab - Применяет SSF-2025 Spatial Presets к контенту
 * 
 * @param children - Контент для обёртки
 * @param preset - Пресет: 'monolith' (основные страницы), 'orbital' (навигация), 'data-capsule' (виджеты)
 * @param className - Дополнительные CSS классы
 */
export function SpatialSlab({ 
  children, 
  preset = 'monolith',
  className 
}: SpatialSlabProps) {
  const presetClasses = {
    monolith: 'spatial-page-block spatial-monolith',
    orbital: 'spatial-orbital-preset',
    'data-capsule': 'data-capsule',
  };

  return (
    <div className={cn(presetClasses[preset], className)}>
      {children}
    </div>
  );
}
