import { motion } from 'framer-motion';
import { useRef } from 'react';
import GlowButton from './GlowButton';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useCircuitAnimation } from './animations/useCircuitAnimation';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCircuitAnimation(canvasRef);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-[72px] sm:pt-[84px] overflow-hidden scroll-mt-[72px]">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Circuit animation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: 0.45 }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-tech/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 sm:mt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-neon/[0.06] border border-cyan-neon/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
            <span className="text-cyan-neon text-xs font-medium tracking-wide uppercase">Ingeniería & Automatización B2B</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight md:leading-[1.15] tracking-tight mb-6 max-w-4xl mx-auto break-words px-1"
        >
          Ingeniería de Software y{' '}
          <span className="text-gradient-cyan block sm:inline">Automatización Estratégica</span>{' '}
          para Escalar tu Operación.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-light/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 break-words px-2"
        >
          Transformamos procesos institucionales complejos, integramos telemetría avanzada y construimos ecosistemas digitales que impulsan el crecimiento corporativo B2B.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton variant="secondary" onClick={() => document.getElementById('capacidades')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="flex items-center gap-2">
              Explorar Capacidades
              <ArrowRight size={16} />
            </span>
          </GlowButton>
          <GlowButton variant="primary" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="flex items-center gap-2">
              <CalendarCheck size={16} />
              Agendar Diagnóstico
            </span>
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-slate-light/40 py-4 max-w-3xl mx-auto px-4"
        >
          {['Automatización RPA', 'Integración IoT', 'Arquitectura Web', 'Digitalización Legal'].map((t) => (
            <span key={t} className="whitespace-nowrap text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-white/[0.02] border border-white/[0.06] rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
