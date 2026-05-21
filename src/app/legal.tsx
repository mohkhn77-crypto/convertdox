/*
  ConvertDox — Legal Hub
  PUT IN: src/app/legal/page.tsx
  URL: convertdox.com/legal
  
  Contains all 6 legal sections as tabs:
  1. Privacy Policy
  2. Terms of Service
  3. File Security & Auto-Delete
  4. Copyright & DMCA
  5. Acceptable Use Policy
  6. AI Usage & Content Disclaimer
*/
'use client'
import { useState } from 'react'

const Logo = () => (
  <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
      <polygon points="20,20 24,22 20,24" fill="white"/>
    </svg>
  </div>
)

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <Logo/>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </a>
      <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← Back to Tools</a>
    </div>
  </nav>
)

const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'40px 24px 28px' }}>
    <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'40px',marginBottom:'32px' }}>
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px' }}>
            <div style={{ width:'30px',height:'30px',background:'#E85D04',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px' }}>📄</div>
            <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
          </div>
          <p style={{ fontSize:'13.5px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7',maxWidth:'260px',margin:0 }}>Every online tool you need. Free, fast, and private.</p>
        </div>
        {[
          { title:'Legal', links:[{l:'Privacy Policy',h:'/legal#privacy'},{l:'Terms of Service',h:'/legal#terms'},{l:'File Security',h:'/legal#security'},{l:'DMCA Policy',h:'/legal#dmca'},{l:'Acceptable Use',h:'/legal#aup'},{l:'AI Disclaimer',h:'/legal#ai'}] },
          { title:'Company', links:[{l:'About',h:'/about'},{l:'Contact',h:'/contact'},{l:'All Tools',h:'/'},{l:'Support',h:'/contact'}] },
          { title:'Popular Tools', links:[{l:'Word Counter',h:'/word-counter'},{l:'QR Generator',h:'/qr-generator'},{l:'BMI Calculator',h:'/bmi-calculator'},{l:'Password Gen',h:'/password-generator'}] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'14px' }}>{col.title}</div>
            {col.links.map(link => (
              <a key={link.l} href={link.h} style={{ display:'block',fontSize:'13.5px',color:'rgba(255,255,255,0.4)',textDecoration:'none',marginBottom:'8px' }}>{link.l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px' }}>
        <p style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
        <div style={{ display:'flex',gap:'16px' }}>
          {[['Privacy','/legal#privacy'],['Terms','/legal#terms'],['Contact','/contact'],['DMCA','/legal#dmca']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',textDecoration:'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

type Tab = 'privacy'|'terms'|'security'|'dmca'|'aup'|'ai'

const TABS = [
  { id:'privacy',  icon:'🔒', label:'Privacy Policy' },
  { id:'terms',    icon:'📋', label:'Terms of Service' },
  { id:'security', icon:'🛡', label:'File Security' },
  { id:'dmca',     icon:'©',  label:'Copyright & DMCA' },
  { id:'aup',      icon:'⚖️', label:'Acceptable Use' },
  { id:'ai',       icon:'🤖', label:'AI Disclaimer' },
] as const

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'32px 0 12px',paddingTop:'8px',borderTop:'1px solid #f1f5f9' }}>{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:700,color:'#0F2A4A',margin:'20px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.8',margin:'0 0 12px' }}>{children}</p>
)
const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.8',marginBottom:'6px' }}>{children}</li>
)
const Notice = ({ children, type='info' }: { children: React.ReactNode; type?: 'info'|'warn'|'success' }) => {
  const colors = { info:['#EFF6FF','#BFDBFE','#1D4ED8'], warn:['#FFF7ED','#FED7AA','#C2410C'], success:['#F0FDF4','#BBF7D0','#166534'] }
  const [bg,border,text] = colors[type]
  return (
    <div style={{ background:bg,border:`1.5px solid ${border}`,borderRadius:'12px',padding:'14px 18px',margin:'16px 0',fontSize:'14px',color:text,fontWeight:500,lineHeight:'1.6' }}>
      {children}
    </div>
  )
}

export default function LegalPage() {
  const [active, setActive] = useState<Tab>('privacy')

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px',textAlign:'center' }}>
        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:800,color:'white',margin:'0 0 12px' }}>
          Legal & Privacy Centre
        </h1>
        <p style={{ fontSize:'16px',color:'rgba(255,255,255,0.65)',maxWidth:'540px',margin:'0 auto' }}>
          ConvertDox is built with privacy and security at its core. Your files are never permanently stored. Read our full policies below.
        </p>
        <div style={{ display:'flex',justifyContent:'center',gap:'16px',flexWrap:'wrap',marginTop:'20px' }}>
          {['🔒 No Permanent Storage','🛡 HTTPS Encrypted','🗑 Auto-Delete Policy','✅ GDPR Compliant'].map(t => (
            <span key={t} style={{ background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'6px 16px',fontSize:'13px',color:'rgba(255,255,255,0.9)' }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize:'12px',color:'rgba(255,255,255,0.4)',marginTop:'16px' }}>Last updated: May 2025</p>
      </div>

      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'240px 1fr',gap:'28px',alignItems:'start' }}>

          {/* Sidebar tabs */}
          <div style={{ position:'sticky',top:'80px' }}>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActive(tab.id)}
                  style={{ width:'100%',padding:'13px 16px',border:'none',borderBottom:'1px solid #f1f5f9',background:active===tab.id?'#0F2A4A':'white',fontFamily:'inherit',fontSize:'13.5px',fontWeight:600,color:active===tab.id?'white':'#64748b',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:'10px',transition:'all 0.15s' }}>
                  <span style={{ fontSize:'16px' }}>{tab.icon}</span>
                  {tab.label}
                  {active===tab.id && <span style={{ marginLeft:'auto',color:'#F48C42' }}>→</span>}
                </button>
              ))}
            </div>
            <div style={{ marginTop:'16px',background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'14px 16px' }}>
              <div style={{ fontSize:'13px',fontWeight:700,color:'#166534',marginBottom:'6px' }}>📧 Questions?</div>
              <p style={{ fontSize:'12.5px',color:'#166534',margin:0,lineHeight:'1.6' }}>Email us at<br/><a href="mailto:legal@convertdox.com" style={{ color:'#16A34A' }}>legal@convertdox.com</a></p>
            </div>
          </div>

          {/* Content */}
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'32px 36px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)',minHeight:'600px' }}>

            {/* ── PRIVACY POLICY ── */}
            {active === 'privacy' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>🔒</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Privacy Policy</h1>
                </div>
                <P>This Privacy Policy explains how ConvertDox ("we", "our", or "us") collects, uses, and protects your information when you use our website at convertdox.com.</P>

                <Notice type="success">✅ ConvertDox does not permanently store uploaded files. All files processed through our platform are automatically deleted after processing and are never retained on our servers.</Notice>

                <H2>1. Information We Collect</H2>
                <H3>1.1 Information You Provide</H3>
                <P>When you use our tools, we may collect:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Files you upload for conversion or processing (temporarily — see Section 3)</Li>
                  <Li>Text or data you input into our tools</Li>
                  <Li>Name and email address if you create an account or contact us</Li>
                </ul>

                <H3>1.2 Automatically Collected Information</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>IP Address:</strong> Collected for abuse prevention, security monitoring, and rate limiting purposes</Li>
                  <Li><strong>Browser & Device:</strong> Type, version, and operating system for compatibility purposes</Li>
                  <Li><strong>Usage Data:</strong> Pages visited, tools used, time spent, and interaction data</Li>
                  <Li><strong>Cookies:</strong> Session, preference, and analytics cookies (see Section 4)</Li>
                  <Li><strong>Log Data:</strong> Server logs including timestamps, tool usage, and error information</Li>
                </ul>

                <H2>2. How We Use Your Information</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>To provide and operate our tools and services</Li>
                  <Li>To process file conversions and return results to you</Li>
                  <Li>To detect, prevent, and respond to abuse, fraud, or illegal activity</Li>
                  <Li>To improve our tools and user experience</Li>
                  <Li>To send service-related communications (if you have an account)</Li>
                  <Li>To comply with legal obligations</Li>
                </ul>

                <H2>3. File Uploads & Temporary Processing</H2>
                <Notice type="warn">⚠️ Security Disclosure: Uploaded files are processed temporarily in isolated environments and automatically deleted after processing. Files are NOT permanently stored on our servers. No employee manually reviews uploaded files unless required for abuse investigation.</Notice>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Files are encrypted during transfer using HTTPS/TLS</Li>
                  <Li>Files are processed in isolated, temporary storage environments</Li>
                  <Li>Files are automatically deleted immediately after processing or within a maximum of 24 hours</Li>
                  <Li>No file content is used for AI training or marketing purposes</Li>
                </ul>

                <H2>4. Cookies & Tracking</H2>
                <H3>4.1 Types of Cookies We Use</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Essential Cookies:</strong> Required for the website to function (session management, security)</Li>
                  <Li><strong>Analytics Cookies:</strong> Google Analytics to understand usage patterns (anonymised)</Li>
                  <Li><strong>Advertising Cookies:</strong> Google AdSense to display relevant advertisements</Li>
                  <Li><strong>Preference Cookies:</strong> Remember your settings and preferences</Li>
                </ul>
                <P>You can manage cookie preferences through our cookie consent banner or your browser settings. Disabling certain cookies may affect functionality.</P>

                <H2>5. Third-Party Services</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Cloudflare:</strong> CDN, DDoS protection, and security. May process IP addresses. <a href="https://cloudflare.com/privacy" style={{ color:'#E85D04' }}>Cloudflare Privacy Policy</a></Li>
                  <Li><strong>Vercel:</strong> Website hosting and deployment. <a href="https://vercel.com/legal/privacy-policy" style={{ color:'#E85D04' }}>Vercel Privacy Policy</a></Li>
                  <Li><strong>Supabase:</strong> Database and authentication (when using account features). <a href="https://supabase.com/privacy" style={{ color:'#E85D04' }}>Supabase Privacy Policy</a></Li>
                  <Li><strong>Google Analytics:</strong> Website analytics. Data may be transferred internationally. <a href="https://policies.google.com/privacy" style={{ color:'#E85D04' }}>Google Privacy Policy</a></Li>
                  <Li><strong>Google AdSense:</strong> Advertising service. Uses cookies to personalise ads. You may opt out via <a href="https://adssettings.google.com" style={{ color:'#E85D04' }}>Google Ad Settings</a></Li>
                </ul>

                <H2>6. Browser Storage</H2>
                <P>Some of our tools use your browser's local storage (localStorage) to save your preferences and settings locally on your device. This data never leaves your device and is not transmitted to our servers. You can clear this data through your browser settings.</P>

                <H2>7. Data Retention</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Uploaded files:</strong> Deleted immediately after processing (maximum 24 hours)</Li>
                  <Li><strong>Account data:</strong> Retained until account deletion request</Li>
                  <Li><strong>Server logs:</strong> Retained for 30–90 days for security and abuse prevention</Li>
                  <Li><strong>Analytics data:</strong> Retained per Google Analytics retention settings (default 26 months)</Li>
                </ul>

                <H2>8. Your Rights</H2>
                <P>Depending on your location, you may have the following rights:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Access:</strong> Request a copy of the personal data we hold about you</Li>
                  <Li><strong>Correction:</strong> Request correction of inaccurate data</Li>
                  <Li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")</Li>
                  <Li><strong>Portability:</strong> Receive your data in a portable format</Li>
                  <Li><strong>Objection:</strong> Object to processing of your data for certain purposes</Li>
                  <Li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</Li>
                </ul>
                <P>To exercise these rights, email us at <a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a></P>

                <H2>9. California Privacy Rights (CCPA)</H2>
                <P>California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of the sale of personal information. <strong>We do not sell personal information.</strong></P>

                <H2>10. International Transfers</H2>
                <P>ConvertDox operates globally. Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers in accordance with applicable data protection laws.</P>

                <H2>11. Children's Privacy</H2>
                <P>Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child, please contact us immediately at <a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a></P>

                <H2>12. Changes to This Policy</H2>
                <P>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.</P>

                <H2>13. Contact Us</H2>
                <P>For privacy-related questions, contact us at:<br/><a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a><br/><a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a></P>
              </div>
            )}

            {/* ── TERMS OF SERVICE ── */}
            {active === 'terms' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>📋</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Terms of Service</h1>
                </div>
                <P>By using ConvertDox ("the Service"), you agree to these Terms of Service. Please read them carefully before using our platform.</P>

                <Notice type="warn">⚠️ Users are solely responsible for the files and content they upload, convert, generate, or process using this platform.</Notice>

                <H2>1. Acceptance of Terms</H2>
                <P>By accessing or using ConvertDox, you confirm that you are at least 13 years old, have the legal authority to enter into this agreement, and agree to comply with these Terms. If you do not agree, do not use the Service.</P>

                <H2>2. Description of Service</H2>
                <P>ConvertDox provides free online tools for file conversion, text processing, calculation, code formatting, and other utility purposes. Some features may require account registration. We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.</P>

                <H2>3. Acceptable Use</H2>
                <P>You agree to use the Service only for lawful purposes and in accordance with these Terms. You must NOT:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Upload, process, or transmit files containing malware, viruses, or malicious code</Li>
                  <Li>Upload or distribute copyrighted material without authorisation (piracy)</Li>
                  <Li>Upload illegal content including but not limited to CSAM, terrorism-related material, or content that violates any law</Li>
                  <Li>Use the Service for hacking, phishing, identity theft, or credential harvesting</Li>
                  <Li>Use automated tools, bots, or scripts to abuse the Service or exceed reasonable usage limits</Li>
                  <Li>Attempt to circumvent rate limits, security measures, or access controls</Li>
                  <Li>Impersonate any person, entity, or ConvertDox itself</Li>
                  <Li>Use AI tools to generate harmful, deceptive, or illegal content</Li>
                  <Li>Engage in any activity that could damage, disable, or impair the Service</Li>
                  <Li>Scrape, harvest, or collect data from the Service without written permission</Li>
                </ul>

                <H2>4. User Responsibility for Content</H2>
                <P>You are solely responsible for all files, text, and content you upload or process. ConvertDox does not monitor uploaded content in real-time but reserves the right to investigate and remove content that violates these Terms.</P>

                <H2>5. Intellectual Property</H2>
                <H3>5.1 ConvertDox IP</H3>
                <P>All content on this website, including the design, code, logos, tools, and documentation, is the property of ConvertDox and is protected by copyright, trademark, and other intellectual property laws.</P>
                <H3>5.2 Your Content</H3>
                <P>You retain ownership of all content you upload. By uploading content, you grant ConvertDox a limited, non-exclusive licence to process your content solely for the purpose of providing the requested service. This licence terminates when your files are deleted.</P>

                <H2>6. AI-Generated Content</H2>
                <P>AI-generated content is provided for assistance and informational purposes only. ConvertDox makes no guarantees about the accuracy, completeness, or suitability of AI-generated outputs. You are responsible for reviewing and verifying all AI-generated content before use.</P>

                <H2>7. Service Availability</H2>
                <P>We strive to maintain high availability but do not guarantee uninterrupted access. We may perform maintenance, upgrades, or emergency fixes that temporarily affect availability. We are not liable for losses caused by service interruptions.</P>

                <H2>8. Limitation of Liability</H2>
                <Notice type="info">📌 To the maximum extent permitted by law, ConvertDox shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</Notice>
                <P>Our total liability to you for any claim arising from use of the Service shall not exceed the amount you paid to us in the 12 months preceding the claim, or $100, whichever is greater.</P>

                <H2>9. Disclaimer of Warranties</H2>
                <P>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR CONTINUOUSLY AVAILABLE.</P>

                <H2>10. Account Suspension & Termination</H2>
                <P>We reserve the right to suspend or terminate accounts and access to the Service immediately if we determine, in our sole discretion, that you have violated these Terms. No refund of any paid subscriptions will be provided in cases of termination for violations.</P>

                <H2>11. Governing Law</H2>
                <P>These Terms are governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.</P>

                <H2>12. Changes to Terms</H2>
                <P>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance. We will provide notice of material changes through the website.</P>

                <H2>13. Contact</H2>
                <P>For questions about these Terms:<br/><a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a></P>
              </div>
            )}

            {/* ── FILE SECURITY ── */}
            {active === 'security' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>🛡</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>File Security & Auto-Delete Policy</h1>
                </div>
                <P>At ConvertDox, your privacy and security are our top priorities. This page explains exactly how we handle your files and data.</P>

                <Notice type="success">🛡 All uploaded and converted files are automatically deleted after processing and are NEVER permanently stored on our servers or any third-party storage service.</Notice>

                {/* Trust cards */}
                <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',margin:'24px 0' }}>
                  {[
                    { icon:'🔐', title:'Secure Upload', desc:'All file transfers are encrypted using HTTPS/TLS 1.3' },
                    { icon:'⏱', title:'Temporary Storage', desc:'Files exist only during processing — never permanently saved' },
                    { icon:'🗑', title:'Auto Deletion', desc:'Files are automatically deleted immediately after conversion' },
                    { icon:'🔒', title:'Privacy Protection', desc:'No employee accesses your file content without legal obligation' },
                    { icon:'🔑', title:'Encrypted Processing', desc:'Files are processed in isolated, encrypted environments' },
                    { icon:'☁️', title:'Secure Infrastructure', desc:'Hosted on enterprise-grade cloud infrastructure' },
                  ].map(c => (
                    <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px',textAlign:'center' }}>
                      <div style={{ fontSize:'28px',marginBottom:'8px' }}>{c.icon}</div>
                      <div style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                      <div style={{ fontSize:'12px',color:'#94a3b8',lineHeight:'1.5' }}>{c.desc}</div>
                    </div>
                  ))}
                </div>

                <H2>1. File Upload Security</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>All file uploads are transmitted over HTTPS with TLS 1.3 encryption</Li>
                  <Li>Files are validated for type and size before processing begins</Li>
                  <Li>Malware scanning is applied to detect known threats before processing</Li>
                  <Li>File size limits are enforced to prevent resource abuse</Li>
                  <Li>Rate limiting is applied to prevent automated abuse</Li>
                </ul>

                <H2>2. Temporary Storage</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Uploaded files are stored in isolated, temporary environments only</Li>
                  <Li>Files are processed in memory where possible (never written to persistent disk)</Li>
                  <Li>Temporary storage is encrypted at rest</Li>
                  <Li>Files are completely segregated — no user's files can be accessed by another user</Li>
                  <Li>No file content is indexed, searchable, or accessible to staff</Li>
                </ul>

                <H2>3. Auto-Deletion Policy</H2>
                <Notice type="warn">🗑 Auto-deletion is non-negotiable and cannot be disabled — not even by staff.</Notice>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Immediately:</strong> Files are deleted as soon as the conversion/processing is complete and the result is delivered</Li>
                  <Li><strong>Maximum 24 hours:</strong> Any temporary files not immediately deleted are purged within 24 hours by automated cleanup jobs</Li>
                  <Li><strong>No exceptions:</strong> Files are never retained for training, analysis, marketing, or any other purpose</Li>
                  <Li><strong>Permanent:</strong> Deletion is permanent — files cannot be recovered once deleted</Li>
                </ul>

                <H2>4. No Employee Access</H2>
                <P>No ConvertDox employee or contractor reviews, accesses, or examines the content of uploaded files unless:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Required by a valid legal order (subpoena, court order)</Li>
                  <Li>Necessary to investigate reported abuse or illegal activity</Li>
                  <Li>Required to resolve a serious technical issue causing data loss</Li>
                </ul>

                <H2>5. Abuse Monitoring</H2>
                <P>We monitor usage patterns — not file content — to detect and prevent abuse:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Upload frequency and volume monitoring</Li>
                  <Li>IP-based rate limiting and blocking</Li>
                  <Li>Automated detection of suspicious usage patterns</Li>
                  <Li>File type and size validation to prevent abuse</Li>
                </ul>

                <H2>6. Infrastructure Security</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Cloudflare:</strong> DDoS protection, WAF (Web Application Firewall), bot protection</Li>
                  <Li><strong>Vercel:</strong> Edge hosting with global CDN, automatic HTTPS</Li>
                  <Li><strong>Regular security audits:</strong> Infrastructure reviewed for vulnerabilities</Li>
                  <Li><strong>Dependency monitoring:</strong> Third-party packages monitored for security issues</Li>
                </ul>

                <H2>7. Data Breach Response</H2>
                <P>In the unlikely event of a data breach affecting personal information, we will notify affected users within 72 hours of discovery, in compliance with GDPR and applicable data protection laws.</P>

                <H2>8. Reporting Security Issues</H2>
                <P>If you discover a security vulnerability, please report it responsibly to:<br/><a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a></P>
                <P>We appreciate responsible disclosure and will acknowledge security reports within 48 hours.</P>
              </div>
            )}

            {/* ── DMCA ── */}
            {active === 'dmca' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>©</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Copyright & DMCA Policy</h1>
                </div>
                <P>ConvertDox respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA) and applicable copyright laws worldwide.</P>

                <Notice type="warn">❌ ConvertDox strictly prohibits the use of our platform for copyright infringement, piracy, or unauthorised distribution of copyrighted materials.</Notice>

                <H2>1. Prohibited Copyright Activities</H2>
                <P>The following activities are strictly prohibited on ConvertDox:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Uploading, converting, or distributing copyrighted files without authorisation from the rights holder</Li>
                  <Li>Using our tools to circumvent digital rights management (DRM) protections</Li>
                  <Li>Converting copyrighted music, films, books, software, or other media for piracy purposes</Li>
                  <Li>Sharing or distributing converted copyrighted content</Li>
                  <Li>Using our AI tools to reproduce substantial portions of copyrighted works</Li>
                </ul>

                <H2>2. DMCA Takedown Process</H2>
                <P>If you believe your copyrighted work has been infringed upon through our platform, you may submit a DMCA takedown notice to:</P>
                <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px 20px',margin:'12px 0' }}>
                  <p style={{ margin:0,fontSize:'15px',color:'#0F2A4A',fontWeight:500 }}>
                    📧 DMCA Agent: <a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a><br/>
                    📧 General: <a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a>
                  </p>
                </div>

                <H3>Your DMCA Notice Must Include:</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Your full legal name and contact information (email, address, phone)</Li>
                  <Li>A description of the copyrighted work you claim has been infringed</Li>
                  <Li>The specific URL or location on our platform where the infringement occurred</Li>
                  <Li>A statement that you have a good-faith belief the use is not authorised</Li>
                  <Li>A statement under penalty of perjury that you are the rights holder or authorised agent</Li>
                  <Li>Your physical or electronic signature</Li>
                </ul>

                <H2>3. Our Response Process</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>We acknowledge valid DMCA notices within 48 hours</Li>
                  <Li>We investigate and remove infringing content as expeditiously as possible</Li>
                  <Li>We notify the alleged infringer of the takedown</Li>
                  <Li>Users may submit a counter-notification if they believe content was removed in error</Li>
                </ul>

                <H2>4. Counter-Notification</H2>
                <P>If you believe your content was removed in error, you may submit a counter-notification to <a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a>. Counter-notifications must include:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Your identification and contact information</Li>
                  <Li>Identification of the removed content and its location</Li>
                  <Li>A statement under penalty of perjury that the content was removed in error</Li>
                  <Li>Consent to jurisdiction of your local federal court</Li>
                  <Li>Your signature</Li>
                </ul>

                <H2>5. Repeat Infringer Policy</H2>
                <Notice type="warn">⚠️ ConvertDox operates a strict repeat infringer policy. Users who repeatedly infringe copyright will have their accounts terminated and access permanently blocked.</Notice>

                <H2>6. Abuse Reporting</H2>
                <P>To report copyright infringement or other abuse on our platform, contact:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Copyright: <a href="mailto:legal@convertdox.com" style={{ color:'#E85D04' }}>legal@convertdox.com</a></Li>
                  <Li>General Abuse: <a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a></Li>
                </ul>
              </div>
            )}

            {/* ── AUP ── */}
            {active === 'aup' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>⚖️</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Acceptable Use Policy</h1>
                </div>
                <P>This Acceptable Use Policy (AUP) defines permitted and prohibited uses of ConvertDox. Violations may result in immediate account suspension and legal action.</P>

                <Notice type="info">📌 ConvertDox is provided for legitimate, lawful purposes only. Any misuse of our platform is strictly prohibited and will be reported to appropriate authorities where required by law.</Notice>

                <H2>1. Permitted Uses</H2>
                <P>ConvertDox may be used for:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Personal file conversion, editing, and utility tasks</Li>
                  <Li>Business and professional use of our tools for legitimate purposes</Li>
                  <Li>Educational and research purposes</Li>
                  <Li>Development and testing (within API rate limits)</Li>
                </ul>

                <H2>2. Prohibited Activities</H2>
                <H3>2.1 Malware & Security Threats</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Uploading, creating, or distributing malware, ransomware, spyware, or viruses</Li>
                  <Li>Using the platform for hacking, penetration testing on systems without authorisation</Li>
                  <Li>Exploiting security vulnerabilities in our platform or infrastructure</Li>
                  <Li>Using network tools to conduct attacks on third-party systems</Li>
                </ul>

                <H3>2.2 Illegal Content</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Child sexual abuse material (CSAM) — zero tolerance, immediately reported to authorities</Li>
                  <Li>Content promoting or facilitating terrorism or violent extremism</Li>
                  <Li>Material that violates any applicable law in any jurisdiction</Li>
                  <Li>Content that infringes intellectual property rights</Li>
                </ul>

                <H3>2.3 Fraud & Deception</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Phishing attacks — creating or distributing phishing materials</Li>
                  <Li>Identity fraud or impersonation of real individuals or organisations</Li>
                  <Li>Credential theft or social engineering attacks</Li>
                  <Li>Creating fake documents for deceptive purposes</Li>
                  <Li>Financial fraud, scam materials, or fraudulent schemes</Li>
                </ul>

                <H3>2.4 AI Misuse</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Using AI tools to generate deepfake content for deceptive purposes</Li>
                  <Li>Generating non-consensual intimate imagery (NCII)</Li>
                  <Li>Creating AI-generated disinformation or propaganda at scale</Li>
                  <Li>Using AI to harass, threaten, or harm specific individuals</Li>
                  <Li>Generating content that violates any section of this AUP</Li>
                </ul>

                <H3>2.5 Abuse of Platform Resources</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Automated scraping or harvesting of content without authorisation</Li>
                  <Li>Excessive use that degrades service quality for other users</Li>
                  <Li>Circumventing rate limits through multiple accounts or IPs</Li>
                  <Li>API abuse beyond documented usage limits</Li>
                  <Li>Using bot networks to abuse our tools</Li>
                  <Li>Generating spam content in bulk</Li>
                </ul>

                <H3>2.6 Harassment & Harmful Content</H3>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Creating content used to harass, threaten, or intimidate individuals</Li>
                  <Li>Generating hate speech targeting individuals or groups</Li>
                  <Li>Content that promotes self-harm or suicide</Li>
                  <Li>Doxing or exposing private information of individuals</Li>
                </ul>

                <H2>3. Enforcement</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Warning:</strong> Minor violations may receive a warning</Li>
                  <Li><strong>Suspension:</strong> Serious violations result in immediate account and IP suspension</Li>
                  <Li><strong>Permanent ban:</strong> Severe or repeat violations result in permanent access removal</Li>
                  <Li><strong>Legal action:</strong> Illegal activities will be reported to law enforcement</Li>
                </ul>

                <H2>4. Reporting Violations</H2>
                <P>To report AUP violations, contact: <a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a></P>
              </div>
            )}

            {/* ── AI DISCLAIMER ── */}
            {active === 'ai' && (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px' }}>
                  <span style={{ fontSize:'32px' }}>🤖</span>
                  <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',margin:0 }}>AI Usage & Content Disclaimer</h1>
                </div>
                <P>ConvertDox integrates AI-powered tools to enhance your productivity. This disclaimer explains how our AI tools work, their limitations, and your responsibilities when using them.</P>

                <Notice type="warn">⚠️ AI-generated content may contain inaccuracies, errors, or outdated information. Always review AI outputs before using them for important decisions, professional documents, or public communications.</Notice>

                <H2>1. AI Content Accuracy</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>AI-generated content is produced by language models that can make mistakes</Li>
                  <Li>AI outputs may contain factual errors, hallucinations, or outdated information</Li>
                  <Li>AI tools do not have real-time internet access unless explicitly stated</Li>
                  <Li>Generated content should not be taken as fact without independent verification</Li>
                </ul>

                <H2>2. Professional & Legal Documents</H2>
                <Notice type="info">📋 AI-generated resumes, legal documents, contracts, business plans, medical content, and financial advice should ALWAYS be reviewed and verified by qualified professionals before use.</Notice>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li><strong>Legal documents:</strong> Not a substitute for qualified legal advice. Consult a licensed attorney.</Li>
                  <Li><strong>Medical content:</strong> Not medical advice. Consult a licensed healthcare provider.</Li>
                  <Li><strong>Financial content:</strong> Not financial advice. Consult a qualified financial advisor.</Li>
                  <Li><strong>Resumes/CVs:</strong> Review for accuracy — AI may generate plausible but incorrect details.</Li>
                  <Li><strong>Business plans:</strong> Verify all statistics, projections, and market data independently.</Li>
                </ul>

                <H2>3. AI Image Tools</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>AI image tools must not be used to create deceptive or misleading imagery</Li>
                  <Li>Creating deepfakes of real people without consent is strictly prohibited</Li>
                  <Li>AI-generated images must not be used to impersonate real individuals or organisations</Li>
                  <Li>Non-consensual intimate imagery (NCII) generation is zero-tolerance prohibited</Li>
                  <Li>Users are responsible for labelling AI-generated images as such where required by law</Li>
                </ul>

                <H2>4. Ethical AI Usage Guidelines</H2>
                <P>We expect all users to use our AI tools ethically and responsibly:</P>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Use AI tools to enhance productivity, not to deceive, harm, or defraud</Li>
                  <Li>Disclose AI involvement when sharing AI-generated content professionally</Li>
                  <Li>Do not use AI tools to generate content that discriminates against individuals or groups</Li>
                  <Li>Do not use AI to automate harassment, spam, or abusive communications</Li>
                  <Li>Respect intellectual property when providing input to AI tools</Li>
                </ul>

                <H2>5. Prohibited AI Uses</H2>
                <ul style={{ paddingLeft:'20px',marginBottom:'12px' }}>
                  <Li>Generating disinformation, fake news, or political manipulation content at scale</Li>
                  <Li>Creating content to facilitate fraud, scams, or illegal activities</Li>
                  <Li>Generating deepfakes for deceptive purposes</Li>
                  <Li>Producing content that sexualises minors in any way</Li>
                  <Li>Generating content promoting violence, terrorism, or extremism</Li>
                  <Li>Creating malware, phishing templates, or hacking tools</Li>
                  <Li>Systematically reproducing copyrighted works</Li>
                </ul>

                <H2>6. AI Moderation Statement</H2>
                <P>ConvertDox applies content filtering to our AI tools to prevent generation of prohibited content. Our AI systems are regularly reviewed and updated. We report illegal AI-generated content (such as CSAM) to appropriate authorities in compliance with applicable laws.</P>

                <H2>7. Liability Limitation for AI Content</H2>
                <P>ConvertDox is not liable for decisions made based on AI-generated content. Users assume full responsibility for how they use, share, or act upon AI-generated outputs. We make no warranties about the accuracy, completeness, or fitness for purpose of AI-generated content.</P>

                <H2>8. Feedback & AI Issues</H2>
                <P>If you encounter harmful, biased, or inappropriate AI outputs, please report them to: <a href="mailto:info@convertdox.com" style={{ color:'#E85D04' }}>info@convertdox.com</a></P>
                <P>Your feedback helps us improve our AI safety measures.</P>
              </div>
            )}

          </div>
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}
