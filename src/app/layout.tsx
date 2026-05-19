import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ConvertDox — Every Online Tool You Need',
  description: 'Free online tools — PDF, Image, AI, Calculator, Text, QR and 200+ more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin:0 }}>{children}</body>
    </html>
  )
}