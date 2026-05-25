import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center group-hover:bg-cyan-neon/20 transition-colors">
            <span className="text-cyan-neon font-extrabold text-sm">NX</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">NEXXUV</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate-light/70 hover:text-cyan-neon text-sm font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAdminClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-light/60 hover:text-cyan-neon hover:border-cyan-neon/20 text-xs font-medium transition-all duration-200"
          >
            <Shield size={13} />
            Acceso Administrador
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="lg:hidden text-slate-light p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/[0.04] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-light/70 hover:text-cyan-neon text-sm font-medium py-3 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onAdminClick(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-light/60 hover:text-cyan-neon text-xs font-medium transition-all mt-2 w-fit"
              >
                <Shield size={13} />
                Acceso Administrador
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
