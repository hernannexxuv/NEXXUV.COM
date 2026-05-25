import { MessageCircle } from 'lucide-react';

const WA_LINK = 'https://wa.me/56987535014?text=Hola%20equipo%20Nexxuv,%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20estrat%C3%A9gica.';

export default function WhatsAppWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      <div className="bg-emerald-tech/10 border border-emerald-tech/20 text-emerald-tech text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 pointer-events-none">
        ¿Listo para automatizar?
      </div>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
  );
}
