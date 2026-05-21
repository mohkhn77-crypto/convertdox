import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free URL Encoder & Decoder — Encode URLs Online | ConvertDox',
  description: 'Encode or decode URL strings online. Free URL encoder/decoder tool for developers. Handle special characters and percent encoding instantly.',
  keywords: 'url encoder, url decoder, percent encoding, url encode decode, url escape',
  openGraph: {
    title: 'Free URL Encoder & Decoder | ConvertDox',
    description: 'Encode and decode URL strings with percent encoding instantly.',
    url: 'https://convertdox.com/url-encoder',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free URL Encoder/Decoder | ConvertDox', description: 'Encode and decode URL strings instantly.' },
  alternates: { canonical: 'https://convertdox.com/url-encoder' },
}
export default function UrlEncoderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
