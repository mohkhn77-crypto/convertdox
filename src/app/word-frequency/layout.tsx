import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Word Frequency Counter — Free Online Tool | ConvertDox',
  description: 'Count how often each word appears in your text. Visualise the most-used words as a bar chart and export as CSV. Free, browser-based.',
  alternates: { canonical: 'https://convertdox.com/word-frequency' },
  openGraph: {
    title: 'Word Frequency Counter — Free Online Tool | ConvertDox',
    description: 'Count word occurrences and visualise frequency.',
    url: 'https://convertdox.com/word-frequency',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
