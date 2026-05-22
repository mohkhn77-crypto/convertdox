import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Code Beautifier & Minifier — HTML, CSS, JS, SQL, JSON, XML | ConvertDox',
  description: 'Beautify or minify HTML, CSS, JavaScript, JSON, SQL, and XML code online. Choose 2-space, 4-space, or tab indentation. Free code formatter tool.',
  alternates: { canonical: 'https://convertdox.com/code-beautifier' },
  openGraph: { title: 'Code Beautifier & Minifier — HTML, CSS, JS, SQL, JSON, XML | ConvertDox', description: 'Format and beautify code online. Supports HTML, CSS, JavaScript, JSON, SQL, XML. Free tool.', url: 'https://convertdox.com/code-beautifier', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
