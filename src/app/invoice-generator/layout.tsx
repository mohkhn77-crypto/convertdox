import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Invoice Generator - Create Professional Invoices | ConvertDox',
  description: 'Generate professional invoices instantly. Free invoice maker with custom branding, multiple line items, tax calculation, and PDF download. No signup.',
  alternates: { canonical: 'https://convertdox.com/invoice-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
