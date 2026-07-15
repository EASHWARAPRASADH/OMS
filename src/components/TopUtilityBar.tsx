import { Sparkles, MapPin, Layers, Calendar, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRates } from '../context/RatesContext';

interface TopUtilityBarProps {
  onOpenStoreLocator: () => void;
  onOpenRateCalculator: () => void;
  onOpenRatesBoard: () => void;
}

export default function TopUtilityBar({ onOpenStoreLocator, onOpenRateCalculator, onOpenRatesBoard }: TopUtilityBarProps) {
  const { rates, loading, refreshRates, lastUpdated } = useRates();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div id="top-utility-bar" className="bg-maroon-800 text-white border-b border-gold-900/40 text-xs py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Live Rates Ticker */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={onOpenRatesBoard}
              className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center gap-1 animate-pulse cursor-pointer transition-colors"
            >
              <Sparkles className="w-3 h-3" /> {t('top.live_rates')}
            </button>
            <button 
              onClick={() => refreshRates()} 
              disabled={loading}
              title={`Last updated at ${lastUpdated}. Click to refresh.`}
              className={`text-gold-300 hover:text-white p-0.5 transition-all rounded hover:bg-maroon-700/50 cursor-pointer ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          
          <div 
            onClick={onOpenRatesBoard}
            className="marquee-container w-full md:w-[350px] lg:w-[450px] cursor-pointer hover:text-gold-300 transition-colors"
          >
            <div className="marquee-content inline-flex items-center gap-6">
              {/* Double up the list for infinite marquee scrolling effect */}
              {[...rates, ...rates].map((rate, idx) => (
                <span key={`${rate.id}-${idx}`} className="inline-flex items-center gap-1.5 shrink-0 font-medium">
                  <span className="text-gold-200">{rate.name}:</span>
                  <span className="font-mono">₹{rate.ratePerGram.toLocaleString('en-IN')}</span>
                  <span className={`text-[10px] px-1 rounded ${rate.isUp ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'}`}>
                    {rate.change}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Action Links & Language Selector */}
        <div className="flex items-center gap-x-4 sm:gap-x-6 shrink-0 flex-wrap justify-center text-gold-100">
          <button 
            id="btn-rate-calc-trigger"
            onClick={onOpenRateCalculator} 
            className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-1 py-0.5 font-medium"
          >
            <Layers className="w-3 h-3 text-gold-400" /> {t('top.rate_calculator')}
          </button>
          
          <button 
            id="btn-stores-trigger"
            onClick={onOpenStoreLocator} 
            className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-1 py-0.5"
          >
            <MapPin className="w-3 h-3 text-gold-400" /> {t('top.stores')}
          </button>
          
          <span className="text-gold-900/50 hidden sm:inline">|</span>
          
          <div className="flex gap-x-4">
            <a href="#auspicious-days" className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-400" /> {t('top.auspicious_days')}
            </a>
          </div>

          <span className="text-gold-900/50 hidden md:inline">|</span>

          {/* Elegant Language Selection Pill */}
          <div id="language-toggle-pill" className="flex items-center gap-1 bg-maroon-900/60 p-0.5 rounded border border-gold-900/40 shrink-0">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider transition-colors cursor-pointer ${language === 'en' ? 'bg-gold-500 text-maroon-950' : 'text-gold-300 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider transition-colors cursor-pointer ${language === 'hi' ? 'bg-gold-500 text-maroon-950' : 'text-gold-300 hover:text-white'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider transition-colors cursor-pointer ${language === 'ta' ? 'bg-gold-500 text-maroon-950' : 'text-gold-300 hover:text-white'}`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider transition-colors cursor-pointer ${language === 'te' ? 'bg-gold-500 text-maroon-950' : 'text-gold-300 hover:text-white'}`}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
