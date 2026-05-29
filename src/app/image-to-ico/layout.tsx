import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Image to ICO — Convert Image to Icon File Free | ConvertDox',
  description: 'Convert JPG, PNG, and other images to ICO icon format online. Create favicons and app icons. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/image-to-ico' },
  openGraph: {
    title: 'Image to ICO — Convert Image to Icon File Free',
    description: 'Convert images to ICO icon format online. Free.',
    url: 'https://convertdox.com/image-to-ico',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
