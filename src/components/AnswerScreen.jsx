import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getAnswerPhrase } from '../utils/answerPhrases'
import { haptic } from '../utils/haptic'
import flowerIcon from '../assets/flower.svg'

export default function AnswerScreen({ answer, onAskAgain }) {
  const phrase = useMemo(() => getAnswerPhrase(answer), [answer])
  const isYes = answer === 'yes'
  const accent = isYes ? '#7ECA9C' : '#E88D8D'

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ top: '40%', background: `radial-gradient(circle, ${isYes ? 'rgba(126,202,156,0.1)' : 'rgba(232,141,141,0.1)'}, transparent 70%)` }} />

      {/* ── Header ── */}
      <div className="screen-header">
        <div className="screen-header-title">पुष्पम्</div>
        <div className="screen-header-sub">Ask the Divine</div>
      </div>

      {/* ── The Answer (centered) ── */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center px-8 text-center">

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}>
          <img src={flowerIcon} alt="" className="w-20 h-20 select-none" draggable={false}
            style={{ filter: `drop-shadow(0 0 10px ${accent}80)` }} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 text-sm tracking-[0.15em] mt-4"
          style={{ color: `${accent}70` }}>
          {isYes
            ? <><span>—</span><span className="uppercase">The flower fell right</span><span>→</span></>
            : <><span>←</span><span className="uppercase">The flower fell left</span><span>—</span></>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl font-light mt-8"
          style={{ color: accent, textShadow: `0 0 20px ${accent}40` }}>
          {phrase.main}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base tracking-wide mt-3"
          style={{ color: 'rgba(255,248,237,0.35)', fontStyle: 'italic' }}>
          {phrase.sub}
        </motion.div>
      </div>

      {/* ── Bottom actions ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative z-10 flex flex-col items-center gap-4 w-full px-6 safe-bottom pb-2 shrink-0">

        <button onClick={() => { haptic('light'); onAskAgain() }}
          className="w-64 py-4 rounded-full text-base tracking-wider"
          style={{ background: 'rgba(255,248,237,0.06)', border: `1px solid ${accent}25`, color: accent }}>
          Ask again
        </button>

        <button
          className="text-sm tracking-wider"
          style={{ color: 'rgba(255,248,237,0.2)' }}
          onClick={() => {
            const text = `🌺 पुष्पम् — Ask the Divine\n"Seek your answer from the divine. One question. One flower. One truth."\npushpam.in`
            if (navigator.share) { navigator.share({ text }) } else { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank') }
          }}>
          Help someone seek their answer too 🌺
        </button>
      </motion.div>
    </div>
  )
}
