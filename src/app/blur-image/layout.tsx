import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Blur Image — Blur Photos & Backgrounds Free | ConvertDox',
  description: 'Blur images or backgrounds online. Apply Gaussian blur to photos. Free image blur tool, no signup.',
  alternates: { canonical: 'https://convertdox.com/blur-image' },
  openGraph: {
    title: 'Blur Image — Blur Photos & Backgrounds Free',
    description: 'Blur images or backgrounds online. Free, no signup.',
    url: 'https://convertdox.com/blur-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
