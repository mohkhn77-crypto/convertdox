import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Random Number Generator — Any Range | ConvertDox',
  description: 'Generate random numbers in any range instantly. Set min and max values, generate multiple numbers. Free online random number generator.',
  keywords: 'random number generator, random number, dice roller, number randomizer',
  openGraph: {
    title: 'Free Random Number Generator | ConvertDox',
    description: 'Generate random numbers in any range instantly. Set min and max values.',
    url: 'https://convertdox.com/random-number-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Random Number Generator | ConvertDox', description: 'Generate random numbers in any range instantly.' },
  alternates: { canonical: 'https://convertdox.com/random-number-generator' },
}
export default function RandomNumberGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
