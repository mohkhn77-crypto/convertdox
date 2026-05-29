import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'EXIF Stripper — Remove Image Metadata Free | ConvertDox',
  description: 'Remove EXIF metadata, GPS location, and personal data from photos. Protect your privacy online. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/exif-stripper' },
  openGraph: {
    title: 'EXIF Stripper — Remove Image Metadata Free',
    description: 'Strip EXIF data from photos for privacy. Free, no signup.',
    url: 'https://convertdox.com/exif-stripper',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
