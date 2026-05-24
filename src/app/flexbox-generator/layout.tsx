import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'CSS Flexbox Generator — Free Online Tool | ConvertDox',
  description: 'Build flexbox layouts visually with a live preview and copy the generated CSS code. All flex properties supported. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/flexbox-generator' },
  openGraph: {
    title: 'CSS Flexbox Generator — Free Online Tool | ConvertDox',
    description: 'Visual flexbox builder with live preview.',
    url: 'https://convertdox.com/flexbox-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
