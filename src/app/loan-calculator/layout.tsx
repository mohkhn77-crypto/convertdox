import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loan Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate monthly loan payments, total interest, and view a full amortization schedule. Free mortgage and loan calculator online.',
  alternates: { canonical: 'https://convertdox.com/loan-calculator' },
  openGraph: {
    title: 'Loan Calculator — Free Online Tool | ConvertDox',
    description: 'Calculate monthly loan payments, total interest, and view a full amortization schedule.',
    url: 'https://convertdox.com/loan-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
