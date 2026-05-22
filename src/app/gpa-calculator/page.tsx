'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
}

interface Course { id: number; name: string; credits: string; grade: string }

let nextId = 1

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: nextId++, name: 'Calculus I', credits: '4', grade: 'A' },
    { id: nextId++, name: 'English 101', credits: '3', grade: 'B+' },
    { id: nextId++, name: 'Chemistry', credits: '4', grade: 'A-' },
  ])

  function addCourse() {
    setCourses(prev => [...prev, { id: nextId++, name: '', credits: '3', grade: 'A' }])
  }

  function removeCourse(id: number) {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  function update(id: number, field: keyof Course, value: string) {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const validCourses = courses.filter(c => c.name && parseFloat(c.credits) > 0)
  const totalCredits = validCourses.reduce((sum, c) => sum + parseFloat(c.credits), 0)
  const weightedSum = validCourses.reduce((sum, c) => sum + parseFloat(c.credits) * (GRADE_POINTS[c.grade] ?? 0), 0)
  const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0

  const gpaColor = gpa >= 3.7 ? '#16A34A' : gpa >= 3.0 ? '#0284C7' : gpa >= 2.0 ? '#D97706' : '#DC2626'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎓</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>GPA Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate your GPA from course grades and credit hours</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* GPA Display */}
        {totalCredits > 0 && (
          <div style={{ background: '#0F2A4A', borderRadius: '14px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Current GPA</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '48px', fontWeight: 800, color: gpaColor }}>{gpa.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Total Credits</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{totalCredits}</div>
            </div>
          </div>
        )}

        {/* Courses Table */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ background: '#0F2A4A', padding: '10px 16px', display: 'grid', gridTemplateColumns: '1fr 100px 120px 48px', gap: '12px' }}>
            {['Course Name', 'Credits', 'Grade', ''].map(h => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {courses.map(course => (
            <div key={course.id} style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: '1fr 100px 120px 48px', gap: '12px', alignItems: 'center', borderTop: '1px solid #e2e8f0', background: 'white' }}>
              <input value={course.name} onChange={e => update(course.id, 'name', e.target.value)}
                placeholder="Course name"
                style={{ padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
              <input type="number" value={course.credits} onChange={e => update(course.id, 'credits', e.target.value)}
                style={{ padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
              <select value={course.grade} onChange={e => update(course.id, 'grade', e.target.value)}
                style={{ padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white', width: '100%', boxSizing: 'border-box' as const }}>
                {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>)}
              </select>
              <button onClick={() => removeCourse(course.id)}
                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '8px', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          ))}
        </div>

        <button onClick={addCourse}
          style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Add Course
        </button>

        {/* Grade reference */}
        <div style={{ marginTop: '32px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Grade Point Reference</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(GRADE_POINTS).map(([grade, pts]) => (
              <div key={grade} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 600, color: '#0F2A4A' }}>
                {grade} = {pts.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
