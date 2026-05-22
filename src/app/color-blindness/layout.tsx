import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Blindness Simulator — Free Online Tool | ConvertDox',
  description: 'Simulate how colors appear to people with color blindness. Test 8 types: Protanopia, Deuteranopia, Tritanopia, Achromatopsia and more for accessibility.',
  alternates: { canonical: 'https://convertdox.com/color-blindness' },
  openGraph: {
    title: 'Color Blindness Simulator — Free Online Tool | ConvertDox',
    description: 'Simulate how colors appear to people with color blindness. Test 8 types: Protanopia, Deuteranopia, Tritanopia, Achromatopsia and more for accessibility.',
    url: 'https://convertdox.com/color-blindness',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
