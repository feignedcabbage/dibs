import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const allTimes = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM'
];

const morningTimes = allTimes.filter(t => t.endsWith('AM'));
const afternoonTimes = allTimes.filter(t => t.endsWith('PM') && (t.startsWith('12') || parseInt(t.split(':')[0]) < 4));
const eveningTimes = allTimes.filter(t => t.endsWith('PM') && (parseInt(t.split(':')[0]) >= 4 && parseInt(t.split(':')[0]) !== 12));

export default function CustomTimePicker({ defaultValue, align = 'left', onChange, date = '04 / 05 / 2026', disabledTimes = [] }: { defaultValue: string, align?: 'left' | 'right', onChange?: (val: string) => void, date?: string, disabledTimes?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultValue);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedTime(defaultValue);
  }, [defaultValue]);

  const [mm, dd, yyyy] = date.split('/').map(s => parseInt(s.trim(), 10));
  const now = new Date();

  const renderTimeBlock = (timesToRender: string[]) => {
    return timesToRender.map(time => {
      const match = time.match(/(\d+):(\d+)\s+(AM|PM)/i);
      let isPast = false;
      const isOccupied = disabledTimes.some(dt => dt.toLowerCase().replace(/\s+/g, '') === time.toLowerCase().replace(/\s+/g, ''));

      if (match) {
        let [, h, m, period] = match;
        let hours = parseInt(h, 10);
        if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
        if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
        const slotDate = new Date(yyyy, mm - 1, dd, hours, parseInt(m, 10));
        isPast = slotDate < now;
      }
      
      const isDisabled = isPast || isOccupied;
      return (
        <button
          key={time}
          disabled={isDisabled}
          onClick={(e) => { 
              e.preventDefault(); 
              setSelectedTime(time); 
              onChange?.(time);
              setIsOpen(false); 
          }}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all ${
            isDisabled ? 'opacity-30 cursor-not-allowed text-on-surface-variant line-through decoration-error/50' :
            selectedTime === time
              ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest'
              : 'hover:bg-surface-container-high text-on-surface'
          }`}
        >
          {time}
        </button>
      )
    });
  }

  return (
    <div className="relative" ref={popoverRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 cursor-pointer hover:bg-surface-container-high transition-colors"
      >
        <Clock size={20} className="text-primary" />
        <span className="text-sm font-medium text-on-surface">{selectedTime}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute top-full ${align === 'left' ? 'left-0' : 'right-0'} mt-2 w-[340px] bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/15 z-50 p-4 font-sans`}
          >
            <div className="mb-4">
              <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2 border-b border-outline-variant/20 pb-1">Morning</h4>
              <div className="grid grid-cols-4 gap-2">
                {renderTimeBlock(morningTimes)}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2 border-b border-outline-variant/20 pb-1">Afternoon</h4>
              <div className="grid grid-cols-4 gap-2">
                {renderTimeBlock(afternoonTimes)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2 border-b border-outline-variant/20 pb-1">Evening</h4>
              <div className="grid grid-cols-4 gap-2">
                {renderTimeBlock(eveningTimes)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
