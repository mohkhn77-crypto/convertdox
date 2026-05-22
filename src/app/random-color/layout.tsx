import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Random Color Generator — Palettes, HEX, RGB, HSL | ConvertDox',
  description: 'Generate random colors in Any, Pastel, Vibrant, Dark, or Earth modes. Get HEX, RGB, and HSL values instantly. Generate palettes of 5 and lock individual colors.',
  alternates: { canonical: 'https://convertdox.com/random-color' },
  openGraph: { title: 'Random Color Generator — Palettes, HEX, RGB, HSL | ConvertDox', description: 'Generate beautiful random colors and palettes. Choose from 5 color modes. Get HEX, RGB, HSL values.', url: 'https://convertdox.com/random-color', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
