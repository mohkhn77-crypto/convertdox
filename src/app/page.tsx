'use client'
import { useState } from 'react'
import Script from 'next/script'
import NavBar from '@/components/NavBar'

const ToolIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    'word-counter': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#1D4ED8" textAnchor="middle">123</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#3B82F6"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">W</text>
      </svg>
    ),
    'text-case': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#B91C1C" textAnchor="middle">aB</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#EF4444"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Aa</text>
      </svg>
    ),
    'lorem': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5"/>
        <rect x="11" y="16" width="18" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="22" width="14" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="28" width="16" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="34" width="12" height="2" rx="1" fill="#6B7280"/>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#6B7280"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Aa</text>
      </svg>
    ),
    'markdown': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#4338CA" textAnchor="middle">.md</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#6366F1"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">M</text>
      </svg>
    ),
    'tip': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5"/>
        <text x="26" y="34" fontFamily="Arial" fontSize="22" fontWeight="700" fill="#DB2777" textAnchor="middle">$</text>
      </svg>
    ),
    'bmi': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
        <circle cx="26" cy="20" r="4" fill="#F59E0B"/>
        <path d="M22 28h8M22 32h6M22 36h7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'percentage': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <text x="26" y="33" fontFamily="Arial" fontSize="22" fontWeight="700" fill="#0E7490" textAnchor="middle">%</text>
      </svg>
    ),
    'age': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5"/>
        <rect x="14" y="18" width="24" height="20" rx="2" fill="white" stroke="#EA580C" strokeWidth="1.5"/>
        <rect x="14" y="18" width="24" height="6" rx="2" fill="#EA580C"/>
        <rect x="18" y="14" width="2" height="6" rx="1" fill="#EA580C"/>
        <rect x="32" y="14" width="2" height="6" rx="1" fill="#EA580C"/>
        <text x="26" y="35" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#EA580C" textAnchor="middle">AGE</text>
      </svg>
    ),
    'discount': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5"/>
        <path d="M14 14L38 38M18 17a3 3 0 100-6 3 3 0 000 6zM34 41a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="#DC2626" strokeWidth="2"/>
        <text x="26" y="42" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#DC2626" textAnchor="middle">%OFF</text>
      </svg>
    ),
    'unit': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M14 28h24M14 28l4-4M14 28l4 4M38 28l-4-4M38 28l-4 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="20" y="22" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#2563EB" textAnchor="middle">cm</text>
        <text x="32" y="22" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#2563EB" textAnchor="middle">in</text>
      </svg>
    ),
    'password': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5"/>
        <path d="M22 22a4 4 0 118 0v4h-8v-4z" fill="none" stroke="#9333EA" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="18" y="26" width="16" height="12" rx="2" fill="#9333EA"/>
        <circle cx="26" cy="32" r="2" fill="white"/>
      </svg>
    ),
    'qr': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="1.5"/>
        <rect x="14" y="14" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="30" y="14" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="14" y="30" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="26" y="26" width="3" height="3" fill="#0EA5E9"/>
        <rect x="32" y="32" width="3" height="3" fill="#0EA5E9"/>
        <rect x="26" y="32" width="3" height="3" fill="#0EA5E9"/>
        <rect x="32" y="26" width="3" height="3" fill="#0EA5E9"/>
      </svg>
    ),
    'hex-rgb': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5"/>
        <circle cx="14" cy="20" r="2" fill="#DC2626"/>
        <circle cx="20" cy="20" r="2" fill="#16A34A"/>
        <circle cx="26" cy="20" r="2" fill="#2563EB"/>
        <text x="20" y="34" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#7F1D1D" textAnchor="middle">RGB</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#DC2626"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">HEX</text>
      </svg>
    ),
    'css-gradient': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#EC4899"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="36" height="36" rx="6" fill="url(#grad1)"/>
        <text x="26" y="32" fontFamily="Arial" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">CSS</text>
      </svg>
    ),
    'json': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#15803D" textAnchor="middle">{'{}'}</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#16A34A"/>
        <text x="33" y="27" fontFamily="monospace" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">{'{}'}</text>
      </svg>
    ),
    'base64': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#C2410C" textAnchor="middle">abc</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#EA580C"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">b64</text>
      </svg>
    ),
    'url-encoder': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <path d="M18 26a6 6 0 016-6h4M30 26a6 6 0 01-6 6h-4M22 26h8" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="40" fontFamily="Arial" fontSize="7" fontWeight="700" fill="#0D9488" textAnchor="middle">URL</text>
      </svg>
    ),
    'random': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FAE8FF" stroke="#A855F7" strokeWidth="1.5"/>
        <circle cx="18" cy="20" r="2" fill="#A855F7"/>
        <circle cx="26" cy="26" r="2" fill="#A855F7"/>
        <circle cx="34" cy="32" r="2" fill="#A855F7"/>
        <circle cx="34" cy="20" r="2" fill="#A855F7"/>
        <circle cx="18" cy="32" r="2" fill="#A855F7"/>
        <text x="26" y="43" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#A855F7" textAnchor="middle">RND</text>
      </svg>
    ),
    'coin-flip': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="11" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5"/>
        <text x="26" y="31" fontFamily="Arial" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">$</text>
      </svg>
    ),
    'stopwatch': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5"/>
        <circle cx="26" cy="28" r="11" fill="white" stroke="#475569" strokeWidth="2"/>
        <path d="M26 22v6l4 2" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <rect x="23" y="13" width="6" height="3" rx="1" fill="#475569"/>
      </svg>
    ),
    'number-words': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <text x="20" y="28" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#0E7490" textAnchor="middle">123</text>
        <text x="20" y="38" fontFamily="Arial" fontSize="7" fontWeight="600" fill="#0E7490" textAnchor="middle">words</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#0891B2"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Abc</text>
      </svg>
    ),
    'csv-json': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="28" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">CSV</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#16A34A"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">JSON</text>
      </svg>
    ),
    'roman': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="serif" fontSize="12" fontWeight="700" fill="#92400E" textAnchor="middle">XIV</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#D97706"/>
        <text x="33" y="27" fontFamily="Arial" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">14</text>
      </svg>
    ),
    'uuid': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="20" y="26" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#5B21B6" textAnchor="middle">uuid</text>
        <text x="20" y="35" fontFamily="monospace" fontSize="6" fill="#7C3AED" textAnchor="middle">v4</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#7C3AED"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">ID</text>
      </svg>
    ),
    'text-diff': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="4" y="10" width="20" height="34" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5"/>
        <text x="14" y="31" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#DC2626" textAnchor="middle">−</text>
        <rect x="28" y="10" width="20" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="38" y="31" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#16A34A" textAnchor="middle">+</text>
      </svg>
    ),
    'loan': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5"/>
        <text x="26" y="26" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#1D4ED8" textAnchor="middle">LOAN</text>
        <text x="26" y="37" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#2563EB" textAnchor="middle">$</text>
      </svg>
    ),
    'timezone': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="11" fill="none" stroke="#0891B2" strokeWidth="2"/>
        <path d="M26 19v7l4 3" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="43" fontFamily="Arial" fontSize="7" fontWeight="700" fill="#0891B2" textAnchor="middle">TZ</text>
      </svg>
    ),
    'date-diff': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5"/>
        <rect x="12" y="16" width="12" height="10" rx="1" fill="#EA580C" opacity="0.3"/>
        <rect x="28" y="20" width="12" height="10" rx="1" fill="#EA580C" opacity="0.7"/>
        <path d="M20 22h12" stroke="#EA580C" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="38" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#EA580C" textAnchor="middle">DIFF</text>
      </svg>
    ),
    'salary': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="26" y="30" fontFamily="Arial" fontSize="22" fontWeight="700" fill="#15803D" textAnchor="middle">$</text>
        <path d="M16 38h20" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'compound': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <path d="M14 36 Q18 28 22 30 Q26 32 30 20 Q34 16 38 14" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    'gpa': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5"/>
        <text x="26" y="30" fontFamily="Arial" fontSize="16" fontWeight="700" fill="#4338CA" textAnchor="middle">GPA</text>
        <text x="26" y="40" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#6366F1" textAnchor="middle">4.0</text>
      </svg>
    ),
    'calorie': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <path d="M26 14 C24 18 20 20 20 26 C20 30 23 34 26 34 C29 34 32 30 32 26 C32 20 28 18 26 14Z" fill="#EF4444" opacity="0.7"/>
        <path d="M26 22 C25 24 23 25 23 28 C23 30 24.5 32 26 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'pomodoro': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <circle cx="26" cy="27" r="11" fill="#EF4444" opacity="0.8"/>
        <path d="M26 21v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12 C22 10 30 10 30 12" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'jwt': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="20" y="28" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#5B21B6" textAnchor="middle">JWT</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#7C3AED"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">🔐</text>
      </svg>
    ),
    'hash': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5"/>
        <text x="26" y="30" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#374151" textAnchor="middle">#</text>
      </svg>
    ),
    'xml': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#92400E" textAnchor="middle">XML</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#D97706"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">{'</>'}</text>
      </svg>
    ),
    'yaml': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="29" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">YAML</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#16A34A"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">JSON</text>
      </svg>
    ),
    'json-csv': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="28" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">JSON</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#059669"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">CSV</text>
      </svg>
    ),
    'sql': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5"/>
        <ellipse cx="26" cy="18" rx="10" ry="4" fill="#0284C7" opacity="0.7"/>
        <path d="M16 18v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" fill="none" stroke="#0284C7" strokeWidth="1.5"/>
        <path d="M16 26v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" fill="none" stroke="#0284C7" strokeWidth="1.5"/>
      </svg>
    ),
    'regex': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FAE8FF" stroke="#A855F7" strokeWidth="1.5"/>
        <text x="26" y="30" fontFamily="monospace" fontSize="16" fontWeight="700" fill="#7E22CE" textAnchor="middle">.*</text>
      </svg>
    ),
    'html-md': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5"/>
        <text x="20" y="29" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#C2410C" textAnchor="middle">HTML</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#EA580C"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">.md</text>
      </svg>
    ),
    'md-html': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5"/>
        <text x="20" y="29" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#4338CA" textAnchor="middle">.md</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#6366F1"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">HTML</text>
      </svg>
    ),
    'slug': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <text x="26" y="23" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#0F766E" textAnchor="middle">title</text>
        <path d="M26 25v4" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="26" y="36" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#0D9488" textAnchor="middle">ti-tle</text>
      </svg>
    ),
    'entities': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5"/>
        <text x="26" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#92400E" textAnchor="middle">&amp;lt;</text>
        <text x="26" y="37" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#CA8A04" textAnchor="middle">{'<'}</text>
      </svg>
    ),
    'cron': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="10" fill="none" stroke="#475569" strokeWidth="2"/>
        <path d="M26 20v6l3 3" stroke="#E85D04" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="42" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#475569" textAnchor="middle">* * * * *</text>
      </svg>
    ),
    'char-count': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="20" y="26" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#1D4ED8" textAnchor="middle">123</text>
        <text x="20" y="36" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#1D4ED8" textAnchor="middle">abc</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#3B82F6"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">#</text>
      </svg>
    ),
    'reverse-text': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <text x="26" y="24" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#B91C1C" textAnchor="middle">ABC</text>
        <path d="M16 30h20M30 26l4 4-4 4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="26" y="43" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#EF4444" textAnchor="middle">CBA</text>
      </svg>
    ),
    'remove-dup': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5"/>
        <rect x="14" y="16" width="16" height="4" rx="1" fill="#DB2777" opacity="0.4"/>
        <rect x="14" y="22" width="16" height="4" rx="1" fill="#DB2777" opacity="0.8"/>
        <rect x="14" y="28" width="16" height="4" rx="1" fill="#DB2777" opacity="0.4"/>
        <path d="M34 16l4 4-4 4M34 24l4 4-4 4" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'sort-lines': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <path d="M14 20h12M14 26h18M14 32h10" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34 15v18M30 29l4 4 4-4" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'find-replace': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <circle cx="20" cy="22" r="6" fill="none" stroke="#D97706" strokeWidth="2"/>
        <path d="M24 26l4 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 30l8-4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        <rect x="28" y="30" width="8" height="4" rx="1" fill="#D97706" opacity="0.6"/>
      </svg>
    ),
    'slug-adv': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <text x="26" y="24" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#0E7490" textAnchor="middle">Title</text>
        <path d="M26 26v4" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="26" y="37" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#0891B2" textAnchor="middle">ti-tle</text>
      </svg>
    ),
    'strip-html': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5"/>
        <text x="22" y="24" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#EA580C" textAnchor="middle">{'<html>'}</text>
        <path d="M14 34l24-4" stroke="#EA580C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 30l6 6M38 30l-6 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'quotes': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="19" y="32" fontFamily="serif" fontSize="26" fontWeight="700" fill="#7C3AED" textAnchor="middle">{'"'}</text>
        <text x="33" y="34" fontFamily="serif" fontSize="26" fontWeight="700" fill="#A78BFA" textAnchor="middle">{'"'}</text>
      </svg>
    ),
    'palette': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FAE8FF" stroke="#A855F7" strokeWidth="1.5"/>
        <circle cx="18" cy="20" r="5" fill="#EF4444"/>
        <circle cx="34" cy="20" r="5" fill="#3B82F6"/>
        <circle cx="18" cy="34" r="5" fill="#10B981"/>
        <circle cx="34" cy="34" r="5" fill="#F59E0B"/>
        <circle cx="26" cy="27" r="5" fill="#A855F7"/>
      </svg>
    ),
    'box-shadow': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5"/>
        <rect x="17" y="17" width="22" height="18" rx="3" fill="#94A3B8" opacity="0.4"/>
        <rect x="14" y="14" width="22" height="18" rx="3" fill="white" stroke="#475569" strokeWidth="1"/>
      </svg>
    ),
    'border-radius': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <rect x="15" y="15" width="22" height="22" rx="8" fill="none" stroke="#0D9488" strokeWidth="2.5"/>
        <circle cx="15" cy="15" r="2" fill="#E85D04"/>
        <circle cx="37" cy="15" r="2" fill="#E85D04"/>
        <circle cx="15" cy="37" r="2" fill="#E85D04"/>
        <circle cx="37" cy="37" r="2" fill="#E85D04"/>
      </svg>
    ),
    'color-blind': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5"/>
        <ellipse cx="26" cy="26" rx="12" ry="8" fill="none" stroke="#374151" strokeWidth="1.8"/>
        <circle cx="26" cy="26" r="4" fill="#374151"/>
        <circle cx="22" cy="21" r="2" fill="#EF4444"/>
        <circle cx="30" cy="21" r="2" fill="#10B981"/>
        <circle cx="22" cy="31" r="2" fill="#3B82F6"/>
        <circle cx="30" cy="31" r="2" fill="#F59E0B"/>
      </svg>
    ),
    'pw-strength': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <path d="M26 12l10 4v8c0 6-4.5 10-10 11-5.5-1-10-5-10-11v-8l10-4z" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="16" y="28" width="20" height="4" rx="2" fill="#E5E7EB"/>
        <rect x="16" y="28" width="14" height="4" rx="2" fill="#16A34A"/>
      </svg>
    ),
    'pin-gen': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <rect x="12" y="20" width="7" height="12" rx="2" fill="#7C3AED"/>
        <rect x="22" y="20" width="7" height="12" rx="2" fill="#7C3AED" opacity="0.7"/>
        <rect x="32" y="20" width="7" height="12" rx="2" fill="#7C3AED" opacity="0.4"/>
        <text x="26" y="40" fontFamily="Arial" fontSize="7" fontWeight="700" fill="#7C3AED" textAnchor="middle">PIN</text>
      </svg>
    ),
    'username': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5"/>
        <circle cx="26" cy="22" r="6" fill="none" stroke="#6366F1" strokeWidth="2"/>
        <path d="M14 36c0-6 5.4-10 12-10s12 4 12 10" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
        <text x="38" y="16" fontFamily="Arial" fontSize="11" fontWeight="700" fill="#E85D04" textAnchor="middle">@</text>
      </svg>
    ),
    'binary': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="14" fontWeight="700" fill="#1D4ED8" textAnchor="middle">01</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#3B82F6"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">10</text>
      </svg>
    ),
    'morse': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <circle cx="17" cy="22" r="4" fill="#D97706"/>
        <rect x="24" y="18" width="12" height="8" rx="2" fill="#D97706"/>
        <circle cx="17" cy="34" r="4" fill="#D97706" opacity="0.6"/>
        <circle cx="26" cy="34" r="4" fill="#D97706" opacity="0.6"/>
        <rect x="33" y="30" width="8" height="8" rx="2" fill="#D97706" opacity="0.4"/>
      </svg>
    ),
    'base-conv': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="24" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#15803D" textAnchor="middle">10</text>
        <text x="20" y="34" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#15803D" textAnchor="middle">16</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#16A34A"/>
        <text x="33" y="24" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">8</text>
        <text x="33" y="34" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">2</text>
      </svg>
    ),
    'timestamp': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="10" fill="none" stroke="#0891B2" strokeWidth="2"/>
        <path d="M26 20v6l3 3" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="43" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#0891B2" textAnchor="middle">1234567890</text>
      </svg>
    ),
    'text-binary': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="20" y="30" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#5B21B6" textAnchor="middle">Aa</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#7C3AED"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">01</text>
      </svg>
    ),
    'magic-8': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="22" fill="#1a1a2e" stroke="#4B0082" strokeWidth="2"/>
        <circle cx="26" cy="26" r="14" fill="#0F2A4A"/>
        <text x="26" y="32" fontFamily="Arial" fontSize="16" fontWeight="900" fill="white" textAnchor="middle">8</text>
      </svg>
    ),
    'decision': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="18" y="30" fontFamily="Arial" fontSize="13" fontWeight="700" fill="#16A34A" textAnchor="middle">Y</text>
        <text x="34" y="30" fontFamily="Arial" fontSize="13" fontWeight="700" fill="#DC2626" textAnchor="middle">N</text>
        <path d="M26 20v8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'team-picker': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <circle cx="18" cy="22" r="5" fill="#0D9488" opacity="0.7"/>
        <circle cx="34" cy="22" r="5" fill="#0D9488" opacity="0.7"/>
        <path d="M12 34c0-4 2.7-6 6-6M28 34c0-4 2.7-6 6-6" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="20" r="4" fill="#0D9488"/>
        <path d="M20 34c0-3 2.7-5 6-5" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'rand-color': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FAE8FF" stroke="#A855F7" strokeWidth="1.5"/>
        <rect x="12" y="12" width="12" height="12" rx="3" fill="#EF4444"/>
        <rect x="28" y="12" width="12" height="12" rx="3" fill="#3B82F6"/>
        <rect x="12" y="28" width="12" height="12" rx="3" fill="#10B981"/>
        <rect x="28" y="28" width="12" height="12" rx="3" fill="#F59E0B"/>
      </svg>
    ),
    'emoji': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="12" fill="#EAB308"/>
        <circle cx="21" cy="23" r="2" fill="#1a1a1a"/>
        <circle cx="31" cy="23" r="2" fill="#1a1a1a"/>
        <path d="M20 30 Q26 35 32 30" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'yes-no': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5"/>
        <ellipse cx="26" cy="26" rx="14" ry="14" fill="none" stroke="#e2e8f0" strokeWidth="1.5"/>
        <path d="M12 26 A14 14 0 0 1 40 26" fill="#16A34A" opacity="0.7"/>
        <path d="M40 26 A14 14 0 0 1 12 26" fill="#DC2626" opacity="0.7"/>
        <text x="19" y="24" fontFamily="Arial" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">YES</text>
        <text x="33" y="31" fontFamily="Arial" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">NO</text>
      </svg>
    ),
    'img-base64': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <rect x="9" y="14" width="22" height="16" rx="2" fill="#DDD6FE"/>
        <circle cx="14" cy="20" r="3" fill="#7C3AED" opacity="0.5"/>
        <path d="M9 28l6-6 4 4 3-3 5 5" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#7C3AED"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">b64</text>
      </svg>
    ),
    'bitrate': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5"/>
        <text x="26" y="24" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#EA580C" textAnchor="middle">kbps</text>
        <path d="M14 34h24" stroke="#EA580C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 28 L18 24 L22 30 L26 22 L30 28 L34 26" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'aspect': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="12" y="18" width="28" height="16" rx="2" fill="none" stroke="#3B82F6" strokeWidth="2"/>
        <text x="26" y="29" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#1D4ED8" textAnchor="middle">16:9</text>
      </svg>
    ),
    'length': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
        <rect x="12" y="22" width="28" height="8" rx="2" fill="#D97706" opacity="0.3"/>
        <path d="M12 24v4M20 24v4M28 24v4M36 24v4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="26" y="38" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#D97706" textAnchor="middle">mm cm m ft</text>
      </svg>
    ),
    'weight': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5"/>
        <path d="M12 36 L18 16 L34 16 L40 36Z" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 36h28" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="14" r="4" fill="#475569" opacity="0.6"/>
      </svg>
    ),
    'temp': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <rect x="24" y="12" width="4" height="20" rx="2" fill="#EF4444" opacity="0.3"/>
        <rect x="24" y="22" width="4" height="10" rx="1" fill="#EF4444"/>
        <circle cx="26" cy="34" r="5" fill="#EF4444"/>
      </svg>
    ),
    'volume': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <path d="M18 14 L16 38 L36 38 L34 14Z" fill="none" stroke="#0891B2" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 28 L36 28" stroke="#0891B2" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M17 22 L35 22" stroke="#0891B2" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    'speed': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <path d="M12 30 A14 14 0 0 1 40 30" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round"/>
        <path d="M12 30 A14 14 0 0 1 34 20" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="26" cy="30" r="2" fill="#0F2A4A"/>
        <path d="M26 30 L30 22" stroke="#0F2A4A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'lorem-adv': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5"/>
        <rect x="13" y="16" width="26" height="2" rx="1" fill="#6B7280"/>
        <rect x="13" y="21" width="20" height="2" rx="1" fill="#6B7280"/>
        <rect x="13" y="26" width="24" height="2" rx="1" fill="#6B7280"/>
        <rect x="13" y="31" width="18" height="2" rx="1" fill="#6B7280"/>
        <text x="38" y="38" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#E85D04" textAnchor="middle">Aa</text>
      </svg>
    ),
    'uuid-bulk': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="20" y="22" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#5B21B6" textAnchor="middle">uuid</text>
        <text x="20" y="30" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#5B21B6" textAnchor="middle">uuid</text>
        <text x="20" y="38" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#5B21B6" textAnchor="middle">uuid</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#7C3AED"/>
        <text x="33" y="22" fontFamily="Arial" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">×N</text>
        <text x="33" y="30" fontFamily="Arial" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">IDs</text>
      </svg>
    ),
    'md-cheat': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
        <text x="26" y="24" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#5B21B6" textAnchor="middle"># H1</text>
        <text x="26" y="32" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#7C3AED" textAnchor="middle">**bold**</text>
        <text x="26" y="40" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#A78BFA" textAnchor="middle">[link]()</text>
      </svg>
    ),
    'beautifier': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="26" y="30" fontFamily="monospace" fontSize="22" fontWeight="700" fill="#16A34A" textAnchor="middle">{'{}'}</text>
      </svg>
    ),
    'words-num': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="20" y="28" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#1D4ED8" textAnchor="middle">five</text>
        <text x="20" y="38" fontFamily="Arial" fontSize="7" fontWeight="600" fill="#1D4ED8" textAnchor="middle">hundred</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#3B82F6"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">500</text>
      </svg>
    ),
    'ascii': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5"/>
        <text x="26" y="20" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#374151" textAnchor="middle">/\  /\</text>
        <text x="26" y="26" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#374151" textAnchor="middle">/__\/__\</text>
        <text x="26" y="32" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#374151" textAnchor="middle">/  \/  \</text>
        <text x="26" y="40" fontFamily="Arial" fontSize="7" fontWeight="700" fill="#E85D04" textAnchor="middle">ASCII</text>
      </svg>
    ),
  }
  return icons[type] ?? icons['word-counter']
}

