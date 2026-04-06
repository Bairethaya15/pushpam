import { motion } from 'framer-motion'
import lotusIcon from '../assets/lotus.svg'

export default function DailyComplete({ onGoHome }) {
  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      {/* ── Header ── */}
      <div className="screen-header">
        <div className="screen-header-title">पुष्पम्</div>
        <div className="screen-header-sub">Ask the Divine</div>
      </div>

      {/* ── Message (centered) ── */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center px-8 text-center">

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}>
          <img src={lotusIcon} alt="" className="w-20 h-20 select-none" draggable={false} /></motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col items-center gap-2 mt-8">
          <p className="text-xl font-light" style={{ color: '#FFF8ED' }}>
            The divine has spoken today.</p>
          <p className="text-base" style={{ color: 'rgba(255,248,237,0.4)', fontStyle: 'italic' }}>
            Return tomorrow with a still mind 🙏</p>
        </motion.div>
      </div>

      {/* ── Upsell (pinned lower) ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 flex flex-col items-center gap-2 px-8 text-center safe-bottom shrink-0">

        <div className="w-12 h-px mb-4" style={{ background: 'rgba(212,168,67,0.2)' }} />

        <p className="text-base" style={{ color: 'rgba(212,168,67,0.5)' }}>
          Seek guidance whenever your heart calls.</p>
        <p className="text-base font-medium" style={{ color: '#D4A843' }}>
          One offering, forever.</p>
        <button className="mt-3 w-72 py-4 rounded-full text-base tracking-wider"
          style={{ background: 'linear-gradient(135deg, #E8801A, #C4600C)', color: '#FFF8ED', boxShadow: '0 4px 20px rgba(232,128,26,0.25)' }}>
          Unlock lifetime guidance
        </button>

        <button
          onClick={onGoHome}
          className="text-sm tracking-wider uppercase mt-4 mb-2"
          style={{ color: 'rgba(255,248,237,0.2)' }}>
          Return home
        </button>
      </motion.div>
    </div>
  )
}
