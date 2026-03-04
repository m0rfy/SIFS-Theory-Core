/**
 * Sync Orb - Индикатор синхронизации
 * 
 * T073: Индикатор синхронизации
 * Плавная анимация при изменении состояния
 * Связь с параметрами теории через CSS переменные
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface SyncOrbProps {
  className?: string;
  size?: number;
  status?: 'synced' | 'syncing' | 'error';
}

export function SyncOrb({
  className = '',
  size = 24,
  status: externalStatus,
}: SyncOrbProps) {
  const [internalStatus, setInternalStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [metricStability, setMetricStability] = useState(1);

  // Определяем статус на основе метрической стабильности, если не передан явно
  useEffect(() => {
    if (externalStatus) {
      setInternalStatus(externalStatus);
      return;
    }

    const updateStability = () => {
      const root = getComputedStyle(document.documentElement);
      const stability = parseFloat(root.getPropertyValue('--sifs-metric-stability') || '1');
      setMetricStability(stability);

      // Определяем статус на основе стабильности
      if (stability < 0.3) {
        setInternalStatus('error');
      } else if (stability < 0.7) {
        setInternalStatus('syncing');
      } else {
        setInternalStatus('synced');
      }
    };

    // Обновляем при изменении CSS переменной
    const observer = new MutationObserver(updateStability);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Также проверяем через requestAnimationFrame для плавности
    let rafId: number | null = null;
    const checkStability = () => {
      updateStability();
      rafId = requestAnimationFrame(checkStability);
    };
    
    rafId = requestAnimationFrame(checkStability);
    
    updateStability();
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [externalStatus]);

  const statusConfig = {
    synced: {
      color: 'oklch(65% 0.25 150)', // Зелёный
      icon: CheckCircle2,
      label: 'Synchronized',
    },
    syncing: {
      color: 'oklch(65% 0.25 60)', // Жёлтый
      icon: Loader2,
      label: 'Syncing',
    },
    error: {
      color: 'oklch(65% 0.25 0)', // Красный
      icon: AlertCircle,
      label: 'Error',
    },
  };

  const config = statusConfig[internalStatus];
  const Icon = config.icon;

  return (
    <motion.div
      className={`sync-orb ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        scale: internalStatus === 'syncing' ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: internalStatus === 'syncing' ? Infinity : 0,
        ease: 'easeInOut',
      }}
      aria-label={config.label}
    >
      <div
        className="relative w-full h-full rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${config.color}, transparent)`,
          boxShadow: `0 0 ${size}px ${config.color}`,
        }}
      >
        <Icon
          className="w-1/2 h-1/2"
          style={{
            color: config.color,
            animation: internalStatus === 'syncing' ? 'spin 1s linear infinite' : undefined,
          } as React.CSSProperties}
        />
      </div>
    </motion.div>
  );
}
