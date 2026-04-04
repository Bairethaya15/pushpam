const yesAnswers = [
  { main: 'हाँ — Yes', sub: 'The flower blesses your right side' },
  { main: 'हाँ — The path is open', sub: 'Trust what you feel' },
  { main: 'हाँ — Proceed with faith', sub: 'The signal is clear' },
  { main: 'हाँ — Trust this feeling', sub: 'Walk this path with confidence' },
  { main: 'हाँ — The time is right', sub: 'What is meant for you will not pass you' },
  { main: 'हाँ — Move forward', sub: 'The divine walks with you' },
]

const noAnswers = [
  { main: 'नहीं — Not now', sub: 'Patience reveals the way' },
  { main: 'नहीं — Wait', sub: 'Stillness is also an answer' },
  { main: 'नहीं — Let this pass', sub: 'Not every closed door is denial' },
  { main: 'नहीं — Be still', sub: 'What waits for you is worth the wait' },
  { main: 'नहीं — The time will come', sub: 'The divine protects through delay' },
  { main: 'नहीं — Trust the delay', sub: 'Rest in this moment' },
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getAnswerPhrase(answer) {
  return answer === 'yes' ? pick(yesAnswers) : pick(noAnswers)
}
