import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader — Free HD Thumbnails | ConvertDox',
  description: 'Download YouTube video thumbnails in HD and maxres quality. Free YouTube thumbnail downloader, no signup.',
  alternates: { canonical: 'https://convertdox.com/youtube-thumbnail' },
  openGraph: {
    title: 'YouTube Thumbnail Downloader — Free HD Thumbnails',
    description: 'Download YouTube thumbnails in HD quality. Free.',
    url: 'https://convertdox.com/youtube-thumbnail',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
