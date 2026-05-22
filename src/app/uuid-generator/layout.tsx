import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'UUID Generator — Free Online UUID v4 Generator | ConvertDox',
  description: 'Generate cryptographically random UUID v4 identifiers. Generate up to 50 at once, copy, download. Free online UUID generator, no signup.',
  keywords: 'uuid generator, uuid v4, random uuid, guid generator',
  openGraph: { title: 'UUID Generator | ConvertDox', description: 'Generate random UUID v4 identifiers instantly.', url: 'https://convertdox.com/uuid-generator', siteName: 'ConvertDox', type: 'website' },
  twitter: { card: 'summary', title: 'UUID Generator | ConvertDox', description: 'Generate random UUIDs instantly.' },
  alternates: { canonical: 'https://convertdox.com/uuid-generator' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
