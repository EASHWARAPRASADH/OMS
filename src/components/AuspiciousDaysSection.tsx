import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AUSPICIOUS_DAYS } from '../data/auspiciousData';
import { AuspiciousDay } from '../types';
import { Calendar, Sparkles, Clock, Compass, Star, Search, MessageCircle, AlertCircle, Info, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AuspiciousDaysSection() {
  const { language, t } = useLanguage();
  
  // State for filtering
  const [selectedMonth, setSelectedMonth] = useState<string>('All'); // 'All', '07', '08', '09', '10', '11', '12'
  const [activeTab, setActiveTab] = useState<string>('all'); // 'all', 'tamil', 'festivals'
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Set default selected day as the first day in the dataset (July 13, 2026, which is "today" in metadata)
  const [selectedDay, setSelectedDay] = useState<AuspiciousDay>(AUSPICIOUS_DAYS[0]);

  // Handle day card selection
  const handleSelectDay = (day: AuspiciousDay) => {
    setSelectedDay(day);
    // Smoothly scroll the panchangam detail card into view on mobile
    if (window.innerWidth < 768) {
      document.getElementById('panchangam-detail-card')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Months labels list based on selected language
  const monthsList = [
    { value: 'All', label: language === 'ta' ? 'அனைத்தும்' : language === 'hi' ? 'सभी महीने' : language === 'te' ? 'అన్ని నెలలు' : 'All Months' },
    { value: '07', label: language === 'ta' ? 'ஜூலை' : language === 'hi' ? 'जुलाई' : language === 'te' ? 'జూలై' : 'July' },
    { value: '08', label: language === 'ta' ? 'ஆகஸ்ட்' : language === 'hi' ? 'अगस्त' : language === 'te' ? 'ఆగస్టు' : 'August' },
    { value: '09', label: language === 'ta' ? 'செப்டம்பர்' : language === 'hi' ? 'सितंबर' : language === 'te' ? 'సెప్టెంబర్' : 'September' },
    { value: '10', label: language === 'ta' ? 'அக்டோபர்' : language === 'hi' ? 'अक्टूबर' : language === 'te' ? 'అక్టోబర్' : 'October' },
    { value: '11', label: language === 'ta' ? 'நவம்பர்' : language === 'hi' ? 'नवंबर' : language === 'te' ? 'నవంబర్' : 'November' },
    { value: '12', label: language === 'ta' ? 'டிசம்பர்' : language === 'hi' ? 'दिसंबर' : language === 'te' ? 'డిసెంబర్' : 'December' }
  ];

  // Local translations dictionary inside the component to prevent missing keys in translations.ts
  const localT = {
    title: {
      en: 'Auspicious Days & Muhurtham Calendar 2026',
      ta: 'சுப முகூர்த்தம் & மங்களகரமான நாட்கள் 2026',
      hi: 'शुभ मुहूर्त और मांगलिक दिनों का कैलेंडर 2026',
      te: 'మంగళకరమైన రోజులు & ముహూర్తం క్యాలెండర్ 2026'
    },
    subtitle: {
      en: 'Plan your gold, diamond, and silver purchases on highly prosperous cosmic timings to secure wealth and ancestral blessings.',
      ta: 'செல்வமும் லட்சுமி கடாட்சமும் பெருக, சுப நேரங்களில் உங்கள் தங்கம், வைரம் மற்றும் வெள்ளி கொள்முதல்களைத் திட்டமிடுங்கள்.',
      hi: 'घर में सुख-समृद्धि लाने के लिए शुभ और मांगलिक समय पर अपनी सोने, चांदी और हीरे की खरीदारी की योजना बनाएं।',
      te: 'లక్ష్మీ కటాక్షం కోసం మరియు సంపద వృద్ధి కోసం శుభ ముహూర్తాలలో మీ బంగారం, వెండి కొనుగోళ్లను ప్లాన్ చేసుకోండి.'
    },
    searchPlaceholder: {
      en: 'Search festival or day (e.g. Dhanteras, Aadi, Muhurtham)...',
      ta: 'சுப நாள் அல்லது பண்டிகையைத் தேடுக (எ.கா. தனத்திரயோதசி, ஆடி, முகூர்த்தம்)...',
      hi: 'त्यौहार या दिन खोजें (जैसे धनतेरस, आडी, मुहूर्त)...',
      te: 'పండుగ లేదా శుభ దినం కోసం శోధించండి (ఉదా: ధన్‌తేరస్, ఆడి, ముహూర్తం)...'
    },
    tabAll: {
      en: 'All Auspicious Days',
      ta: 'அனைத்து சுப நாட்கள்',
      hi: 'सभी शुभ दिन',
      te: 'అన్ని శుభ దినాలు'
    },
    tabTamil: {
      en: 'Tamil & Telugu Special Days',
      ta: 'தமிழ் & தெலுங்கு விசேஷ நாட்கள்',
      hi: 'तमिल और तेलुगु विशेष दिन',
      te: 'తెలుగు మరియు తమిళ ప్రత్యేక రోజులు'
    },
    tabFestivals: {
      en: 'National Festivals',
      ta: 'தேசிய பண்டிகைகள்',
      hi: 'राष्ट्रीय त्यौहार',
      te: 'జాతీయ పండుగలు'
    },
    livePanchangam: {
      en: 'Live Shubh Muhurat Advisory',
      ta: 'நேரடி சுப முகூர்த்த வழிகாட்டி',
      hi: 'लाइव शुभ मुहूर्त परामर्शदाता',
      te: 'లైవ్ శుభ ముహూర్త సలహాదారు'
    },
    nallaNeram: {
      en: 'Nalla Neram (Auspicious Time)',
      ta: 'நல்ல நேரம் (சுப நேரம்)',
      hi: 'शुभ चौघड़िया (उत्तम समय)',
      te: 'నల్ల నేరం (శుభ సమయం)'
    },
    rahukalam: {
      en: 'Rahu Kaal (Avoid)',
      ta: 'ராகு காலம் (தவிர்க்கவும்)',
      hi: 'राहुकाल (वर्जित समय)',
      te: 'రాహుకాలం (వర్జ్యం)'
    },
    yamagandam: {
      en: 'Yama Gandam (Avoid)',
      ta: 'எமகண்டம் (தவிர்க்கவும்)',
      hi: 'यमगंड काल (वर्जित समय)',
      te: 'యమగండం (వర్జ్యం)'
    },
    advisoryHeader: {
      en: 'Gold Purchasing Factor',
      ta: 'தங்க கொள்முதல் பொருத்தம்',
      hi: 'स्वर्ण क्रय अनुकूलता सूचकांक',
      te: 'బంగారు కొనుగోలు అనుకూలత'
    },
    rateExcellent: {
      en: 'Supreme Prosperity (5/5 Stars)',
      ta: 'மகா மங்களகரமான உன்னத நாள் (5/5 நட்சத்திரங்கள்)',
      hi: 'अत्यंत शुभ और समृद्धिकारक (5/5 सितारे)',
      te: 'అత్యంత శుభప్రదం (5/5 నక్షత్రాలు)'
    },
    rateVeryGood: {
      en: 'Highly Auspicious (4/5 Stars)',
      ta: 'மிக்க நற்பேறு தரும் நாள் (4/5 நட்சத்திரங்கள்)',
      hi: 'अत्यधिक मंगलकारी दिन (4/5 सितारे)',
      te: 'మిక్కిలి అనుకూలం (4/5 నక్షత్రాలు)'
    },
    rateGood: {
      en: 'Good Day for Savings (3/5 Stars)',
      ta: 'சேமிப்புத் தொடங்க உகந்த நாள் (3/5 நட்சத்திரங்கள்)',
      hi: 'नियमित निवेश के लिए अनुकूल (3/5 सितारे)',
      te: 'పొదుపుకు మంచి రోజు (3/5 నక్షత్రాలు)'
    },
    whatsappBtn: {
      en: 'Book Gold / Lock Live Rate for this Day',
      ta: 'இந்த நாளுக்கான தங்க வீதத்தை முன்பதிவு செய்க',
      hi: 'इस दिन के लिए सोने का भाव बुक / लॉक करें',
      te: 'ఈ రోజు కోసం రేటు లాక్ / బుక్ చేయండి'
    },
    viewDetails: {
      en: 'Select Day to View Puja Advisory & Timings',
      ta: 'பூஜை நேரம் மற்றும் சுப விவரங்களைக் காண நாளைத் தேர்ந்தெடுக்கவும்',
      hi: 'पूजा मुहूर्त और शुभ समय देखने के लिए दिन चुनें',
      te: 'పూజా సమయాలు మరియు శుభ వివరాల కోసం రోజును ఎంచుకోండి'
    },
    noResults: {
      en: 'No auspicious days match your search query or filters. Check nearby months!',
      ta: 'தேடலுக்குப் பொருத்தமான சுப நாட்கள் எதுவும் இல்லை. மாற்று மாதங்களைத் தேர்ந்தெடுக்கவும்!',
      hi: 'आपके खोज मानदंडों के लिए कोई शुभ दिन उपलब्ध नहीं है। कृपया दूसरा महीना चुनें!',
      te: 'మీ శోధనకు తగిన శుభ దినాలు లేవు. ఇతర నెలలను ఎంచుకోండి!'
    },
    faqTitle: {
      en: 'Gold Purchasing & Auspicious Days FAQ',
      ta: 'தங்கம் வாங்குதல் & சுப நாட்கள் - அடிக்கடி கேட்கப்படும் கேள்விகள்',
      hi: 'स्वर्ण क्रय एवं शुभ मुहूर्त - सामान्य प्रश्नोत्तर',
      te: 'ఆభరణాల కొనుగోలు & శుభ ముహూర్తాలు - ప్రశ్నలు & సమాధానాలు'
    },
    q1: {
      en: 'Why is it important to buy gold on Tamil auspicious days like Aadi Velli or Pradhosham?',
      ta: 'ஆடி வெள்ளி அல்லது பிரதோஷம் போன்ற விசேஷ நாட்களில் தங்கம் வாங்குவதன் முக்கியத்துவம் என்ன?',
      hi: 'आडी शुक्रवार या प्रदोष जैसे शुभ दिनों पर सोना खरीदना क्यों महत्वपूर्ण माना जाता है?',
      te: 'ఆడి శుక్రవారం లేదా ప్రదోషం వంటి శుభ దినాలలో బంగారం కొనడం ఎందుకు ముఖ్యం?'
    },
    a1: {
      en: 'According to South Indian heritage, precious metals purchased on cosmic alignments representing growth (like Akshaya Tritiya, Pournami, and Aadi Fridays) act as visual anchors of prosperity. It is believed that buying gold during these sacred hours ensures the metal accumulates and never diminishes.',
      ta: 'தென்னிந்திய நம்பிக்கையின்படி, லட்சுமி கடாட்சம் நிறைந்த சுப நேரங்களிலும் ஆடி வெள்ளி, பௌர்ணமி போன்ற நாட்களிலும் வாங்கப்படும் தங்கம் வற்றாத செல்வ வளத்தை அளிக்கும். இந்நாளில் வாங்கும் பொன்னானது மேலும் மேலும் சேர்ந்து கொண்டே செல்லும் என்பது நம்பிக்கை.',
      hi: 'दक्षिण भारतीय मान्यताओं के अनुसार, सकारात्मक ऊर्जा और लक्ष्मी कृपा से युक्त शुभ समय पर सोना खरीदने से वह निरंतर बढ़ता है और घर में कभी भी आर्थिक संकुचन नहीं होता। आडी शुक्रवार और प्रदोष काल इसके प्रतीक हैं।',
      te: 'సాంప్రదాయ విశ్వాసాల ప్రకారం, శుభ ముహూర్తాలలో కొనుగోలు చేసిన బంగారం ఇంట్లో లక్ష్మీ దేవి స్థిర నివాసానికి దారి తీస్తుందని మరియు సంపద రోజురోజుకూ పెరుగుతుందని నమ్ముతారు.'
    },
    q2: {
      en: 'Can I lock-in today gold rate for upcoming festivals like Dhanteras?',
      ta: 'தனத்திரயோதசி போன்ற பண்டிகைகளுக்கு இன்றைய தங்க விலையிலேயே முன்கூட்டியே முன்பதிவு செய்ய முடியுமா?',
      hi: 'क्या मैं धनतेरस जैसे आगामी त्योहारों के लिए आज ही सोने की दर लॉक कर सकता हूँ?',
      te: 'ధన్‌తేరస్ వంటి రాబోయే పండుగల కోసం నేను ఈరోజే రేటును లాక్ చేయవచ్చా?'
    },
    a2: {
      en: 'Yes! Under the OMS DigiGold Accumulator and Super Gold Savings Schemes, you can pre-book equivalent gram weights or lock in your gold rate in advance. This shields you from typical price spikes that happen on heavy demand days like Dhanteras or Akshaya Tritiya.',
      ta: 'நிச்சயமாக! ஓஎம்எஸ் டிஜிகோல்டு மற்றும் சூப்பர் கோல்டு சேமிப்புத் திட்டங்கள் மூலம் நீங்கள் முன்கூட்டியே தங்க எடையை சேமித்து வைக்கலாம். இதன் மூலம் தீபாவளி, தனத்திரயோதசி போன்ற நாட்களில் ஏற்படும் தங்க விலை உயர்விலிருந்து உங்களைப் பாதுகாத்துக் கொள்ளலாம்.',
      hi: 'हाँ! हमारे ओएमएस डिजीगोल्ड स्मार्ट संचय और सुपर गोल्ड बचत योजना के तहत, आप पहले से ही सोने का भाव बुक कर सकते हैं। यह आपको धनतेरस या अक्षय तृतीया जैसे उच्च मांग वाले दिनों में अचानक बढ़ने वाली कीमतों से सुरक्षित रखता है।',
      te: 'అవును! ఓం శక్తి జ్యువెలరీ గోల్డ్ సేవింగ్స్ మరియు డిజిగోల్డ్ స్కీమ్ ద్వారా మీరు ముందస్తుగా రేటును లాక్ చేసి, పండుగల రోజున జరిగే ధరల పెరుగుదల నుండి రక్షణ పొందవచ్చు.'
    }
  };

  // Filtered days list
  const filteredDays = useMemo(() => {
    return AUSPICIOUS_DAYS.filter((day) => {
      // 1. Month filter
      if (selectedMonth !== 'All') {
        const dayMonth = day.date.split('-')[1];
        if (dayMonth !== selectedMonth) return false;
      }

      // 2. Category filter
      if (activeTab === 'tamil' && day.type !== 'tamil' && day.type !== 'both') return false;
      if (activeTab === 'festivals' && day.type !== 'general' && day.type !== 'both') return false;

      // 3. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesEn = day.title.en.toLowerCase().includes(query) || day.description.en.toLowerCase().includes(query);
        const matchesTa = day.title.ta.toLowerCase().includes(query) || day.description.ta.toLowerCase().includes(query);
        const matchesHi = day.title.hi.toLowerCase().includes(query) || day.description.hi.toLowerCase().includes(query);
        if (!matchesEn && !matchesTa && !matchesHi) return false;
      }

      return true;
    });
  }, [selectedMonth, activeTab, searchQuery]);

  // Generate dynamic WhatsApp message link for pre-booking gold
  const getWhatsAppLink = (day: AuspiciousDay) => {
    const festivalName = day.title[language] || day.title.en;
    const formattedDate = new Date(day.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const text = `Hi OMS Jewels, I am planning to purchase jewellery for the upcoming auspicious day: "${festivalName}" on ${formattedDate}. I would like to check options to pre-book gold weight or schedule a VIP lounge consultation at your boutique.`;
    return `https://wa.me/919443362126?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="auspicious-days" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-maroon-50/20 to-white border-t border-gold-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300 text-xs font-bold uppercase tracking-wider animate-pulse">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            {language === 'ta' ? 'அகில இந்திய சுப நேர வழிகாட்டி' : language === 'hi' ? 'अखिल भारतीय शुभ काल सूचक' : 'All-India Vedic Time Indicator'}
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-wide">
            {localT.title[language] || localT.title.en}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {localT.subtitle[language] || localT.subtitle.en}
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gold-200 flex flex-col gap-4">
          
          {/* Category Tabs & Search Row */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Traditional category buttons */}
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full lg:w-auto overflow-x-auto justify-start">
              <button
                id="btn-ausp-tab-all"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-1 lg:flex-none ${activeTab === 'all' ? 'bg-maroon-800 text-white shadow' : 'text-gray-600 hover:text-maroon-800'}`}
              >
                {localT.tabAll[language] || localT.tabAll.en}
              </button>
              <button
                id="btn-ausp-tab-tamil"
                onClick={() => setActiveTab('tamil')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-1 lg:flex-none ${activeTab === 'tamil' ? 'bg-maroon-800 text-white shadow' : 'text-gray-600 hover:text-maroon-800'}`}
              >
                {localT.tabTamil[language] || localT.tabTamil.en}
              </button>
              <button
                id="btn-ausp-tab-festivals"
                onClick={() => setActiveTab('festivals')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-1 lg:flex-none ${activeTab === 'festivals' ? 'bg-maroon-800 text-white shadow' : 'text-gray-600 hover:text-maroon-800'}`}
              >
                {localT.tabFestivals[language] || localT.tabFestivals.en}
              </button>
            </div>

            {/* Smart Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                id="inp-ausp-search"
                type="text"
                placeholder={localT.searchPlaceholder[language] || localT.searchPlaceholder.en}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-white"
              />
            </div>
          </div>

          {/* Month Filtering Slider */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pr-2 shrink-0">
                {language === 'ta' ? 'மாதம்:' : language === 'hi' ? 'महीना:' : 'Month:'}
              </span>
              {monthsList.map((m) => (
                <button
                  key={m.value}
                  id={`btn-month-${m.value}`}
                  onClick={() => setSelectedMonth(m.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[38px] flex items-center justify-center ${selectedMonth === m.value ? 'bg-gold-500 text-maroon-950 border-gold-600 font-bold' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Layout: Selected Day Details (Left/Interactive) & Filtered Days list (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Shubh Muhurat Advisory Dashboard Panel */}
          <div id="panchangam-detail-card" className="lg:col-span-5 bg-gradient-to-b from-maroon-900 to-maroon-950 text-white rounded-2xl p-6 shadow-xl border border-gold-400 relative overflow-hidden">
            {/* Background ambient gold ornament */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-maroon-800/25 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              
              {/* Card Header indicator */}
              <div className="flex justify-between items-center border-b border-gold-900/40 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm tracking-wide text-gold-300 uppercase">
                      {localT.livePanchangam[language] || localT.livePanchangam.en}
                    </h3>
                    <p className="text-[10px] text-gray-300">
                      {language === 'ta' ? 'அகில இந்திய சுப நேர விபரம்' : language === 'hi' ? 'भारतीय वैदिक काल' : 'Indian Standard Vedic Calendar'}
                    </p>
                  </div>
                </div>
                
                {/* Visual indicator of type */}
                <div className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider bg-gold-500 text-maroon-950">
                  {selectedDay.isMuhurtham ? (language === 'ta' ? 'முகூர்த்தம்' : language === 'hi' ? 'मुहूर्त' : 'Muhurtham') : (language === 'ta' ? 'பண்டிகை' : language === 'hi' ? 'त्यौहार' : 'Festival')}
                </div>
              </div>

              {/* Selected Day Date & Title Display */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gold-400 font-mono">
                  <Calendar className="w-4.5 h-4.5" />
                  {new Date(selectedDay.date).toLocaleDateString(language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white leading-snug tracking-wide">
                  {selectedDay.title[language] || selectedDay.title.en}
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  {selectedDay.description[language] || selectedDay.description.en}
                </p>
              </div>

              {/* Dynamic Gold-buying rating */}
              <div className="bg-maroon-900/60 p-4 rounded-xl border border-gold-900/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  {localT.advisoryHeader[language] || localT.advisoryHeader.en}
                </span>
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= selectedDay.goldBuyingFactor ? 'text-gold-400 fill-gold-400' : 'text-maroon-800'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">
                    {selectedDay.goldBuyingFactor === 5 ? (localT.rateExcellent[language] || localT.rateExcellent.en) :
                     selectedDay.goldBuyingFactor === 4 ? (localT.rateVeryGood[language] || localT.rateVeryGood.en) :
                     (localT.rateGood[language] || localT.rateGood.en)}
                  </span>
                </div>
              </div>

              {/* Panchangam Timings: Nalla Neram, Rahukalam, Yamagandam */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3.5 pt-2">
                
                {/* Nalla Neram */}
                <div className="flex items-start gap-2.5 bg-maroon-950/40 p-3 rounded-lg border border-gold-500/10">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wider">
                      {localT.nallaNeram[language] || localT.nallaNeram.en}
                    </span>
                    <span className="text-xs font-mono text-gray-100 font-medium">
                      {selectedDay.nallaNeram[language] || selectedDay.nallaNeram.en}
                    </span>
                  </div>
                </div>

                {/* Rahu Kaal & Yama Gandam Row */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Rahu Kaal */}
                  <div className="bg-maroon-950/40 p-3 rounded-lg border border-red-500/10">
                    <span className="text-[10px] font-bold text-rose-400 block uppercase tracking-wider">
                      {localT.rahukalam[language] || localT.rahukalam.en}
                    </span>
                    <span className="text-xs font-mono text-gray-300 font-medium">
                      {selectedDay.rahukalam}
                    </span>
                  </div>

                  {/* Yama Gandam */}
                  <div className="bg-maroon-950/40 p-3 rounded-lg border border-amber-500/10">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wider">
                      {localT.yamagandam[language] || localT.yamagandam.en}
                    </span>
                    <span className="text-xs font-mono text-gray-300 font-medium">
                      {selectedDay.yamagandam}
                    </span>
                  </div>

                </div>

              </div>

              {/* Call-to-Action VIP rate lock or booking */}
              <div className="pt-2">
                <a
                  href={getWhatsAppLink(selectedDay)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-500/10 text-xs sm:text-sm uppercase tracking-wider text-center"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  {localT.whatsappBtn[language] || localT.whatsappBtn.en}
                </a>
                <div className="flex items-center gap-1.5 justify-center mt-3 text-[10px] text-gray-300">
                  <AlertCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>
                    {language === 'ta' ? 'முன்பதிவு செய்வதன் மூலம் அன்றைய விலை ஏற்றத்திலிருந்து பாதுகாப்பு பெறலாம்.' : language === 'hi' ? 'पहले से बुक करने पर आप उस दिन होने वाली मूल्य वृद्धि से बचते हैं।' : 'Rate locking shields you from market spikes on peak demand days.'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Grid/List of Auspicious Days */}
          <div className="lg:col-span-7 space-y-4 max-h-[640px] overflow-y-auto pr-1">
            
            <AnimatePresence mode="popLayout">
              {filteredDays.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-200"
                >
                  <Info className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600">
                    {localT.noResults[language] || localT.noResults.en}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {filteredDays.map((day) => {
                    const isSelected = selectedDay.id === day.id;
                    const dateObj = new Date(day.date);
                    const dayNum = dateObj.getDate();
                    const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' });

                    return (
                      <motion.div
                        key={day.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleSelectDay(day)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-center relative ${isSelected ? 'bg-maroon-50 border-gold-500 shadow-sm' : 'bg-white border-gray-200 hover:border-gold-300 hover:shadow-sm'}`}
                      >
                        
                        {/* Date badge */}
                        <div className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center border shrink-0 ${isSelected ? 'bg-maroon-800 text-white border-maroon-900 shadow-inner' : 'bg-gray-50 text-gray-800 border-gray-200'}`}>
                          <span className="text-xl font-bold font-mono tracking-tight leading-none">{dayNum}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5 leading-none text-gold-600">{monthStr}</span>
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          
                          {/* Type indicators */}
                          <div className="flex items-center gap-1.5">
                            {day.isMuhurtham && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider bg-gold-100 text-maroon-900 border border-gold-200 uppercase">
                                {language === 'ta' ? 'சுப முகூர்த்தம்' : language === 'hi' ? 'शुभ मुहूर्त' : 'Subha Muhurtham'}
                              </span>
                            )}
                            {day.isFestival && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-150 uppercase">
                                {language === 'ta' ? 'பண்டிகை' : language === 'hi' ? 'त्यौहार' : 'Festival'}
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400 font-mono pl-1">{day.date}</span>
                          </div>

                          {/* Day Title */}
                          <h5 className="font-serif font-bold text-sm text-gray-900 truncate tracking-wide">
                            {day.title[language] || day.title.en}
                          </h5>

                          {/* Brief teaser of nalla neram */}
                          <p className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                            <Clock className="w-3 h-3 text-emerald-500" />
                            <span>{localT.nallaNeram[language] || localT.nallaNeram.en}:</span>
                            <span className="font-mono text-gray-700 font-medium">{day.nallaNeram[language] || day.nallaNeram.en}</span>
                          </p>
                        </div>

                        {/* Chevron right click indicator */}
                        <div className="shrink-0">
                          <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-maroon-800 translate-x-0.5' : 'text-gray-300'}`} />
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* FAQ Section: Educational value regarding Gold Purchases & Cosmic timings */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 mt-6 space-y-6">
          <h4 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-3">
            <HelpCircle className="w-5 h-5 text-gold-600" />
            {localT.faqTitle[language] || localT.faqTitle.en}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-xs text-maroon-900 uppercase tracking-wide">
                {localT.q1[language] || localT.q1.en}
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {localT.a1[language] || localT.a1.en}
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-xs text-maroon-900 uppercase tracking-wide">
                {localT.q2[language] || localT.q2.en}
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {localT.a2[language] || localT.a2.en}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
