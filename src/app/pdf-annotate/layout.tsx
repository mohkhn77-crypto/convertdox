import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Annotate PDF — Add Notes & Highlights to PDF Free | ConvertDox',
  description: 'Annotate PDF files with text notes, highlights, and drawings online. Free PDF annotation tool, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-annotate' },
  openGraph: {
    title: 'Annotate PDF — Add Notes & Highlights to PDF Free',
    description: 'Annotate PDF files online. Free, no signup.',
    url: 'https://convertdox.com/pdf-annotate',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
