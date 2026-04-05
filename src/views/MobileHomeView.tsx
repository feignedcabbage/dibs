import { Calendar, Plus, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from './MyMeetingsView';

export default function MobileHomeView({ userProfile, bookings = [], onBook, onViewAll }: { userProfile?: any, bookings?: Booking[], onBook: () => void, onViewAll: () => void }) {
  const now = new Date();
  
  const upcoming = [...bookings]
    .filter(b => {
      const d = b.date.replace(/\s+/g, '');
      return new Date(`${d} ${b.startTime}`) >= now;
    })
    .sort((a, b) => {
      const da = new Date(`${a.date.replace(/\s+/g, '')} ${a.startTime}`).getTime();
      const db = new Date(`${b.date.replace(/\s+/g, '')} ${b.startTime}`).getTime();
      return da - db;
    })
    .slice(0, 3);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1 pb-24 px-6 pt-10"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
          Hello {userProfile?.name ? (userProfile.name.split(' ')[0].charAt(0).toUpperCase() + userProfile.name.split(' ')[0].slice(1)) : ''}!
        </h1>
        <p className="text-on-surface-variant font-medium text-sm">Welcome to DIBS meeting scheduling.</p>
      </div>

      <button
        onClick={onBook}
        className="w-full bg-primary text-on-primary py-6 rounded-3xl shadow-xl shadow-primary/20 flex flex-col items-center justify-center gap-3 mb-12 hover:opacity-95 transition-opacity active:scale-[0.98]"
      >
        <div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center">
          <Plus size={28} />
        </div>
        <span className="font-bold text-lg">Book a Meeting</span>
      </button>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold font-headline tracking-tight text-on-surface">Upcoming</h2>
          {upcoming.length > 0 && (
            <button onClick={onViewAll} className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          )}
        </div>

        {upcoming.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
              <Calendar size={28} className="text-on-surface-variant/50" />
            </div>
            <p className="text-sm font-bold text-on-surface-variant">No upcoming meetings.</p>
            <p className="text-xs text-on-surface-variant/70 mt-1">Ready for a free schedule!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map(b => (
              <div key={b.id} className="bg-surface-container-lowest border border-outline-variant/15 rounded-[2rem] p-5 shadow-sm">
                <h3 className="text-lg font-bold font-headline text-on-surface mb-3 truncate">{b.title}</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 w-max px-3 py-1.5 rounded-lg">
                    <Clock size={14} />
                    <span>{b.date} • {b.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                    <MapPin size={14} />
                    <span>{b.roomId} - {b.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
