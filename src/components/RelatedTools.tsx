import React from 'react'

const TOOL_NAMES: Record<string, string> = {
  '/word-counter': 'Word Counter',
  '/character-counter': 'Character Counter',
  '/text-case-converter': 'Text Case Converter',
  '/lorem-ipsum': 'Lorem Ipsum Generator',
  '/markdown-editor': 'Markdown Editor',
  '/reverse-text': 'Reverse Text',
  '/remove-duplicates': 'Remove Duplicates',
  '/sort-lines': 'Sort Lines',
  '/find-replace': 'Find & Replace',
  '/text-to-slug': 'Text to Slug',
  '/strip-html': 'Strip HTML Tags',
  '/quote-generator': 'Quote Generator',
  '/lorem-advanced': 'Lorem Ipsum Advanced',
  '/words-to-number': 'Words to Number',
  '/text-diff': 'Text Diff Checker',
  '/tip-calculator': 'Tip Calculator',
  '/bmi-calculator': 'BMI Calculator',
  '/percentage-calculator': 'Percentage Calculator',
  '/age-calculator': 'Age Calculator',
  '/discount-calculator': 'Discount Calculator',
  '/unit-converter': 'Unit Converter',
  '/loan-calculator': 'Loan Calculator',
  '/timezone-converter': 'Time Zone Converter',
  '/date-difference': 'Date Difference',
  '/salary-calculator': 'Salary Calculator',
  '/compound-interest': 'Compound Interest',
  '/gpa-calculator': 'GPA Calculator',
  '/calorie-calculator': 'Calorie Calculator',
  '/pomodoro-timer': 'Pomodoro Timer',
  '/bitrate-calculator': 'Bitrate Calculator',
  '/aspect-ratio': 'Aspect Ratio',
  '/length-converter': 'Length Converter',
  '/weight-converter': 'Weight Converter',
  '/temperature-converter': 'Temperature Converter',
  '/volume-converter': 'Volume Converter',
  '/speed-converter': 'Speed Converter',
  '/json-formatter': 'JSON Formatter',
  '/base64-encoder': 'Base64 Encoder/Decoder',
  '/url-encoder': 'URL Encoder/Decoder',
  '/csv-to-json': 'CSV to JSON Converter',
  '/uuid-generator': 'UUID Generator',
  '/jwt-decoder': 'JWT Decoder',
  '/hash-generator': 'Hash Generator',
  '/xml-formatter': 'XML Formatter',
  '/yaml-to-json': 'YAML ↔ JSON Converter',
  '/json-to-csv': 'JSON to CSV Converter',
  '/sql-formatter': 'SQL Formatter',
  '/regex-tester': 'Regex Tester',
  '/html-to-markdown': 'HTML to Markdown',
  '/markdown-to-html': 'Markdown to HTML',
  '/slug-generator': 'Slug Generator',
  '/html-entities': 'HTML Entity Encoder',
  '/cron-generator': 'Cron Expression Generator',
  '/base-converter': 'Number Base Converter',
  '/timestamp-converter': 'Timestamp Converter',
  '/text-to-binary': 'Text to Binary',
  '/image-to-base64': 'Image to Base64',
  '/uuid-bulk': 'UUID Bulk Generator',
  '/markdown-cheatsheet': 'Markdown Cheatsheet',
  '/code-beautifier': 'Code Beautifier',
  '/hex-rgb-converter': 'HEX ↔ RGB Converter',
  '/css-gradient': 'CSS Gradient Generator',
  '/color-palette': 'Color Palette Generator',
  '/box-shadow': 'CSS Box Shadow',
  '/border-radius': 'CSS Border Radius',
  '/color-blindness': 'Color Blindness Simulator',
  '/random-color': 'Random Color Generator',
  '/password-generator': 'Password Generator',
  '/password-strength': 'Password Strength Checker',
  '/pin-generator': 'PIN Generator',
  '/username-generator': 'Username Generator',
  '/qr-generator': 'QR Code Generator',
  '/random-number-generator': 'Random Number Generator',
  '/coin-flip': 'Coin Flip & Dice Roller',
  '/stopwatch': 'Stopwatch & Timer',
  '/magic-8-ball': 'Magic 8 Ball',
  '/decision-maker': 'Decision Maker',
  '/team-picker': 'Team Picker',
  '/emoji-picker': 'Random Emoji Picker',
  '/yes-no-picker': 'Yes No Picker',
  '/morse-code': 'Morse Code Translator',
  '/ascii-art': 'ASCII Art Generator',
}

const TOOL_RELATIONSHIPS: Record<string, string[]> = {
  '/word-counter': ['/character-counter', '/text-case-converter', '/text-diff'],
  '/json-formatter': ['/yaml-to-json', '/json-to-csv', '/xml-formatter'],
  '/qr-generator': ['/url-encoder', '/base64-encoder', '/uuid-generator'],
  '/password-generator': ['/password-strength', '/pin-generator', '/username-generator'],
  '/bmi-calculator': ['/calorie-calculator', '/age-calculator', '/percentage-calculator'],
  '/tip-calculator': ['/discount-calculator', '/percentage-calculator', '/loan-calculator'],
  '/text-case-converter': ['/word-counter', '/slug-generator', '/find-replace'],
  '/base64-encoder': ['/url-encoder', '/hash-generator', '/jwt-decoder'],
  '/url-encoder': ['/base64-encoder', '/slug-generator', '/html-entities'],
  '/hex-rgb-converter': ['/color-palette', '/css-gradient', '/color-blindness'],
  '/jwt-decoder': ['/base64-encoder', '/hash-generator', '/uuid-generator'],
  '/hash-generator': ['/password-generator', '/jwt-decoder', '/base64-encoder'],
  '/regex-tester': ['/find-replace', '/json-formatter', '/code-beautifier'],
  '/uuid-generator': ['/uuid-bulk', '/hash-generator', '/base64-encoder'],
  '/css-gradient': ['/color-palette', '/hex-rgb-converter', '/box-shadow'],
  '/timezone-converter': ['/timestamp-converter', '/date-difference', '/age-calculator'],
  '/loan-calculator': ['/compound-interest', '/salary-calculator', '/percentage-calculator'],
  '/age-calculator': ['/date-difference', '/bmi-calculator', '/timezone-converter'],
  '/markdown-editor': ['/markdown-to-html', '/html-to-markdown', '/markdown-cheatsheet'],
  '/lorem-ipsum': ['/word-counter', '/lorem-advanced', '/quote-generator'],
}

const DEFAULT_RELATED = ['/word-counter', '/json-formatter', '/qr-generator']

interface RelatedToolsProps {
  currentPath: string
}

export default function RelatedTools({ currentPath }: RelatedToolsProps) {
  const related = TOOL_RELATIONSHIPS[currentPath] ?? DEFAULT_RELATED

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 20px 40px' }}>
      <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '14px' }}>
        Related Tools
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px' }}>
        {related.map(href => (
          <a key={href} href={href}
            style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>
              {TOOL_NAMES[href] ?? href}
            </div>
            <div style={{ fontSize: '12px', color: '#E85D04', fontWeight: 600 }}>Try this tool →</div>
          </a>
        ))}
      </div>
    </div>
  )
}
