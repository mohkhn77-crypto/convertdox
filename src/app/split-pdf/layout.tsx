import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Split PDF - Visual Page Editor | ConvertDox',
  description: 'Split PDF files into multiple PDFs visually. Select page ranges, rotate pages, preview thumbnails, and download as ZIP. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/split-pdf' },
  openGraph: {
    title: 'Split PDF — Split PDF Pages Online Free',
    description: 'Split PDF into separate pages online. Free, no signup.',
    url: 'https://convertdox.com/split-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
