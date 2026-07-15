import { useState, FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, Mail, MapPin, Calendar, Award, Share2, 
  Download, Check, Copy, RefreshCw, Send, Sparkles, CreditCard, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DigitalBusinessCard() {
  const { language, t } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sharePhone, setSharePhone] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Profile data in multiple languages for perfect fidelity
  const cardData = {
    en: {
      name: 'OM SAKTHI JEWELLERY',
      founder: 'N. A. Kandaswami Chetty',
      proprietor: 'K. Karunanithi Chetty',
      established: '24/11/1985',
      address: '45, Periya Kadai Veedhi, Ariyalur – 621704, Tamil Nadu, India',
      phone: '+91-9443362126',
      email: 'shop@omsjewels.com',
      specialities: [
        'Government Licensed HUID Hallmark Jewellery',
        'Exclusive Collection of Diamond, Platinum, Gold & Silver Jewellery',
        'Wide Range of Gift Articles',
        'Best Jewellery Exchange Offers',
        'Lab-Certified Navaratna Gemstones',
        'Member in MJDTA',
        'Complete client satisfaction',
        'Ethical business policies',
        'Live In Touch With Our Customers',
        'Transparent dealings',
        'We listen, We understand, We provide Solution',
        'A great experience with Happy clients'
      ],
      labels: {
        founderLabel: 'Founder',
        proprietorLabel: 'Proprietor',
        estLabel: 'Established On',
        aboutHeader: 'About Our Legacy',
        specsHeader: 'Our Specialities',
        addContact: 'Add to Phone Book',
        paymentHeader: 'UPI Payment Options',
        paymentDesc: 'Pay securely via major UPI applications using our dedicated terminal number:',
        copied: 'Copied!',
        shareTitle: 'Share Profile to WhatsApp',
        shareDesc: 'Enter any WhatsApp number to share this business card instantly:',
        shareBtn: 'Share via WhatsApp',
        qrTitle: 'Scan to Open Digital Profile',
        qrLinkText: 'mikivcard.com/om-sakthi-jewellery',
        saveQr: 'Download Profile QR',
        flipBtn: 'Flip to View Details',
        flipBackBtn: 'Flip to View Front',
        contactDetails: 'Contact Details',
        sharePlaceholder: 'Enter mobile (e.g., 9443362126)',
      }
    },
    hi: {
      name: 'ओम शक्ति ज्वेलरी',
      founder: 'N A कन्दस्वामी चेट्टी',
      proprietor: 'K करुणानिधि चेट्टी',
      established: '२४/११/१९८५',
      address: '४५, पेरिय कडै वीथि, अरियलूर - ६२१७०४, तमिलनाडु, भारत',
      phone: '+91-9443362126',
      email: 'shop@omsjewels.com',
      specialities: [
        'Govt Licensed HUID हाॅलमार्क ज्वेलरी',
        'हीरा, प्लैटिनम, सोना और चांदी आभूषणों का संग्रह',
        'उपहार सामग्री',
        'सर्वोत्तम एक्सचेंज ऑफर',
        'Lab Certified नवरत्नों',
        'MJDTA के गौरवान्वित सदस्य',
        'पूर्ण ग्राहक संतुष्टि',
        'नैतिक व्यावसायिक नीतियां',
        'हमारे ग्राहकों के साथ लाइव संपर्क',
        'पारदर्शी लेनदेन',
        'हम सुनते हैं, समझते हैं, समाधान प्रदान करते हैं',
        'खुश ग्राहकों के साथ एक शानदार अनुभव'
      ],
      labels: {
        founderLabel: 'संस्थापक',
        proprietorLabel: 'प्रोपराइटर',
        estLabel: 'स्थापना तिथि',
        aboutHeader: 'हमारी विरासत के बारे में',
        specsHeader: 'हमारी विशेषताएं',
        addContact: 'फ़ोन बुक में सहेजें',
        paymentHeader: 'यूपीआई भुगतान विकल्प',
        paymentDesc: 'हमारे समर्पित टर्मिनल नंबर का उपयोग करके प्रमुख यूपीआई ऐप्स के माध्यम से सुरक्षित भुगतान करें:',
        copied: 'कॉपी किया गया!',
        shareTitle: 'व्हाट्सएप पर प्रोफाइल साझा करें',
        shareDesc: 'इस डिजिटल बिजनेस कार्ड को तुरंत साझा करने के लिए कोई भी व्हाट्सएप नंबर दर्ज करें:',
        shareBtn: 'व्हाट्सएप के माध्यम से साझा करें',
        qrTitle: 'डिजिटल प्रोफाइल खोलने के लिए स्कैन करें',
        qrLinkText: 'mikivcard.com/om-sakthi-jewellery',
        saveQr: 'प्रोफ़ाइल क्यूआर डाउनलोड करें',
        flipBtn: 'विवरण देखने के लिए पलटें',
        flipBackBtn: 'सामने का भाग देखें',
        contactDetails: 'संपर्क विवरण',
        sharePlaceholder: 'मोबाइल नंबर दर्ज करें (उदा. 9443362126)',
      }
    },
    ta: {
      name: 'ஓம்சக்தி ஜுவல்லரி',
      founder: 'N. A. கந்தசாமி செட்டி',
      proprietor: 'K. கருணாநிதி செட்டி',
      established: '24/11/1985',
      address: '45, பெரிய கடை வீதி, அரியலூர் – 621704, தமிழ்நாடு, இந்தியா',
      phone: '+91-9443362126',
      email: 'shop@omsjewels.com',
      specialities: [
        'அரசு அங்கீகாரம் பெற்ற HUID ஹால்மார்க் நகைகள்',
        'வைரம், பிளாட்டினம், தங்கம் மற்றும் வெள்ளி நகைகள்',
        'அன்பளிப்பு பொருட்கள்',
        'சிறந்த நகை மாற்று (Exchange) சலுகைகள்',
        'ஆய்வகச் சான்றிதழ் பெற்ற நவரத்தினங்கள்',
        'MJDTA அமைப்பின் உறுப்பினர்',
        'முழுமையான வாடிக்கையாளர் திருப்தி',
        'நேர்மையான வணிகக் கொள்கைகள்',
        'எப்போதும் வாடிக்கையாளர்களுடன் நேரடித் தொடர்பு',
        'வெளிப்படையான பரிவர்த்தனைகள்',
        'நாங்கள் கேட்கிறோம், புரிகிறோம், தீர்வு வழங்குகிறோம்',
        'மகிழ்ச்சியான வாடிக்கையாளர்களுடன் சிறந்த அனுபவம்'
      ],
      labels: {
        founderLabel: 'நிறுவனர்',
        proprietorLabel: 'உரிமையாளர்',
        estLabel: 'தொடக்கம்',
        aboutHeader: 'எங்கள் பாரம்பரியம்',
        specsHeader: 'எங்களின் சிறப்பம்சங்கள்',
        addContact: 'தொடர்பை போனில் சேர்க்க',
        paymentHeader: 'UPI பணம் செலுத்தும் வசதி',
        paymentDesc: 'எங்கள் பிரத்யேக எண்ணைப் பயன்படுத்தி உங்களுக்கு விருப்பமான UPI செயலிகள் மூலம் பாதுகாப்பாகப் பணம் செலுத்துங்கள்:',
        copied: 'நகலெடுக்கப்பட்டது!',
        shareTitle: 'வாட்ஸ்அப்பில் சுயவிவரத்தைப் பகிர்க',
        shareDesc: 'இந்த வணிக அட்டையை உடனடியாகப் பகிர ஏதேனும் ஒரு வாட்ஸ்அப் எண்ணை உள்ளிடவும்:',
        shareBtn: 'வாட்ஸ்அப் மூலம் பகிர்க',
        qrTitle: 'சுயவிவரத்தைத் திறக்க ஸ்கேன் செய்க',
        qrLinkText: 'mikivcard.com/om-sakthi-jewellery',
        saveQr: 'சுயவிவர QR சேமிக்க',
        flipBtn: 'விவரங்களைக் காண திருப்பவும்',
        flipBackBtn: 'முன்பக்கத்தைக் காண திருப்பவும்',
        contactDetails: 'தொடர்பு விபரங்கள்',
        sharePlaceholder: 'மொபைல் எண் உள்ளிடவும் (उदा. 9443362126)',
      }
    }
  };

  // Get active translation block based on current app language
  const d = cardData[language as 'en' | 'hi' | 'ta'] || cardData.en;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const downloadVCard = () => {
    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Om Sakthi Jewellery Support',
      'ORG:Om Sakthi Jewellery',
      'TITLE:Jewelry Concierge',
      'TEL;TYPE=WORK,CELL:+919443362126',
      'EMAIL;TYPE=PREF,INTERNET:shop@omsjewels.com',
      'ADR;TYPE=WORK:;;45, Periya Kadai Veedhi;Ariyalur;Tamil Nadu;621704;India',
      'URL:https://mikivcard.com/om-sakthi-jewellery',
      'NOTE:Founder: N.A. Kandaswami Chetty\\nProprietor: K. Karunanithi Chetty\\nEstablished On: 24/11/1985',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Om_Sakthi_Jewellery.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!sharePhone.trim()) return;

    // Remove non-digit chars
    const cleaned = sharePhone.replace(/\D/g, '');
    const finalNumber = cleaned.startsWith('91') && cleaned.length === 12 ? cleaned : `91${cleaned}`;
    
    const shareUrl = `https://wa.me/${finalNumber}?text=Please%20view%20the%20digital%20business%20card%20of%20Om%20Sakthi%20Jewellery%20at%20https%3A%2F%2Fmikivcard.com%2Fom-sakthi-jewellery`;
    window.open(shareUrl, '_blank');
    
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-b border-gold-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 bg-gold-100/80 px-3.5 py-1.5 rounded-full border border-gold-200 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" /> VIRTUAL BUSINESS DESK
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-maroon-900 tracking-tight">
            {d.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            Founded in 1985, we continue our unwavering commitment to pure BIS 916 hallmarked jewelry, transparent ethical dealings, and bespoke client satisfaction in Ariyalur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Dynamic Rotatable Business Card Presentation (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            
            {/* Perspective wrapper */}
            <div className="w-full max-w-md h-[300px] [perspective:1000px] relative">
              <motion.div 
                className="w-full h-full duration-700 [transform-style:preserve-3d] shadow-xl rounded-2xl relative"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                
                {/* CARD FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-radial from-maroon-800 via-maroon-900 to-stone-950 text-white border border-gold-400 [backface-visibility:hidden] flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Card corner gold patterns */}
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold-400/30 rounded-tr-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-gold-400/30 rounded-bl-2xl pointer-events-none" />
                  
                  {/* Top Bar with brand icon & Date */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center border border-white">
                        <span className="font-serif font-bold text-xs text-maroon-900">OMS</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif font-black text-xs text-gold-300 tracking-wide">{d.name}</span>
                        <span className="text-[7px] text-stone-300 tracking-wider uppercase font-semibold">Legacy of Pure Trust</span>
                      </div>
                    </div>
                    <div className="bg-gold-500/10 border border-gold-400/30 px-2 py-0.5 rounded text-[8px] font-mono text-gold-300 flex items-center gap-1">
                      <Calendar className="w-2 h-2" /> EST. 1985
                    </div>
                  </div>

                  {/* Middle Section: Founders & Proprietor names */}
                  <div className="space-y-3 relative z-10 my-4 text-left">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-gold-400 font-bold block">{d.labels.founderLabel}</span>
                      <h4 className="font-serif text-base font-bold text-stone-100">{d.founder}</h4>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-gold-400 font-bold block">{d.labels.proprietorLabel}</span>
                      <h4 className="font-serif text-base font-bold text-stone-100">{d.proprietor}</h4>
                    </div>
                  </div>

                  {/* Bottom Strip: Phone, Email, Location */}
                  <div className="border-t border-gold-500/20 pt-3 flex flex-col gap-1 text-left relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-200">
                      <Phone className="w-3 h-3 text-gold-400 shrink-0" />
                      <span className="font-mono">{d.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-200">
                      <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                      <span className="truncate max-w-[280px]">{d.address}</span>
                    </div>
                  </div>
                </div>

                {/* CARD BACK SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-radial from-stone-900 via-stone-950 to-stone-900 text-white border border-gold-400 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-maroon-900/5 pointer-events-none" />
                  
                  {/* Top Bar with Brand and title */}
                  <div className="flex justify-between items-center relative z-10 border-b border-stone-800 pb-2">
                    <h5 className="font-serif font-extrabold text-xs text-gold-300 uppercase tracking-wide">{d.labels.paymentHeader}</h5>
                    <span className="font-serif text-[9px] text-stone-400 font-semibold">{d.labels.qrLinkText}</span>
                  </div>

                  {/* Payment Details Row */}
                  <div className="space-y-3 my-4 relative z-10 text-left">
                    <p className="text-[9px] text-stone-400 leading-relaxed">
                      {d.labels.paymentDesc}
                    </p>
                    
                    <div className="bg-stone-900 border border-stone-800 rounded-lg p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-maroon-950 rounded border border-gold-500/20 flex items-center justify-center">
                          <CreditCard className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-[8px] text-stone-400 uppercase font-semibold leading-none">UPI Number</p>
                          <p className="text-[11px] font-bold font-mono text-stone-100 mt-0.5">+91 94433 62126</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleCopy('+91-9443362126', 'payNumber')}
                        className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-gold-400 transition-colors cursor-pointer"
                        title="Copy Number"
                      >
                        {copiedText === 'payNumber' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-[8px] text-stone-400 px-1 pt-1 font-mono uppercase tracking-wider">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Paytm</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> PhonePe</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Google Pay</span>
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className="border-t border-stone-800 pt-2.5 flex justify-between items-center relative z-10 text-[9px] text-stone-400">
                    <span className="font-semibold text-gold-400">HUID Hallmark Accredited</span>
                    <span>100% Secure Retail</span>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Flip / Action controls below card */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-bold text-xs py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 border border-gold-500/30 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
                {isFlipped ? d.labels.flipBackBtn : d.labels.flipBtn}
              </button>

              <button
                onClick={downloadVCard}
                className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-xs py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                {d.labels.addContact}
              </button>
            </div>

          </div>

          {/* RIGHT: Specialities, Contact Lists, WhatsApp Share, QR code (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Content Tabs (Specialities vs About Card) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5 text-left">
              <h3 className="font-serif font-black text-lg text-maroon-800 flex items-center gap-2 border-b border-stone-100 pb-3">
                <Award className="w-5 h-5 text-gold-600" /> {d.labels.specsHeader}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {d.specialities.map((spec, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-2.5 text-xs p-2.5 rounded-lg bg-stone-50 border border-stone-100 hover:border-gold-200 transition-colors hover:bg-gold-50/20"
                  >
                    <ChevronRight className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span className="text-stone-700 font-semibold">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom tools row: QR code scan & WhatsApp sharing widget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* WhatsApp Quick share widget */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-maroon-800 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                    <Share2 className="w-4 h-4 text-emerald-600" /> {d.labels.shareTitle}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-2">
                    {d.labels.shareDesc}
                  </p>
                </div>

                <form onSubmit={handleShareWhatsApp} className="mt-4 space-y-2">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder={d.labels.sharePlaceholder}
                      value={sharePhone}
                      onChange={(e) => setSharePhone(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 border border-stone-200 rounded-lg text-xs focus:border-gold-500 focus:outline-none"
                    />
                    <div className="absolute right-3 top-2.5 text-stone-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> {d.labels.shareBtn}
                  </button>

                  <AnimatePresence>
                    {shareSuccess && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-emerald-600 font-bold text-center mt-1"
                      >
                        Opened WhatsApp chat link successfully!
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* QR profile scanner */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm text-left flex items-center gap-4">
                <div className="shrink-0 bg-stone-50 border border-stone-200 p-2 rounded-xl shadow-inner relative group">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://mikivcard.com/om-sakthi-jewellery&color=800000&bgcolor=fff7ed"
                    alt="Digital Profile QR"
                    className="w-24 h-24 object-contain rounded"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 rounded group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex flex-col justify-between h-full py-1">
                  <div>
                    <h4 className="font-serif font-extrabold text-xs text-maroon-800 uppercase tracking-wide leading-tight">
                      {d.labels.qrTitle}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-gold-600 block mt-1 hover:underline">
                      {d.labels.qrLinkText}
                    </span>
                    <p className="text-[9px] text-stone-400 mt-1 leading-tight">
                      Scan to browse this store catalog directly on your mobile device.
                    </p>
                  </div>

                  <a
                    href="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https://mikivcard.com/om-sakthi-jewellery&color=800000&bgcolor=fff7ed"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-maroon-700 font-bold hover:text-gold-600 hover:underline flex items-center gap-1 mt-2 transition-colors"
                  >
                    <Download className="w-3 h-3" /> {d.labels.saveQr}
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
