/**
 * Level 2: The Control Plane - Orbital Dock
 *
 * T102 [US10]: Fully implement Level 2 (Control Plane) with all SSF-2025 features
 *
 * FR-069: Фиксированная позиция снизу по центру, скруглённые углы (24px),
 * сверхпрозрачное стекло, парящие "островки" с float анимацией,
 * связь с --sifs-oscillation-speed, Bento-стиль, hover scale 1.2 через Motion,
 * активное состояние с --sifs-delta-color, вибрация при низкой Metric Stability
 *
 * SSF-2025 Level 2 Features:
 * - ✅ Фиксированная позиция снизу по центру (position: fixed, bottom: 24px, left: 50%, transform: translateX(-50%))
 * - ✅ Скруглённые углы 24px (border-radius: 24px)
 * - ✅ Сверхпрозрачное стекло (backdrop-filter: blur(20px), background: rgba(255, 255, 255, 0.1))
 * - ✅ Парящие "островки" с float анимацией (animation: float var(--sifs-oscillation-speed))
 * - ✅ Связь с --sifs-oscillation-speed для частоты "дыхания"
 * - ✅ Bento-стиль (dock-island с backdrop-filter и rounded corners)
 * - ✅ Hover scale 1.2 через Motion (whileHover={{ scale: 1.2 }})
 * - ✅ Активное состояние с --sifs-delta-color (boxShadow: 0 0 20px var(--sifs-delta-color))
 * - ✅ Вибрация при низкой Metric Stability (data-stability="low" → animation: spatial-vibration)
 * - ✅ Реакция на --sifs-time-dilation-delta для Z-позиции (translateZ)
 * - ✅ Fractal Dropdown Menu для подменю с Z-отдалением
 * - ✅ Mobile адаптация с Sheet для подменю
 */

import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Calculator,
  Zap,
  Database,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { FractalDropdownMenu } from "./FractalDropdownMenu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface DockItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  submenu?: { path: string; label: string }[];
}

const dockItems: DockItem[] = [
  {
    path: "/",
    icon: Home,
    label: "Главная",
  },
  {
    path: "/docs",
    icon: BookOpen,
    label: "Теория",
    submenu: [
      { path: "/docs/theory", label: "Теоретическая база" },
      { path: "/docs/calculations", label: "Расчёты" },
      { path: "/docs/predictions", label: "Предсказания" },
      { path: "/docs/data", label: "Данные" },
      { path: "/docs/defense", label: "Защита теории" },
      { path: "/docs/protocol", label: "Протоколы" },
    ],
  },
  {
    path: "/simulations",
    icon: Zap,
    label: "Симуляции",
    submenu: [
      { path: "/simulations", label: "Индекс симуляций" },
      { path: "/simulations/collapse", label: "Коллапс" },
      { path: "/simulations/temporal", label: "Темпоральная" },
      { path: "/simulations/calculations", label: "Расчёты" },
      { path: "/simulations/visualizations", label: "Визуализации" },
    ],
  },
  {
    path: "/world-change",
    icon: Sparkles,
    label: "Как теория изменит мир",
  },
  {
    path: "/docs/predictions",
    icon: Calculator,
    label: "Предсказания",
  },
  {
    path: "/docs/data",
    icon: Database,
    label: "Данные",
  },
];

