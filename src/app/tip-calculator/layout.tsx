import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Tip Calculator — Split Bills & Calculate Tips | ConvertDox',
  description: 'Calculate tips and split bills easily. Free online tip calculator — enter your bill, choose tip percentage, and split among friends. No signup.',
  keywords: 'tip calculator, bill splitter, restaurant tip, gratuity calculator',
  openGraph: {
    title: 'Free Tip Calculator | ConvertDox',
    description: 'Calculate tips and split restaurant bills among friends instantly.',
    url: 'https://convertdox.com/tip-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Tip Calculator | ConvertDox', description: 'Calculate tips and split bills instantly.' },
  alternates: { canonical: 'https://convertdox.com/tip-calculator' },
}
export default function TipCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
