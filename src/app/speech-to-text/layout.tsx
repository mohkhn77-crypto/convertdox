import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Speech to Text — Free Online Tool | ConvertDox',
  description: 'Transcribe your voice to text in real time using your browser. Multiple languages supported. Free, no signup, no upload.',
  alternates: { canonical: 'https://convertdox.com/speech-to-text' },
  openGraph: {
    title: 'Speech to Text — Free Online Tool | ConvertDox',
    description: 'Voice transcription in your browser — multiple languages.',
    url: 'https://convertdox.com/speech-to-text',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
