import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getAnswerPhrase } from '../utils/answerPhrases'
import { getRemainingAsks } from '../utils/askLimit'

export default function AnswerScreen({ answer, onAskAgain }) {
  const phrase = useMemo(() => getAnswerPhrase(answer), [answer])
  const remaining = getRemainingAsks()
  const isYes = answer === 'yes'

  const accentColor = isYes ? '#7ECA9C' : '#E88D8D'
  const glowColor = isYes ? 'rgba(126,202,156,0.15)' : 'rgba(232,141,141,0.15)'

  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      {/* Answer glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }} />

      {/* Answer reveal burst */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full answer-burst"
        style={{ background: `radial-gradient(circle, ${isYes ? 'rgba(126,202,156,0.3)' : 'rgba(232,141,141,0.3)'}, transparent 70%)` }} />

      {/* Top spacing — matches other screens */}
      <div className="safe-top shrink-0" style={{ paddingBottom: 32 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-8 text-center">

        {/* Flower icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-8">
          <div className="text-5xl select-none" style={{ filter: `drop-shadow(0 0 12px ${accentColor})` }}>
            🌸
          </div>
        </motion.div>

        {/* Direction indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-3 text-xs tracking-widest mt-6"
          style={{ color: `${accentColor}80` }}>
          {isYes ? (
            <>
              <span>—</span>
              <span className="uppercase">The flower fell right</span>
              <span>→</span>
            </>
          ) : (
            <>
              <span>←</span>
              <span className="uppercase">The flower fell left</span>
              <span>—</span>
            </>
          )}
        </motion.div>

        {/* Main answer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl font-light mt-8"
          style={{ color: accentColor, fontFamily: 'Georgia, serif', textShadow: `0 0 20px ${accentColor}50` }}>
          {phrase.main}
        </motion.div>

        {/* Sub message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm tracking-wide mt-4"
          style={{ color: '#FFF8ED60', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          {phrase.sub}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-16 h-px mt-10"
          style={{ background: `${accentColor}30` }} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col items-center gap-3 w-full safe-bottom pb-2">

          {remaining > 0 ? (
            <button
              onClick={onAskAgain}
              className="w-full py-3.5 rounded-full text-sm tracking-widest transition-all duration-300"
              style={{
                background: 'rgba(255,248,237,0.05)',
                border: '1px solid rgba(212,168,67,0.2)',
                color: '#D4A843',
                fontFamily: 'Georgia, serif',
              }}>
              Ask again
            </button>
          ) : (
            <div className="flex flex-col items-center gap-1 py-3">
              <p className="text-sm" style={{ color: '#FFF8ED60', fontFamily: 'Georgia, serif' }}>
                The divine has spoken today.
              </p>
              <p className="text-xs" style={{ color: '#FFF8ED30', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                Return tomorrow with a still mind 🙏
              </p>
            </div>
          )}

          <button
            className="w-full py-3.5 rounded-full text-sm tracking-widest"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,248,237,0.08)',
              color: '#FFF8ED40',
              fontFamily: 'Georgia, serif',
            }}
            onClick={() => {
              const text = `🌺 पुष्पम् — Ask the Divine\n"Seek your answer from the divine. One question. One flower. One truth."\npushpam.in`
              if (navigator.share) {
                navigator.share({ text })
              } else {
                const url = `https://wa.me/?text=${encodeURIComponent(text)}`
                window.open(url, '_blank')
              }
            }}>
            Help someone seek their answer too 🌺
          </button>
        </motion.div>
      </div>
    </div>
  )
}
