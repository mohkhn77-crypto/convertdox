import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Palette Generator — Free Online Tool | ConvertDox',
  description: 'Generate beautiful color palettes from any base color. 5 palette modes: monochromatic, analogous, complementary, triadic, tetradic. Export as CSS or JSON.',
  alternates: { canonical: 'https://convertdox.com/color-palette' },
  openGraph: {
    title: 'Color Palette Generator — Free Online Tool | ConvertDox',
    description: 'Generate beautiful color palettes from any base color. 5 palette modes: monochromatic, analogous, complementary, triadic, tetradic. Export as CSS or JSON.',
    url: 'https://convertdox.com/color-palette',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
