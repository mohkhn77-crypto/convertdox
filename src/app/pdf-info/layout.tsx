import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF Info — View PDF Metadata & Properties Free | ConvertDox',
  description: 'View PDF metadata, file properties, page count, author, and creation date. Free online PDF inspector, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-info' },
  openGraph: {
    title: 'PDF Info — View PDF Metadata & Properties Free',
    description: 'View PDF properties and metadata online. Free.',
    url: 'https://convertdox.com/pdf-info',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
