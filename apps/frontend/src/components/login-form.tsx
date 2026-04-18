'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

type LoginStatus = {
  tone: 'idle' | 'success' | 'error';
  message: string;
};

export function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<LoginStatus>({ tone: 'idle', message: '' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ tone: 'idle', message: '' });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        accessToken?: string;
        message?: string;
      };

      if (!response.ok || !data.accessToken) {
        throw new Error(data.message ?? t('forms.errors.loginFailed'));
      }

      window.localStorage.setItem('accessToken', data.accessToken);
      window.localStorage.setItem('userEmail', email);
      setStatus({
        tone: 'success',
        message: t('forms.loginSuccess'),
      });
    } catch (error) {
      setStatus({
        tone: 'error',
        message:
          error instanceof Error ? error.message : t('forms.errors.loginGeneric'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
          {t('forms.workEmail')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="analyst@fincore.example"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
            {t('forms.password')}
          </label>
          <span className="text-xs text-slate-500">{t('forms.minimumEightCharacters')}</span>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          placeholder={t('forms.enterPassword')}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? t('forms.signingIn') : t('forms.signInSecurely')}
      </button>

      {status.message ? (
        <p
          className={
            status.tone === 'success'
              ? 'rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'
              : 'rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700'
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
