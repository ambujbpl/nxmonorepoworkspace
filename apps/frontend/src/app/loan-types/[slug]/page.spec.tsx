import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../page';
import LoanCategoryPage, { generateStaticParams } from './page';

describe('Loan category experience', () => {
  it('shows the supported loan management categories on the home page', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /loan management categories/i })
    ).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /retail loan management systems/i }).getAttribute('href')
    ).toBe('/loan-types/retail-loan-management-systems');
  });

  it('renders a separate detail page for each category', async () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(10);

    const page = await LoanCategoryPage({
      params: Promise.resolve({ slug: 'ai-powered-end-to-end-platforms' }),
    });

    render(page);

    expect(
      screen.getByRole('heading', {
        name: /ai-powered end-to-end platforms/i,
      })
    ).toBeTruthy();
    expect(screen.getByText(/modern banks, digital-first nbfcs/i)).toBeTruthy();
  });
});
