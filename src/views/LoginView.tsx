import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Fingerprint } from 'lucide-react';

export default function LoginView({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email format.');
      return;
    }
    
    if (!email.toLowerCase().endsWith('@tripgain.com')) {
      setError("Error 403: Security Breach Detected 🚨! Just kidding, but seriously—this scheduler is exclusively for TripGain staff. Go find your own meeting rooms, or at least get the email right!");
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate slight networking routing latency for polished authentication UX flow
    setTimeout(() => {
      onLogin(email.toLowerCase().trim());
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/20 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-primary-container"></div>
        
        <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-2xl mb-8 -rotate-3 border border-outline-variant/30 shadow-sm">
          <Fingerprint size={32} className="text-primary" />
        </div>
        
        <h1 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">Welcome to DIBS</h1>
        <p className="text-on-surface-variant font-medium text-sm mb-8 leading-relaxed">Identity verification required. Please authenticate yourself using your active employee email strictly routing via <span className="font-bold text-primary">@tripgain.com</span>.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Workspace Email</label>
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. employee@tripgain.com" 
              className="w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-sm font-bold text-on-surface outline-none placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono tracking-tight disabled:opacity-50" 
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-bold text-error bg-error/10 p-4 rounded-xl border border-error/20 leading-relaxed shadow-sm"
            >
              {error}
            </motion.div>
          )}
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full relative h-14 bg-on-surface text-surface rounded-xl font-bold text-sm shadow-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-80 overflow-hidden group"
          >
            {isLoading ? (
               <Loader2 size={24} className="animate-spin text-surface" />
            ) : (
              <>
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Authorize</span>
                <div className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
              </>
            )}
          </button>
        </form>
      </motion.div>
      
      <p className="mt-8 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/40 text-center">
        Powered identically by TripGain Infrastructure
      </p>
    </div>
  );
}
