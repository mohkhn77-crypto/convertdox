import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detailed Word Counter - Full Text Analysis Tool | ConvertDox',
  description: 'Count words, characters, sentences, and paragraphs. Get reading time, speaking time, unique word count, and readability score instantly.',
  alternates: { canonical: 'https://convertdox.com/detailed-word-counter' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
