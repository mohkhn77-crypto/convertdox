import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIN Generator — Free Online Tool | ConvertDox',
  description: 'Generate secure random PINs of 4, 6, or 8 digits. Options to avoid repeated or sequential digits. Generate up to 50 PINs at once and download as .txt.',
  alternates: { canonical: 'https://convertdox.com/pin-generator' },
  openGraph: {
    title: 'PIN Generator — Free Online Tool | ConvertDox',
    description: 'Generate secure random PINs of 4, 6, or 8 digits. Options to avoid repeated or sequential digits. Generate up to 50 PINs at once and download as .txt.',
    url: 'https://convertdox.com/pin-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
