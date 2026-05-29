import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Grayscale Image — Convert Photo to Black & White | ConvertDox',
  description: 'Convert color images to black and white or grayscale online. Free grayscale converter, instant download, no signup.',
  alternates: { canonical: 'https://convertdox.com/grayscale-image' },
  openGraph: {
    title: 'Grayscale Image — Convert Photo to Black & White',
    description: 'Convert images to grayscale online. Free, no signup.',
    url: 'https://convertdox.com/grayscale-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
