import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import BookingSidebar from './components/BookingSidebar';
import LoungesView from './views/LoungesView';
import TimelineView from './views/TimelineView';
import LocatorView from './views/LocatorView';
import ProfileView from './views/ProfileView';
import MyMeetingsView from './views/MyMeetingsView';
import MobileHomeView from './views/MobileHomeView';
import ChatBotModal from './components/ChatBotModal';
import LoginView from './views/LoginView';
import { fetchBookings, createBooking, deleteBooking, updateBooking, fetchUserProfile, updateUserProfile, deleteUserProfile } from './api';

const initialBookings = [
  { id: 'mock1', title: 'Product Review', roomId: 'DELHI', location: 'Delhi lounge', date: '04 / 05 / 2026', startTime: '11:00 AM', duration: '1 Hour' },
  { id: 'mock2', title: 'Design Sync', roomId: 'MUMBAI', location: 'Mumbai lounge', date: '04 / 06 / 2026', startTime: '02:00 PM', duration: '1 Hour' },
  { id: 'mock3', title: 'Post-Mortem', roomId: 'SFO', location: 'SFO lounge', date: '04 / 08 / 2026', startTime: '04:00 PM', duration: '2 Hours' },
  { id: 'mock4', title: 'Q1 Wrap', roomId: 'BLR', location: 'Blr lounge', date: '04 / 01 / 2026', startTime: '01:00 PM', duration: '2 Hours' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('dibs_user'));
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('dibs_view') || 'profile');
  const [bookingRoom, setBookingRoom] = useState<any>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('dibs_isDark');
    return saved !== null ? saved === 'true' : true;
  });
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [globalTimelineDate, setGlobalTimelineDate] = useState(() => {
     const today = new Date();
     const mm = (today.getMonth() + 1).toString().padStart(2, '0');
     const dd = today.getDate().toString().padStart(2, '0');
     const yyyy = today.getFullYear();
     return `${mm} / ${dd} / ${yyyy}`;
  });
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Authenticated Bootstrap Logic
  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem('dibs_user', currentUser);
    
    setIsLoading(true);
    
    Promise.all([
      fetchUserProfile(currentUser).then(p => setUserProfile(p)).catch(() => setUserProfile({ email: currentUser, name: currentUser.split('@')[0].replace('.', ' '), avatar: 'dog' })),
      fetchBookings().then(data => setBookings(data)).catch(err => {
         console.warn("Failed connecting to dibstg.duckdns.org backend — Falling back to static cache.", err);
         setBookings(initialBookings);
      })
    ]).finally(() => setIsLoading(false));
  }, [currentUser]);

  const handleUpdateProfile = async (profileData: any) => {
    try {
      const enriched = { ...profileData, email: currentUser };
      await updateUserProfile(enriched);
      setUserProfile((prev: any) => ({ ...prev, ...profileData }));
      setBookings(prev => prev.map(b => b.userEmail === currentUser ? { ...b, userName: profileData.name } : b));
    } catch(e) {
      console.warn("Failed to update profile", e);
    }
  };

  const handleDeleteProfile = async () => {
    if (!currentUser) return;
    try {
      await deleteUserProfile(currentUser);
      setCurrentUser(null);
      localStorage.removeItem('dibs_user');
      setBookings(prev => prev.filter(b => b.userEmail !== currentUser));
      setUserProfile(null);
    } catch(e) {
      console.warn("Failed to delete profile", e);
    }
  };

  const handleAddBooking = async (booking: any) => {
    const enrichedBooking = { ...booking, userEmail: currentUser };
    try {
      await createBooking(enrichedBooking);
      setBookings((prev) => [...prev, enrichedBooking]);
    } catch(e) {
      console.warn("Backend Write failed, optimistically adding locally.", e);
      setBookings((prev) => [...prev, enrichedBooking]);
    }
  };

  const handleRemoveBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter(b => b.id !== id));
    } catch(e) {
      console.warn("Backend Delete failed, optimistically dropping locally.", e);
      setBookings((prev) => prev.filter(b => b.id !== id));
    }
  };
  
  const handleUpdateBooking = async (id: string, updated: any) => {
    try {
      await updateBooking(id, updated);
      setBookings((prev) => prev.map(b => b.id === id ? updated : b));
    } catch(e) {
      console.warn("Backend Update failed, optimistically modifying locally.", e);
      setBookings((prev) => prev.map(b => b.id === id ? updated : b));
    }
  };

  useEffect(() => {
    localStorage.setItem('dibs_isDark', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('dibs_view', currentView);
  }, [currentView]);

  if (!currentUser) return <LoginView onLogin={setCurrentUser} />;

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onNewBooking={() => setBookingRoom({ id: 'new', name: 'Select a Lounge', capacity: 0 })}
        onOpenBot={() => setIsBotOpen(true)}
      />
      
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative pb-24 md:pb-0">
        <TopBar isDark={isDark} toggleDark={() => setIsDark(!isDark)} setCurrentView={setCurrentView} userProfile={userProfile} />
        
        {/* Mobile View Routing Node */}
        <div className="md:hidden flex-1 flex flex-col">
           {(currentView === 'home' || currentView === 'lounges') && <MobileHomeView bookings={bookings} onBook={() => setBookingRoom({ id: 'new', name: 'Select a Lounge', capacity: 0 })} onViewAll={() => setCurrentView('mymeetings')} />}
           {currentView === 'profile' && <ProfileView userProfile={userProfile} onUpdateProfile={handleUpdateProfile} onDeleteProfile={handleDeleteProfile} />}
           {currentView === 'mymeetings' && <MyMeetingsView bookings={bookings} onRemove={handleRemoveBooking} onEdit={(b) => setBookingRoom({ isEditing: true, bookingData: b, id: b.roomId, name: b.location, capacity: 0 })} />}
        </div>

        {/* Desktop View Routing Node */}
        <div className="hidden md:flex flex-1 flex-col">
           {currentView === 'lounges' && <LoungesView bookings={bookings} onBook={(room) => setBookingRoom(room)} />}
           {(currentView === 'home') && <LoungesView bookings={bookings} onBook={(room) => setBookingRoom(room)} />}
           {currentView === 'timeline' && <TimelineView bookings={bookings} selectedDate={globalTimelineDate} setSelectedDate={setGlobalTimelineDate} />}
           {currentView === 'locator' && <LocatorView onBook={(room) => setBookingRoom(room)} />}
           {currentView === 'profile' && <ProfileView userProfile={userProfile} onUpdateProfile={handleUpdateProfile} onDeleteProfile={handleDeleteProfile} />}
           {currentView === 'mymeetings' && <MyMeetingsView bookings={bookings} onRemove={handleRemoveBooking} onEdit={(b) => setBookingRoom({ isEditing: true, bookingData: b, id: b.roomId, name: b.location, capacity: 0 })} />}
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
