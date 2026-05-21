import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator — Placeholder Text | ConvertDox',
  description: 'Generate lorem ipsum placeholder text for your designs and mockups. Choose paragraphs, sentences or words. Free, no signup.',
  keywords: 'lorem ipsum generator, placeholder text, dummy text, filler text',
  openGraph: {
    title: 'Free Lorem Ipsum Generator | ConvertDox',
    description: 'Generate lorem ipsum placeholder text for designs and mockups instantly.',
    url: 'https://convertdox.com/lorem-ipsum',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Lorem Ipsum Generator | ConvertDox', description: 'Generate placeholder text for your designs instantly.' },
  alternates: { canonical: 'https://convertdox.com/lorem-ipsum' },
}
export default function LoremIpsumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
