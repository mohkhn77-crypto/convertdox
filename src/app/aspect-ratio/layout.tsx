import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Aspect Ratio Calculator — Resolution & Ratio Tool | ConvertDox',
  description: 'Calculate aspect ratios from width and height. Lock ratio for auto-scaling. Presets for 16:9, 4:3, 1:1, 21:9. Shows megapixels and common resolutions.',
  alternates: { canonical: 'https://convertdox.com/aspect-ratio' },
  openGraph: { title: 'Aspect Ratio Calculator — Resolution & Ratio Tool | ConvertDox', description: 'Calculate aspect ratios, lock dimensions, and explore common resolutions. Free online tool.', url: 'https://convertdox.com/aspect-ratio', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
