import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Slug Generator — Free Online Tool | ConvertDox',
  description: 'Convert any text or title to a URL-friendly slug instantly. Choose hyphen or underscore separator with real-time preview.',
  alternates: { canonical: 'https://convertdox.com/slug-generator' },
  openGraph: {
    title: 'Slug Generator — Free Online Tool | ConvertDox',
    description: 'Convert any text or title to a URL-friendly slug with real-time preview.',
    url: 'https://convertdox.com/slug-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
