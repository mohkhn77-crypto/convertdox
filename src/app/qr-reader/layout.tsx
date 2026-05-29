import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'QR Code Reader — Scan & Decode QR Codes Free | ConvertDox',
  description: 'Read and decode QR codes from images online. Upload a photo to extract the QR code content. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/qr-reader' },
  openGraph: {
    title: 'QR Code Reader — Scan & Decode QR Codes Free',
    description: 'Read and decode QR codes from images online. Free.',
    url: 'https://convertdox.com/qr-reader',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
