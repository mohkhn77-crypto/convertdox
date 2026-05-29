import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'HEIC to JPG — Convert iPhone Photos Free | ConvertDox',
  description: 'Convert HEIC and HEIF photos from iPhone to JPG format online. Works on any device. Free HEIC converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/heic-to-jpg' },
  openGraph: {
    title: 'HEIC to JPG — Convert iPhone Photos Free',
    description: 'Convert HEIC photos to JPG online. Free, no signup.',
    url: 'https://convertdox.com/heic-to-jpg',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
