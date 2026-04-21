import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(global, 'fetch', {
      writable: true,
      value: jest.fn(),
    });
  });

  it('prevents submission when passwords do not match', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Ambuj Sharma' },
    });
    fireEvent.change(screen.getByLabelText(/work email/i), {
      target: { value: 'ambuj@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'SecurePass1' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'DifferentPass1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/password and confirm password must match/i),
    ).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits registration details and clears the form on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'user-123' }),
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Ambuj Sharma' },
    });
    fireEvent.change(screen.getByLabelText(/work email/i), {
      target: { value: 'ambuj@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: '28' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'SecurePass1' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'SecurePass1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/account created successfully/i),
    ).toBeTruthy();
    expect(window.localStorage.getItem('registeredUserEmail')).toBe(
      'ambuj@example.com',
    );
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(
      (screen.getByLabelText(/full name/i) as HTMLInputElement).value,
    ).toBe('');
    expect(
      (screen.getByLabelText(/work email/i) as HTMLInputElement).value,
    ).toBe('');
  });
});
