'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { loanCategories } from './loan-categories';

export default function LoanTypesPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          {t('loanTypes.badge')}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          {t('loanTypes.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {t('loanTypes.description')}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loanCategories.map(
          (category) =>
            category.isVisible && (
              <article
                key={category.slug}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {category.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.summary}
                </p>
                <p className="mt-4 text-sm font-medium text-sky-700">
                  {t('common.bestFor')}: {category.bestFor}
                </p>
                <Link
                  href={`/loan-types/${category.slug}`}
                  className="mt-5 inline-flex rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  {t('common.viewDetails')}
                </Link>
              </article>
            ),
        )}
      </div>
    </main>
  );
}
