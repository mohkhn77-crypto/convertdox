import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'CSV to JSON Converter — Free Online Tool | ConvertDox',
  description: 'Convert CSV files to JSON format instantly. Supports custom delimiters, headers, pretty print, and download. Free online CSV converter.',
  keywords: 'csv to json, csv converter, csv parser, json formatter',
  openGraph: { title: 'CSV to JSON Converter | ConvertDox', description: 'Convert CSV to JSON instantly online.', url: 'https://convertdox.com/csv-to-json', siteName: 'ConvertDox', type: 'website' },
  twitter: { card: 'summary', title: 'CSV to JSON | ConvertDox', description: 'Convert CSV to JSON instantly.' },
  alternates: { canonical: 'https://convertdox.com/csv-to-json' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
