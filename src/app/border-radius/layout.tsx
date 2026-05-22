import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Border Radius Generator — Free Online Tool | ConvertDox',
  description: 'Visual CSS border radius generator with live preview. Simple or advanced 4-corner mode. Presets for square, rounded, pill, circle, and leaf shapes.',
  alternates: { canonical: 'https://convertdox.com/border-radius' },
  openGraph: {
    title: 'CSS Border Radius Generator — Free Online Tool | ConvertDox',
    description: 'Visual CSS border radius generator with live preview. Simple or advanced 4-corner mode. Presets for square, rounded, pill, circle, and leaf shapes.',
    url: 'https://convertdox.com/border-radius',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
