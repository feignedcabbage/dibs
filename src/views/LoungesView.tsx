import { motion } from 'motion/react';
import { AvatarIcon } from '../components/Avatars';

interface Room {
  id: string;
  name: string;
  capacity: number;
}

interface Booking {
  id: string;
  userEmail: string;
  title: string;
  roomId: string;
  location: string;
  date: string;
  startTime: string;
  duration: string;
}

interface LoungesViewProps {
  onBook: (room: Room) => void;
  bookings?: Booking[];
}

const parseTimeToMins = (t: string) => {
  if (!t) return 0;
  const match = t.match(/(\d+):(\d+)\s+(AM|PM)/i);
  if (!match) return 0;
  let [, hStr, mStr, period] = match;
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (period.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

const getDurMins = (d: string) => {
  if (d === '30 Mins') return 30;
  if (d.includes('1.5')) return 90;
  if (d === '1 Hour') return 60;
  if (d === '2 Hours') return 120;
  if (d === '3 Hours') return 180;
  if (d === '4 Hours') return 240;
  return 480;
};

const formatMinsToTime = (mins: number) => {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; 
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
};

export default function LoungesView({ onBook, bookings = [] }: LoungesViewProps) {
  const baseRooms = [
    { id: 'blr', name: 'Blr lounge', location: 'Bengaluru Hub', capacity: 20, type: 'Conference Room', colSpan: 2 },
    { id: 'delhi', name: 'Delhi lounge', location: 'New Delhi', capacity: 3, type: 'Level 2', colSpan: 1 },
    { id: 'mumbai', name: 'Mumbai lounge', location: 'Mumbai West', capacity: 3, type: 'Level 1', colSpan: 1 },
    { id: 'hyd', name: 'Hyd lounge', location: 'Hyderabad', capacity: 3, type: 'Level 3', colSpan: 1 },
    { id: 'dubai', name: 'Dubai lounge', location: 'Dubai DIFC', capacity: 3, type: 'DIFC', colSpan: 1 },
    { id: 'london', name: 'London lounge', location: 'London City', capacity: 3, type: 'City', colSpan: 1 },
    { id: 'sfo', name: 'SFO lounge', location: 'San Francisco', capacity: 3, type: 'Mission', colSpan: 1 },
  ];

  const today = new Date();
  const formatAsDateStr = (d: Date) => {
     const mm = (d.getMonth() + 1).toString().padStart(2, '0');
     const dd = d.getDate().toString().padStart(2, '0');
     const yyyy = d.getFullYear();
     return `${mm} / ${dd} / ${yyyy}`;
  };
  const todayStr = formatAsDateStr(today);
  const currentMins = today.getHours() * 60 + today.getMinutes();

  const getRoomState = (roomId: string) => {
    const todayBookings = bookings.filter(b => b.date === todayStr && b.roomId.toLowerCase() === roomId.toLowerCase());
    
    let ongoingBooking = null;
    let nextBooking = null;

    todayBookings.forEach(b => {
      const start = parseTimeToMins(b.startTime);
      const end = start + getDurMins(b.duration);
      if (currentMins >= start && currentMins < end) {
        ongoingBooking = { ...b, start, end };
      } else if (start > currentMins) {
        if (!nextBooking || start < nextBooking.start) {
          nextBooking = { ...b, start, end };
        }
      }
    });

    if (ongoingBooking) {
       const progressRaw = ((currentMins - ongoingBooking.start) / (ongoingBooking.end - ongoingBooking.start)) * 100;
       return {
         status: 'In Use',
         title: ongoingBooking.title,
         userName: (ongoingBooking as any).userName,
         userAvatar: (ongoingBooking as any).userAvatar,
         freeAt: formatMinsToTime(ongoingBooking.end),
         progress: Math.min(Math.max(progressRaw, 5), 100) 
       }
    } else {
       let availableTill = 'Available till EOD';
       if (currentMins >= 19 * 60 || currentMins < 10 * 60) {
          availableTill = 'Available from 10:00 AM';
       } else if (nextBooking) {
          availableTill = `Available till ${nextBooking.startTime}`;
       }
       return {
         status: 'Available',
         availableTill
       }
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-6 flex-1 flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold font-headline text-on-surface tracking-tighter">Room Booking</h2>
        <p className="text-on-surface-variant font-medium">Real-time availability for Global Office hubs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {baseRooms.map(room => {
          const state = getRoomState(room.id);
          
          return (
            <div 
              key={room.id}
              onClick={() => onBook(room)}
              className={`group bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-outline-variant/15 relative overflow-hidden cursor-pointer ${room.colSpan === 2 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                <div className="min-w-0 pr-2">
                  <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block truncate">{room.location}</span>
                  <h3 className={`font-bold font-headline text-on-surface truncate ${room.colSpan === 2 ? 'text-2xl' : 'text-xl'}`}>{room.name}</h3>
                  <p className="text-sm text-on-surface-variant font-medium truncate">{room.type === 'Conference Room' ? `${room.type} • Cap ${room.capacity}` : `Cap ${room.capacity}`}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-[0.7rem] font-bold flex-shrink-0 ${state.status === 'In Use' ? 'bg-secondary text-on-secondary' : 'bg-primary-container text-on-primary-container'}`}>
                  {state.status}
                </span>
              </div>

              <div className="mt-auto relative z-10 pt-4 w-full">
                {state.status === 'In Use' ? (
                   <>
                     <div className="flex justify-between items-center text-[0.65rem] sm:text-xs font-bold text-on-surface-variant mb-2 gap-2">
                       {state.userAvatar && (
                         <div className="w-5 h-5 flex-shrink-0 bg-surface-container-lowest rounded-full border border-outline-variant/30 overflow-hidden hidden sm:block p-0.5">
                           <AvatarIcon type={state.userAvatar} />
                         </div>
                       )}
                       <div className="flex flex-col flex-1 min-w-0">
                         {state.userName && <span className="truncate italic text-[9px] text-primary/80 leading-none mb-0.5">{state.userName}</span>}
                         <span className="truncate max-w-full leading-tight">{state.title}</span>
                       </div>
                       <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md whitespace-nowrap hidden sm:block">Free at {state.freeAt}</span>
                     </div>
                     <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                       <div className="h-full primary-gradient rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${state.progress}%` }}></div>
                     </div>
                   </>
                ) : (
                   <>
                     <div className="mb-2">
                       <span className="bg-primary/15 text-primary text-[0.65rem] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md inline-block">{state.availableTill}</span>
                     </div>
                     <button className="w-full py-2 bg-surface-container-low text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors">Quick Reserve</button>
                   </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  );
}
