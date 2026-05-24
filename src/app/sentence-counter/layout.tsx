import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Sentence Counter — Free Online Tool | ConvertDox',
  description: 'Count sentences, calculate Flesch reading ease and grade level, and analyse your writing at the sentence level. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/sentence-counter' },
  openGraph: {
    title: 'Sentence Counter — Free Online Tool | ConvertDox',
    description: 'Sentence stats and readability scores in your browser.',
    url: 'https://convertdox.com/sentence-counter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
