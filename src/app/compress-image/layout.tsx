import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Compress Image — Reduce Image File Size Free | ConvertDox',
  description: 'Compress JPG, PNG, and WebP images online. Reduce file size without visible quality loss. Free image compressor.',
  alternates: { canonical: 'https://convertdox.com/compress-image' },
  openGraph: {
    title: 'Compress Image — Reduce Image File Size Free',
    description: 'Compress images online without quality loss. Free.',
    url: 'https://convertdox.com/compress-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
