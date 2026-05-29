import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Watermark Image — Add Watermark to Photos Free | ConvertDox',
  description: 'Add text or image watermarks to photos online. Protect your images from unauthorized use. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/watermark-image' },
  openGraph: {
    title: 'Watermark Image — Add Watermark to Photos Free',
    description: 'Add watermarks to images online. Free, no signup.',
    url: 'https://convertdox.com/watermark-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
