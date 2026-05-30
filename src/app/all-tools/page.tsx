import Link from 'next/link'

export const metadata = {
  title: 'All Free Online Tools - 184+ Tools Directory | ConvertDox',
  description: 'Complete directory of 184+ free online tools. PDF tools, image converters, AI writing assistants, calculators, document generators, developer utilities. No signup required.',
  keywords: 'free online tools, online tools directory, free tools list, web tools, online utilities, free converter tools',
  alternates: { canonical: 'https://convertdox.com/all-tools' },
  robots: { index: true, follow: true }
}

const CATEGORIES = [
  {
    name: 'PDF Tools',
    icon: '📄',
    description: 'Convert, merge, split, compress, and edit PDFs',
    tools: [
      { name: 'Merge PDF', url: '/merge-pdf', desc: 'Combine multiple PDFs into one' },
      { name: 'Split PDF', url: '/split-pdf', desc: 'Split PDF into multiple files' },
      { name: 'Compress PDF', url: '/compress-pdf', desc: 'Reduce PDF file size' },
      { name: 'Rotate PDF', url: '/rotate-pdf', desc: 'Rotate PDF pages' },
      { name: 'PDF to Word', url: '/pdf-to-word', desc: 'Convert PDF to editable Word' },
      { name: 'PDF to Excel', url: '/pdf-to-excel', desc: 'Extract tables to Excel' },
      { name: 'PDF to PowerPoint', url: '/pdf-to-ppt', desc: 'Convert PDF to PPT slides' },
      { name: 'PDF to JPG', url: '/pdf-to-jpg', desc: 'Convert PDF pages to images' },
      { name: 'Word to PDF', url: '/word-to-pdf', desc: 'Convert Word docs to PDF' },
      { name: 'Excel to PDF', url: '/excel-to-pdf', desc: 'Convert Excel to PDF' },
      { name: 'PowerPoint to PDF', url: '/ppt-to-pdf', desc: 'Convert PPT to PDF' },
      { name: 'JPG to PDF', url: '/jpg-to-pdf', desc: 'Convert images to PDF' },
      { name: 'HTML to PDF', url: '/html-to-pdf', desc: 'Convert webpages to PDF' },
      { name: 'Unlock PDF', url: '/unlock-pdf', desc: 'Remove PDF password' },
      { name: 'Protect PDF', url: '/protect-pdf', desc: 'Add password to PDF' },
      { name: 'PDF Info', url: '/pdf-info', desc: 'Get PDF metadata' },
      { name: 'PDF to Text', url: '/pdf-to-text', desc: 'Extract text from PDF' },
      { name: 'PDF to PDF/A', url: '/pdf-to-pdfa', desc: 'Convert to archival format' },
      { name: 'Delete PDF Pages', url: '/pdf-delete-pages', desc: 'Remove unwanted pages' },
      { name: 'Extract PDF Pages', url: '/pdf-extract-pages', desc: 'Extract specific pages' },
      { name: 'Reorder PDF Pages', url: '/pdf-reorder-pages', desc: 'Reorder PDF pages' },
      { name: 'PDF Page Numbers', url: '/pdf-page-numbers', desc: 'Add page numbers' },
      { name: 'PDF Header/Footer', url: '/pdf-header-footer', desc: 'Add header and footer' },
      { name: 'Sign PDF', url: '/pdf-sign', desc: 'Add signature to PDF' },
      { name: 'Annotate PDF', url: '/pdf-annotate', desc: 'Annotate PDF documents' },
      { name: 'PDF OCR', url: '/pdf-ocr', desc: 'OCR scanned PDFs' }
    ]
  },
  {
    name: 'Image Tools',
    icon: '🖼️',
    description: 'Convert, compress, resize, and edit images',
    tools: [
      { name: 'Compress Image', url: '/compress-image', desc: 'Reduce image file size' },
      { name: 'Resize Image', url: '/resize-image', desc: 'Change image dimensions' },
      { name: 'Convert Image', url: '/image-convert', desc: 'Convert between formats' },
      { name: 'Crop Image', url: '/image-crop', desc: 'Crop image to size' },
      { name: 'Rotate Image', url: '/rotate-image', desc: 'Rotate images' },
      { name: 'Flip Image', url: '/flip-image', desc: 'Flip horizontally or vertically' },
      { name: 'Grayscale Image', url: '/grayscale-image', desc: 'Convert to black & white' },
      { name: 'Blur Image', url: '/blur-image', desc: 'Apply blur effect' },
      { name: 'Image Info', url: '/image-info', desc: 'Get image metadata' },
      { name: 'Image to Text', url: '/image-to-text', desc: 'OCR text extraction' },
      { name: 'HEIC to JPG', url: '/heic-to-jpg', desc: 'Convert iPhone photos' },
      { name: 'WebP to JPG', url: '/webp-to-jpg', desc: 'Convert WebP to JPG' },
      { name: 'SVG to PNG', url: '/svg-to-png', desc: 'Convert vector to raster' },
      { name: 'Image to ICO', url: '/image-to-ico', desc: 'Create favicon files' },
      { name: 'PNG to ICO', url: '/png-to-ico', desc: 'Create ICO from PNG' },
      { name: 'Add Background', url: '/add-image-background', desc: 'Add background color' },
      { name: 'EXIF Stripper', url: '/exif-stripper', desc: 'Remove metadata' },
      { name: 'Image Watermark', url: '/watermark-image', desc: 'Add watermark' },
      { name: 'Image Colors', url: '/image-color-picker', desc: 'Extract color palette' },
      { name: 'Batch Compress', url: '/compress-images-batch', desc: 'Compress multiple' },
      { name: 'Batch Resize', url: '/resize-images-batch', desc: 'Resize multiple' },
      { name: 'Batch Convert', url: '/convert-images-batch', desc: 'Convert multiple' },
      { name: 'Background Remover', url: '/bg-remove', desc: 'Remove image background' }
    ]
  },
  {
    name: 'AI Tools',
    icon: '🤖',
    description: 'AI-powered writing and content tools',
    tools: [
      { name: 'AI Summarizer', url: '/ai-summarizer', desc: 'Summarize long text' },
      { name: 'AI Grammar Checker', url: '/ai-grammar', desc: 'Fix grammar errors' },
      { name: 'AI Paraphraser', url: '/ai-paraphraser', desc: 'Rewrite text styles' },
      { name: 'AI Resume Improver', url: '/ai-resume-improver', desc: 'Enhance bullets' },
      { name: 'AI Cover Letter', url: '/ai-cover-letter', desc: 'Generate cover letters' },
      { name: 'AI Email Writer', url: '/ai-email-writer', desc: 'Write professional emails' },
      { name: 'AI Translator', url: '/ai-translator', desc: 'Translate 50+ languages' },
      { name: 'AI Tone Changer', url: '/ai-tone-changer', desc: 'Adjust writing tone' }
    ]
  },
  {
    name: 'Calculators',
    icon: '🔢',
    description: 'Financial, health, math, and utility calculators',
    tools: [
      { name: 'BMI Calculator', url: '/bmi-calculator', desc: 'Body Mass Index calculator' },
      { name: 'Tip Calculator', url: '/tip-calculator', desc: 'Calculate tips and splits' },
      { name: 'Age Calculator', url: '/age-calculator', desc: 'Calculate exact age' },
      { name: 'Discount Calculator', url: '/discount-calculator', desc: 'Calculate sale prices' },
      { name: 'Percentage Calculator', url: '/percentage-calculator', desc: 'Calculate percentages' },
      { name: 'Tax Calculator', url: '/tax-calculator', desc: 'Calculate tax amounts' },
      { name: 'Loan Calculator', url: '/loan-calculator', desc: 'Loan payments' },
      { name: 'Salary Calculator', url: '/salary-calculator', desc: 'Calculate salary' },
      { name: 'GPA Calculator', url: '/gpa-calculator', desc: 'Calculate GPA' },
      { name: 'Calorie Calculator', url: '/calorie-calculator', desc: 'Daily calorie needs' },
      { name: 'Compound Interest', url: '/compound-interest', desc: 'Interest calculations' },
      { name: 'Body Fat Calculator', url: '/body-fat-calculator', desc: 'Body fat percentage' },
      { name: 'Macro Calculator', url: '/macro-calculator', desc: 'Macro nutrient ratios' },
      { name: 'Water Intake', url: '/water-intake', desc: 'Daily water needs' },
      { name: 'Investment Calculator', url: '/investment-calculator', desc: 'Investment returns' },
      { name: 'Retirement Calculator', url: '/retirement-calculator', desc: 'Retirement planning' },
      { name: 'Fuel Cost Calculator', url: '/fuel-cost', desc: 'Trip fuel costs' },
      { name: 'Aspect Ratio', url: '/aspect-ratio', desc: 'Calculate aspect ratios' },
      { name: 'Bitrate Calculator', url: '/bitrate-calculator', desc: 'Video/audio bitrate' }
    ]
  },
  {
    name: 'Developer Tools',
    icon: '💻',
    description: 'JSON, encoding, formatting, and developer utilities',
    tools: [
      { name: 'JSON Formatter', url: '/json-formatter', desc: 'Format and validate JSON' },
      { name: 'Base64 Encoder', url: '/base64-encoder', desc: 'Encode/decode Base64' },
      { name: 'URL Encoder', url: '/url-encoder', desc: 'URL encode/decode' },
      { name: 'JWT Decoder', url: '/jwt-decoder', desc: 'Decode JWT tokens' },
      { name: 'Hash Generator', url: '/hash-generator', desc: 'MD5, SHA-256 hashes' },
      { name: 'UUID Generator', url: '/uuid-generator', desc: 'Generate UUIDs' },
      { name: 'XML Formatter', url: '/xml-formatter', desc: 'Format XML data' },
      { name: 'YAML to JSON', url: '/yaml-to-json', desc: 'Convert YAML to JSON' },
      { name: 'JSON to CSV', url: '/json-to-csv', desc: 'Convert JSON to CSV' },
      { name: 'CSV to JSON', url: '/csv-to-json', desc: 'Convert CSV to JSON' },
      { name: 'SQL Formatter', url: '/sql-formatter', desc: 'Format SQL queries' },
      { name: 'Regex Tester', url: '/regex-tester', desc: 'Test regular expressions' },
      { name: 'Cron Generator', url: '/cron-generator', desc: 'Generate cron expressions' },
      { name: 'HTML to Markdown', url: '/html-to-markdown', desc: 'Convert HTML to MD' },
      { name: 'Markdown to HTML', url: '/markdown-to-html', desc: 'Convert MD to HTML' },
      { name: 'HTML Entities', url: '/html-entities', desc: 'Encode/decode entities' },
      { name: 'Color Picker', url: '/hex-rgb-converter', desc: 'HEX to RGB converter' },
      { name: 'CSS Gradient', url: '/css-gradient', desc: 'Generate CSS gradients' },
      { name: 'Box Shadow', url: '/box-shadow', desc: 'CSS box shadow generator' },
      { name: 'Border Radius', url: '/border-radius', desc: 'CSS border radius tool' },
      { name: 'Flexbox Generator', url: '/flexbox-generator', desc: 'CSS flexbox builder' },
      { name: 'Grid Generator', url: '/grid-generator', desc: 'CSS grid builder' },
      { name: 'Animation Generator', url: '/animation-generator', desc: 'CSS animations' },
      { name: 'Code Beautifier', url: '/code-beautifier', desc: 'Beautify code' }
    ]
  },
  {
    name: 'Text Tools',
    icon: '📝',
    description: 'Text manipulation, counting, and analysis',
    tools: [
      { name: 'Word Counter', url: '/word-counter', desc: 'Count words and characters' },
      { name: 'Character Counter', url: '/character-counter', desc: 'Count characters' },
      { name: 'Text Case Converter', url: '/text-case-converter', desc: 'Change text case' },
      { name: 'Reverse Text', url: '/reverse-text', desc: 'Reverse any text' },
      { name: 'Remove Duplicates', url: '/remove-duplicates', desc: 'Remove duplicate lines' },
      { name: 'Sort Lines', url: '/sort-lines', desc: 'Sort lines alphabetically' },
      { name: 'Find & Replace', url: '/find-replace', desc: 'Find and replace text' },
      { name: 'Strip HTML', url: '/strip-html', desc: 'Remove HTML tags' },
      { name: 'Lorem Ipsum', url: '/lorem-ipsum', desc: 'Generate placeholder text' },
      { name: 'Markdown Editor', url: '/markdown-editor', desc: 'Live markdown preview' },
      { name: 'Text Diff', url: '/text-diff', desc: 'Compare two texts' },
      { name: 'Slug Generator', url: '/slug-generator', desc: 'Generate URL slugs' },
      { name: 'Sentence Counter', url: '/sentence-counter', desc: 'Count sentences' },
      { name: 'Word Frequency', url: '/word-frequency', desc: 'Analyze word usage' },
      { name: 'ASCII Art', url: '/ascii-art', desc: 'Generate ASCII art' }
    ]
  },
  {
    name: 'Generators & Utilities',
    icon: '🔧',
    description: 'QR codes, passwords, fun tools, and utilities',
    tools: [
      { name: 'QR Generator', url: '/qr-generator', desc: 'Create QR codes' },
      { name: 'QR Reader', url: '/qr-reader', desc: 'Read QR codes' },
      { name: 'Password Generator', url: '/password-generator', desc: 'Strong passwords' },
      { name: 'Password Strength', url: '/password-strength', desc: 'Check password strength' },
      { name: 'PIN Generator', url: '/pin-generator', desc: 'Generate secure PINs' },
      { name: 'Username Generator', url: '/username-generator', desc: 'Random usernames' },
      { name: 'Random Number', url: '/random-number-generator', desc: 'Random numbers' },
      { name: 'Coin Flip', url: '/coin-flip', desc: 'Virtual coin flip' },
      { name: 'Stopwatch', url: '/stopwatch', desc: 'Online stopwatch' },
      { name: 'Pomodoro Timer', url: '/pomodoro-timer', desc: 'Focus timer' },
      { name: 'Unit Converter', url: '/unit-converter', desc: 'Convert units' },
      { name: 'Length Converter', url: '/length-converter', desc: 'Length units' },
      { name: 'Weight Converter', url: '/weight-converter', desc: 'Weight units' },
      { name: 'Temperature', url: '/temperature-converter', desc: 'Temperature units' },
      { name: 'Timezone Converter', url: '/timezone-converter', desc: 'Convert timezones' },
      { name: 'Favicon Generator', url: '/favicon-generator', desc: 'Site favicons' },
      { name: 'Passport Photo', url: '/passport-photo', desc: 'Create passport photos' },
      { name: 'YouTube Thumbnail', url: '/youtube-thumbnail', desc: 'Download thumbnails' },
      { name: 'Social Media Crops', url: '/social-media-crops', desc: 'Social media sizes' },
      { name: 'Image to Base64', url: '/image-to-base64', desc: 'Encode images' }
    ]
  }
]

