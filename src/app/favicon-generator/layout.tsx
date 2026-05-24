import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Favicon Generator — Free Online Tool | ConvertDox',
  description: 'Generate a favicon from text or initials with custom colors and shapes. Download as PNG. Free, no signup, runs in your browser.',
  alternates: { canonical: 'https://convertdox.com/favicon-generator' },
  openGraph: {
    title: 'Favicon Generator — Free Online Tool | ConvertDox',
    description: 'Generate favicons from text or initials.',
    url: 'https://convertdox.com/favicon-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
