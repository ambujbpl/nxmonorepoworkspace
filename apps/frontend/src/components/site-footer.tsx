'use client';

import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            FinCore Suite
          </p>
          <h2 className="mt-2 text-xl font-semibold">{t('footer.title')}</h2>
          <p className="mt-3 text-sm text-slate-400">{t('footer.description')}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('footer.office')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>{t('footer.support')}</li>
            <li>{t('footer.sales')}</li>
            <li>{t('footer.hours')}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('footer.highlights')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>{t('footer.highlight1')}</li>
            <li>{t('footer.highlight2')}</li>
            <li>{t('footer.highlight3')}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
