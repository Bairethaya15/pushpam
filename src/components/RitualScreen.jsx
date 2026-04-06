import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mantras = [
  'ॐ गं गणपतये नमः',
  'ॐ नमः शिवाय',
  'ॐ श्री लक्ष्म्यै नमः',
]

export default function RitualScreen({ flowerSide, onComplete }) {
  const [step, setStep] = useState('bell')
  const [mantra] = useState(() => mantras[Math.floor(Math.random() * mantras.length)])

  useEffect(() => {
    const side = flowerSide
    const done = onComplete

    const timings = {
      bell: 1800,
      mantra: 2000,
      stillness: 1500,
      flower: 3600,
    }

    let current = 'bell'
    const sequence = ['bell', 'mantra', 'stillness', 'flower', 'done']
    const timeouts = []

    const next = () => {
      const idx = sequence.indexOf(current)
      if (idx < sequence.length - 1) {
        current = sequence[idx + 1]
        setStep(current)
        if (current !== 'done') {
          const t = setTimeout(next, timings[current] || 1000)
          timeouts.push(t)
        } else {
          const t = setTimeout(() => done(side), 400)
          timeouts.push(t)
        }
      }
    }

    const t = setTimeout(next, timings.bell)
    timeouts.push(t)

    return () => timeouts.forEach(clearTimeout)
  }, [flowerSide, onComplete])

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #4A2C1A 0%, #3D0F18 50%, #1a0a0e 100%)' }}>

      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ top: '10%', background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)' }} />

      {/* Floating sparks */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="spark"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.6}s`,
          }}
        />
      ))}

      {/* Header clearance */}
      <div className="content-top shrink-0" />

      {/* ── Deity Frame — same as HomeScreen ── */}
      <div className="relative z-10 shrink-0 flex flex-col items-center">
        <div className="deity-wrapper relative">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="deity-frame deity-frame-glow w-full h-full flex items-center justify-center">
            <div className="deity-om select-none"
              style={{
                color: '#D4A843',
                textShadow: '0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.15)',
                fontFamily: 'serif',
                lineHeight: 1,
              }}>
              ॐ
            </div>
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="smoke-particle" />
              <div className="smoke-particle" />
              <div className="smoke-particle" />
            </div>
          </motion.div>

          {/* Diyas */}
          <div className="absolute -left-5 bottom-0 diya-container">
            <div className="diya-flame" />
            <div className="diya-base" />
          </div>
          <div className="absolute -right-5 bottom-0 diya-container">
            <div className="diya-flame diya-flame-delayed" />
            <div className="diya-base" />
          </div>

          {/* Side labels during flower */}
          <AnimatePresence>
            {(step === 'flower' || step === 'done') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="deity-wrapper absolute -bottom-6 left-0 right-0 flex justify-between px-1">
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(232,141,141,0.45)' }}>✕ नहीं</span>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(126,202,156,0.45)' }}>हाँ ✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Ritual text below deity ── */}
      <div className="relative flex-1 w-full flex items-start justify-center pt-10">

        <AnimatePresence>
          {step === 'bell' && (
            <motion.div
              key="bell"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: [-12, 12, -12] }}
                transition={{ duration: 0.5, repeat: 3, ease: 'easeInOut' }}
                className="text-5xl select-none">
                🔔
              </motion.div>
              <p className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(212,168,67,0.35)' }}>
                The divine is called
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === 'mantra' && (
            <motion.div
              key="mantra"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="absolute flex flex-col items-center px-8 text-center">
              <div className="text-xl" style={{
                color: '#D4A843',
                fontFamily: 'serif',
                textShadow: '0 0 20px rgba(212,168,67,0.5), 0 0 40px rgba(212,168,67,0.2)',
              }}>
                {mantra}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === 'stillness' && (
            <motion.div
              key="stillness"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute">
              <p className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(212,168,67,0.3)' }}>
                The divine listens...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Flower — starts from center of deity, uses CSS keyframes ── */}
      {(step === 'flower' || step === 'done') && flowerSide && (
        <div
          className="absolute z-10 text-4xl select-none flower-start"
          style={{
            left: '50%',
            marginLeft: '-18px',
            filter: 'drop-shadow(0 0 12px rgba(212,168,67,0.7))',
            animation: `flower-fall-${flowerSide} 3s ease-in forwards`,
          }}>
          🌸
        </div>
      )}
    </div>
  )
}
