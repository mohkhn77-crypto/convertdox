'use client'

// Lazy singleton — pdfjs-dist is only loaded in the browser, never on the server.
// The worker file is copied to /public by scripts/copy-pdf-worker.js at build time.

import type { PDFDocumentProxy } from 'pdfjs-dist'

let pdfjs: typeof import('pdfjs-dist') | null = null

export async function getPdfJs(): Promise<typeof import('pdfjs-dist')> {
  if (typeof window === 'undefined') {
    throw new Error('PDF.js can only be used in the browser')
  }
  if (!pdfjs) {
    pdfjs = await import('pdfjs-dist')
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
  }
  return pdfjs
}

export type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'
