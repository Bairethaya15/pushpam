import { motion } from 'framer-motion'

export default function DailyComplete({ onGoHome }) {
  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ top: '40%', background: 'radial-gradient(circle, rgba(212,168,67,0.06), transparent 70%)' }} />

      {/* Top spacer */}
      <div className="content-top shrink-0" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center px-8 text-center" style={{ marginTop: -40 }}>

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
          className="flex flex-col items-center gap-2 mt-8">
          <p className="text-xl font-light"
            style={{ color: '#FFF8ED', fontFamily: 'Georgia, serif' }}>
            The divine has spoken today.
          </p>
          <p className="text-sm"
            style={{ color: 'rgba(255,248,237,0.4)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Return tomorrow with a still mind 🙏
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-12 h-px mt-10"
          style={{ background: 'rgba(212,168,67,0.2)' }} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-2 mt-10">
          <p className="text-sm"
            style={{ color: 'rgba(212,168,67,0.5)', fontFamily: 'Georgia, serif' }}>
            Seek guidance whenever your heart calls.
          </p>
          <p className="text-sm"
            style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
            One offering, forever.
          </p>
          <button
            className="mt-4 px-8 py-3.5 rounded-full text-sm tracking-widest transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #E8801A, #C4600C)',
              color: '#FFF8ED',
              fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 24px rgba(232,128,26,0.25)',
            }}>
            Unlock lifetime guidance
          </button>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={onGoHome}
        className="relative z-10 text-xs tracking-widest uppercase safe-bottom pb-2 shrink-0"
        style={{ color: 'rgba(255,248,237,0.15)' }}>
        Return home
      </motion.button>
    </div>
  )
}
