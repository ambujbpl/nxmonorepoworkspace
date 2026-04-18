import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from './page';

describe('RegisterPage', () => {
  it('should render the user registration form', () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole('heading', { name: /create your borrower ops account/i })
    ).toBeTruthy();
    expect(screen.getByLabelText(/full name/i)).toBeTruthy();
    expect(screen.getByLabelText(/work email/i)).toBeTruthy();
    expect(screen.getByLabelText(/age/i)).toBeTruthy();
    expect(screen.getByLabelText(/^password$/i)).toBeTruthy();
    expect(screen.getByLabelText(/confirm password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /create account/i })).toBeTruthy();
  });
});
