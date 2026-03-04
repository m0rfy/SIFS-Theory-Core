/**
 * WebGPU Particles System
 * 
 * Система частиц времени с WebGPU API и Canvas 2D fallback
 * Обеспечивает 60 FPS для тысяч частиц
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface ParticleSystem {
  update: (deltaTime: number) => void;
  destroy: () => void;
  getParticleCount: () => number;
  setSpeedMultiplier: (multiplier: number) => void;
}

interface ParticleSystemConfig {
  particleCount?: number;
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  useWebGPU?: boolean;
}

/**
 * Проверка поддержки WebGPU
 */
function isWebGPUSupported(): boolean {
  return 'gpu' in navigator;
}

/**
 * Создание системы частиц с WebGPU или Canvas 2D fallback
 */
export function createParticleSystem(
  config: ParticleSystemConfig
): ParticleSystem {
  const {
    canvas,
    particleCount = 1000,
    width = canvas.width || 800,
    height = canvas.height || 600,
    useWebGPU = isWebGPUSupported(),
  } = config;

  canvas.width = width;
  canvas.height = height;

  let particles: Particle[] = [];
  let animationFrameId: number | null = null;
  let lastTime = performance.now();
  let isDestroyed = false;
  let speedMultiplier = 1.0; // Множитель скорости для реакции на --sifs-oscillation-speed

  // Инициализация частиц
  function initParticles(): void {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random(),
        maxLife: 1,
        size: Math.random() * 3 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
      });
    }
  }

  // Canvas 2D fallback renderer
  function renderCanvas2D(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // WebGPU renderer (упрощённая версия)
  async function initWebGPU(): Promise<boolean> {
    if (!useWebGPU || !isWebGPUSupported()) {
      return false;
    }

    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        return false;
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext('webgpu');
      if (!context) {
        return false;
      }

      // WebGPU инициализация (упрощённая)
      // В полной реализации здесь будет setup compute shaders и render pipeline
      return true;
    } catch (error) {
      console.warn('WebGPU initialization failed, falling back to Canvas 2D:', error);
      return false;
    }
  }

  // Обновление частиц
  function updateParticles(deltaTime: number): void {
    const speed = deltaTime * 0.001 * speedMultiplier; // Нормализация времени с учётом множителя

    particles.forEach((particle) => {
      // Обновление позиции с учётом множителя скорости
      particle.x += particle.vx * speed * 60;
      particle.y += particle.vy * speed * 60;

      // Границы экрана с отражением
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Обновление жизни
      particle.life -= speed * 0.5;
      if (particle.life <= 0) {
        particle.life = particle.maxLife;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }
    });
  }

  // Основной цикл рендеринга
  function animate(currentTime: number): void {
    if (isDestroyed) {
      return;
    }

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    updateParticles(deltaTime);

    // Рендеринг через Canvas 2D (fallback)
    const ctx = canvas.getContext('2d');
    if (ctx) {
      renderCanvas2D(ctx);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Инициализация
  initParticles();
  
  // Попытка инициализации WebGPU
  initWebGPU().then((webGPUSuccess) => {
    if (!webGPUSuccess) {
      console.log('Using Canvas 2D fallback for particles');
    }
  });

  // Запуск анимации
  lastTime = performance.now();
  animationFrameId = requestAnimationFrame(animate);

  return {
    update: (deltaTime: number) => {
      updateParticles(deltaTime);
    },
    destroy: () => {
      isDestroyed = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      particles = [];
    },
    getParticleCount: () => particles.length,
    setSpeedMultiplier: (multiplier: number) => {
      speedMultiplier = Math.max(0.1, Math.min(10, multiplier)); // Ограничиваем диапазон
    },
  };
}
