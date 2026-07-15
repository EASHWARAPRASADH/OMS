import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Globe, Award, Shield, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { STORES } from '../data/jewelryData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenStoreLocator: () => void;
}

export default function Footer({ onOpenStoreLocator }: FooterProps) {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
      alert('Thank you for subscribing to OMS Luxury Bulletin. Expect exclusive jewelry design launches and VIP rates.');
    }, 1500);
  };

  return (
    <footer id="main-footer" className="bg-maroon-900 text-gray-300 border-t border-gold-500/20 pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top: Newsletter signup & App Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10 border-b border-gray-100/10 items-center">
          
          {/* Newsletter Left column */}
          <div className="text-left space-y-2">
            <h3 className="font-serif font-bold text-lg text-white tracking-wide flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold-400" /> {t('footer.newsletter_title')}
            </h3>
            <p className="text-xs text-gray-400 max-w-md">
              {t('footer.newsletter_desc')}
            </p>
            
            <form onSubmit={handleSubscribeSubmit} className="pt-2 flex gap-2 max-w-md">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder={t('footer.email_placeholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 font-mono focus:ring-1 focus:ring-gold-500"
              />
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                {subscribed ? 'Subscribing...' : t('footer.subscribe_btn')}
              </button>
            </form>
          </div>

          {/* App Store Downloads Right column */}
          <div className="lg:text-right space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">{t('footer.app_title')}</h4>
            <p className="text-xs text-gray-400 lg:max-w-xs lg:ml-auto">
              {t('footer.app_desc')}
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {/* Google Play Store button mockup */}
              <a 
                href="#download-playstore" 
                onClick={(e) => { e.preventDefault(); alert('Google Play Store package loading... Try out our upcoming beta version!'); }}
                className="bg-black/40 hover:bg-black/60 border border-white/10 hover:border-gold-400 rounded-lg py-2 px-4 flex items-center gap-2 transition-all cursor-pointer text-left"
              >
                <div className="text-white">
                  <p className="text-[8px] uppercase leading-none text-gray-400">Get it on</p>
                  <p className="text-xs font-bold font-sans mt-0.5">Google Play</p>
                </div>
              </a>
              {/* Apple App Store button mockup */}
              <a 
                href="#download-appstore" 
                onClick={(e) => { e.preventDefault(); alert('Apple App Store package loading... Try out our upcoming beta version!'); }}
                className="bg-black/40 hover:bg-black/60 border border-white/10 hover:border-gold-400 rounded-lg py-2 px-4 flex items-center gap-2 transition-all cursor-pointer text-left"
              >
                <div className="text-white">
                  <p className="text-[8px] uppercase leading-none text-gray-400">Download on the</p>
                  <p className="text-xs font-bold font-sans mt-0.5">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Middle: Columns & Store listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Corporate Columns */}
          <div className="text-left space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">{t('footer.corp_info')}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-gold-400 transition-colors">{t('footer.about')}</a></li>
              <li><a href="#management" className="hover:text-gold-400 transition-colors">{t('footer.board')}</a></li>
              <li><a href="#careers" className="hover:text-gold-400 transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#investors" className="hover:text-gold-400 transition-colors">{t('footer.investors')}</a></li>
              <li><a href="#press" className="hover:text-gold-400 transition-colors">{t('footer.press')}</a></li>
            </ul>
          </div>

          <div className="text-left space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">{t('footer.quick_links') || 'Let Us Help You'}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#size-guide" className="hover:text-gold-400 transition-colors">{t('footer.gold_rate_history')}</a></li>
              <li><a href="#contact" className="hover:text-gold-400 transition-colors">{t('top.help')}</a></li>
              <li><a href="#book-appointment" className="hover:text-gold-400 transition-colors">{t('store.book_lounge')}</a></li>
              <li><a href="#customization" className="hover:text-gold-400 transition-colors">{t('footer.custom_jewelry')}</a></li>
            </ul>
          </div>

          <div className="text-left space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">{t('footer.services') || 'Our Policies'}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#returns" className="hover:text-gold-400 transition-colors">{t('footer.gold_exchange')}</a></li>
              <li><a href="#shipping" className="hover:text-gold-400 transition-colors">{t('footer.doorstep_purity')}</a></li>
              <li><a href="#privacy" className="hover:text-gold-400 transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#terms" className="hover:text-gold-400 transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#buyback" className="hover:text-gold-400 transition-colors">{t('footer.savings_scheme_faq')}</a></li>
            </ul>
          </div>

          {/* Detailed Boutique Stores List */}
          <div className="text-left space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">{t('store.title')}</h4>
            <div className="space-y-3.5 text-xs">
              {STORES.slice(0, 3).map((store) => (
                <div key={store.id} className="space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" /> {store.city}
                  </p>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed pl-5">{store.address}</p>
                </div>
              ))}
              <button
                onClick={onOpenStoreLocator}
                className="text-xs text-gold-400 font-bold hover:underline pl-5"
              >
                {t('store.select_btn')} &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info and Social Block */}
        <div className="border-t border-gray-100/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-white text-base">{t('footer.corporate_office') || 'Om Sakthi Jewellery Head Office'}</h4>
            <p className="text-xs text-gray-400">
              45, Periya Kadai Veedhi, Ariyalur – 621704, Tamil Nadu, India
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-300">
              <a href="mailto:shop@omsjewels.com" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gold-400" /> shop@omsjewels.com
              </a>
              <a href="tel:+919443362126" className="hover:text-gold-400 transition-colors flex items-center gap-1.5 font-mono">
                <Phone className="w-4 h-4 text-gold-400" /> +91-9443362126
              </a>
            </div>
          </div>

          {/* Social icons */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-widest text-gold-400 md:text-right">Connect With Us</h5>
            <div className="flex gap-3">
              {[
                { icon: Facebook, link: '#facebook' },
                { icon: Twitter, link: '#twitter' },
                { icon: Instagram, link: '#instagram' },
                { icon: Youtube, link: '#youtube' }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.link}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-maroon-700 hover:text-gold-400 hover:border-maroon-700 transition-all flex items-center justify-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Legal copy */}
        <div className="border-t border-gray-100/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p className="text-center sm:text-left">
            &copy; 2026 Om Sakthi Jewellery. All Rights Reserved. Branded digital business card profile of Kandhaswamy & Karunanithi Chetty.
            <a href="#/admin" className="ml-3 text-stone-500 hover:text-gold-400 hover:underline transition-colors font-semibold">Staff Login</a>
          </p>
          <div className="flex gap-4 text-[11px]">
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-gold-500" /> BIS Hallmarked HUID 916</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-gold-500" /> Secure Payments</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
