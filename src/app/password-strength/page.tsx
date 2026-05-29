'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const COMMON = ['password','123456','password1','qwerty','abc123','letmein','monkey','1234567890','admin','welcome','login','master','hello','dragon','passw0rd','iloveyou','sunshine','princess','football','shadow']

function analyzePassword(pw: string) {
  const hasUpper = /[A-Z]/.test(pw)
  const hasLower = /[a-z]/.test(pw)
  const hasNumber = /[0-9]/.test(pw)
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw)
  const isCommon = COMMON.includes(pw.toLowerCase())
  const hasRepeat = /(.)\1\1/.test(pw)

  let score = 0
  score += Math.min(40, Math.floor(pw.length / 4) * 10)
  if (hasUpper) score += 15
  if (hasLower) score += 10
  if (hasNumber) score += 15
  if (hasSymbol) score += 20
  if (isCommon) score -= 40
  if (hasRepeat) score -= 10
  score = Math.max(0, Math.min(100, score))

  let label = 'Weak'
  let color = '#DC2626'
  if (score >= 80) { label = 'Very Strong'; color = '#16A34A' }
  else if (score >= 65) { label = 'Strong'; color = '#65A30D' }
  else if (score >= 45) { label = 'Good'; color = '#EAB308' }
  else if (score >= 25) { label = 'Fair'; color = '#F97316' }

  // Crack time estimate
  let charsetSize = 0
  if (hasLower) charsetSize += 26
  if (hasUpper) charsetSize += 26
  if (hasNumber) charsetSize += 10
  if (hasSymbol) charsetSize += 32
  if (charsetSize === 0) charsetSize = 26

  const combinations = Math.pow(charsetSize, pw.length)
  const attemptsPerSec = 1e10
  const seconds = combinations / attemptsPerSec

  let crackTime = 'instantly'
  if (seconds > 3.15e16) crackTime = 'centuries'
  else if (seconds > 3.15e13) crackTime = `${Math.round(seconds / 3.15e13).toLocaleString()} thousand years`
  else if (seconds > 3.15e10) crackTime = `${Math.round(seconds / 3.15e7).toLocaleString()} years`
  else if (seconds > 3.15e7) crackTime = `${Math.round(seconds / 2.63e6).toLocaleString()} months`
  else if (seconds > 86400) crackTime = `${Math.round(seconds / 86400).toLocaleString()} days`
  else if (seconds > 3600) crackTime = `${Math.round(seconds / 3600).toLocaleString()} hours`
  else if (seconds > 60) crackTime = `${Math.round(seconds / 60).toLocaleString()} minutes`
  else if (seconds > 1) crackTime = `${Math.round(seconds).toLocaleString()} seconds`

  const tips: string[] = []
  if (pw.length < 12) tips.push('Use at least 12 characters')
  if (!hasUpper) tips.push('Add uppercase letters (A-Z)')
  if (!hasNumber) tips.push('Add numbers (0-9)')
  if (!hasSymbol) tips.push('Add symbols (!@#$%^&*)')
  if (isCommon) tips.push('Avoid common passwords')

  return { score, label, color, hasUpper, hasLower, hasNumber, hasSymbol, isCommon, hasRepeat, crackTime, tips }
}

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const a = analyzePassword(password)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🛡️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Password Strength Checker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Test your password security — 100% private, never sent anywhere</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Password input */}
        <div style={{ position: 'relative' as const, marginBottom: '24px' }}>
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password to test..."
            style={{ width: '100%', padding: '16px 56px 16px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '18px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const, letterSpacing: '2px' }}
          />
          <button onClick={() => setShow(!show)}
            style={{ position: 'absolute' as const, right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
            {show ? '🙈' : '👁️'}
          </button>
        </div>

        {password && (
          <>
            {/* Score bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: a.color, fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{a.label}</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A' }}>{a.score}/100</span>
              </div>
              <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${a.score}%`, background: a.color, borderRadius: '999px', transition: 'all 0.3s' }} />
              </div>
            </div>

            {/* Crack time */}
            <div style={{ background: '#0F2A4A', borderRadius: '12px', padding: '20px', marginBottom: '24px', textAlign: 'center' as const }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Estimated crack time at 10 billion attempts/sec</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#F48C42', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{a.crackTime}</div>
            </div>

            {/* Checklist */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '14px' }}>Security Checklist</div>
              {[
                { label: 'At least 8 characters', ok: password.length >= 8 },
                { label: 'At least 12 characters (recommended)', ok: password.length >= 12 },
                { label: 'Contains uppercase letters', ok: a.hasUpper },
                { label: 'Contains lowercase letters', ok: a.hasLower },
                { label: 'Contains numbers', ok: a.hasNumber },
                { label: 'Contains symbols (!@#$%...)', ok: a.hasSymbol },
                { label: 'Not a common password', ok: !a.isCommon },
                { label: 'No repeated characters (aaa)', ok: !a.hasRepeat },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '18px' }}>{item.ok ? '✅' : '❌'}</span>
                  <span style={{ fontSize: '14px', color: item.ok ? '#15803D' : '#94a3b8', fontWeight: item.ok ? 600 : 400 }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Tips */}
            {a.tips.length > 0 && (
              <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#C2410C', marginBottom: '10px' }}>💡 Tips to improve</div>
                {a.tips.map(tip => (
                  <div key={tip} style={{ fontSize: '14px', color: '#92400E', padding: '4px 0', paddingLeft: '12px', borderLeft: '3px solid #E85D04', marginBottom: '6px' }}>{tip}</div>
                ))}
              </div>
            )}
          </>
        )}

        {!password && (
          <div style={{ textAlign: 'center' as const, padding: '48px', color: '#94a3b8' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔐</div>
            <p>Type a password above to see its strength analysis</p>
            <p style={{ fontSize: '12px' }}>Your password is analyzed locally — never sent to any server</p>
          </div>
        )}
      </div>
    </div>
  )
}
