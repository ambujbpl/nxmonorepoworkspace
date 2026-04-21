'use client';

import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { defaultLanguage, languageOptions } from '../lib/i18n';

function resolveInitialLanguage() {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem('appLanguage');
  if (
    savedLanguage &&
    languageOptions.some(({ code }) => code === savedLanguage)
  ) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  const matchedLanguage = languageOptions.find(
    ({ code }) =>
      browserLanguage === code || browserLanguage.startsWith(`${code}-`),
  );

  return matchedLanguage?.code ?? defaultLanguage;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const nextLanguage = resolveInitialLanguage();

    void i18n.changeLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
