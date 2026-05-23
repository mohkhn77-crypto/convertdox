import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Tools — HEX RGB, CSS Gradient, Color Palette & More | ConvertDox',
  description: 'Free online color tools: HEX to RGB converter, CSS gradient generator, color palette creator, box shadow generator, border radius tool, and color blindness simulator.',
  alternates: { canonical: 'https://convertdox.com/tools/color' },
  openGraph: {
    title: 'Color Tools | ConvertDox',
    description: 'Free online color tools — 7 tools for designers and developers.',
    url: 'https://convertdox.com/tools/color',
  },
}

export default function ColorToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
