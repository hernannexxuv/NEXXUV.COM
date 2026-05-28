import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import MagicBorderCard from './MagicBorderCard';
import GlowButton from './GlowButton';
import { Clock, Building2, Scale, Truck, ClipboardCheck } from 'lucide-react';

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
  const [buildingClicks, setBuildingClicks] = useState(0);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBook = (sessionType: string) => () => {
    onBookSession(sessionType);
  };

  const handleIconClick = (title: string) => {
    if (title === 'Arquitectura de Plataformas: Soluciones Institucionales') {
      setBuildingClicks((prev) => {
        const newCount = prev + 1;
        if (newCount === 3) {
          window.open('https://vecino-digital-demo.pages.dev/dideco', '_blank');
          return 0;
        }
        
        if (clickTimeout.current) clearTimeout(clickTimeout.current);
        clickTimeout.current = setTimeout(() => setBuildingClicks(0), 1000);
        
        return newCount;
      });
    }
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
    </section>
  );
}
