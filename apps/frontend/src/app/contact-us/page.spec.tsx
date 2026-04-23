import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactUsPage from './page';

describe('ContactUsPage', () => {
  it('renders the contact form with India state and city selectors', () => {
    render(<ContactUsPage />);

    expect(
      screen.getByRole('heading', {
        name: /ready to take your digital transformation to the next level/i,
      }),
    ).toBeTruthy();
    expect(screen.getByLabelText(/state/i)).toBeTruthy();
    expect(screen.getByLabelText(/city/i)).toBeTruthy();
  });

  it('updates city options when the state changes', () => {
    render(<ContactUsPage />);

    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'Karnataka' },
    });

    expect(
      (screen.getByLabelText(/city/i) as HTMLSelectElement).value,
    ).toBe('Bengaluru');
    expect(screen.getByRole('option', { name: 'Mysuru' })).toBeTruthy();
  });

  it('submits the contact form and shows the success message', () => {
    render(<ContactUsPage />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Ambuj' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Sharma' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'ambuj@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contact number/i), {
      target: { value: '+91 99999 99999' },
    });
    fireEvent.change(screen.getByLabelText(/job title/i), {
      target: { value: 'Engineer' },
    });
    fireEvent.change(screen.getByLabelText(/organisation/i), {
      target: { value: 'Example Corp' },
    });
    fireEvent.change(screen.getByLabelText(/your message/i), {
      target: { value: 'Need a demo for our lending workflow.' },
    });
    fireEvent.change(screen.getByLabelText(/how did you hear about us/i), {
      target: { value: 'LinkedIn' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/our india solutions team will contact you shortly/i),
    ).toBeTruthy();
  });
});