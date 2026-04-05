import { LayoutGrid, Calendar, Map, BarChart2, Archive, HelpCircle, Bot } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onNewBooking: () => void;
  onOpenBot?: () => void;
}

export default function Sidebar({ currentView, setCurrentView, onNewBooking, onOpenBot }: SidebarProps) {
  const navItems = [
    { id: 'lounges', icon: LayoutGrid, label: 'Lounges' },
    { id: 'timeline', icon: Calendar, label: 'Timeline' },
    { id: 'locator', icon: Map, label: 'Locator' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen p-4 border-r border-surface-container-high bg-surface-container-low w-64 fixed left-0 top-0 z-50 transition-colors duration-300">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold text-primary font-headline tracking-tight">DIBS</h1>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1 leading-tight">Reserve meeting rooms at TripGain's BCIT office</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-surface-container-lowest text-primary shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto space-y-1 pt-4">
        <button onClick={onNewBooking} className="primary-gradient text-on-primary w-full py-3 px-4 rounded-full font-semibold text-sm mb-6 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
          New Booking
        </button>
        <button onClick={onOpenBot} className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-3 text-sm font-medium hover:bg-surface-container-high rounded-full transition-all text-primary">
          <Bot size={20} />
          <span>AI Assistant</span>
        </button>
      </div>
    </aside>
  );
}
