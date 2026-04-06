/**
 * Vedic Numerology — root number from the exact moment of prayer
 *
 * Each digit of the date and time is summed and reduced to a
 * single digit (1-9). That digit's planetary ruler influences
 * the Prashna reading.
 *
 * Based on Chaldean/Indian numerological tradition.
 */

/**
 * Reduce any number to a single digit (1-9)
 * 28 → 2+8 = 10 → 1+0 = 1
 */
function reduceToRoot(num) {
  let n = Math.abs(Math.floor(num))
  while (n > 9) {
    let sum = 0
    while (n > 0) {
      sum += n % 10
      n = Math.floor(n / 10)
    }
    n = sum
  }
  return n || 9 // 0 becomes 9 (completion number)
}

/**
 * Calculate the numerological root of an exact moment
 *
 * Uses IST (UTC+5:30) since this is a Vedic/Indian system
 *
 * Date root: sum all digits of DD+MM+YYYY
 * Time root: sum all digits of HH+MM+SS
 * Combined root: reduce(date root + time root)
 */
export function getMomentRoot(date) {
  const ist = new Date(date.getTime() + (5.5 * 60 * 60 * 1000))

  const day = ist.getUTCDate()
  const month = ist.getUTCMonth() + 1
  const year = ist.getUTCFullYear()
  const hours = ist.getUTCHours()
  const minutes = ist.getUTCMinutes()
  const seconds = ist.getUTCSeconds()

  // Sum all digits of the date
  const dateSum = reduceToRoot(day) + reduceToRoot(month) + reduceToRoot(year)
  const dateRoot = reduceToRoot(dateSum)

  // Sum all digits of the time
  const timeSum = reduceToRoot(hours) + reduceToRoot(minutes) + reduceToRoot(seconds)
  const timeRoot = reduceToRoot(timeSum)

  // Combined root
  const combinedRoot = reduceToRoot(dateRoot + timeRoot)

  return {
    dateRoot,
    timeRoot,
    root: combinedRoot,
  }
}

/**
 * Planetary ruler of each root number (1-9)
 *
 * 1 = Sun (Surya)       — neutral, authority
 * 2 = Moon (Chandra)     — benefic, mind
 * 3 = Jupiter (Guru)     — most benefic, wisdom
 * 4 = Rahu              — shadow, malefic
 * 5 = Mercury (Budh)     — benefic, intellect
 * 6 = Venus (Shukra)     — benefic, harmony
 * 7 = Ketu              — shadow, malefic
 * 8 = Saturn (Shani)     — most malefic, delay
 * 9 = Mars (Mangal)      — malefic, aggression
 */
const ROOT_SCORE = {
  1: 0,    // Sun — neutral, the self
  2: +2,   // Moon — benefic, receptive, intuition says yes
  3: +3,   // Jupiter — most auspicious, divine blessing
  4: -2,   // Rahu — illusion, obstruction
  5: +1,   // Mercury — favorable, adaptable
  6: +2,   // Venus — harmony, fulfillment
  7: -2,   // Ketu — detachment, denial
  8: -3,   // Saturn — most obstructive, delay, no
  9: -1,   // Mars — conflict, but also courage (mildly negative)
}

const ROOT_PLANET_NAMES = {
  1: 'Surya',
  2: 'Chandra',
  3: 'Guru',
  4: 'Rahu',
  5: 'Budh',
  6: 'Shukra',
  7: 'Ketu',
  8: 'Shani',
  9: 'Mangal',
}

/**
 * Get the numerological score for a given moment
 */
export function getNumerologyScore(date) {
  const { dateRoot, timeRoot, root } = getMomentRoot(date)

  return {
    root,
    dateRoot,
    timeRoot,
    planet: ROOT_PLANET_NAMES[root],
    score: ROOT_SCORE[root] ?? 0,
  }
}

/**
 * Chaldean numerology letter values
 * This is the traditional Indian/Chaldean system (NOT Pythagorean)
 *
 * 1: A I J Q Y
 * 2: B K R
 * 3: C G L S
 * 4: D M T
 * 5: E H N X
 * 6: U V W
 * 7: O Z
 * 8: F P
 */
const CHALDEAN = {
  a:1, i:1, j:1, q:1, y:1,
  b:2, k:2, r:2,
  c:3, g:3, l:3, s:3,
  d:4, m:4, t:4,
  e:5, h:5, n:5, x:5,
  u:6, v:6, w:6,
  o:7, z:7,
  f:8, p:8,
}

/**
 * Devanagari numerology — each akshar mapped to a value
 * Based on Katapayadi sankhya system used in Indian tradition
 *
 * The consonants carry values 1-9, vowels are 0
 */
const DEVANAGARI = {}
// ka-group: 1
'कखगघङ'.split('').forEach((c, i) => DEVANAGARI[c] = (i % 9) + 1)
// cha-group
'चछजझञ'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 5) % 9) + 1)
// ta-group
'टठडढण'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 1) % 9) + 1)
// tha-group
'तथदधन'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 6) % 9) + 1)
// pa-group
'पफबभम'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 2) % 9) + 1)
// ya-group
'यरलव'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 7) % 9) + 1)
// sha-group
'शषसह'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 3) % 9) + 1)
// vowels — carry value based on position
'अआइईउऊएऐओऔ'.split('').forEach((c, i) => DEVANAGARI[c] = (i % 9) + 1)
// matras
'ािीुूेैोौं'.split('').forEach((c, i) => DEVANAGARI[c] = ((i + 4) % 9) + 1)

/**
 * Get numerological root of a question's text
 *
 * Works with English (Chaldean) and Hindi (Devanagari)
 * Ignores spaces, punctuation, numbers
 *
 * "Will I get the job?" → sum letter values → reduce to 1-9
 */
export function getQuestionRoot(text) {
  if (!text || !text.trim()) return { root: 5, score: ROOT_SCORE[5] ?? 0, planet: ROOT_PLANET_NAMES[5] }

  let sum = 0
  for (const char of text.toLowerCase()) {
    if (CHALDEAN[char]) {
      sum += CHALDEAN[char]
    } else if (DEVANAGARI[char]) {
      sum += DEVANAGARI[char]
    }
  }

  const root = sum === 0 ? 5 : reduceToRoot(sum) // default to Mercury if no letters
  return {
    root,
    planet: ROOT_PLANET_NAMES[root],
    score: ROOT_SCORE[root] ?? 0,
  }
}
