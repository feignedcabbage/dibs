import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomDatePicker({ defaultValue = '04 / 05 / 2026', onChange }: { defaultValue?: string, onChange?: (val: string) => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 cursor-pointer hover:bg-surface-container-high transition-colors"
      >
        <CalendarIcon size={20} className="text-primary" />
        <span className="text-sm font-medium text-on-surface">{selectedDate}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-[280px] bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/15 z-50 p-4 font-sans"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <button className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"><ChevronLeft size={18} /></button>
              <button className="text-on-surface text-sm font-medium border border-outline-variant/20 rounded px-3 py-1 flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                April 2026 <span className="text-[10px]">▼</span>
              </button>
              <button className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"><ChevronRight size={18} /></button>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                <div key={d} className={`text-xs font-medium ${i === 0 || i === 6 ? 'text-error' : 'text-on-surface-variant'}`}>{d}</div>
              ))}
            </div>

            {/* Dates grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm">
              {[28, 29, 30].map(d => <div key={`prev-${d}`} className="text-error/50 py-1">{d}</div>)}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => {
                const isWeekend = (d + 3) % 7 === 0 || (d + 3) % 7 === 6;
                const parseDay = parseInt(selectedDate.split('/')[1]?.trim(), 10) || -1;
                const isSelected = d === parseDay;
                
                const slotDate = new Date(2026, 3, d, 23, 59, 59);
                const isPastDate = slotDate < new Date();
                
                return (
                  <div 
                    key={d} 
                    onClick={() => { 
                      if (isPastDate) return;
                      const newDate = `04 / ${d.toString().padStart(2, '0')} / 2026`;
                      setSelectedDate(newDate); 
                      onChange?.(newDate);
                      setIsOpen(false); 
                    }}
                    className={`py-1 rounded transition-colors ${
                      isPastDate ? 'opacity-30 cursor-not-allowed text-on-surface-variant line-through decoration-error/50' :
                      isSelected 
                        ? 'bg-primary text-on-primary font-bold ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest cursor-pointer' 
                        : isWeekend ? 'text-error hover:bg-surface-container-high cursor-pointer' : 'text-on-surface hover:bg-surface-container-high cursor-pointer'
                    }`}
                  >
                    {d}
                  </div>
                )
              })}
              {[1, 2, 3, 4, 5, 6, 7, 8].map(d => {
                const isWeekend = (d + 6) % 7 === 0 || (d + 6) % 7 === 6;
                return <div key={`next-${d}`} className={`py-1 ${isWeekend ? 'text-error/50' : 'text-on-surface/30'}`}>{d}</div>
              })}
            </div>

            <div className="mt-4">
              <button className="text-on-surface text-xs font-bold border border-outline-variant/20 rounded px-4 py-1.5 hover:bg-surface-container-high transition-colors">
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