const TOOLS = [
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
  { iconType:'loan',       title:'Loan Calculator',          desc:'Calculate monthly payments & amortization',  href:'/loan-calculator',      cat:'calc' },
  { iconType:'timezone',   title:'Time Zone Converter',      desc:'Convert times between any time zones',        href:'/timezone-converter',   cat:'calc' },
  { iconType:'date-diff',  title:'Date Difference',          desc:'Days, weeks, months between two dates',       href:'/date-difference',      cat:'calc' },
  { iconType:'salary',     title:'Salary Calculator',        desc:'Convert hourly ↔ annual salary instantly',    href:'/salary-calculator',    cat:'calc' },
  { iconType:'compound',   title:'Compound Interest',        desc:'Calculate investment growth over time',        href:'/compound-interest',    cat:'calc' },
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
  { iconType:'box-shadow',    title:'CSS Box Shadow',          desc:'Visual CSS box shadow generator',             href:'/box-shadow',           cat:'color' },
  { iconType:'border-radius', title:'CSS Border Radius',       desc:'Visual border radius generator',              href:'/border-radius',        cat:'color' },
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
]

const COMING = [
  { icon:'📄', title:'PDF to Word',         desc:'Convert PDF to editable Word' },
  { icon:'🖼', title:'Image Compressor',    desc:'Reduce image size instantly' },
  { icon:'✂️', title:'Background Remover',  desc:'AI removes image backgrounds' },
  { icon:'🌐', title:'IP Address Lookup',   desc:'Find IP location info' },
  { icon:'📧', title:'Email Validator',     desc:'Validate email addresses' },
  { icon:'🔑', title:'MD5 Hash Generator',  desc:'Generate MD5 hashes instantly' },
  { icon:'📋', title:'HTML Formatter',      desc:'Beautify HTML code' },
]

