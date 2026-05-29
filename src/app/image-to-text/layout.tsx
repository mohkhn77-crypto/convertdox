import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Image to Text (OCR) — Extract Text from Images Free | ConvertDox',
  description: 'Extract text from images using OCR. Convert photos, screenshots, and scans to editable text. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/image-to-text' },
  openGraph: {
    title: 'Image to Text (OCR) — Extract Text from Images Free',
    description: 'Extract text from images using OCR. Free, no signup.',
    url: 'https://convertdox.com/image-to-text',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
