import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Counter — Free Online Tool | ConvertDox',
  description: 'Count characters, words, sentences, paragraphs and more. See Twitter/SMS limits, reading time, speaking time, and top word frequency instantly.',
  alternates: { canonical: 'https://convertdox.com/character-counter' },
  openGraph: {
    title: 'Character Counter — Free Online Tool | ConvertDox',
    description: 'Count characters, words, sentences, paragraphs and more. See Twitter/SMS limits, reading time, speaking time, and top word frequency instantly.',
    url: 'https://convertdox.com/character-counter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
