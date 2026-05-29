import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'SVG to PNG — Convert SVG Vector to PNG Free | ConvertDox',
  description: 'Convert SVG vector images to PNG format online. Set custom dimensions. Free SVG to PNG converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/svg-to-png' },
  openGraph: {
    title: 'SVG to PNG — Convert SVG Vector to PNG Free',
    description: 'Convert SVG to PNG images online. Free, no signup.',
    url: 'https://convertdox.com/svg-to-png',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
