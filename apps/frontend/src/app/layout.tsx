import type { Metadata } from 'next';
import './global.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { I18nProvider } from '../components/i18n-provider';

export const metadata: Metadata = {
  title: 'Loan Management System',
  description:
    'A modern lending platform for borrower onboarding, approvals, disbursements, and repayment tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
