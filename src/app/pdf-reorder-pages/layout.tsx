import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Reorder PDF Pages — Rearrange PDF Pages Free | ConvertDox',
  description: 'Reorder and rearrange pages in PDF files online. Drag and drop pages into any order. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-reorder-pages' },
  openGraph: {
    title: 'Reorder PDF Pages — Rearrange PDF Pages Free',
    description: 'Rearrange PDF pages online. Free, no signup.',
    url: 'https://convertdox.com/pdf-reorder-pages',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
