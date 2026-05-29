import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Rotate PDF — Rotate PDF Pages Online Free | ConvertDox',
  description: 'Rotate PDF pages online. Rotate individual pages or the full document 90°, 180°, or 270°. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/rotate-pdf' },
  openGraph: {
    title: 'Rotate PDF — Rotate PDF Pages Online Free',
    description: 'Rotate PDF pages online. Free, instant download.',
    url: 'https://convertdox.com/rotate-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
