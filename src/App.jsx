import { useState, useCallback } from 'react'
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

  function handlePray(q) {
    if (!canAsk()) {
      setScreen('daily-complete')
      return
    }
    const side = Math.random() < 0.5 ? 'left' : 'right'
    setQuestion(q)
    setFlowerSide(side)
    setScreen('ritual')
  }

  const handleRitualComplete = useCallback((side) => {
    const result = side === 'right' ? 'yes' : 'no'
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

  return (
    <div className="app-shell">
      {/* Persistent header — always visible */}
      <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center safe-top pointer-events-none">
        <div
          className="text-3xl font-light tracking-widest"
          style={{ color: '#D4A843', fontFamily: 'Georgia, serif' }}>
          पुष्पम्
        </div>
        <div
          className="text-[10px] tracking-[0.3em] uppercase mt-1"
          style={{ color: '#D4A84366' }}>
          Ask the Divine
        </div>
      </div>

      {screen === 'home' && (
        <HomeScreen onPray={handlePray} />
      )}
      {screen === 'ritual' && (
        <RitualScreen flowerSide={flowerSide} onComplete={handleRitualComplete} />
      )}
      {screen === 'answer' && (
        <AnswerScreen answer={answer} onAskAgain={handleAskAgain} />
      )}
      {screen === 'daily-complete' && (
        <DailyComplete onGoHome={handleGoHome} />
      )}
    </div>
  )
}
