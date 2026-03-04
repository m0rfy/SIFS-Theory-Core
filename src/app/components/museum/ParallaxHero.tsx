/**
 * ParallaxHero Component
 * 
 * Эпичный входной экран с анимацией, визуальными эффектами и параллакс прокруткой
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

export interface ParallaxHeroProps {
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Дополнительный контент */
  children?: React.ReactNode;
  /** Фоновое изображение (опционально) */
  backgroundImage?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Скорость параллакса (0-1) */
  parallaxSpeed?: number;
}

/**
 * ParallaxHero component
 * 
 * Создаёт эпичный входной экран с анимацией и параллакс эффектами
 */
export function ParallaxHero({
  title,
  subtitle,
  children,
  backgroundImage,
  className,
  parallaxSpeed = 0.5,
}: ParallaxHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Параллакс трансформации
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', `${50 * parallaxSpeed}%`]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', `${30 * parallaxSpeed}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${20 * parallaxSpeed}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    // Задержка для анимации входа
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full min-h-[60vh] md:h-screen overflow-hidden',
        'flex items-center justify-center',
        className
      )}
      style={{ position: 'relative' }}
    >
      {/* Фоновое изображение с параллаксом */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: backgroundY,
            opacity,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            {/* Затемнение для читаемости */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
        </motion.div>
      )}

      {/* Градиентный фон (если нет изображения) */}
      {!backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse at top, 
                oklch(30% 0.15 250) 0%, 
                oklch(10% 0.1 250) 50%, 
                oklch(0% 0 0) 100%
              )
            `,
            opacity,
          }}
        />
      )}

      {/* Частицы времени (Temporal Abyss эффект) */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Контент с параллаксом */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto"
        style={{
          y: contentY,
        }}
      >
        {/* Заголовок с эпичной анимацией входа */}
        <motion.h1
          className="text-[32px] md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 px-2"
          style={{
            y: titleY,
            color: 'var(--sifs-delta-color, oklch(65% 0.25 250))',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
          }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={
            isLoaded
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.9 }
          }
          transition={{
            duration: 0.2, // T060: Simplified animations on mobile
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {title}
        </motion.h1>

        {/* Подзаголовок */}
        {subtitle && (
          <motion.p
            className="text-base md:text-xl lg:text-2xl text-gray-300 mb-4 md:mb-8 max-w-3xl mx-auto line-height-[1.6] px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.2, // T060: Simplified animations on mobile
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Дополнительный контент */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Индикатор прокрутки */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
