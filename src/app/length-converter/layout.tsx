import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Length Converter — mm, cm, m, km, ft, inches, miles | ConvertDox',
  description: 'Convert between all length units: millimeters, centimeters, meters, kilometers, inches, feet, yards, miles, and nautical miles. Real-time results.',
  alternates: { canonical: 'https://convertdox.com/length-converter' },
  openGraph: { title: 'Length Converter — mm, cm, m, km, ft, inches, miles | ConvertDox', description: 'Convert length between all units instantly. mm, cm, m, km, inch, foot, yard, mile, nautical mile.', url: 'https://convertdox.com/length-converter', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
