import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Tools — Free QR Code Generator | ConvertDox',
  description: 'Free online QR code generator: create QR codes for URLs, WiFi, email, phone numbers and more. No account needed, instant download.',
  alternates: { canonical: 'https://convertdox.com/tools/qr' },
  openGraph: {
    title: 'QR Code Tools | ConvertDox',
    description: 'Free online QR code generator — create QR codes instantly.',
    url: 'https://convertdox.com/tools/qr',
  },
}

export default function QRToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
