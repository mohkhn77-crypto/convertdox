import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Roman Numeral Converter — Free Online Tool | ConvertDox',
  description: 'Convert numbers to Roman numerals and back. Supports 1–3999, shows breakdown, and includes a reference chart. Free online Roman numeral tool.',
  keywords: 'roman numerals, roman numeral converter, number to roman, roman to number',
  openGraph: { title: 'Roman Numeral Converter | ConvertDox', description: 'Convert numbers to Roman numerals instantly.', url: 'https://convertdox.com/roman-numerals', siteName: 'ConvertDox', type: 'website' },
  twitter: { card: 'summary', title: 'Roman Numerals | ConvertDox', description: 'Convert to and from Roman numerals.' },
  alternates: { canonical: 'https://convertdox.com/roman-numerals' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
