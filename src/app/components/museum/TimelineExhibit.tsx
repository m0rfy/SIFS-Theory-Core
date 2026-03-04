/**
 * TimelineExhibit Component
 * 
 * Временная линия экспонатов, интерактивные события с деталями,
 * плавная анимация при прокрутке
 * 
 * T094 [US9]: Timeline of exhibits, interactive events with details, smooth animation on scroll
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { NeoCard } from '@/app/components/visual/NeoCard';

export interface TimelineEvent {
  /** ID события */
  id: string;
  /** Заголовок события */
  title: string;
  /** Описание события */
  description: string;
  /** Дата события */
  date: string;
  /** Дополнительные детали */
  details?: string;
  /** Иконка события */
  icon?: string;
  /** Цвет события */
  color?: string;
}

export interface TimelineExhibitProps {
  /** События временной линии */
  events: TimelineEvent[];
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * TimelineExhibit component
 * 
 * Отображает временную линию экспонатов с интерактивными событиями
 */
export function TimelineExhibit({
  events,
  className,
}: TimelineExhibitProps) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Отслеживание видимости событий при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute('data-event-id');
            if (eventId) {
              setVisibleEvents((prev) => new Set([...prev, eventId]));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const eventElements = containerRef.current?.querySelectorAll('[data-event-id]');
    eventElements?.forEach((el) => observer.observe(el));

    return () => {
      eventElements?.forEach((el) => observer.unobserve(el));
    };
  }, [events]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Линия временной шкалы */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 opacity-30" />

      {/* События */}
      <div className="space-y-8">
        {events.map((event, index) => {
          const isVisible = visibleEvents.has(event.id);
          const isActive = activeEvent === event.id;
          const eventColor = event.color || 'var(--sifs-delta-color, oklch(65% 0.25 250))';

          return (
            <motion.div
              key={event.id}
              data-event-id={event.id}
              className="relative flex items-start gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Точка на линии */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveEvent(isActive ? null : event.id)}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: isActive ? eventColor : 'transparent',
                    borderColor: eventColor,
                  }}
                />
                {event.icon && (
                  <motion.div
                    className="absolute text-2xl"
                    animate={{ scale: isActive ? 1.2 : 1 }}
                  >
                    {event.icon}
                  </motion.div>
                )}
              </motion.div>

              {/* Карточка события */}
              <motion.div
                className="flex-1"
                animate={{ scale: isActive ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <NeoCard
                  variant="card"
                  hover
                  className={cn(
                    'p-6 cursor-pointer',
                    isActive && 'ring-2',
                  )}
                  style={{
                    ringColor: eventColor,
                  }}
                  onClick={() => setActiveEvent(isActive ? null : event.id)}
                >
                  {/* Дата */}
                  <div className="text-sm text-gray-400 mb-2">{event.date}</div>

                  {/* Заголовок */}
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: eventColor }}
                  >
                    {event.title}
                  </h3>

                  {/* Описание */}
                  <p className="text-gray-300 line-height-[1.6] mb-2">
                    {event.description}
                  </p>

                  {/* Дополнительные детали (раскрываются при клике) */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {event.details && (
                      <p className="text-sm text-gray-400 mt-2 line-height-[1.6]">
                        {event.details}
                      </p>
                    )}
                  </motion.div>
                </NeoCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
