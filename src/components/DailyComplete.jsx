import { motion } from 'framer-motion'

export default function DailyComplete({ onGoHome }) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08), transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center safe-top safe-bottom">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl select-none">
          🪷
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-3">
          <p className="text-xl font-light leading-relaxed"
            style={{ color: '#FFF8ED', fontFamily: 'Georgia, serif' }}>
            The divine has spoken today.
          </p>
          <p className="text-base leading-relaxed"
            style={{ color: '#FFF8ED80', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Return tomorrow with a still mind 🙏
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-px"
          style={{ background: 'rgba(212,168,67,0.3)' }} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-2">
          <p className="text-sm leading-relaxed"
            style={{ color: '#D4A84399', fontFamily: 'Georgia, serif' }}>
            Seek guidance whenever your heart calls.
          </p>
          <p className="text-sm"
            style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
            One offering, forever.
          </p>
          <button
            className="mt-2 px-8 py-3 rounded-lg text-sm tracking-widest transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #E8801A, #C4600C)',
              color: '#FFF8ED',
              fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 20px rgba(232,128,26,0.3)',
            }}>
            Unlock lifetime guidance
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={onGoHome}
          className="text-xs tracking-widest uppercase"
          style={{ color: '#FFF8ED30' }}>
          Return home
        </motion.button>
      </div>
    </div>
  )
}
