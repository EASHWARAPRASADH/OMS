import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Award, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HeroCarouselProps {
  slides?: any[];
}

export default function HeroCarousel({ slides = [] }: HeroCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // default to muted for autoplay safety
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (slides[currentIdx]?.mediaType === 'video') {
      return;
    }
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIdx, slides.length]);

  const currentSlide = slides[currentIdx];

  // Try playing video unmuted, falling back to muted if blocked by browser autoplay policy
  useEffect(() => {
    if (currentSlide?.mediaType === 'video' && videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay with sound prevented, playing muted.", err);
          setIsMuted(true);
        });
      }
    }
  }, [currentIdx, isMuted, currentSlide?.mediaType]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIdx((prevIdx) => (prevIdx - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prevIdx) => (prevIdx + 1) % slides.length);
  };

  const slide = {
    badge: t('heritage.badge') || currentSlide.badge || 'Showroom Exclusive',
    ctaText: t('hero.explore_btn') || currentSlide.ctaText || 'Explore Collection',
    tagline: currentSlide.subtitle || currentSlide.tagline || 'OM SAKTHI JEWELLERY',
    ...currentSlide
  };

  return (
    <div id="hero-carousel" className="relative h-[420px] sm:h-[480px] lg:h-[550px] bg-maroon-900 overflow-hidden border-b border-gold-300">
      
      {/* Slides with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image / video */}
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
            {slide.mediaType === 'video' && slide.video ? (
              <>
                {/* Background blurred helper copy */}
                <video
                  key={`bg-${slide.id}`}
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none"
                />
                
                {/* Foreground main video clip */}
                <video
                  ref={videoRef}
                  key={`fg-${slide.id}`}
                  src={slide.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="relative z-10 max-w-full max-h-full h-full object-contain mx-auto"
                />
              </>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-700 scale-100 filter brightness-[0.45]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}
            
            {/* Linear background gold shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 z-1" />
          </div>

          {/* Foreground text card details */}
          <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
              <div className="max-w-xl space-y-4 pointer-events-auto">
                
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-400 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" /> {slide.badge}
                </motion.div>

                {/* Slogan Serif */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-wide drop-shadow-md"
                >
                  {slide.title}
                </motion.h1>

                {/* Sub tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gold-200 text-sm sm:text-base font-semibold font-serif italic"
                >
                  {slide.tagline}
                </motion.p>

                {/* Small description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg"
                >
                  {slide.description}
                </motion.p>

                {/* Call to action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2 flex flex-wrap gap-3"
                >
                  <button
                    onClick={() => {
                      document.getElementById('product-sections-container')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-xs px-6 py-3 rounded-full transition-all flex items-center gap-1.5 shadow-lg border border-gold-300 cursor-pointer uppercase tracking-wider"
                  >
                    {slide.ctaText}
                  </button>
                  
                  <button
                    onClick={() => {
                      document.getElementById('savings-schemes-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-transparent hover:bg-white/10 text-white font-semibold text-xs px-6 py-3 rounded-full transition-all border border-white/40 cursor-pointer uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-gold-400" /> {t('header.schemes')}
                  </button>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Left/Right Arrows */}
      <button
        id="btn-carousel-prev"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-maroon-700 text-white flex items-center justify-center border border-white/10 hover:border-gold-400 transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        id="btn-carousel-next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-maroon-700 text-white flex items-center justify-center border border-white/10 hover:border-gold-400 transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Floating Audio Control Button */}
      {currentSlide?.mediaType === 'video' && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute right-4 bottom-20 z-40 w-10 h-10 rounded-full bg-black/40 hover:bg-maroon-700 text-white flex items-center justify-center border border-white/10 hover:border-gold-400 transition-all cursor-pointer backdrop-blur-xs"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* Bottom Indicators / Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentIdx === idx ? 'w-8 bg-gold-500' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
