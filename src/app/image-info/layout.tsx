import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Image Info — View Image Metadata & Properties Free | ConvertDox',
  description: 'View image metadata, dimensions, file size, EXIF data, and color profile online. Free image inspector.',
  alternates: { canonical: 'https://convertdox.com/image-info' },
  openGraph: {
    title: 'Image Info — View Image Metadata & Properties Free',
    description: 'View image properties and metadata online. Free.',
    url: 'https://convertdox.com/image-info',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
