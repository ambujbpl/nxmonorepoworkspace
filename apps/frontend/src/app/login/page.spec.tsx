import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './page';

describe('LoginPage', () => {
  it('should render the sign in form', () => {
    render(<LoginPage />);

    expect(
      screen.getByRole('heading', { name: /sign in to your workspace/i }),
    ).toBeTruthy();
    expect(screen.getByLabelText(/work email/i)).toBeTruthy();
    expect(screen.getByLabelText(/^password$/i)).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /sign in securely/i }),
    ).toBeTruthy();
  });
});
