import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detailed Word Counter - Text Analysis Tool | ConvertDox',
  description: 'Detailed text analysis: words, characters, sentences, paragraphs, reading time. Free online tool, instant results.',
  alternates: { canonical: 'https://convertdox.com/detailed-word-counter' },
  robots: { index: true, follow: true }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
