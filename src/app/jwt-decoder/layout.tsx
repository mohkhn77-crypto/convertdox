import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JWT Decoder — Free Online Tool | ConvertDox',
  description: 'Decode and inspect JSON Web Tokens (JWT) instantly. View header, payload, and signature with syntax highlighting and expiry status.',
  alternates: { canonical: 'https://convertdox.com/jwt-decoder' },
  openGraph: {
    title: 'JWT Decoder — Free Online Tool | ConvertDox',
    description: 'Decode and inspect JSON Web Tokens with syntax highlighting and expiry status.',
    url: 'https://convertdox.com/jwt-decoder',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
