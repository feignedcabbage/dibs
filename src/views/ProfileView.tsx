import { motion } from 'motion/react';
import { Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AvatarIcon } from '../components/Avatars';

export interface Booking {
  id: string;
  title: string;
  roomId: string;
  location: string;
  date: string;
  startTime: string;
  duration: string;
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

const formatGap = (gapMinutes: number) => {
  const hrs = Math.floor(gapMinutes / 60);
  const mins = gapMinutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} min${mins > 1 ? 's' : ''}`;
  if (hrs > 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${mins} min${mins > 1 ? 's' : ''}`;
};

export default function ProfileView({ bookings = [], onRemove, onEdit, userProfile, onUpdateProfile, onDeleteProfile }: { bookings?: Booking[], onRemove?: (id: string) => void, onEdit?: (b: Booking) => void, userProfile?: any, onUpdateProfile?: (d: any) => void, onDeleteProfile?: () => void }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('dog');
  const now = new Date();
  
  useEffect(() => {
    if (userProfile && !isEditingProfile) {
      setEditName(userProfile.name || '');
      setEditAvatar(userProfile.avatar || 'dog');
    }
  }, [userProfile, isEditingProfile]);

  const handleSaveProfile = () => {
     onUpdateProfile?.({ name: editName, avatar: editAvatar });
     setIsEditingProfile(false);
  };
  
  const sortedBookings = [...bookings].sort((a, b) => {
    const da = new Date(`${a.date.replace(/\s+/g, '')} ${a.startTime}`).getTime();
    const db = new Date(`${b.date.replace(/\s+/g, '')} ${b.startTime}`).getTime();
    return da - db;
  });

  const upcoming = sortedBookings.filter(b => new Date(`${b.date.replace(/\s+/g, '')} ${b.startTime}`) >= now);
  const past = sortedBookings.filter(b => new Date(`${b.date.replace(/\s+/g, '')} ${b.startTime}`) < now).reverse(); 

  const groupBookings = (arr: Booking[]) => arr.reduce((acc: any, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const groupedUpcoming = groupBookings(upcoming);
  const groupedPast = groupBookings(past);

  const BookingCardNode = ({ b, isPast = false }: { b: Booking, isPast?: boolean }) => (
    <div className="relative pl-8 mb-4">
      <div className={`absolute top-4 left-[-7px] w-3 h-3 rounded-full border-2 ${isPast ? 'bg-surface-container-highest border-outline-variant/30' : 'bg-primary border-primary-container z-10'}`} />
      
      <div className={`bg-surface-container-lowest border rounded-2xl p-5 shadow-sm flex flex-col relative overflow-hidden min-w-0 ${isPast ? 'border-outline-variant/10 opacity-70' : 'border-outline-variant/20'}`}>
        {isPast && <div className="absolute inset-0 bg-surface-container-highest/10 pointer-events-none" />}
        <div className="flex flex-col sm:flex-row justify-between md:items-center gap-2 mb-3">
           <h3 className="text-xl font-bold font-headline text-on-surface truncate break-words">{b.title || 'Untitled Meeting'}</h3>
           {!isPast && (
             <div className="flex items-center gap-2 flex-shrink-0">
               <button onClick={() => onEdit?.(b)} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">Reschedule</button>
               <button onClick={() => setConfirmDeleteId(b.id)} className="text-xs font-bold text-error bg-error/10 px-3 py-1.5 rounded-lg hover:bg-error/20 transition-colors">Cancel</button>
             </div>
           )}
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-on-surface-variant font-medium">
          <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg w-fit break-words ${isPast ? 'bg-surface-variant/30 text-on-surface-variant' : 'bg-primary/10 text-primary'}`}>
            <Clock size={16} className="flex-shrink-0" />
            <span>{b.startTime} ({b.duration})</span>
          </div>
          <div className="flex items-center gap-2 min-w-0 max-w-full">
            <MapPin size={16} className="flex-shrink-0" />
            <span className="truncate">{b.roomId} - {b.location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 md:px-6 py-6 flex-1 flex flex-col pt-12 md:pt-6 pb-24 md:pb-6 max-w-2xl mx-auto w-full overflow-visible"
    >
      {/* Profile Header Block */}
      <div className="mb-12 bg-surface-container-low rounded-3xl p-6 md:p-8 flex items-center gap-6 border border-outline-variant/20 shadow-sm relative overflow-visible">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
         
         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface-container-lowest border-4 border-surface shadow-sm overflow-hidden flex-shrink-0 relative z-[50]">
             <div className="w-full h-full bg-surface-container-lowest p-1"><AvatarIcon type={isEditingProfile ? editAvatar : userProfile?.avatar || 'dog'} /></div>
         </div>
         
         <div className="flex-1 relative z-10 min-w-0">
           {isEditingProfile ? (
             <div className="flex flex-col gap-4 max-w-[400px]">
               <input 
                 autoFocus
                 value={editName}
                 onChange={(e) => setEditName(e.target.value)}
                 className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 py-2 font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-xl md:text-2xl"
                 placeholder="Your Name"
               />
               <div className="flex flex-wrap gap-2 sm:gap-3 items-center bg-surface-container/50 px-2 py-3 rounded-2xl border border-outline-variant/20 -mx-1 sm:mx-0">
                 {['dog', 'cat', 'bear', 'fox', 'panda', 'rabbit'].map(animal => (
                   <button 
                      key={animal} 
                      type="button"
                      onClick={() => setEditAvatar(animal)} 
                      className={`w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full transition-all focus:outline-none flex-shrink-0 ${editAvatar === animal ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low scale-110 shadow-md bg-surface-container-lowest' : 'opacity-50 hover:opacity-100 hover:scale-105 hover:bg-surface-container-lowest'}`}
                   >
                     <AvatarIcon type={animal} className="w-full h-full" />
                   </button>
                 ))}
               </div>
               <div className="flex gap-2">
                 <button onClick={handleSaveProfile} className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-primary/90 transition-colors">Save</button>
                 <button onClick={() => setIsEditingProfile(false)} className="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-surface-container transition-colors">Cancel</button>
               </div>
             </div>
           ) : (
             <>
               <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1 block">Verified @tripgain.com</span>
               <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface tracking-tighter mb-1 truncate">{userProfile?.name || 'Loading...'}</h2>
               <div className="mt-2 flex gap-3">
                 <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant hover:decoration-primary underline-offset-4">Edit Profile Options</button>
                 <button onClick={() => setConfirmDeleteAccount(true)} className="text-xs font-bold text-error/70 hover:text-error transition-colors underline decoration-error/30 hover:decoration-error underline-offset-4">Delete Account</button>
               </div>
             </>
           )}
         </div>
      </div>

      <div className="mb-10">
        <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tighter mb-2 break-words">My Meetings</h2>
        <p className="text-on-surface-variant font-medium text-sm">Your schedule, spanning history and future.</p>
      </div>

      <div className="pr-2 space-y-12 pb-12 w-full">
        {/* Past section */}
        <div>
           <div className="flex items-center gap-4 mb-6 relative">
             <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Past Archives</h3>
             <div className="flex-1 h-px bg-outline-variant/20"></div>
           </div>
           {past.length === 0 ? (
             <p className="text-sm text-on-surface-variant/50 font-medium italic px-4">No past meetings on record.</p>
           ) : (
             <div className="space-y-8">
               {Object.keys(groupedPast).map(dateKey => (
                 <div key={dateKey} className="relative">
                   <h4 className="text-[10px] font-bold text-on-surface-variant mb-4 ml-6 uppercase tracking-widest">{dateKey}</h4>
                   <div className="relative border-l-2 border-outline-variant/20 ml-2">
                     {groupedPast[dateKey].map((b: Booking) => (
                       <div key={b.id}><BookingCardNode b={b} isPast /></div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Future section */}
        <div className="w-full">
           <div className="flex items-center gap-4 mb-6 sticky top-0 bg-surface/90 backdrop-blur-md z-20 py-3 rounded-b-xl border-t border-b border-primary/10">
             <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Upcoming Meetings</h3>
             <div className="flex-1 h-px bg-primary/20"></div>
           </div>
           {upcoming.length === 0 ? (
             <p className="text-sm text-on-surface-variant/50 font-medium italic px-4">Your schedule is completely clear!</p>
           ) : (
             <div className="space-y-8">
               {Object.keys(groupedUpcoming).map(dateKey => {
                 const dayBookings = groupedUpcoming[dateKey];
                 return (
                   <div key={dateKey} className="relative w-full">
                     <h4 className="text-[10px] font-bold text-primary mb-4 ml-6 uppercase tracking-widest">{dateKey}</h4>
                     <div className="relative border-l-2 border-primary/20 ml-2 w-full max-w-full">
                       {dayBookings.map((b: Booking, i: number) => {
                          let gapMins = 0;
                          if (i < dayBookings.length - 1) {
                             const endMinutes = parseTimeToMinutes(b.startTime) + getDurationMinutes(b.duration);
                             const nextStartMinutes = parseTimeToMinutes(dayBookings[i+1].startTime);
                             gapMins = nextStartMinutes - endMinutes;
                          }

                          return (
                            <div key={b.id} className="w-full">
                              <BookingCardNode b={b} />
                              {gapMins > 0 && (
                                <div className="relative pl-12 mb-4 py-4 border-l-2 border-dashed border-primary/20 ml-[-2px]">
                                  <div className="text-xs font-bold text-on-surface-variant/60 italic flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full border border-on-surface-variant/40 bg-surface"></div>
                                    <span>{formatGap(gapMins)} free space</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                       })}
                     </div>
                   </div>
                 )}
               )}
             </div>
           )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface-container border border-outline-variant/30 shadow-2xl p-7 rounded-[2rem] max-w-sm w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-error/90"></div>
            <h3 className="text-xl font-bold font-headline text-on-surface mb-2 mt-2">Cancel Booking?</h3>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-8">Are you absolutely sure you want to cancel this reservation? The slot will immediately become available again for everyone.</p>
            <div className="flex gap-3 justify-end items-center">
              <button 
                onClick={() => setConfirmDeleteId(null)} 
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-surface-container-highest text-on-surface shadow-sm hover:bg-surface-container-high hover:shadow transition-all"
              >
                Keep it
              </button>
              <button 
                onClick={() => {
                  onRemove?.(confirmDeleteId);
                  setConfirmDeleteId(null);
                }} 
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-error text-on-error shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Account Deletion Modal */}
      {confirmDeleteAccount && (
        <div className="fixed inset-0 bg-error/10 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface-container border border-error/30 shadow-2xl p-7 rounded-[2rem] max-w-sm w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-error"></div>
            <h3 className="text-xl font-bold font-headline text-on-surface mb-2 mt-2">Nuke Account?</h3>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-6">This will permanently delete your identity AND explicitly cancel every single meeting you've booked on the server.</p>
            <div className="flex gap-3 justify-end items-center">
              <button 
                onClick={() => setConfirmDeleteAccount(false)} 
                className="px-4 py-2 rounded-xl text-sm font-bold bg-surface-container-highest text-on-surface hover:bg-surface-container-high transition-all"
              >
                Nevermind
              </button>
              <button 
                onClick={() => {
                  onDeleteProfile?.();
                  setConfirmDeleteAccount(false);
                }} 
                className="px-4 py-2 rounded-xl text-sm font-bold bg-error text-on-error hover:opacity-90 transition-all shadow-md"
              >
                Delete Everything
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
