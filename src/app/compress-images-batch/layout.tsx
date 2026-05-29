import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Batch Image Compressor — Compress Multiple Photos Free | ConvertDox',
  description: 'Compress multiple images at once online. Upload and compress JPG, PNG, WebP in bulk. Free batch image compressor.',
  alternates: { canonical: 'https://convertdox.com/compress-images-batch' },
  openGraph: {
    title: 'Batch Image Compressor — Compress Multiple Photos Free',
    description: 'Compress multiple images at once online. Free.',
    url: 'https://convertdox.com/compress-images-batch',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
