import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  metadataBase: new URL('https://convertdox.com'),
  title: {
    default: 'ConvertDox — 184+ Free Online Tools, No Signup Required',
    template: '%s | ConvertDox',
  },
  description: '184+ free online tools for PDF conversion, image processing, AI writing, calculators, and developer utilities. No signup, no installation, files never stored.',
  keywords: ['free online tools', 'pdf converter', 'image converter', 'ai tools', 'free calculators', 'developer tools', 'online utilities', 'convertdox'],
  authors: [{ name: 'ConvertDox' }],
  creator: 'ConvertDox',
  publisher: 'ConvertDox',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://convertdox.com',
    siteName: 'ConvertDox',
    title: 'ConvertDox — 184+ Free Online Tools',
    description: 'Every online tool you need in one place. Free, fast, and private.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ConvertDox — Free Online Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConvertDox — 184+ Free Online Tools',
    description: '184+ free online tools. No signup. Files never stored. 100% free forever.',
    images: ['/og-image.png'],
    creator: '@convertdox',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: 'https://convertdox.com' },
  verification: { google: 'mLMYPJpfYqdB5u1Dsc7GFINCVxFR8sTxS2yhzaytrTQ' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <SiteFooter />
        <CookieBanner />

        {/* Organization schema — helps Google display site name + logo in search */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ConvertDox',
              alternateName: 'ConvertDox - Free Online Tools',
              url: 'https://convertdox.com',
              logo: 'https://convertdox.com/logo.png',
              description: '184+ free online tools for PDF conversion, image processing, AI writing, calculators, and more. No signup, no installation, files never stored.',
              foundingDate: '2026',
              areaServed: 'Worldwide',
              knowsAbout: ['PDF tools', 'Image conversion', 'AI writing tools', 'Document generators', 'Online calculators', 'Developer tools'],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'support@convertdox.com',
                availableLanguage: ['English'],
                url: 'https://convertdox.com/contact',
              },
            }),
          }}
        />

        {/* WebSite schema — enables Google Sitelinks Search Box */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ConvertDox',
              url: 'https://convertdox.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://convertdox.com/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-93F3LQWNSN" strategy="afterInteractive" />
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
