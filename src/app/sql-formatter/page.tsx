'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
  'OUTER JOIN', 'FULL JOIN', 'CROSS JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'INDEX', 'DROP',
  'ALTER', 'ADD', 'COLUMN', 'NOT NULL', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'DISTINCT',
  'AS', 'IN', 'NOT', 'IS', 'NULL', 'LIKE', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN',
  'ELSE', 'END', 'WITH', 'UNION', 'ALL', 'TOP', 'OFFSET', 'FETCH', 'NEXT', 'ROWS', 'ONLY',
]

const NEWLINE_BEFORE = [
  'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN',
  'UNION ALL', 'UNION', 'EXCEPT', 'INTERSECT',
]

function formatSQL(sql: string): string {
  // Uppercase keywords
  let result = sql
  // Sort by length descending to match longer keywords first
  const sortedKw = [...KEYWORDS].sort((a, b) => b.length - a.length)
  for (const kw of sortedKw) {
    const re = new RegExp(`\\b${kw.replace(/\s+/g, '\\s+')}\\b`, 'gi')
    result = result.replace(re, kw)
  }

  // Normalize whitespace
  result = result.replace(/\s+/g, ' ').trim()

  // Add newlines before main clauses (sorted by length desc)
  const newlineBefore = [...NEWLINE_BEFORE].sort((a, b) => b.length - a.length)
  for (const clause of newlineBefore) {
    const re = new RegExp(`\\s+${clause.replace(/\s+/g, '\\s+')}\\b`, 'g')
    result = result.replace(re, '\n' + clause)
  }

  // Indent AND/OR
  result = result.replace(/\b(AND|OR)\b/g, '\n  $1')

  // Indent WHEN/THEN/ELSE/END in CASE
  result = result.replace(/\bWHEN\b/g, '\n  WHEN')
  result = result.replace(/\bTHEN\b/g, ' THEN')
  result = result.replace(/\bELSE\b/g, '\n  ELSE')
  result = result.replace(/\bEND\b/g, '\nEND')

  // Clean up multiple newlines
  result = result.replace(/\n{3,}/g, '\n\n')

  return result.trim()
}

const SAMPLE = `select e.id, e.name, d.department_name, count(p.id) as project_count from employees e inner join departments d on e.department_id = d.id left join projects p on e.id = p.employee_id where e.active = 1 and e.salary > 50000 group by e.id, e.name, d.department_name having count(p.id) > 2 order by e.name asc limit 100`

export default function SQLFormatterPage() {
  const [input, setInput] = useState(SAMPLE)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function format() {
    setOutput(formatSQL(input))
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🗄️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>SQL Formatter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Format and beautify SQL queries with proper indentation</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button onClick={format}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Format SQL
          </button>
          {output && (
            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {copied ? 'Copied!' : 'Copy Output'}
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>SQL Input</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={20}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Formatted SQL</div>
            <textarea value={output} readOnly rows={20}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
