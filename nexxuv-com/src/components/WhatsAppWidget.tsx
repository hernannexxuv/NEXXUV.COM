import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const WA_LINK = 'https://wa.me/56987535014?text=Hola%20equipo%20Nexxuv,%20vengo%20desde%20la%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20estrat%C3%A9gica.';

export default function WhatsAppWidget() {
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer-content');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // If the footer is entering the viewport
        if (rect.top < windowHeight) {
          // Push the button up by how much the footer is visible + 24px default margin
          const visibleHeight = windowHeight - rect.top;
          setBottomOffset(Math.max(24, visibleHeight + 24));
        } else {
          setBottomOffset(24);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed right-6 z-50 flex flex-col items-end gap-2 group"
      style={{ bottom: `${bottomOffset}px`, transition: 'bottom 0.1s ease-out' }}
    >
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
