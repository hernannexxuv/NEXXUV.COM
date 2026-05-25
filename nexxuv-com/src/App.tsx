function App() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="bg-grid fixed inset-0" />
      <div className="bg-radial-glow fixed inset-0" />
      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400/60 tracking-wider uppercase mb-8">
          NEXXUV
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sitio en <span className="text-gradient-cyan">Mantenimiento</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Estamos realizando mejoras para brindarte una mejor experiencia. <br />
          Pronto estaremos de vuelta.
        </p>
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-600 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400/60 animate-pulse" />
          En mantenimiento temporal
        </div>
      </div>
    </div>
  );
}

export default App;
