type CategoryContent = {
  heading: string
  intro: string
  body: string
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  pdf: {
    heading: 'Free PDF Tools',
    intro: 'Convert, merge, split, compress, and edit PDF files online — all free, no signup, files deleted after processing.',
    body: 'PDFs are the universal format for sharing documents, but working with them often requires expensive software. Our free PDF tools handle the most common tasks right in your browser: merging multiple PDFs into one document, splitting large files into smaller pieces, compressing files to meet email size limits, and converting to and from Word, Excel, PowerPoint, and image formats. Every file you upload is processed securely and permanently deleted within minutes. No account required, no watermarks, no hidden fees.'
  },
  image: {
    heading: 'Free Image Tools',
    intro: 'Compress, resize, convert, and edit images online. Supports JPG, PNG, WebP, HEIC, and more.',
    body: 'Whether you need to shrink a photo for a website, convert an iPhone HEIC image to JPG, or resize pictures for social media, our free image tools get the job done without installing anything. Compress images to reduce file size while preserving quality, convert between formats, crop and rotate, and remove backgrounds. All processing happens securely with files deleted shortly after — your images never sit on a server or get shared with third parties.'
  },
  text: {
    heading: 'Free Text Tools',
    intro: 'Count words, change text case, generate placeholder text, and edit Markdown — all free.',
    body: 'Writers, students, and developers rely on text utilities every day. Our free text tools include a word and character counter with reading-time estimates, a case converter for switching between uppercase, lowercase, title case and camelCase, a Lorem Ipsum placeholder generator, and a live Markdown editor. Everything runs in your browser, so your text never leaves your device.'
  },
  calc: {
    heading: 'Free Calculators',
    intro: 'Financial, health, and everyday calculators — BMI, tip, percentage, age, discount, unit conversion and more.',
    body: 'From splitting a restaurant bill to calculating your body mass index or figuring out a sale price, our free calculators cover the everyday math you need. Each calculator is designed to be fast and accurate, with clear explanations of how the numbers work. No ads cluttering the interface, no signup required — just open the tool and get your answer.'
  },
  dev: {
    heading: 'Free Developer Tools',
    intro: 'JSON formatter, Base64 encoder, URL encoder, regex tester and more — built for developers.',
    body: 'Developers need quick, reliable utilities that respect their data. Our free developer tools include a JSON formatter and validator, Base64 encoder and decoder, URL encoder, regex tester, and more. Everything processes locally in your browser when possible, so sensitive tokens, API responses, and code snippets never travel to a server. Bookmark the ones you use daily.'
  },
  color: {
    heading: 'Free Color Tools',
    intro: 'Convert between HEX and RGB, build CSS gradients, and work with color codes visually.',
    body: 'Designers and front-end developers work with color constantly. Our free color tools let you convert between HEX, RGB and other formats, generate beautiful CSS gradients visually, and explore color combinations. Each tool gives you copy-ready code so you can drop results straight into your stylesheet.'
  },
  docs: {
    heading: 'Free Document Tools',
    intro: 'Generate invoices, receipts, resumes, business cards, and other documents — free templates.',
    body: 'Creating professional documents usually means wrestling with templates in word processors. Our free document generators let you build invoices, receipts, resumes, business cards, letterheads and purchase orders with clean, professional layouts. Fill in your details, download the result, and you are done — no subscriptions, no watermarks.'
  },
  specialty: {
    heading: 'Specialty Tools',
    intro: 'Niche and specialized tools for specific tasks.',
    body: 'Some tasks do not fit neatly into a category. Our specialty tools collection gathers useful utilities that solve specific problems — each free to use, with files deleted after processing and no account required.'
  },
  ocr: {
    heading: 'Free OCR Tools',
    intro: 'Extract text from images and scanned documents using optical character recognition.',
    body: 'Optical character recognition (OCR) turns images of text — scanned documents, photos of signs, screenshots — into editable, searchable text. Our free OCR tools handle this conversion in your browser, so the documents you scan stay private. Useful for digitizing receipts, extracting quotes from images, or making scanned PDFs searchable.'
  },
  ai: {
    heading: 'Free AI Writing Tools',
    intro: 'Summarize, paraphrase, translate, fix grammar, and write with AI — all free.',
    body: 'AI writing assistants help you work faster, but most charge monthly subscriptions or impose strict limits. Our free AI tools include a summarizer for condensing long articles, a paraphraser for rewriting text, a grammar checker, a translator, a tone changer, and email and resume writers. Your text is processed to generate results and is not stored or used to train models.'
  },
  util: {
    heading: 'Free Utility Tools',
    intro: 'Everyday utilities and helpers for common tasks.',
    body: 'Our utility tools cover the small everyday tasks that do not warrant their own category — quick helpers that save you time. Each is free, runs in your browser, and respects your privacy.'
  },
  security: {
    heading: 'Free Security Tools',
    intro: 'Generate secure passwords and protect your digital privacy.',
    body: 'Strong security starts with good tools. Our free security utilities include a cryptographically secure password generator that creates strong, random passwords right in your browser — they are never transmitted or stored anywhere. Protect your accounts without trusting a third party with your credentials.'
  },
  qr: {
    heading: 'Free QR Code Tools',
    intro: 'Generate QR codes for URLs, WiFi, email, and more — free, no watermark.',
    body: 'QR codes bridge the physical and digital worlds. Our free QR code generator creates codes for website URLs, WiFi network credentials, email addresses, plain text and more. Generated codes are yours to use anywhere — on flyers, business cards, product packaging — with no watermarks or usage limits.'
  },
  fun: {
    heading: 'Fun & Random Tools',
    intro: 'Decision makers, random generators, and tools just for fun.',
    body: 'Not everything has to be serious. Our fun and random tools include decision makers, random pickers, generators and novelty utilities for when you need a quick answer or a bit of entertainment. All free, all instant.'
  }
}

export function getCategoryContent(id: string): CategoryContent | undefined {
  return CATEGORY_CONTENT[id]
}
