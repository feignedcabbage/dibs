import { Moon, Sun, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface TopBarProps {
  isDark: boolean;
  toggleDark: () => void;
  setCurrentView?: (view: string) => void;
}

export default function TopBar({ isDark, toggleDark, setCurrentView }: TopBarProps) {
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
        <span className="text-xl font-bold text-primary font-headline tracking-tight">DIBS</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm font-bold text-on-surface-variant mr-2">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleDark} className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden ml-2 border-2 border-primary-container hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIapWppmYmIlfgQsmJ3hIURfAi4dC_txh4deGwl5lhkDNPMEE3JwjB-_cD9d-5khtgnbjAC1fFjPMrHKDdQJzt_3GSrvEVYzNeUHbJuibNkKvTFpIfssSl5EJUXdGD8XpVZUHf_4zky5pUE1cq_bASSQ7Ed9GEtePy-RhlLMmAhAzRowy3YEBtQOJ_6jg20uSUCiMfyGPOvloOOR1LJc0x-3WA7G2uVdZ_82yoDq61YIZ87dVkZ5ipugdSl4Mk307nejIfPPF68CRJ" 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-12 right-0 min-w-[200px] bg-surface-container-lowest border border-outline-variant/20 shadow-2xl rounded-xl overflow-hidden py-2"
                >
                  <button 
                    onClick={() => {
                      if (setCurrentView) setCurrentView('profile');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-surface-container-low font-bold text-sm text-on-surface transition-colors"
                  >
                    <User size={18} className="text-on-surface-variant" /> My Meetings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
