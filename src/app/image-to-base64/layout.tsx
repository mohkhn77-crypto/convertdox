import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Image to Base64 Converter — Free Online Tool | ConvertDox',
  description: 'Convert images to Base64 encoding in your browser. Supports PNG, JPG, GIF, WEBP, SVG. Get data URL, raw Base64, or CSS background. Files never leave your device.',
  alternates: { canonical: 'https://convertdox.com/image-to-base64' },
  openGraph: { title: 'Image to Base64 Converter — Free Online Tool | ConvertDox', description: 'Convert images to Base64 in your browser. No upload required. 100% private.', url: 'https://convertdox.com/image-to-base64', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
