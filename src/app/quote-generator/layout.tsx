import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quote Generator — Free Online Tool | ConvertDox',
  description: 'Generate inspiring quotes by category: motivation, success, wisdom, life, humor, love, and technology. Copy quotes or share them instantly on Twitter.',
  alternates: { canonical: 'https://convertdox.com/quote-generator' },
  openGraph: {
    title: 'Quote Generator — Free Online Tool | ConvertDox',
    description: 'Generate inspiring quotes by category: motivation, success, wisdom, life, humor, love, and technology. Copy quotes or share them instantly on Twitter.',
    url: 'https://convertdox.com/quote-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
