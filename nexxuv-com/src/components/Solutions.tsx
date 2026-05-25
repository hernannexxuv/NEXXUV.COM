import { motion } from 'framer-motion';
import MagicBorderCard from './MagicBorderCard';
import { Bot, Satellite, Globe, FileCheck } from 'lucide-react';

const solutions = [
  {
    icon: Bot,
    title: 'Automatización Robótica (RPA) & Scraping',
    desc: 'Extracción de datos masivos y monitoreo en tiempo real.',
    color: 'cyan-neon',
  },
  {
    icon: Satellite,
    title: 'Integración IoT & Telemetría GPS',
    desc: 'Conexión de plataformas de rastreo satelital y gestión de activos.',
    color: 'emerald-tech',
  },
  {
    icon: Globe,
    title: 'Arquitectura Web & Portales Corporativos',
    desc: 'Desarrollo de infraestructura escalable.',
    color: 'cyan-neon',
  },
  {
    icon: FileCheck,
    title: 'Digitalización Legal & Administrativa',
    desc: 'Modernización de flujos burocráticos.',
    color: 'emerald-tech',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  'cyan-neon': { border: 'border-cyan-neon/20', bg: 'bg-cyan-neon/10', text: 'text-cyan-neon' },
  'emerald-tech': { border: 'border-emerald-tech/20', bg: 'bg-emerald-tech/10', text: 'text-emerald-tech' },
};

export default function Solutions() {
  return (
    <section id="soluciones" className="relative pt-4 pb-16 sm:pt-8 sm:pb-20 scroll-mt-[0px]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-neon text-xs font-semibold tracking-widest uppercase">Soluciones</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Infraestructura Digital <span className="text-gradient-cyan">Institucional</span>
          </h2>
          <p className="text-slate-light/60 max-w-2xl mx-auto">
            Cada solución está diseñada para operar en entornos de alta exigencia, con arquitectura robusta y trazabilidad completa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <MagicBorderCard key={s.title} delay={i * 0.1}>
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-5`}>
                    <s.icon size={22} className={c.text} />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 leading-snug">{s.title}</h3>
                  <p className="text-slate-light/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </MagicBorderCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
