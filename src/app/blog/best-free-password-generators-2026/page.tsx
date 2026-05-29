import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }

const GENERATORS: { name: string; clientSide: string; specialChars: string; length: string; passphrase: string; free: string }[] = [
  { name:'ConvertDox', clientSide:'Yes', specialChars:'Yes', length:'4–128', passphrase:'Yes', free:'Yes' },
  { name:'Browser built-in', clientSide:'Yes', specialChars:'Yes', length:'Fixed', passphrase:'No', free:'Yes' },
  { name:'KeePass / KeePassXC', clientSide:'Yes', specialChars:'Yes', length:'1–999', passphrase:'Yes', free:'Yes' },
  { name:'Bitwarden', clientSide:'Yes', specialChars:'Yes', length:'5–128', passphrase:'Yes', free:'Yes' },
  { name:'1Password free tier', clientSide:'Yes', specialChars:'Yes', length:'8–100', passphrase:'Yes', free:'Limited' },
  { name:'Proton Pass', clientSide:'Yes', specialChars:'Yes', length:'4–64', passphrase:'Yes', free:'Yes' },
  { name:'NordPass', clientSide:'Yes', specialChars:'Yes', length:'8–60', passphrase:'Yes', free:'Limited' },
  { name:'LastPass generator', clientSide:'Yes', specialChars:'Yes', length:'4–99', passphrase:'No', free:'Yes' },
  { name:'Dashlane', clientSide:'Yes', specialChars:'Yes', length:'4–40', passphrase:'No', free:'Limited' },
  { name:'Random.org', clientSide:'No', specialChars:'Limited', length:'1–24', passphrase:'No', free:'Yes' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'How long should a password be in 2026?', a:'Aim for at least 16 characters for important accounts. For less critical accounts, 12 is the practical minimum. Modern GPU-based attacks can brute-force shorter passwords in hours.' },
  { q:'Should I use a passphrase or a random string?', a:'Both work if they\'re long enough. A 4-word passphrase (e.g. "harbour-piano-violet-fold") has roughly the same entropy as a 12-character random string but is easier to type when needed. For accounts you never type by hand, random strings are fine.' },
  { q:'Are browser-generated passwords safe?', a:'Yes. Chrome, Safari, and Firefox all use cryptographically secure random number generators and sync passwords end-to-end encrypted. The downside is portability — if you switch ecosystems, exporting can be painful.' },
  { q:'Do I really need a unique password for every site?', a:'Yes. The single biggest risk is credential stuffing — attackers take leaked credentials from one breach and try them on hundreds of other sites. A unique password per account contains the blast radius to one service.' },
  { q:'Is two-factor authentication still worth it if I have strong passwords?', a:'Absolutely. 2FA stops the vast majority of account takeovers even when your password leaks. Use an authenticator app (or a hardware key) rather than SMS where possible.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <article style={{ maxWidth:'780px',margin:'0 auto',padding:'48px 24px' }}>
        <a href="/blog" style={{ color:'#E85D04',fontSize:'14px',fontWeight:600,textDecoration:'none' }}>← Back to Blog</a>

        <div style={{ display:'flex',gap:'12px',alignItems:'center',marginTop:'24px',marginBottom:'18px',flexWrap:'wrap' }}>
          <span style={{ background:'#FFF7ED',color:'#C2410C',fontSize:'11.5px',fontWeight:700,padding:'4px 10px',borderRadius:'999px',textTransform:'uppercase',letterSpacing:'0.5px' }}>Security</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>10 min read</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>•</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>Jan 2026</span>
        </div>

        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 20px' }}>
          10 Best Free Password Generators in 2026 (Security Expert Picks)
        </h1>

        <p style={{ fontSize:'18px',color:'#64748b',lineHeight:'1.7',paddingBottom:'24px',borderBottom:'1.5px solid #e2e8f0',marginBottom:'32px' }}>
          The strongest password is one a human will never type, never see, and never remember. Here are the ten best free tools to make that happen in 2026 — ranked on the things that actually matter.
        </p>

        <h2 style={H2}>Why You Need a Strong Password in 2026</h2>
        <p style={P}>The 2025 Verizon Data Breach Investigations Report attributed more than 80% of hacking-related breaches to stolen or weak credentials. The most-used passwords still include &ldquo;123456&rdquo;, &ldquo;password&rdquo;, and the user&apos;s own name with a digit appended. Attackers don&apos;t need exotic exploits when a dictionary attack works.</p>
        <p style={P}>On modern GPU hardware, an 8-character lowercase password falls in seconds. Add digits and uppercase letters and you get to a few hours. The only reliable defence is length, randomness, and a unique password per account.</p>

        <h2 style={H2}>What Makes a Strong Password?</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Length:</strong> 16+ characters whenever the site allows it. Length matters more than character variety.</li>
          <li><strong style={STRONG}>Character variety:</strong> mix lowercase, uppercase, digits, and symbols. Each extra class roughly doubles the search space.</li>
          <li><strong style={STRONG}>Randomness:</strong> generated by a cryptographically secure random source — not a memorable pattern.</li>
          <li><strong style={STRONG}>No dictionary words:</strong> attackers run dictionary attacks first. <em>tr0ub4dor</em> falls almost as fast as <em>troubadour</em>.</li>
          <li><strong style={STRONG}>Uniqueness:</strong> never reused across sites. One leak shouldn&apos;t unlock anything else.</li>
        </ul>

        <h2 style={H2}>What to Look For in a Password Generator</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Client-side processing:</strong> the password should be created in your browser, never sent over the network.</li>
          <li><strong style={STRONG}>No logging:</strong> the tool should not store, transmit, or analyse the passwords it generates.</li>
          <li><strong style={STRONG}>Customization:</strong> length, character classes, exclusions for ambiguous characters (0/O, 1/l).</li>
          <li><strong style={STRONG}>Open source where possible:</strong> auditable code is verifiable code.</li>
          <li><strong style={STRONG}>Modern crypto:</strong> the underlying RNG should be the platform&apos;s secure source (e.g. <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>window.crypto.getRandomValues</code>), not <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>Math.random()</code>.</li>
        </ul>

        <h2 style={H2}>The 10 Best Free Password Generators</h2>

        <h3 style={H3}>1. ConvertDox Password Generator</h3>
        <p style={P}>The <a href="https://convertdox.com/password-generator" style={A}>ConvertDox Password Generator</a> tops the list because it nails the fundamentals: cryptographically secure RNG, fully client-side, no logging, length up to 128 characters, and both random-string and passphrase modes. No account, no upsell, no ads on the generation flow. The result lands in your clipboard with one click.</p>

        <h3 style={H3}>2. Browser built-in generators (Chrome, Safari, Firefox)</h3>
        <p style={P}>Every major browser now offers strong-password suggestions during sign-up. They&apos;re excellent for daily use because they integrate with the browser&apos;s password manager and sync across devices. The limitation is portability — exporting from one ecosystem to another is awkward.</p>

        <h3 style={H3}>3. KeePass / KeePassXC</h3>
        <p style={P}>The open-source veteran. The generator is highly configurable (length, pattern, charset, exclusions) and runs entirely offline. Pair it with a self-hosted vault file and you have full control of every byte.</p>

        <h3 style={H3}>4. Bitwarden</h3>
        <p style={P}>Open source, audited, with free generator and vault across platforms. The web vault includes a generator with passphrase support. Trusted by infosec professionals.</p>

        <h3 style={H3}>5. 1Password (free tier)</h3>
        <p style={P}>The generator is excellent and free to use; the full vault has a paid subscription. Worth installing the browser extension just for the generator alone.</p>

        <h3 style={H3}>6. Proton Pass</h3>
        <p style={P}>From the team behind ProtonMail. Privacy-first stance, Swiss jurisdiction, generates passwords and passphrases entirely client-side.</p>

        <h3 style={H3}>7. NordPass generator</h3>
        <p style={P}>The standalone web generator is free and customisable. The paired vault is a paid product.</p>

        <h3 style={H3}>8. LastPass standalone generator</h3>
        <p style={P}>Despite past breaches of the vault product, the standalone generator (which doesn&apos;t store anything) remains functional. Use carefully and never log in to old accounts on the same device.</p>

        <h3 style={H3}>9. Dashlane generator</h3>
        <p style={P}>Free standalone generator with a clean UI. Length cap is lower (40 chars) than competitors but plenty for everyday use.</p>

        <h3 style={H3}>10. Random.org password generator</h3>
        <p style={P}>Generates from atmospheric noise (true randomness), but the password is created server-side — which is exactly what you don&apos;t want for anything you care about. Useful for non-secret use cases like raffle codes.</p>

        <h2 style={H2}>Comparison Table</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Generator</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Client-side</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Symbols</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Length</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Passphrase</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Free?</th>
              </tr>
            </thead>
            <tbody>
              {GENERATORS.map((g,i) => (
                <tr key={g.name} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{g.name}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{g.clientSide}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{g.specialChars}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{g.length}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{g.passphrase}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{g.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>Password Security Best Practices</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Use a password manager.</strong> Pick one and stick with it — Bitwarden, 1Password, Proton Pass, KeePass. The exact tool matters less than using one consistently.</li>
          <li><strong style={STRONG}>Unique password per site.</strong> Even your throwaway forum logins. Credential stuffing is automated and relentless.</li>
          <li><strong style={STRONG}>Turn on 2FA everywhere it&apos;s offered.</strong> Authenticator app or hardware key, never SMS if you can avoid it.</li>
          <li><strong style={STRONG}>Check breach status.</strong> <a href="https://haveibeenpwned.com" style={A}>haveibeenpwned.com</a> tells you if your email appears in known leaks. Rotate any affected passwords immediately.</li>
          <li><strong style={STRONG}>Use passkeys when available.</strong> They&apos;re phishing-resistant and remove the password from the threat model entirely.</li>
        </ul>

        <h2 style={H2}>How to Use the ConvertDox Password Generator</h2>
        <ol style={UL}>
          <li>Open <a href="https://convertdox.com/password-generator" style={A}>convertdox.com/password-generator</a>.</li>
          <li>Set length to <strong style={STRONG}>16 or higher</strong>.</li>
          <li>Tick all character classes (uppercase, lowercase, digits, symbols) unless the target site forbids one.</li>
          <li>Click <strong style={STRONG}>Generate</strong>. Click <strong style={STRONG}>Copy</strong>.</li>
          <li>Paste into your password manager — never into a text file or note.</li>
        </ol>

        <h2 style={H2}>Common Password Mistakes to Avoid</h2>
        <ul style={UL}>
          <li>Adding <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>!</code> or <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>2024</code> to an existing password to &ldquo;rotate&rdquo; it.</li>
          <li>Using the same base password with site-specific suffixes (Amazon123, Netflix123).</li>
          <li>Storing passwords in browser autocomplete <em>without</em> the browser&apos;s password manager.</li>
          <li>Texting or emailing yourself a password.</li>
          <li>Reusing a memorable passphrase across more than one account.</li>
        </ul>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>🔒</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Generate a Strong Password Now</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Cryptographically secure, fully client-side, free forever.</p>
          <a href="/password-generator" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open Password Generator →</a>
        </div>

        {/* Related */}
        <div style={{ marginTop:'48px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#0F2A4A',marginBottom:'14px' }}>Related Articles</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <a href="/blog/what-is-json-formatter" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Developer Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>What Is a JSON Formatter and Why Every Developer Needs One</div>
            </a>
            <a href="/blog/how-to-convert-images-to-base64" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Developer Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>How to Convert Images to Base64</div>
            </a>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': '10 Best Free Password Generators in 2026 (Security Expert Picks)',
        'description': 'Security expert picks for the best free password generators in 2026 — client-side, open source, and built for real-world threats.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}
