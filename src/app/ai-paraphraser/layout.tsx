import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Paraphraser — Free Online Paraphrasing Tool | ConvertDox',
  description: 'Rewrite text in formal, casual, creative, or academic style with AI. Free paraphraser, no signup. Avoid plagiarism naturally.',
  alternates: { canonical: 'https://convertdox.com/ai-paraphraser' },
  openGraph: {
    title: 'AI Paraphraser — Free Online Paraphrasing Tool',
    description: 'Rewrite text in different styles with AI. Free, no signup.',
    url: 'https://convertdox.com/ai-paraphraser',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
