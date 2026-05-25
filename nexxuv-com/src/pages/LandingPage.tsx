import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import Solutions from '../components/Solutions';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import WhatsAppWidget from '../components/WhatsAppWidget';

function LandingPage() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState('');

  const handleBookSession = useCallback((sessionType: string) => {
    setSelectedSession(sessionType);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-space">
      <Navbar onAdminClick={() => navigate('/admin')} />
      <Hero />
      <Capabilities />
      <Solutions />
      <Portfolio onBookSession={handleBookSession} />
      <Contact selectedSession={selectedSession} />
      <WhatsAppWidget />
    </div>
  );
}

export default LandingPage;
