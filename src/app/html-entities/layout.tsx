import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML Entity Encoder — Free Online Tool | ConvertDox',
  description: 'Encode and decode HTML entities online for free. Convert special characters to HTML entities and back with a full reference table.',
  alternates: { canonical: 'https://convertdox.com/html-entities' },
  openGraph: {
    title: 'HTML Entity Encoder — Free Online Tool | ConvertDox',
    description: 'Encode and decode HTML entities online with a full reference table.',
    url: 'https://convertdox.com/html-entities',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
