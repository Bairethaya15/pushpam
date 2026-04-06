import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playBell } from '../utils/audio'

const mantras = ['ॐ गं गणपतये नमः', 'ॐ नमः शिवाय', 'ॐ श्री लक्ष्म्यै नमः']

export default function RitualScreen({ flowerSide, onComplete }) {
  const [step, setStep] = useState('bell')
  const [mantra] = useState(() => mantras[Math.floor(Math.random() * mantras.length)])

  // Play bell sound when bell step starts
  useEffect(() => {
    if (step === 'bell') playBell()
  }, [step])

  useEffect(() => {
    const side = flowerSide
    const done = onComplete
    const timings = { bell: 1800, mantra: 2000, stillness: 1500, flower: 3600 }
    let current = 'bell'
    const sequence = ['bell', 'mantra', 'stillness', 'flower', 'done']
    const timeouts = []
    const next = () => {
      const idx = sequence.indexOf(current)
      if (idx < sequence.length - 1) {
        current = sequence[idx + 1]
        setStep(current)
        if (current !== 'done') timeouts.push(setTimeout(next, timings[current] || 1000))
        else timeouts.push(setTimeout(() => done(side), 400))
      }
    }
    timeouts.push(setTimeout(next, timings.bell))
    return () => timeouts.forEach(clearTimeout)
  }, [flowerSide, onComplete])

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #4A2C1A 0%, #3D0F18 50%, #1a0a0e 100%)' }}>

      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ top: '8%', background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)' }} />

      {/* Sparks */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} className="spark" style={{
          left: `${15 + i * 12}%`, top: `${25 + (i % 3) * 15}%`,
          animationDelay: `${i * 0.8}s`, animationDuration: `${3 + i * 0.6}s`,
        }} />
      ))}

      {/* ── Header ── */}
      <div className="screen-header">
        <div className="screen-header-title">पुष्पम्</div>
        <div className="screen-header-sub">Ask the Divine</div>
      </div>

      {/* ── Deity Frame ── */}
      <div className="relative z-10 shrink-0 flex flex-col items-center">
        <div className="deity-wrapper relative">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="deity-frame deity-frame-glow w-full h-full flex items-center justify-center">
            <div className="deity-om select-none" style={{
              color: '#D4A843',
              textShadow: '0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.15)',
              fontFamily: "'Tiro Devanagari Hindi', serif", lineHeight: 1,
            }}>ॐ</div>
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="smoke-particle" /><div className="smoke-particle" /><div className="smoke-particle" />
            </div>
          </motion.div>
          <div className="absolute -left-5 bottom-0 diya-container"><div className="diya-flame" /><div className="diya-base" /></div>
          <div className="absolute -right-5 bottom-0 diya-container"><div className="diya-flame diya-flame-delayed" /><div className="diya-base" /></div>

          <AnimatePresence>
            {(step === 'flower' || step === 'done') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-7 left-0 right-0 flex justify-between px-1">
                <span className="text-sm tracking-[0.15em] uppercase" style={{ color: 'rgba(232,141,141,0.4)' }}>✕ नहीं</span>
                <span className="text-sm tracking-[0.15em] uppercase" style={{ color: 'rgba(126,202,156,0.4)' }}>हाँ ✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Ritual text ── */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <AnimatePresence>
          {step === 'bell' && (
            <motion.div key="bell" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              className="absolute flex flex-col items-center gap-4">
              <motion.div animate={{ rotate: [-12, 12, -12] }}
                transition={{ duration: 0.5, repeat: 3, ease: 'easeInOut' }}
                className="text-6xl select-none">🔔</motion.div>
              <p className="text-sm tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,67,0.4)' }}>
                The divine is called</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 'mantra' && (
            <motion.div key="mantra" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}
              className="absolute px-8 text-center">
              <div className="text-3xl" style={{
                color: '#D4A843', fontFamily: "'Tiro Devanagari Hindi', serif",
                textShadow: '0 0 20px rgba(212,168,67,0.5), 0 0 40px rgba(212,168,67,0.2)',
              }}>{mantra}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 'stillness' && (
            <motion.div key="stillness" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute">
              <p className="text-lg tracking-wide" style={{ color: 'rgba(212,168,67,0.4)' }}>
                The divine listens...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Flower ── */}
      {(step === 'flower' || step === 'done') && flowerSide && (
        <div className="absolute z-10 text-4xl select-none"
          style={{
            top: '42%', left: '50%', marginLeft: '-18px',
            filter: 'drop-shadow(0 0 12px rgba(212,168,67,0.7))',
            animation: `flower-fall-${flowerSide} 3s ease-in forwards`,
          }}>🌸</div>
      )}
    </div>
  )
}
