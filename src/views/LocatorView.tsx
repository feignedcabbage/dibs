import { motion } from 'motion/react';

interface LocatorViewProps {
  onBook?: (room: any) => void;
}

export default function LocatorView({ onBook }: LocatorViewProps) {
  const rooms = [
    { id: 'delhi', name: 'Delhi lounge', cap: 3, top: '48%', left: '57.2%' },
    { id: 'mumbai', name: 'Mumbai lounge', cap: 3, top: '48%', left: '63.4%' },
    { id: 'hyd', name: 'Hyd lounge', cap: 3, top: '48%', left: '69.6%' },
    { id: 'dubai', name: 'Dubai lounge', cap: 3, top: '48%', left: '75.8%' },
    { id: 'london', name: 'London lounge', cap: 3, top: '72%', left: '51%' },
    { id: 'sfo', name: 'SFO lounge', cap: 3, top: '78%', left: '51%' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-6 flex-1 flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold font-headline text-on-surface tracking-tighter">Wayfinding</h2>
        <p className="text-on-surface-variant font-medium">Architectural Floor Plan & Room Locator</p>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full bg-surface-container-low p-4 border border-outline-variant/15 overflow-hidden relative">
        <div className="relative h-full max-h-[90vh] aspect-[8/9] mx-auto bg-surface-container-lowest shadow-2xl border border-outline-variant/10 p-0 overflow-hidden">

          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,53 57.2,53 57.2,59 63.4,59 63.4,72 57.2,72 57.2,100 0,100" fill="none" stroke="var(--color-outline-variant)" strokeWidth="0.5" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" opacity="0.5" />
          </svg>

          {/* Conference Room (Blr lounge) */}
          <button onClick={() => onBook?.({ id: 'blr', name: 'Blr lounge', capacity: 20 })} className="absolute bg-secondary text-on-secondary shadow-sm hover:scale-[1.02] z-20 cursor-pointer flex flex-col items-center justify-center transition-transform border border-outline-variant/20 focus:outline-none" style={{ left: '0%', top: '0%', width: '14%', height: '24%' }}>
            <span className="text-[10px] font-bold text-center leading-tight">Blr lounge</span>
            <span className="text-[8px] opacity-80">Cap 20</span>
          </button>

          {/* Executive Cabins */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '0%', top: '24%', width: '14%', height: '10%' }}>
            <span className="text-[8px] font-medium">Exec Cabin</span>
          </div>
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '0%', top: '34%', width: '14%', height: '10%' }}>
            <span className="text-[8px] font-medium">Exec Cabin</span>
          </div>

          {/* Work Areas */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '0%', top: '44%', width: '14%', height: '17%' }}>
            <span className="text-[8px] font-medium">Work Area</span>
          </div>

          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '0%', top: '61%', width: '14%', height: '16%' }}>
            <span className="text-[8px] font-medium">Fun Zone</span>
          </div>

          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '0%', top: '77%', width: '14%', height: '23%' }}>
            <span className="text-[8px] font-medium">Cafeteria</span>
          </div>

          {/* Main Work Areas */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '19%', top: '0%', width: '26%', height: '43%' }}>
            <span className="text-[10px] font-medium">Work Area</span>
          </div>

          <div className="absolute bg-outline-variant/20 z-10" style={{ left: '19%', top: '43%', width: '26%', height: '2%' }}></div>

          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '19%', top: '45%', width: '26%', height: '22%' }}>
            <span className="text-[10px] font-medium">Work Area</span>
          </div>

          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '19%', top: '71%', width: '26%', height: '29%' }}>
            <span className="text-[10px] font-medium">Work Area</span>
          </div>

          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '0%', width: '26%', height: '43%' }}>
            <span className="text-[10px] font-medium">Work Area</span>
          </div>

          <div className="absolute bg-outline-variant/20 z-10" style={{ left: '51%', top: '43%', width: '26%', height: '2%' }}></div>

          {/* S Room */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51.0%', top: '48%', width: '6.2%', height: '5%' }}>
            <span className="text-[6px] font-medium">Storage</span>
          </div>

          {/* Small Interactive Lounges */}
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => onBook?.({ id: room.id, name: room.name, capacity: room.cap })}
              className="absolute bg-primary text-on-primary shadow-sm hover:scale-110 z-30 flex flex-col items-center justify-center transition-transform border border-outline-variant/20 focus:outline-none"
              style={{ left: room.left, top: room.top, width: '6.2%', height: room.id === 'london' || room.id === 'sfo' ? '6%' : '5%' }}
            >
              <span className="text-[6px] font-bold">{room.name.split(' ')[0]}</span>
              <span className="text-[5px] opacity-80">Cap {room.cap}</span>
            </button>
          ))}


          {/* E Room */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '53%', width: '6.2%', height: '6%' }}>
            <span className="text-[6px] font-medium">Elec</span>
          </div>

          {/* Entrance */}
          <div className="absolute bg-surface-container-lowest text-on-surface z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '59%', width: '12.4%', height: '13%' }}>
            <span className="text-[8px] font-bold uppercase tracking-widest">Entrance</span>
          </div>

          {/* Empty Rooms */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '84%', width: '6.2%', height: '5%' }}></div>
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '89%', width: '6.2%', height: '5%' }}></div>
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '51%', top: '94%', width: '6.2%', height: '6%' }}></div>

          {/* Right Work Area */}
          <div className="absolute bg-surface-container text-on-surface-variant z-10 flex items-center justify-center border border-outline-variant/20" style={{ left: '82%', top: '0%', width: '18%', height: '53%' }}>
            <span className="text-[10px] font-medium">Work Area</span>
          </div>

        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md p-3 border border-outline-variant/15 shadow-lg z-30">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary"></div>
              <span className="text-xs font-bold text-on-surface-variant">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary"></div>
              <span className="text-xs font-bold text-on-surface-variant">In Use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-tertiary"></div>
              <span className="text-xs font-bold text-on-surface-variant">Next Up</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-surface-container border border-outline-variant/20"></div>
              <span className="text-xs font-bold text-on-surface-variant">Not Bookable</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
