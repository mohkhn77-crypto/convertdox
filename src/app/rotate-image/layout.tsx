import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Rotate Image — Rotate Photos Online Free | ConvertDox',
  description: 'Rotate images 90°, 180°, or 270° online. Fix photo orientation instantly. Free image rotator, no signup.',
  alternates: { canonical: 'https://convertdox.com/rotate-image' },
  openGraph: {
    title: 'Rotate Image — Rotate Photos Online Free',
    description: 'Rotate images online instantly. Free, no signup.',
    url: 'https://convertdox.com/rotate-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
