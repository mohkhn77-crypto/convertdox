import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Receipt Generator - Create Receipts Online | ConvertDox',
  description: 'Generate professional receipts instantly. Free receipt maker with business info, itemized amounts, payment method, and PDF download. No signup.',
  alternates: { canonical: 'https://convertdox.com/receipt-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