const CatIcon = ({ type, active }: { type: string, active: boolean }) => {
  const color = active ? '#ffffff' : '#64748b'
  const accent = active ? '#F48C42' : '#E85D04'
  const icons: Record<string, React.ReactElement> = {
    all: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill={accent}/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill={color}/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill={color}/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill={accent}/>
      </svg>
    ),
    text: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 4h14M12 4v16M9 20h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    calc: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="1.8" fill="none"/>
        <rect x="6" y="5" width="12" height="4" rx="1" fill={accent}/>
        <circle cx="8" cy="13" r="1" fill={color}/>
        <circle cx="12" cy="13" r="1" fill={color}/>
        <circle cx="16" cy="13" r="1" fill={color}/>
        <circle cx="8" cy="17" r="1" fill={color}/>
        <circle cx="12" cy="17" r="1" fill={color}/>
        <circle cx="16" cy="17" r="1" fill={accent}/>
      </svg>
    ),
    security: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 3v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    dev: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.8"/>
        <circle cx="8" cy="9" r="1.5" fill="#EF4444"/>
        <circle cx="15" cy="9" r="1.5" fill="#10B981"/>
        <circle cx="9" cy="15" r="1.5" fill="#3B82F6"/>
        <circle cx="15" cy="15" r="1.5" fill={accent}/>
      </svg>
    ),
    qr: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" fill="none" stroke={color} strokeWidth="1.8"/>
        <rect x="15" y="3" width="6" height="6" rx="1" fill="none" stroke={color} strokeWidth="1.8"/>
        <rect x="3" y="15" width="6" height="6" rx="1" fill="none" stroke={color} strokeWidth="1.8"/>
        <rect x="5" y="5" width="2" height="2" fill={accent}/>
        <rect x="17" y="5" width="2" height="2" fill={accent}/>
        <rect x="5" y="17" width="2" height="2" fill={accent}/>
        <rect x="13" y="13" width="2" height="2" fill={color}/>
        <rect x="17" y="13" width="2" height="2" fill={color}/>
        <rect x="13" y="17" width="2" height="2" fill={color}/>
        <rect x="19" y="19" width="2" height="2" fill={accent}/>
      </svg>
    ),
    fun: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.8"/>
        <circle cx="7" cy="7" r="1.2" fill={color}/>
        <circle cx="13" cy="7" r="1.2" fill={color}/>
        <circle cx="10" cy="10" r="1.2" fill={accent}/>
        <circle cx="7" cy="13" r="1.2" fill={color}/>
        <circle cx="13" cy="13" r="1.2" fill={color}/>
        <circle cx="18" cy="18" r="3" fill={accent}/>
      </svg>
    ),
  }
  return icons[type] ?? icons['all']
}

