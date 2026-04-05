import { Building2, Video } from 'lucide-react';
import { motion } from 'motion/react';

interface Room {
  id: string;
  name: string;
  capacity: number;
}

interface LoungesViewProps {
  onBook: (room: Room) => void;
}

export default function LoungesView({ onBook }: LoungesViewProps) {
  const rooms = [
    { id: 'blr', name: 'Blr lounge', location: 'Bengaluru Hub', capacity: 20, status: 'In Use', type: 'Conference Room', colSpan: 2 },
    { id: 'delhi', name: 'Delhi lounge', location: 'New Delhi', capacity: 3, status: 'Available', type: 'Level 2' },
    { id: 'mumbai', name: 'Mumbai lounge', location: 'Mumbai West', capacity: 3, status: 'Next Up', type: 'Level 1' },
    { id: 'hyd', name: 'Hyd lounge', location: 'Hyderabad', capacity: 3, status: 'Available', type: 'Level 3' },
    { id: 'dubai', name: 'Dubai lounge', location: 'Dubai DIFC', capacity: 3, status: 'In Use', type: 'DIFC' },
    { id: 'london', name: 'LONDON', location: 'London City', capacity: 3, status: 'Available', type: 'City' },
    { id: 'sfo', name: 'SFO', location: 'San Francisco', capacity: 3, status: 'In Use', type: 'Mission' },
  ];

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
        {/* Card 1: Blr lounge */}
        <div 
          onClick={() => onBook(rooms[0])}
          className="group bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-outline-variant/15 lg:col-span-2 relative overflow-hidden cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">Bengaluru Hub</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface">Blr lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Conference Room • Cap 20</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[0.7rem] font-bold">In Use</span>
          </div>
          <div className="mt-auto relative z-10">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-2">
              <span>Strategy Sync</span>
              <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md">Free at 11:00 AM</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full primary-gradient rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Delhi lounge */}
        <div 
          onClick={() => onBook(rooms[1])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">New Delhi</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Delhi lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[0.7rem] font-bold">Available</span>
          </div>
          <div className="mt-auto">
            <div className="mb-2">
              <span className="bg-primary/15 text-primary text-[0.65rem] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md inline-block">Available till 2:00 PM</span>
            </div>
            <button className="w-full py-2 bg-surface-container-low text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors">Quick Reserve</button>
          </div>
        </div>

        {/* Card 3: Mumbai lounge */}
        <div 
          onClick={() => onBook(rooms[2])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">Mumbai West</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Mumbai lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[0.7rem] font-bold">In Use</span>
          </div>
          <div className="mt-auto pt-4 border-t border-surface-container-high">
            <div className="flex justify-between items-center text-[0.65rem] font-bold text-on-surface-variant mb-2">
               <span className="italic">Product Design Review</span>
               <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md">Free at 2:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-container-high overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpArjr5n4NJ9kC5i9JAgR934GA7m4XhxVenX93WgmRaBQ6Y8WPy7xyuXNVawTRv_w4ZFjX9N8RpOGkN6xtBZLP5wMAnaiEGVcbJqyUQUHg40lFNB9-_9WNU447a8HyZLbtsd83DkVF2CWCZzpMwmKBqpHwIBW8ZDdVVxuBL_-piSCWbAVUCJsU4yxR8M3PL-Wa1PFuVNLI9ImQ2wb5b6VcD7wsyY9yEhdp62Bnc-htvUKSKrSQ8w3JpcoPavkJmKHW_Xnt5dGtRFC1" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Hyd lounge */}
        <div 
          onClick={() => onBook(rooms[3])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">Hyderabad</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Hyd lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[0.7rem] font-bold">Available</span>
          </div>
          <div className="mt-auto">
            <div className="mb-2">
              <span className="bg-primary/15 text-primary text-[0.65rem] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md inline-block">Available till EOD</span>
            </div>
            <button className="w-full py-2 bg-surface-container-low text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors">Quick Reserve</button>
          </div>
        </div>

        {/* Card 5: Dubai lounge */}
        <div 
          onClick={() => onBook(rooms[4])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">Dubai DIFC</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Dubai lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[0.7rem] font-bold">In Use</span>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-2">
              <span>Board Briefing</span>
              <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md">Free at 4:30 PM</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full primary-gradient rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 6: LONDON */}
        <div 
          onClick={() => onBook(rooms[5])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">London City</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">London lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[0.7rem] font-bold">Available</span>
          </div>
          <div className="mt-auto">
            <div className="mb-2">
              <span className="bg-primary/15 text-primary text-[0.65rem] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md inline-block">Available till 3:00 PM</span>
            </div>
            <button className="w-full py-2 bg-surface-container-low text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors">Quick Reserve</button>
          </div>
        </div>

        {/* Card 7: SFO */}
        <div 
          onClick={() => onBook(rooms[6])}
          className="bg-surface-container-lowest rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/15 flex flex-col cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-primary font-bold mb-1 block">San Francisco</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">SFO lounge</h3>
              <p className="text-sm text-on-surface-variant font-medium">Cap 3</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[0.7rem] font-bold">In Use</span>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-2">
              <span>Dev Sync</span>
              <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-md">Free at 5:00 PM</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full primary-gradient rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
