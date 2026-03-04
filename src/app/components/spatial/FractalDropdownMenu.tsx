/**
 * Fractal Dropdown Menu
 *
 * FR-070: Z-отдаление других блоков при открытии (translateZ(-20px) scale(0.95)),
 * clip-path анимация раскрытия сверху вниз, список документов с stagger анимацией,
 * закрытие при клике вне или на другую категорию, touch gesture support
 */

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface FractalDropdownMenuProps {
  items: { path: string; label: string }[];
  onClose: () => void;
}

export function FractalDropdownMenu({
  items,
  onClose,
}: FractalDropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // FR-070: Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // FR-070: Touch gesture support (swipe to close)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || touchStartX.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchEndY - touchStartY.current;
      const deltaX = touchEndX - touchStartX.current;

      // Swipe down более 50px или swipe в любом направлении более 100px
      if (deltaY > 50 || Math.abs(deltaX) > 100) {
        onClose();
      }

      touchStartY.current = null;
      touchStartX.current = null;
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener("touchstart", handleTouchStart);
      menu.addEventListener("touchend", handleTouchEnd);
      return () => {
        menu.removeEventListener("touchstart", handleTouchStart);
        menu.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{
          opacity: 0,
          // FR-070: Clip-path анимация раскрытия сверху вниз
          clipPath: "inset(0% 0% 100% 0%)",
          // FR-070: Z-отдаление других блоков
          transform: "translateX(-50%) translateZ(-20px) scale(0.95)",
        }}
        animate={{
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          transform: "translateX(-50%) translateZ(0) scale(1)",
        }}
        exit={{
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
          transform: "translateX(-50%) translateZ(-20px) scale(0.95)",
        }}
        transition={{
          duration: 0.3, // FR-070: clip-path timing 300ms
          ease: "easeOut",
        }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 min-w-[200px] bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl p-4 shadow-lg z-50"
        style={{
          transformOrigin: "bottom center",
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05, // FR-070: Stagger 50ms для плавного появления
              duration: 0.2,
            }}
          >
            <Link
              to={item.path}
              onClick={onClose}
              className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
