import React from 'react';
import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock('./theme-toggle', () => ({
  ThemeToggle: () => <div>Theme toggle</div>,
}));

jest.mock('./language-switcher', () => ({
  LanguageSwitcher: () => <div>Language switcher</div>,
}));

describe('SiteHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it('links the product title back to the home page', () => {
    mockUsePathname.mockReturnValue('/login');

    render(<SiteHeader />);

    expect(
      screen
        .getByRole('link', { name: /loan management system/i })
        .getAttribute('href'),
    ).toBe('/');
  });

  it('shows home-page-only items on the home page', () => {
    mockUsePathname.mockReturnValue('/');

    render(<SiteHeader />);

    expect(
      screen.getByRole('link', { name: /features/i }).getAttribute('href'),
    ).toBe('#features');
    expect(
      screen.getByRole('link', { name: /benefits/i }).getAttribute('href'),
    ).toBe('#benefits');
    expect(
      screen.getByRole('link', { name: /loan types/i }).getAttribute('href'),
    ).toBe('/loan-types');
  });

  it('hides home-page-only items and the current page link on non-home pages', () => {
    mockUsePathname.mockReturnValue('/login');

    render(<SiteHeader />);

    expect(screen.queryByRole('link', { name: /features/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /benefits/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /^login$/i })).toBeNull();
    expect(screen.getByRole('link', { name: /loan types/i })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /contact/i }).getAttribute('href'),
    ).toBe('/contact-us');
  });

  it('hides the contact link on the contact page', () => {
    mockUsePathname.mockReturnValue('/contact-us');

    render(<SiteHeader />);

    expect(screen.queryByRole('link', { name: /contact/i })).toBeNull();
  });

  it('removes the current section link when already on that page', () => {
    mockUsePathname.mockReturnValue('/loan-types');

    render(<SiteHeader />);

    expect(screen.queryByRole('link', { name: /loan types/i })).toBeNull();
    expect(
      screen.getByRole('link', { name: /^register$/i }).getAttribute('href'),
    ).toBe('/register');
  });
});