export default function AllToolsPage() {
  const totalTools = CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px', lineHeight: 1.2 }}>
            All <span style={{ color: '#E85D04' }}>{totalTools}+ Free</span> Online Tools
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            Browse our complete collection of free tools. No signup, no installation, files never stored.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '48px' }}>
          {CATEGORIES.map(cat => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              style={{
                padding: '10px 20px',
                background: 'white',
                border: '1.5px solid #e2e8f0',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0F2A4A',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span style={{ color: '#E85D04', fontWeight: 700 }}>({cat.tools.length})</span>
            </a>
          ))}
        </div>

        {CATEGORIES.map(category => (
          <section
            key={category.name}
            id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span style={{ fontSize: '14px', color: '#E85D04', background: '#FFF7ED', padding: '4px 12px', borderRadius: '999px', fontWeight: 700 }}>
                  {category.tools.length} tools
                </span>
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b' }}>{category.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {category.tools.map(tool => (
                <Link
                  key={tool.url}
                  href={tool.url}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: '1.5px solid #e2e8f0'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F2A4A', marginBottom: '4px' }}>
                    {tool.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                    {tool.desc}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ background: '#0F2A4A', padding: '40px', borderRadius: '16px', textAlign: 'center', marginTop: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
            Can&apos;t find what you need?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
            Request a new tool or share feedback.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#E85D04',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  )
}
