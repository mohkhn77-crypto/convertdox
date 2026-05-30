import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Page Counter - Count Pages in PDF Files | ConvertDox',
  description: 'Count the number of pages in any PDF file instantly. Upload your PDF and get an accurate page count plus file size information. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-page-counter' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
