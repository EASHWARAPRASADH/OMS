import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, UserCheck, Scale } from 'lucide-react';
import { motion } from 'motion/react';

interface LeaderMember {
  id: string;
  name: {
    en: string;
    ta: string;
    hi: string;
    te: string;
  };
  role: {
    en: string;
    ta: string;
    hi: string;
    te: string;
  };
  image?: string;
  initials: string;
  icon: any;
  description: {
    en: string;
    ta: string;
    hi: string;
    te: string;
  };
}

const LEADERS: LeaderMember[] = [
  {
    id: 'leader-1',
    name: {
      en: 'N. A. Kandhaswamy Chetty',
      ta: 'N. A. கந்தசாமி செட்டி',
      hi: 'एन. ए. कन्दस्वामी चेट्टी',
      te: 'ఎన్. ఎ. కందస్వామి శెట్టి'
    },
    role: {
      en: 'Founder',
      ta: 'நிறுவனர்',
      hi: 'संस्थापक',
      te: 'స్థాపకుడు'
    },
    image: '/assets/founder.png',
    initials: 'NAK',
    icon: Award,
    description: {
      en: 'Laid the foundation of pure trust and standard quality gold in Ariyalur in 1985.',
      ta: '1985 இல் அரியலூரில் தூய நம்பிக்கை மற்றும் தரமான தங்கத்திற்கான அடித்தளத்தை அமைத்தார்.',
      hi: '1985 में अरियलूर में शुद्ध विश्वास और गुणवत्तापूर्ण सोने की नींव रखी।',
      te: '1985లో అరియలూర్‌లో స్వచ్ఛమైన బంగారం మరియు నమ్మకానికి పునాది వేశారు.'
    }
  },
  {
    id: 'leader-2',
    name: {
      en: 'K. Karunanithi Chetty',
      ta: 'K. கருணாநிதி செட்டி',
      hi: 'के. करुणानिधि चेट्टी',
      te: 'కె. కరుణానిధి శెట్టి'
    },
    role: {
      en: 'Proprietor',
      ta: 'உரிமையாளர்',
      hi: 'प्रोपराइटर',
      te: 'ప్రొప్రైటర్'
    },
    image: '/assets/proprietor.png',
    initials: 'KKC',
    icon: ShieldCheck,
    description: {
      en: 'Guiding the business with integrity, expansion, and compliance under BIS standards.',
      ta: 'நேர்மை, வணிக வளர்ச்சி மற்றும் BIS தံதரங்களுடன் நிறுவனத்தை வழிநடத்துகிறார்.',
      hi: 'BIS मानकों के तहत अखंडता, विस्तार और अनुपालन के साथ व्यवसाय का मार्गदर्शन कर रहे हैं।',
      te: 'BIS ప్రమాణాలకు లోబడి నమ్మకం, ఎదుగుదలతో వ్యాపారాన్ని ముందుకు నడిపిస్తున్నారు.'
    }
  },
  {
    id: 'leader-3',
    name: {
      en: 'K. Prabhu Kumar Chetty',
      ta: 'K. பிரபு குமார் செட்டி',
      hi: 'के. प्रभु कुमार चेट्टी',
      te: 'కె. ప్ర‌భు కుమార్ శెట్టి'
    },
    role: {
      en: 'Chief Executive Officer (CEO)',
      ta: 'தலைமை நிர்வாக அதிகாரி (CEO)',
      hi: 'मुख्य कार्यकारी अधिकारी (CEO)',
      te: 'చీఫ్ ఎగ్జిక్యూటివ్ ఆఫీసర్ (CEO)'
    },
    initials: 'KPC',
    icon: UserCheck,
    description: {
      en: 'Driving modern retail upgrades, digital savings, and luxury concierge services.',
      ta: 'நவீன விற்பனை உத்திகள், டிஜிட்டல் சேமிப்பு திட்டங்கள் மற்றும் வாடிக்கையாளர் சேவைகளை இயக்குகிறார்.',
      hi: 'आधुनिक खुदरा अपग्रेड, डिजिटल बचत और लक्जरी द्वारपाल सेवाओं को चला रहे हैं।',
      te: 'ఆధునిక రిటైల్ విధానాలు, డిజిటల్ పొదుపు పథకాలను విజయవంతంగా అమలు చేస్తున్నారు.'
    }
  },
  {
    id: 'leader-4',
    name: {
      en: 'K. Krishna Kumar Chetty',
      ta: 'K. கிருஷ்ண குமார் செட்டி',
      hi: 'के. कृष्ण कुमार चेट्टी',
      te: 'కె. కృష్ణ కుమార్ శెట్టి'
    },
    role: {
      en: 'Legal Advisor',
      ta: 'சட்ட ஆலோசகர்',
      hi: 'कानूनी सलाहकार',
      te: 'న్యాయ సలహాదారు'
    },
    image: '/assets/advisor.png',
    initials: 'KKC',
    icon: Scale,
    description: {
      en: 'Ensuring absolute legal compliance, consumer trust, and institutional standard values.',
      ta: 'சட்ட நெறிமுறைகள், நுகர்வோர் பாதுகாப்பு மற்றும் நிறுவனத்தின் மதிப்புகளை உறுதி செய்கிறார்.',
      hi: 'पूर्ण कानूनी अनुपालन, उपभोक्ता विश्वास और संस्थागत मानक मूल्यों को सुनिश्चित करते हैं।',
      te: 'చట్టపరమైన నిబంధనలు మరియు వినియోగదారుల నమ్మకాన్ని పర్యవేక్షిస్తున్నారు.'
    }
  }
];

