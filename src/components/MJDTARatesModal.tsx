import { X, Sparkles, ChevronDown, ChevronUp, Minus, MessageSquare, TrendingUp, Info } from 'lucide-react';
import { useRates } from '../context/RatesContext';
import { motion } from 'motion/react';

interface MJDTARatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MJDTARatesModal({ isOpen, onClose }: MJDTARatesModalProps) {
  const { rates, updateTime, lbmaGoldAm, lbmaGoldAmDate, lbmaGoldPm, lbmaGoldPmDate, lbmaSilverAm, lbmaSilverAmDate, lbmaSilverPm, lbmaSilverPmDate, loading } = useRates();

  if (!isOpen) return null;

  // Find rates in context
  const rate22k = rates.find(r => r.id === 'g22k') || { ratePerGram: 13200, change: '-100', isUp: false };
  const rate18k = rates.find(r => r.id === 'g24k') || { ratePerGram: 11020, change: '-100', isUp: false };
  const rateSilver = rates.find(r => r.id === 'silver') || { ratePerGram: 240, change: '0.00', isUp: true };

  const getTrendIcon = (changeStr: string) => {
    const val = parseFloat(changeStr);
    if (val < 0) return <ChevronDown className="w-8 h-8 text-rose-600 shrink-0" />;
    if (val > 0) return <ChevronUp className="w-8 h-8 text-emerald-600 shrink-0" />;
    return <Minus className="w-8 h-8 text-gray-500 shrink-0" />;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gold-300 relative text-gray-800"
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white hover:text-gold-400 p-2 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGIMAX POS Top Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-maroon-950 to-gray-900 text-white p-6 border-b border-gold-400 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="bg-gold-500 text-maroon-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-gold-300">
              New-Gen Jewellery Retail ERP (POS)
            </span>
            <h1 className="font-serif font-black text-2xl tracking-widest text-gold-400">LOGIMAX</h1>
            <p className="text-xs text-gray-300 font-sans tracking-wide">
              Cloud-based & App-based Solution for Any Size of Retail Store
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 text-[10px] text-gold-200/90 font-semibold pt-1">
              <span>+91 96262 43499</span>
              <span>sales@logimaxindia.com</span>
              <span className="underline">www.logimaxindia.com</span>
            </div>
          </div>
          {/* Decorative backdrop glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Modal Body Contents */}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Live Rates Table, Update Time & LBMA table */}
          <div className="flex-1 space-y-6">
            
            {/* Rates Table Block */}
            <div className="border border-maroon-900/20 rounded-xl overflow-hidden shadow-md">
              <div className="bg-maroon-800 text-white text-xs font-bold uppercase tracking-wider grid grid-cols-2 p-3 text-center border-b border-gold-400">
                <span>MJDTA RATE</span>
                <span>RATES</span>
              </div>
              <div className="bg-white divide-y divide-gray-100">
                
                {/* 22Kt Gold */}
                <div className="grid grid-cols-2 p-4 items-center text-center">
                  <span className="font-bold text-sm text-gray-800">1 Gm Gold 22Kt</span>
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(rate22k.change)}
                    <span className="font-mono font-extrabold text-xl text-maroon-900">
                      ₹{rate22k.ratePerGram.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      ({rate22k.change})
                    </span>
                  </div>
                </div>

                {/* 18Kt Gold */}
                <div className="grid grid-cols-2 p-4 items-center text-center">
                  <span className="font-bold text-sm text-gray-800">1 Gm Gold 18Kt</span>
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(rate18k.change)}
                    <span className="font-mono font-extrabold text-xl text-maroon-900">
                      ₹{rate18k.ratePerGram.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      ({rate18k.change})
                    </span>
                  </div>
                </div>

                {/* Silver */}
                <div className="grid grid-cols-2 p-4 items-center text-center">
                  <span className="font-bold text-sm text-gray-800">1 Gm Silver</span>
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(rateSilver.change)}
                    <span className="font-mono font-extrabold text-xl text-maroon-900">
                      ₹{rateSilver.ratePerGram.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                      ({rateSilver.change})
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Update time */}
            <div className="text-center">
              <span className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-inner inline-block">
                Update Time: {updateTime}
              </span>
            </div>

            {/* Technical Analysis Action Links */}
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-maroon-700" /> Technical Analysis
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <a 
                  href="https://wa.me/919443362126?text=Hi%20Om%20Sakthi%20Jewellery,%20I%20would%20like%20to%20know%20the%20technical%20analysis%20recommendation%20for%20Gold." 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial text-center bg-maroon-700 hover:bg-maroon-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Gold
                </a>
                <a 
                  href="https://wa.me/919443362126?text=Hi%20Om%20Sakthi%20Jewellery,%20I%20would%20like%20to%20know%20the%20technical%20analysis%20recommendation%20for%20Silver." 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial text-center bg-maroon-700 hover:bg-maroon-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Silver
                </a>
                <a 
                  href="https://wa.me/919443362126?text=Hi%20Om%20Sakthi%20Jewellery,%20please%20provide%20the%20historical%20rate%20records." 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial text-center bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Rate History
                </a>
              </div>
            </div>

            {/* LBMA Rates Block */}
            <div className="border border-maroon-900/20 rounded-xl overflow-hidden shadow-md">
              <div className="bg-maroon-800 text-white text-xs font-bold uppercase tracking-wider grid grid-cols-3 p-3 text-center border-b border-gold-400">
                <span>LBMA RATE</span>
                <span>AM FIX</span>
                <span>PM FIX</span>
              </div>
              <div className="bg-white divide-y divide-gray-100 text-center">
                
                {/* Gold Row */}
                <div className="grid grid-cols-3 p-4 items-center">
                  <span className="font-bold text-xs text-gray-800">GOLD</span>
                  <div className="text-xs">
                    <p className="font-mono font-extrabold text-gray-800">{lbmaGoldAm}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">({lbmaGoldAmDate})</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-mono font-extrabold text-gray-800">{lbmaGoldPm}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">({lbmaGoldPmDate})</p>
                  </div>
                </div>

                {/* Silver Row */}
                <div className="grid grid-cols-3 p-4 items-center">
                  <span className="font-bold text-xs text-gray-800">SILVER</span>
                  <div className="text-xs">
                    <p className="font-mono font-extrabold text-gray-800">{lbmaSilverAm}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">({lbmaSilverAmDate})</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-mono font-extrabold text-gray-400">{lbmaSilverPm}</p>
                    {lbmaSilverPmDate && <p className="text-[9px] text-gray-400 font-mono mt-0.5">({lbmaSilverPmDate})</p>}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: LOGIMAX Features Info Sidebar Column */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-gradient-to-b from-[#1b1c3a] to-[#272a5a] text-white p-6 rounded-xl border border-blue-900/50 shadow-lg space-y-6 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span className="font-serif font-black tracking-widest text-gold-400">LOGIMAX</span>
                </div>

                <ul className="space-y-3.5 text-xs text-blue-100 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Cloud-based web technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Live Cockpit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Mobile App-based CRM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Smart Estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Single inventory E-Commerce store model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Intelligent order management with mobile app catalogues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Global Integration System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold shrink-0">•</span>
                    <span>Management Information module</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black/30 p-3 rounded-lg border border-blue-800/40 text-[10px] text-center text-blue-200">
                <Info className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                Data fetched directly from Madras Jewellers & Diamond Traders' Association.
              </div>

            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
