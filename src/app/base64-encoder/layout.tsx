import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Base64 Encoder & Decoder — Encode & Decode Online | ConvertDox',
  description: 'Encode text to Base64 or decode Base64 strings online. Free Base64 encoder/decoder tool for developers. No signup required.',
  keywords: 'base64 encoder, base64 decoder, base64 converter, encode decode base64',
  openGraph: {
    title: 'Free Base64 Encoder & Decoder | ConvertDox',
    description: 'Encode text to Base64 or decode Base64 strings instantly online.',
    url: 'https://convertdox.com/base64-encoder',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Base64 Encoder/Decoder | ConvertDox', description: 'Encode and decode Base64 strings instantly.' },
  alternates: { canonical: 'https://convertdox.com/base64-encoder' },
}
export default function Base64EncoderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
