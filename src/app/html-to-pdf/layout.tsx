import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'HTML to PDF — Convert Web Pages to PDF Free | ConvertDox',
  description: 'Convert HTML code or web pages to PDF documents online. Preserve styles and layout. Free HTML to PDF converter.',
  alternates: { canonical: 'https://convertdox.com/html-to-pdf' },
  openGraph: {
    title: 'HTML to PDF — Convert Web Pages to PDF Free',
    description: 'Convert HTML to PDF online. Free, no signup.',
    url: 'https://convertdox.com/html-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
