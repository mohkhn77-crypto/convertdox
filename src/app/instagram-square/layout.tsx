import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Instagram Square Photo Maker — Resize to 1:1 Free | ConvertDox',
  description: 'Convert photos to Instagram square format (1:1 ratio) with white or colored background. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/instagram-square' },
  openGraph: {
    title: 'Instagram Square Photo Maker — Resize to 1:1 Free',
    description: 'Convert photos to Instagram square format. Free.',
    url: 'https://convertdox.com/instagram-square',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
