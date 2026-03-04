import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en';
type Namespace = 'common' | 'nav' | 'pages';

interface Translations {
  [key: string]: string;
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, namespace?: Namespace) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'sifs-language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to 'ru'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'en') {
        return saved;
      }
    }
    return 'ru';
  });

  const [translations, setTranslations] = useState<Record<Namespace, Translations>>({
    common: {},
    nav: {},
    pages: {},
  });

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [common, nav, pages] = await Promise.all([
          import(`../locales/${language}/common.json`),
          import(`../locales/${language}/nav.json`),
          import(`../locales/${language}/pages.json`),
        ]);

        setTranslations({
          common: common.default,
          nav: nav.default,
          pages: pages.default,
        });
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to empty translations
        setTranslations({
          common: {},
          nav: {},
          pages: {},
        });
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const t = (key: string, namespace: Namespace = 'common'): string => {
    const ns = translations[namespace];
    return ns[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation(namespace: Namespace = 'common') {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }

  return {
    t: (key: string) => context.t(key, namespace),
    language: context.language,
  };
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useLanguage must be used within I18nProvider');
  }

  return {
    language: context.language,
    setLanguage: context.setLanguage,
  };
}
