import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Box Shadow Generator — Free Online Tool | ConvertDox',
  description: 'Visual CSS box shadow generator with live preview. Adjust offset, blur, spread, color, opacity, and inset. Multi-shadow support with presets and CSS copy.',
  alternates: { canonical: 'https://convertdox.com/box-shadow' },
  openGraph: {
    title: 'CSS Box Shadow Generator — Free Online Tool | ConvertDox',
    description: 'Visual CSS box shadow generator with live preview. Adjust offset, blur, spread, color, opacity, and inset. Multi-shadow support with presets and CSS copy.',
    url: 'https://convertdox.com/box-shadow',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
