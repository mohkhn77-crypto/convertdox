import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'CSS Animation Generator — Free Online Tool | ConvertDox',
  description: 'Build CSS keyframe animations visually with full control over transforms, timing, and easing. Live preview and copyable code.',
  alternates: { canonical: 'https://convertdox.com/animation-generator' },
  openGraph: {
    title: 'CSS Animation Generator — Free Online Tool | ConvertDox',
    description: 'Visual CSS keyframe animation builder.',
    url: 'https://convertdox.com/animation-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
