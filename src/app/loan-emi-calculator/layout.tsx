import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Loan EMI Calculator - Calculate Monthly Payments | ConvertDox',
  description: 'Calculate loan EMI (monthly installments) instantly. Free EMI calculator for personal, home, and car loans with detailed breakdown.',
  alternates: { canonical: 'https://convertdox.com/loan-emi-calculator' },
  robots: { index: true, follow: true }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
