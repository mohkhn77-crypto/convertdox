import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'JPG to PDF — Convert Images to PDF Free | ConvertDox',
  description: 'Convert JPG, PNG, and other images to PDF online. Combine multiple images into one PDF. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/jpg-to-pdf' },
  openGraph: {
    title: 'JPG to PDF — Convert Images to PDF Free',
    description: 'Convert JPG images to PDF online. Free, no signup.',
    url: 'https://convertdox.com/jpg-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
