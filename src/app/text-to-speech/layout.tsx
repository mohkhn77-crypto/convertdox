import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Text to Speech — Free Online Tool | ConvertDox',
  description: 'Convert text to spoken audio in your browser. Voice, rate, pitch and volume controls. No download or signup needed.',
  alternates: { canonical: 'https://convertdox.com/text-to-speech' },
  openGraph: {
    title: 'Text to Speech — Free Online Tool | ConvertDox',
    description: 'Hear any text spoken aloud — free, in your browser.',
    url: 'https://convertdox.com/text-to-speech',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
