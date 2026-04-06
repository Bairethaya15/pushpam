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
    <div
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #6B1D2A 0%, #3D0F18 50%, #1a0a0e 100%)' }}>

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-72 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,128,26,0.1) 0%, transparent 70%)' }} />

      {/* Floating sparks */}
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="spark"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 10}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        />
      ))}

      {/* Top spacing — clears the persistent header */}
      <div className="safe-top shrink-0" style={{ paddingBottom: 32 }} />

      {/* Deity frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center shrink-0">

        <div className="relative" style={{ width: 200, height: 240 }}>

          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="deity-frame deity-frame-glow w-full h-full flex items-center justify-center">

            <div
              className="text-8xl select-none"
              style={{
                color: '#D4A843',
                textShadow: '0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.15)',
                fontFamily: 'serif',
                lineHeight: 1,
              }}>
              ॐ
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2" style={{ pointerEvents: 'none' }}>
              <div className="smoke-particle" />
              <div className="smoke-particle" />
              <div className="smoke-particle" />
            </div>
          </motion.div>

          <div className="absolute -left-6 bottom-0 diya-container">
            <div className="diya-flame" />
            <div className="diya-base" />
          </div>
          <div className="absolute -right-6 bottom-0 diya-container">
            <div className="diya-flame diya-flame-delayed" />
            <div className="diya-base" />
          </div>
        </div>

        {/* नहीं / हाँ labels */}
        <div className="flex justify-between mt-6" style={{ width: 200 }}>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,141,141,0.4)' }}>✕ नहीं</span>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(126,202,156,0.4)' }}>हाँ ✓</span>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Question input + button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 w-full px-8 safe-bottom pt-6 pb-2 flex flex-col gap-4 shrink-0">

        <label
          className="text-[11px] tracking-[0.2em] uppercase text-center"
          style={{ color: '#D4A84350' }}>
          Hold your question in your heart
        </label>

        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          placeholder="What weighs on your heart?"
          rows={2}
          className="w-full resize-none rounded-lg outline-none leading-relaxed text-center"
          style={{
            background: 'rgba(255,248,237,0.05)',
            border: '1px solid rgba(212,168,67,0.15)',
            color: '#FFF8ED',
            fontFamily: 'Georgia, serif',
            caretColor: '#D4A843',
            fontSize: '15px',
            padding: '14px 16px',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!question.trim()}
          className="w-full rounded-full text-base tracking-widest transition-all duration-300 disabled:opacity-30 flex items-center justify-center gap-2"
          style={{
            background: question.trim()
              ? 'linear-gradient(135deg, #E8801A, #C4600C)'
              : 'rgba(232,128,26,0.2)',
            border: question.trim() ? '1px solid rgba(212,168,67,0.5)' : '1px solid transparent',
            color: '#FFF8ED',
            fontFamily: 'Georgia, serif',
            padding: '14px 0',
            boxShadow: question.trim() ? '0 4px 24px rgba(232,128,26,0.3)' : 'none',
          }}>
          🙏 प्रार्थना करें
        </button>
      </motion.div>
    </div>
  )
}
