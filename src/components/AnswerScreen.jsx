import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getAnswerPhrase } from '../utils/answerPhrases'
import { getRemainingAsks } from '../utils/askLimit'

export default function AnswerScreen({ answer, onAskAgain }) {
  const phrase = useMemo(() => getAnswerPhrase(answer), [answer])
  const remaining = getRemainingAsks()
  const isYes = answer === 'yes'
  const accent = isYes ? '#7ECA9C' : '#E88D8D'

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ top: '45%', background: `radial-gradient(circle, ${isYes ? 'rgba(126,202,156,0.1)' : 'rgba(232,141,141,0.1)'}, transparent 70%)` }} />

      {/* ── Header ── */}
      <div className="screen-header">
        <div className="screen-header-title">पुष्पम्</div>
        <div className="screen-header-sub">Ask the Divine</div>
      </div>

      {/* ── Centered answer — same generous spacing as DailyComplete ── */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center px-8 text-center">

        {/* Flower */}
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}>
          <div className="text-5xl select-none" style={{ filter: `drop-shadow(0 0 14px ${accent})` }}>🌸</div>
        </motion.div>

        {/* Direction — paired with flower */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 text-sm tracking-[0.15em] mt-4"
          style={{ color: `${accent}70` }}>
          {isYes
            ? <><span>—</span><span className="uppercase">The flower fell right</span><span>→</span></>
            : <><span>←</span><span className="uppercase">The flower fell left</span><span>—</span></>}
        </motion.div>

        {/* Main answer — big gap, the reveal */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl font-light mt-8"
          style={{ color: accent, fontFamily: 'Georgia, serif', textShadow: `0 0 20px ${accent}40` }}>
          {phrase.main}
        </motion.div>

        {/* Sub message */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base tracking-wide mt-3"
          style={{ color: 'rgba(255,248,237,0.35)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          {phrase.sub}
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-16 mt-10"
          style={{ height: '1px', background: 'rgba(212,168,67,0.3)' }} />

        {/* Action section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col items-center gap-4 mt-8">

          {remaining > 0 ? (
            <>
              <button onClick={onAskAgain}
                className="px-14 py-4 rounded-full text-base tracking-wider"
                style={{ background: 'rgba(255,248,237,0.06)', border: `1px solid ${accent}25`, color: accent, fontFamily: 'Georgia, serif' }}>
                Ask again
              </button>
              <button
                className="text-sm tracking-widest"
                style={{ color: 'rgba(255,248,237,0.2)', fontFamily: 'Georgia, serif' }}
                onClick={() => {
                  const text = `🌺 पुष्पम् — Ask the Divine\n"Seek your answer from the divine. One question. One flower. One truth."\npushpam.in`
                  if (navigator.share) { navigator.share({ text }) } else { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank') }
                }}>
                Help someone seek their answer too 🌺
              </button>
            </>
          ) : (
            <>
              <p className="text-base" style={{ color: 'rgba(212,168,67,0.5)', fontFamily: 'Georgia, serif' }}>
                Seek guidance whenever your heart calls.</p>
              <p className="text-base font-medium" style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
                One offering, forever.</p>
              <button
                className="mt-3 px-12 py-4 rounded-full text-base tracking-wider"
                style={{ background: 'linear-gradient(135deg, #E8801A, #C4600C)', border: '1px solid rgba(212,168,67,0.5)', color: '#FFF8ED', fontFamily: 'Georgia, serif', boxShadow: '0 4px 20px rgba(232,128,26,0.25)' }}>
                Seek lifetime guidance 🪷
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
