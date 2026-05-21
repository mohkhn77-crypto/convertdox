import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free CSS Gradient Generator — Build Beautiful Gradients | ConvertDox',
  description: 'Create beautiful CSS gradients visually. Customise colours, direction and angle. Copy CSS code instantly. Free CSS gradient generator.',
  keywords: 'css gradient generator, linear gradient, radial gradient, gradient maker, css background',
  openGraph: {
    title: 'Free CSS Gradient Generator | ConvertDox',
    description: 'Build beautiful CSS gradients visually and copy the code instantly.',
    url: 'https://convertdox.com/css-gradient',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free CSS Gradient Generator | ConvertDox', description: 'Create beautiful CSS gradients and copy the code instantly.' },
  alternates: { canonical: 'https://convertdox.com/css-gradient' },
}
export default function CssGradientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
