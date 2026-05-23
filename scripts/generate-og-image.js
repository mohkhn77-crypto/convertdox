const sharp = require('sharp')
const path = require('path')

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0F2A4A"/>
  <rect x="80" y="80" width="100" height="100" rx="20" fill="#E85D04"/>
  <svg x="88" y="88" width="84" height="84" viewBox="0 0 44 44" fill="none">
    <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
    <rect x="25" y="17" width="13" height="17" rx="2" fill="#F48C42"/>
    <polygon points="20,20 24,22 20,24" fill="white"/>
  </svg>
  <text x="204" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="white">ConvertDox</text>
  <text x="80" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="700" fill="white">85+ Free Online Tools</text>
  <text x="80" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="700" fill="#F48C42">No Signup Required</text>
  <text x="80" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="rgba(255,255,255,0.7)">Word Counter  •  QR Generator  •  JSON Formatter  •  BMI Calculator  •  80+ More</text>
  <text x="80" y="556" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.45)">convertdox.com</text>
</svg>`

const outPath = path.join(__dirname, '..', 'public', 'og-image.png')

sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile(outPath)
  .then(info => {
    console.log('og-image.png created:', info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB')
  })
  .catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
  })
