'use client'
import PDFEditor from '@/components/PDFEditor/PDFEditor'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function SplitPDFPage() {
  function handleComplete(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <PDFEditor
      mode="split"
      features={['delete', 'rotate', 'zoom']}
      toolTitle="Split PDF"
      toolDescription="Upload your PDF, define page ranges, and download the split files as a ZIP."
      onComplete={handleComplete}
      backendUrl={BACKEND_URL}
    />
  )
}
