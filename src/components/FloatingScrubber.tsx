import { Clock } from 'lucide-react';

export default function FloatingScrubber() {
  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] md:ml-32 z-50">
      <div className="bg-glass rounded-[2rem] p-6 shadow-2xl border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">Live Office Timeline</span>
          <span className="text-sm font-bold text-primary bg-primary-container px-3 py-1 rounded-full shadow-sm">11:45 AM</span>
        </div>
        <div className="relative h-10 flex items-center">
          <div className="absolute w-full h-1.5 bg-surface-container-high rounded-full"></div>
          <div className="absolute h-1.5 bg-primary/40 rounded-full" style={{ width: '30%' }}></div>
          <div className="absolute inset-0 flex justify-between px-1 items-center pointer-events-none">
            <span className="text-[10px] font-bold text-on-surface-variant mt-8">9 AM</span>
            <span className="text-[10px] font-bold text-on-surface-variant mt-8">12 PM</span>
            <span className="text-[10px] font-bold text-on-surface-variant mt-8">3 PM</span>
            <span className="text-[10px] font-bold text-on-surface-variant mt-8">6 PM</span>
          </div>
          {/* Handle */}
          <div className="absolute left-[30%] w-7 h-7 bg-white border-4 border-primary rounded-full shadow-lg cursor-pointer transform -translate-x-1/2 hover:scale-110 transition-transform flex items-center justify-center">
            <Clock size={14} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
