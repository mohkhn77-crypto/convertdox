import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON to CSV Converter — Free Online Tool | ConvertDox',
  description: 'Convert JSON arrays to CSV spreadsheets and CSV back to JSON online for free. Download CSV with one click. No registration needed.',
  alternates: { canonical: 'https://convertdox.com/json-to-csv' },
  openGraph: {
    title: 'JSON to CSV Converter — Free Online Tool | ConvertDox',
    description: 'Convert JSON arrays to CSV spreadsheets and CSV back to JSON online for free.',
    url: 'https://convertdox.com/json-to-csv',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
