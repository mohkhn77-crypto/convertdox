import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Compress PDF — Reduce PDF File Size Free | ConvertDox',
  description: 'Compress PDF files online for free. Reduce file size without losing quality. Fast, secure, no installation required.',
  alternates: { canonical: 'https://convertdox.com/compress-pdf' },
  openGraph: {
    title: 'Compress PDF — Reduce PDF File Size Free',
    description: 'Compress PDF files online. Reduce size without quality loss. Free.',
    url: 'https://convertdox.com/compress-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