const CATS = [
  { id:'all',      label:'All Tools',    iconType:'all' },
  { id:'text',     label:'Text',         iconType:'text' },
  { id:'calc',     label:'Calculators',  iconType:'calc' },
  { id:'security', label:'Security',     iconType:'security' },
  { id:'dev',      label:'Developer',    iconType:'dev' },
  { id:'color',    label:'Colour',       iconType:'color' },
  { id:'qr',       label:'QR Code',      iconType:'qr' },
  { id:'fun',      label:'Fun & Random', iconType:'fun' },
]

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'ConvertDox',
  'url': 'https://convertdox.com',
  'description': 'Free online tools — PDF, Image, AI, Calculator, Text, QR and more.',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': 'https://convertdox.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCat === 'all' || t.cat === activeCat
    const matchSearch = search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",maxWidth:'100%',overflowX:'hidden' }}>

      <Script id="json-ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'80px 24px 64px',textAlign:'center' }}>
        <div style={{ maxWidth:'760px',margin:'0 auto' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'5px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'28px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>FREE</span>
            85 Tools Live — 200+ Coming Soon
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,5vw,56px)',fontWeight:800,color:'white',lineHeight:1.15,letterSpacing:'-0.5px',margin:'0 0 18px' }}>
            Every Online Tool<br/>You Need —{' '}
            <span style={{ color:'#F48C42' }}>In One Place</span>
          </h1>
          <p style={{ fontSize:'clamp(15px,2vw,18px)',color:'rgba(255,255,255,0.65)',maxWidth:'540px',margin:'0 auto 40px',lineHeight:1.7 }}>
            PDF, Image, AI, Calculators, Text, QR Code and 200+ more tools. Free. Fast. No installation.
          </p>
          <div style={{ maxWidth:'500px',margin:'0 auto 36px',position:'relative' }}>
            <span style={{ position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',fontSize:'18px',pointerEvents:'none' }}>🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search 85+ tools — QR Code, BMI, Unit Converter..."
              style={{ width:'100%',padding:'15px 20px 15px 48px',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.25)',background:'rgba(255,255,255,0.12)',fontFamily:'inherit',fontSize:'15px',color:'white',outline:'none',boxSizing:'border-box' }}/>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'8px' }}>
            {[{label:'📝 Word Counter',href:'/word-counter'},{label:'⚖️ BMI Calculator',href:'/bmi-calculator'},{label:'📱 QR Generator',href:'/qr-generator'},{label:'⏱ Stopwatch',href:'/stopwatch'},{label:'📐 Unit Converter',href:'/unit-converter'},{label:'🌈 CSS Gradient',href:'/css-gradient'}].map(item => (
              <a key={item.href} href={item.href} style={{ background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'7px 16px',fontSize:'13px',color:'rgba(255,255,255,0.9)',textDecoration:'none',whiteSpace:'nowrap' }}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:'#0a1f38',padding:'16px 24px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap' }}>
          {[{num:'85',label:'Tools Live'},{num:'200+',label:'Coming Soon'},{num:'100%',label:'Free to Use'},{num:'0',label:'Sign-up Needed'}].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#F48C42' }}>{s.num}</div>
              <div style={{ fontSize:'11.5px',color:'rgba(255,255,255,0.45)',marginTop:'2px',textTransform:'uppercase',letterSpacing:'0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why ConvertDox - moved here, right after stats */}
      <div style={{ background:'#ffffff',padding:'56px 24px',borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'48px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:'10px' }}>Why ConvertDox</div>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',margin:'0 0 14px',letterSpacing:'-0.5px' }}>
              Built for everyone — fast, free, secure
            </h2>
            <p style={{ fontSize:'17px',color:'#64748b',maxWidth:'620px',margin:'0 auto',lineHeight:'1.7' }}>
              ConvertDox brings together 200+ professional tools in one platform —
              designed with privacy, speed, and simplicity at its core.
            </p>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'32px' }}>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M16 20l8-6 8 6v8a2 2 0 01-2 2H18a2 2 0 01-2-2v-8z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="2" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>200+ Tools Available</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                From PDF conversion and image editing to calculators, text utilities,
                and developer tools — we support more categories than any other free
                platform available online.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M22 14l-6 12h6l-2 8 8-12h-6l2-8z" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Fast and Easy</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Just open your tool, paste your text or drop your file, and get instant
                results. Most tools work in real time — no loading screens, no waiting,
                no friction whatsoever.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M16 28a4 4 0 014-4 6 6 0 0112 0h.5a3.5 3.5 0 010 7h-12.5a4 4 0 01-4-3z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M24 18v4M22 20l2-2 2 2" stroke="#F48C42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Works in the Cloud</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Everything runs in your browser. No software to download, no apps to
                install, no system resources consumed. Open any tool and start using
                it immediately.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M24 14v3M24 31v3M14 24h3M31 24h3M17 17l2 2M29 29l2 2M17 31l2-2M29 19l2-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="2" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Custom Settings</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Most tools support advanced customisation options. Adjust QR code
                colours, choose password complexity, customise conversions — fine-tune
                every result to your exact needs.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M24 12l9 4v8c0 6-4 11-9 12-5-1-9-6-9-12v-8l9-4z" fill="none" stroke="#F48C42" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M20 24l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Security Guaranteed</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Your files and data are processed securely and deleted instantly after
                use. We never store, share, or sell your information — your privacy
                is fully protected. <a href="/legal" style={{ color:'#E85D04',fontWeight:600,textDecoration:'none' }}>Read more about security</a>.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="14" width="18" height="13" rx="1.5" fill="none" stroke="white" strokeWidth="2"/>
                  <rect x="32" y="18" width="8" height="16" rx="1.5" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="36" cy="31" r="1" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>All Devices Supported</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                ConvertDox is fully browser-based and works seamlessly on every device
                — desktop, laptop, tablet, and mobile. Access any tool from anywhere,
                on any platform.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div id="tools" style={{ maxWidth:'1200px',margin:'0 auto',padding:'56px 24px' }}>
        <div style={{ marginBottom:'28px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'6px' }}>All Categories</div>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,34px)',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Free Online Tools</h2>
          <p style={{ fontSize:'15px',color:'#64748b',margin:0 }}>85 tools live. No installation. Works instantly in your browser.</p>
        </div>
        <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'28px' }}>
          {CATS.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              style={{ padding:'8px 16px',borderRadius:'999px',border:'1.5px solid',borderColor:activeCat===cat.id?'#0F2A4A':'#e2e8f0',background:activeCat===cat.id?'#0F2A4A':'white',color:activeCat===cat.id?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'7px',transition:'all 0.15s' }}>
              <CatIcon type={cat.iconType} active={activeCat===cat.id} />
              {cat.label}
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px',marginBottom:'14px' }}>
            {filtered.map(tool => (
              <a key={tool.href} href={tool.href}
                style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px',textDecoration:'none',display:'flex',flexDirection:'column',gap:'12px',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ marginBottom:'4px' }}><ToolIcon type={tool.iconType} /></div>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{tool.title}</div>
                  <div style={{ fontSize:'12.5px',color:'#94a3b8',lineHeight:'1.4' }}>{tool.desc}</div>
                </div>
                <div style={{ marginTop:'auto' }}>
                  <span style={{ fontSize:'12px',fontWeight:600,color:'#E85D04',background:'#FFF7ED',padding:'4px 12px',borderRadius:'999px' }}>Open Tool →</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:'center',padding:'48px',color:'#94a3b8' }}>
            <div style={{ fontSize:'36px',marginBottom:'10px' }}>🔍</div>
            <p>No tools found for &ldquo;{search}&rdquo;</p>
          </div>
        )}

        {/* Security badges */}
        <div style={{ background:'white',padding:'40px 0',borderTop:'1px solid #e2e8f0',borderBottom:'1px solid #e2e8f0',marginTop:'48px' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'10px' }}>Trusted & Secure</div>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'24px',fontWeight:800,color:'#0F2A4A',marginBottom:'24px' }}>Your data stays private</h2>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'14px' }}>
              {[
                { icon:'🔒', title:'SSL Encrypted', desc:'TLS 1.3 transfer' },
                { icon:'🛡', title:'No Storage', desc:'Auto-delete policy' },
                { icon:'🚫', title:'No Tracking', desc:'Privacy first' },
                { icon:'✅', title:'GDPR Ready', desc:'Compliant practices' },
                { icon:'⚡', title:'Cloudflare', desc:'Enterprise security' },
                { icon:'🆓', title:'Always Free', desc:'No hidden fees' },
              ].map(b => (
                <div key={b.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px 12px',textAlign:'center' }}>
                  <div style={{ fontSize:'28px',marginBottom:'6px' }}>{b.icon}</div>
                  <div style={{ fontSize:'13px',fontWeight:700,color:'#0F2A4A' }}>{b.title}</div>
                  <div style={{ fontSize:'11.5px',color:'#94a3b8',marginTop:'2px' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ marginTop:'48px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px' }}>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Coming Soon</h2>
            <span style={{ background:'#FFF7ED',border:'1.5px solid #FED7AA',color:'#C2410C',fontSize:'12px',fontWeight:700,padding:'3px 10px',borderRadius:'999px' }}>Building now</span>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px' }}>
            {COMING.map(tool => (
              <div key={tool.title} style={{ background:'#f8fafc',border:'1.5px dashed #e2e8f0',borderRadius:'16px',padding:'20px' }}>
                <div style={{ width:'44px',height:'44px',background:'#f1f5f9',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginBottom:'10px' }}>{tool.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#94a3b8',marginBottom:'4px' }}>{tool.title}</div>
                <div style={{ fontSize:'12px',color:'#cbd5e1' }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ background:'#0F2A4A',padding:'48px 24px 28px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'40px',marginBottom:'40px' }}>
            <div>
              <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px' }}>
                <div style={{ width:'30px',height:'30px',background:'#E85D04',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px' }}>📄</div>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
              </div>
              <p style={{ fontSize:'13.5px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7',maxWidth:'260px',margin:0 }}>Every online tool you need in one place. Free, fast, and private.</p>
            </div>
            {[
              {title:'Tools',links:[{label:'Word Counter',href:'/word-counter'},{label:'QR Generator',href:'/qr-generator'},{label:'Unit Converter',href:'/unit-converter'},{label:'CSS Gradient',href:'/css-gradient'},{label:'Stopwatch',href:'/stopwatch'}]},
              {title:'Categories',links:[{label:'PDF Tools',href:'/#tools'},{label:'Image Tools',href:'/#tools'},{label:'AI Tools',href:'/#tools'},{label:'Calculators',href:'/#tools'},{label:'Developer Tools',href:'/#tools'}]},
              {title:'Company',links:[{label:'About',href:'/about'},{label:'Privacy Policy',href:'/legal'},{label:'Terms of Use',href:'/legal'},{label:'Contact',href:'/contact'}]},
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'14px' }}>{col.title}</div>
                {col.links.map(link => (
                  <a key={link.label} href={link.href} style={{ display:'block',fontSize:'13.5px',color:'rgba(255,255,255,0.4)',textDecoration:'none',marginBottom:'8px' }}>{link.label}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px' }}>
            <p style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
            <div style={{ display:'flex',gap:'20px' }}>
              {[{label:'Privacy',href:'/legal'},{label:'Terms',href:'/legal'},{label:'Contact',href:'/contact'}].map(l => (
                <a key={l.label} href={l.href} style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',textDecoration:'none' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
