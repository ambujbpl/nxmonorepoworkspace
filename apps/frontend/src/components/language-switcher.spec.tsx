import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from './language-switcher';
import i18n from '../lib/i18n';

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    document.documentElement.lang = 'en';
    await i18n.changeLanguage('en');
  });

  it('persists the selected language in the browser', async () => {
    render(<LanguageSwitcher />);

    fireEvent.change(screen.getByLabelText(/language/i), {
      target: { value: 'mr' },
    });

    await waitFor(() =>
      expect(window.localStorage.getItem('appLanguage')).toBe('mr'),
    );
    expect(document.documentElement.lang).toBe('mr');
  });
});
