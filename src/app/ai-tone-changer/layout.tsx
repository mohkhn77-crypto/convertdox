import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Tone Changer — Adjust Writing Tone Instantly | ConvertDox',
  description: 'Change text tone to formal, casual, friendly, or persuasive with AI. Free tone adjuster, no signup required.',
  alternates: { canonical: 'https://convertdox.com/ai-tone-changer' },
  openGraph: {
    title: 'AI Tone Changer — Adjust Writing Tone Instantly',
    description: 'Change text tone to formal, casual, or friendly with AI. Free.',
    url: 'https://convertdox.com/ai-tone-changer',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
