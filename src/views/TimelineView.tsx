import { CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import CustomDatePicker from '../components/CustomDatePicker';

interface Booking {
  id: string;
  date: string;
  roomId: string;
  startTime: string;
  duration: string;
  title: string;
}

interface TimelineViewProps {
  bookings?: Booking[];
  selectedDate: string;
  setSelectedDate: (v: string) => void;
}

export default function TimelineView({ bookings = [], selectedDate, setSelectedDate }: TimelineViewProps) {
  const lounges = [
    { id: 'Blr', label: 'Blr lounge', desc: 'Conf. Room • Cap. 20' },
    { id: 'Delhi', label: 'Delhi lounge', desc: 'Level 2 • Cap. 3' },
    { id: 'Mumbai', label: 'Mumbai lounge', desc: 'Level 1 • Cap. 3' },
    { id: 'Hyd', label: 'Hyd lounge', desc: 'Level 3 • Cap. 3' },
    { id: 'Dubai', label: 'Dubai lounge', desc: 'DIFC • Cap. 3' },
    { id: 'London', label: 'LONDON', desc: 'City • Cap. 3' },
    { id: 'SFO', label: 'SFO', desc: 'Mission • Cap. 3' },
  ];

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

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-6 flex-1 max-w-full overflow-x-hidden"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Archive Utilization</span>
          <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tighter">Timeline</h1>
        </div>
        <div className="relative w-[280px] z-40">
          <CustomDatePicker defaultValue={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/15 overflow-x-auto">
        <div className="min-w-max">
            {/* Timeline Headers */}
            <div className="flex border-b border-outline-variant/15 bg-surface-container-low/50">
              <div className="w-48 flex-shrink-0 p-5 border-r border-outline-variant/15 sticky left-0 z-20 bg-surface-container-low/95 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Lounge Hubs</span>
              </div>
              <div className="flex-1 flex w-[900px]">
                  {['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'].map(time => (
                    <div key={time} className="flex-1 text-center py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-wider">{time}</div>
                  ))}
              </div>
            </div>

            {/* Schedule Rows */}
            <div className="divide-y divide-outline-variant/15">
              {lounges.map((lounge, index) => {
                 const roomBookings = bookings.filter(b => b.date === selectedDate && b.roomId.toUpperCase() === lounge.id.toUpperCase());

                 return (
                  <div key={lounge.id} className="flex group relative">
                    <div className="w-48 flex-shrink-0 p-6 border-r border-outline-variant/15 bg-surface-container-lowest transition-colors group-hover:bg-surface-container-low sticky left-0 z-10">
                      <h3 className="text-sm font-bold font-headline text-on-surface truncate">{lounge.label}</h3>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter truncate">{lounge.desc}</p>
                    </div>
                    <div className="flex-1 relative w-[900px] h-20 overflow-hidden group-hover:bg-surface-container-lowest/50 transition-colors">
                       {roomBookings.map(b => {
                          const startMins = parseTimeToMinutes(b.startTime);
                          const durMins = getDurationMinutes(b.duration);
                          // 10 AM = 600 mins. 10 hours = 600 mins total window (10AM to 8PM -> End bounding)
                          let leftPercent = ((startMins - 600) / 600) * 100;
                          let widthPercent = (durMins / 600) * 100;
                          
                          if (leftPercent < 0) {
                             widthPercent += leftPercent;
                             leftPercent = 0;
                          }
                          if (leftPercent + widthPercent > 100) {
                             widthPercent = 100 - leftPercent;
                          }
                          
                          if (widthPercent <= 0 || leftPercent >= 100) return null;

                          return (
                            <div key={b.id} className="absolute top-2 bottom-2 bg-error/10 rounded-xl border-l-4 border-error p-3 flex flex-col justify-center overflow-hidden z-0 pointer-events-none" style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}>
                              {durMins <= 30 ? (
                                <span className="text-[10px] font-bold text-on-surface leading-tight">
                                  Booked by <span className="text-error">{(b as any).userName?.split(' ')[0] || 'User'}</span>
                                </span>
                              ) : (
                                <>
                                  <span className="text-xs font-semibold text-on-surface truncate">{b.title}</span>
                                  {(b as any).userName && <span className="text-[8px] font-medium text-on-surface-variant truncate opacity-80 mt-0.5">by {(b as any).userName}</span>}
                                </>
                              )}
                            </div>
                          )
                       })}
                    </div>
                  </div>
                 )
              })}
            </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex gap-6 items-center justify-end pb-32">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error/20 border border-error/40"></div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Occupied</span>
        </div>
      </div>
    </motion.section>
  );
}
