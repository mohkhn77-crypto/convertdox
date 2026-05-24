import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Advanced Mortgage Calculator — Free Online Tool | ConvertDox',
  description: 'Full PITI mortgage calculator with PMI, property tax, insurance, HOA and amortization schedule. Free, no signup required.',
  alternates: { canonical: 'https://convertdox.com/mortgage-advanced' },
  openGraph: {
    title: 'Advanced Mortgage Calculator — Free Online Tool | ConvertDox',
    description: 'Full PITI breakdown with PMI and amortization.',
    url: 'https://convertdox.com/mortgage-advanced',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
