import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import BookingForm from './pages/BookingForm';
import AdminDashboard from './pages/AdminDashboard';

type Page = 'home' | 'booking' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="bg-[#030712] min-h-screen">
      {currentPage !== 'admin' && (
        <Navbar onNavigate={navigate} currentPage={currentPage} />
      )}
      {currentPage === 'home' && <Landing onNavigate={navigate} />}
      {currentPage === 'booking' && <BookingForm onNavigate={navigate} />}
      {currentPage === 'admin' && <AdminDashboard onNavigate={navigate} />}
    </div>
  );
}
