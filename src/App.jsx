import { useState, useCallback } from 'react'
import HomeScreen from './components/HomeScreen'
import RitualScreen from './components/RitualScreen'
import AnswerScreen from './components/AnswerScreen'
import DailyComplete from './components/DailyComplete'
import { canAsk, recordAsk } from './utils/askLimit'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [_question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null) // 'yes' | 'no'
  const [flowerSide, setFlowerSide] = useState(null) // 'left' | 'right'

  function handlePray(q) {
    if (!canAsk()) {
      setScreen('daily-complete')
      return
    }
    // Decide the outcome here — once, before the ritual starts
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
