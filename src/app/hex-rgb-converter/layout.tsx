import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free HEX to RGB Converter — Colour Code Converter | ConvertDox',
  description: 'Convert HEX colour codes to RGB, HSL, and more. Free online colour converter for designers and developers. No signup required.',
  keywords: 'hex to rgb, rgb to hex, colour converter, color code converter, hex colour',
  openGraph: {
    title: 'Free HEX ↔ RGB Colour Converter | ConvertDox',
    description: 'Convert HEX to RGB, HSL and other colour formats instantly.',
    url: 'https://convertdox.com/hex-rgb-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free HEX RGB Converter | ConvertDox', description: 'Convert between HEX, RGB and HSL colour codes instantly.' },
  alternates: { canonical: 'https://convertdox.com/hex-rgb-converter' },
}
export default function HexRgbConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
