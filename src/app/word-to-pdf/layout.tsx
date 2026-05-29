import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Word to PDF — Convert DOCX to PDF Free | ConvertDox',
  description: 'Convert Word documents to PDF online. Preserve formatting and fonts. Free DOCX to PDF converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/word-to-pdf' },
  openGraph: {
    title: 'Word to PDF — Convert DOCX to PDF Free',
    description: 'Convert Word to PDF online. Free, no signup.',
    url: 'https://convertdox.com/word-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
