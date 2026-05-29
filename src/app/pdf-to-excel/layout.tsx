import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to Excel — Convert PDF Tables to XLSX Free | ConvertDox',
  description: 'Convert PDF tables and data to editable Excel spreadsheets online. Extract data accurately. Free PDF to XLSX converter.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-excel' },
  openGraph: {
    title: 'PDF to Excel — Convert PDF Tables to XLSX Free',
    description: 'Convert PDF to Excel spreadsheets online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-excel',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
