/**
 * Prashna Shastra (Horary Astrology) — Yes/No determination
 *
 * Based on classical Vedic Prashna principles:
 * - Tajik Neelakanthi
 * - Prashna Marga
 * - Krishneeyam
 *
 * Five factors scored and weighted:
 * 1. Nakshatra (Moon's lunar mansion) — highest weight
 * 2. Tithi (lunar day) — high weight
 * 3. Paksha (waxing/waning Moon) — medium weight
 * 4. Vara (weekday lord) — medium weight
 * 5. Hora (planetary hour) — medium weight
 *
 * NOTE: This is a simplified implementation of Prashna principles.
 * A full Prashna Kundali considers the entire chart including
 * Lagna, planetary aspects, and drishti. This focuses on the
 * Pancha-anga (five limbs) which are the most accessible
 * factors and traditionally used for quick yes/no prashna.
 */

import {
  moonLongitude, getNakshatra, getTithi, getPaksha,
  getVara, getHora
} from './astronomy'
import { getNumerologyScore, getQuestionRoot } from './numerology'

/**
 * Nakshatra classification for Prashna
 *
 * Dhruva (Fixed) — stable, favorable for yes: Rohini, U.Phalguni, U.Ashadha, U.Bhadrapada
 * Kshipra (Swift) — quick results, favorable: Ashwini, Pushya, Hasta
 * Mridu (Soft) — gentle, favorable: Mrigashira, Chitra, Anuradha, Revati
 * Chara (Movable) — change, mildly favorable: Punarvasu, Swati, Shravana, Dhanishta, Shatabhisha
 * Tikshna (Sharp) — fierce, unfavorable: Ardra, Ashlesha, Jyeshtha, Mula
 * Ugra (Fierce) — harsh, unfavorable: Bharani, Magha, P.Phalguni, P.Ashadha, P.Bhadrapada
 * Mishra (Mixed) — mixed: Krittika, Vishakha
 */
const NAKSHATRA_SCORE = {
  // Dhruva (Fixed) — strong yes
  4: +3,   // Rohini
  12: +3,  // Uttara Phalguni
  21: +3,  // Uttara Ashadha
  26: +3,  // Uttara Bhadrapada

  // Kshipra (Swift) — favorable
  1: +3,   // Ashwini
  8: +4,   // Pushya — most auspicious of all nakshatras
  13: +3,  // Hasta

  // Mridu (Soft) — favorable
  5: +2,   // Mrigashira
  14: +2,  // Chitra
  17: +2,  // Anuradha
  27: +2,  // Revati

  // Chara (Movable) — mildly favorable
  7: +1,   // Punarvasu
  15: +1,  // Swati
  22: +1,  // Shravana
  23: +1,  // Dhanishta
  24: +0,  // Shatabhisha — movable but Saturn-ruled, neutral

  // Tikshna (Sharp) — unfavorable
  6: -3,   // Ardra
  9: -3,   // Ashlesha
  18: -3,  // Jyeshtha
  19: -3,  // Mula

  // Ugra (Fierce) — unfavorable
  2: -2,   // Bharani
  10: -1,  // Magha — fierce but royal, mildly negative
  11: -1,  // Purva Phalguni
  20: -2,  // Purva Ashadha
  25: -2,  // Purva Bhadrapada

  // Mishra (Mixed) — neutral
  3: 0,    // Krittika
  16: 0,   // Vishakha
}

/**
 * Tithi classification
 *
 * Nanda (joyful): 1, 6, 11 → favorable
 * Bhadra (auspicious): 2, 7, 12 → favorable
 * Jaya (victorious): 3, 8, 13 → favorable
 * Rikta (empty): 4, 9, 14 → unfavorable
 * Purna (full): 5, 10, 15 → favorable (Purnima especially)
 *
 * Same pattern repeats for Krishna Paksha tithis (16-30)
 * Amavasya (30) is unfavorable
 */
function tithiScore(tithi) {
  // Map Krishna Paksha tithis to their Shukla equivalent for classification
  const t = tithi <= 15 ? tithi : tithi - 15

  // Rikta tithis (4, 9, 14) — considered empty/void
  if (t === 4 || t === 9 || t === 14) return -2

  // Purna tithis (5, 10) — full, complete
  if (t === 5 || t === 10) return +2

  // Purnima (15 in Shukla) — most auspicious
  if (tithi === 15) return +3

  // Amavasya (30 or tithi after 29) — most inauspicious
  if (tithi === 30) return -3

  // Nanda (1, 6, 11) — joyful
  if (t === 1 || t === 6 || t === 11) return +1

  // Bhadra (2, 7, 12) — auspicious
  if (t === 2 || t === 7 || t === 12) return +2

  // Jaya (3, 8, 13) — victorious
  if (t === 3 || t === 8 || t === 13) return +2

  return 0
}

/**
 * Paksha score
 * Shukla (waxing) → favorable for new beginnings, positive outcomes
 * Krishna (waning) → favorable for endings, letting go — less favorable for "yes"
 */
function pakshaScore(paksha) {
  return paksha === 'shukla' ? +1 : -1
}

