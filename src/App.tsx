import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import BookingSidebar from './components/BookingSidebar';
import LoungesView from './views/LoungesView';
import TimelineView from './views/TimelineView';
import LocatorView from './views/LocatorView';
import ProfileView from './views/ProfileView';
import MobileHomeView from './views/MobileHomeView';
import ChatBotModal from './components/ChatBotModal';

const initialBookings = [
  { id: 'mock1', title: 'Product Review', roomId: 'DELHI', location: 'Delhi lounge', date: '04 / 05 / 2026', startTime: '11:00 AM', duration: '1 Hour' },
  { id: 'mock2', title: 'Design Sync', roomId: 'MUMBAI', location: 'Mumbai lounge', date: '04 / 06 / 2026', startTime: '02:00 PM', duration: '1 Hour' },
  { id: 'mock3', title: 'Post-Mortem', roomId: 'SFO', location: 'SFO lounge', date: '04 / 08 / 2026', startTime: '04:00 PM', duration: '2 Hours' },
  { id: 'mock4', title: 'Q1 Wrap', roomId: 'BLR', location: 'Blr lounge', date: '04 / 01 / 2026', startTime: '01:00 PM', duration: '2 Hours' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [bookingRoom, setBookingRoom] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [globalTimelineDate, setGlobalTimelineDate] = useState('04 / 05 / 2026');
  
  const [bookings, setBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('dibs_bookings');
    if (saved) return JSON.parse(saved);
    return initialBookings;
  });

  useEffect(() => {
    localStorage.setItem('dibs_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleAddBooking = (booking: any) => {
    setBookings((prev) => [...prev, booking]);
  };

  const handleRemoveBooking = (id: string) => {
    setBookings((prev) => prev.filter(b => b.id !== id));
  };
  
  const handleUpdateBooking = (id: string, updated: any) => {
    setBookings((prev) => prev.map(b => b.id === id ? updated : b));
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onNewBooking={() => setBookingRoom({ id: 'new', name: 'Select a Lounge', capacity: 0 })}
        onOpenBot={() => setIsBotOpen(true)}
      />
      
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative pb-24 md:pb-0">
        <TopBar isDark={isDark} toggleDark={() => setIsDark(!isDark)} setCurrentView={setCurrentView} />
        
        {/* Mobile View Routing Node */}
        <div className="md:hidden flex-1 flex flex-col">
           {(currentView === 'home' || currentView === 'lounges') && <MobileHomeView bookings={bookings} onBook={() => setBookingRoom({ id: 'new', name: 'Select a Lounge', capacity: 0 })} onViewAll={() => setCurrentView('profile')} />}
           {currentView === 'profile' && <ProfileView bookings={bookings} onRemove={handleRemoveBooking} onEdit={(b) => setBookingRoom({ isEditing: true, bookingData: b, id: b.roomId, name: b.location, capacity: 0 })} />}
        </div>

        {/* Desktop View Routing Node */}
        <div className="hidden md:flex flex-1 flex-col">
           {currentView === 'lounges' && <LoungesView onBook={(room) => setBookingRoom(room)} />}
           {(currentView === 'home') && <LoungesView onBook={(room) => setBookingRoom(room)} />}
           {currentView === 'timeline' && <TimelineView bookings={bookings} selectedDate={globalTimelineDate} setSelectedDate={setGlobalTimelineDate} />}
           {currentView === 'locator' && <LocatorView />}
           {currentView === 'profile' && <ProfileView bookings={bookings} onRemove={handleRemoveBooking} onEdit={(b) => setBookingRoom({ isEditing: true, bookingData: b, id: b.roomId, name: b.location, capacity: 0 })} />}
        </div>
      </main>
      
      {/* Floating Action Button exclusively for Mobile rendering */}
      <button 
        onClick={() => setBookingRoom({ id: 'new', name: 'Select a Lounge', capacity: 0 })}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-40 transition-transform active:scale-95"
      >
        <span className="text-3xl leading-none font-light mb-1">+</span>
      </button>
      
      <MobileNav currentView={currentView} setCurrentView={setCurrentView} />
      <BookingSidebar room={bookingRoom} onClose={() => setBookingRoom(null)} bookings={bookings} addBooking={handleAddBooking} updateBooking={handleUpdateBooking} />
      <ChatBotModal isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
    </div>
  );
}
