import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Social Media Image Resizer — All Platforms Free | ConvertDox',
  description: 'Resize images for Twitter, Facebook, Instagram, LinkedIn, and more. All social media sizes in one free tool.',
  alternates: { canonical: 'https://convertdox.com/social-media-crops' },
  openGraph: {
    title: 'Social Media Image Resizer — All Platforms Free',
    description: 'Resize images for any social media platform. Free.',
    url: 'https://convertdox.com/social-media-crops',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
