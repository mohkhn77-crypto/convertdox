import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Batch Image Resizer — Resize Multiple Photos Free | ConvertDox',
  description: 'Resize multiple images at once to the same dimensions. Free batch image resizer, no signup required.',
  alternates: { canonical: 'https://convertdox.com/resize-images-batch' },
  openGraph: {
    title: 'Batch Image Resizer — Resize Multiple Photos Free',
    description: 'Resize multiple images at once online. Free.',
    url: 'https://convertdox.com/resize-images-batch',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
