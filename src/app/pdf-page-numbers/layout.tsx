import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF — Free Online Tool | ConvertDox',
  description: 'Add page numbers to PDF files online. Choose position, font, and style. Free PDF page numbering tool, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-page-numbers' },
  openGraph: {
    title: 'Add Page Numbers to PDF — Free Online Tool',
    description: 'Add page numbers to PDF online. Free, no signup.',
    url: 'https://convertdox.com/pdf-page-numbers',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
