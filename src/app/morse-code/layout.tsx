import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morse Code Translator — Free Online Tool | ConvertDox',
  description: 'Translate text to Morse code and back. Play audio beeps, adjust speed, and view the full Morse reference chart. Free online Morse code converter.',
  alternates: { canonical: 'https://convertdox.com/morse-code' },
  openGraph: {
    title: 'Morse Code Translator — Free Online Tool | ConvertDox',
    description: 'Translate text to Morse code and back with audio playback.',
    url: 'https://convertdox.com/morse-code',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
