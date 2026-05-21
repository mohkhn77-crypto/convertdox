/*
  ConvertDox — Updated layout.tsx
  PUT IN: src/app/layout.tsx (REPLACE everything)
  
  Changes from previous version:
  - Added CookieBanner import
  - Added Google Search Console verification
  - Added Open Graph meta tags (better for social sharing)
*/
import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'ConvertDox — Every Online Tool You Need',
  description: 'Free online tools — PDF, Image, AI, Calculator, Text, QR and 200+ more. Free, fast, no signup needed.',
  keywords: 'online tools, pdf converter, image tools, calculator, word counter, qr generator, base64, json formatter',
  openGraph: {
    title: 'ConvertDox — Every Online Tool You Need',
    description: 'Free online tools — 20+ tools live. PDF, Image, AI, Calculators, Text, QR Code. Free. Fast. No signup.',
    url: 'https://convertdox.com',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="mLMYPJpfYqdB5u1Dsc7GFINCVxFR8sTxS2yhzaytrTQ" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="google-adsense-account" content="ca-pub-8558443515165092" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8558443515165092" crossOrigin="anonymous"></script>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
