import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PowerPoint to PDF — Convert PPTX to PDF Free | ConvertDox',
  description: 'Convert PowerPoint presentations to PDF online. Preserve slides and design. Free PPTX to PDF converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/ppt-to-pdf' },
  openGraph: {
    title: 'PowerPoint to PDF — Convert PPTX to PDF Free',
    description: 'Convert PowerPoint to PDF online. Free, no signup.',
    url: 'https://convertdox.com/ppt-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
