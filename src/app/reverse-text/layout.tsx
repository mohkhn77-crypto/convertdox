import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reverse Text — Free Online Tool | ConvertDox',
  description: 'Reverse characters, reverse words, reverse lines, flip text upside down, or mirror text instantly. Free online text reversal tool with 5 modes.',
  alternates: { canonical: 'https://convertdox.com/reverse-text' },
  openGraph: {
    title: 'Reverse Text — Free Online Tool | ConvertDox',
    description: 'Reverse characters, reverse words, reverse lines, flip text upside down, or mirror text instantly. Free online text reversal tool with 5 modes.',
    url: 'https://convertdox.com/reverse-text',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