export function OrbitalDock() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [stability, setStability] = useState<"low" | "normal">("normal");
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // T025: Определяем мобильный режим
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // T067: Вибрация при низкой Metric Stability - читаем из CSS переменной
  // T068: Реакция на --sifs-oscillation-speed для частоты "дыхания"
  useEffect(() => {
    const updateStability = () => {
      const root = getComputedStyle(document.documentElement);
      const metricStability = parseFloat(
        root.getPropertyValue("--sifs-metric-stability") || "1"
      );
      setStability(metricStability < 0.5 ? "low" : "normal");
    };

    // Обновляем при изменении CSS переменной через requestAnimationFrame для плавности
    let rafId: number | null = null;
    const checkStability = () => {
      updateStability();
      rafId = requestAnimationFrame(checkStability);
    };

    rafId = requestAnimationFrame(checkStability);

    // Также слушаем изменения через MutationObserver для быстрой реакции
    const observer = new MutationObserver(updateStability);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    updateStability();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Закрываем подменю при клике вне или навигации
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dock-spatial-module")) {
        setActiveSubmenu(null);
      }
    };

    if (activeSubmenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeSubmenu]);

  // Закрываем подменю при навигации
  useEffect(() => {
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Автоматическое скрытие/показ при hover (только на десктопе)
  useEffect(() => {
    if (isMobile) {
      setIsVisible(true); // На мобильных всегда видим
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dock = document.querySelector(".dock-spatial-module");
      if (!dock) return;

      const rect = dock.getBoundingClientRect();
      const isNearDock =
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50 &&
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50;

      if (isNearDock) {
        setIsVisible(true);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      } else {
        // Скрываем через 2 секунды после ухода мыши
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    // Показываем при первом движении мыши
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener("mousemove", handleFirstMove);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleFirstMove, { once: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleFirstMove);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, [isMobile]);

  // T025: На мобильных показываем только основные элементы (первые 3) или горизонтальный скролл
  const visibleItems = isMobile ? dockItems.slice(0, 3) : dockItems;

  return (
    <>
      <motion.div
        className="dock-spatial-module"
        data-stability={stability}
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{
          opacity: isMobile || isVisible ? 1 : 0,
          y: isMobile || isVisible ? 0 : -20,
          x: "-50%", // Центрирование через Motion, чтобы не конфликтовать с CSS transform
        }}
        style={{
          left: "50%", // Позиционирование через CSS
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => !isMobile && setIsVisible(true)}
        onMouseLeave={() => {
          if (!isMobile) {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = setTimeout(
              () => setIsVisible(false),
              2000
            );
          }
        }}
      >
        {visibleItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSubmenu === item.path;
          const isCurrentPath =
            location.pathname === item.path ||
            (item.submenu &&
              item.submenu.some((sub) =>
                location.pathname.startsWith(sub.path)
              ));

          return (
            <div key={item.path} className="relative">
              {item.submenu ? (
                <>
                  <motion.button
                    className="dock-island flex items-center justify-center"
                    onClick={() =>
                      setActiveSubmenu(isActive ? null : item.path)
                    }
                    aria-label={item.label}
                    whileHover={{ scale: 1.2 }} // FR-069: hover effect scale 1.2 using Motion
                    whileTap={{ scale: 0.95 }}
                    style={{
                      // FR-069: Активное состояние с подсветкой динамическим цветом
                      boxShadow: isCurrentPath
                        ? `0 0 20px var(--sifs-delta-color)`
                        : undefined,
                      background: isCurrentPath
                        ? "rgba(255, 255, 255, 0.08)"
                        : undefined,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                  {isActive && !isMobile && (
                    <FractalDropdownMenu
                      items={item.submenu}
                      onClose={() => setActiveSubmenu(null)}
                    />
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    const baseClass =
                      "dock-island flex items-center justify-center";
                    return isActive ? `${baseClass} active` : baseClass;
                  }}
                  aria-label={item.label}
                >
                  {({ isActive }) => (
                    <motion.div
                      className="flex items-center justify-center"
                      style={{
                        width: "100%",
                        height: "100%",
                        // FR-069: Активное состояние с подсветкой динамическим цветом
                        boxShadow: isActive
                          ? `0 0 20px var(--sifs-delta-color)`
                          : undefined,
                      }}
                      whileHover={{ scale: 1.2 }} // FR-069: hover effect scale 1.2 using Motion
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  )}
                </NavLink>
              )}
            </div>
          );
        })}

        {/* T107: LanguageSwitcher integration */}
        <div className="dock-island flex items-center justify-center">
          <LanguageSwitcher variant="icon" />
        </div>
      </motion.div>

      {/* T025: Полноэкранное подменю на мобильных через Sheet */}
      {isMobile &&
        activeSubmenu &&
        (() => {
          const activeItem = dockItems.find(
            (item) => item.path === activeSubmenu
          );
          if (!activeItem?.submenu) return null;

          return (
            <Sheet
              open={!!activeSubmenu}
              onOpenChange={(open) => !open && setActiveSubmenu(null)}
            >
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>{activeItem.label}</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  {activeItem.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => setActiveSubmenu(null)}
                      className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-base min-h-[44px] flex items-center"
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          );
        })()}
    </>
  );
}
