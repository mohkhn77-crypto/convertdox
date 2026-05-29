import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Crop Image — Trim & Crop Photos Online Free | ConvertDox',
  description: 'Crop images online to any size. Select custom crop area or use preset aspect ratios. Free image cropper, no signup.',
  alternates: { canonical: 'https://convertdox.com/image-crop' },
  openGraph: {
    title: 'Crop Image — Trim & Crop Photos Online Free',
    description: 'Crop images to any size online. Free, no signup.',
    url: 'https://convertdox.com/image-crop',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
