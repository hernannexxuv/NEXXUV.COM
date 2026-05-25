import { motion } from 'framer-motion';
import { Cpu, Code2, Zap, ShieldCheck } from 'lucide-react';

const capabilities = [
  {
    icon: Cpu,
    title: 'Ingeniería de Automatización',
    desc: 'Diseño e implementación de bots RPA, pipelines de datos y sistemas de monitoreo continuo con arquitectura resiliente.',
  },
  {
    icon: Code2,
    title: 'Desarrollo de Plataformas',
    desc: 'Construcción de portales corporativos, APIs y microservicios con estándares de seguridad y escalabilidad institucional.',
  },
  {
    icon: Zap,
    title: 'Integración de Sistemas',
    desc: 'Conexión middleware entre plataformas heterogéneas: telemetría GPS, sistemas legales, gestión municipal y flotas.',
  },
  {
    icon: ShieldCheck,
    title: 'Consultoría y Auditoría Digital',
    desc: 'Diagnóstico de procesos burocráticos, mapeo de cuellos de botella y hojas de ruta para digitalización completa.',
  },
];

export default function Capabilities() {
  return (
    <section id="capacidades" className="relative pt-4 pb-16 sm:pt-8 sm:pb-20 scroll-mt-[0px]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-neon text-xs font-semibold tracking-widest uppercase">Capacidades</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Ejecución Técnica de <span className="text-gradient-cyan">Nivel Institucional</span>
          </h2>
          <p className="text-slate-light/60 max-w-2xl mx-auto">
            Operamos con rigor metodológico y trazabilidad total. Cada proyecto tiene arquitectura documentada, métricas de rendimiento y soporte continuo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.015] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-neon/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-neon/[0.06] border border-cyan-neon/20 flex items-center justify-center mb-5 group-hover:bg-cyan-neon/10 transition-colors">
                <c.icon size={22} className="text-cyan-neon" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{c.title}</h3>
              <p className="text-slate-light/50 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
