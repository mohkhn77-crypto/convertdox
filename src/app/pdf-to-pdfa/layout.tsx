import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to PDF/A — Convert to Archival PDF Format Free | ConvertDox',
  description: 'Convert PDF files to PDF/A archival format online. Ensure long-term document preservation. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-pdfa' },
  openGraph: {
    title: 'PDF to PDF/A — Convert to Archival PDF Format Free',
    description: 'Convert PDF to PDF/A archival format online. Free.',
    url: 'https://convertdox.com/pdf-to-pdfa',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
