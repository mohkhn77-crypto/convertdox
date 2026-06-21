export type Tool = {
  iconType: string
  title: string
  desc: string
  href: string
  cat: string
}

export type Category = {
  id: string
  label: string
  iconType: string
}

export type ComingTool = {
  icon: string
  title: string
  desc: string
}

export const TOOLS: Tool[] = [
  // Text
  { iconType:'word-counter',    title:'Word Counter',            desc:'Count words, chars & reading time',       href:'/word-counter',              cat:'text' },
  { iconType:'text-case',       title:'Text Case Converter',     desc:'UPPER, lower, Title, camelCase & more',   href:'/text-case-converter',       cat:'text' },
  { iconType:'lorem',           title:'Lorem Ipsum Generator',   desc:'Placeholder text for designs',            href:'/lorem-ipsum',               cat:'text' },
  { iconType:'markdown',        title:'Markdown Editor',         desc:'Write and preview Markdown live',         href:'/markdown-editor',           cat:'text' },
  // Calculators
  { iconType:'tip',             title:'Tip Calculator',          desc:'Split bills and calculate tips',          href:'/tip-calculator',            cat:'calc' },
  { iconType:'bmi',             title:'BMI Calculator',          desc:'Body mass index — metric & imperial',     href:'/bmi-calculator',            cat:'calc' },
  { iconType:'percentage',      title:'Percentage Calculator',   desc:'5 types of percentage calculations',      href:'/percentage-calculator',     cat:'calc' },
  { iconType:'age',             title:'Age Calculator',          desc:'Exact age + zodiac + next birthday',      href:'/age-calculator',            cat:'calc' },
  { iconType:'discount',        title:'Discount Calculator',     desc:'Find sale price and savings instantly',   href:'/discount-calculator',       cat:'calc' },
  { iconType:'unit',            title:'Unit Converter',          desc:'Length, weight, temperature & more',      href:'/unit-converter',            cat:'calc' },
  // Security
  { iconType:'password',        title:'Password Generator',      desc:'Cryptographically secure passwords',      href:'/password-generator',        cat:'security' },
  // QR
  { iconType:'qr',              title:'QR Code Generator',       desc:'URL, WiFi, email QR codes — free',        href:'/qr-generator',              cat:'qr' },
  // Colour
  { iconType:'hex-rgb',         title:'HEX ↔ RGB Converter',     desc:'Convert between colour code formats',     href:'/hex-rgb-converter',         cat:'color' },
  { iconType:'css-gradient',    title:'CSS Gradient Generator',  desc:'Build beautiful CSS gradients visually',  href:'/css-gradient',              cat:'color' },
  // Developer
  { iconType:'json',            title:'JSON Formatter',          desc:'Format, validate and minify JSON',        href:'/json-formatter',            cat:'dev' },
  { iconType:'base64',          title:'Base64 Encoder/Decoder',  desc:'Encode text or decode Base64 strings',    href:'/base64-encoder',            cat:'dev' },
  { iconType:'url-encoder',     title:'URL Encoder/Decoder',     desc:'Encode or decode URL strings',            href:'/url-encoder',               cat:'dev' },
  // Fun
  { iconType:'random',          title:'Random Number Generator', desc:'Random numbers in any range',             href:'/random-number-generator',   cat:'fun' },
  { iconType:'coin-flip',       title:'Coin Flip & Dice Roller', desc:'Flip coins, roll any dice',               href:'/coin-flip',                 cat:'fun' },
  { iconType:'stopwatch',       title:'Stopwatch & Timer',       desc:'Online stopwatch + countdown timer',      href:'/stopwatch',                 cat:'fun' },
  // New tools
  { iconType:'number-words', title:'Number to Words',         desc:'Convert numbers to written English words', href:'/number-to-words', cat:'text' },
  { iconType:'roman',        title:'Roman Numeral Converter', desc:'Convert numbers ↔ Roman numerals',         href:'/roman-numerals',  cat:'text' },
  { iconType:'text-diff',    title:'Text Diff Checker',       desc:'Compare two texts and highlight changes',  href:'/text-diff',       cat:'text' },
  { iconType:'csv-json',     title:'CSV to JSON Converter',   desc:'Convert CSV spreadsheet data to JSON',     href:'/csv-to-json',     cat:'dev' },
  { iconType:'uuid',         title:'UUID Generator',          desc:'Generate random UUID v4 identifiers',      href:'/uuid-generator',  cat:'dev' },
  // Calculators (new)
  { iconType:'timezone',   title:'Time Zone Converter',      desc:'Convert times between any time zones',        href:'/timezone-converter',   cat:'calc' },
  { iconType:'date-diff',  title:'Date Difference',          desc:'Days, weeks, months between two dates',       href:'/date-difference',      cat:'calc' },
  { iconType:'salary',     title:'Salary Calculator',        desc:'Convert hourly ↔ annual salary instantly',    href:'/salary-calculator',    cat:'calc' },
  { iconType:'gpa',        title:'GPA Calculator',           desc:'Calculate GPA from course grades',            href:'/gpa-calculator',       cat:'calc' },
  { iconType:'calorie',    title:'Calorie Calculator',       desc:'BMR & TDEE from age, height & weight',        href:'/calorie-calculator',   cat:'calc' },
  { iconType:'pomodoro',   title:'Pomodoro Timer',           desc:'Focus timer with work & break intervals',     href:'/pomodoro-timer',       cat:'fun' },
  // Developer (new)
  { iconType:'jwt',        title:'JWT Decoder',              desc:'Decode & inspect JSON Web Tokens',            href:'/jwt-decoder',          cat:'dev' },
  { iconType:'hash',       title:'Hash Generator',           desc:'MD5, SHA-1, SHA-256, SHA-512 hashes',         href:'/hash-generator',       cat:'dev' },
  { iconType:'xml',        title:'XML Formatter',            desc:'Format, validate and minify XML code',        href:'/xml-formatter',        cat:'dev' },
  { iconType:'yaml',       title:'YAML ↔ JSON Converter',   desc:'Convert between YAML and JSON formats',        href:'/yaml-to-json',         cat:'dev' },
  { iconType:'json-csv',   title:'JSON to CSV Converter',   desc:'Convert JSON arrays to CSV spreadsheets',      href:'/json-to-csv',          cat:'dev' },
  { iconType:'sql',        title:'SQL Formatter',            desc:'Format and beautify SQL queries',             href:'/sql-formatter',        cat:'dev' },
  { iconType:'regex',      title:'Regex Tester',             desc:'Test and debug regular expressions live',     href:'/regex-tester',         cat:'dev' },
  { iconType:'html-md',    title:'HTML to Markdown',         desc:'Convert HTML code to Markdown format',        href:'/html-to-markdown',     cat:'dev' },
  { iconType:'md-html',    title:'Markdown to HTML',         desc:'Convert Markdown to HTML with preview',       href:'/markdown-to-html',     cat:'dev' },
  { iconType:'slug',       title:'Slug Generator',           desc:'Convert text to URL-friendly slugs',          href:'/slug-generator',       cat:'dev' },
  { iconType:'entities',   title:'HTML Entity Encoder',      desc:'Encode & decode HTML entities',               href:'/html-entities',        cat:'dev' },
  { iconType:'cron',       title:'Cron Expression Generator',desc:'Build and explain cron job schedules',        href:'/cron-generator',       cat:'dev' },
  // Batch 3 — Text
  { iconType:'char-count',    title:'Character Counter',       desc:'Count chars, words, sentences & more',       href:'/character-counter',    cat:'text' },
  { iconType:'reverse-text',  title:'Reverse Text',            desc:'Reverse chars, words, or flip upside down',  href:'/reverse-text',         cat:'text' },
  { iconType:'remove-dup',    title:'Remove Duplicates',       desc:'Remove duplicate lines from any text',        href:'/remove-duplicates',    cat:'text' },
  { iconType:'sort-lines',    title:'Sort Lines',              desc:'Alphabetical, numeric or random sorting',     href:'/sort-lines',           cat:'text' },
  { iconType:'find-replace',  title:'Find & Replace',          desc:'Multi-pattern text find and replace',         href:'/find-replace',         cat:'text' },
  { iconType:'slug-adv',      title:'Text to Slug',            desc:'Batch URL slug generator',                   href:'/text-to-slug',         cat:'text' },
  { iconType:'strip-html',    title:'Strip HTML Tags',         desc:'Extract plain text from HTML code',           href:'/strip-html',           cat:'text' },
  { iconType:'quotes',        title:'Quote Generator',         desc:'Famous quotes by category',                  href:'/quote-generator',      cat:'text' },
  // Batch 3 — Color
  { iconType:'palette',       title:'Color Palette',           desc:'5 palette modes from any base color',         href:'/color-palette',        cat:'color' },
  { iconType:'color-blind',   title:'Color Blindness Sim',     desc:'Test colors for accessibility',               href:'/color-blindness',      cat:'color' },
  // Batch 3 — Security
  { iconType:'pw-strength',   title:'Password Strength',       desc:'Test password security strength',             href:'/password-strength',    cat:'security' },
  { iconType:'pin-gen',       title:'PIN Generator',           desc:'Generate secure PINs and codes',              href:'/pin-generator',        cat:'security' },
  { iconType:'username',      title:'Username Generator',      desc:'Creative random username ideas',               href:'/username-generator',   cat:'security' },
  // Batch 3 — Dev & Fun
  { iconType:'binary',        title:'Binary ↔ Decimal',        desc:'Convert binary, decimal, hex, octal',         href:'/binary-decimal',       cat:'dev' },
  { iconType:'morse',         title:'Morse Code',              desc:'Translate text ↔ Morse with audio',           href:'/morse-code',           cat:'fun' },
  { iconType:'base-conv',     title:'Number Base Converter',   desc:'Convert between any number bases',            href:'/base-converter',       cat:'dev' },
  { iconType:'timestamp',     title:'Timestamp Converter',     desc:'Unix timestamp ↔ human-readable dates',       href:'/timestamp-converter',  cat:'dev' },
  { iconType:'text-binary',   title:'Text to Binary',          desc:'Convert text to binary code',                 href:'/text-to-binary',       cat:'dev' },
  // Batch 4 — Fun
  { iconType:'magic-8',      title:'Magic 8 Ball',           desc:'Classic Magic 8-Ball predictions',          href:'/magic-8-ball',          cat:'fun' },
  { iconType:'decision',     title:'Decision Maker',          desc:'Yes/No or multi-choice random decider',     href:'/decision-maker',        cat:'fun' },
  { iconType:'team-picker',  title:'Team Picker',             desc:'Shuffle names into random teams',           href:'/team-picker',           cat:'fun' },
  { iconType:'rand-color',   title:'Random Color',            desc:'Random colors with palette mode',           href:'/random-color',          cat:'color' },
  { iconType:'emoji',        title:'Random Emoji',            desc:'Pick random emojis by category',            href:'/emoji-picker',          cat:'fun' },
  { iconType:'yes-no',       title:'Yes No Picker',           desc:'Spinning coin yes/no flipper',              href:'/yes-no-picker',         cat:'fun' },
  { iconType:'img-base64',   title:'Image to Base64',         desc:'Convert images to Base64 in browser',       href:'/image-to-base64',       cat:'dev' },
  { iconType:'bitrate',      title:'Bitrate Calculator',      desc:'Bitrate, duration, file size calc',         href:'/bitrate-calculator',    cat:'calc' },
  { iconType:'aspect',       title:'Aspect Ratio',            desc:'Resolution and ratio calculator',           href:'/aspect-ratio',          cat:'calc' },
  { iconType:'length',       title:'Length Converter',        desc:'mm, cm, m, km, ft, miles & more',           href:'/length-converter',      cat:'calc' },
  { iconType:'weight',       title:'Weight Converter',        desc:'g, kg, lbs, oz, stones & more',             href:'/weight-converter',      cat:'calc' },
  { iconType:'temp',         title:'Temperature Converter',   desc:'Celsius, Fahrenheit, Kelvin & more',        href:'/temperature-converter', cat:'calc' },
  { iconType:'volume',       title:'Volume Converter',        desc:'ml, l, cups, gallons, ounces',              href:'/volume-converter',      cat:'calc' },
  { iconType:'speed',        title:'Speed Converter',         desc:'mph, km/h, knots, mach & pace',             href:'/speed-converter',       cat:'calc' },
  { iconType:'lorem-adv',    title:'Lorem Ipsum Advanced',    desc:'Hipster, corporate & tech lorem types',     href:'/lorem-advanced',        cat:'text' },
  { iconType:'uuid-bulk',    title:'UUID Bulk Generator',     desc:'Generate up to 1000 UUIDs at once',         href:'/uuid-bulk',             cat:'dev' },
  { iconType:'md-cheat',     title:'Markdown Cheatsheet',     desc:'Live editor with interactive cheatsheet',   href:'/markdown-cheatsheet',   cat:'dev' },
  { iconType:'beautifier',   title:'Code Beautifier',         desc:'Format HTML, CSS, JS, SQL, XML, JSON',      href:'/code-beautifier',       cat:'dev' },
  { iconType:'words-num',    title:'Words to Number',         desc:'"five hundred" converts to 500',            href:'/words-to-number',       cat:'text' },
  { iconType:'ascii',        title:'ASCII Art Generator',     desc:'Convert text to ASCII art fonts',           href:'/ascii-art',             cat:'fun' },
  // Batch 5 — New 20 tools
  { iconType:'anagram',      title:'Anagram Generator',       desc:'Generate letter rearrangements from any word',            href:'/anagram-generator',           cat:'text' },
  { iconType:'palindrome',   title:'Palindrome Checker',      desc:'Check if text reads same forwards and backwards',         href:'/palindrome-checker',          cat:'text' },
  { iconType:'word-freq',    title:'Word Frequency Counter',  desc:'Count word occurrences and visualize frequency',          href:'/word-frequency',              cat:'text' },
  { iconType:'tts',          title:'Text to Speech',          desc:'Convert text to spoken audio via browser',                href:'/text-to-speech',              cat:'text' },
  { iconType:'stt',          title:'Speech to Text',          desc:'Voice transcription in your browser',                     href:'/speech-to-text',              cat:'text' },
  { iconType:'letter-space', title:'Letter Spacing Generator',desc:'Add spaces/separators between letters',                   href:'/letter-spacing',              cat:'text' },
  { iconType:'sentence',     title:'Sentence Counter',        desc:'Sentence stats and readability scores',                   href:'/sentence-counter',            cat:'text' },
  { iconType:'word-counter', title:'Detailed Word Counter',   desc:'Analyze text in detail',                                  href:'/detailed-word-counter',       cat:'text' },
  { iconType:'tax',          title:'Tax Calculator',          desc:'Estimate income tax for US, UK, Canada, Australia',       href:'/tax-calculator',              cat:'calc' },
  { iconType:'invest',       title:'Investment Calculator',   desc:'Project stock/savings growth over time',                  href:'/investment-calculator',       cat:'calc' },
  { iconType:'retire',       title:'Retirement Calculator',   desc:'401k/IRA nest egg and withdrawal projections',            href:'/retirement-calculator',       cat:'calc' },
  { iconType:'body-fat',     title:'Body Fat Calculator',     desc:'Calculate body fat % with Navy or BMI method',            href:'/body-fat-calculator',         cat:'calc' },
  { iconType:'macro',        title:'Macro Calculator',        desc:'Daily protein, carbs, and fat targets by goal',           href:'/macro-calculator',            cat:'calc' },
  { iconType:'water',        title:'Water Intake Calculator', desc:'Daily hydration needs based on weight and activity',      href:'/water-intake',                cat:'calc' },
  { iconType:'fuel',         title:'Fuel Cost Calculator',    desc:'Estimate trip fuel cost and per-person share',            href:'/fuel-cost',                   cat:'calc' },
  { iconType:'calorie',      title:'Pregnancy Calculator',    desc:'Pregnancy due date calculator',                           href:'/pregnancy-due-date-calculator',cat:'calc' },
  { iconType:'flexbox',      title:'CSS Flexbox Generator',   desc:'Visual flexbox layout builder with live preview',         href:'/flexbox-generator',           cat:'dev' },
  { iconType:'grid-gen',     title:'CSS Grid Generator',      desc:'Visual CSS Grid builder with live preview',               href:'/grid-generator',              cat:'dev' },
  { iconType:'animation',    title:'CSS Animation Generator', desc:'Build CSS keyframe animations visually',                  href:'/animation-generator',         cat:'dev' },
  { iconType:'favicon',      title:'Favicon Generator',       desc:'Generate favicons from text or initials',                 href:'/favicon-generator',           cat:'dev' },
  { iconType:'contrast',     title:'Color Contrast Checker',  desc:'WCAG accessibility contrast ratio checker',               href:'/color-contrast',              cat:'color' },

  // === PDF Tools ===
  { iconType:'pdf-unlock',   title:'Unlock PDF',           desc:'Remove password from PDF',                href:'/unlock-pdf',                  cat:'pdf' },
  { iconType:'pdf-protect',  title:'Protect PDF',          desc:'Password-protect PDF files',              href:'/protect-pdf',                 cat:'pdf' },
  { iconType:'pdf-info',     title:'PDF Info',             desc:'Page count and PDF metadata',             href:'/pdf-info',                    cat:'pdf' },
  { iconType:'pdf-text',     title:'Extract PDF Text',     desc:'Get text content from PDF',               href:'/pdf-to-text',                 cat:'pdf' },
  { iconType:'pdf-excel',    title:'PDF to Excel',         desc:'Convert PDF to spreadsheet',              href:'/pdf-to-excel',                cat:'pdf' },
  { iconType:'excel-pdf',    title:'Excel to PDF',         desc:'Convert spreadsheet to PDF',              href:'/excel-to-pdf',                cat:'pdf' },
  { iconType:'pdf-ppt',      title:'PDF to PowerPoint',    desc:'Convert PDF to slides',                   href:'/pdf-to-ppt',                  cat:'pdf' },
  { iconType:'ppt-pdf',      title:'PowerPoint to PDF',    desc:'Convert slides to PDF',                   href:'/ppt-to-pdf',                  cat:'pdf' },
  { iconType:'pdf-archive',  title:'PDF to PDF/A',         desc:'Convert to archival format',              href:'/pdf-to-pdfa',                 cat:'pdf' },
  { iconType:'html-pdf',     title:'HTML to PDF',          desc:'Convert HTML files to PDF',               href:'/html-to-pdf',                 cat:'pdf' },
  { iconType:'pdf-numbers',  title:'PDF Page Numbers',     desc:'Add page numbers to PDF',                 href:'/pdf-page-numbers',            cat:'pdf' },
  { iconType:'pdf-hf',       title:'PDF Header/Footer',    desc:'Add header and footer text',              href:'/pdf-header-footer',           cat:'pdf' },
  { iconType:'pdf-delete',   title:'Delete PDF Pages',     desc:'Remove specific pages from PDF',          href:'/pdf-delete-pages',            cat:'pdf' },
  { iconType:'pdf-reorder',  title:'Reorder PDF Pages',    desc:'Change page order in PDF',                href:'/pdf-reorder-pages',           cat:'pdf' },
  { iconType:'pdf-extract',  title:'Extract PDF Pages',    desc:'Pull pages into a new PDF',               href:'/pdf-extract-pages',           cat:'pdf' },
  { iconType:'pdf-merge-sp', title:'Merge Specific Pages', desc:'Combine specific pages from PDFs',        href:'/pdf-merge-specific',          cat:'pdf' },
  { iconType:'pdf-sign',     title:'Sign PDF',             desc:'Add e-signature to PDF',                  href:'/pdf-sign',                    cat:'pdf' },
  { iconType:'pdf-annotate', title:'Annotate PDF',         desc:'Add notes and highlights to PDF',         href:'/pdf-annotate',                cat:'pdf' },
  { iconType:'pdf-archive',  title:'Compress PDF',         desc:'Reduce PDF file size online',             href:'/compress-pdf',                cat:'pdf' },
  { iconType:'pdf-merge-sp', title:'Merge PDF',            desc:'Combine multiple PDFs into one',          href:'/merge-pdf',                   cat:'pdf' },
  { iconType:'pdf-extract',  title:'Split PDF',            desc:'Split PDF into pages or ranges',          href:'/split-pdf',                   cat:'pdf' },
  { iconType:'pdf-reorder',  title:'Rotate PDF',           desc:'Rotate PDF pages permanently',            href:'/rotate-pdf',                  cat:'pdf' },
  { iconType:'pdf-annotate', title:'PDF Editor',           desc:'Reorder, rotate & delete PDF pages',      href:'/pdf-editor',                  cat:'pdf' },
  { iconType:'pdf-text',     title:'PDF to JPG',           desc:'Convert PDF pages to JPG images',         href:'/pdf-to-jpg',                  cat:'pdf' },
  { iconType:'pdf-text',     title:'PDF to PNG',           desc:'Convert PDF pages to PNG images',         href:'/pdf-to-png',                  cat:'pdf' },
  { iconType:'pdf-text',     title:'PDF to Word',          desc:'Convert PDF to editable Word',            href:'/pdf-to-word',                 cat:'pdf' },
  { iconType:'html-pdf',     title:'PNG to PDF',           desc:'Convert PNG images to PDF',               href:'/png-to-pdf',                  cat:'pdf' },
  { iconType:'html-pdf',     title:'Word to PDF',          desc:'Convert Word documents to PDF',           href:'/word-to-pdf',                 cat:'pdf' },

  // === Image Tools ===
  { iconType:'img-compress', title:'Compress Image',       desc:'Reduce image file size',                  href:'/compress-image',              cat:'image' },
  { iconType:'img-resize',   title:'Resize Image',         desc:'Change image dimensions',                 href:'/resize-image',                cat:'image' },
  { iconType:'img-convert',  title:'Convert Image Format', desc:'JPG, PNG, WebP, AVIF formats',            href:'/image-convert',               cat:'image' },
  { iconType:'img-crop',     title:'Crop Image',           desc:'Crop to square or custom ratio',          href:'/image-crop',                  cat:'image' },
  { iconType:'img-rotate',   title:'Rotate Image',         desc:'Rotate 90/180/270 degrees',               href:'/rotate-image',                cat:'image' },
  { iconType:'img-flip',     title:'Flip Image',           desc:'Horizontal or vertical flip',             href:'/flip-image',                  cat:'image' },
  { iconType:'img-gray',     title:'Grayscale Image',      desc:'Convert to black and white',              href:'/grayscale-image',             cat:'image' },
  { iconType:'img-info',     title:'Image Info',           desc:'Get image dimensions and metadata',       href:'/image-info',                  cat:'image' },
  { iconType:'batch-compress',title:'Batch Compress',      desc:'Compress multiple images at once',        href:'/compress-images-batch',       cat:'image' },
  { iconType:'batch-resize', title:'Batch Resize',         desc:'Resize multiple images at once',          href:'/resize-images-batch',         cat:'image' },
  { iconType:'batch-convert',title:'Batch Convert',        desc:'Convert multiple images at once',         href:'/convert-images-batch',        cat:'image' },
  { iconType:'exif',         title:'EXIF Stripper',        desc:'Remove image metadata for privacy',       href:'/exif-stripper',               cat:'image' },
  { iconType:'img-watermark',title:'Watermark Image',      desc:'Add text watermark to images',            href:'/watermark-image',             cat:'image' },
  { iconType:'img-colors',   title:'Image Color Picker',   desc:'Extract dominant colors from image',      href:'/image-color-picker',          cat:'image' },
  { iconType:'img-blur',     title:'Blur Image',           desc:'Apply Gaussian blur effect',              href:'/blur-image',                  cat:'image' },
  { iconType:'heic',         title:'HEIC to JPG',          desc:'Convert iPhone HEIC photos to JPG',       href:'/heic-to-jpg',                 cat:'image' },
  { iconType:'webp',         title:'WebP to JPG',          desc:'Convert WebP to standard JPG',            href:'/webp-to-jpg',                 cat:'image' },
  { iconType:'svg-png',      title:'SVG to PNG',           desc:'Convert SVG vectors to PNG',              href:'/svg-to-png',                  cat:'image' },
  { iconType:'img-ico',      title:'Image to ICO',         desc:'Create favicon ICO file',                 href:'/image-to-ico',                cat:'image' },
  { iconType:'png-ico',      title:'PNG to ICO',           desc:'Multi-size ICO pack from PNG',            href:'/png-to-ico',                  cat:'image' },
  { iconType:'add-bg',       title:'Add Image Background', desc:'Add solid color background to image',     href:'/add-image-background',        cat:'image' },
  { iconType:'batch-convert',title:'Merge Images',         desc:'Combine multiple images into one',        href:'/merge-images',                cat:'image' },
  { iconType:'img-gray',     title:'Background Remover',   desc:'Remove image backgrounds, get transparent PNG', href:'/bg-remove',             cat:'image' },

  // === OCR Tools ===
  { iconType:'ocr-img',      title:'Image to Text (OCR)',  desc:'Extract text from images',                href:'/image-to-text',               cat:'ocr' },
  { iconType:'ocr-pdf',      title:'PDF OCR',              desc:'Extract text from scanned PDFs',          href:'/pdf-ocr',                     cat:'ocr' },

  // === Specialty Tools ===
  { iconType:'passport',     title:'Passport Photo Maker', desc:'Create 2×2 inch passport photos',         href:'/passport-photo',              cat:'specialty' },
  { iconType:'favicon-img',  title:'Favicon from Image',   desc:'Generate favicon sizes from image',       href:'/favicon-from-image',          cat:'specialty' },
  { iconType:'social-crops', title:'Social Media Crops',   desc:'Auto-crop for Instagram, FB, Twitter',    href:'/social-media-crops',          cat:'specialty' },
  { iconType:'instagram-sq', title:'Instagram Square',     desc:'Crop image to 1:1 ratio',                 href:'/instagram-square',            cat:'specialty' },
  { iconType:'qr-reader',    title:'QR Code Reader',       desc:'Decode QR codes from images',             href:'/qr-reader',                   cat:'specialty' },
  { iconType:'favicon',      title:'Logo Maker',           desc:'Create simple text logos',                 href:'/logo-maker',                  cat:'specialty' },

  // === Document Tools ===
  { iconType:'invoice',      title:'Invoice Generator',    desc:'Create professional invoices',            href:'/invoice-generator',           cat:'docs' },
  { iconType:'receipt',      title:'Receipt Generator',    desc:'Generate receipts instantly',             href:'/receipt-generator',           cat:'docs' },
  { iconType:'po',           title:'Purchase Order',       desc:'Create purchase orders',                  href:'/purchase-order-generator',    cat:'docs' },
  { iconType:'letterhead',   title:'Letterhead Generator', desc:'Design business letterheads',             href:'/letterhead-generator',        cat:'docs' },
  { iconType:'resume',       title:'Resume Builder',       desc:'Build professional resumes',              href:'/resume-builder',              cat:'docs' },
  { iconType:'biz-card',     title:'Business Card Maker',  desc:'Design business cards',                   href:'/business-card-generator',     cat:'docs' },
  { iconType:'quote-doc',    title:'Price Quote Generator',desc:'Create professional price quotes',         href:'/price-quote-generator',       cat:'docs' },

  // === Utility ===
  { iconType:'pdf-pages',    title:'PDF Page Counter',     desc:'Count pages in PDF files',                href:'/pdf-page-counter',            cat:'util' },
  { iconType:'meta-gen',     title:'Meta Description',     desc:'Generate SEO meta descriptions',          href:'/meta-description-generator',  cat:'dev' },
  { iconType:'yt-thumb',     title:'YouTube Thumbnail',    desc:'Download YouTube thumbnails',             href:'/youtube-thumbnail',           cat:'util' },

  // === AI Tools ===
  { iconType:'ai', title:'AI Summarizer',             desc:'Summarize long text instantly',        href:'/ai-summarizer',       cat:'ai' },
  { iconType:'ai', title:'AI Grammar Checker',        desc:'Fix grammar and spelling errors',      href:'/ai-grammar',          cat:'ai' },
  { iconType:'ai', title:'AI Paraphraser',            desc:'Rewrite text in different styles',     href:'/ai-paraphraser',      cat:'ai' },
  { iconType:'ai', title:'AI Resume Improver',        desc:'Enhance resume bullet points',         href:'/ai-resume-improver',  cat:'ai' },
  { iconType:'ai', title:'AI Cover Letter Generator', desc:'Create professional cover letters',    href:'/ai-cover-letter',     cat:'ai' },
  { iconType:'ai', title:'AI Email Writer',           desc:'Write professional emails',            href:'/ai-email-writer',     cat:'ai' },
  { iconType:'ai', title:'AI Translator',             desc:'Translate to 30+ languages',           href:'/ai-translator',       cat:'ai' },
  { iconType:'ai', title:'AI Tone Changer',           desc:'Adjust text tone (formal, casual)',    href:'/ai-tone-changer',     cat:'ai' },
]

