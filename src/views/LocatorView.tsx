import { motion } from 'motion/react';

interface LocatorViewProps {
  bookings?: any[];
  onBook?: (room: any) => void;
}

export default function LocatorView({ bookings = [], onBook }: LocatorViewProps) {
  const rooms = [
    { id: 'delhi', name: 'Delhi lounge', cap: 3, top: '48%', left: '57.2%' },
    { id: 'mumbai', name: 'Mumbai lounge', cap: 3, top: '48%', left: '63.4%' },
    { id: 'hyd', name: 'Hyd lounge', cap: 3, top: '48%', left: '69.6%' },
    { id: 'dubai', name: 'Dubai lounge', cap: 3, top: '48%', left: '75.8%' },
    { id: 'london', name: 'London lounge', cap: 3, top: '72%', left: '51%' },
    { id: 'sfo', name: 'SFO lounge', cap: 3, top: '78%', left: '51%' },
  ];

  const getRoomClass = (roomId: string) => {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    const yyyy = now.getFullYear();
    const todayStr = `${mm}/${dd}/${yyyy}`;

    const todaysBookings = bookings.filter(b => b.date.replace(/\s+/g, '') === todayStr && b.roomId.toLowerCase() === roomId.toLowerCase());
    
    let ongoing = false;
    let nextUp = false;
    
    for (const b of todaysBookings) {
      if(!b.startTime || !b.duration) continue;
      const match = b.startTime.match(/(\d+):(\d+)\s+(AM|PM)/i);
      if(!match) continue;
      let [, h, m, p] = match;
      let hrs = parseInt(h, 10);
      if(p.toUpperCase() === 'PM' && hrs !== 12) hrs += 12;
      if(p.toUpperCase() === 'AM' && hrs === 12) hrs = 0;
      const startMins = hrs * 60 + parseInt(m, 10);
      
      const durStr = b.duration;
      let durMins = 60;
      if(durStr.includes('30')) durMins = 30;
      else if(durStr.includes('1.5')) durMins = 90;
      else if(durStr.includes('2')) durMins = 120;
      else if(durStr.includes('3')) durMins = 180;
      else if(durStr.includes('4')) durMins = 240;
      else if(durStr.includes('All')) durMins = 480;
      
      const endMins = startMins + durMins;
      
      if(currentMins >= startMins && currentMins < endMins) ongoing = true;
      if(startMins > currentMins && startMins - currentMins <= 30) nextUp = true;
    }
    
    if(ongoing) return 'bg-secondary text-on-secondary shadow-md scale-[1.02] border-secondary';
    if(nextUp) return 'bg-tertiary text-on-tertiary shadow-sm border-tertiary';
    return 'bg-primary text-on-primary hover:scale-[1.02] shadow-sm';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-6 flex-1 flex flex-col h-full"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tighter">Wayfinding</h2>
          <p className="text-on-surface-variant font-medium leading-tight opacity-70">Architectural Floor Plan & Room Locator</p>
        </div>
        
        {/* Universal Map Legend */}
        <div className="flex items-center gap-6 bg-surface-container-low/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.4)]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--color-secondary-rgb),0.5)]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">In Use</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(var(--color-tertiary-rgb),0.5)]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Next Up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest border border-outline-variant/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">Locked</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full bg-surface-container-lowest/50 rounded-3xl border border-outline-variant/10 overflow-hidden relative shadow-inner">
        <div className="relative h-full max-h-[85vh] aspect-[8/9] mx-auto bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-outline-variant/10 p-0 overflow-hidden rounded-xl">

          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,53 57.2,53 57.2,59 63.4,59 63.4,72 57.2,72 57.2,100 0,100" fill="none" stroke="var(--color-outline-variant)" strokeWidth="0.5" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" opacity="0.5" />
          </svg>

          {/* Conference Room (Blr lounge) */}
          <button onClick={() => onBook?.({ id: 'blr', name: 'Blr lounge', capacity: 20 })} className={`absolute z-30 cursor-pointer flex flex-col items-center justify-center transition-transform border border-outline-variant/20 focus:outline-none ${getRoomClass('blr')}`} style={{ left: '0%', top: '0%', width: '14%', height: '24%' }}>
            <span className="text-[10px] font-bold text-center leading-tight">Blr lounge</span>
            <span className="text-[8px] opacity-80">Cap 20</span>
          </button>

          {/* Executive Cabins */}
          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '0%', top: '24%', width: '14%', height: '10%' }}>
            <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Exec</span>
          </div>
          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '0%', top: '34%', width: '14%', height: '10%' }}>
            <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Exec</span>
          </div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '0%', top: '44%', width: '14%', height: '17%' }}>
            <span className="text-[8px] font-bold uppercase tracking-tighter opacity-40">Work</span>
          </div>

          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '0%', top: '61%', width: '14%', height: '16%' }}>
            <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Fun</span>
          </div>

          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '0%', top: '77%', width: '14%', height: '23%' }}>
            <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Cafe</span>
          </div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '19%', top: '0%', width: '26%', height: '43%' }}>
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-30">Work Area</span>
          </div>

          <div className="absolute bg-outline-variant/10 z-10" style={{ left: '19%', top: '43%', width: '26%', height: '2%' }}></div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '19%', top: '45%', width: '26%', height: '22%' }}>
             <span className="text-[10px] font-bold uppercase tracking-tighter opacity-30">Work Area</span>
          </div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '19%', top: '71%', width: '26%', height: '29%' }}>
             <span className="text-[10px] font-bold uppercase tracking-tighter opacity-30">Work Area</span>
          </div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '51%', top: '0%', width: '26%', height: '43%' }}>
             <span className="text-[10px] font-bold uppercase tracking-tighter opacity-30">Work Area</span>
          </div>

          <div className="absolute bg-outline-variant/10 z-10" style={{ left: '51%', top: '43%', width: '26%', height: '2%' }}></div>

          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '51.0%', top: '48%', width: '6.2%', height: '5%' }}>
            <span className="text-[6px] font-bold opacity-40">Store</span>
          </div>

          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => onBook?.({ id: room.id, name: room.name, capacity: room.cap })}
              className={`absolute z-30 flex flex-col items-center justify-center transition-all duration-300 border border-outline-variant/20 focus:outline-none rounded-sm shadow-sm hover:z-40 ${getRoomClass(room.id)}`}
              style={{ left: room.left, top: room.top, width: '6.2%', height: room.id === 'london' || room.id === 'sfo' ? '6%' : '5%' }}
            >
              <span className="text-[6px] font-black uppercase tracking-tighter">{room.name.split(' ')[0]}</span>
            </button>
          ))}

          <div className="absolute bg-surface-container/60 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '51%', top: '53%', width: '6.2%', height: '6%' }}>
            <span className="text-[6px] font-bold opacity-40">Elec</span>
          </div>

          <div className="absolute bg-surface/30 backdrop-blur-sm text-on-surface z-10 flex items-center justify-center border border-outline-variant/30 rounded-sm" style={{ left: '51%', top: '59%', width: '12.4%', height: '13%' }}>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-80">Entrance</span>
          </div>

          <div className="absolute bg-surface-container/60 z-10 border border-outline-variant/10 rounded-sm" style={{ left: '51%', top: '84%', width: '6.2%', height: '5%' }}></div>
          <div className="absolute bg-surface-container/60 z-10 border border-outline-variant/10 rounded-sm" style={{ left: '51%', top: '89%', width: '6.2%', height: '5%' }}></div>
          <div className="absolute bg-surface-container/60 z-10 border border-outline-variant/10 rounded-sm" style={{ left: '51%', top: '94%', width: '6.2%', height: '6%' }}></div>

          <div className="absolute bg-surface-container/40 text-on-surface-variant/70 z-10 flex items-center justify-center border border-outline-variant/10 rounded-sm" style={{ left: '82%', top: '0%', width: '18%', height: '53%' }}>
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-30">Work Area</span>
          </div>

        </div>


      </div>
    </motion.section>
  );
}
