import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Grammar Checker — Fix Grammar & Spelling Free | ConvertDox',
  description: 'Check and fix grammar, spelling, and punctuation errors instantly with AI. Free online grammar checker, no signup required.',
  alternates: { canonical: 'https://convertdox.com/ai-grammar' },
  openGraph: {
    title: 'AI Grammar Checker — Fix Grammar & Spelling Free',
    description: 'Fix grammar and spelling errors instantly with AI. Free, no signup.',
    url: 'https://convertdox.com/ai-grammar',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
