import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Count Words Online: 5 Methods Compared (2026) | ConvertDox',
  description: 'Five reliable ways to count words online — dedicated tools, Word, Google Docs, the command line, and AI chat. Comparison table, pro tips, and FAQs.',
  alternates: { canonical: 'https://convertdox.com/blog/how-to-count-words-online' },
  openGraph: {
    title: 'How to Count Words Online: 5 Methods Compared (2026)',
    description: 'Five reliable ways to count words online, side by side.',
    url: 'https://convertdox.com/blog/how-to-count-words-online',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
