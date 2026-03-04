/**
 * ExhibitCard Component
 *
 * Карточка экспоната с визуальными эффектами, hover эффектами с увеличением масштаба,
 * плавными переходами
 *
 * T095 [US9]: Exhibit card with visual effects, hover effects with scale increase, smooth transitions
 */

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/app/components/ui/utils";
import { NeoCard } from "@/app/components/visual/NeoCard";
import { Exhibit } from "./InteractiveExhibit";

export interface ExhibitCardProps {
  /** Данные экспоната */
  exhibit: Exhibit;
  /** Обработчик клика */
  onClick?: (exhibit: Exhibit) => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * ExhibitCard component
 *
 * Отображает карточку экспоната с визуальными эффектами и интерактивностью
 */
export function ExhibitCard({ exhibit, onClick, className }: ExhibitCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick?.(exhibit)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <NeoCard
        variant="card"
        hover
        className="h-full cursor-pointer overflow-hidden"
      >
        {/* Визуальные эффекты при наведении */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at center, 
              var(--sifs-delta-color, oklch(65% 0.25 250)) 0%, 
              transparent 70%)`,
          }}
        />

        {/* Контент карточки */}
        <div className="relative z-10 p-6">
          {/* Заголовок */}
          <motion.h3
            className="text-xl font-bold mb-3"
            style={{
              color: "var(--sifs-delta-color, oklch(65% 0.25 250))",
            }}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {exhibit.title}
          </motion.h3>

          {/* Описание */}
          <p className="text-gray-300 text-sm line-height-[1.6] mb-4">
            {exhibit.description}
          </p>

          {/* Индикатор типа */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {exhibit.type === "document" && "📄"}
              {exhibit.type === "simulation" && "⚡"}
              {exhibit.type === "visualization" && "📊"}
              {exhibit.type === "example" && "💡"}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {exhibit.type === "document" && "Документ"}
              {exhibit.type === "simulation" && "Симуляция"}
              {exhibit.type === "visualization" && "Визуализация"}
              {exhibit.type === "example" && "Пример"}
            </span>
          </div>
        </div>

        {/* Эффект свечения при наведении */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: isHovered ? "0 0 30px rgba(100, 200, 255, 0.3)" : "none",
          }}
          transition={{ duration: 0.3 }}
        />
      </NeoCard>
    </motion.div>
  );
}
