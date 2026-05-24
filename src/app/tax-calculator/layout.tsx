import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tax Calculator — Free Online Tool | ConvertDox',
  description: 'Estimate your income tax for the US, UK, Canada, and Australia using current tax brackets. Free, in-browser, no signup.',
  alternates: { canonical: 'https://convertdox.com/tax-calculator' },
  openGraph: {
    title: 'Tax Calculator — Free Online Tool | ConvertDox',
    description: 'Estimate income tax for US, UK, Canada, Australia.',
    url: 'https://convertdox.com/tax-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
