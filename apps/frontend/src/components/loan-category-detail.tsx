'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import type { LoanCategory } from '../app/loan-types/loan-categories';

export function LoanCategoryDetail({ category }: { category: LoanCategory }) {
  const { t } = useTranslation();

  return (
    <main className="bg-slate-50 px-6 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/loan-types"
          className="text-sm font-semibold text-sky-700 hover:text-sky-800"
        >
          ← {t('loanTypes.backToCategories')}
        </Link>

        <section className="mt-4 rounded-[2rem] bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 p-8 text-white shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
            {t('loanTypes.categoryDetail')}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {category.summary}
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <strong className="text-white">{t('common.bestFor')}:</strong>{' '}
            {category.bestFor}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">
              {t('loanTypes.keyFeatures')}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {category.keyFeatures.map((feature) => (
                <li key={feature} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              {t('loanTypes.considerations')}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {category.considerations.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-3xl bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t('loanTypes.risks')}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {category.risks.map((risk) => (
              <li key={risk} className="rounded-2xl bg-white px-4 py-3">
                {risk}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
