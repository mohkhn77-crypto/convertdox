import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Temperature Converter — Celsius, Fahrenheit, Kelvin & more | ConvertDox',
  description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine, and Réaumur. Famous presets included. Real-time temperature conversion with visual indicator.',
  alternates: { canonical: 'https://convertdox.com/temperature-converter' },
  openGraph: { title: 'Temperature Converter — Celsius, Fahrenheit, Kelvin & more | ConvertDox', description: 'Convert between Celsius, Fahrenheit, Kelvin, Rankine and Réaumur instantly. Free online tool.', url: 'https://convertdox.com/temperature-converter', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
