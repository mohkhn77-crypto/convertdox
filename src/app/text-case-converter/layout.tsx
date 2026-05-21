import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Text Case Converter — UPPER, lower, Title Case | ConvertDox',
  description: 'Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free online text case converter tool.',
  keywords: 'text case converter, uppercase, lowercase, title case, camelCase, snake_case',
  openGraph: {
    title: 'Free Text Case Converter | ConvertDox',
    description: 'Convert text between uppercase, lowercase, title case, camelCase and more instantly.',
    url: 'https://convertdox.com/text-case-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Text Case Converter | ConvertDox', description: 'Convert text case instantly — UPPER, lower, Title, camelCase.' },
  alternates: { canonical: 'https://convertdox.com/text-case-converter' },
}
export default function TextCaseConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
