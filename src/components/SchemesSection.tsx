import { useState, FormEvent } from 'react';
import { Award, Calculator, TrendingUp, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface SchemesSectionProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export default function SchemesSection({ isModalOpen = false, onCloseModal }: SchemesSectionProps) {
  const { t } = useLanguage();
  const [activeScheme, setActiveScheme] = useState<'super' | 'digi'>('super');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [showJoinForm, setShowJoinForm] = useState(false);

  // Join form states
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<'super' | 'digi'>('super');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const tenure = 11; // 11-month traditional South Indian jewelry savings scheme (popularly offered by Thangamayil)
  const goldRateEst = 6845; // simulated rate for calculation

  const totalPaid = monthlyContribution * tenure;
  // Super Gold Scheme: jeweler pays 1 month installment as bonus at maturity
  const superGoldBonus = monthlyContribution; 
  // Digi Gold: accumulates gold every month based on that day's gold rate + 5% bonus grams at end
  const approxGramsAccumulated = Number((totalPaid / goldRateEst).toFixed(3));
  const digiGoldBonusGrams = Number((approxGramsAccumulated * 0.05).toFixed(3));
  const totalDigiGoldGrams = Number((approxGramsAccumulated + digiGoldBonusGrams).toFixed(3));

  const handleJoinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile) {
      alert('Please fill out all mandatory fields');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowJoinForm(false);
      setFullName('');
      setMobile('');
      if (onCloseModal) onCloseModal();
    }, 3000);
  };

  const schemeCardData = [
    {
      id: 'super',
      title: t('scheme.super_title'),
      subtitle: t('scheme.super_subtitle'),
      description: t('scheme.super_desc'),
      benefits: [
        t('scheme.benefit_super_1') || 'Complementary 12th installment credited by OMS',
        t('scheme.benefit_super_2') || 'Zero making charges & wastage on gold ornaments (up to 18%)',
        t('scheme.benefit_super_3') || 'Secure online payment portal with instant SMS updates',
        t('scheme.benefit_super_4') || 'Flexible monthly payments starting from just ₹1,000'
      ],
      badge: t('scheme.most_popular') || 'Most Popular'
    },
    {
      id: 'digi',
      title: t('scheme.digi_title'),
      subtitle: t('scheme.digi_subtitle'),
      description: t('scheme.digi_desc'),
      benefits: [
        t('scheme.benefit_digi_1') || 'Instant conversion of rupees into gold grams daily',
        t('scheme.benefit_digi_2') || 'Protects you from price hikes throughout the year',
        t('scheme.benefit_digi_3') || '5% extra gold grams credited as a bonus upon maturity',
        t('scheme.benefit_digi_4') || 'Redeemable as physical jewelry, bars, or coins at any store'
      ],
      badge: t('scheme.smart_invest') || 'Smarter Investment'
    }
  ];

  const content = (
    <div className="space-y-12">
      
      {/* Introduction text */}
      {!isModalOpen && (
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest block">{t('heritage.badge')}</span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-800 tracking-wide relative inline-block">
            {t('scheme.title')}
            <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gold-400"></span>
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            {t('scheme.desc')}
          </p>
        </div>
      )}

      {/* Two cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {schemeCardData.map((scheme) => (
          <div 
            key={scheme.id}
            className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeScheme === scheme.id
                ? 'bg-maroon-800 text-white border-gold-400 shadow-xl scale-[1.01]'
                : 'bg-white text-gray-800 border-gray-200 hover:border-gold-300 shadow-md'
            }`}
          >
            {/* Background branding glow */}
            <div className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full opacity-10 bg-gradient-to-tr ${
              scheme.id === 'super' ? 'from-gold-300' : 'from-emerald-300'
            }`} />

            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full ${
                    activeScheme === scheme.id 
                      ? 'bg-gold-500 text-maroon-950' 
                      : 'bg-maroon-50 text-maroon-700 border border-maroon-100'
                  }`}>
                    {scheme.badge}
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl mt-2 tracking-wide">
                    {scheme.title}
                  </h3>
                  <p className={`text-xs ${activeScheme === scheme.id ? 'text-gold-200' : 'text-gold-600'} font-serif italic`}>
                    {scheme.subtitle}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  activeScheme === scheme.id 
                    ? 'bg-maroon-700 border-gold-500 text-gold-400' 
                    : 'bg-gold-50 border-gold-200 text-maroon-700'
                }`}>
                  {scheme.id === 'super' ? <Award className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${activeScheme === scheme.id ? 'text-gray-200' : 'text-gray-600'}`}>
                {scheme.description}
              </p>

              {/* Benefit Bullet points */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gold-400">{t('scheme.benefits_header')}</h4>
                <ul className="space-y-1.5">
                  {scheme.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <ShieldCheck className={`w-4 h-4 shrink-0 ${activeScheme === scheme.id ? 'text-gold-400' : 'text-emerald-600'}`} />
                      <span className={activeScheme === scheme.id ? 'text-gray-100' : 'text-gray-700'}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scheme Toggle Action */}
            <div className="pt-6 mt-6 border-t border-gray-100/10 flex flex-wrap gap-3 items-center justify-between">
              <button
                onClick={() => setActiveScheme(scheme.id as 'super' | 'digi')}
                className={`text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all cursor-pointer ${
                  activeScheme === scheme.id
                    ? 'bg-gold-500 text-maroon-950 hover:bg-gold-600'
                    : 'bg-maroon-50 text-maroon-800 hover:bg-maroon-100'
                }`}
              >
                {activeScheme === scheme.id ? t('scheme.selected') || 'Selected Scheme' : t('scheme.select_to_calc') || 'Select Scheme to Calculate'}
              </button>

              <button
                onClick={() => {
                  setSelectedScheme(scheme.id as 'super' | 'digi');
                  setShowJoinForm(true);
                }}
                className={`text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeScheme === scheme.id
                    ? 'bg-transparent text-white border border-white/30 hover:bg-white/10'
                    : 'bg-maroon-700 text-white hover:bg-maroon-800'
                }`}
              >
                {t('scheme.quick_join')} <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Calculator Section */}
      <div className="bg-white rounded-2xl border border-gold-200 p-6 sm:p-8 shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-maroon-700 border border-gold-200">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-maroon-800">{t('scheme.calculator_title')}</h3>
              <p className="text-[11px] text-gray-500">{t('scheme.calculator_desc')}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveScheme('super')}
              className={`px-3 py-1 text-[11px] rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeScheme === 'super' ? 'bg-maroon-700 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Super Gold
            </button>
            <button
              onClick={() => setActiveScheme('digi')}
              className={`px-3 py-1 text-[11px] rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeScheme === 'digi' ? 'bg-maroon-700 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              DigiGold
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Sliders and Input details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{t('scheme.monthly_contrib')}</span>
                <span className="text-sm font-extrabold text-maroon-800 font-mono bg-gold-50 px-2.5 py-1 rounded border border-gold-200">
                  ₹{monthlyContribution.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="scheme-contribution-slider"
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maroon-700"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold font-mono mt-1">
                <span>Min: ₹1,000</span>
                <span>₹10,000</span>
                <span>₹25,000</span>
                <span>Max: ₹50,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase font-bold">{t('scheme.tenure')}</p>
                <p className="text-sm font-extrabold text-gray-800 mt-0.5">{tenure} {t('scheme.months')}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase font-bold">{t('scheme.lock_rate')}</p>
                <p className="text-sm font-extrabold text-gray-800 mt-0.5 font-mono">₹{goldRateEst}/gm</p>
              </div>
            </div>
          </div>

          {/* Computed Results card */}
          <div className="bg-maroon-50 rounded-xl border border-gold-200 p-5 space-y-4">
            <h4 className="font-serif font-bold text-maroon-800 text-sm border-b border-gold-200/50 pb-2 flex justify-between">
              <span>{t('scheme.maturity_value')}</span>
              <span className="text-[11px] bg-gold-400 text-maroon-900 px-2 py-0.5 rounded font-sans uppercase font-bold tracking-wider">
                {activeScheme === 'super' ? 'Super Gold' : 'DigiGold'}
              </span>
            </h4>

            <div className="space-y-2.5">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{t('scheme.total_invested')}</span>
                <span className="font-mono font-bold text-gray-800">₹{totalPaid.toLocaleString('en-IN')}</span>
              </div>

              {activeScheme === 'super' ? (
                <>
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>{t('scheme.bonus_credited')}</span>
                    <span className="font-mono font-bold">+₹{superGoldBonus.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>{t('footer.gold_exchange') || 'Old Gold Exchange'}</span>
                    <span className="uppercase font-bold tracking-wider text-[10px]">{t('footer.doorstep_purity') ? 'Free Service' : 'Included'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t border-gold-200/40">
                    <span>{t('scheme.maturity_value')}</span>
                    <span className="font-mono text-maroon-700 text-base">₹{(totalPaid + superGoldBonus).toLocaleString('en-IN')}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{t('scheme.gold_accumulated')}</span>
                    <span className="font-mono font-bold text-gray-800">{approxGramsAccumulated} gm</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>{t('promo.02_title') || '5% Free Gold Gram Bonus:'}</span>
                    <span className="font-mono font-bold">+{digiGoldBonusGrams} gm</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t border-gold-200/40">
                    <span>{t('scheme.gold_accumulated')}</span>
                    <span className="font-mono text-maroon-700 text-base">{totalDigiGoldGrams} grams</span>
                  </div>
                  <p className="text-[10px] text-gray-400 italic leading-snug">
                    {t('promo.01_desc')}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedScheme(activeScheme);
                setShowJoinForm(true);
              }}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold py-2.5 px-4 rounded-lg transition-colors cursor-pointer text-xs tracking-wider uppercase text-center block shadow-md border border-gold-400/20"
            >
              {t('scheme.enroll_btn')}
            </button>
          </div>

        </div>
      </div>

    </div>
  );

  return (
    <>
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onCloseModal}
            className="fixed inset-0 bg-black cursor-pointer"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-50 rounded-2xl overflow-y-auto max-h-[90vh] max-w-4xl w-full shadow-2xl border border-gold-300 z-50 p-6 relative"
          >
            <button
              onClick={onCloseModal}
              className="absolute right-4 top-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            {content}
          </motion.div>
        </div>
      ) : (
        <section id="savings-schemes-section" className="py-14 bg-white border-t border-gold-200/40 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {content}
          </div>
        </section>
      )}

      {/* Quick Join Scheme Modal Form */}
      <AnimatePresence>
        {showJoinForm && (
          <div className="fixed inset-0 z-55 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinForm(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl border border-gold-300 z-55 relative p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setShowJoinForm(false)}
                className="absolute right-4 top-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-maroon-700 border border-gold-300 mx-auto mb-2">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-maroon-800">{t('scheme.enroll_header')}</h3>
                <p className="text-xs text-gray-500 mt-1">{t('scheme.enroll_desc')}</p>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold animate-bounce">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-gray-800 text-base">{t('scheme.success')}</h4>
                  <p className="text-xs text-gray-500 max-w-[280px] mx-auto">
                    {t('scheme.success_desc')} ({mobile})
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {t('scheme.input_name')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eash Dev"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-gold-500 focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {t('scheme.input_mobile')}
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-gray-100 border border-gray-300 text-gray-600 text-xs px-3 py-2 rounded-lg flex items-center font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-gold-500 focus:outline-none text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        {t('scheme.monthly_contrib')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`₹${monthlyContribution.toLocaleString('en-IN')}`}
                        className="w-full px-3.5 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-mono font-bold text-maroon-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        {t('scheme.tenure')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value={selectedScheme === 'super' ? 'Super Gold (11m)' : 'DigiGold (11m)'}
                        className="w-full px-3.5 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer text-xs tracking-wider uppercase shadow-md"
                  >
                    {t('scheme.enroll_btn')}
                  </button>
                  <p className="text-[9px] text-gray-400 text-center leading-normal">
                    {t('scheme.disclaimer')}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
