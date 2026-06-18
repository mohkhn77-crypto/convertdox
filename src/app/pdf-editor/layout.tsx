import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF Editor — Rotate, Reorder & Delete Pages | ConvertDox',
  description: 'Edit your PDF pages online for free — rotate, reorder, and delete pages with no signup required. Files auto-deleted within 1 hour. No watermarks.',
  alternates: { canonical: 'https://convertdox.com/pdf-editor' },
  openGraph: {
    title: 'Free PDF Editor | ConvertDox',
    description: 'Rotate, reorder, and delete PDF pages online. Free, no signup, files auto-deleted.',
    url: 'https://convertdox.com/pdf-editor',
    images: ['https://convertdox.com/og-image.png'],
  }
}

export default function PdfEditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
