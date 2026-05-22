import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SQL Formatter — Free Online Tool | ConvertDox',
  description: 'Format and beautify SQL queries online for free. Uppercase keywords, add proper indentation, and make your SQL readable instantly.',
  alternates: { canonical: 'https://convertdox.com/sql-formatter' },
  openGraph: {
    title: 'SQL Formatter — Free Online Tool | ConvertDox',
    description: 'Format and beautify SQL queries with uppercase keywords and proper indentation.',
    url: 'https://convertdox.com/sql-formatter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
