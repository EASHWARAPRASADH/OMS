import { useState } from 'react';
import { Layers, X, Calculator, Percent, Sparkles, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useRates } from '../context/RatesContext';

interface RateCalculatorWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RateCalculatorWidget({ isOpen, onClose }: RateCalculatorWidgetProps) {
  const { t } = useLanguage();
  const { rates } = useRates();
  const [selectedMetalId, setSelectedMetalId] = useState('g22k');
  const [gramWeight, setGramWeight] = useState<number>(10);
  const [makingChargePct, setMakingChargePct] = useState<number>(12); // default making charge is usually 8-16%
  const [includeGST, setIncludeGST] = useState<boolean>(true);

  const selectedMetal = rates.find(m => m.id === selectedMetalId) || rates[0];
  const ratePerGram = selectedMetal.ratePerGram;
  
  const rawMetalPrice = ratePerGram * gramWeight;
  const makingCharges = rawMetalPrice * (makingChargePct / 100);
  const subtotal = rawMetalPrice + makingCharges;
  const gstAmount = includeGST ? subtotal * 0.03 : 0; // 3% standard gold GST in India
  const totalEstimatedCost = subtotal + gstAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col border-l border-gold-300"
          >
            {/* Header */}
            <div className="p-4 bg-maroon-700 text-white border-b border-gold-500 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold-400" />
                <span className="font-serif text-lg font-bold">{t('calc.header') || 'Gold & Silver Estimator'}</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-maroon-800 rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form details */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-left">
              <p className="text-xs text-gray-500 leading-normal">
                {t('calc.desc') || 'Estimate the total cost of any custom jewelry or gold bar before you purchase. We calculate based on live market spot prices.'}
              </p>

              {/* Metal Select buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{t('calc.metal') || 'Select Metal Purity'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {rates.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetalId(m.id)}
                      className={`p-2.5 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedMetalId === m.id
                          ? 'bg-maroon-50 text-maroon-800 border-gold-500 shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gold-300'
                      }`}
                    >
                      <div>{m.name.split(' ')[0]} {m.name.split(' ')[1] || ''}</div>
                      <div className="font-mono text-[10px] text-gold-600 mt-0.5">₹{m.ratePerGram}/g</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{t('calc.weight') || 'Weight (in Grams)'}</label>
                  <span className="text-xs font-mono font-bold text-maroon-700">{gramWeight}g</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    max="1000"
                    value={gramWeight || ''}
                    onChange={(e) => setGramWeight(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-gold-500 focus:outline-none text-sm font-mono"
                  />
                  <div className="absolute right-3.5 top-3 text-xs font-bold text-gray-400 uppercase">Grams</div>
                </div>
                {/* Popular weights shortcuts */}
                <div className="flex gap-1.5 flex-wrap">
                  {[1, 2, 4, 8, 16, 24, 50].map((w) => (
                    <button
                      key={w}
                      onClick={() => setGramWeight(w)}
                      className="text-[10px] px-2.5 py-1 bg-gray-100 hover:bg-gold-100 rounded font-mono font-bold text-gray-700 transition-colors border border-gray-200/50 cursor-pointer"
                    >
                      {w === 8 ? '8g (1 Sovereign)' : `${w}g`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Making charges percentage slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{t('calc.making') || 'Wastage & Making Charges'}</label>
                  <span className="text-xs font-mono font-bold text-gold-700">{makingChargePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={makingChargePct}
                  onChange={(e) => setMakingChargePct(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maroon-700"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold font-mono">
                  <span>0% (Coins)</span>
                  <span>12% (Standard)</span>
                  <span>25% (Intricate Temple)</span>
                </div>
              </div>

              {/* Include GST checkbox */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-maroon-600" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-700">{t('calc.gst_label') || 'Add Standard GST (3%)'}</h5>
                    <p className="text-[9px] text-gray-400">Indian legal tax rate on bullion and jewelry.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeGST}
                  onChange={(e) => setIncludeGST(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-maroon-700 focus:ring-maroon-700 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results Block */}
            <div className="p-4 bg-gold-50 border-t border-gold-200 space-y-3.5">
              <h4 className="font-serif font-bold text-maroon-800 text-xs border-b border-gold-200 pb-2 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-gold-500" /> {t('calc.result_breakdown') || 'Quotation Summary'}
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{t('calc.metal_cost') || 'Raw Metal Cost'}:</span>
                  <span className="font-mono font-bold text-gray-800">₹{Math.round(rawMetalPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('calc.making_cost') || 'Making Charges'}:</span>
                  <span className="font-mono font-bold text-gray-800">₹{Math.round(makingCharges).toLocaleString('en-IN')}</span>
                </div>
                {includeGST && (
                  <div className="flex justify-between text-gray-600">
                    <span>{t('calc.gst_cost') || 'GST (3%)'}:</span>
                    <span className="font-mono font-bold text-gray-800">₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-gray-800 pt-2 border-t border-gold-200/50">
                  <span className="font-serif">{t('calc.total_est') || 'Total Est. Quote'}:</span>
                  <span className="font-mono text-maroon-700 text-base">₹{Math.round(totalEstimatedCost).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Quotation locked! ID: OMS-EST-2026-${Math.floor(Math.random() * 80000 + 10000)}. Show this estimate code to any of our store relationship managers to secure custom design rates.`);
                  onClose();
                }}
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold py-2.5 px-4 rounded-lg transition-colors cursor-pointer text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2"
              >
                {t('calc.lock_btn') || 'Book This Estimate'} <Receipt className="w-4 h-4 text-gold-400" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
