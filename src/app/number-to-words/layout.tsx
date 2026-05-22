import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Number to Words Converter — Free Online Tool | ConvertDox',
  description: 'Convert any number to written English words instantly. Supports US and UK English, title case, and numbers up to billions. Free, no signup.',
  keywords: 'number to words, number converter, spell number, number in words',
  openGraph: { title: 'Number to Words Converter | ConvertDox', description: 'Convert numbers to English words instantly.', url: 'https://convertdox.com/number-to-words', siteName: 'ConvertDox', type: 'website' },
  twitter: { card: 'summary', title: 'Number to Words | ConvertDox', description: 'Convert numbers to English words instantly.' },
  alternates: { canonical: 'https://convertdox.com/number-to-words' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
