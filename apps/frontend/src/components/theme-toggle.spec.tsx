import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = 'light';
  });

  it('toggles and persists the selected theme', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem('appTheme')).toBe('dark');
    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toBeTruthy();
  });
});
