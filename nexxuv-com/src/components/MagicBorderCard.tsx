import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagicBorderCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MagicBorderCard({ children, className = '', delay = 0 }: MagicBorderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={`magic-border rounded-2xl ${className}`}
    >
      <div className="relative z-10 h-full bg-[#0a0f1e] rounded-2xl p-6">
        {children}
      </div>
    </motion.div>
  );
}
