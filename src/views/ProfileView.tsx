import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { AvatarIcon } from '../components/Avatars';

export default function ProfileView({ userProfile, onUpdateProfile, onDeleteProfile, onLogout }: { userProfile?: any, onUpdateProfile?: (d: any) => void, onDeleteProfile?: () => void, onLogout?: () => void }) {
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('dog');
  
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

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 md:px-6 py-6 flex-1 flex flex-col pt-12 md:pt-6 pb-24 md:pb-6 max-w-2xl mx-auto w-full overflow-visible"
    >
      <div className="mb-10 mt-4 md:mt-2">
        <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tighter mb-2 break-words">Profile Settings</h2>
        <p className="text-on-surface-variant font-medium text-sm">Manage your global identity across the network.</p>
      </div>

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
               <div className="mt-2 flex flex-wrap gap-3">
                 <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant hover:decoration-primary underline-offset-4">Edit Profile Options</button>
                  <button onClick={onLogout} className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant hover:decoration-primary underline-offset-4">Logout</button>
                 <button onClick={() => setConfirmDeleteAccount(true)} className="text-xs font-bold text-error/70 hover:text-error transition-colors underline decoration-error/30 hover:decoration-error underline-offset-4">Delete Account</button>
               </div>
             </>
           )}
         </div>
      </div>

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
