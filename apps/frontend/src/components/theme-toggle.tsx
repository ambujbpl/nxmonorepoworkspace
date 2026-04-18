'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

function resolveInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('appTheme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem('appTheme', theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const nextTheme = resolveInitialTheme();
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function handleToggle() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-700"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
