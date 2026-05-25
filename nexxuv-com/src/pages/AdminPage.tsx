import { motion } from 'framer-motion';
import { X, Users, Calendar, TrendingUp, BarChart3, Settings, Bell, LogOut, Home, Layers, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookings, useUpdateBookingStatus } from '../features/bookings/hooks';

type EstadoSesion = 'Confirmada' | 'Pendiente' | 'Reagendada';

function normalizeStatus(dbStatus: string | undefined): EstadoSesion {
  if (!dbStatus) return 'Pendiente';
  const normalized = dbStatus.toLowerCase();
  if (normalized === 'confirmada' || normalized === 'confirmed') return 'Confirmada';
  if (normalized === 'reagendada' || normalized === 'rescheduled') return 'Reagendada';
  return 'Pendiente';
}

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
  const { data: bookings = [], isLoading, isError } = useBookings();
  const updateStatus = useUpdateBookingStatus();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => normalizeStatus(b.status) === 'Pendiente').length;
  const confirmedBookings = bookings.filter(b => normalizeStatus(b.status) === 'Confirmada').length;
  const rescheduledBookings = bookings.filter(b => normalizeStatus(b.status) === 'Reagendada').length;

  const stats = [
    { label: 'Total Solicitudes', value: totalBookings.toString(), change: 'En tiempo real', icon: Layers },
    { label: 'Sesiones Confirmadas', value: confirmedBookings.toString(), change: 'Activas', icon: Calendar },
    { label: 'Sesiones Pendientes', value: pendingBookings.toString(), change: 'Por revisar', icon: Clock },
    { label: 'Sesiones Reagendadas', value: rescheduledBookings.toString(), change: 'Ajustadas', icon: TrendingUp },
  ];

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
            <span className="text-slate-light/30 text-xs">{bookings.length} sesiones</span>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-6 h-6 border-2 border-white/10 border-t-cyan-neon rounded-full animate-spin" />
                <p className="text-slate-light/40 text-xs">Cargando sesiones...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-12 text-red-400 text-sm">
                Error al conectar con Supabase. Por favor verifica las credenciales.
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-slate-light/40 text-sm">
                Aún no hay sesiones agendadas.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Cliente</th>
                    <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Tipo de Sesión</th>
                    <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Fecha de Creación</th>
                    <th className="text-left px-5 py-3 text-slate-light/40 font-medium text-xs uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((s) => (
                    <tr key={s.id} className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="text-white font-medium">{s.name}</div>
                        <div className="text-slate-light/40 text-xs flex items-center gap-1.5 mt-0.5">
                          <Mail size={11} className="text-cyan-neon/30" />
                          {s.email}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-light/60">
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-cyan-neon/40" />
                          {s.session_type}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-light/60">
                        {new Date(s.created_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={normalizeStatus(s.status)}
                          onChange={(e) => updateStatus.mutate({ id: s.id, status: e.target.value.toLowerCase() })}
                          disabled={updateStatus.isPending}
                          className={`bg-transparent border border-white/[0.06] rounded-lg px-2.5 py-1 text-xs font-medium focus:outline-none cursor-pointer transition-colors ${
                            statusColor[normalizeStatus(s.status)]
                          }`}
                        >
                          <option value="Pendiente" className="bg-[#0a0f1e] text-slate-light">Pendiente</option>
                          <option value="Confirmada" className="bg-[#0a0f1e] text-slate-light">Confirmada</option>
                          <option value="Reagendada" className="bg-[#0a0f1e] text-slate-light">Reagendada</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
