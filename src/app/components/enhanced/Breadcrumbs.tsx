/**
 * Breadcrumbs Component
 *
 * Навигационная цепочка внутри контента (не в основной навигации)
 * Показывает путь от главной страницы до текущего документа
 */

import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../ui/utils";
import { motion } from "motion/react";

export interface BreadcrumbItem {
  /** Текст элемента */
  label: string;
  /** Путь для навигации */
  path: string;
  /** Является ли текущей страницей */
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  /** Элементы навигации */
  items: BreadcrumbItem[];
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Breadcrumbs component
 *
 * Отображает навигационную цепочку с плавными переходами
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Всегда начинаем с главной страницы
  const allItems: BreadcrumbItem[] = [
    {
      label: "Главная",
      path: "/",
      isActive: false,
    },
    ...items,
  ];

  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        "mb-6 pb-4 border-b border-border/50",
        className
      )}
      aria-label="Навигационная цепочка"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isActive = item.isActive ?? isLast;

        return (
          <motion.div
            key={`${item.path}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05, // Stagger animation
            }}
            className="flex items-center gap-2"
          >
            {index === 0 ? (
              <Home className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            )}

            {isActive ? (
              <span
                className={cn(
                  "font-medium text-foreground",
                  "transition-colors duration-200"
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "hover:text-foreground",
                  "transition-colors duration-200",
                  "hover:underline underline-offset-4"
                )}
              >
                {item.label}
              </Link>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}
