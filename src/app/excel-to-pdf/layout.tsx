import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Excel to PDF — Convert XLSX to PDF Free | ConvertDox',
  description: 'Convert Excel spreadsheets to PDF online. Preserve formatting and data. Free XLSX to PDF converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/excel-to-pdf' },
  openGraph: {
    title: 'Excel to PDF — Convert XLSX to PDF Free',
    description: 'Convert Excel to PDF online. Free, no signup.',
    url: 'https://convertdox.com/excel-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
