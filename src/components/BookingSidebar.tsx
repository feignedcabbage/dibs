import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import CustomDropdown from './CustomDropdown';

interface Room {
  id: string;
  name: string;
  capacity: number;
}

const parseTimeToMinutes = (timeStr: string) => {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
  if (!match) return 0;
  let [, h, m, period] = match;
  let hours = parseInt(h, 10);
  let minutes = parseInt(m, 10);
  if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const getDurationMinutes = (durationStr: string) => {
  if (durationStr === '30 Mins') return 30;
  if (durationStr.includes('1.5')) return 90;
  if (durationStr === '1 Hour') return 60;
  if (durationStr === '2 Hours') return 120;
  if (durationStr === '3 Hours') return 180;
  if (durationStr === '4 Hours') return 240;
  if (durationStr === 'All Day') return 480;
  return 60;
};

const loungeOptions = ['Blr lounge (Cap: 20)', 'Delhi lounge (Cap: 3)', 'Mumbai lounge (Cap: 3)', 'Hyd lounge (Cap: 3)', 'Dubai lounge (Cap: 3)', 'London lounge (Cap: 3)', 'SFO lounge (Cap: 3)'];
const durationOptions = ['30 Mins', '1 Hour', '1.5 Hours', '2 Hours', '3 Hours', '4 Hours', 'All Day'];

export default function BookingSidebar({ room, onClose, bookings = [], addBooking, updateBooking }: any) {
  const [title, setTitle] = useState('');
  const [selectedLounge, setSelectedLounge] = useState(loungeOptions[0]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [duration, setDuration] = useState('1 Hour');
  const [error, setError] = useState('');
  const [autoUpdatedNote, setAutoUpdatedNote] = useState(false);

  useEffect(() => {
    if (room?.isEditing && room.bookingData) {
      setTitle(room.bookingData.title);
      setDate(room.bookingData.date);
      setStartTime(room.bookingData.startTime);
      setDuration(room.bookingData.duration);
      setAutoUpdatedNote(false);
      const found = loungeOptions.find(o => o.toLowerCase().includes(room.bookingData.roomId.toLowerCase()));
      if (found) setSelectedLounge(found);
    } else {
      setTitle('');
      setDuration('1 Hour');
      setError('');
      setAutoUpdatedNote(false);
      
      let initialLounge = loungeOptions[0];
      if (room && room.id !== 'new') {
        const found = loungeOptions.find(o => o.toLowerCase().includes(room.name.toLowerCase()));
        if (found) initialLounge = found;
      }
      setSelectedLounge(initialLounge);
      
      // Auto-jump logic to find next available date
      const today = new Date();
      const formatAsDateStr = (d: Date) => {
         const mm = (d.getMonth() + 1).toString().padStart(2, '0');
         const dd = d.getDate().toString().padStart(2, '0');
         const yyyy = d.getFullYear();
         return `${mm} / ${dd} / ${yyyy}`;
      };

      const checkAvailability = (testDate: string, loungePref: string) => {
        const allTimes = [
          '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
          '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'
        ];
        const [mm, dd, yyyy] = testDate.split('/').map(s => parseInt(s.trim(), 10));
        
        return allTimes.filter(time => {
          const startMins = parseTimeToMinutes(time);
          const slotDate = new Date(yyyy, mm - 1, dd, Math.floor(startMins / 60), startMins % 60);
          if (slotDate < new Date()) return false;
          
          const hasCollision = bookings.some((b: any) => {
            if (b.date === testDate && b.roomId.toLowerCase() === loungePref.split(' ')[0].toLowerCase()) {
               const bStart = parseTimeToMinutes(b.startTime);
               const bEnd = bStart + getDurationMinutes(b.duration);
               return startMins < bEnd && (startMins + 60) > bStart; // Check against 1 hr block
            }
            return false;
          });
          return !hasCollision;
        });
      };

      let d = new Date(today);
      let foundDateStr = formatAsDateStr(d);
      let foundTimeStr = '';
      
      for (let i = 0; i < 30; i++) {
        const checkStr = formatAsDateStr(d);
        const availTimes = checkAvailability(checkStr, initialLounge);
        if (availTimes.length > 0) {
           foundDateStr = checkStr;
           foundTimeStr = availTimes[0];
           break;
        }
        d.setDate(d.getDate() + 1);
      }
      
      setDate(foundDateStr);
      setStartTime(foundTimeStr || '10:00 AM');
      if (foundDateStr !== formatAsDateStr(today)) {
        setAutoUpdatedNote(true);
      }
    }
  }, [room, bookings]);

  const handleConfirm = () => {
    setError('');
    
    if (!title.trim()) {
      setError('Please provide a meeting title.');
      return;
    }

    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = startMinutes + getDurationMinutes(duration);
    
    const [mm, dd, yyyy] = date.split('/').map(s => parseInt(s.trim(), 10));
    const hours = Math.floor(startMinutes / 60);
    const mins = startMinutes % 60;
    
    const selectedDateTime = new Date(yyyy, mm - 1, dd, hours, mins);
    const now = new Date();
    
    if (selectedDateTime < now) {
      setError('Cannot book meetings in the past. Please check the date and time.');
      return;
    }
    
    const currentRoomId = room?.id === 'new' || room?.isEditing ? selectedLounge.split('(')[0].trim() : room.name;
    const currentRoomIdPrefix = room?.id === 'new' || room?.isEditing ? selectedLounge.split(' ')[0] : room.id;
    
    const hasCollision = bookings.some((b: any) => {
      if (room?.isEditing && b.id === room.bookingData.id) return false;

      if (b.date === date && b.roomId.toLowerCase() === currentRoomIdPrefix.toLowerCase()) {
         const bStart = parseTimeToMinutes(b.startTime);
         const bEnd = bStart + getDurationMinutes(b.duration);
         return startMinutes < bEnd && endMinutes > bStart;
      }
      return false;
    });

    if (hasCollision) {
      setError('This room is already booked for that time. Please pick another slot.');
      return;
    }

    if (room?.isEditing) {
      updateBooking(room.bookingData.id, {
        id: room.bookingData.id,
        title,
        roomId: currentRoomIdPrefix.toUpperCase(),
        location: currentRoomId,
        date,
        startTime,
        duration
      });
    } else {
      addBooking({
        id: Math.random().toString(36).substring(7),
        title,
        roomId: currentRoomIdPrefix.toUpperCase(),
        location: currentRoomId,
        date,
        startTime,
        duration
      });
    }

    onClose();
  };

  const getDisabledTimes = () => {
    const currentRoomIdPrefix = room?.id === 'new' || room?.isEditing ? selectedLounge.split(' ')[0] : room.id;
    const roomBookings = bookings.filter((b: any) => {
      if (room?.isEditing && b.id === room.bookingData.id) return false;
      return b.date === date && b.roomId.toLowerCase() === currentRoomIdPrefix.toLowerCase();
    });

    const occupiedSlots = new Set<string>();
    const allTimes = [
      '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'
    ];

    roomBookings.forEach((b: any) => {
      const bStart = parseTimeToMinutes(b.startTime);
      const bEnd = bStart + getDurationMinutes(b.duration);
      
      allTimes.forEach(time => {
        const tMins = parseTimeToMinutes(time);
        // If the slot start time falls within another booking's range, it's occupied.
        if (tMins >= bStart && tMins < bEnd) {
          occupiedSlots.add(time);
        }
      });
    });

    return Array.from(occupiedSlots);
  };

  return (
    <AnimatePresence>
      {room && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[70] md:z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container-lowest shadow-2xl z-[70] md:z-50 flex flex-col border-l border-outline-variant/15"
          >
            <div className="p-6 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/50">
              <div className="flex-1">
                {room.isEditing ? (
                   <h2 className="text-2xl font-bold font-headline text-on-surface">Reschedule</h2>
                ) : room.id === 'new' ? (
                  <h2 className="text-2xl font-bold font-headline text-on-surface">New Booking</h2>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold font-headline text-on-surface">{room.name}</h2>
                    <p className="text-sm text-on-surface-variant font-medium">Capacity: {room.capacity}</p>
                  </>
                )}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Meeting Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q3 Roadmap Review" 
                  className="w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 text-sm font-medium text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>

              {autoUpdatedNote && (room?.id === 'new' || (room && !room.isEditing)) && (
                <div className="bg-primary-container text-on-primary-container p-3 rounded-xl border border-primary/20 text-xs font-bold flex items-start gap-3 shadow-sm mb-4">
                  <Info size={16} className="mt-0.5 flex-shrink-0" />
                  <p>We've automatically skipped ahead to the next available date because all earlier slots are totally booked up or past.</p>
                </div>
              )}

              {(room?.id === 'new' || room?.isEditing) && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Select Lounge</label>
                  <CustomDropdown options={loungeOptions} onChange={setSelectedLounge} defaultValue={selectedLounge} />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Date</label>
                <CustomDatePicker defaultValue={date} onChange={setDate} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Start Time</label>
                  <CustomTimePicker date={date} defaultValue={startTime} onChange={setStartTime} disabledTimes={getDisabledTimes()} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Duration</label>
                  <CustomDropdown options={durationOptions} defaultValue={duration} onChange={setDuration} />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-outline-variant/15 bg-surface-container-low/50">
              {error && <div className="mb-4 text-xs font-bold text-error bg-error/10 p-3 rounded-xl border border-error/20">{error}</div>}
              <button onClick={handleConfirm} className="w-full primary-gradient text-on-primary py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                {room.isEditing ? 'Save Changes' : 'Confirm Booking'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
