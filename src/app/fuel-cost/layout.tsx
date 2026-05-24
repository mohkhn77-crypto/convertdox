import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Fuel Cost Calculator — Free Online Tool | ConvertDox',
  description: 'Estimate trip fuel cost based on distance, efficiency, fuel price, and passengers. MPG and L/100km supported. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/fuel-cost' },
  openGraph: {
    title: 'Fuel Cost Calculator — Free Online Tool | ConvertDox',
    description: 'Trip fuel cost and per-person share.',
    url: 'https://convertdox.com/fuel-cost',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
