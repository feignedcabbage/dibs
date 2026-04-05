import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomDropdown({ options, defaultValue, onChange }: { options: string[], defaultValue?: string, onChange?: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
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
        className="flex items-center justify-between w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 text-sm font-medium text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
      >
        <span>{selectedOption}</span>
        <ChevronDown size={20} className={`text-on-surface-variant transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-full max-h-48 overflow-y-auto bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/15 z-50 py-2 scroll-hide"
          >
            {options.map(option => (
              <div 
                key={option}
                onClick={() => { 
                   setSelectedOption(option); 
                   onChange?.(option);
                   setIsOpen(false); 
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-surface-container-high transition-colors ${selectedOption === option ? 'text-primary font-bold bg-primary/10' : 'text-on-surface'}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
