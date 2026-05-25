import { motion } from 'framer-motion';
import GlowButton from './GlowButton';
import { ArrowRight, CalendarCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-[72px] overflow-hidden scroll-mt-[72px]">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-glow" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-tech/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.25] sm:leading-[1.1] tracking-tight mb-6"
        >
          Ingeniería de Software y{' '}
          <span className="text-gradient-cyan">Automatización Estratégica</span>{' '}
          para Escalar tu Operación.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-light/70 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10"
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
          className="mt-12 sm:mt-16 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center justify-start sm:justify-center gap-6 sm:gap-10 text-slate-light/40 py-4 -mx-6 px-6 sm:mx-0 sm:px-0"
        >
          {['Automatización RPA', 'Integración IoT', 'Arquitectura Web', 'Digitalización Legal'].map((t) => (
            <span key={t} className="snap-center whitespace-nowrap text-xs font-medium tracking-wider uppercase border-r border-slate-light/10 pr-6 sm:pr-10 last:border-0 last:pr-0">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