export const COMING: ComingTool[] = [
  { icon:'📄', title:'PDF to Word',         desc:'Convert PDF to editable Word' },
  { icon:'🖼', title:'Image Compressor',    desc:'Reduce image size instantly' },
  { icon:'✂️', title:'Background Remover',  desc:'AI removes image backgrounds' },
  { icon:'🌐', title:'IP Address Lookup',   desc:'Find IP location info' },
  { icon:'📧', title:'Email Validator',     desc:'Validate email addresses' },
  { icon:'🔑', title:'MD5 Hash Generator',  desc:'Generate MD5 hashes instantly' },
  { icon:'📋', title:'HTML Formatter',      desc:'Beautify HTML code' },
]

export const CATS: Category[] = [
  { id:'all',       label:'All Tools',    iconType:'all' },
  { id:'pdf',       label:'PDF',          iconType:'pdf' },
  { id:'image',     label:'Image',        iconType:'image' },
  { id:'text',      label:'Text',         iconType:'text' },
  { id:'calc',      label:'Calculators',  iconType:'calc' },
  { id:'dev',       label:'Developer',    iconType:'dev' },
  { id:'color',     label:'Colour',       iconType:'color' },
  { id:'docs',      label:'Documents',    iconType:'docs' },
  { id:'specialty', label:'Specialty',    iconType:'specialty' },
  { id:'ocr',       label:'OCR',          iconType:'ocr' },
  { id:'ai',        label:'AI Tools',     iconType:'ai' },
  { id:'util',      label:'Utility',      iconType:'util' },
  { id:'security',  label:'Security',     iconType:'security' },
  { id:'qr',        label:'QR Code',      iconType:'qr' },
  { id:'fun',       label:'Fun & Random', iconType:'fun' },
]

export function getToolsByCategory(catId: string): Tool[] {
  if (catId === 'all') return TOOLS
  return TOOLS.filter(t => t.cat === catId)
}

export function getCategory(catId: string): Category | undefined {
  return CATS.find(c => c.id === catId)
}
