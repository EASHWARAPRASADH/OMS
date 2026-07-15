import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function WhatsAppChat() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic presets based on active language
  const presets = [
    { q: t('wa.custom_bridal') || '💍 Customize bridal wedding sets', r: t('wa.custom_bridal_res') || 'Absolutely! We specialize in bespoke bridal sets.' },
    { q: t('wa.join_scheme') || '💰 How do I join the Super Gold Scheme?', r: t('wa.join_scheme_res') || 'Joining is simple!' },
    { q: t('wa.purity_test') || '🏠 Do you offer secure gold purity testing at home?', r: t('wa.purity_test_res') || 'Yes! We offer complementary secure gold purity testing at your home.' },
    { q: t('wa.nearest_store') || '📍 Where is the nearest OMS Jewels store?', r: t('wa.nearest_store_res') || 'We have boutiques in major cities.' }
  ];

  // Initialize/Update welcome message when language changes or on mount
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'agent',
        text: t('wa.welcome') || 'Namaste! Welcome to OMS Jewels Luxury Desk. How may I assist you today?',
        time: 'Just now'
      }
    ]);
  }, [language, t]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSelectPreset = (preset: { q: string, r: string }) => {
    // 1. Add user query message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: preset.q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate typing and agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: preset.r,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1500);
  };

  return (
    <div id="whatsapp-floating-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expandable Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gold-300 overflow-hidden flex flex-col mb-4"
          >
            {/* Header banner */}
            <div className="bg-maroon-800 p-4 border-b border-gold-400 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gold-200 border border-gold-400 flex items-center justify-center text-maroon-900 font-serif font-bold text-sm">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-maroon-800" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold font-serif text-gold-300 tracking-wide">{t('wa.agent') || 'Aishwarya Iyer'}</h4>
                  <p className="text-[10px] text-gray-300">Luxury Relationship Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-maroon-700 rounded-full text-gray-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3 flex flex-col text-left">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-maroon-700 text-white self-end rounded-br-none'
                      : 'bg-white text-gray-800 self-start rounded-bl-none border border-gray-200/60 shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'user' ? 'text-gold-200' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="bg-white border border-gray-200/60 rounded-2xl p-3 self-start max-w-[85%] rounded-bl-none shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce delay-300" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets and Actions */}
            <div className="p-3 bg-white border-t border-gray-100 space-y-2">
              <p className="text-[10px] text-gray-400 text-left font-bold uppercase tracking-wider px-1">Select a Query:</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset)}
                    className="text-[10px] text-left bg-gold-50 hover:bg-gold-100 border border-gold-200 text-maroon-800 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer w-full truncate font-medium"
                  >
                    {preset.q}
                  </button>
                ))}
              </div>

              {/* Real WhatsApp direct fallback button */}
              <a
                href={`https://wa.me/919443362126?text=Hi%20OMS%20Jewels%20team,%20I%20am%20interested%20in%20your%20jewelry%20collections!`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md mt-2 cursor-pointer uppercase tracking-wider"
              >
                <PhoneCall className="w-3.5 h-3.5" /> {t('wa.offline_btn') || 'Direct WhatsApp Chat'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <motion.button
        id="btn-whatsapp-floating-bubble"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl cursor-pointer border border-white/20 relative group"
      >
        <span className="absolute -top-1 -left-1 bg-rose-600 text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-bounce border border-white">
          1
        </span>
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.012 2C6.506 2 2.023 6.478 2.022 11.984c0 1.758.46 3.473 1.336 4.99L2 22l5.183-1.36a9.923 9.923 0 0 0 4.829 1.258h.004c5.506 0 9.989-4.478 9.99-9.984a9.982 9.982 0 0 0-9.994-9.928zm5.833 14.288c-.244.693-1.42 1.267-1.95 1.32-.48.048-.96.225-3.076-.6-2.696-1.055-4.42-3.8-4.554-3.982-.135-.18-.988-1.312-.988-2.502 0-1.19.622-1.777.844-2.02.22-.24.483-.3.644-.3.16 0 .32.001.46.008.145.007.34-.053.53.398.2.477.68 1.657.74 1.776.06.12.098.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.26-.1.52.144.254.643 1.057 1.38 1.714.95.844 1.745 1.107 1.996 1.23.25.12.395.105.545-.06.15-.17.65-.758.825-1.02.176-.26.35-.22.59-.13.24.09 1.527.72 1.79.85.262.13.437.195.5.31.066.113.066.657-.18 1.35z"/>
          </svg>
        )}
        
        {/* Tooltip */}
        <span className="absolute right-16 bg-maroon-800 text-gold-300 text-[10px] font-bold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gold-400/40 shadow-md">
          Chat with Concierge
        </span>
      </motion.button>
    </div>
  );
}

