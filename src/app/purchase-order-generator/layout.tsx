import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Purchase Order Generator - Create POs Online | ConvertDox',
  description: 'Generate professional purchase orders instantly. Free PO maker with vendor info, line items, delivery dates, and PDF download. No signup required.',
  alternates: { canonical: 'https://convertdox.com/purchase-order-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
