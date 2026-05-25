import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlowButton from './GlowButton';
import { Mail, MapPin, Phone, CalendarCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { useCreateBooking } from '../features/bookings/hooks';

interface ContactProps {
  selectedSession: string;
}

const contactInfo = [
  { icon: Mail, label: 'contacto@nexxuv.com' },
  { icon: Phone, label: '+56 9 8753 5014' },
  { icon: MapPin, label: 'Santiago, Chile' },
];

const sessionTypes = [
  'Arquitectura de Plataformas',
  'Automatización de Procesos',
  'Integración Middleware',
  'Consultoría Técnica',
];

export default function Contact({ selectedSession }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sessionType, setSessionType] = useState(selectedSession);
  const { mutate, isPending, isSuccess, isError, reset } = useCreateBooking();

  useEffect(() => {
    if (selectedSession) {
      setSessionType(selectedSession);
    }
  }, [selectedSession]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    mutate({
      name: name.trim(),
      email: email.trim(),
      session_type: sessionType,
    }, {
      onSuccess: () => {
        setName('');
        setEmail('');
        setSessionType(sessionTypes[0]);
      }
    });
  };

  return (
    <section id="contacto" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-neon text-xs font-semibold tracking-widest uppercase">Contacto</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Inicia tu <span className="text-gradient-cyan">Transformación Digital</span>
            </h2>
            <p className="text-slate-light/60 leading-relaxed mb-8">
              Agenda una sesión estratégica con nuestro equipo de ingeniería. Evaluaremos tu operación, identificaremos oportunidades de automatización y presentaremos una hoja de ruta personalizada.
            </p>

            <div className="flex flex-col gap-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-center gap-3 text-slate-light/60">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <c.icon size={15} className="text-cyan-neon/60" />
                  </div>
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.015] border border-white/[0.06] rounded-2xl p-8"
          >
            {isSuccess ? (
              <div aria-live="polite" className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-tech/10 border border-emerald-tech/20 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-emerald-tech" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Sesión Agendada</h3>
                <p className="text-slate-light/50 text-sm mb-6">Tu solicitud ha sido registrada. Nuestro equipo se pondrá en contacto contigo pronto.</p>
                <GlowButton variant="secondary" onClick={() => reset()}>
                  Agendar otra sesión
                </GlowButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-white font-semibold text-lg mb-6">Agendar Sesión Estratégica</h3>
                <div aria-live="polite">
                  {isError && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
                      <AlertCircle size={16} />
                      Error al enviar. Intenta nuevamente.
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="text-slate-light/40 text-xs font-medium uppercase tracking-wider mb-1.5 block">Nombre completo</label>
                    <input
                      id="name"
                      type="text"
                      required
                      disabled={isPending}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-light/30 focus:outline-none focus:border-cyan-neon/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-slate-light/40 text-xs font-medium uppercase tracking-wider mb-1.5 block">Email corporativo</label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={isPending}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@empresa.com"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-light/30 focus:outline-none focus:border-cyan-neon/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="sessionType" className="text-slate-light/40 text-xs font-medium uppercase tracking-wider mb-1.5 block">Tipo de sesión</label>
                    <select
                      id="sessionType"
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value)}
                      disabled={isPending}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-slate-light/60 focus:outline-none focus:border-cyan-neon/30 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sessionTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <GlowButton variant="primary" type="submit" disabled={isPending} className="w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="flex items-center justify-center gap-2 w-full">
                      <CalendarCheck size={16} />
                      {isPending ? 'Enviando...' : 'Agendar Diagnóstico'}
                    </span>
                  </GlowButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-white/[0.04] pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center">
              <span className="text-cyan-neon font-extrabold text-[10px]">NX</span>
            </div>
            <span className="text-white/60 font-semibold text-sm">NEXXUV</span>
          </div>
          <p className="text-slate-light/30 text-xs">&copy; 2026 NEXXUV. Ingeniería de Software y Automatización Estratégica.</p>
        </div>
      </div>
    </section>
  );
}
