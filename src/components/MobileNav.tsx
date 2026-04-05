import { LayoutGrid, List } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function MobileNav({ currentView, setCurrentView }: MobileNavProps) {
  const navItems = [
    { id: 'home', icon: LayoutGrid, label: 'Home' },
    { id: 'mymeetings', icon: List, label: 'My Meetings' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface flex justify-around items-center py-3 px-2 z-[60] border-t border-surface-container-high">
      {navItems.map((item) => {
        const isActive = currentView === item.id || (item.id === 'home' && currentView === 'lounges');
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <Icon size={20} />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
