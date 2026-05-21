import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Unit Converter — Length, Weight, Temperature & More | ConvertDox',
  description: 'Convert between units of length, weight, temperature, volume and more. Free online unit converter. No signup required.',
  keywords: 'unit converter, length converter, weight converter, temperature converter, metric imperial',
  openGraph: {
    title: 'Free Unit Converter | ConvertDox',
    description: 'Convert length, weight, temperature, volume and more units instantly.',
    url: 'https://convertdox.com/unit-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Unit Converter | ConvertDox', description: 'Convert any unit — length, weight, temperature and more.' },
  alternates: { canonical: 'https://convertdox.com/unit-converter' },
}
export default function UnitConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
