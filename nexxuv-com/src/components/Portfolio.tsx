import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicBorderCard from './MagicBorderCard';
import GlowButton from './GlowButton';
import { Clock, Building2, Scale, Truck, ClipboardCheck, Lock } from 'lucide-react';

interface PortfolioProps {
  onBookSession: (sessionType: string) => void;
}

const sessions = [
  {
    icon: Building2,
    duration: '90 minutos',
    title: 'Arquitectura de Plataformas: Soluciones Institucionales',
    desc: 'Demostración completa de la arquitectura técnica para digitalizar la comunicación entre municipios y juntas de vecinos (Ley 19.418).',
    sessionType: 'Arquitectura de Plataformas',
  },
  {
    icon: Scale,
    duration: '60 minutos',
    title: 'Automatización de Procesos: Caso Poder Judicial',
    desc: 'Presentación del caso de uso real de extracción y monitoreo desde el sistema judicial chileno. Demo en vivo del bot de causas y alertas automáticas.',
    sessionType: 'Automatización de Procesos',
  },
  {
    icon: Truck,
    duration: '45 minutos',
    title: 'Integración Middleware: Gestión de Flotas y Telemetría',
    desc: 'Caso de éxito operando con proveedores de rastreo GPS (TVOGPS, RSVgps). Demostración de comunicación continua, soporte técnico B2B de alto nivel y despliegue de soluciones sobre la infraestructura global de REDgps.',
    sessionType: 'Integración Middleware',
  },
  {
    icon: ClipboardCheck,
    duration: '120 minutos',
    title: 'Consultoría Técnica: Auditoría y Eliminación de Burocracia',
    desc: 'Sesión de diagnóstico para mapear flujos de trabajo, identificar cuellos de botella y presentar hoja de ruta de digitalización.',
    sessionType: 'Consultoría Técnica',
  },
];

export default function Portfolio({ onBookSession }: PortfolioProps) {
  const clickCount = useRef(0);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const PASSWORD = 'temuco2026';
  const REDIRECT_URL = 'https://vecino-digital-demo.pages.dev/dideco';

  const handleBook = (sessionType: string) => () => {
    onBookSession(sessionType);
  };

  const handleIconClick = (title: string) => {
    if (title === 'Arquitectura de Plataformas: Soluciones Institucionales') {
      clickCount.current += 1;
      
      if (clickCount.current === 3) {
        clickCount.current = 0;
        if (clickTimeout.current) clearTimeout(clickTimeout.current);
        setPassword('');
        setPasswordError('');
        setShowPasswordModal(true);
      } else {
        if (clickTimeout.current) clearTimeout(clickTimeout.current);
        clickTimeout.current = setTimeout(() => {
          clickCount.current = 0;
        }, 2000);
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      window.open(REDIRECT_URL, '_blank');
    } else {
      setPasswordError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  return (
    <section id="portafolio" className="relative pt-4 pb-16 sm:pt-8 sm:pb-20 scroll-mt-[0px]">
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-tech text-xs font-semibold tracking-widest uppercase">Portafolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Portafolio Técnico y <span className="text-gradient-cyan">Capacidades de Ejecución</span>
          </h2>
          <p className="text-slate-light/60 max-w-2xl mx-auto">
            Sesiones estratégicas de demostración y diagnóstico para evaluar cómo nuestras soluciones se integran con tu operación.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((s, i) => (
            <MagicBorderCard key={s.title} delay={i * 0.1}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className={`w-11 h-11 rounded-lg bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center ${s.title === 'Arquitectura de Plataformas: Soluciones Institucionales' ? 'cursor-pointer' : ''}`}
                    onClick={() => handleIconClick(s.title)}
                  >
                    <s.icon size={20} className="text-cyan-neon" />
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-tech text-xs font-medium bg-emerald-tech/10 px-3 py-1 rounded-full border border-emerald-tech/20">
                    <Clock size={12} />
                    {s.duration}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3 leading-snug">{s.title}</h3>
                <p className="text-slate-light/50 text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>
                <GlowButton variant="primary" aria-label={`Agendar sesión sobre ${s.title}`} onClick={handleBook(s.sessionType)} className="w-full justify-center text-center">
                  <span className="flex items-center justify-center gap-2 w-full">
                    <Clock size={14} />
                    Agendar esta sesión
                  </span>
                </GlowButton>
              </div>
            </MagicBorderCard>
          ))}
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={handleCloseModal}
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
                <h3 className="text-white font-semibold text-lg">Acceso Demo Vecino Digital</h3>
                <p className="text-slate-light/50 text-sm mt-1">
                  Ingresa la contraseña de acceso para ver la demostración
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    autoComplete="off"
                    autoFocus
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-light/30 focus:outline-none focus:border-cyan-neon/30 transition-colors"
                  />
                  {passwordError && (
                    <p className="text-red-400 text-xs mt-2 text-left">{passwordError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-light/60 hover:text-white text-sm font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon hover:bg-cyan-neon/20 text-sm font-medium transition-all"
                  >
                    Acceder
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
