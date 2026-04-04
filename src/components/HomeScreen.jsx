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

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A843, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center safe-top pb-4 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl font-light tracking-widest"
          style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
          पुष्पम्
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase mt-1"
          style={{ color: '#D4A84399' }}>
          Ask the Divine
        </motion.div>
      </div>

      {/* Sacred symbol — flex-1 so it fills available space */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-0">

        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center">
          <div
            className="absolute w-56 h-56 rounded-full"
            style={{ background: 'radial-gradient(circle, #D4A84330 0%, transparent 70%)' }} />
          <div
            className="text-9xl select-none"
            style={{ color: '#D4A843', textShadow: '0 0 40px #D4A84360', fontFamily: 'serif' }}>
            ॐ
          </div>
        </motion.div>

        {/* नहीं / हाँ labels */}
        <div className="flex justify-between w-56 mt-6">
          <span className="text-sm tracking-widest" style={{ color: '#E88D8D99' }}>नहीं</span>
          <span className="text-sm tracking-widest" style={{ color: '#7ECA9C99' }}>हाँ</span>
        </div>
      </motion.div>

      {/* Question input + button — fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 w-full px-6 safe-bottom pt-4 flex flex-col gap-3 shrink-0"
        style={{ borderTop: '1px solid rgba(212,168,67,0.08)' }}>

        <label
          className="text-xs tracking-[0.2em] uppercase text-center"
          style={{ color: '#D4A84360' }}>
          Hold your question in your heart
        </label>

        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          placeholder="What weighs on your heart?"
          rows={3}
          className="w-full resize-none rounded-lg outline-none leading-relaxed"
          style={{
            background: 'rgba(255,248,237,0.06)',
            border: '1px solid rgba(212,168,67,0.25)',
            color: '#FFF8ED',
            fontFamily: 'Georgia, serif',
            caretColor: '#D4A843',
            fontSize: '15px',
            padding: '12px 16px',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!question.trim()}
          className="w-full rounded-lg text-lg tracking-widest transition-all duration-300 disabled:opacity-40"
          style={{
            background: question.trim()
              ? 'linear-gradient(135deg, #E8801A, #C4600C)'
              : 'rgba(232,128,26,0.3)',
            color: '#FFF8ED',
            fontFamily: 'Georgia, serif',
            padding: '14px 0',
            boxShadow: question.trim() ? '0 4px 20px rgba(232,128,26,0.35)' : 'none',
          }}>
          प्रार्थना करें
        </button>
      </motion.div>
    </div>
  )
}
