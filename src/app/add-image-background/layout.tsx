import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Add Background to Image — Free Online Tool | ConvertDox',
  description: 'Add a color or gradient background to transparent PNG images online. Free background adder, no signup.',
  alternates: { canonical: 'https://convertdox.com/add-image-background' },
  openGraph: {
    title: 'Add Background to Image — Free Online Tool',
    description: 'Add backgrounds to transparent images online. Free.',
    url: 'https://convertdox.com/add-image-background',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
