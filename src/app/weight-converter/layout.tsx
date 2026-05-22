import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Weight Converter — kg, lbs, oz, stone, grams & more | ConvertDox',
  description: 'Convert between all weight units: milligrams, grams, kilograms, tonnes, ounces, pounds, stones, carats, troy ounces and more. Instant real-time conversion.',
  alternates: { canonical: 'https://convertdox.com/weight-converter' },
  openGraph: { title: 'Weight Converter — kg, lbs, oz, stone, grams & more | ConvertDox', description: 'Convert weight between all units. kg, lbs, oz, stone, gram, tonne, carat, troy oz and more.', url: 'https://convertdox.com/weight-converter', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
