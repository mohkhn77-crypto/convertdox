import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Convert Image Format — JPG PNG WebP AVIF Free | ConvertDox',
  description: 'Convert images between JPG, PNG, WebP, AVIF, BMP, and GIF formats online. Free image format converter.',
  alternates: { canonical: 'https://convertdox.com/image-convert' },
  openGraph: {
    title: 'Convert Image Format — JPG PNG WebP AVIF Free',
    description: 'Convert images between formats online. Free, no signup.',
    url: 'https://convertdox.com/image-convert',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
