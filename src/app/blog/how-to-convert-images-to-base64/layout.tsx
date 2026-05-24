import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Convert Images to Base64: Complete Developer Guide | ConvertDox',
  description: 'When and how to convert images to Base64 — with HTML, CSS, JavaScript, and Python examples, plus the performance trade-offs you should know.',
  alternates: { canonical: 'https://convertdox.com/blog/how-to-convert-images-to-base64' },
  openGraph: {
    title: 'How to Convert Images to Base64: Complete Guide',
    description: 'When to embed Base64 images, when to avoid them, and how to do it in every major language.',
    url: 'https://convertdox.com/blog/how-to-convert-images-to-base64',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
