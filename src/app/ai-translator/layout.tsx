import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Translator — Translate Text in 30+ Languages Free | ConvertDox',
  description: 'Translate text between 30+ languages instantly with AI. Accurate, fast, free. No signup required.',
  alternates: { canonical: 'https://convertdox.com/ai-translator' },
  openGraph: {
    title: 'AI Translator — Translate Text in 30+ Languages Free',
    description: 'Translate text between 30+ languages instantly with AI. Free.',
    url: 'https://convertdox.com/ai-translator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
