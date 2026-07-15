import { ElementType } from 'react';
import { ShieldCheck, Award, Truck, BadgeDollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BadgeItem {
  icon: ElementType;
  titleKey: string;
  subtitleKey: string;
}

const BADGES: BadgeItem[] = [
  { icon: ShieldCheck, titleKey: 'trust.bis', subtitleKey: 'trust.bis_desc' },
  { icon: Award, titleKey: 'trust.igi', subtitleKey: 'trust.igi_desc' },
  { icon: BadgeDollarSign, titleKey: 'trust.buyback', subtitleKey: 'trust.buyback_desc' },
  { icon: Truck, titleKey: 'trust.delivery', subtitleKey: 'trust.delivery_desc' },
];

export default function TrustBadges() {
  const { t } = useLanguage();

  return (
    <div id="trust-badges-strip" className="bg-gold-50 border-y border-gold-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
          {BADGES.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-2 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-gold-300 flex items-center justify-center text-maroon-700 shadow-xs mb-3 group-hover:bg-maroon-700 group-hover:text-gold-400 group-hover:border-maroon-700 transition-colors">
                  <IconComponent className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-xs font-bold text-maroon-800 tracking-wide">
                  {t(badge.titleKey)}
                </h4>
                <p className="text-[10px] text-gray-500 mt-1 max-w-[180px] mx-auto leading-relaxed">
                  {t(badge.subtitleKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
