import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strip HTML Tags — Free Online Tool | ConvertDox',
  description: 'Remove HTML tags and extract clean plain text from HTML code. Options to keep line breaks, decode HTML entities, and collapse multiple blank lines.',
  alternates: { canonical: 'https://convertdox.com/strip-html' },
  openGraph: {
    title: 'Strip HTML Tags — Free Online Tool | ConvertDox',
    description: 'Remove HTML tags and extract clean plain text from HTML code. Options to keep line breaks, decode HTML entities, and collapse multiple blank lines.',
    url: 'https://convertdox.com/strip-html',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
