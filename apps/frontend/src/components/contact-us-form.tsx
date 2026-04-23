'use client';

import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

type ContactStatus = {
  tone: 'idle' | 'success';
  message: string;
};

const indiaLocations = {
  Delhi: ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Uttar Pradesh': ['Lucknow', 'Noida', 'Ghaziabad', 'Kanpur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
} as const;

const lendingInterests = [
  'Corporate Lending',
  'Retail Lending',
  'Microfinance',
  'Loan Servicing',
] as const;

type StateName = keyof typeof indiaLocations;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  organisation: string;
  country: string;
  lendingInterest: string;
  message: string;
  referralSource: string;
  state: StateName;
  city: string;
};

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  jobTitle: '',
  organisation: '',
  country: 'India',
  lendingInterest: lendingInterests[0],
  message: '',
  referralSource: '',
  state: 'Maharashtra',
  city: indiaLocations.Maharashtra[0],
};

export function ContactUsForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<ContactStatus>({
    tone: 'idle',
    message: '',
  });
  const lendingInterestOptions = t('contact.lendingInterests', {
    returnObjects: true,
  }) as string[];
  const referralSourceOptions = t('contact.referralSources', {
    returnObjects: true,
  }) as string[];

  const availableCities = useMemo(
    () => indiaLocations[form.state],
    [form.state],
  );

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleStateChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextState = event.target.value as StateName;

    setForm((current) => ({
      ...current,
      state: nextState,
      city: indiaLocations[nextState][0],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({
      tone: 'success',
      message: t('contact.successMessage'),
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={t('contact.fields.firstName')} htmlFor="firstName">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.firstName')}
          />
        </FormField>

        <FormField label={t('contact.fields.lastName')} htmlFor="lastName">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.lastName')}
          />
        </FormField>

        <FormField label={t('contact.fields.email')} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.email')}
          />
        </FormField>

        <FormField
          label={t('contact.fields.contactNumber')}
          htmlFor="contactNumber"
        >
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            inputMode="tel"
            required
            value={form.contactNumber}
            onChange={(event) =>
              updateField('contactNumber', event.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.contactNumber')}
          />
        </FormField>

        <FormField label={t('contact.fields.jobTitle')} htmlFor="jobTitle">
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            required
            value={form.jobTitle}
            onChange={(event) => updateField('jobTitle', event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.jobTitle')}
          />
        </FormField>

        <FormField
          label={t('contact.fields.organisation')}
          htmlFor="organisation"
        >
          <input
            id="organisation"
            name="organisation"
            type="text"
            required
            value={form.organisation}
            onChange={(event) =>
              updateField('organisation', event.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            placeholder={t('contact.placeholders.organisation')}
          />
        </FormField>

        <FormField label={t('contact.fields.country')} htmlFor="country">
          <input
            id="country"
            name="country"
            type="text"
            value={t('contact.country')}
            readOnly
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
          />
        </FormField>

        <FormField
          label={t('contact.fields.lendingFocus')}
          htmlFor="lendingInterest"
        >
          <select
            id="lendingInterest"
            name="lendingInterest"
            value={form.lendingInterest}
            onChange={(event) =>
              updateField('lendingInterest', event.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {lendingInterestOptions.map((interest) => (
              <option key={interest} value={interest} className="text-slate-900">
                {interest}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label={t('contact.fields.message')} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          placeholder={t('contact.placeholders.message')}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          label={t('contact.fields.referralSource')}
          htmlFor="referralSource"
        >
          <select
            id="referralSource"
            name="referralSource"
            required
            value={form.referralSource}
            onChange={(event) =>
              updateField('referralSource', event.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            <option value="" disabled className="text-slate-900">
              {t('contact.placeholders.selectOption')}
            </option>
            {referralSourceOptions.map((source) => (
              <option key={source} value={source} className="text-slate-900">
                {source}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t('contact.fields.state')} htmlFor="state">
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleStateChange}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {Object.keys(indiaLocations).map((stateName) => (
              <option
                key={stateName}
                value={stateName}
                className="text-slate-900"
              >
                {stateName}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t('contact.fields.city')} htmlFor="city">
          <select
            id="city"
            name="city"
            value={form.city}
            onChange={(event) => updateField('city', event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {availableCities.map((city) => (
              <option key={city} value={city} className="text-slate-900">
                {city}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 sm:w-auto"
        >
          {t('contact.submit')}
        </button>

        {status.message ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}