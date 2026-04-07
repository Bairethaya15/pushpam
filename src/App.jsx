import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomeScreen from './components/HomeScreen'
import RitualScreen from './components/RitualScreen'
import AnswerScreen from './components/AnswerScreen'
import DailyComplete from './components/DailyComplete'
import { canAsk, recordAsk } from './utils/askLimit'


export default function App() {
  const [screen, setScreen] = useState('home')
  const [_question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [flowerSide, setFlowerSide] = useState(null)

  function handlePray(q, tapMs) {
    if (!canAsk()) {
      setScreen('daily-complete')
      return
    }
    // The exact millisecond your finger touched the screen
    // Odd = yes (deity's right), even = no (deity's left)
    const side = (tapMs & 1) === 1 ? 'left' : 'right'
    setQuestion(q)
    setFlowerSide(side)
    setScreen('ritual')
  }

  const handleRitualComplete = useCallback((side) => {
    // Deity's right (screen left) = yes
    const result = side === 'left' ? 'yes' : 'no'
    recordAsk()
    setAnswer(result)
    setScreen('answer')
  }, [])

  function handleAskAgain() {
    if (!canAsk()) {
      setScreen('daily-complete')
      return
    }
    setQuestion('')
    setAnswer(null)
    setFlowerSide(null)
    setScreen('home')
  }

  function handleGoHome() {
    setQuestion('')
    setAnswer(null)
    setFlowerSide(null)
    setScreen('home')
  }

  function renderScreen() {
    switch (screen) {
      case 'home':
        return <HomeScreen onPray={handlePray} />
      case 'ritual':
        return <RitualScreen flowerSide={flowerSide} onComplete={handleRitualComplete} />
      case 'answer':
        return <AnswerScreen answer={answer} onAskAgain={handleAskAgain} />
      case 'daily-complete':
        return <DailyComplete onGoHome={handleGoHome} />
    }
  }

  return (
    <div className="app-shell">
      <AnimatePresence>
        <motion.div
          key={screen}
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
