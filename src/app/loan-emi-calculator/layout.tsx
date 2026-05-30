import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loan EMI Calculator - Monthly Payment Calculator | ConvertDox',
  description: 'Calculate EMI (Equated Monthly Installment) for home, car, or personal loans. See total interest, payment breakdown, and amortization schedule instantly.',
  alternates: { canonical: 'https://convertdox.com/loan-emi-calculator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
