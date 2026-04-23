'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

type RegisterStatus = {
  tone: 'idle' | 'success' | 'error';
  message: string;
};

export function RegisterForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<RegisterStatus>({
    tone: 'idle',
    message: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ tone: 'idle', message: '' });

    try {
      if (password !== confirmPassword) {
        throw new Error(t('forms.errors.passwordMismatch'));
      }

      const payload = {
        name,
        email,
        password,
        ...(age ? { age: Number(age) } : {}),
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        id?: string;
        message?: string;
      };

      if (!response.ok || !data.id) {
        throw new Error(data.message ?? t('forms.errors.registerFailed'));
      }

      window.localStorage.setItem('registeredUserEmail', email);
      setStatus({
        tone: 'success',
        message: t('forms.registerSuccess'),
      });
      setName('');
      setEmail('');
      setAge('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setStatus({
        tone: 'error',
        message:
          error instanceof Error
            ? error.message
            : t('forms.errors.registerGeneric'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {t('forms.fullName')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="Ambuj Sharma"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
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
        <label
          htmlFor="age"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {t('forms.age')}
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min={18}
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder={t('forms.optional')}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700"
          >
            {t('forms.password')}
          </label>
          <span className="text-xs text-slate-500">
            {t('forms.minimumEightCharacters')}
          </span>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          placeholder={t('forms.createSecurePassword')}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {t('forms.confirmPassword')}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          placeholder={t('forms.reenterPassword')}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? t('forms.creatingAccount') : t('forms.createAccount')}
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
