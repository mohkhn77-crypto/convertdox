'use client'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const OTHER_CATS = [
  { label: 'Text Tools', href: '/tools/text' },
  { label: 'Developer Tools', href: '/tools/developer' },
  { label: 'Color Tools', href: '/tools/color' },
  { label: 'Security Tools', href: '/tools/security' },
  { label: 'QR Code Tools', href: '/tools/qr' },
  { label: 'Fun & Decision', href: '/tools/fun' },
] as const

const CALC_TOOLS = [
  {
    title: 'Tip Calculator',
    desc: 'Split bills and calculate tips across any number of people.',
    href: '/tip-calculator',
    features: ['Custom tip percentage', 'Split between any number of people', 'Per-person totals'],
  },
  {
    title: 'BMI Calculator',
    desc: 'Body mass index calculator — metric and imperial units.',
    href: '/bmi-calculator',
    features: ['Metric and imperial modes', 'BMI category classification', 'Healthy weight range'],
  },
  {
    title: 'Percentage Calculator',
    desc: '5 types of percentage calculations in one tool.',
    href: '/percentage-calculator',
    features: ['What is X% of Y?', 'X is what % of Y?', 'Percentage change calculator'],
  },
  {
    title: 'Age Calculator',
    desc: 'Exact age with zodiac sign and next birthday countdown.',
    href: '/age-calculator',
    features: ['Years, months, days breakdown', 'Zodiac sign lookup', 'Days until next birthday'],
  },
  {
    title: 'Discount Calculator',
    desc: 'Find sale price and savings instantly from any discount.',
    href: '/discount-calculator',
    features: ['Original and sale price calc', 'Percentage discount finder', 'Savings amount display'],
  },
  {
    title: 'Unit Converter',
    desc: 'Convert between length, weight, temperature, speed, and more.',
    href: '/unit-converter',
    features: ['20+ unit categories', 'Real-time conversion', 'All common units supported'],
  },
  {
    title: 'Time Zone Converter',
    desc: 'Convert times between any time zones worldwide.',
    href: '/timezone-converter',
    features: ['All world time zones', 'DST-aware conversions', 'Multiple zone comparison'],
  },
  {
    title: 'Date Difference',
    desc: 'Calculate days, weeks, months between any two dates.',
    href: '/date-difference',
    features: ['Days, weeks, months, years', 'Business days option', 'Future date calculator'],
  },
  {
    title: 'Salary Calculator',
    desc: 'Convert hourly to annual salary and vice versa instantly.',
    href: '/salary-calculator',
    features: ['Hourly to annual conversion', 'Monthly and weekly rates', 'Overtime calculation'],
  },
  {
    title: 'GPA Calculator',
    desc: 'Calculate GPA from course grades and credit hours.',
    href: '/gpa-calculator',
    features: ['Add multiple courses', 'Weighted GPA calculation', '4.0 scale support'],
  },
  {
    title: 'Calorie Calculator',
    desc: 'Calculate BMR and TDEE from age, height, weight and activity.',
    href: '/calorie-calculator',
    features: ['BMR using Mifflin-St Jeor', 'Activity level multiplier', 'Weight goal calorie targets'],
  },
  {
    title: 'Pomodoro Timer',
    desc: 'Focus timer with work and break intervals.',
    href: '/pomodoro-timer',
    features: ['25/5 Pomodoro intervals', 'Custom timer lengths', 'Session counter'],
  },
  {
    title: 'Bitrate Calculator',
    desc: 'Calculate bitrate, file size, and recording duration.',
    href: '/bitrate-calculator',
    features: ['Bitrate to file size', 'Duration from file size', 'Video and audio formats'],
  },
  {
    title: 'Aspect Ratio Calculator',
    desc: 'Calculate resolutions and aspect ratios for any screen.',
    href: '/aspect-ratio',
    features: ['Width × height ratio calc', 'Common ratio presets', 'Scale any resolution'],
  },
  {
    title: 'Length Converter',
    desc: 'Convert mm, cm, m, km, ft, inches, miles and more.',
    href: '/length-converter',
    features: ['Metric and imperial', 'Instant conversion', 'All common length units'],
  },
  {
    title: 'Weight Converter',
    desc: 'Convert grams, kg, lbs, oz, stones and more.',
    href: '/weight-converter',
    features: ['Metric and imperial units', 'Real-time conversion', 'Precise decimal output'],
  },
  {
    title: 'Temperature Converter',
    desc: 'Convert between Celsius, Fahrenheit, Kelvin and more.',
    href: '/temperature-converter',
    features: ['Celsius, Fahrenheit, Kelvin', 'Rankine and Réaumur support', 'Instant conversion'],
  },
  {
    title: 'Volume Converter',
    desc: 'Convert ml, litres, cups, gallons, fluid ounces and more.',
    href: '/volume-converter',
    features: ['Metric and imperial volumes', 'Cooking measurement support', 'Instant conversion'],
  },
  {
    title: 'Speed Converter',
    desc: 'Convert mph, km/h, knots, mach and running pace.',
    href: '/speed-converter',
    features: ['mph, km/h, knots', 'Mach number conversion', 'Running pace calculator'],
  },
  {
    title: 'Tax Calculator',
    desc: 'Estimate your income tax for the US, UK, Canada, and Australia with bracket-by-bracket breakdown.',
    href: '/tax-calculator',
    features: ['4 countries', '2026 tax brackets', 'Effective rate'],
  },
  {
    title: 'Investment Calculator',
    desc: 'Project the growth of your investments over time with compound interest and monthly contributions.',
    href: '/investment-calculator',
    features: ['Monthly contributions', 'Year-by-year table', 'Growth chart'],
  },
  {
    title: 'Retirement Calculator',
    desc: 'Project your retirement savings and see if you are on track to meet your financial goals.',
    href: '/retirement-calculator',
    features: ['4% withdrawal rule', 'Employer match', 'Year projections'],
  },
  {
    title: 'Body Fat Calculator',
    desc: 'Calculate body fat percentage using the US Navy method or BMI-based estimation.',
    href: '/body-fat-calculator',
    features: ['Navy & BMI methods', 'Male & female formulas', 'Category chart'],
  },
  {
    title: 'Macro Calculator',
    desc: 'Calculate your daily protein, carb, and fat targets based on your weight, activity, and goals.',
    href: '/macro-calculator',
    features: ['3 macro splits', '5 activity levels', 'Meal breakdown'],
  },
  {
    title: 'Water Intake Calculator',
    desc: 'Calculate your optimal daily water intake based on weight, activity level, and climate.',
    href: '/water-intake',
    features: ['Climate adjustment', 'Pregnancy option', 'Hourly schedule'],
  },
  {
    title: 'Fuel Cost Calculator',
    desc: 'Estimate how much a road trip will cost in fuel, including per-person cost for groups.',
    href: '/fuel-cost',
    features: ['MPG & L/100km', 'Round trip option', 'Per-person cost'],
  },
] as const

export default function CalculatorsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>29 TOOLS</span>
            Calculators &amp; Converters
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 18px' }}>
            Free Online <span style={{ color: '#F48C42' }}>Calculators</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Tip calculators, BMI, loan, percentage, unit converters — everything you need for everyday maths and conversions.
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* Tools grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Calculators &amp; Converters</div>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>All Calculators</h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>29 free calculators and converters for everyday maths and measurements.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {CALC_TOOLS.map(tool => (
            <a key={tool.href} href={tool.href}
              style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{tool.title}</div>
                <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5' }}>{tool.desc}</div>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc' }}>
                {tool.features.map(f => (
                  <li key={f} style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6' }}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E85D04', background: '#FFF7ED', padding: '5px 14px', borderRadius: '999px' }}>Use Tool →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px', textAlign: 'center' }}>Other Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {OTHER_CATS.map(cat => (
              <a key={cat.href} href={cat.href}
                style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#0F2A4A' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
