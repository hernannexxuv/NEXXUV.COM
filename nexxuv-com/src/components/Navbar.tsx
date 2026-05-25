import { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'booking' | 'admin') => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', page: 'home' as const },
    { label: 'Servicios', page: 'home' as const, anchor: '#servicios' },
    { label: 'Nosotros', page: 'home' as const, anchor: '#nosotros' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Cpu className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm group-hover:bg-cyan-300/30 transition-all" />
          </div>
          <span className="text-white font-bold text-xl tracking-widest">
            NEX<span className="text-cyan-400">XUV</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onNavigate(link.page);
                if (link.anchor) {
                  setTimeout(() => {
                    document.querySelector(link.anchor!)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-gray-400 hover:text-cyan-400 text-sm font-medium tracking-wider uppercase transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('admin')}
            className="text-gray-600 hover:text-gray-400 text-xs font-medium tracking-wider uppercase transition-colors duration-200 border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded"
          >
            Admin
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className={`px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded border transition-all duration-200 ${
              currentPage === 'booking'
                ? 'bg-cyan-400 text-gray-900 border-cyan-400'
                : 'bg-transparent text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
            }`}
          >
            Agendar Reunión
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#030712]/98 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setMenuOpen(false);
                onNavigate(link.page);
                if (link.anchor) {
                  setTimeout(() => {
                    document.querySelector(link.anchor!)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-gray-400 hover:text-cyan-400 text-sm font-medium tracking-wider uppercase transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onNavigate('booking'); }}
            className="w-full px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all"
          >
            Agendar Reunión
          </button>
        </div>
      )}
    </nav>
  );
}
