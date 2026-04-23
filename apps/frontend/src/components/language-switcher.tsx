'use client';

import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { defaultLanguage, languageOptions } from '../lib/i18n';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const currentLanguage =
    languageOptions.find(({ code }) => code === i18n.resolvedLanguage)?.code ??
    defaultLanguage;

  async function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLanguage = event.target.value;

    await i18n.changeLanguage(nextLanguage);
    window.localStorage.setItem('appLanguage', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span className="sr-only">{t('common.language')}</span>
      <span aria-hidden="true" className="hidden text-slate-600 lg:inline">
        {t('common.language')}
      </span>
      <select
        aria-label={t('common.language')}
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      >
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
