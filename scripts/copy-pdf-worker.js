/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const workerPaths = [
  'node_modules/pdfjs-dist/build/pdf.worker.min.js',
  'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js',
  'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs',
]

const publicDir = path.join(__dirname, '..', 'public')

let sourceFile = null
for (const wp of workerPaths) {
  const fullPath = path.join(__dirname, '..', wp)
  if (fs.existsSync(fullPath)) {
    sourceFile = fullPath
    break
  }
}

if (!sourceFile) {
  console.error('❌ Could not find pdf.worker file in node_modules/pdfjs-dist')
  workerPaths.forEach(p => console.error('  Searched: ' + p))
  process.exit(1)
}

const destJs  = path.join(publicDir, 'pdf.worker.min.js')
const destMjs = path.join(publicDir, 'pdf.worker.min.mjs')

fs.copyFileSync(sourceFile, destJs)
fs.copyFileSync(sourceFile, destMjs)

console.log('✅ pdf.worker copied from:', sourceFile)
console.log('   →', destJs)
console.log('   →', destMjs)
