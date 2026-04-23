'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/language-switcher';
import '../lib/i18n';
import { loanCategories } from './loan-types/loan-categories';

type Metric = {
  value: string;
  label: string;
};

type FeatureCard = {
  title: string;
  description: string;
};

export default function Index() {
  const { t } = useTranslation();
  const metrics = t('home.metrics', { returnObjects: true }) as Metric[];
  const features = t('home.featureCards', {
    returnObjects: true,
  }) as FeatureCard[];

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                {t('home.badge')}
              </span>
              <LanguageSwitcher />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {t('home.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              {t('home.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                {t('common.signIn')}
              </Link>
              <a
                href="#features"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t('home.exploreFeatures')}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-slate-900/80 p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-sm text-slate-400">{t('home.snapshot')}</p>
                  <p className="text-xl font-semibold">
                    {t('home.portfolioOverview')}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {t('home.healthy')}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-4 py-3">
                  <span>{t('home.applicationsInReview')}</span>
                  <strong className="text-white">128</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-4 py-3">
                  <span>{t('home.approvedToday')}</span>
                  <strong className="text-white">42</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-4 py-3">
                  <span>{t('home.collectionsDue')}</span>
                  <strong className="text-amber-300">16</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-2xl font-bold text-sky-700">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            {t('home.coreFeatures')}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {t('home.builtFor')}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            {t('home.supportedModels')}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {t('home.categoriesTitle')}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {t('home.categoriesDescription')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loanCategories.map(
            (category) =>
              category.isVisible && (
                <article
                  key={category.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Link
                    href={`/loan-types/${category.slug}`}
                    className="text-lg font-semibold text-slate-900 transition hover:text-sky-700"
                  >
                    {category.title}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">
                    {category.summary}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {category.bestFor}
                  </p>
                </article>
              ),
          )}
        </div>
      </section>

      <section id="benefits" className="bg-sky-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              {t('home.whyChooseUs')}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {t('home.betterExperience')}
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              {t('home.benefit1')}
            </li>
            <li className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              {t('home.benefit2')}
            </li>
            <li className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              {t('home.benefit3')}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
