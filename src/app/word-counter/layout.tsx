import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Word Counter — Count Words & Characters | ConvertDox',
  description: 'Free online word counter. Count words, characters, sentences and estimate reading time. No signup required.',
  keywords: 'word counter, character count, reading time calculator, word frequency',
  openGraph: {
    title: 'Free Word Counter | ConvertDox',
    description: 'Count words, characters, sentences and reading time instantly.',
    url: 'https://convertdox.com/word-counter',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Word Counter | ConvertDox', description: 'Count words and characters instantly.' },
  alternates: { canonical: 'https://convertdox.com/word-counter' },
}
export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
