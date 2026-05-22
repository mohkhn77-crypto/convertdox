import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate compound interest growth with yearly breakdown. See final amount, total interest earned, and total return percentage for any investment.',
  alternates: { canonical: 'https://convertdox.com/compound-interest' },
  openGraph: {
    title: 'Compound Interest Calculator — Free Online Tool | ConvertDox',
    description: 'Calculate compound interest growth with yearly breakdown and total return percentage.',
    url: 'https://convertdox.com/compound-interest',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
