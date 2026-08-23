'use client';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const i18n = i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ja',
    supportedLngs: ['ko', 'en', 'ja'],
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'language',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default function I18nProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: string;
}) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    i18next.changeLanguage(initialLanguage).then(() => {
      setInitialized(true);
    });
  }, [initialLanguage]);

  if (!initialized) {
    return null; // Or a loading spinner
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
