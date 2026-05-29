import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Resize Image — Change Image Dimensions Free | ConvertDox',
  description: 'Resize images online to any dimension. Maintain aspect ratio or set custom width and height. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/resize-image' },
  openGraph: {
    title: 'Resize Image — Change Image Dimensions Free',
    description: 'Resize images to any size online. Free, no signup.',
    url: 'https://convertdox.com/resize-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
