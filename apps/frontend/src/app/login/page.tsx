'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../components/login-form';
import '../../lib/i18n';

export default function LoginPage() {
  const { t } = useTranslation();
  const securityPoints = t('login.points', { returnObjects: true }) as string[];

  return (
    <main className="bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 px-6 py-12 text-white lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            {t('login.badge')}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{t('login.title')}</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">{t('login.description')}</p>

          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            {securityPoints.map((point) => (
              <li key={point} className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t('common.backToHome')}
            </Link>
            <a
              href="#contact"
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              {t('common.contactSupport')}
            </a>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              {t('login.welcomeBack')}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{t('login.accountLogin')}</h2>
            <p className="mt-2 text-sm text-slate-600">{t('login.loginHelp')}</p>
            <p className="mt-3 text-sm text-slate-600">
              {t('login.newHere')}{' '}
              <Link href="/register" className="font-semibold text-sky-700 hover:text-sky-800">
                {t('login.createAccount')}
              </Link>
            </p>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
