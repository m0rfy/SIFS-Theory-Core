/**
 * Performance Monitor Utility
 * 
 * T229, T234: FPS monitoring for animations and WebGPU particles
 * T235: Calculation time measurement
 * T238: Page load time measurement
 */

export interface PerformanceMetrics {
  fps: number;
  frameCount: number;
  averageFPS: number;
  minFPS: number;
  maxFPS: number;
}

export interface LoadTimeMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
}

export class FPSCounter {
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private fpsHistory: number[] = [];
  private maxHistorySize: number = 60; // Keep last 60 frames
  private animationFrameId: number | null = null;
  private callback: ((metrics: PerformanceMetrics) => void) | null = null;

  /**
   * Start FPS monitoring
   */
  start(callback?: (metrics: PerformanceMetrics) => void): void {
    this.callback = callback || null;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.measure();
  }

  /**
   * Stop FPS monitoring
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    const currentFPS = this.fpsHistory.length > 0 
      ? this.fpsHistory[this.fpsHistory.length - 1] 
      : 0;
    const averageFPS = this.fpsHistory.length > 0
      ? this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length
      : 0;
    const minFPS = this.fpsHistory.length > 0
      ? Math.min(...this.fpsHistory)
      : 0;
    const maxFPS = this.fpsHistory.length > 0
      ? Math.max(...this.fpsHistory)
      : 0;

    return {
      fps: currentFPS,
      frameCount: this.frameCount,
      averageFPS: Math.round(averageFPS * 100) / 100,
      minFPS: Math.round(minFPS * 100) / 100,
      maxFPS: Math.round(maxFPS * 100) / 100,
    };
  }

  private measure = (): void => {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (deltaTime > 0) {
      const fps = 1000 / deltaTime;
      this.fpsHistory.push(fps);
      
      if (this.fpsHistory.length > this.maxHistorySize) {
        this.fpsHistory.shift();
      }
    }

    this.frameCount++;
    
    if (this.callback) {
      this.callback(this.getMetrics());
    }

    this.animationFrameId = requestAnimationFrame(this.measure);
  };
}

/**
 * Measure calculation execution time
 */
export function measureCalculationTime<T>(
  calculation: () => T,
  label?: string
): { result: T; time: number } {
  const startTime = performance.now();
  const result = calculation();
  const endTime = performance.now();
  const time = endTime - startTime;

  if (label) {
    console.log(`[Performance] ${label}: ${time.toFixed(2)}ms`);
  }

  return { result, time };
}

/**
 * Measure page load time
 */
export function measurePageLoadTime(): LoadTimeMetrics {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  const loadTime = navigation.loadEventEnd - navigation.fetchStart;
  const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
  const firstPaint = paint.find(p => p.name === 'first-paint')?.startTime || 0;
  const firstContentfulPaint = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

  return {
    loadTime: Math.round(loadTime),
    domContentLoaded: Math.round(domContentLoaded),
    firstPaint: Math.round(firstPaint),
    firstContentfulPaint: Math.round(firstContentfulPaint),
  };
}

/**
 * Check if FPS meets target (60 FPS)
 */
export function checkFPSRequirement(metrics: PerformanceMetrics, targetFPS: number = 60): boolean {
  return metrics.averageFPS >= targetFPS * 0.95; // Allow 5% tolerance
}

/**
 * Check if load time meets requirement
 */
export function checkLoadTimeRequirement(metrics: LoadTimeMetrics, maxTime: number): boolean {
  return metrics.loadTime <= maxTime;
}

/**
 * React hook for FPS monitoring
 */
export function useFPSMonitor(enabled: boolean = true) {
  const counterRef = React.useRef<FPSCounter | null>(null);
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    const counter = new FPSCounter();
    counterRef.current = counter;
    
    counter.start((m) => {
      setMetrics(m);
    });

    return () => {
      counter.stop();
    };
  }, [enabled]);

  return { metrics, counter: counterRef.current };
}

// Import React for hook
import React from 'react';
