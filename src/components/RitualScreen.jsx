import { useEffect, useRef, useState } from 'react'
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
    // Capture both at mount time so closures below are never stale
    const side = flowerSide
    const done = onComplete

    const timings = {
      bell: 1800,
      mantra: 2000,
      stillness: 1500,
      flower: 2800,
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
          // Pass side back so App doesn't need to read stale state
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
    <div className="relative h-full w-full flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #4A2C1A 0%, #3D0F18 50%, #1a0a0e 100%)' }}>

      {/* Bell step */}
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
              className="text-7xl select-none">
              🔔
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#D4A84380' }}>
              The divine is called
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mantra step */}
      <AnimatePresence>
        {step === 'mantra' && (
          <motion.div
            key="mantra"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="absolute flex flex-col items-center gap-4 px-8 text-center">
            <div className="text-3xl" style={{ color: '#D4A843', fontFamily: 'serif', textShadow: '0 0 20px #D4A84360' }}>
              {mantra}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stillness step */}
      <AnimatePresence>
        {step === 'stillness' && (
          <motion.div
            key="stillness"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute flex flex-col items-center gap-6">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl select-none"
              style={{ textShadow: '0 0 40px #D4A84360' }}>
              ॐ
            </motion.div>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#D4A84360' }}>
              The divine listens...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower fall step */}
      <AnimatePresence>
        {(step === 'flower' || step === 'done') && flowerSide && (
          <motion.div key="flower" className="absolute inset-0 flex items-start justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl select-none"
                style={{ textShadow: '0 0 60px #D4A84340' }}>
                ॐ
              </motion.div>
            </div>

            <motion.div
              initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: '85vh',
                x: flowerSide === 'left' ? '-100px' : '100px',
                rotate: flowerSide === 'left' ? -180 : 180,
                opacity: [1, 1, 1, 0.8],
              }}
              transition={{ duration: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 text-4xl select-none mt-8"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,168,67,0.6))' }}>
              🌸
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
