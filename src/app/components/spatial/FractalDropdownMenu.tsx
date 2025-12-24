/**
 * Fractal Dropdown Menu
 * 
 * Меню с Z-отдалением других блоков при открытии
 * Clip-path анимация раскрытия сверху вниз
 */

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface FractalDropdownMenuProps {
  items: { path: string; label: string }[];
  onClose: () => void;
}

export function FractalDropdownMenu({ items, onClose }: FractalDropdownMenuProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
        exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 min-w-[200px] bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl p-4 shadow-lg z-50"
        style={{
          transform: 'translateX(-50%) translateZ(-20px)',
        }}
      >
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
