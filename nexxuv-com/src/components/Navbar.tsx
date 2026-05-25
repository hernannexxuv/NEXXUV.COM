import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock } from 'lucide-react';

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

const ADMIN_PASSWORD = 'nexxuv2026';

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setShowModal(false);
        setPassword('');
        setPasswordError('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleLogoClick = useCallback(() => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (newCount >= 7) {
        setShowModal(true);
        setPassword('');
        setPasswordError('');
        return 0;
      }
      timeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
      return newCount;
    });
  }, []);

  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowModal(false);
      setPassword('');
      setPasswordError('');
      onAdminClick();
    } else {
      setPasswordError('Contrasena incorrecta');
      setPassword('');
    }
  }, [password, onAdminClick]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setPassword('');
    setPasswordError('');
    setClickCount(0);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center group-hover:bg-cyan-neon/20 transition-colors">
              <span className="text-cyan-neon font-extrabold text-sm">NX</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">NEXXUV</span>
          </button>

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
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#0a0f1e] border border-white/[0.08] rounded-2xl p-8"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-neon/[0.06] border border-cyan-neon/20 flex items-center justify-center mb-4">
                  <Lock size={20} className="text-cyan-neon" />
                </div>
                <h3 className="text-white font-semibold text-lg">Acceso Administrador</h3>
                <p className="text-slate-light/50 text-sm mt-1">Ingresa la contrasena para acceder al panel</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contrasena"
                    autoComplete="off"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-light/30 focus:outline-none focus:border-cyan-neon/30 transition-colors"
                  />
                  {passwordError && (
                    <p className="text-red-400 text-xs mt-2 text-left">{passwordError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-light/60 hover:text-white text-sm font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon hover:bg-cyan-neon/20 text-sm font-medium transition-all"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
