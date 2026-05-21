import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Discount Calculator — Sale Price & Savings | ConvertDox',
  description: 'Calculate sale price and savings instantly. Enter original price and discount percentage to find your final price. Free discount calculator.',
  keywords: 'discount calculator, sale price calculator, percent off calculator, savings calculator',
  openGraph: {
    title: 'Free Discount Calculator | ConvertDox',
    description: 'Find sale prices and savings instantly. Calculate any discount percentage.',
    url: 'https://convertdox.com/discount-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Discount Calculator | ConvertDox', description: 'Calculate sale price and savings instantly.' },
  alternates: { canonical: 'https://convertdox.com/discount-calculator' },
}
export default function DiscountCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
