import { motion } from 'framer-motion';
import { X, Users, Calendar, TrendingUp, BarChart3, Settings, Bell, LogOut, Home, Layers, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Visitas esta semana', value: '1,284', change: '+12.3%', icon: Users },
  { label: 'Sesiones agendadas', value: '38', change: '+8.1%', icon: Calendar },
  { label: 'Tasa de conversión', value: '23.7%', change: '+2.4%', icon: TrendingUp },
  { label: 'Ingresos del mes', value: '$4.2M', change: '+18.6%', icon: BarChart3 },
];

type EstadoSesion = 'Confirmada' | 'Pendiente' | 'Reagendada';

interface Session {
  cliente: string;
  tipo: string;
  fecha: string;
  estado: EstadoSesion;
}

const upcomingSessions: Session[] = [
  { cliente: 'Municipalidad de Santiago', tipo: 'Arquitectura de Plataformas', fecha: '28 May 2026', estado: 'Confirmada' },
  { cliente: 'Tribunal de Juicio Oral', tipo: 'Automatización de Procesos', fecha: '29 May 2026', estado: 'Pendiente' },
  { cliente: 'TVOGPS Corp.', tipo: 'Integración Middleware', fecha: '30 May 2026', estado: 'Confirmada' },
  { cliente: 'Ministerio de Justicia', tipo: 'Consultoría Técnica', fecha: '1 Jun 2026', estado: 'Reagendada' },
  { cliente: 'RSVgps Ltda.', tipo: 'Integración Middleware', fecha: '3 Jun 2026', estado: 'Confirmada' },
];

const sidebarLinks = [
  { icon: Home, label: 'Dashboard' },
  { icon: Calendar, label: 'Sesiones' },
  { icon: Users, label: 'Clientes' },
  { icon: Layers, label: 'Servicios' },
  { icon: BarChart3, label: 'Reportes' },
  { icon: Settings, label: 'Configuración' },
];

const statusColor: Record<EstadoSesion, string> = {
  Confirmada: 'bg-emerald-tech/10 text-emerald-tech border-emerald-tech/20',
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Reagendada: 'bg-cyan-neon/10 text-cyan-neon border-cyan-neon/20',
};

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-[#0a0f1e] flex overflow-hidden"
    >
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/[0.06] p-5">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center">
            <span className="text-cyan-neon font-extrabold text-xs">NX</span>
          </div>
          <span className="text-white font-bold text-sm">NEXXUV</span>
          <span className="text-slate-light/40 text-[10px] ml-auto">CRM</span>
        </div>

        <nav className="flex flex-col gap-1 flex-grow">
          {sidebarLinks.map((l, i) => (
            <button
              key={l.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                i === 0 ? 'bg-cyan-neon/[0.06] text-cyan-neon' : 'text-slate-light/50 hover:text-slate-light/80 hover:bg-white/[0.02]'
              }`}
            >
              <l.icon size={16} />
              {l.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-light/50 hover:text-slate-light/80 transition-colors">
            <Bell size={16} />
            Notificaciones
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/60 hover:text-red-400 transition-colors">
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white">Panel de Administración</h2>
            <p className="text-slate-light/40 text-sm mt-1">Resumen de operación y gestión de sesiones</p>
          </div>
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-light/50 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-neon/[0.06] border border-cyan-neon/20 flex items-center justify-center">
                  <s.icon size={16} className="text-cyan-neon" />
                </div>
                <span className="text-emerald-tech text-xs font-medium">{s.change}</span>
              </div>
              <p className="text-white font-bold text-xl">{s.value}</p>
              <p className="text-slate-light/40 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Sessions Table */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Próximas Sesiones Agendadas</h3>
            <span className="text-slate-light/30 text-xs">{upcomingSessions.length} sesiones</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Tipo de Sesión</th>
                  <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.map((s) => (
                  <tr key={`${s.cliente}-${s.fecha}`} className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-3.5 text-white font-medium">{s.cliente}</td>
                    <td className="px-5 py-3.5 text-slate-light/60 flex items-center gap-2">
                      <Clock size={13} className="text-cyan-neon/40" />
                      {s.tipo}
                    </td>
                    <td className="px-5 py-3.5 text-slate-light/60">{s.fecha}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor[s.estado]}`}>
                        {s.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
