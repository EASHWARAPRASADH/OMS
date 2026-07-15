import { useState, FormEvent } from 'react';
import { STORES } from '../data/jewelryData';
import { X, MapPin, Phone, Clock, CalendarCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreLocatorModal({ isOpen, onClose }: StoreLocatorModalProps) {
  const { t } = useLanguage();
  const [selectedStoreId, setSelectedStoreId] = useState(STORES[0].id);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentStore = STORES.find(s => s.id === selectedStoreId) || STORES[0];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert('Please fill out booking date and time slot.');
      return;
    }
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingDate('');
      setBookingTime('');
      alert(`Lounge appointment booked! Your secure entry passcode is OMS-PASS-${Math.floor(Math.random() * 8000 + 1000)}. Our boutique relationship manager at ${currentStore.city} has reserved a private desk for you.`);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black cursor-pointer"
      />

      {/* Modal Dialog container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-gold-300 z-50 relative flex flex-col md:flex-row max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left column: Stores listing */}
        <div className="w-full md:w-1/3 border-r border-gray-100 bg-gray-50/70 p-5 flex flex-col justify-between overflow-y-auto min-h-[250px] md:max-h-[600px] text-left">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-maroon-800 border-b border-gray-200 pb-2 flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-gold-500" /> {t('store.title') || 'Our Boutiques'}
            </h3>
            
            <div className="space-y-3">
              {STORES.map((store) => (
                <button
                  key={store.id}
                  onClick={() => {
                    setSelectedStoreId(store.id);
                    setBookingSubmitted(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedStoreId === store.id
                      ? 'bg-white border-gold-500 shadow-md ring-1 ring-gold-400'
                      : 'bg-white/50 border-gray-200 hover:border-gold-300'
                  }`}
                >
                  <p className="font-serif font-bold text-xs text-maroon-800">{store.city}</p>
                  <p className="text-[10px] text-gray-500 line-clamp-1 mt-1 leading-normal">{store.address}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-medium">
            {t('store.support') || 'OMS Jewels customer support desk operates daily 10:00 AM - 09:00 PM IST.'}
          </div>
        </div>

        {/* Right column: Detailed Store & appointment booking */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[90vh] md:max-h-[600px] text-left flex flex-col justify-between gap-6">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <h4 className="font-serif font-bold text-xl text-maroon-800">{currentStore.city}</h4>
              <p className="text-xs text-gold-600 font-serif italic mt-0.5">{t('store.subtitle') || 'Flagship Luxury Boutique Store'}</p>
            </div>

            {/* Timings, Address, Phone */}
            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <MapPin className="w-4 h-4 text-maroon-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800">{t('store.address') || 'Boutique Address:'}</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">{currentStore.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Phone className="w-4 h-4 text-maroon-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-800">{t('store.phone') || 'Phone Hotline:'}</p>
                    <p className="text-gray-600 font-mono mt-0.5">{currentStore.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Clock className="w-4 h-4 text-maroon-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-800">{t('store.hours') || 'Lounge Hours:'}</p>
                    <p className="text-gray-600 mt-0.5">{currentStore.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Simulated Map display */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-gold-200 shadow-inner bg-gray-100">
              <img
                src={`https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800&h=200`}
                alt="Store Map Placeholder"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 grayscale"
              />
              <div className="absolute inset-0 bg-maroon-900/10 flex items-center justify-center">
                <div className="bg-white/90 border border-gold-400 px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-xs">
                  <p className="text-xs font-bold text-maroon-800 flex items-center gap-1.5 justify-center">
                    <MapPin className="w-4 h-4 text-rose-600" /> OMS {currentStore.city.split(' ')[0]} Store
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Directions mapped. Offline navigation available.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Appointment lounge Form */}
          <div className="border-t border-gray-100 pt-5 space-y-4">
            <h5 className="font-serif font-bold text-sm text-maroon-800 flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-gold-500" /> {t('store.book_lounge') || 'Book Private Lounge Slot'}
            </h5>

            {bookingSubmitted ? (
              <p className="text-xs text-emerald-600 bg-emerald-50 p-2.5 rounded border border-emerald-100 font-semibold text-center">
                Reserving your private jeweler seat...
              </p>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t('store.select_date') || 'Select Date'}
                  </label>
                  <input
                    type="date"
                    required
                    min="2026-07-13"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t('store.select_time') || 'Preferred Time Slot'}
                  </label>
                  <select
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option value="">Choose slot</option>
                    <option value="morning">10:30 AM - 12:30 PM</option>
                    <option value="noon">01:00 PM - 03:00 PM</option>
                    <option value="afternoon">03:30 PM - 05:30 PM</option>
                    <option value="evening">06:00 PM - 08:30 PM</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-maroon-700 hover:bg-maroon-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-md uppercase tracking-wide border border-gold-600/30"
                >
                  {t('store.confirm_booking') || 'Confirm Appointment'} <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </button>
              </form>
            )}

            <div className="flex gap-3 justify-end">
              <a
                href={currentStore.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" /> Direct WhatsApp Inquiry
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

