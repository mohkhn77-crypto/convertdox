import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Lorem Ipsum Advanced — Hipster, Corporate & Tech Text | ConvertDox',
  description: 'Generate placeholder text in Classic, Hipster, Corporate, or Tech styles. Generate by words, sentences, or paragraphs with HTML wrapper options. Free tool.',
  alternates: { canonical: 'https://convertdox.com/lorem-advanced' },
  openGraph: { title: 'Lorem Ipsum Advanced — Hipster, Corporate & Tech Text | ConvertDox', description: 'Generate lorem ipsum in 4 styles: classic, hipster, corporate, tech. By words, sentences, or paragraphs.', url: 'https://convertdox.com/lorem-advanced', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
