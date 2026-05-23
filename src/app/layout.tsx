import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'ConvertDox — 85+ Free Online Tools, No Signup Required',
  description: 'Free online tools: Word Counter, JSON Formatter, QR Generator, BMI Calculator, Password Generator and 80+ more. No signup. Files never stored.',
  keywords: 'online tools, free tools, word counter, qr generator, bmi calculator, json formatter, password generator, csv to json, uuid generator, text diff, online converter',
  authors: [{ name: 'ConvertDox' }],
  creator: 'ConvertDox',
  publisher: 'ConvertDox',
  openGraph: {
    title: 'ConvertDox — 85+ Free Online Tools, No Signup Required',
    description: 'Free online tools: Word Counter, JSON Formatter, QR Generator, BMI Calculator, Password Generator and 80+ more. No signup. Files never stored.',
    url: 'https://convertdox.com',
    siteName: 'ConvertDox',
    images: [
      {
        url: 'https://convertdox.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ConvertDox — Every Online Tool You Need',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConvertDox — 85+ Free Online Tools',
    description: '85+ free online tools. No signup. Files never stored. 100% free forever.',
    images: ['https://convertdox.com/og-image.png'],
    creator: '@convertdox',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://convertdox.com',
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
        {/* Google Analytics — must use next/script outside <head> in App Router */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-93F3LQWNSN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-93F3LQWNSN');
          `}
        </Script>
      </body>
    </html>
  )
}
