import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Summarizer — Free Online Text Summarizer | ConvertDox',
  description: 'Summarize long articles, documents, and text instantly with AI. Get concise summaries in seconds. Free, no signup required.',
  alternates: { canonical: 'https://convertdox.com/ai-summarizer' },
  openGraph: {
    title: 'AI Summarizer — Free Online Text Summarizer',
    description: 'Summarize long text instantly with AI. Free, no signup.',
    url: 'https://convertdox.com/ai-summarizer',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
