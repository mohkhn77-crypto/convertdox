import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free QR Code Generator — URL, WiFi, Email QR Codes | ConvertDox',
  description: 'Generate QR codes for URLs, WiFi networks, email addresses and more. Free online QR code generator. Download as PNG instantly.',
  keywords: 'QR code generator, free QR code, URL QR code, WiFi QR code, QR generator',
  openGraph: {
    title: 'Free QR Code Generator | ConvertDox',
    description: 'Generate QR codes for URLs, WiFi and email. Download instantly for free.',
    url: 'https://convertdox.com/qr-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free QR Code Generator | ConvertDox', description: 'Generate QR codes for URLs, WiFi and email instantly.' },
  alternates: { canonical: 'https://convertdox.com/qr-generator' },
}
export default function QrGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
