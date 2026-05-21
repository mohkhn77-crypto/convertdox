import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About ConvertDox — Free Online Tools Platform',
  description: 'Learn about ConvertDox — the free online tools platform. 20+ tools live, no signup, no data stored. PDF, calculators, text tools and more.',
  keywords: 'about convertdox, free online tools, pdf tools, calculator tools',
  openGraph: {
    title: 'About ConvertDox | Free Online Tools',
    description: 'Learn about ConvertDox — free online tools for everyone. No signup, no data stored.',
    url: 'https://convertdox.com/about',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'About ConvertDox', description: 'Free online tools — PDF, Calculators, Text, QR Code and more.' },
  alternates: { canonical: 'https://convertdox.com/about' },
}
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
