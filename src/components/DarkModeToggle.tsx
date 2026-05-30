'use client'
import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('convertdox-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(shouldBeDark)
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('convertdox-theme', newMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      style={{ background:'none', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'8px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', width:'38px', height:'38px' }}>
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#F48C42"/>
          <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#F48C42" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#0F2A4A"/>
        </svg>
      )}
    </button>
  )
}