/**
 * Vara (weekday) score based on natural benefic/malefic lords
 *
 * Benefic lords:
 *   Monday (Moon) — mind, emotion → +1
 *   Wednesday (Mercury) — intellect, communication → +1
 *   Thursday (Jupiter) — wisdom, expansion, most benefic → +2
 *   Friday (Venus) — harmony, beauty → +1
 *
 * Malefic lords:
 *   Tuesday (Mars) — aggression, conflict → -1
 *   Saturday (Saturn) — delay, obstruction → -2
 *
 * Neutral:
 *   Sunday (Sun) — authority, mixed → 0
 */
const VARA_SCORE = {
  0: 0,   // Sunday — Sun — neutral
  1: +1,  // Monday — Moon
  2: -1,  // Tuesday — Mars
  3: +1,  // Wednesday — Mercury
  4: +2,  // Thursday — Jupiter — Guru, most auspicious day
  5: +1,  // Friday — Venus
  6: -2,  // Saturday — Saturn
}

/**
 * Hora (planetary hour) score
 * Same benefic/malefic logic as vara
 *
 * Planet index: 0=Sun, 1=Moon, 2=Mars, 3=Mercury, 4=Jupiter, 5=Venus, 6=Saturn
 */
const HORA_SCORE = {
  0: 0,   // Sun hora — neutral
  1: +1,  // Moon hora — favorable
  2: -1,  // Mars hora — unfavorable
  3: +1,  // Mercury hora — favorable
  4: +2,  // Jupiter hora — most favorable
  5: +1,  // Venus hora — favorable
  6: -2,  // Saturn hora — most unfavorable
}

/**
 * Special combinations (Yoga-like bonuses)
 */
function specialCombinations(nakshatra, tithi, vara) {
  let bonus = 0

  // Pushya on Thursday — Guru Pushya Yoga — extremely auspicious
  if (nakshatra === 8 && vara === 4) bonus += 3

  // Ravi Pushya Yoga — Pushya on Sunday — also very auspicious
  if (nakshatra === 8 && vara === 0) bonus += 2

  // Amrit Siddhi Yoga — certain nakshatra-vara combinations
  // Monday + Hasta
  if (vara === 1 && nakshatra === 13) bonus += 2
  // Wednesday + Anuradha
  if (vara === 3 && nakshatra === 17) bonus += 2
  // Thursday + Pushya
  if (vara === 4 && nakshatra === 8) bonus += 2 // already counted above, stacks
  // Friday + Revati
  if (vara === 5 && nakshatra === 27) bonus += 2

  // Mrityu Yoga — inauspicious nakshatra-vara combinations
  // Tuesday + Bharani
  if (vara === 2 && nakshatra === 2) bonus -= 2
  // Saturday + Ardra
  if (vara === 6 && nakshatra === 6) bonus -= 2

  return bonus
}

/**
 * Main Prashna function — determines yes/no from the current moment
 *
 * @param {Date} date — the exact moment of the question
 * @returns {{ answer: 'yes'|'no', score: number, factors: object }}
 */
export function askPrashna(date = new Date(), questionText = '') {
  const moonLong = moonLongitude(date)
  const nakshatra = getNakshatra(moonLong)
  const tithi = getTithi(date)
  const paksha = getPaksha(tithi)
  const vara = getVara(date)
  const hora = getHora(date)

  // Numerology — root number of the exact moment
  const numerology = getNumerologyScore(date)

  // Question numerology — the vibration of the words themselves
  const questionNum = getQuestionRoot(questionText)

  // Calculate individual scores
  const scores = {
    nakshatra: NAKSHATRA_SCORE[nakshatra] ?? 0,
    tithi: tithiScore(tithi),
    paksha: pakshaScore(paksha),
    vara: VARA_SCORE[vara] ?? 0,
    hora: HORA_SCORE[hora] ?? 0,
    special: specialCombinations(nakshatra, tithi, vara),
    numerology: numerology.score,
    question: questionNum.score,
  }

  // ── Scoring philosophy ──
  //
  // Astrology = the cosmic weather today (lean toward yes or no)
  // Numerology = the exact moment of your prayer (your unique instant)
  //
  // Even on the most malefic day, a prayer at the right second
  // can find a window of grace. Even on the most blessed day,
  // a poorly timed moment carries weight.
  //
  // Astrology is CAPPED at ±4 so it creates tendency, not destiny.
  // Numerology at ×3 (range ±9) always has power to tip the scale.

  // Raw astrology score
  const rawAstro =
    scores.nakshatra * 1.5 +
    scores.tithi * 1 +
    scores.paksha * 0.5 +
    scores.vara * 0.5 +
    scores.hora * 0.5 +
    scores.special * 1.5

  // Cap astrology influence — tendency, not destiny
  const astroScore = Math.max(-4, Math.min(4, rawAstro))

  // Numerology — the moment's energy (uncapped)
  const numScore = scores.numerology * 3

  // Question — the vibration of the words (uncapped)
  const questionScore = scores.question * 2

  const finalScore = astroScore + numScore + questionScore

  // Positive = yes, negative = no
  // When exactly zero, the querent's faith tips the scale — yes
  const answer = finalScore >= 0 ? 'yes' : 'no'

  return {
    answer,
    score: finalScore,
    factors: {
      nakshatra,
      tithi,
      paksha,
      vara,
      hora,
      numerology,
      questionNumerology: questionNum,
      scores,
    }
  }
}
