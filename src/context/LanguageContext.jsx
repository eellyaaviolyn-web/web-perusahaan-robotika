import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../locales/en';
import { id } from '../locales/id';

const translations = { en, id };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('vinzkie_language') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('vinzkie_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
