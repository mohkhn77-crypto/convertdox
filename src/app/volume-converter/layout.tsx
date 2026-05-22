import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Volume Converter — ml, liters, cups, gallons, ounces | ConvertDox',
  description: 'Convert volume between milliliters, liters, cubic meters, teaspoons, tablespoons, fluid ounces, cups, pints, quarts, and gallons. US and UK units supported.',
  alternates: { canonical: 'https://convertdox.com/volume-converter' },
  openGraph: { title: 'Volume Converter — ml, liters, cups, gallons, ounces | ConvertDox', description: 'Convert volume between all units. ml, L, tsp, tbsp, fl oz, cup, pint, quart, gallon. US and UK.', url: 'https://convertdox.com/volume-converter', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
