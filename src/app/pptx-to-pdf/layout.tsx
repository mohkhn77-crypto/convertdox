import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PPTX to PDF — Convert PowerPoint to PDF Free | ConvertDox',
  description: 'Convert PowerPoint presentations to PDF online. Preserve slides, fonts, and images. Free PPTX to PDF converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/pptx-to-pdf' },
  openGraph: {
    title: 'PPTX to PDF — Convert PowerPoint to PDF Free',
    description: 'Convert PowerPoint to PDF online. Free, no signup.',
    url: 'https://convertdox.com/pptx-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
