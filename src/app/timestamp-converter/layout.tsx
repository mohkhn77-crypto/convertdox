import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timestamp Converter — Free Online Tool | ConvertDox',
  description: 'Convert Unix timestamps to human-readable dates and back. Supports ISO 8601, RFC 2822, relative time, week number, and timezone selection.',
  alternates: { canonical: 'https://convertdox.com/timestamp-converter' },
  openGraph: {
    title: 'Timestamp Converter — Free Online Tool | ConvertDox',
    description: 'Convert Unix timestamps to human-readable dates instantly.',
    url: 'https://convertdox.com/timestamp-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