export default function LeadershipSection() {
  const { language } = useLanguage();

  const titleText = {
    en: 'Board of Directors & Leadership',
    ta: 'இயக்குநர்கள் குழு & தலைமை',
    hi: 'निदेशक मंडल और नेतृत्व',
    te: 'బోర్డ్ ఆఫ్ డైరెక్టర్స్ & నాయకత్వం'
  };

  const subtitleText = {
    en: 'Meet the visionaries guiding Om Sakthi Jewellery with transparent standards, pure ethics, and a legacy since 1985.',
    ta: '1985 முதல் தூய தரம், நேர்மை மற்றும் நன்மதிப்புடன் ஓம் சக்தி ஜுவல்லரியை வழிநடத்தும் தொலைநோக்கு சிந்தனையாளர்களை சந்தியுங்கள்.',
    hi: '1985 से पारदर्शी मानकों, शुद्ध नैतिकता और विरासत के साथ ओम शक्ति ज्वेलरी का मार्गदर्शन करने वाले दूरदर्शियों से मिलें।',
    te: '1985 నుండి పారదర్శకత, నమ్మకం మరియు విలువలతో ఓం శక్తి జ్యువెలరీని నడిపిస్తున్న నాయకులను కలవండి.'
  };

  return (
    <section id="leadership" className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-b border-gold-200">
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-maroon-900 tracking-tight">
            {titleText[language as keyof typeof titleText] || titleText.en}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            {subtitleText[language as keyof typeof subtitleText] || subtitleText.en}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LEADERS.map((leader, index) => {
            const LeaderIcon = leader.icon;
            const name = leader.name[language as keyof typeof leader.name] || leader.name.en;
            const role = leader.role[language as keyof typeof leader.role] || leader.role.en;
            const description = leader.description[language as keyof typeof leader.description] || leader.description.en;

            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image Container with Aspect Ratio */}
                <div className="aspect-[4/5] relative overflow-hidden bg-stone-900 border-b border-gold-200">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Elegant Radial Placeholder for CEO */
                    <div className="w-full h-full bg-gradient-to-br from-maroon-900 via-maroon-950 to-stone-950 flex flex-col items-center justify-center relative group-hover:from-maroon-850 group-hover:to-stone-900 transition-all duration-500">
                      {/* Decorative Gold Rings */}
                      <div className="absolute w-24 h-24 rounded-full border border-gold-400/10 animate-pulse" />
                      <div className="absolute w-36 h-36 rounded-full border border-gold-400/5 animate-pulse" style={{ animationDelay: '1s' }} />
                      <span className="font-serif text-3xl font-black text-gold-300 tracking-widest relative z-10">
                        {leader.initials}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-gold-400 font-bold mt-2 relative z-10 bg-maroon-950/80 px-2 py-0.5 rounded border border-gold-400/20">
                        Image Coming Soon
                      </span>
                    </div>
                  )}
                  {/* Subtle Top Right Role Icon Tag */}
                  <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-maroon-900/90 text-gold-300 flex items-center justify-center border border-gold-400/30 backdrop-blur-xs">
                    <LeaderIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Profile Text Details */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-maroon-950 group-hover:text-maroon-800 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-gold-600 font-mono">
                      {role}
                    </p>
                    <p className="text-xs text-stone-500 leading-relaxed pt-1">
                      {description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
