'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const { t } = useTranslation();

  const navItems = [
    { label: t('header.features'), href: '#features' },
    { label: t('header.loanTypes'), href: '/loan-types' },
    { label: t('header.benefits'), href: '#benefits' },
    { label: t('header.contact'), href: '#contact' },
    { label: t('header.register'), href: '/register' },
    { label: t('header.login'), href: '/login' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
            FinCore Suite
          </p>
          <h1 className="text-lg font-bold text-slate-900">{t('common.appName')}</h1>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) =>
            item.href.startsWith('/') ? (
              <Link key={item.href} href={item.href} className="transition hover:text-sky-700">
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className="transition hover:text-sky-700">
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/login"
            className="rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800"
          >
            {t('header.signIn')}
          </Link>
        </div>
      </div>
    </header>
  );
}
