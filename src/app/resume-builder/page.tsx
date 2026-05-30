'use client'
import { useState } from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

interface WorkExp { title: string; company: string; duration: string; description: string }
interface Education { degree: string; school: string; year: string; gpa: string }

const emptyExp = (): WorkExp => ({ title: '', company: '', duration: '', description: '' })
const emptyEdu = (): Education => ({ degree: '', school: '', year: '', gpa: '' })

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>{title}</h2>
      {children}
    </div>
  )
}

const inp = (label: string, value: string, onChange: (v: string) => void, ph = '', type = 'text') => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph}
      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
  </div>
)

export default function ResumeBuilderPage() {
  const [personal, setPersonal] = useState({ name: '', email: '', phone: '', location: '', linkedin: '', website: '' })
  const [summary, setSummary] = useState('')
  const [experience, setExperience] = useState<WorkExp[]>([emptyExp()])
  const [education, setEducation] = useState<Education[]>([emptyEdu()])
  const [skills, setSkills] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addExp = () => setExperience(p => [...p, emptyExp()])
  const removeExp = (i: number) => setExperience(p => p.filter((_, idx) => idx !== i))
  const updateExp = (i: number, f: keyof WorkExp, v: string) =>
    setExperience(p => p.map((e, idx) => idx === i ? { ...e, [f]: v } : e))

  const addEdu = () => setEducation(p => [...p, emptyEdu()])
  const removeEdu = (i: number) => setEducation(p => p.filter((_, idx) => idx !== i))
  const updateEdu = (i: number, f: keyof Education, v: string) =>
    setEducation(p => p.map((e, idx) => idx === i ? { ...e, [f]: v } : e))

  async function download() {
    if (!personal.name || !personal.email) { setError('Name and email are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personal, summary, experience, education, skills })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate resume')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `resume-${personal.name.toLowerCase().replace(/\s+/g, '-')}.pdf`; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📝</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Resume Builder</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Build a professional resume and download as PDF. Free, no signup required.</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* AI tip */}
        <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', fontSize: '14px', color: '#1E40AF' }}>
          💡 <strong>Tip:</strong> After downloading your resume, use our <Link href="/ai-resume-improver" style={{ color: '#E85D04', fontWeight: 700, textDecoration: 'none' }}>AI Resume Improver</Link> to enhance your bullet points and summary with AI-powered suggestions.
        </div>

        <Section title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Full Name *', personal.name, v => setPersonal(p => ({ ...p, name: v })), 'Jane Smith')}
            {inp('Email *', personal.email, v => setPersonal(p => ({ ...p, email: v })), 'jane@email.com', 'email')}
            {inp('Phone', personal.phone, v => setPersonal(p => ({ ...p, phone: v })), '+1 555 000 0000')}
            {inp('Location', personal.location, v => setPersonal(p => ({ ...p, location: v })), 'San Francisco, CA')}
            {inp('LinkedIn', personal.linkedin, v => setPersonal(p => ({ ...p, linkedin: v })), 'linkedin.com/in/janesmith')}
            {inp('Website / Portfolio', personal.website, v => setPersonal(p => ({ ...p, website: v })), 'janesmith.com')}
          </div>
        </Section>

        <Section title="Professional Summary">
          <textarea value={summary} onChange={e => setSummary(e.target.value)}
            placeholder="Results-driven professional with X years of experience in... Proven track record of..."
            style={{ width: '100%', minHeight: '90px', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7 }} />
        </Section>

        {/* Work Experience */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Work Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '12px', border: '1.5px solid #e2e8f0', position: 'relative' }}>
              {experience.length > 1 && (
                <button onClick={() => removeExp(i)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', width: '26px', height: '26px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>×</button>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                {inp('Job Title', exp.title, v => updateExp(i, 'title', v), 'Software Engineer')}
                {inp('Company', exp.company, v => updateExp(i, 'company', v), 'Acme Corp')}
                {inp('Duration', exp.duration, v => updateExp(i, 'duration', v), 'Jan 2022 – Present')}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Key Achievements / Responsibilities</label>
                <textarea value={exp.description} onChange={e => updateExp(i, 'description', e.target.value)}
                  placeholder="• Led development of X, resulting in Y% improvement&#10;• Managed a team of Z engineers"
                  style={{ width: '100%', minHeight: '80px', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
              </div>
            </div>
          ))}
          <button onClick={addExp} style={{ background: 'white', color: '#E85D04', border: '1.5px dashed #E85D04', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            + Add Work Experience
          </button>
        </div>

        {/* Education */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '12px', border: '1.5px solid #e2e8f0', position: 'relative' }}>
              {education.length > 1 && (
                <button onClick={() => removeEdu(i)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', width: '26px', height: '26px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>×</button>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                {inp('Degree / Certification', edu.degree, v => updateEdu(i, 'degree', v), 'B.S. Computer Science')}
                {inp('School / University', edu.school, v => updateEdu(i, 'school', v), 'State University')}
                {inp('Graduation Year', edu.year, v => updateEdu(i, 'year', v), '2022')}
                {inp('GPA (optional)', edu.gpa, v => updateEdu(i, 'gpa', v), '3.8 / 4.0')}
              </div>
            </div>
          ))}
          <button onClick={addEdu} style={{ background: 'white', color: '#E85D04', border: '1.5px dashed #E85D04', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            + Add Education
          </button>
        </div>

        <Section title="Skills">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Skills (comma-separated)</label>
          <textarea value={skills} onChange={e => setSkills(e.target.value)}
            placeholder="JavaScript, React, Python, Project Management, Communication, SQL, AWS..."
            style={{ width: '100%', minHeight: '80px', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
        </Section>

        {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

        <button onClick={download} disabled={loading}
          style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
          {loading ? '⏳ Generating PDF…' : '⬇ Download Resume PDF'}
        </button>

        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Free Professional Resume Builder</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A strong resume is your first impression with potential employers. Our free resume builder lets you create a clean, professionally formatted resume with all the sections hiring managers expect: personal information, professional summary, work experience, education, and skills.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            The work experience section supports multiple entries with achievement-focused descriptions. Use bullet points (•) in your descriptions to list accomplishments clearly. Quantify results where possible — e.g., &quot;Increased sales by 30%&quot; or &quot;Managed a team of 8 engineers.&quot;
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            After building your resume, use our AI Resume Improver to polish your bullet points and professional summary with AI-powered suggestions tailored to your industry. Your resume PDF downloads instantly with no watermarks, no subscription, and no stored data.
          </p>
        </div>
      </div>
    </div>
  )
}
