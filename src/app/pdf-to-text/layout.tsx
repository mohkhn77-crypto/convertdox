import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to Text — Extract Text from PDF Free | ConvertDox',
  description: 'Extract all text from PDF files online. Download as plain .txt file. Free PDF text extractor, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-text' },
  openGraph: {
    title: 'PDF to Text — Extract Text from PDF Free',
    description: 'Extract text from PDF files online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-text',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
