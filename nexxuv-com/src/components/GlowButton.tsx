import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GlowButton({ children, variant = 'primary', onClick, className = '', type = 'button', disabled = false }: GlowButtonProps) {
  const base = 'relative px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const primary = `${base} bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30 glow-cyan glow-cyan-hover hover:scale-105 hover:border-cyan-neon/60 hover:bg-cyan-neon/15 disabled:hover:scale-100 disabled:hover:border-cyan-neon/30`;

  const secondary = `${base} bg-emerald-tech/10 text-emerald-tech border border-emerald-tech/30 glow-emerald hover:scale-105 hover:border-emerald-tech/60 hover:bg-emerald-tech/15 hover:shadow-[0_0_30px_rgba(16,185,129,0.4),0_0_60px_rgba(16,185,129,0.15)] disabled:hover:scale-100 disabled:hover:border-emerald-tech/30 disabled:hover:shadow-none`;

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      disabled={disabled}
      className={`${variant === 'primary' ? primary : secondary} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
