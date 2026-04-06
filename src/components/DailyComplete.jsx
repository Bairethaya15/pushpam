import { motion } from 'framer-motion'

export default function DailyComplete({ onGoHome }) {
  return (
    <div className="relative h-full w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #3D0F18 0%, #1a0a0e 100%)' }}>

      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08), transparent 70%)' }} />

      {/* Top spacing — matches other screens */}
      <div className="safe-top shrink-0" style={{ paddingBottom: 32 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-8 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl select-none mt-16">
          🪷
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-3 mt-10">
          <p className="text-xl font-light leading-relaxed"
            style={{ color: '#FFF8ED', fontFamily: 'Georgia, serif' }}>
            The divine has spoken today.
          </p>
          <p className="text-base leading-relaxed"
            style={{ color: '#FFF8ED60', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Return tomorrow with a still mind 🙏
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-px mt-10"
          style={{ background: 'rgba(212,168,67,0.25)' }} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-3 mt-10">
          <p className="text-sm leading-relaxed"
            style={{ color: '#D4A84380', fontFamily: 'Georgia, serif' }}>
            Seek guidance whenever your heart calls.
          </p>
          <p className="text-sm"
            style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
            One offering, forever.
          </p>
          <button
            className="mt-3 px-8 py-3.5 rounded-full text-sm tracking-widest transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #E8801A, #C4600C)',
              color: '#FFF8ED',
              fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 24px rgba(232,128,26,0.3)',
            }}>
            Unlock lifetime guidance
          </button>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={onGoHome}
          className="text-xs tracking-widest uppercase safe-bottom pb-2"
          style={{ color: '#FFF8ED25' }}>
          Return home
        </motion.button>
      </div>
    </div>
  )
}
