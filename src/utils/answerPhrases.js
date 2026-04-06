const yesAnswers = [
  { main: 'तथास्तु — So be it', sub: 'The flower blesses the divine\'s right' },
  { main: 'आम् — The path is open', sub: 'Trust what you feel' },
  { main: 'तथास्तु — Proceed with faith', sub: 'The signal is clear' },
  { main: 'आम् — Trust this feeling', sub: 'Walk this path with confidence' },
  { main: 'तथास्तु — The time is right', sub: 'What is meant for you will not pass you' },
  { main: 'आम् — Move forward', sub: 'The divine walks with you' },
]

const noAnswers = [
  { main: 'नैव — Not now', sub: 'Patience reveals the way' },
  { main: 'नैव — Wait', sub: 'Stillness is also an answer' },
  { main: 'नैव — Let this pass', sub: 'Not every closed door is denial' },
  { main: 'नैव — Be still', sub: 'What waits for you is worth the wait' },
  { main: 'नैव — The time will come', sub: 'The divine protects through delay' },
  { main: 'नैव — Trust the delay', sub: 'Rest in this moment' },
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getAnswerPhrase(answer) {
  return answer === 'yes' ? pick(yesAnswers) : pick(noAnswers)
}
