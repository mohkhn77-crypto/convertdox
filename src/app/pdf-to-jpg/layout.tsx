import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to JPG — Convert PDF Pages to Images Free | ConvertDox',
  description: 'Convert PDF pages to high-quality JPG images online. Export every page as a separate image. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-jpg' },
  openGraph: {
    title: 'PDF to JPG — Convert PDF Pages to Images Free',
    description: 'Convert PDF pages to JPG images online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-jpg',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
