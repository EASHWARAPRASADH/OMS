import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS, Language } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('oms_lang');
    if (saved === 'hi' || saved === 'ta' || saved === 'en' || saved === 'te') {
      return saved as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('oms_lang', lang);
  };

  const t = (key: string): string => {
    const translationSet = TRANSLATIONS[language];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    // Fallback to English
    const fallbackSet = TRANSLATIONS['en'];
    if (fallbackSet && fallbackSet[key]) {
      return fallbackSet[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
