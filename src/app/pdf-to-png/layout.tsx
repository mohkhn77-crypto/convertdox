import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to PNG — Convert PDF Pages to Images Free | ConvertDox',
  description: 'Convert PDF pages to high-quality PNG images online. Export every page as a separate image. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-png' },
  openGraph: {
    title: 'PDF to PNG — Convert PDF Pages to Images Free',
    description: 'Convert PDF pages to PNG images online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-png',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
