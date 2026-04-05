import { Moon, Sun, Settings, Github } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AvatarIcon } from './Avatars';

interface TopBarProps {
  isDark: boolean;
  toggleDark: () => void;
  setCurrentView?: (view: string) => void;
  userProfile?: any;
}

export default function TopBar({ isDark, toggleDark, setCurrentView, userProfile }: TopBarProps) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const clickOutside = (e: MouseEvent) => {
       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
       }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-surface-container-high transition-colors duration-300">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold text-primary font-headline tracking-tight md:hidden">DIBS</span>
        <span className="text-xl font-bold text-primary font-headline tracking-tight hidden md:block">
          Hello, {(userProfile?.name?.split(' ')[0] || 'there').charAt(0).toUpperCase() + (userProfile?.name?.split(' ')[0] || 'there').slice(1)}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm font-bold text-on-surface-variant mr-2">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/feignedcabbage/dibs" target="_blank" rel="noreferrer" className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors hidden sm:block">
            <Github size={20} />
          </a>
          <button onClick={toggleDark} className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setCurrentView?.('profile')}
            className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden ml-2 border-2 border-primary-container hover:opacity-80 transition-transform active:scale-95 hover:scale-105 flex items-center justify-center p-0.5 relative z-[60]"
          >
            <AvatarIcon type={userProfile?.avatar || 'dog'} />
          </button>
        </div>
      </div>
    </header>
  );
}
