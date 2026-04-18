import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(global, 'fetch', {
      writable: true,
      value: jest.fn(),
    });
  });

  it('stores the session token after a successful sign-in', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: 'token-123' }),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/work email/i), {
      target: { value: 'analyst@fincore.example' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'SecurePass1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in securely/i }));

    expect(await screen.findByText(/login successful/i)).toBeTruthy();
    expect(window.localStorage.getItem('accessToken')).toBe('token-123');
    expect(window.localStorage.getItem('userEmail')).toBe('analyst@fincore.example');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('shows an API error message when sign-in fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/work email/i), {
      target: { value: 'analyst@fincore.example' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'wrong-pass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in securely/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeTruthy();
    expect(window.localStorage.getItem('accessToken')).toBeNull();
  });
});
