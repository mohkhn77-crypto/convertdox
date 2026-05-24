import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'CSS Grid Generator — Free Online Tool | ConvertDox',
  description: 'Build CSS Grid layouts visually with column and row controls and live preview. Copy generated CSS. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/grid-generator' },
  openGraph: {
    title: 'CSS Grid Generator — Free Online Tool | ConvertDox',
    description: 'Visual CSS Grid builder with live preview.',
    url: 'https://convertdox.com/grid-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
