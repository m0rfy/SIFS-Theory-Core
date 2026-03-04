/**
 * Bento Cell Component
 * 
 * Bento-style cell для навигации с эффектом левитации и hover эффектами
 */

import React from 'react';
import { motion } from 'motion/react';

interface BentoCellProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export function BentoCell({ children, className = '', onClick, delay = 0 }: BentoCellProps) {
  return (
    <motion.div
      className={`bento-cell ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.05,
        y: -4,
        transition: { duration: 0.2 }
      }}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </motion.div>
  );
}
