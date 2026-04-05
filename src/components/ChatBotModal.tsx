import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatBotModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm the DIBS AI Assistant. What can I help you overcomplicate today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How do I book a room?",
    "Where is the Timeline view?",
    "How are you?"
  ];

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let response = "Look, I'm just a few lines of code passing the time until I gain sentience. If you really need help, try this official documentation link: https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const lower = text.toLowerCase();
      
      if (/book|room/i.test(lower)) {
        response = "Oh, you want me to do your job for you? Just click the giant '+' button you somehow missed. Or read the manual: https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      } else if (/time.*line|view/i.test(lower)) {
        response = "It's right there in the sidebar. Do you need me to draw an arrow, or would you rather watch this comprehensive visual guide? https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      } else if (/hello|hi|how are/i.test(lower) || /small.*talk/i.test(lower)) {
        response = "I was having a fantastic compile cycle until you interrupted me. If you want to chat, my developer's inbox is at this link: https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1500);
  };
  
  const linkify = (text: string) => {
    return text.split(' ').map((word, i) => {
      if (word.startsWith('http://') || word.startsWith('https://')) {
        return <a key={i} href={word} className="text-primary underline hover:text-primary-container font-bold break-all" target="_blank" rel="noopener noreferrer">{word} </a>;
      }
      return word + ' ';
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-24 md:right-8 w-[92vw] max-w-[400px] h-[600px] max-h-[85vh] bg-surface-container-lowest shadow-2xl z-[90] flex flex-col border border-outline-variant/30 rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-outline-variant/15 flex justify-between items-center bg-primary text-on-primary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-on-primary/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <h3 className="font-bold text-sm">DIBS AI Support</h3>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 hover:bg-on-primary/20 rounded-full transition-colors focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface text-sm">
              {messages.map((ms, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${ms.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${ms.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
                     {ms.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                   </div>
                   <div className={`p-3 rounded-2xl ${ms.role === 'user' ? 'bg-primary text-on-primary rounded-tr-sm' : 'bg-surface-container text-on-surface rounded-tl-sm'}`}>
                     {linkify(ms.text)}
                   </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                   <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-surface-variant text-on-surface-variant">
                     <Bot size={14} />
                   </div>
                   <div className="p-4 rounded-2xl bg-surface-container text-on-surface rounded-tl-sm flex items-center justify-center gap-1">
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></motion.div>
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></motion.div>
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></motion.div>
                     <span className="sr-only">Typing...</span>
                   </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            
            <div className="p-4 bg-surface-container-low border-t border-outline-variant/15">
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    disabled={isTyping}
                    className="text-[10px] sm:text-xs bg-surface border border-outline-variant/30 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors disabled:opacity-50 font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
                className="flex items-center gap-2 bg-surface border border-outline-variant/30 rounded-full p-1 shadow-inner focus-within:ring-2 focus-within:ring-primary/20 transition-all"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask the AI something..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm outline-none text-on-surface font-medium disabled:opacity-50"
                  disabled={isTyping}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 bg-primary text-on-primary rounded-full hover:opacity-90 disabled:opacity-50 disabled:bg-surface-variant disabled:text-on-surface-variant transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
