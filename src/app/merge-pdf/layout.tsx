import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Merge PDF — Combine PDF Files Online Free | ConvertDox',
  description: 'Combine multiple PDF files into one document online. Free PDF merger, no signup, drag and drop. Fast and secure.',
  alternates: { canonical: 'https://convertdox.com/merge-pdf' },
  openGraph: {
    title: 'Merge PDF — Combine PDF Files Online Free',
    description: 'Combine multiple PDFs into one document online. Free.',
    url: 'https://convertdox.com/merge-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
