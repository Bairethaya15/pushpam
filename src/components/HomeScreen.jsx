import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HomeScreen({ onPray }) {
  const [question, setQuestion] = useState('')

  function handleSubmit() {
    const q = question.trim()
    if (!q) return
    onPray(q)
  }

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #6B1D2A 0%, #3D0F18 50%, #1a0a0e 100%)' }}>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '120%', height: '35%', background: 'radial-gradient(ellipse, rgba(232,128,26,0.1) 0%, transparent 70%)' }} />

      {/* Sparks */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} className="spark" style={{
          left: `${20 + i * 15}%`, top: `${30 + (i % 3) * 10}%`,
          animationDelay: `${i * 1.1}s`, animationDuration: `${4 + i * 0.5}s`,
        }} />
      ))}

      {/* ── Header ── */}
      <div className="screen-header">
        <div className="screen-header-title">पुष्पम्</div>
        <div className="screen-header-sub">Ask the Divine</div>
      </div>

      {/* ── Deity Frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="relative z-10 shrink-0 flex flex-col items-center">

        <div className="deity-wrapper relative">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="deity-frame deity-frame-glow w-full h-full flex items-center justify-center">
            <div className="deity-om select-none" style={{
              color: '#D4A843',
              textShadow: '0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.15)',
              fontFamily: 'serif', lineHeight: 1,
            }}>ॐ</div>
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="smoke-particle" /><div className="smoke-particle" /><div className="smoke-particle" />
            </div>
          </motion.div>
          <div className="absolute -left-5 bottom-0 diya-container"><div className="diya-flame" /><div className="diya-base" /></div>
          <div className="absolute -right-5 bottom-0 diya-container"><div className="diya-flame diya-flame-delayed" /><div className="diya-base" /></div>

          {/* Labels below diyas */}
          <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-1">
            <span className="text-sm tracking-[0.15em] uppercase" style={{ color: 'rgba(232,141,141,0.3)' }}>✕ नहीं</span>
            <span className="text-sm tracking-[0.15em] uppercase" style={{ color: 'rgba(126,202,156,0.3)' }}>हाँ ✓</span>
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Input ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 w-full px-6 safe-bottom flex flex-col gap-2 shrink-0">

        <label className="text-xs tracking-[0.2em] uppercase text-center"
          style={{ color: 'rgba(212,168,67,0.25)' }}>
          Hold your question in your heart
        </label>

        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          placeholder="What weighs on your heart?"
          rows={1}
          className="w-full resize-none rounded-lg outline-none text-center"
          style={{
            background: 'rgba(255,248,237,0.05)', border: '1px solid rgba(212,168,67,0.15)',
            color: '#FFF8ED', fontFamily: 'Georgia, serif', caretColor: '#D4A843',
            fontSize: '16px', padding: '12px 14px',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!question.trim()}
          className="w-full rounded-full text-base tracking-widest transition-all duration-300 disabled:opacity-30"
          style={{
            background: question.trim() ? 'linear-gradient(135deg, #E8801A, #C4600C)' : 'rgba(232,128,26,0.2)',
            border: question.trim() ? '1px solid rgba(212,168,67,0.5)' : '1px solid transparent',
            color: '#FFF8ED', fontFamily: 'Georgia, serif', padding: '12px 0',
            boxShadow: question.trim() ? '0 4px 24px rgba(232,128,26,0.3)' : 'none',
          }}>
          🙏 प्रार्थना करें
        </button>
      </motion.div>
    </div>
  )
}
