import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF OCR — Extract Text from Scanned PDF Free | ConvertDox',
  description: 'Extract text from scanned PDF files using OCR technology. Convert scanned documents to searchable text. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-ocr' },
  openGraph: {
    title: 'PDF OCR — Extract Text from Scanned PDF Free',
    description: 'OCR scanned PDFs to extract text. Free, no signup.',
    url: 'https://convertdox.com/pdf-ocr',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
