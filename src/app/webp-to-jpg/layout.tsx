import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'WebP to JPG — Convert WebP Images Free | ConvertDox',
  description: 'Convert WebP images to JPG format online. Download as standard JPG. Free WebP to JPG converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/webp-to-jpg' },
  openGraph: {
    title: 'WebP to JPG — Convert WebP Images Free',
    description: 'Convert WebP images to JPG online. Free, no signup.',
    url: 'https://convertdox.com/webp-to-jpg',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
