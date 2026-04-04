const KEY = 'pushpam_asks'
const MAX_ASKS = 2

function getTodayIST() {
  const now = new Date()
  // IST = UTC+5:30
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000))
  return ist.toISOString().slice(0, 10) // YYYY-MM-DD
}

function getState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { date: null, count: 0 }
    return JSON.parse(raw)
  } catch {
    return { date: null, count: 0 }
  }
}

function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function canAsk() {
  const today = getTodayIST()
  const state = getState()
  if (state.date !== today) return true
  return state.count < MAX_ASKS
}

export function recordAsk() {
  const today = getTodayIST()
  const state = getState()
  if (state.date !== today) {
    saveState({ date: today, count: 1 })
  } else {
    saveState({ date: today, count: state.count + 1 })
  }
}

export function getRemainingAsks() {
  const today = getTodayIST()
  const state = getState()
  if (state.date !== today) return MAX_ASKS
  return Math.max(0, MAX_ASKS - state.count)
}
