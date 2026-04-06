const yesAnswers = [
  { main: 'Yes — So be it', sub: 'The flower blesses the divine\'s right' },
  { main: 'Yes — The path is open', sub: 'Trust what you feel' },
  { main: 'Yes — Proceed with faith', sub: 'The signal is clear' },
  { main: 'Yes — Trust this feeling', sub: 'Walk this path with confidence' },
  { main: 'Yes — The time is right', sub: 'What is meant for you will not pass you' },
  { main: 'Yes — Move forward', sub: 'The divine walks with you' },
]

const noAnswers = [
  { main: 'No — Not now', sub: 'Patience reveals the way' },
  { main: 'No — Wait', sub: 'Stillness is also an answer' },
  { main: 'No — Let this pass', sub: 'Not every closed door is denial' },
  { main: 'No — Be still', sub: 'What waits for you is worth the wait' },
  { main: 'No — The time will come', sub: 'The divine protects through delay' },
  { main: 'No — Trust the delay', sub: 'Rest in this moment' },
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getAnswerPhrase(answer) {
  return answer === 'yes' ? pick(yesAnswers) : pick(noAnswers)
}
