import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Speed Converter — mph, km/h, knots, mach, m/s | ConvertDox',
  description: 'Convert speed between mph, km/h, m/s, knots, mach, and ft/s. Famous speed presets and runner pace converter included. Free instant speed conversion.',
  alternates: { canonical: 'https://convertdox.com/speed-converter' },
  openGraph: { title: 'Speed Converter — mph, km/h, knots, mach, m/s | ConvertDox', description: 'Convert speed between all units. Includes runner pace converter and famous speed presets.', url: 'https://convertdox.com/speed-converter', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
