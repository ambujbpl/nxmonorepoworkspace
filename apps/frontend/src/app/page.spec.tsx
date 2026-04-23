import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it('should show the loan management landing content', () => {
    render(<Page />);

    expect(
      screen.getByRole('heading', { name: /loan management system/i }),
    ).toBeTruthy();
    expect(screen.getByText(/track applications, disbursements/i)).toBeTruthy();
  });

  it('should expose key navigation calls to action', () => {
    render(<Page />);

    expect(
      screen.getByRole('link', { name: /sign in/i }).getAttribute('href'),
    ).toBe('/login');
    expect(
      screen.getByRole('link', { name: /retail loan management systems/i }),
    ).toBeTruthy();
  });

  it('should switch the landing page language to Hindi', () => {
    render(<Page />);

    fireEvent.change(screen.getByLabelText(/language/i), {
      target: { value: 'hi' },
    });

    expect(
      screen.getByRole('heading', { name: /ऋण प्रबंधन प्रणाली/i }),
    ).toBeTruthy();
  });
});
