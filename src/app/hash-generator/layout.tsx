import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hash Generator — Free Online Tool | ConvertDox',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly. Free online cryptographic hash generator tool.',
  alternates: { canonical: 'https://convertdox.com/hash-generator' },
  openGraph: {
    title: 'Hash Generator — Free Online Tool | ConvertDox',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly.',
    url: 'https://convertdox.com/hash-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
